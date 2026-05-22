'use client';

import { PatternEngineScaffold } from './PatternEngineScaffold';
import type { PatternEngineProps } from './types';

export function ClassificationSortPatternEngine(props: PatternEngineProps) {
  return <PatternEngineScaffold {...props} engineId="classification-sort" />;
}
