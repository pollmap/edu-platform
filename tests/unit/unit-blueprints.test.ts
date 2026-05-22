import { describe, expect, it } from 'vitest';
import { CURRICULUM, HIGHSCHOOL_UNITS } from '@/lib/curriculum';
import {
  OFFICIAL_VERIFIED_UNIT_TARGET,
  UNIT_CONTENT,
} from '@/lib/unit-content';
import {
  ENGINE_REPRESENTATIVE_UNITS,
  PATTERN_ENGINE_CATALOG,
  UNIT_BLUEPRINTS,
  getUnitBlueprint,
} from '@/lib/unit-blueprints';
import {
  auditUnitBlueprints,
  auditUnitInteractions,
} from '@/lib/unit-blueprints/audits';
import { getUnitInteractiveRenderPlan } from '@/lib/unit-blueprints/render-plan';

const allUnits = [...CURRICULUM, ...HIGHSCHOOL_UNITS];
const allUnitIds = new Set(allUnits.map((unit) => unit.id));
const engineIds = new Set(PATTERN_ENGINE_CATALOG.map((engine) => engine.engineId));

function authoredContentLength(unitId: string): number {
  const content = UNIT_CONTENT[unitId];
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

describe('unit blueprint registry', () => {
  it('has one blueprint for every officially verified unit and no extras', () => {
    expect(allUnits).toHaveLength(OFFICIAL_VERIFIED_UNIT_TARGET);
    expect(Object.keys(UNIT_BLUEPRINTS)).toHaveLength(OFFICIAL_VERIFIED_UNIT_TARGET);

    for (const unit of allUnits) {
      expect(getUnitBlueprint(unit.id), `${unit.id} missing UnitBlueprint`).toBeDefined();
    }

    for (const unitId of Object.keys(UNIT_BLUEPRINTS)) {
      expect(allUnitIds.has(unitId), `${unitId} blueprint without registered unit`).toBe(true);
    }
  });

  it('keeps source-backed content inside the blueprint contract', () => {
    for (const unit of allUnits) {
      const blueprint = getUnitBlueprint(unit.id)!;
      const sourceRefs = blueprint.sourceRefs;

      expect(blueprint.unitId).toBe(unit.id);
      expect(blueprint.content.unitId).toBe(unit.id);
      expect(sourceRefs.length, `${unit.id} sourceRefs`).toBeGreaterThanOrEqual(2);
      expect(
        sourceRefs.every((ref) =>
          ref.sourceType &&
          ref.documentTitle.trim() &&
          ref.documentDate.trim() &&
          ref.locator.trim() &&
          ref.evidenceText.trim() &&
          ref.retrievedAt.trim() &&
          ref.verificationStatus === 'verified' &&
          (ref.officialUrl || ref.document)
        ),
        `${unit.id} sourceRefs must include full provenance fields`,
      ).toBe(true);
      expect(
        sourceRefs.some((ref) => ref.officialUrl?.includes('ncic.re.kr')),
        `${unit.id} must retain NCIC provenance`,
      ).toBe(true);

      expect(authoredContentLength(unit.id), `${unit.id} content length`).toBeGreaterThanOrEqual(1200);
      expect(blueprint.content.examples, `${unit.id} examples`).toHaveLength(3);
      expect(blueprint.content.miniProblems.map((item) => item.kind), unit.id).toEqual([
        'concept-check',
        'application',
        'mistake-or-transfer',
      ]);
      expect(blueprint.content.answerExplanations, `${unit.id} answers`).toHaveLength(3);
      expect(blueprint.content.commonMistakes.length, `${unit.id} mistakes`).toBeGreaterThanOrEqual(1);
      expect(blueprint.content.realLifeApplications.length, `${unit.id} applications`).toBeGreaterThanOrEqual(1);
    }
  });
});

describe('unit interaction blueprints', () => {
  it('defines the 20 pattern engines used by the catalog', () => {
    expect(PATTERN_ENGINE_CATALOG).toHaveLength(20);
    expect(engineIds.size).toBe(20);
    expect(PATTERN_ENGINE_CATALOG.map((engine) => engine.patternId)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
      11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ]);
  });

  it('gives every unit an engine, variables, feedback, and mobile acceptance criteria', () => {
    for (const unit of allUnits) {
      const interaction = getUnitBlueprint(unit.id)!.interaction;

      expect(engineIds.has(interaction.engineId), `${unit.id} engine`).toBe(true);
      expect(interaction.variables.length, `${unit.id} variables`).toBeGreaterThanOrEqual(1);
      for (const variable of interaction.variables) {
        expect(interaction.initialState[variable.id], `${unit.id} ${variable.id} initialState`).toBeDefined();
      }
      expect(interaction.feedbackRules.length, `${unit.id} feedback`).toBeGreaterThanOrEqual(2);
      expect(interaction.misconceptionResponses.length, `${unit.id} misconception response`).toBeGreaterThanOrEqual(1);
      expect(interaction.acceptanceCriteria.length, `${unit.id} acceptance`).toBeGreaterThanOrEqual(3);
      expect(interaction.engineData, `${unit.id} engineData`).toBeDefined();
      expect(Object.keys(interaction.engineData).length, `${unit.id} engineData keys`).toBeGreaterThan(0);
      expect(
        interaction.acceptanceCriteria.some((criterion) => criterion.viewport === 'mobile' || criterion.viewport === 'both'),
        `${unit.id} mobile acceptance`,
      ).toBe(true);
      expect(interaction.uiState.minTouchTargetPx, `${unit.id} touch target`).toBeGreaterThanOrEqual(44);
      expect(interaction.uiState.mobile.minViewportWidth, `${unit.id} mobile width`).toBeLessThanOrEqual(360);
    }
  });

  it('keeps M9-CR-03 as the slider-graph pilot with a, b, c controls', () => {
    const blueprint = getUnitBlueprint('M9-CR-03')!;

    expect(blueprint.interaction.patternId).toBe(1);
    expect(blueprint.interaction.engineId).toBe('slider-graph');
    expect(blueprint.interaction.variables.map((variable) => variable.id)).toEqual(['a', 'b', 'c']);
    expect(blueprint.implementationStatus.renderer).toBe('pattern-engine');
  });

  it('maps at least one verified unit to every concrete pattern engine', () => {
    expect(ENGINE_REPRESENTATIVE_UNITS).toHaveLength(20);
    expect(new Set(ENGINE_REPRESENTATIVE_UNITS.map((item) => item.engineId)).size).toBe(20);

    for (const item of ENGINE_REPRESENTATIVE_UNITS) {
      expect(allUnitIds.has(item.unitId), `${item.unitId} representative unit`).toBe(true);
      expect(getUnitBlueprint(item.unitId)?.interaction.engineId, item.unitId).toBe(item.engineId);
    }
  });
});

describe('unit blueprint audits', () => {
  it('returns no blockers for the current verified blueprint registry', () => {
    expect(auditUnitBlueprints().blockers).toEqual([]);
    expect(auditUnitInteractions().blockers).toEqual([]);
  });
});

describe('unit interactive render plan', () => {
  it('uses pattern engines for every verified unit with no legacy renderer fallback', () => {
    expect(getUnitInteractiveRenderPlan('M9-CR-03')).toMatchObject({
      unitId: 'M9-CR-03',
      engineId: 'slider-graph',
      mode: 'pattern-engine',
      legacyComponentName: 'QuadraticFunctionExplorer',
    });

    for (const unit of allUnits) {
      const plan = getUnitInteractiveRenderPlan(unit.id);
      const blueprint = getUnitBlueprint(unit.id)!;
      expect(plan?.mode, unit.id).toBe('pattern-engine');
      expect(blueprint.implementationStatus.content, unit.id).toBe('authored-blueprint');
      expect(blueprint.implementationStatus.renderer, unit.id).toBe('pattern-engine');
    }
  });
});
