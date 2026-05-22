'use client';

import { PatternEngineScaffold } from './PatternEngineScaffold';
import type { PatternEngineProps } from './types';

export function AstronomySimulationPatternEngine(props: PatternEngineProps) {
  return <PatternEngineScaffold {...props} engineId="astronomy-simulation" />;
}
