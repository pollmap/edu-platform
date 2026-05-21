import { describe, expect, it } from 'vitest';
import { CURRICULUM, HIGHSCHOOL_UNITS } from '@/lib/curriculum';
import {
  OFFICIAL_VERIFIED_UNIT_TARGET,
  UNIT_CONTENT,
  getUnitContent,
} from '@/lib/unit-content';

const allUnits = [...CURRICULUM, ...HIGHSCHOOL_UNITS];
const allUnitIds = new Set(allUnits.map((unit) => unit.id));

describe('unit content registry', () => {
  it('has detailed content for every officially verified registered unit', () => {
    expect(allUnits).toHaveLength(OFFICIAL_VERIFIED_UNIT_TARGET);
    expect(Object.keys(UNIT_CONTENT)).toHaveLength(OFFICIAL_VERIFIED_UNIT_TARGET);

    for (const unit of allUnits) {
      expect(getUnitContent(unit.id), `${unit.id} missing UnitContent`).toBeDefined();
    }
  });

  it('keeps each unit content item source-backed and complete', () => {
    for (const unit of allUnits) {
      const content = getUnitContent(unit.id);
      expect(content, unit.id).toBeDefined();
      expect(content!.unitId).toBe(unit.id);
      expect(content!.sourceRefs.length, `${unit.id} sourceRefs`).toBeGreaterThanOrEqual(2);
      expect(content!.sourceRefs.every((ref) => ref.title.trim().length > 0), `${unit.id} source title`).toBe(true);
      expect(content!.sourceRefs.some((ref) => ref.url || ref.document), `${unit.id} source location`).toBe(true);

      expect(content!.explanations.easy.length, `${unit.id} easy`).toBeGreaterThan(24);
      expect(content!.explanations.standard.length, `${unit.id} standard`).toBeGreaterThan(40);
      expect(content!.explanations.advanced.length, `${unit.id} advanced`).toBeGreaterThan(40);
      expect(content!.examples.length, `${unit.id} examples`).toBeGreaterThanOrEqual(2);
      expect(content!.commonMistakes.length, `${unit.id} mistakes`).toBeGreaterThanOrEqual(1);
      expect(content!.realLifeApplications.length, `${unit.id} applications`).toBeGreaterThanOrEqual(1);
    }
  });

  it('uses the fixed three-question mini quiz structure', () => {
    for (const unit of allUnits) {
      const content = getUnitContent(unit.id)!;
      expect(content.miniQuiz.map((item) => item.kind), unit.id).toEqual([
        'concept-check',
        'application',
        'mistake-or-transfer',
      ]);
      for (const item of content.miniQuiz) {
        expect(item.question.trim().length, `${unit.id} quiz question`).toBeGreaterThan(12);
        expect(item.answer.trim().length, `${unit.id} quiz answer`).toBeGreaterThan(1);
        expect(item.explanation.trim().length, `${unit.id} quiz explanation`).toBeGreaterThan(20);
      }
    }
  });

  it('only links nextUnitIds that exist in the current unit registry', () => {
    for (const unit of allUnits) {
      const content = getUnitContent(unit.id)!;
      for (const nextUnitId of content.nextUnitIds) {
        expect(allUnitIds.has(nextUnitId), `${unit.id} nextUnitId ${nextUnitId}`).toBe(true);
      }
    }
  });
});
