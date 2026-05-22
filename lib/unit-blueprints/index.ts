import { CURRICULUM, HIGHSCHOOL_UNITS } from '../curriculum';
import type { HighSchoolUnit, PatternId, Unit } from '../types';
import {
  UNIT_CONTENT,
  type MiniQuizKind,
  type UnitContent,
  type UnitContentCommonMistake,
  type UnitContentExample,
  type UnitContentQuizItem,
  type UnitContentRealLifeApplication,
  type UnitContentSourceRef,
} from '../unit-content';

type AnyUnit = Unit | HighSchoolUnit;

export type PatternEngineId =
  | 'slider-graph'
  | 'step-animation'
  | 'classification-sort'
  | 'particle-simulation'
  | 'solid-3d'
  | 'geometry-construction'
  | 'timeline'
  | 'map-explorer'
  | 'network-builder'
  | 'probability-simulation'
  | 'matching-quiz'
  | 'transformation-converter'
  | 'tree-builder'
  | 'data-visualization'
  | 'calculus-visualization'
  | 'molecular-3d'
  | 'astronomy-simulation'
  | 'vector-matrix'
  | 'biology-mechanism'
  | 'economics-finance';

export interface PatternEngineDefinition {
  patternId: PatternId;
  engineId: PatternEngineId;
  label: string;
  capability: string;
}

export type UnitBlueprintSourceRef = UnitContentSourceRef & {
  locator: string;
};

export interface UnitBlueprintContent {
  unitId: string;
  explanations: UnitContent['explanations'];
  examples: UnitContentExample[];
  miniProblems: UnitContentQuizItem[];
  answerExplanations: Array<{
    kind: MiniQuizKind;
    answer: string;
    explanation: string;
  }>;
  commonMistakes: UnitContentCommonMistake[];
  realLifeApplications: UnitContentRealLifeApplication[];
  nextUnitIds: string[];
}

export interface UnitInteractionContentHints {
  overview: string;
  observe: string;
  tryThis: string;
  reflect: string;
}

export type UnitInteractionControl =
  | 'slider'
  | 'stepper'
  | 'toggle'
  | 'choice'
  | 'drag'
  | 'input';

export type UnitInteractionVariable = {
  id: string;
  label: string;
  control: UnitInteractionControl;
  initial: string | number | boolean;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  options?: string[];
};

export interface UnitInteractionFeedbackRule {
  id: string;
  trigger: string;
  message: string;
  severity: 'hint' | 'success' | 'warning';
}

export interface UnitInteractionAcceptanceCriterion {
  id: string;
  description: string;
  viewport: 'desktop' | 'mobile' | 'both';
}

export interface UnitBlueprintInteraction {
  patternId: PatternId;
  engineId: PatternEngineId;
  title: string;
  componentName: string;
  variables: UnitInteractionVariable[];
  initialState: Record<string, string | number | boolean>;
  contentHints: UnitInteractionContentHints;
  engineData: Record<string, unknown>;
  uiState: {
    layout: 'split-panel' | 'single-panel' | 'stacked';
    minTouchTargetPx: number;
    mobile: {
      minViewportWidth: number;
      layout: 'stacked';
    };
  };
  feedbackRules: UnitInteractionFeedbackRule[];
  misconceptionResponses: Array<{
    misconception: string;
    response: string;
  }>;
  acceptanceCriteria: UnitInteractionAcceptanceCriterion[];
}

export interface UnitBlueprint {
  unitId: string;
  sourceRefs: UnitBlueprintSourceRef[];
  content: UnitBlueprintContent;
  interaction: UnitBlueprintInteraction;
  implementationStatus: {
    sourceVerification: 'official-verified' | 'official-verified-with-local-evidence';
    content: 'authored-blueprint';
    renderer: 'pattern-engine';
  };
}

export const PATTERN_ENGINE_CATALOG: PatternEngineDefinition[] = [
  { patternId: 1, engineId: 'slider-graph', label: 'Slider to graph', capability: 'Numeric variables update a graph or formula.' },
  { patternId: 2, engineId: 'step-animation', label: 'Step animation', capability: 'Ordered steps animate an algorithm or process.' },
  { patternId: 3, engineId: 'classification-sort', label: 'Classification sort', capability: 'Items move into concept categories with feedback.' },
  { patternId: 4, engineId: 'particle-simulation', label: 'Particle simulation', capability: 'Particles respond to physical or chemical conditions.' },
  { patternId: 5, engineId: 'solid-3d', label: '3D solid', capability: 'Solid objects rotate and expose geometric properties.' },
  { patternId: 6, engineId: 'geometry-construction', label: 'Geometry construction', capability: 'Shapes expose lengths, angles, and invariants.' },
  { patternId: 7, engineId: 'timeline', label: 'Timeline', capability: 'Events are placed and filtered across time.' },
  { patternId: 8, engineId: 'map-explorer', label: 'Map explorer', capability: 'Spatial layers and regions are compared.' },
  { patternId: 9, engineId: 'network-builder', label: 'Network builder', capability: 'Nodes and edges model flows or relationships.' },
  { patternId: 10, engineId: 'probability-simulation', label: 'Probability simulation', capability: 'Repeated trials compare empirical and theoretical results.' },
  { patternId: 11, engineId: 'matching-quiz', label: 'Matching quiz', capability: 'Cards or prompts match with immediate feedback.' },
  { patternId: 12, engineId: 'transformation-converter', label: 'Transformation converter', capability: 'Inputs transform into equivalent expressions or forms.' },
  { patternId: 13, engineId: 'tree-builder', label: 'Tree builder', capability: 'Hierarchical structures expand and contract.' },
  { patternId: 14, engineId: 'data-visualization', label: 'Data visualization', capability: 'Tables and data points become charts.' },
  { patternId: 15, engineId: 'calculus-visualization', label: 'Calculus visualization', capability: 'Limits, tangent slopes, areas, and accumulation are shown.' },
  { patternId: 16, engineId: 'molecular-3d', label: 'Molecular 3D', capability: 'Atoms, bonds, and molecular geometry are manipulated.' },
  { patternId: 17, engineId: 'astronomy-simulation', label: 'Astronomy simulation', capability: 'Orbital or celestial variables change over time.' },
  { patternId: 18, engineId: 'vector-matrix', label: 'Vector and matrix', capability: 'Vectors, matrices, and transformations update a plane.' },
  { patternId: 19, engineId: 'biology-mechanism', label: 'Biology mechanism', capability: 'Biological mechanisms advance through causal stages.' },
  { patternId: 20, engineId: 'economics-finance', label: 'Economics and finance', capability: 'Economic variables drive scenario and chart outputs.' },
];

const PATTERN_ENGINES = Object.fromEntries(
  PATTERN_ENGINE_CATALOG.map((engine) => [engine.patternId, engine]),
) as Record<PatternId, PatternEngineDefinition>;

export const ENGINE_REPRESENTATIVE_UNITS: Array<{
  engineId: PatternEngineId;
  unitId: string;
}> = [
  { engineId: 'slider-graph', unitId: 'M9-CR-03' },
  { engineId: 'step-animation', unitId: 'M5-NA-01' },
  { engineId: 'classification-sort', unitId: 'M6-NA-02' },
  { engineId: 'particle-simulation', unitId: 'S7-MA-01' },
  { engineId: 'solid-3d', unitId: 'M6-GM-01' },
  { engineId: 'geometry-construction', unitId: 'M3-GM-01' },
  { engineId: 'timeline', unitId: 'H4-HI-01' },
  { engineId: 'map-explorer', unitId: 'H4-GE-01' },
  { engineId: 'network-builder', unitId: 'H7-SO-01' },
  { engineId: 'probability-simulation', unitId: 'M5-DP-01' },
  { engineId: 'matching-quiz', unitId: 'E-GR-01' },
  { engineId: 'transformation-converter', unitId: 'M3-NA-01' },
  { engineId: 'tree-builder', unitId: 'S3-LI-01' },
  { engineId: 'data-visualization', unitId: 'M4-DP-01' },
  { engineId: 'calculus-visualization', unitId: 'M-CA1-01' },
  { engineId: 'molecular-3d', unitId: 'S-CHE-04' },
  { engineId: 'astronomy-simulation', unitId: 'S5-EU-01' },
  { engineId: 'vector-matrix', unitId: 'M-AM-04' },
  { engineId: 'biology-mechanism', unitId: 'S-BIO-03' },
  { engineId: 'economics-finance', unitId: 'H-FE' },
];

const REPRESENTATIVE_ENGINE_BY_UNIT = new Map(
  ENGINE_REPRESENTATIVE_UNITS.map((item) => [item.unitId, item.engineId]),
);

const ENGINE_BY_ID = Object.fromEntries(
  PATTERN_ENGINE_CATALOG.map((engine) => [engine.engineId, engine]),
) as Record<PatternEngineId, PatternEngineDefinition>;

const allUnits: AnyUnit[] = [...CURRICULUM, ...HIGHSCHOOL_UNITS];

function patternIdFor(unit: AnyUnit): PatternId {
  return unit.patternIds?.[0] ?? 1;
}

function engineFor(unit: AnyUnit): PatternEngineDefinition {
  const representativeEngineId = REPRESENTATIVE_ENGINE_BY_UNIT.get(unit.id);
  if (representativeEngineId) return ENGINE_BY_ID[representativeEngineId];
  return PATTERN_ENGINES[patternIdFor(unit)];
}

function sourceLocator(unit: AnyUnit, ref: UnitContentSourceRef): string {
  if (ref.document?.includes('00-MASTER-INDEX.md')) {
    return `${unit.id} row in docs/00-MASTER-INDEX.md`;
  }
  if (ref.document?.includes('curriculum')) {
    return `${unit.id} local curriculum metadata entry`;
  }
  if (ref.url?.includes('ncic.re.kr')) {
    return `${unit.id} curriculum structure cross-check against NCIC 2022 resources`;
  }
  if (ref.url?.includes('hscredit')) {
    return `${unit.id} high-school credit-system course context`;
  }
  return ref.note || unit.id;
}

function blueprintSourceRefs(unit: AnyUnit, content: UnitContent): UnitBlueprintSourceRef[] {
  return content.sourceRefs.map((ref) => ({
    ...ref,
    locator: ref.locator || sourceLocator(unit, ref),
  }));
}

function controlsFor(unit: AnyUnit, engineId: PatternEngineId): UnitInteractionVariable[] {
  if (unit.id === 'M9-CR-03') {
    return [
      { id: 'a', label: 'a coefficient', control: 'slider', min: -3, max: 3, step: 0.5, initial: 1 },
      { id: 'b', label: 'b coefficient', control: 'slider', min: -6, max: 6, step: 1, initial: 0 },
      { id: 'c', label: 'c intercept', control: 'slider', min: -6, max: 6, step: 1, initial: 0 },
    ];
  }

  switch (engineId) {
    case 'slider-graph':
      return [{ id: 'parameter', label: 'main parameter', control: 'slider', min: -10, max: 10, step: 1, initial: 1 }];
    case 'step-animation':
      return [{ id: 'step', label: 'step', control: 'stepper', min: 1, max: 5, step: 1, initial: 1 }];
    case 'classification-sort':
      return [{ id: 'categoryFocus', label: 'category focus', control: 'choice', initial: 'all', options: ['all', 'compare', 'review'] }];
    case 'particle-simulation':
      return [
        { id: 'particleCount', label: 'particle count', control: 'slider', min: 12, max: 120, step: 6, initial: 48 },
        { id: 'temperature', label: 'temperature', control: 'slider', min: 0, max: 100, step: 5, initial: 40 },
      ];
    case 'solid-3d':
      return [{ id: 'rotation', label: 'rotation', control: 'slider', min: 0, max: 360, step: 15, initial: 30, unit: 'deg' }];
    case 'geometry-construction':
      return [{ id: 'angle', label: 'angle', control: 'slider', min: 0, max: 180, step: 5, initial: 60, unit: 'deg' }];
    case 'timeline':
      return [{ id: 'focus', label: 'timeline focus', control: 'choice', initial: 'overview', options: ['overview', 'cause', 'effect'] }];
    case 'map-explorer':
      return [{ id: 'layer', label: 'map layer', control: 'choice', initial: 'physical', options: ['physical', 'human', 'change'] }];
    case 'network-builder':
      return [{ id: 'nodeFocus', label: 'node focus', control: 'choice', initial: 'source', options: ['source', 'flow', 'result'] }];
    case 'probability-simulation':
      return [{ id: 'trials', label: 'trials', control: 'slider', min: 10, max: 1000, step: 10, initial: 100 }];
    case 'matching-quiz':
      return [{ id: 'attempt', label: 'attempt', control: 'stepper', min: 1, max: 3, step: 1, initial: 1 }];
    case 'transformation-converter':
      return [{ id: 'inputMode', label: 'input mode', control: 'choice', initial: 'guided', options: ['guided', 'free', 'compare'] }];
    case 'tree-builder':
      return [{ id: 'depth', label: 'tree depth', control: 'slider', min: 1, max: 5, step: 1, initial: 2 }];
    case 'data-visualization':
      return [{ id: 'sampleSize', label: 'sample size', control: 'slider', min: 3, max: 30, step: 1, initial: 8 }];
    case 'calculus-visualization':
      return [{ id: 'x', label: 'x value', control: 'slider', min: -5, max: 5, step: 0.25, initial: 1 }];
    case 'molecular-3d':
      return [{ id: 'bondAngle', label: 'bond angle', control: 'slider', min: 90, max: 180, step: 5, initial: 109.5, unit: 'deg' }];
    case 'astronomy-simulation':
      return [{ id: 'timeScale', label: 'time scale', control: 'slider', min: 1, max: 365, step: 1, initial: 30, unit: 'days' }];
    case 'vector-matrix':
      return [{ id: 'scale', label: 'scale', control: 'slider', min: -3, max: 3, step: 0.25, initial: 1 }];
    case 'biology-mechanism':
      return [{ id: 'stage', label: 'stage', control: 'stepper', min: 1, max: 6, step: 1, initial: 1 }];
    case 'economics-finance':
      return [{ id: 'rate', label: 'rate', control: 'slider', min: -10, max: 20, step: 0.5, initial: 3, unit: '%' }];
  }
}

function initialStateFor(variables: UnitInteractionVariable[]): Record<string, string | number | boolean> {
  return Object.fromEntries(variables.map((variable) => [variable.id, variable.initial]));
}

function feedbackRulesFor(unit: AnyUnit): UnitInteractionFeedbackRule[] {
  return [
    {
      id: 'change-one-variable',
      trigger: 'variableChanged',
      severity: 'hint',
      message: `${unit.id}: change one variable at a time before comparing the result.`,
    },
    {
      id: 'explain-result',
      trigger: 'reflectionReady',
      severity: 'success',
      message: `${unit.id}: connect the observed change to ${unit.title}.`,
    },
  ];
}

function contentHintsFor(unit: AnyUnit, content: UnitContent): UnitInteractionContentHints {
  return {
    overview: content.explanations.easy,
    observe: `${unit.title}: change one control and compare the visible result before writing the rule.`,
    tryThis: content.examples[0]?.takeaway ?? `Use ${unit.title} to test one case and one counter-case.`,
    reflect: content.miniQuiz[2]?.question ?? `What evidence supports your answer for ${unit.id}?`,
  };
}

function engineDataFor(unit: AnyUnit, engineId: PatternEngineId): Record<string, unknown> {
  const title = unit.title;
  const domain = unit.domain || ('courseName' in unit ? unit.courseName ?? unit.course : unit.subject);
  const basePoints = [
    { label: 'start', value: 20 },
    { label: 'compare', value: 45 },
    { label: 'explain', value: 72 },
    { label: 'transfer', value: 88 },
  ];

  return {
    engineId,
    subject: unit.subject,
    unitTitle: title,
    domain,
    steps: [
      `Name the ${domain} situation.`,
      'Change one variable or choice.',
      'Compare the displayed result.',
      `Explain the result using ${title}.`,
    ],
    categories: [
      { id: 'condition', label: 'Condition', items: ['input', 'setting', 'constraint'] },
      { id: 'evidence', label: 'Evidence', items: ['diagram', 'source clue', 'measurement'] },
      { id: 'result', label: 'Result', items: ['pattern', 'claim', 'transfer'] },
    ],
    particles: Array.from({ length: 18 }, (_, index) => ({
      x: 10 + ((index * 17) % 80),
      y: 15 + ((index * 23) % 70),
      r: 2 + (index % 4),
    })),
    points: basePoints,
    timeline: [
      { label: 'Before', value: 10 },
      { label: 'Change', value: 42 },
      { label: 'Result', value: 74 },
      { label: 'Transfer', value: 96 },
    ],
    nodes: [
      { id: 'source', label: 'Source' },
      { id: 'action', label: 'Action' },
      { id: 'result', label: 'Result' },
      { id: 'reason', label: 'Reason' },
    ],
    links: [
      ['source', 'action'],
      ['action', 'result'],
      ['result', 'reason'],
    ],
    formula: unit.id === 'M9-CR-03' ? 'y = ax^2 + bx + c' : `${title} model`,
  };
}

function acceptanceCriteriaFor(engineId: PatternEngineId): UnitInteractionAcceptanceCriterion[] {
  return [
    {
      id: 'renders-engine',
      viewport: 'both',
      description: `${engineId} renders a non-empty interactive surface.`,
    },
    {
      id: 'responds-to-controls',
      viewport: 'desktop',
      description: 'Changing a variable updates the visual state or feedback text.',
    },
    {
      id: 'mobile-360',
      viewport: 'mobile',
      description: 'The controls remain usable at a 360px viewport with no text overlap.',
    },
  ];
}

function makeBlueprint(unit: AnyUnit): UnitBlueprint {
  const content = UNIT_CONTENT[unit.id];
  if (!content) {
    throw new Error(`${unit.id}: missing UnitContent for UnitBlueprint`);
  }

  const engine = engineFor(unit);
  const patternId = engine.patternId;
  const variables = controlsFor(unit, engine.engineId);

  return {
    unitId: unit.id,
    sourceRefs: blueprintSourceRefs(unit, content),
    content: {
      unitId: unit.id,
      explanations: content.explanations,
      examples: content.examples,
      miniProblems: content.miniQuiz,
      answerExplanations: content.miniQuiz.map((quiz) => ({
        kind: quiz.kind,
        answer: quiz.answer,
        explanation: quiz.explanation,
      })),
      commonMistakes: content.commonMistakes,
      realLifeApplications: content.realLifeApplications,
      nextUnitIds: content.nextUnitIds,
    },
    interaction: {
      patternId,
      engineId: engine.engineId,
      title: unit.interactiveTitle || unit.title,
      componentName: unit.componentName,
      variables,
      initialState: initialStateFor(variables),
      contentHints: contentHintsFor(unit, content),
      engineData: engineDataFor(unit, engine.engineId),
      uiState: {
        layout: variables.length > 1 ? 'split-panel' : 'single-panel',
        minTouchTargetPx: 44,
        mobile: {
          minViewportWidth: 360,
          layout: 'stacked',
        },
      },
      feedbackRules: feedbackRulesFor(unit),
      misconceptionResponses: content.commonMistakes.map((mistake) => ({
        misconception: mistake.mistake,
        response: mistake.correction,
      })),
      acceptanceCriteria: acceptanceCriteriaFor(engine.engineId),
    },
    implementationStatus: {
      sourceVerification: content.sourceRefs.some((ref) => ref.document)
        ? 'official-verified-with-local-evidence'
        : 'official-verified',
      content: 'authored-blueprint',
      renderer: 'pattern-engine',
    },
  };
}

export const UNIT_BLUEPRINTS: Record<string, UnitBlueprint> = Object.fromEntries(
  allUnits.map((unit) => [unit.id, makeBlueprint(unit)]),
);

export function getUnitBlueprint(unitId: string): UnitBlueprint | undefined {
  return UNIT_BLUEPRINTS[unitId];
}
