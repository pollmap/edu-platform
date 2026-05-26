import type { LearningUnitSummary } from './learning';
import {
  CURRICULUM,
  GRADE_LABEL,
  HIGHSCHOOL_UNITS,
  isHighSchoolUnit,
  unitPath,
} from './curriculum';
import type { HighSchoolUnit, Unit } from './types';

function gradeLabelFor(unit: Unit | HighSchoolUnit): string {
  if (isHighSchoolUnit(unit)) return unit.courseName || '고등';
  if (unit.schoolLevel === 'cross-grade') return '공통';
  return unit.grade ? GRADE_LABEL[unit.grade] : '공통';
}

export function toLearningUnitSummary(unit: Unit | HighSchoolUnit): LearningUnitSummary {
  return {
    id: unit.id,
    title: unit.title,
    subject: unit.subject,
    gradeLabel: gradeLabelFor(unit),
    domain: unit.domain,
    href: unitPath(unit),
    priority: unit.priority,
    interactiveTitle: unit.interactiveTitle,
  };
}

export function getTotalUnitCount(): number {
  return CURRICULUM.length + HIGHSCHOOL_UNITS.length;
}

export function getLearningUnits(): LearningUnitSummary[] {
  return [...CURRICULUM, ...HIGHSCHOOL_UNITS]
    .filter((unit) => unit.status !== 'planned')
    .map(toLearningUnitSummary);
}
