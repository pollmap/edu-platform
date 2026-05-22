'use client';

import { PatternEngineScaffold } from './PatternEngineScaffold';
import type { PatternEngineProps } from './types';

export function ParticleSimulationPatternEngine(props: PatternEngineProps) {
  return <PatternEngineScaffold {...props} engineId="particle-simulation" />;
}
