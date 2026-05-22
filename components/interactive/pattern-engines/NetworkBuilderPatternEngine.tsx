'use client';

import { PatternEngineScaffold } from './PatternEngineScaffold';
import type { PatternEngineProps } from './types';

export function NetworkBuilderPatternEngine(props: PatternEngineProps) {
  return <PatternEngineScaffold {...props} engineId="network-builder" />;
}
