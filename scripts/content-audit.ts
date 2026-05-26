import { existsSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { CURRICULUM, HIGHSCHOOL_UNITS, unitPath } from '../lib/curriculum';
import { buildUnitLearningMaterial } from '../lib/learning-materials';
import { getUnitBlueprint } from '../lib/unit-blueprints';
import {
  OFFICIAL_VERIFIED_UNIT_TARGET,
  UNIT_CONTENT,
  getUnitContent,
} from '../lib/unit-content';
import type { HighSchoolUnit, Unit } from '../lib/types';

type AnyUnit = Unit | HighSchoolUnit;

const ROOT = join(__dirname, '..');
const allUnits: AnyUnit[] = [...CURRICULUM, ...HIGHSCHOOL_UNITS];
const allUnitIds = new Set(allUnits.map((unit) => unit.id));
const contentUnitIds = Object.keys(UNIT_CONTENT);
const mojibakeMarkers = ['�', 'ì', 'í', 'ë', 'ê', 'Ã', 'Â', '媛', '怨', '臾', '援', '諛', '蹂', '遺', '쨌', '濡', '吏'];

function routeFile(unit: AnyUnit): string {
  return join(ROOT, 'app', '(units)', ...unitPath(unit).slice(1).split('/'), 'page.tsx');
}

function hasUsefulText(value: string, minLength = 12): boolean {
  return value.trim().length >= minLength && !/작성 예정|TODO|TBD/i.test(value);
}

function hasGenericPlaceholder(value: string): boolean {
  return /TODO|TBD|placeholder|generic subject frame|작성 예정|묒꽦 ?덉젙/i.test(value);
}

function hasMojibake(value: string): boolean {
  return mojibakeMarkers.some((marker) => value.includes(marker));
}

function authoredContentLength(content: NonNullable<ReturnType<typeof getUnitContent>>): number {
  return [
    content.explanations.easy,
    content.explanations.standard,
    content.explanations.advanced,
    ...content.examples.flatMap((example) => [
      example.title,
      example.setup,
      example.walkthrough,
      example.takeaway,
    ]),
    ...content.miniQuiz.flatMap((quiz) => [
      quiz.question,
      quiz.answer,
      quiz.explanation,
    ]),
    ...content.commonMistakes.flatMap((mistake) => [
      mistake.mistake,
      mistake.correction,
    ]),
    ...content.realLifeApplications.flatMap((application) => [
      application.context,
      application.description,
    ]),
  ].join('').trim().length;
}

const blockers: string[] = [];

if (allUnits.length !== OFFICIAL_VERIFIED_UNIT_TARGET) {
  blockers.push(`registered unit count ${allUnits.length} does not match verified target ${OFFICIAL_VERIFIED_UNIT_TARGET}`);
}

if (contentUnitIds.length !== OFFICIAL_VERIFIED_UNIT_TARGET) {
  blockers.push(`UnitContent count ${contentUnitIds.length} does not match verified target ${OFFICIAL_VERIFIED_UNIT_TARGET}`);
}

for (const contentUnitId of contentUnitIds) {
  if (!allUnitIds.has(contentUnitId)) {
    blockers.push(`${contentUnitId}: UnitContent exists without a registered official unit`);
  }
}

for (const unit of allUnits) {
  const content = getUnitContent(unit.id);
  if (!content) {
    blockers.push(`${unit.id}: missing UnitContent`);
  } else {
    if (content.sourceRefs.length < 2) blockers.push(`${unit.id}: sourceRefs must include at least 2 refs`);
    for (const [index, source] of content.sourceRefs.entries()) {
      if (!hasUsefulText(source.title, 4)) blockers.push(`${unit.id}: weak source title ${index + 1}`);
      if (!source.document && !source.url) blockers.push(`${unit.id}: source ref ${index + 1} lacks document or URL`);
      if (!hasUsefulText(source.sourceType, 6)) blockers.push(`${unit.id}: source ref ${index + 1} lacks sourceType`);
      if (!hasUsefulText(source.documentTitle, 6)) blockers.push(`${unit.id}: source ref ${index + 1} lacks documentTitle`);
      if (!hasUsefulText(source.documentDate, 4)) blockers.push(`${unit.id}: source ref ${index + 1} lacks documentDate`);
      if (!hasUsefulText(source.locator, 8)) blockers.push(`${unit.id}: source ref ${index + 1} lacks locator`);
      if (!hasUsefulText(source.evidenceText, 20)) blockers.push(`${unit.id}: source ref ${index + 1} lacks evidenceText`);
      if (!hasUsefulText(source.retrievedAt, 10)) blockers.push(`${unit.id}: source ref ${index + 1} lacks retrievedAt`);
      if (source.verificationStatus !== 'verified') blockers.push(`${unit.id}: source ref ${index + 1} is not verified`);
      if (source.sourceType.startsWith('official') && !source.officialUrl) {
        blockers.push(`${unit.id}: official source ref ${index + 1} lacks officialUrl`);
      }
    }
    if (!hasUsefulText(content.explanations.easy, 24)) blockers.push(`${unit.id}: missing easy explanation`);
    if (!hasUsefulText(content.explanations.standard, 40)) blockers.push(`${unit.id}: missing standard explanation`);
    if (!hasUsefulText(content.explanations.advanced, 40)) blockers.push(`${unit.id}: missing advanced explanation`);
    if (hasGenericPlaceholder(`${content.explanations.easy} ${content.explanations.standard} ${content.explanations.advanced}`)) {
      blockers.push(`${unit.id}: UnitContent contains placeholder or generic marker`);
    }
    const searchableContent = [
      content.explanations.easy,
      content.explanations.standard,
      content.explanations.advanced,
      ...content.examples.flatMap((example) => [example.title, example.setup, example.walkthrough, example.takeaway]),
      ...content.miniQuiz.flatMap((quiz) => [quiz.question, quiz.answer, quiz.explanation]),
      ...content.commonMistakes.flatMap((mistake) => [mistake.mistake, mistake.correction]),
      ...content.realLifeApplications.flatMap((application) => [application.context, application.description]),
    ].join(' ');
    if (hasMojibake(searchableContent)) blockers.push(`${unit.id}: UnitContent contains mojibake`);
    if (authoredContentLength(content) < 1200) blockers.push(`${unit.id}: UnitContent is under 1200 characters`);
    if (content.examples.length < 3) blockers.push(`${unit.id}: UnitContent examples must be at least 3`);
    if (content.miniQuiz.length !== 3) blockers.push(`${unit.id}: miniQuiz count is not 3`);
    const expectedKinds = ['concept-check', 'application', 'mistake-or-transfer'];
    for (const [index, quiz] of content.miniQuiz.entries()) {
      if (quiz.kind !== expectedKinds[index]) blockers.push(`${unit.id}: miniQuiz ${index + 1} has wrong kind`);
      if (!hasUsefulText(quiz.question, 12)) blockers.push(`${unit.id}: weak miniQuiz question ${index + 1}`);
      if (!hasUsefulText(quiz.answer, 2)) blockers.push(`${unit.id}: weak miniQuiz answer ${index + 1}`);
      if (!hasUsefulText(quiz.explanation, 20)) blockers.push(`${unit.id}: weak miniQuiz explanation ${index + 1}`);
    }
    if (content.commonMistakes.length < 1) blockers.push(`${unit.id}: missing common mistakes`);
    if (content.realLifeApplications.length < 1) blockers.push(`${unit.id}: missing real-life applications`);
    for (const nextUnitId of content.nextUnitIds) {
      if (!allUnitIds.has(nextUnitId)) blockers.push(`${unit.id}: broken nextUnitId ${nextUnitId}`);
    }
  }

  const material = buildUnitLearningMaterial(unit);
  const blueprint = getUnitBlueprint(unit.id);
  if (blueprint?.implementationStatus.content !== 'authored-blueprint') {
    blockers.push(`${unit.id}: blueprint content status is not authored-blueprint`);
  }
  if (!hasUsefulText(material.coreQuestion)) blockers.push(`${unit.id}: missing core question`);
  if (!hasUsefulText(material.quickSummary, 40)) blockers.push(`${unit.id}: missing quick summary`);
  if (material.learningGoals.length !== 3) blockers.push(`${unit.id}: learning goal count is not 3`);
  for (const [index, goal] of material.learningGoals.entries()) {
    if (!hasUsefulText(goal, 18)) blockers.push(`${unit.id}: weak learning goal ${index + 1}`);
  }
  if (material.loopSteps.length !== 5) blockers.push(`${unit.id}: learning loop count is not 5`);
  for (const step of material.loopSteps) {
    if (!hasUsefulText(step.description, 18)) blockers.push(`${unit.id}: weak loop step ${step.label}`);
  }
  if (!hasUsefulText(material.miniChallenge, 30)) blockers.push(`${unit.id}: missing mini challenge`);
  if (!hasUsefulText(material.misconception, 30)) blockers.push(`${unit.id}: missing misconception guidance`);
  if (!hasUsefulText(material.application, 30)) blockers.push(`${unit.id}: missing application guidance`);
  if (!hasUsefulText(material.studentOutput, 24)) blockers.push(`${unit.id}: missing student output`);
  if (material.reviewQuestions.length !== 3) blockers.push(`${unit.id}: review question count is not 3`);
  for (const [index, question] of material.reviewQuestions.entries()) {
    if (!hasUsefulText(question, 15)) blockers.push(`${unit.id}: weak review question ${index + 1}`);
  }
  if (!material.sourceNote.includes(unit.id)) blockers.push(`${unit.id}: source note does not include unit ID`);

  const page = routeFile(unit);
  if (!existsSync(page)) {
    blockers.push(`${unit.id}: missing route page for content audit`);
    continue;
  }
  const src = readFileSync(page, 'utf8');
  if (!src.includes('<UnitHeader')) blockers.push(`${unit.id}: page does not render UnitHeader`);
  if (!src.includes('<UnitLearningMaterial')) blockers.push(`${unit.id}: page does not render UnitLearningMaterial`);
  if (!src.includes('<UnitInteractiveRenderer')) blockers.push(`${unit.id}: page does not render UnitInteractiveRenderer`);
  if (src.includes('AUTO-GENERATED stub') || src.includes('작성 예정')) {
    blockers.push(`${unit.id}: page still uses a placeholder surface`);
  }
}

console.log('[content-audit] unit learning material coverage');
console.log(`[content-audit] units checked: ${allUnits.length}`);
console.log(`[content-audit] verified target: ${OFFICIAL_VERIFIED_UNIT_TARGET}`);
console.log(`[content-audit] UnitContent checked: ${contentUnitIds.length}`);
console.log('[content-audit] required sections: full sourceRefs provenance, 1200+ chars, easy/standard/advanced explanations, 3+ examples, fixed 3-question miniQuiz, common mistakes, real-life applications, valid nextUnitIds, unified learning surface');
console.log(`[content-audit] blockers: ${blockers.length}`);

for (const blocker of blockers.slice(0, 50)) {
  console.error(`  ERROR: ${blocker}`);
}
if (blockers.length > 50) console.error(`  ... ${blockers.length - 50} more`);

if (blockers.length > 0) {
  console.error(`[content-audit] first checked file root: ${relative(ROOT, routeFile(allUnits[0]))}`);
}

process.exit(blockers.length > 0 ? 1 : 0);
