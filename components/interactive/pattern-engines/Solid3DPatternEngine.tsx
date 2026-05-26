'use client';

import { PatternEngineScaffold } from './PatternEngineScaffold';
import type { PatternEngineProps } from './types';

export function Solid3DPatternEngine(props: PatternEngineProps) {
  return <PatternEngineScaffold {...props} engineId="solid-3d" />;
}
