import { CURRICULUM, HIGHSCHOOL_UNITS, isHighSchoolUnit } from '../curriculum';
import { SUBJECT_LABEL } from '../types';
import type {
  AnyUnit,
  SubjectContentFrame,
  UnitContent,
  UnitContentSourceRef,
} from './types';

const allUnits: AnyUnit[] = [...CURRICULUM, ...HIGHSCHOOL_UNITS];

export function unitsForSubject(frame: SubjectContentFrame): AnyUnit[] {
  return allUnits.filter((unit) => unit.subject === frame.subject);
}

export function domainLabel(unit: AnyUnit): string {
  if (unit.domain.trim()) return unit.domain;
  if (isHighSchoolUnit(unit)) return unit.courseName ?? unit.course;
  return SUBJECT_LABEL[unit.subject];
}

function sourceRefsFor(unit: AnyUnit): UnitContentSourceRef[] {
  const refs: UnitContentSourceRef[] = [
    {
      title: '현재 앱 마스터 인덱스',
      document: 'docs/00-MASTER-INDEX.md',
      note: `${unit.id} is one of the 392 unit IDs currently enumerated and audited in the repository master index.`,
    },
    {
      title: 'NCIC 2022 개정 교육과정',
      url: 'https://ncic.re.kr',
      note: isHighSchoolUnit(unit)
        ? 'Used as the primary national curriculum reference for high-school subject/course structure.'
        : 'Used as the primary national curriculum reference for elementary and middle-school subject/unit structure.',
    },
  ];

  if (isHighSchoolUnit(unit)) {
    refs.push({
      title: '고교학점제 지원센터',
      url: 'https://hscredit.kr',
      note: 'Used for high-school credit-system course naming and category context.',
    });
  }

  if (unit.achievementStandards.length > 0) {
    refs.push({
      title: '단원 메타데이터 성취기준',
      document: 'lib/curriculum/overrides.ts',
      note: `${unit.id} records standards ${unit.achievementStandards.join(', ')} in local verified metadata.`,
    });
  }

  return refs;
}

function nextUnitIdsFor(subjectUnits: AnyUnit[], index: number): string[] {
  const unit = subjectUnits[index];
  const nextCandidates: string[] = [];
  const laterUnits = subjectUnits.slice(index + 1);
  const sameCourseOrDomain = laterUnits.find((candidate) => {
    if (isHighSchoolUnit(unit) && isHighSchoolUnit(candidate)) {
      return candidate.course === unit.course;
    }
    return candidate.domainCode !== '' && candidate.domainCode === unit.domainCode;
  });

  if (sameCourseOrDomain) nextCandidates.push(sameCourseOrDomain.id);
  if (subjectUnits[index + 1]) nextCandidates.push(subjectUnits[index + 1].id);

  return [...new Set(nextCandidates)].filter((id) => id !== unit.id).slice(0, 2);
}

export function createSubjectUnitContent(frame: SubjectContentFrame): UnitContent[] {
  const subjectUnits = unitsForSubject(frame);

  return subjectUnits.map((unit, index) => {
    const label = domainLabel(unit);
    return {
      unitId: unit.id,
      sourceRefs: sourceRefsFor(unit),
      explanations: {
        easy: frame.easy(unit, label),
        standard: frame.standard(unit, label),
        advanced: frame.advanced(unit, label),
      },
      examples: frame.examples(unit, label),
      miniQuiz: frame.miniQuiz(unit, label),
      commonMistakes: frame.commonMistakes(unit, label),
      realLifeApplications: frame.realLifeApplications(unit, label),
      nextUnitIds: nextUnitIdsFor(subjectUnits, index),
    };
  });
}
