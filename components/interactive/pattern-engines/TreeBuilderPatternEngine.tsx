'use client';

import { PatternEngineScaffold } from './PatternEngineScaffold';
import type { PatternEngineProps } from './types';

export function TreeBuilderPatternEngine(props: PatternEngineProps) {
  return <PatternEngineScaffold {...props} engineId="tree-builder" />;
}
