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
  'M3-NA-01': {
    status: 'draft',
    prerequisites: [],
    achievementStandards: ['[4수01-02]'],
    componentName: 'PlaceValueBlocks',
    patternIds: [12],
  },
  'M6-NA-01': {
    status: 'draft',
    prerequisites: ['M5-NA-04'],
    achievementStandards: ['[6수01-10]'],
    componentName: 'FractionDivisionExplorer',
    patternIds: [12],
  },
  'M6-CR-01': {
    status: 'draft',
    prerequisites: [],
    achievementStandards: ['[6수02-08]'],
    componentName: 'RatioExplorer',
    patternIds: [14],
  },
  'M6-CR-02': {
    status: 'draft',
    prerequisites: ['M6-CR-01'],
    achievementStandards: ['[6수02-09]'],
    componentName: 'ProportionBalance',
    patternIds: [6, 14],
  },
  'S5-MA-02': {
    status: 'draft',
    prerequisites: [],
    achievementStandards: ['[6과11-01]'],
    componentName: 'PHIndicator',
    patternIds: [1],
  },
  'S5-LI-01': {
    status: 'draft',
    prerequisites: [],
    achievementStandards: ['[6과10-01]'],
    componentName: 'BiologyClassificationTree',
    patternIds: [13],
  },
  'M4-NA-01': {
    status: 'draft',
    prerequisites: ['M3-NA-01'],
    achievementStandards: ['[4수01-01]'],
    componentName: 'BigNumberPlaceValue',
    patternIds: [12],
  },
  'M4-NA-04': {
    status: 'draft',
    prerequisites: ['M3-NA-01'],
    achievementStandards: ['[4수01-15]'],
    componentName: 'DecimalPlaceColumns',
    patternIds: [12],
  },
  'M4-CR-01': {
    status: 'draft',
    prerequisites: [],
    achievementStandards: ['[4수02-01]'],
    componentName: 'SequencePatternDetector',
    patternIds: [14],
  },
  'M5-CR-01': {
    status: 'draft',
    prerequisites: ['M4-CR-01'],
    achievementStandards: ['[6수02-01]'],
    componentName: 'FunctionBoxExplorer',
    patternIds: [1, 14],
  },
  'S5-LI-02': {
    status: 'draft',
    prerequisites: ['S5-LI-01'],
    achievementStandards: ['[6과13-01]'],
    componentName: 'FoodWebExplorer',
    patternIds: [13],
  },
  'S5-EU-01': {
    status: 'draft',
    prerequisites: [],
    achievementStandards: ['[6과14-01]'],
    componentName: 'SolarSystemExplorer',
    patternIds: [17],
  },
  'H4-GE-01': {
    status: 'draft',
    prerequisites: [],
    achievementStandards: ['[4사02-01]'],
    componentName: 'KoreaRegionExplorer',
    patternIds: [8],
  },
  'H6-HI-01': {
    status: 'draft',
    prerequisites: ['H5-HI-01'],
    achievementStandards: ['[6사07-04]'],
    componentName: 'KoreanModernHistoryTimeline',
    patternIds: [7],
  },
  'M5-DP-01': {
    status: 'draft',
    prerequisites: [],
    achievementStandards: ['[6수04-01]'],
    componentName: 'AverageSimulator',
    patternIds: [10, 14],
  },
  'M6-DP-01': {
    status: 'draft',
    prerequisites: ['M5-DP-01', 'M6-CR-01'],
    achievementStandards: ['[6수04-04]'],
    componentName: 'PercentChart',
    patternIds: [14],
  },
  'M5-GM-01': {
    status: 'draft',
    prerequisites: [],
    achievementStandards: ['[6수03-04]'],
    componentName: 'PolygonAreaExplorer',
    patternIds: [6],
  },
  'S6-LI-01': {
    status: 'draft',
    prerequisites: ['S5-LI-01'],
    achievementStandards: ['[6과12-01]'],
    componentName: 'HumanBodySystems',
    patternIds: [8, 13],
  },
  'S6-LI-02': {
    status: 'draft',
    prerequisites: ['S6-LI-01'],
    achievementStandards: ['[6과12-02]'],
    componentName: 'PhotosynthesisExplorer',
    patternIds: [1, 4],
  },
  'S6-EU-02': {
    status: 'draft',
    prerequisites: ['S5-EU-01'],
    achievementStandards: ['[6과14-03]'],
    componentName: 'SeasonsExplorer',
    patternIds: [4, 17],
  },
  'M5-NA-05': {
    status: 'draft',
    prerequisites: ['M5-NA-04'],
    achievementStandards: ['[6수01-08]'],
    componentName: 'FractionMultiplicationExplorer',
    patternIds: [1, 12],
  },
  'K-LT-01': {
    status: 'draft',
    prerequisites: [],
    achievementStandards: [],
    componentName: 'PoemStructureExplorer',
    patternIds: [13],
  },
  'K-LT-02': {
    status: 'draft',
    prerequisites: ['K-LT-01'],
    achievementStandards: [],
    componentName: 'PlotDiagramExplorer',
    patternIds: [7, 14],
  },
  'M3-NA-02': {
    status: 'draft',
    prerequisites: ['M3-NA-01'],
    achievementStandards: ['[4수01-04]'],
    componentName: 'AreaModelMultiplication',
    patternIds: [12],
  },
  'M4-NA-02': {
    status: 'draft',
    prerequisites: ['M3-NA-02'],
    achievementStandards: ['[4수01-05]'],
    componentName: 'StandardMultiplicationAlgorithm',
    patternIds: [7],
  },
  'M4-NA-03': {
    status: 'draft',
    prerequisites: ['M3-NA-04'],
    achievementStandards: ['[4수01-13]'],
    componentName: 'FractionAddSubExplorer',
    patternIds: [12],
  },
  'M5-NA-01': {
    status: 'draft',
    prerequisites: [],
    achievementStandards: ['[6수01-01]'],
    componentName: 'OrderOfOperationsTrainer',
    patternIds: [1, 7],
  },
  'S3-LI-01': {
    status: 'draft',
    prerequisites: [],
    achievementStandards: ['[4과05-01]'],
    componentName: 'AnimalHabitatExplorer',
    patternIds: [13],
  },
  'S5-MA-01': {
    status: 'draft',
    prerequisites: [],
    achievementStandards: ['[6과07-01]'],
    componentName: 'SolutionParticleSimulator',
    patternIds: [4],
  },
  'M3-NA-03': {
    status: 'draft',
    prerequisites: ['M3-NA-02'],
    achievementStandards: ['[4수01-07]'],
    componentName: 'DivisionRemainderExplorer',
    patternIds: [12],
  },
  'M3-NA-05': {
    status: 'draft',
    prerequisites: ['M3-NA-04'],
    achievementStandards: ['[4수01-14]'],
    componentName: 'DecimalPlaceColumns',
    patternIds: [12],
  },
  'M5-NA-02': {
    status: 'draft',
    prerequisites: ['M3-NA-03'],
    achievementStandards: ['[6수01-02]'],
    componentName: 'PrimeFactorTree',
    patternIds: [13],
  },
  'M5-NA-03': {
    status: 'draft',
    prerequisites: ['M5-NA-02'],
    achievementStandards: ['[6수01-04]'],
    componentName: 'FractionAddSubExplorer',
    patternIds: [12],
  },
  'E-LIS-01': {
    status: 'draft',
    prerequisites: [],
    achievementStandards: [],
    componentName: 'PhonicsExplorer',
    patternIds: [11],
  },
  'E-SPK-01': {
    status: 'draft',
    prerequisites: ['E-LIS-01'],
    achievementStandards: [],
    componentName: 'PhonicsExplorer',
    patternIds: [11],
  },
};
