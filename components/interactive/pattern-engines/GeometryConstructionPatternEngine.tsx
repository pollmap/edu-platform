'use client';

import { PatternEngineScaffold } from './PatternEngineScaffold';
import type { PatternEngineProps } from './types';

export function GeometryConstructionPatternEngine(props: PatternEngineProps) {
  return <PatternEngineScaffold {...props} engineId="geometry-construction" />;
}
