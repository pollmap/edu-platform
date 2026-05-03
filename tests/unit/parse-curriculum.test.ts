/**
 * parse-curriculum.ts 의 분류 로직 단위 테스트.
 * 자동화 스크립트가 488개에 영향을 주므로 unit test 가 필수.
 */
import { describe, expect, it } from 'vitest';
import { COMMON_CROSS_GRADE_UNITS } from '@/lib/curriculum/common-cross-grade';
import { ELEMENTARY_UNITS } from '@/lib/curriculum/elementary';
import { HIGHSCHOOL_CAREER_UNITS } from '@/lib/curriculum/highschool-career';
import { HIGHSCHOOL_COMMON_UNITS } from '@/lib/curriculum/highschool-common';
import { HIGHSCHOOL_FUSION_UNITS } from '@/lib/curriculum/highschool-fusion';
import { HIGHSCHOOL_GENERAL_UNITS } from '@/lib/curriculum/highschool-general';
import { MIDDLE_UNITS } from '@/lib/curriculum/middle';
import { CURRICULUM, findUnit, isHighSchoolUnit, unitPath } from '@/lib/curriculum';

describe('curriculum exports', () => {
  it('CURRICULUM aggregates split files', () => {
    expect(CURRICULUM.length).toBeGreaterThan(0);
    expect(CURRICULUM).toEqual([...ELEMENTARY_UNITS, ...MIDDLE_UNITS, ...COMMON_CROSS_GRADE_UNITS]);
  });

  it('all unit IDs unique', () => {
    const ids = new Set<string>();
    for (const u of [
      ...CURRICULUM,
      ...HIGHSCHOOL_COMMON_UNITS,
      ...HIGHSCHOOL_GENERAL_UNITS,
      ...HIGHSCHOOL_CAREER_UNITS,
      ...HIGHSCHOOL_FUSION_UNITS,
    ]) {
      expect(ids.has(u.id), `Duplicate ID: ${u.id}`).toBe(false);
      ids.add(u.id);
    }
  });

  it('findUnit returns pilot M9-CR-03', () => {
    const u = findUnit('M9-CR-03');
    expect(u).toBeDefined();
    expect(u?.title).toBe('이차함수');
  });

  it('findUnit returns undefined for unknown ID', () => {
    expect(findUnit('XYZ-NA-99')).toBeUndefined();
  });

  it('isHighSchoolUnit narrows highschool entries', () => {
    const middle = findUnit('M9-CR-03');
    expect(middle && isHighSchoolUnit(middle)).toBe(false);
  });

  it('unitPath builds /grade-N/<subject>/<id>', () => {
    const u = findUnit('M9-CR-03');
    expect(u).toBeDefined();
    if (u) expect(unitPath(u)).toBe('/grade-9/math/M9-CR-03');
  });
});

describe('schema invariants', () => {
  it('every unit has required fields', () => {
    for (const u of CURRICULUM) {
      expect(u.id).toBeTruthy();
      expect(u.subject).toBeTruthy();
      expect(u.title).toBeTruthy();
      expect(u.priority).toMatch(/^P[012]$/);
    }
  });
});
