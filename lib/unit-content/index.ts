import { ENGLISH_UNIT_CONTENT } from './english';
import { KOREAN_UNIT_CONTENT } from './korean';
import { MATH_UNIT_CONTENT } from './math';
import { SCIENCE_UNIT_CONTENT } from './science';
import { SOCIAL_UNIT_CONTENT } from './social';
import type { UnitContent } from './types';

export type {
  MiniQuizKind,
  UnitContent,
  UnitContentCommonMistake,
  UnitContentExample,
  UnitContentQuizItem,
  UnitContentRealLifeApplication,
  UnitContentSourceRef,
} from './types';

export const OFFICIAL_VERIFIED_UNIT_TARGET = 392;
export const UNVERIFIED_EXPANSION_CANDIDATE_COUNT = 96;

export const UNIT_CONTENT_EXPANSION_POLICY =
  'Only units verified from the master index and official curriculum sources are exposed in app data.';

const unitContentEntries = [
  ...MATH_UNIT_CONTENT,
  ...SCIENCE_UNIT_CONTENT,
  ...KOREAN_UNIT_CONTENT,
  ...ENGLISH_UNIT_CONTENT,
  ...SOCIAL_UNIT_CONTENT,
];

export const UNIT_CONTENT: Record<string, UnitContent> = Object.fromEntries(
  unitContentEntries.map((content) => [content.unitId, content]),
);

export function getUnitContent(unitId: string): UnitContent | undefined {
  return UNIT_CONTENT[unitId];
}
