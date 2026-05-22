import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { PATTERN_ENGINE_COMPONENTS } from '@/components/interactive/pattern-engines/registry';
import {
  ENGINE_REPRESENTATIVE_UNITS,
  PATTERN_ENGINE_CATALOG,
} from '@/lib/unit-blueprints';

const ROOT = process.cwd();
const ENGINE_DIR = join(ROOT, 'components', 'interactive', 'pattern-engines');

const expectedFiles = [
  'SliderGraphPatternEngine.tsx',
  'StepAnimationPatternEngine.tsx',
  'ClassificationSortPatternEngine.tsx',
  'ParticleSimulationPatternEngine.tsx',
  'Solid3DPatternEngine.tsx',
  'GeometryConstructionPatternEngine.tsx',
  'TimelinePatternEngine.tsx',
  'MapExplorerPatternEngine.tsx',
  'NetworkBuilderPatternEngine.tsx',
  'ProbabilitySimulationPatternEngine.tsx',
  'MatchingQuizPatternEngine.tsx',
  'TransformationConverterPatternEngine.tsx',
  'TreeBuilderPatternEngine.tsx',
  'DataVisualizationPatternEngine.tsx',
  'CalculusVisualizationPatternEngine.tsx',
  'Molecular3DPatternEngine.tsx',
  'AstronomySimulationPatternEngine.tsx',
  'VectorMatrixPatternEngine.tsx',
  'BiologyMechanismPatternEngine.tsx',
  'EconomicsFinancePatternEngine.tsx',
];

describe('pattern engine registry', () => {
  it('has one concrete component file per catalog engine', () => {
    for (const fileName of expectedFiles) {
      expect(existsSync(join(ENGINE_DIR, fileName)), fileName).toBe(true);
    }
  });

  it('registers every catalog engine exactly once', () => {
    expect(Object.keys(PATTERN_ENGINE_COMPONENTS).sort()).toEqual(
      PATTERN_ENGINE_CATALOG.map((engine) => engine.engineId).sort(),
    );

    for (const engine of PATTERN_ENGINE_CATALOG) {
      expect(typeof PATTERN_ENGINE_COMPONENTS[engine.engineId], engine.engineId).toBe('function');
    }
  });

  it('has representative e2e units for every engine', () => {
    expect(ENGINE_REPRESENTATIVE_UNITS.map((item) => item.engineId).sort()).toEqual(
      PATTERN_ENGINE_CATALOG.map((engine) => engine.engineId).sort(),
    );
  });
});
