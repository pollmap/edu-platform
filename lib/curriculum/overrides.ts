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
  // Sprint 4 공용 기본기 5 단원 (도착 시 enrich)
  // 'M5-NA-04': { status: 'draft', componentName: 'FractionAddSubExplorer', patternIds: [1, 12] },
  // 'E-GR-04': { status: 'draft', componentName: 'TenseTimelineExplorer', patternIds: [7, 12] },
  // 'H5-HI-01': { status: 'draft', componentName: 'KoreanHistoryTimeline', patternIds: [7] },
  // 'S7-MA-01': { status: 'draft', componentName: 'ParticleStateSimulator', patternIds: [4] },
  // 'H8-SO-02': { status: 'draft', componentName: 'SupplyDemandExplorer', patternIds: [1, 14] },
};
