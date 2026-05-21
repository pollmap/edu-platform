import { existsSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { CURRICULUM, HIGHSCHOOL_UNITS, unitPath } from '../lib/curriculum';
import { buildUnitLearningMaterial } from '../lib/learning-materials';
import type { HighSchoolUnit, Unit } from '../lib/types';

type AnyUnit = Unit | HighSchoolUnit;

const ROOT = join(__dirname, '..');
const allUnits: AnyUnit[] = [...CURRICULUM, ...HIGHSCHOOL_UNITS];

function routeFile(unit: AnyUnit): string {
  return join(ROOT, 'app', '(units)', ...unitPath(unit).slice(1).split('/'), 'page.tsx');
}

function hasUsefulText(value: string, minLength = 12): boolean {
  return value.trim().length >= minLength && !/작성 예정|TODO|TBD/i.test(value);
}

const blockers: string[] = [];

for (const unit of allUnits) {
  const material = buildUnitLearningMaterial(unit);
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
  if (!src.includes('<UnitHeader')) {
    blockers.push(`${unit.id}: page does not render shared learning material surface`);
  }
}

console.log('[content-audit] unit learning material coverage');
console.log(`[content-audit] units checked: ${allUnits.length}`);
console.log('[content-audit] required sections: core question, quick summary, 3 goals, 5-step loop, mini challenge, misconception, application, student output, 3 review questions');
console.log(`[content-audit] blockers: ${blockers.length}`);

for (const blocker of blockers.slice(0, 50)) {
  console.error(`  ERROR: ${blocker}`);
}
if (blockers.length > 50) console.error(`  ... ${blockers.length - 50} more`);

if (blockers.length > 0) {
  console.error(`[content-audit] first checked file root: ${relative(ROOT, routeFile(allUnits[0]))}`);
}

process.exit(blockers.length > 0 ? 1 : 0);
