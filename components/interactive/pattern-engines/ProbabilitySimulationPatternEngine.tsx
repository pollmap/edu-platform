'use client';

import { PatternEngineScaffold } from './PatternEngineScaffold';
import type { PatternEngineProps } from './types';

export function ProbabilitySimulationPatternEngine(props: PatternEngineProps) {
  return <PatternEngineScaffold {...props} engineId="probability-simulation" />;
}
