import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { CURRICULUM, HIGHSCHOOL_UNITS } from '../curriculum';
import {
  OFFICIAL_VERIFIED_UNIT_TARGET,
  UNIT_CONTENT,
} from '../unit-content';
import {
  ENGINE_REPRESENTATIVE_UNITS,
  PATTERN_ENGINE_CATALOG,
  UNIT_BLUEPRINTS,
  getUnitBlueprint,
  type UnitBlueprint,
} from './index';

export interface UnitBlueprintAuditReport {
  checked: number;
  blockers: string[];
}

const allUnits = [...CURRICULUM, ...HIGHSCHOOL_UNITS];
const allUnitIds = new Set(allUnits.map((unit) => unit.id));
const engineIds = new Set(PATTERN_ENGINE_CATALOG.map((engine) => engine.engineId));
const expectedQuizKinds = ['concept-check', 'application', 'mistake-or-transfer'];
const expectedEngineFiles = [
  'SliderGraphPatternEngine.tsx',
  'StepAnimationPatternEngine.tsx',
  'ClassificationSortPatternEngine.tsx',
  'ParticleSimulationPatternEngine.tsx',
  'Solid3DPatternEngine.tsx',
  'GeometryConstructionPatternEngine.tsx',
  'TimelinePatternEngine.tsx',
  'MapExplorerPatternEngine.tsx',
  'NetworkBuilderPatternEngine.tsx',
  'ProbabilitySimulationPatternEngine.tsx',
  'MatchingQuizPatternEngine.tsx',
  'TransformationConverterPatternEngine.tsx',
  'TreeBuilderPatternEngine.tsx',
  'DataVisualizationPatternEngine.tsx',
  'CalculusVisualizationPatternEngine.tsx',
  'Molecular3DPatternEngine.tsx',
  'AstronomySimulationPatternEngine.tsx',
  'VectorMatrixPatternEngine.tsx',
  'BiologyMechanismPatternEngine.tsx',
  'EconomicsFinancePatternEngine.tsx',
];
const mojibakeMarkers = ['�', 'ì', 'í', 'ë', 'ê', 'Ã', 'Â', '媛', '怨', '臾', '援', '諛', '蹂', '遺', '쨌', '濡', '吏'];

function hasText(value: string | undefined, minLength = 1): boolean {
  return typeof value === 'string' && value.trim().length >= minLength;
}

function authoredContentLength(blueprint: UnitBlueprint): number {
  const content = blueprint.content;
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
    ...content.miniProblems.flatMap((quiz) => [
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

function hasGenericPlaceholder(text: string): boolean {
  return /TODO|TBD|placeholder|generic subject frame|작성 예정|묒꽦 ?덉젙/i.test(text);
}

function hasMojibake(text: string): boolean {
  return mojibakeMarkers.some((marker) => text.includes(marker));
}

export function auditUnitBlueprints(): UnitBlueprintAuditReport {
  const blockers: string[] = [];
  const blueprintIds = Object.keys(UNIT_BLUEPRINTS);

  if (allUnits.length !== OFFICIAL_VERIFIED_UNIT_TARGET) {
    blockers.push(`registered unit count ${allUnits.length} does not match verified target ${OFFICIAL_VERIFIED_UNIT_TARGET}`);
  }

  if (blueprintIds.length !== OFFICIAL_VERIFIED_UNIT_TARGET) {
    blockers.push(`UnitBlueprint count ${blueprintIds.length} does not match verified target ${OFFICIAL_VERIFIED_UNIT_TARGET}`);
  }

  for (const unitId of blueprintIds) {
    if (!allUnitIds.has(unitId)) blockers.push(`${unitId}: UnitBlueprint exists without a registered official unit`);
    if (!UNIT_CONTENT[unitId]) blockers.push(`${unitId}: UnitBlueprint exists without UnitContent`);
  }

  for (const unit of allUnits) {
    const blueprint = getUnitBlueprint(unit.id);
    if (!blueprint) {
      blockers.push(`${unit.id}: missing UnitBlueprint`);
      continue;
    }

    if (blueprint.unitId !== unit.id) blockers.push(`${unit.id}: blueprint unitId mismatch`);
    if (blueprint.content.unitId !== unit.id) blockers.push(`${unit.id}: blueprint content unitId mismatch`);
    if (blueprint.sourceRefs.length < 2) blockers.push(`${unit.id}: sourceRefs must include at least 2 refs`);
    if (!blueprint.sourceRefs.some((ref) => ref.officialUrl?.includes('ncic.re.kr'))) {
      blockers.push(`${unit.id}: sourceRefs must include NCIC provenance`);
    }
    for (const [index, ref] of blueprint.sourceRefs.entries()) {
      if (!hasText(ref.title, 4)) blockers.push(`${unit.id}: weak source title ${index + 1}`);
      if (!ref.document && !ref.url) blockers.push(`${unit.id}: source ref ${index + 1} lacks document or URL`);
      if (!hasText(ref.sourceType, 6)) blockers.push(`${unit.id}: source ref ${index + 1} lacks sourceType`);
      if (!hasText(ref.documentTitle, 6)) blockers.push(`${unit.id}: source ref ${index + 1} lacks documentTitle`);
      if (!hasText(ref.documentDate, 4)) blockers.push(`${unit.id}: source ref ${index + 1} lacks documentDate`);
      if (!hasText(ref.locator, 8)) blockers.push(`${unit.id}: source ref ${index + 1} lacks locator`);
      if (!hasText(ref.evidenceText, 20)) blockers.push(`${unit.id}: source ref ${index + 1} lacks evidenceText`);
      if (!hasText(ref.retrievedAt, 10)) blockers.push(`${unit.id}: source ref ${index + 1} lacks retrievedAt`);
      if (ref.verificationStatus !== 'verified') blockers.push(`${unit.id}: source ref ${index + 1} is not verified`);
      if (ref.sourceType.startsWith('official') && !ref.officialUrl) {
        blockers.push(`${unit.id}: official source ref ${index + 1} lacks officialUrl`);
      }
    }

    if (authoredContentLength(blueprint) < 1200) blockers.push(`${unit.id}: blueprint content is under 1200 characters`);
    const searchableText = [
      blueprint.content.explanations.easy,
      blueprint.content.explanations.standard,
      blueprint.content.explanations.advanced,
    ].join(' ');
    if (hasGenericPlaceholder(searchableText)) blockers.push(`${unit.id}: blueprint content contains placeholder or generic marker`);
    const allBlueprintText = [
      searchableText,
      ...blueprint.content.examples.flatMap((example) => [example.title, example.setup, example.walkthrough, example.takeaway]),
      ...blueprint.content.miniProblems.flatMap((quiz) => [quiz.question, quiz.answer, quiz.explanation]),
      ...blueprint.content.commonMistakes.flatMap((mistake) => [mistake.mistake, mistake.correction]),
      ...blueprint.content.realLifeApplications.flatMap((application) => [application.context, application.description]),
    ].join(' ');
    if (hasMojibake(allBlueprintText)) blockers.push(`${unit.id}: blueprint content contains mojibake`);
    if (blueprint.content.examples.length < 3) blockers.push(`${unit.id}: examples must be at least 3`);
    if (blueprint.content.miniProblems.length !== 3) blockers.push(`${unit.id}: miniProblems count is not 3`);
    if (blueprint.content.answerExplanations.length !== 3) blockers.push(`${unit.id}: answerExplanations count is not 3`);
    for (const [index, quiz] of blueprint.content.miniProblems.entries()) {
      if (quiz.kind !== expectedQuizKinds[index]) blockers.push(`${unit.id}: miniProblem ${index + 1} has wrong kind`);
      if (!hasText(quiz.question, 12)) blockers.push(`${unit.id}: weak miniProblem question ${index + 1}`);
      if (!hasText(quiz.answer, 2)) blockers.push(`${unit.id}: weak miniProblem answer ${index + 1}`);
      if (!hasText(quiz.explanation, 20)) blockers.push(`${unit.id}: weak miniProblem explanation ${index + 1}`);
    }
    if (blueprint.content.commonMistakes.length < 1) blockers.push(`${unit.id}: missing common mistakes`);
    if (blueprint.content.realLifeApplications.length < 1) blockers.push(`${unit.id}: missing real-life applications`);
    for (const nextUnitId of blueprint.content.nextUnitIds) {
      if (!allUnitIds.has(nextUnitId)) blockers.push(`${unit.id}: broken nextUnitId ${nextUnitId}`);
    }
    if (blueprint.implementationStatus.content !== 'authored-blueprint') {
      blockers.push(`${unit.id}: content must be authored-blueprint`);
    }
    if (blueprint.implementationStatus.renderer !== 'pattern-engine') {
      blockers.push(`${unit.id}: renderer must be pattern-engine`);
    }
  }

  return {
    checked: allUnits.length,
    blockers,
  };
}

export function auditUnitInteractions(): UnitBlueprintAuditReport {
  const blockers: string[] = [];

  if (PATTERN_ENGINE_CATALOG.length !== 20) blockers.push(`pattern engine count ${PATTERN_ENGINE_CATALOG.length} is not 20`);
  if (engineIds.size !== PATTERN_ENGINE_CATALOG.length) blockers.push('pattern engine IDs are not unique');

  const engineDir = join(process.cwd(), 'components', 'interactive', 'pattern-engines');
  for (const fileName of expectedEngineFiles) {
    if (!existsSync(join(engineDir, fileName))) blockers.push(`missing pattern engine file: ${fileName}`);
  }
  if (!existsSync(join(engineDir, 'registry.tsx'))) blockers.push('missing pattern engine registry');
  if (!existsSync(join(process.cwd(), 'tests', 'e2e', 'pattern-engines.spec.ts'))) {
    blockers.push('missing representative pattern engine e2e suite');
  }
  if (ENGINE_REPRESENTATIVE_UNITS.length !== 20) {
    blockers.push(`representative engine unit count ${ENGINE_REPRESENTATIVE_UNITS.length} is not 20`);
  }
  for (const engineId of engineIds) {
    if (!ENGINE_REPRESENTATIVE_UNITS.some((item) => item.engineId === engineId)) {
      blockers.push(`missing representative unit for engine ${engineId}`);
    }
  }

  for (const unit of allUnits) {
    const blueprint = getUnitBlueprint(unit.id);
    if (!blueprint) {
      blockers.push(`${unit.id}: missing UnitBlueprint`);
      continue;
    }

    const interaction = blueprint.interaction;
    if (!engineIds.has(interaction.engineId)) blockers.push(`${unit.id}: unknown engineId ${interaction.engineId}`);
    if (interaction.patternId < 1 || interaction.patternId > 20) blockers.push(`${unit.id}: patternId outside 1..20`);
    if (!hasText(interaction.componentName, 2)) blockers.push(`${unit.id}: missing legacy componentName`);
    if (interaction.variables.length < 1) blockers.push(`${unit.id}: missing interaction variables`);
    if (Object.keys(interaction.engineData).length < 1) blockers.push(`${unit.id}: missing engineData`);
    if (!hasText(interaction.contentHints.observe, 20)) blockers.push(`${unit.id}: missing contentHints.observe`);
    if (blueprint.implementationStatus.renderer !== 'pattern-engine') blockers.push(`${unit.id}: renderer is not pattern-engine`);
    for (const variable of interaction.variables) {
      if (!hasText(variable.id, 1)) blockers.push(`${unit.id}: interaction variable missing id`);
      if (!hasText(variable.label, 2)) blockers.push(`${unit.id}: interaction variable ${variable.id} missing label`);
      if (interaction.initialState[variable.id] === undefined) {
        blockers.push(`${unit.id}: variable ${variable.id} missing initialState`);
      }
    }
    if (interaction.feedbackRules.length < 2) blockers.push(`${unit.id}: feedbackRules must include at least 2 rules`);
    if (interaction.misconceptionResponses.length < 1) blockers.push(`${unit.id}: missing misconception responses`);
    if (interaction.acceptanceCriteria.length < 3) blockers.push(`${unit.id}: acceptanceCriteria must include at least 3 criteria`);
    if (!interaction.acceptanceCriteria.some((criterion) => criterion.viewport === 'mobile' || criterion.viewport === 'both')) {
      blockers.push(`${unit.id}: acceptanceCriteria lacks mobile coverage`);
    }
    if (interaction.uiState.minTouchTargetPx < 44) blockers.push(`${unit.id}: touch target below 44px`);
    if (interaction.uiState.mobile.minViewportWidth > 360) blockers.push(`${unit.id}: mobile minimum viewport exceeds 360px`);
  }

  return {
    checked: allUnits.length,
    blockers,
  };
}
