'use client';

import { PatternEngineScaffold } from './PatternEngineScaffold';
import type { PatternEngineProps } from './types';

export function Molecular3DPatternEngine(props: PatternEngineProps) {
  return <PatternEngineScaffold {...props} engineId="molecular-3d" />;
}
