'use client';

import { PatternEngineScaffold } from './PatternEngineScaffold';
import type { PatternEngineProps } from './types';

export function VectorMatrixPatternEngine(props: PatternEngineProps) {
  return <PatternEngineScaffold {...props} engineId="vector-matrix" />;
}
