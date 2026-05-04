/**
 * 단원별 추가 메타데이터 오버라이드.
 *
 * parse-curriculum 의 출력은 마스터 인덱스 표 정보만 담음 (status='planned').
 * 단원 작업이 시작되면 여기에 추가 메타를 박아 두면 자동 머지된다.
 *
 * 머지 규칙: lib/curriculum/index.ts 의 applyOverrides 가
 *   parse 출력 객체 + override = 최종 객체 로 spread 합성한다.
 *
 * 추가 항목 예:
 *   - status: 'draft' | 'reviewed' | 'published'
 *   - prerequisites
 *   - achievementStandards (NCIC 성취기준 코드)
 *   - componentName (인터랙티브 React 컴포넌트 export 명)
 *   - patternIds (02-component-catalog 의 1~20)
 */
import type { HighSchoolUnit, Unit } from '../types';

type Override = Partial<Omit<Unit, 'id'>> & Partial<Omit<HighSchoolUnit, 'id'>>;

export const UNIT_OVERRIDES: Record<string, Override> = {
  'M9-CR-03': {
    status: 'draft',
    prerequisites: ['M8-CR-04', 'M9-CR-01'],
    achievementStandards: ['[9수03-08]'],
    componentName: 'QuadraticFunctionExplorer',
    patternIds: [1],
  },
  'H5-HI-01': {
    status: 'draft',
    prerequisites: [],
    achievementStandards: ['[6사07-01]', '[6사07-02]'],
    componentName: 'KoreanHistoryTimeline',
    patternIds: [7],
  },
  'M5-NA-04': {
    status: 'draft',
    prerequisites: ['M5-NA-03', 'M4-NA-03'],
    achievementStandards: ['[6수01-09]'],
    componentName: 'FractionAddSubExplorer',
    patternIds: [1, 12],
  },
  'E-GR-04': {
    status: 'draft',
    prerequisites: ['E-GR-03'],
    achievementStandards: [],
    componentName: 'TenseTimelineExplorer',
    patternIds: [7, 12],
  },
  'H8-SO-02': {
    status: 'draft',
    prerequisites: ['H8-SO-01'],
    achievementStandards: ['[9사(일사)05-01]'],
    componentName: 'SupplyDemandExplorer',
    patternIds: [1, 14],
  },
  'S7-MA-01': {
    status: 'draft',
    prerequisites: ['S3-MA-02'],
    achievementStandards: ['[9과02-01]'],
    componentName: 'ParticleStateSimulator',
    patternIds: [4],
  },
  'M3-NA-04': {
    status: 'draft',
    prerequisites: [],
    achievementStandards: ['[4수01-10]'],
    componentName: 'FractionMeaningExplorer',
    patternIds: [12],
  },
  'M7-NA-01': {
    status: 'draft',
    prerequisites: [],
    achievementStandards: ['[9수01-01]'],
    componentName: 'PrimeFactorTree',
    patternIds: [13],
  },
  'M7-NA-02': {
    status: 'draft',
    prerequisites: ['M7-NA-01'],
    achievementStandards: ['[9수01-02]'],
    componentName: 'IntegerNumberLine',
    patternIds: [1],
  },
  'K-RD-01': {
    status: 'draft',
    prerequisites: [],
    achievementStandards: [],
    componentName: 'TextStructureTree',
    patternIds: [13],
  },
  'E-VOC-01': {
    status: 'draft',
    prerequisites: [],
    achievementStandards: [],
    componentName: 'PhonicsExplorer',
    patternIds: [11],
  },
};
