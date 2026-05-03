// 중1~3 단원. Sprint 2에서 parse-curriculum으로 자동 채움.
// 현재는 파일럿 M9-CR-03 만 등록.
import type { Unit } from '../types';

export const MIDDLE_UNITS: Unit[] = [
  {
    id: 'M9-CR-03',
    subject: 'math',
    schoolLevel: 'middle',
    grade: 9,
    domain: '변화와 관계',
    domainCode: 'CR',
    title: '이차함수',
    interactiveTitle: 'a·b·c 슬라이더',
    priority: 'P0',
    prerequisites: ['M8-CR-04', 'M9-CR-01'],
    achievementStandards: ['[9수03-08]'],
    componentName: 'QuadraticFunctionExplorer',
    status: 'draft',
    patternIds: [1],
  },
];
