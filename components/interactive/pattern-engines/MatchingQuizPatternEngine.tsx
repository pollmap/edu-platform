'use client';

import { PatternEngineScaffold } from './PatternEngineScaffold';
import type { PatternEngineProps } from './types';

export function MatchingQuizPatternEngine(props: PatternEngineProps) {
  return <PatternEngineScaffold {...props} engineId="matching-quiz" />;
}
