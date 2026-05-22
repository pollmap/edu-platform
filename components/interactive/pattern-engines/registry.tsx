import type { PatternEngineId } from '@/lib/unit-blueprints';
import type { ReactElement } from 'react';
import { AstronomySimulationPatternEngine } from './AstronomySimulationPatternEngine';
import { BiologyMechanismPatternEngine } from './BiologyMechanismPatternEngine';
import { CalculusVisualizationPatternEngine } from './CalculusVisualizationPatternEngine';
import { ClassificationSortPatternEngine } from './ClassificationSortPatternEngine';
import { DataVisualizationPatternEngine } from './DataVisualizationPatternEngine';
import { EconomicsFinancePatternEngine } from './EconomicsFinancePatternEngine';
import { GeometryConstructionPatternEngine } from './GeometryConstructionPatternEngine';
import { MapExplorerPatternEngine } from './MapExplorerPatternEngine';
import { MatchingQuizPatternEngine } from './MatchingQuizPatternEngine';
import { Molecular3DPatternEngine } from './Molecular3DPatternEngine';
import { NetworkBuilderPatternEngine } from './NetworkBuilderPatternEngine';
import { ParticleSimulationPatternEngine } from './ParticleSimulationPatternEngine';
import { ProbabilitySimulationPatternEngine } from './ProbabilitySimulationPatternEngine';
import { SliderGraphPatternEngine } from './SliderGraphPatternEngine';
import { Solid3DPatternEngine } from './Solid3DPatternEngine';
import { StepAnimationPatternEngine } from './StepAnimationPatternEngine';
import { TimelinePatternEngine } from './TimelinePatternEngine';
import { TransformationConverterPatternEngine } from './TransformationConverterPatternEngine';
import { TreeBuilderPatternEngine } from './TreeBuilderPatternEngine';
import { VectorMatrixPatternEngine } from './VectorMatrixPatternEngine';
import type { PatternEngineProps } from './types';

export const PATTERN_ENGINE_COMPONENTS: Record<
  PatternEngineId,
  (props: PatternEngineProps) => ReactElement
> = {
  'slider-graph': SliderGraphPatternEngine,
  'step-animation': StepAnimationPatternEngine,
  'classification-sort': ClassificationSortPatternEngine,
  'particle-simulation': ParticleSimulationPatternEngine,
  'solid-3d': Solid3DPatternEngine,
  'geometry-construction': GeometryConstructionPatternEngine,
  timeline: TimelinePatternEngine,
  'map-explorer': MapExplorerPatternEngine,
  'network-builder': NetworkBuilderPatternEngine,
  'probability-simulation': ProbabilitySimulationPatternEngine,
  'matching-quiz': MatchingQuizPatternEngine,
  'transformation-converter': TransformationConverterPatternEngine,
  'tree-builder': TreeBuilderPatternEngine,
  'data-visualization': DataVisualizationPatternEngine,
  'calculus-visualization': CalculusVisualizationPatternEngine,
  'molecular-3d': Molecular3DPatternEngine,
  'astronomy-simulation': AstronomySimulationPatternEngine,
  'vector-matrix': VectorMatrixPatternEngine,
  'biology-mechanism': BiologyMechanismPatternEngine,
  'economics-finance': EconomicsFinancePatternEngine,
};
