// 모든 단원 메타데이터의 단일 진입점.
// 파일별 분할은 lib/curriculum.ts 비대화 방지 (Plan v2 §5/§40).

import type { HighSchoolUnit, Unit } from '../types';
import { COMMON_CROSS_GRADE_UNITS } from './common-cross-grade';
import { ELEMENTARY_UNITS } from './elementary';
import { HIGHSCHOOL_CAREER_UNITS } from './highschool-career';
import { HIGHSCHOOL_COMMON_UNITS } from './highschool-common';
import { HIGHSCHOOL_FUSION_UNITS } from './highschool-fusion';
import { HIGHSCHOOL_GENERAL_UNITS } from './highschool-general';
import { MIDDLE_UNITS } from './middle';

export type { Unit, HighSchoolUnit } from '../types';
export {
  GRADE_LABEL,
  HS_CATEGORY_LABEL,
  PRIORITY_LABEL,
  SUBJECT_COLOR_VAR,
  SUBJECT_LABEL,
  SUBJECT_TAILWIND,
} from '../types';

export const HIGHSCHOOL_UNITS: HighSchoolUnit[] = [
  ...HIGHSCHOOL_COMMON_UNITS,
  ...HIGHSCHOOL_GENERAL_UNITS,
  ...HIGHSCHOOL_CAREER_UNITS,
  ...HIGHSCHOOL_FUSION_UNITS,
];

export const CURRICULUM: Unit[] = [
  ...ELEMENTARY_UNITS,
  ...MIDDLE_UNITS,
  ...COMMON_CROSS_GRADE_UNITS,
  // HighSchoolUnit 은 Unit 의 슈퍼셋이라 직접 합치지 않음. 필요 시 unionUnits 사용.
];

export function findUnit(id: string): Unit | HighSchoolUnit | undefined {
  return CURRICULUM.find((u) => u.id === id) ?? HIGHSCHOOL_UNITS.find((u) => u.id === id);
}

export function isHighSchoolUnit(u: Unit | HighSchoolUnit): u is HighSchoolUnit {
  return u.schoolLevel === 'highschool';
}

export function unitPath(u: Unit | HighSchoolUnit): string {
  if (isHighSchoolUnit(u)) {
    return `/highschool/${u.subject}/${u.course}/${u.id}`;
  }
  if (u.schoolLevel === 'cross-grade') {
    // 학년 공통은 그 단원이 적용 가능한 첫 학년 페이지에 둠 (라우팅 결정 추후)
    return `/common/${u.subject}/${u.id}`;
  }
  return `/grade-${u.grade}/${u.subject}/${u.id}`;
}
