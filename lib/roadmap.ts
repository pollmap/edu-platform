import { findUnit, unitPath } from './curriculum';
import type { HighSchoolUnit, Unit } from './types';
import { getUnitContent } from './unit-content';

export type RoadmapNodeRole = 'prerequisite' | 'current' | 'next';

export interface RoadmapNode {
  id: string;
  title: string;
  domain?: string;
  href?: string;
  role: RoadmapNodeRole;
  available: boolean;
}

export interface RoadmapPreviewModel {
  prerequisites: RoadmapNode[];
  current: RoadmapNode;
  next: RoadmapNode[];
  missingIds: string[];
}

interface BuildRoadmapPreviewOptions {
  nextUnitIds?: string[];
}

type AnyUnit = Unit | HighSchoolUnit;

export function buildRoadmapPreview(
  unit: AnyUnit,
  options: BuildRoadmapPreviewOptions = {},
): RoadmapPreviewModel {
  const content = getUnitContent(unit.id);
  const nextUnitIds = options.nextUnitIds ?? content?.nextUnitIds ?? [];
  const prerequisites = unit.prerequisites.map((id) => toRoadmapNode(id, 'prerequisite', unit));
  const next = nextUnitIds.map((id) => toRoadmapNode(id, 'next', unit));
  const missingIds = [...prerequisites, ...next]
    .filter((node) => !node.available)
    .map((node) => node.id);

  return {
    prerequisites,
    current: toRoadmapNode(unit.id, 'current', unit),
    next,
    missingIds,
  };
}

function toRoadmapNode(id: string, role: RoadmapNodeRole, currentUnit: AnyUnit): RoadmapNode {
  const unit = id === currentUnit.id ? currentUnit : findUnit(id);

  if (!unit) {
    return {
      id,
      title: '등록 대기 중',
      role,
      available: false,
    };
  }

  return {
    id: unit.id,
    title: unit.title,
    domain: unit.domain,
    href: unitPath(unit),
    role,
    available: true,
  };
}
