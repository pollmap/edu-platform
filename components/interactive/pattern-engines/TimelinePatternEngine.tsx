'use client';

import { PatternEngineScaffold } from './PatternEngineScaffold';
import type { PatternEngineProps } from './types';

export function TimelinePatternEngine(props: PatternEngineProps) {
  return <PatternEngineScaffold {...props} engineId="timeline" />;
}
