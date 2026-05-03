import type { Metadata } from 'next';
import type { HighSchoolUnit, Unit } from './types';
import {
  GRADE_LABEL,
  HS_CATEGORY_LABEL,
  SUBJECT_LABEL,
} from './types';
import { isHighSchoolUnit } from './curriculum';

const SITE_NAME = '한국 초3~고3 인터랙티브 교육 플랫폼';

export function makeUnitMetadata(unit: Unit | HighSchoolUnit): Metadata {
  const subjectLabel = SUBJECT_LABEL[unit.subject];
  const levelLabel = isHighSchoolUnit(unit)
    ? `고등 ${HS_CATEGORY_LABEL[unit.category]}`
    : unit.schoolLevel === 'cross-grade'
      ? '학년 공통'
      : unit.grade !== undefined
        ? GRADE_LABEL[unit.grade]
        : '';

  const title = `${unit.title} — ${levelLabel} ${subjectLabel}`;
  const description = `${unit.title} (${unit.id}) — ${unit.interactiveTitle}. ${SITE_NAME}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      images: [
        {
          url: `/api/og?id=${encodeURIComponent(unit.id)}`,
          width: 1200,
          height: 630,
          alt: unit.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    other: {
      'data-source': 'NCIC 2022 개정 교육과정',
      'unit-id': unit.id,
      'priority': unit.priority,
    },
  };
}
