'use client';

import { PatternEngineScaffold } from './PatternEngineScaffold';
import type { PatternEngineProps } from './types';

export function MapExplorerPatternEngine(props: PatternEngineProps) {
  return <PatternEngineScaffold {...props} engineId="map-explorer" />;
}
