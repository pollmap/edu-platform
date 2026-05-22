'use client';

import { PatternEngineScaffold } from './PatternEngineScaffold';
import type { PatternEngineProps } from './types';

export function DataVisualizationPatternEngine(props: PatternEngineProps) {
  return <PatternEngineScaffold {...props} engineId="data-visualization" />;
}
