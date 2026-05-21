import { describe, expect, it } from 'vitest';
import { CURRICULUM, findUnit, HIGHSCHOOL_UNITS } from '@/lib/curriculum';
import { buildUnitLearningMaterial } from '@/lib/learning-materials';
import { getUnitContent } from '@/lib/unit-content';

describe('buildUnitLearningMaterial', () => {
  it('creates a complete learning guide for the pilot unit', () => {
    const unit = findUnit('M9-CR-03');
    expect(unit).toBeDefined();

    const material = buildUnitLearningMaterial(unit!);

    expect(material.coreQuestion).toContain('이차함수');
    expect(material.quickSummary).toContain('이차함수');
    expect(material.learningGoals).toHaveLength(3);
    expect(material.loopSteps.map((step) => step.label)).toEqual([
      'See',
      'Touch',
      'Predict',
      'Explain',
      'Challenge',
    ]);
    expect(material.miniChallenge).toContain('이차함수');
    expect(material.misconception).toContain('이차함수');
    expect(material.application).toContain('이차함수');
    expect(material.studentOutput).toContain('이차함수');
    expect(material.reviewQuestions).toHaveLength(3);
    expect(material.sourceNote).toContain('M9-CR-03');
    expect(material.unitContent).toEqual(getUnitContent('M9-CR-03'));
  });

  it('covers every registered unit with non-empty educational material', () => {
    const units = [...CURRICULUM, ...HIGHSCHOOL_UNITS];
    expect(units).toHaveLength(392);

    for (const unit of units) {
      const material = buildUnitLearningMaterial(unit);
      expect(material.coreQuestion.length, `${unit.id} coreQuestion`).toBeGreaterThan(10);
      expect(material.quickSummary.length, `${unit.id} quickSummary`).toBeGreaterThan(40);
      expect(material.learningGoals, `${unit.id} goals`).toHaveLength(3);
      expect(material.loopSteps, `${unit.id} loopSteps`).toHaveLength(5);
      expect(material.miniChallenge.length, `${unit.id} miniChallenge`).toBeGreaterThan(30);
      expect(material.misconception.length, `${unit.id} misconception`).toBeGreaterThan(30);
      expect(material.application.length, `${unit.id} application`).toBeGreaterThan(30);
      expect(material.studentOutput.length, `${unit.id} studentOutput`).toBeGreaterThan(24);
      expect(material.reviewQuestions, `${unit.id} reviewQuestions`).toHaveLength(3);
    }
  });
});
