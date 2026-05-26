'use client';

import { PatternEngineScaffold } from './PatternEngineScaffold';
import type { PatternEngineProps } from './types';

export function CalculusVisualizationPatternEngine(props: PatternEngineProps) {
  return <PatternEngineScaffold {...props} engineId="calculus-visualization" />;
}
