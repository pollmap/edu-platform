// 단원 메타데이터 타입 + 라벨 상수
// 현재 공식 검증 범위 392개 단원 인덱스 (docs/00-MASTER-INDEX.md) 의 코드 표현.

export type Subject = 'math' | 'science' | 'korean' | 'english' | 'social';
export type Grade = 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type Priority = 'P0' | 'P1' | 'P2';
export type Status = 'planned' | 'draft' | 'reviewed' | 'published';
export type SchoolLevel = 'elementary' | 'middle' | 'highschool' | 'cross-grade';

export type PatternId =
  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;

export interface Unit {
  id: string;
  subject: Subject;
  schoolLevel: SchoolLevel;
  grade?: Grade;
  domain: string;
  domainCode: string;
  title: string;
  interactiveTitle: string;
  priority: Priority;
  prerequisites: string[];
  achievementStandards: string[];
  componentName: string;
  status: Status;
  patternIds?: PatternId[];
}

export type HighSchoolCategory = 'common' | 'general' | 'career' | 'fusion';

export interface HighSchoolUnit extends Omit<Unit, 'grade' | 'schoolLevel'> {
  schoolLevel: 'highschool';
  category: HighSchoolCategory;
  course: string;
  courseName?: string;
  credits: number;
  evaluation: 'absolute' | 'relative';
}

export const SUBJECT_LABEL: Record<Subject, string> = {
  math: '수학',
  science: '과학',
  korean: '국어',
  english: '영어',
  social: '사회',
};

export const SUBJECT_COLOR_VAR: Record<Subject, string> = {
  math: 'var(--color-math, oklch(0.55 0.18 254))',
  science: 'var(--color-science, oklch(0.55 0.18 152))',
  korean: 'var(--color-korean, oklch(0.6 0.22 25))',
  english: 'var(--color-english, oklch(0.55 0.2 290))',
  social: 'var(--color-social, oklch(0.65 0.18 50))',
};

export const SUBJECT_TAILWIND: Record<Subject, { bg: string; text: string; border: string }> = {
  math: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-700' },
  science: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-700' },
  korean: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-700' },
  english: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-700' },
  social: { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-700' },
};

export const GRADE_LABEL: Record<Grade, string> = {
  3: '초3',
  4: '초4',
  5: '초5',
  6: '초6',
  7: '중1',
  8: '중2',
  9: '중3',
};

export const PRIORITY_LABEL: Record<Priority, string> = {
  P0: 'P0',
  P1: 'P1',
  P2: 'P2',
};

export const HS_CATEGORY_LABEL: Record<HighSchoolCategory, string> = {
  common: '공통',
  general: '일반선택',
  career: '진로선택',
  fusion: '융합선택',
};
