'use client';

import { PatternEngineScaffold } from './PatternEngineScaffold';
import type { PatternEngineProps } from './types';

export function StepAnimationPatternEngine(props: PatternEngineProps) {
  return <PatternEngineScaffold {...props} engineId="step-animation" />;
}
