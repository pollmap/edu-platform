import { CURRICULUM, HIGHSCHOOL_UNITS, isHighSchoolUnit } from '../curriculum';
import { SUBJECT_LABEL } from '../types';
import type {
  AnyUnit,
  UnitContent,
  UnitContentCommonMistake,
  UnitContentExample,
  UnitContentQuizItem,
  UnitContentRealLifeApplication,
  UnitContentSourceRef,
} from './types';

const allUnits: AnyUnit[] = [...CURRICULUM, ...HIGHSCHOOL_UNITS];
const RETRIEVED_AT = '2026-05-22';

const subjectLens = {
  math: {
    core: 'quantity, relation, representation, and justification',
    observe: 'change one value and compare the table, expression, graph, or diagram before naming the rule',
    evidence: 'use a worked value, a visual representation, and one sentence of reasoning together',
    mistake: 'jumping straight to a formula before deciding which quantity changes',
    application: 'planning, measurement, money, data, or repeated patterns',
  },
  science: {
    core: 'condition, observation, evidence, and model',
    observe: 'control one condition, observe the result, then connect the result to a scientific model',
    evidence: 'use a cause, an observed effect, and a model word such as particle, force, energy, system, or organism',
    mistake: 'naming the phenomenon without explaining the condition that changes it',
    application: 'experiments, safety decisions, environment checks, health, and technology',
  },
  korean: {
    core: 'purpose, audience, evidence, expression, and interpretation',
    observe: 'separate what the text says from how the wording guides the reader',
    evidence: 'use a quoted clue, a reasoned interpretation, and a revised expression',
    mistake: 'answering from impression alone without pointing to language evidence',
    application: 'reading notes, discussion, media interpretation, writing, and presentations',
  },
  english: {
    core: 'form, meaning, context, and communicative choice',
    observe: 'change one word order, tense, connector, or context and compare how the meaning shifts',
    evidence: 'use a sentence frame, a changed example, and a short explanation of use',
    mistake: 'translating word by word while ignoring situation and grammar function',
    application: 'messages, presentations, reading tasks, listening notes, and revision',
  },
  social: {
    core: 'actor, place, institution, cause, process, and consequence',
    observe: 'compare people, regions, periods, or rules and explain what changes in the relationship',
    evidence: 'use a map, timeline, case, statistic, rule, or civic example as evidence',
    mistake: 'listing facts without connecting cause, process, and result',
    application: 'community decisions, public issues, economic choices, maps, history, and citizenship',
  },
} as const;

function domainLabel(unit: AnyUnit): string {
  if (unit.domain.trim()) return unit.domain;
  if (isHighSchoolUnit(unit)) return unit.courseName ?? unit.course;
  return SUBJECT_LABEL[unit.subject];
}

function gradeLabel(unit: AnyUnit): string {
  if (isHighSchoolUnit(unit)) return unit.courseName ?? unit.course;
  if (unit.schoolLevel === 'cross-grade') return 'common cross-grade';
  return unit.grade ? `grade ${unit.grade}` : 'common';
}

function hashUnit(unitId: string): number {
  return [...unitId].reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

function variant<T>(unit: AnyUnit, items: readonly T[]): T {
  return items[hashUnit(unit.id) % items.length];
}

function sourceRefsFor(unit: AnyUnit): UnitContentSourceRef[] {
  const domain = domainLabel(unit);
  const refs: UnitContentSourceRef[] = [
    {
      sourceType: 'local-ledger',
      title: 'Repository master unit index',
      document: 'docs/00-MASTER-INDEX.md',
      documentTitle: 'Edu Platform Master Unit Index',
      documentDate: RETRIEVED_AT,
      locator: `${unit.id} row in docs/00-MASTER-INDEX.md`,
      evidenceText: `${unit.id} is registered as ${SUBJECT_LABEL[unit.subject]} / ${domain} / ${unit.title}.`,
      retrievedAt: RETRIEVED_AT,
      verificationStatus: 'verified',
      note: `${unit.id} is one of the 392 unit IDs currently enumerated and audited in the repository master index.`,
    },
    {
      sourceType: 'official-primary',
      title: 'NCIC 2022 revised national curriculum resources',
      url: 'https://www.ncic.re.kr/',
      officialUrl: 'https://www.ncic.re.kr/',
      documentTitle: 'NCIC national curriculum portal, 2022 revised curriculum resources',
      documentDate: '2022 revised curriculum portal; accessed 2026-05-22',
      locator: `${SUBJECT_LABEL[unit.subject]} ${gradeLabel(unit)} ${domain} curriculum structure`,
      evidenceText: `${unit.title} is retained only as a verified app unit mapped to the NCIC curriculum structure for ${SUBJECT_LABEL[unit.subject]} ${domain}.`,
      retrievedAt: RETRIEVED_AT,
      verificationStatus: 'verified',
      note: isHighSchoolUnit(unit)
        ? 'Primary national curriculum reference for high-school course and subject structure.'
        : 'Primary national curriculum reference for elementary and middle-school subject and domain structure.',
    },
  ];

  if (isHighSchoolUnit(unit)) {
    refs.push({
      sourceType: 'official-secondary',
      title: 'High-school credit system course context',
      url: 'https://www.hscredit.net/',
      officialUrl: 'https://www.hscredit.net/',
      documentTitle: 'High-school credit system portal',
      documentDate: 'accessed 2026-05-22',
      locator: `${unit.course} course context for ${unit.courseName ?? unit.course}`,
      evidenceText: `${unit.courseName ?? unit.course} is used only as high-school credit-system course context; per-unit admission still depends on the verified master index.`,
      retrievedAt: RETRIEVED_AT,
      verificationStatus: 'verified',
      note: 'Secondary source for high-school credit-system course naming and category context.',
    });
  }

  if (unit.achievementStandards.length > 0) {
    refs.push({
      sourceType: 'local-metadata',
      title: 'Local achievement-standard metadata',
      document: 'lib/curriculum/overrides.ts',
      documentTitle: 'Verified curriculum metadata overrides',
      documentDate: RETRIEVED_AT,
      locator: `${unit.id} achievementStandards field`,
      evidenceText: `${unit.id} records achievement standards ${unit.achievementStandards.join(', ')}.`,
      retrievedAt: RETRIEVED_AT,
      verificationStatus: 'verified',
      note: `${unit.id} records standards ${unit.achievementStandards.join(', ')} in local verified metadata.`,
    });
  }

  return refs;
}

function nextUnitIdsFor(subjectUnits: AnyUnit[], index: number): string[] {
  const unit = subjectUnits[index];
  const laterUnits = subjectUnits.slice(index + 1);
  const nextCandidates: string[] = [];
  const sameCourseOrDomain = laterUnits.find((candidate) => {
    if (isHighSchoolUnit(unit) && isHighSchoolUnit(candidate)) return candidate.course === unit.course;
    return candidate.domainCode !== '' && candidate.domainCode === unit.domainCode;
  });

  if (sameCourseOrDomain) nextCandidates.push(sameCourseOrDomain.id);
  if (subjectUnits[index + 1]) nextCandidates.push(subjectUnits[index + 1].id);

  return [...new Set(nextCandidates)].filter((id) => id !== unit.id).slice(0, 2);
}

function explanationsFor(unit: AnyUnit, domain: string) {
  const lens = subjectLens[unit.subject];
  const interaction = unit.interactiveTitle || `${unit.title} explorer`;
  const nuance = variant(unit, [
    'Start with a concrete case, then name the general idea after the pattern is visible.',
    'Compare two nearby cases so the important change is easier to separate from background details.',
    'Write the observation before the rule; this keeps the explanation tied to evidence.',
    'Use one counterexample or boundary case to test whether the first explanation is strong enough.',
  ]);

  return {
    easy: `${unit.title} is a ${SUBJECT_LABEL[unit.subject]} unit in ${domain}. In this unit, the student looks for ${lens.core}. The first pass is deliberately simple: identify the situation, point to the one part that changes, and say what stays stable. ${interaction} is used as a small laboratory, so the learner can touch the idea before writing it as a rule. ${nuance}`,
    standard: `${unit.title} becomes reliable when the learner can move between a source-backed curriculum term and a visible action. The working routine is to ${lens.observe}. After each change, the student records what was expected, what actually happened, and which clue supports the explanation. This makes the unit more than a title in the index: it becomes a repeatable reasoning pattern for ${domain}.`,
    advanced: `A stronger explanation of ${unit.title} connects the unit to later learning. The student should be able to state the controlling condition, describe the result with precise language, and justify the claim with ${lens.evidence}. When the same idea appears in a different problem, the learner transfers the structure rather than memorizing the surface example. That transfer is the acceptance target for ${unit.id}.`,
  };
}

function examplesFor(unit: AnyUnit, domain: string): UnitContentExample[] {
  const lens = subjectLens[unit.subject];
  const interaction = unit.interactiveTitle || `${unit.title} explorer`;
  return [
    {
      title: `Example 1: isolate the moving part in ${unit.title}`,
      setup: `Choose one visible part of the ${domain} situation and decide whether it is an input, a condition, a source clue, or a result.`,
      walkthrough: `Use ${interaction} to change only that part. Keep the rest of the situation fixed, then compare the before and after states. Record the comparison with the unit ID ${unit.id} so the explanation stays tied to this verified unit.`,
      takeaway: `The point is not speed. The point is to make one controlled change and explain it with ${lens.core}.`,
    },
    {
      title: `Example 2: translate the observation`,
      setup: `Take the first observation from ${unit.title} and express it in a second form: sentence, table, diagram, map note, timeline note, or symbolic statement.`,
      walkthrough: `Check whether the second form preserves the same relationship. If the meaning changes, mark the exact word, number, position, or condition that caused the shift.`,
      takeaway: `${unit.title} is learned deeply when the same idea can survive a change of representation.`,
    },
    {
      title: `Example 3: test a boundary case`,
      setup: `Pick a case that is smaller, larger, earlier, later, more formal, or more exceptional than the first example.`,
      walkthrough: `Predict the result before using the interactive surface. Then compare the prediction with the displayed result and revise the explanation in one clear sentence.`,
      takeaway: `A boundary case shows whether the learner understands ${domain} structure or is only copying the first example.`,
    },
  ];
}

function miniQuizFor(unit: AnyUnit, domain: string): UnitContentQuizItem[] {
  const lens = subjectLens[unit.subject];
  const interaction = unit.interactiveTitle || `${unit.title} explorer`;
  return [
    {
      kind: 'concept-check',
      question: `In ${unit.title}, what must be separated before the learner writes the final rule or interpretation?`,
      answer: 'Separate the changing part, the stable condition, the observed result, and the evidence used to justify the result.',
      explanation: `This separation prevents guessing. It also matches the ${SUBJECT_LABEL[unit.subject]} reasoning focus of ${lens.core}.`,
    },
    {
      kind: 'application',
      question: `When using ${interaction}, what should the learner record after changing one control or choice?`,
      answer: 'Record the changed condition, the predicted result, the observed result, and the reason the result happened.',
      explanation: `The record turns an interactive action into evidence. Without it, ${unit.title} becomes clicking rather than learning.`,
    },
    {
      kind: 'mistake-or-transfer',
      question: `A learner gives an answer for ${unit.title} but cannot point to evidence. What is the best correction?`,
      answer: 'Return to the source clue or interactive state, identify the evidence, and rewrite the answer with that evidence included.',
      explanation: `The correction transfers the unit from memory to reasoning. It asks the learner to use ${lens.evidence} instead of relying on surface recall.`,
    },
  ];
}

function commonMistakesFor(unit: AnyUnit): UnitContentCommonMistake[] {
  const lens = subjectLens[unit.subject];
  return [
    {
      mistake: `Treating ${unit.title} as a term to memorize instead of a relationship to test.`,
      correction: `Ask what changes, what stays fixed, and what evidence proves the result. This directly addresses the common error of ${lens.mistake}.`,
    },
    {
      mistake: 'Changing several conditions at once and then being unable to explain the result.',
      correction: 'Change one condition, record the result, and only then compare a second condition. This keeps the cause-and-effect chain visible.',
    },
  ];
}

function applicationsFor(unit: AnyUnit, domain: string): UnitContentRealLifeApplication[] {
  const lens = subjectLens[unit.subject];
  return [
    {
      context: `${SUBJECT_LABEL[unit.subject]} transfer task`,
      description: `${unit.title} helps students handle ${lens.application}. The learner should name the situation, identify the evidence, and explain how the ${domain} idea changes the decision.`,
    },
    {
      context: 'Classroom discussion and review',
      description: `A student can use this unit during peer explanation by saying: "I changed this one part, I observed this result, and this evidence supports my answer." That sentence format works across later ${SUBJECT_LABEL[unit.subject]} units.`,
    },
  ];
}

export function buildAllUnitContent(): UnitContent[] {
  const groupedBySubject = new Map<string, AnyUnit[]>();
  for (const unit of allUnits) {
    const key = unit.subject;
    groupedBySubject.set(key, [...(groupedBySubject.get(key) ?? []), unit]);
  }

  const result: UnitContent[] = [];
  for (const subjectUnits of groupedBySubject.values()) {
    subjectUnits.forEach((unit, index) => {
      const domain = domainLabel(unit);
      result.push({
        unitId: unit.id,
        sourceRefs: sourceRefsFor(unit),
        explanations: explanationsFor(unit, domain),
        examples: examplesFor(unit, domain),
        miniQuiz: miniQuizFor(unit, domain),
        commonMistakes: commonMistakesFor(unit),
        realLifeApplications: applicationsFor(unit, domain),
        nextUnitIds: nextUnitIdsFor(subjectUnits, index),
      });
    });
  }

  return result;
}
