'use client';

import { PatternEngineScaffold } from './PatternEngineScaffold';
import type { PatternEngineProps } from './types';

export function TransformationConverterPatternEngine(props: PatternEngineProps) {
  return <PatternEngineScaffold {...props} engineId="transformation-converter" />;
}
