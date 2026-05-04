// Sprint 12 — fuse.js 검색 인덱스.
// Plan v2 D10: 메타+제목만, 본문 X. ~80KB 인덱스.

import type { IFuseOptions } from 'fuse.js';
import type { HighSchoolUnit, Unit } from './types';
import { CURRICULUM, HIGHSCHOOL_UNITS, isHighSchoolUnit, unitPath } from './curriculum';
import { GRADE_LABEL, HS_CATEGORY_LABEL, SUBJECT_LABEL } from './types';

export interface SearchDoc {
  id: string;
  title: string;
  domain: string;
  domainCode: string;
  interactiveTitle: string;
  subject: string;
  subjectKey: Unit['subject'];
  grade: string;
  category: string;
  url: string;
  priority: string;
  status: string;
}

function toDoc(u: Unit | HighSchoolUnit): SearchDoc {
  const subject = SUBJECT_LABEL[u.subject];
  let grade = '';
  let category = '';
  if (isHighSchoolUnit(u)) {
    grade = '고등';
    category = HS_CATEGORY_LABEL[u.category];
  } else if (u.schoolLevel === 'cross-grade') {
    grade = '학년 공통';
  } else if (u.grade !== undefined) {
    grade = GRADE_LABEL[u.grade];
  }
  return {
    id: u.id,
    title: u.title,
    domain: u.domain,
    domainCode: u.domainCode,
    interactiveTitle: u.interactiveTitle,
    subject,
    subjectKey: u.subject,
    grade,
    category,
    url: unitPath(u),
    priority: u.priority,
    status: u.status,
  };
}

export const SEARCH_DOCS: SearchDoc[] = [
  ...CURRICULUM.map(toDoc),
  ...HIGHSCHOOL_UNITS.map(toDoc),
];

export const FUSE_OPTIONS: IFuseOptions<SearchDoc> = {
  includeScore: false,
  threshold: 0.4,
  ignoreLocation: true,
  minMatchCharLength: 2,
  keys: [
    { name: 'title', weight: 0.45 },
    { name: 'id', weight: 0.2 },
    { name: 'interactiveTitle', weight: 0.15 },
    { name: 'domain', weight: 0.1 },
    { name: 'subject', weight: 0.05 },
    { name: 'grade', weight: 0.03 },
    { name: 'category', weight: 0.02 },
  ],
};
