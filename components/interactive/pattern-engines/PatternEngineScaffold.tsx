'use client';

import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { PatternEngineId, UnitInteractionVariable } from '@/lib/unit-blueprints';
import type { PatternEngineProps, PatternEngineState } from './types';

interface PatternEngineScaffoldProps extends PatternEngineProps {
  engineId: PatternEngineId;
}

type Point = { label: string; value: number };
type Category = { id: string; label: string; items: string[] };
type Particle = { x: number; y: number; r: number };
type Node = { id: string; label: string };

const SVG_WIDTH = 520;
const SVG_HEIGHT = 280;

export function PatternEngineScaffold({
  unitId,
  title,
  variables,
  initialState,
  feedbackRules,
  contentHints,
  engineData,
  engineId,
}: PatternEngineScaffoldProps) {
  const resolvedInitialState = useMemo<PatternEngineState>(
    () => ({ ...Object.fromEntries(variables.map((variable) => [variable.id, variable.initial])), ...initialState }),
    [initialState, variables],
  );
  const [state, setState] = useState<PatternEngineState>(resolvedInitialState);
  const primaryFeedback = feedbackRules[0]?.message ?? contentHints.observe;

  return (
    <div
      data-pattern-engine={engineId}
      className="rounded-lg border border-blue-100 bg-white p-4 shadow-sm dark:border-blue-900/60 dark:bg-zinc-950"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-xs font-bold uppercase text-blue-700 dark:text-blue-300">Pattern engine</div>
          <h2 className="mt-1 text-xl font-extrabold text-zinc-950 dark:text-zinc-50">{title}</h2>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {contentHints.observe}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setState(resolvedInitialState)}
          className="min-h-[44px] rounded-md border border-zinc-300 px-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
        >
          Reset
        </button>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(220px,0.85fr)_minmax(300px,1.15fr)]">
        <div className="space-y-4">
          {variables.map((variable) => (
            <VariableControl
              key={variable.id}
              variable={variable}
              value={state[variable.id] ?? variable.initial}
              onChange={(value) => setState((current) => ({ ...current, [variable.id]: value }))}
            />
          ))}
          <div className="rounded-md bg-blue-50 p-3 text-sm leading-relaxed text-blue-950 dark:bg-blue-950/30 dark:text-blue-100">
            {primaryFeedback}
          </div>
          <div className="rounded-md bg-zinc-50 p-3 text-xs leading-relaxed text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
            {contentHints.reflect}
          </div>
        </div>

        <div className="min-w-0">
          <EngineVisual engineId={engineId} unitId={unitId} state={state} engineData={engineData} />
        </div>
      </div>
    </div>
  );
}

function VariableControl({
  variable,
  value,
  onChange,
}: {
  variable: UnitInteractionVariable;
  value: string | number | boolean;
  onChange: (value: string | number | boolean) => void;
}) {
  if (variable.control === 'choice') {
    return (
      <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200">
        <span>{variable.label}</span>
        <select
          value={String(value)}
          onChange={(event) => onChange(event.target.value)}
          className="mt-2 min-h-[44px] w-full rounded-md border border-zinc-300 bg-white px-3 text-sm dark:border-zinc-700 dark:bg-zinc-950"
        >
          {(variable.options ?? []).map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </label>
    );
  }

  if (variable.control === 'toggle') {
    return (
      <label className="flex min-h-[44px] items-center gap-3 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(event) => onChange(event.target.checked)}
          className="h-5 w-5"
        />
        {variable.label}
      </label>
    );
  }

  if (variable.control === 'input') {
    return (
      <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200">
        <span>{variable.label}</span>
        <input
          type="text"
          value={String(value)}
          onChange={(event) => onChange(event.target.value)}
          className="mt-2 min-h-[44px] w-full rounded-md border border-zinc-300 bg-white px-3 text-sm dark:border-zinc-700 dark:bg-zinc-950"
        />
      </label>
    );
  }

  const numeric = Number(value);
  return (
    <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200">
      <span className="flex items-center justify-between gap-3">
        <span>{variable.label}</span>
        <span className="font-mono text-xs text-zinc-500">
          {numeric}
          {variable.unit ?? ''}
        </span>
      </span>
      <input
        type="range"
        min={variable.min ?? 0}
        max={variable.max ?? 10}
        step={variable.step ?? 1}
        value={numeric}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-2 h-11 w-full"
      />
    </label>
  );
}

function EngineVisual({
  engineId,
  unitId,
  state,
  engineData,
}: {
  engineId: PatternEngineId;
  unitId: string;
  state: PatternEngineState;
  engineData: Record<string, unknown>;
}) {
  switch (engineId) {
    case 'step-animation':
      return <StepVisual state={state} engineData={engineData} />;
    case 'classification-sort':
      return <ClassificationVisual state={state} engineData={engineData} />;
    case 'particle-simulation':
      return <ParticleVisual state={state} engineData={engineData} />;
    case 'solid-3d':
      return <SolidVisual state={state} />;
    case 'geometry-construction':
      return <GeometryVisual state={state} />;
    case 'timeline':
      return <TimelineVisual engineData={engineData} />;
    case 'map-explorer':
      return <MapVisual state={state} />;
    case 'network-builder':
      return <NetworkVisual engineData={engineData} />;
    case 'probability-simulation':
      return <ProbabilityVisual state={state} />;
    case 'matching-quiz':
      return <MatchingVisual engineData={engineData} />;
    case 'transformation-converter':
      return <TransformationVisual unitId={unitId} engineData={engineData} />;
    case 'tree-builder':
      return <TreeVisual state={state} engineData={engineData} />;
    case 'data-visualization':
      return <DataVisual state={state} engineData={engineData} />;
    case 'calculus-visualization':
      return <CalculusVisual state={state} />;
    case 'molecular-3d':
      return <MolecularVisual state={state} />;
    case 'astronomy-simulation':
      return <AstronomyVisual state={state} />;
    case 'vector-matrix':
      return <VectorMatrixVisual state={state} />;
    case 'biology-mechanism':
      return <BiologyVisual state={state} engineData={engineData} />;
    case 'economics-finance':
      return <EconomicsVisual state={state} />;
    default:
      return <DataVisual state={state} engineData={engineData} />;
  }
}

function pointsFrom(engineData: Record<string, unknown>): Point[] {
  return Array.isArray(engineData.points) ? engineData.points as Point[] : [];
}

function categoriesFrom(engineData: Record<string, unknown>): Category[] {
  return Array.isArray(engineData.categories) ? engineData.categories as Category[] : [];
}

function particlesFrom(engineData: Record<string, unknown>): Particle[] {
  return Array.isArray(engineData.particles) ? engineData.particles as Particle[] : [];
}

function nodesFrom(engineData: Record<string, unknown>): Node[] {
  return Array.isArray(engineData.nodes) ? engineData.nodes as Node[] : [];
}

function stepsFrom(engineData: Record<string, unknown>): string[] {
  return Array.isArray(engineData.steps) ? engineData.steps as string[] : [];
}

function VisualShell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-md border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-2 text-xs font-bold uppercase text-zinc-500 dark:text-zinc-400">{label}</div>
      {children}
    </div>
  );
}

function StepVisual({ state, engineData }: { state: PatternEngineState; engineData: Record<string, unknown> }) {
  const active = Math.max(1, Math.min(5, Number(state.step ?? 1)));
  const steps = stepsFrom(engineData);
  return (
    <VisualShell label="Step animation">
      <div className="space-y-3">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center gap-3">
            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${index + 1 <= active ? 'bg-blue-600 text-white' : 'bg-white text-zinc-500 ring-1 ring-zinc-200 dark:bg-zinc-950 dark:ring-zinc-700'}`}>
              {index + 1}
            </div>
            <div className={index + 1 === active ? 'font-semibold text-zinc-950 dark:text-zinc-50' : 'text-zinc-600 dark:text-zinc-400'}>{step}</div>
          </div>
        ))}
      </div>
    </VisualShell>
  );
}

function ClassificationVisual({ state, engineData }: { state: PatternEngineState; engineData: Record<string, unknown> }) {
  const focus = String(state.categoryFocus ?? 'all');
  const categories = categoriesFrom(engineData);
  return (
    <VisualShell label="Classification sort">
      <div className="grid gap-2 sm:grid-cols-3">
        {categories.map((category) => (
          <div key={category.id} className={`rounded-md bg-white p-3 ring-1 dark:bg-zinc-950 ${focus === category.id || focus === 'all' ? 'ring-blue-300' : 'ring-zinc-200 dark:ring-zinc-800'}`}>
            <div className="font-semibold text-zinc-950 dark:text-zinc-50">{category.label}</div>
            <div className="mt-2 flex flex-wrap gap-1">
              {category.items.map((item) => <span key={item} className="rounded bg-blue-50 px-2 py-1 text-xs text-blue-800 dark:bg-blue-950/40 dark:text-blue-100">{item}</span>)}
            </div>
          </div>
        ))}
      </div>
    </VisualShell>
  );
}

function ParticleVisual({ state, engineData }: { state: PatternEngineState; engineData: Record<string, unknown> }) {
  const count = Math.max(6, Math.min(36, Math.round(Number(state.particleCount ?? 48) / 4)));
  const temp = Number(state.temperature ?? 40);
  const particles = particlesFrom(engineData).slice(0, count);
  return (
    <VisualShell label="Particle simulation">
      <svg viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} role="img" aria-label="particle simulation surface" className="h-auto w-full rounded bg-white dark:bg-zinc-950">
        <rect width={SVG_WIDTH} height={SVG_HEIGHT} fill="currentColor" className="text-blue-50 dark:text-zinc-950" />
        {particles.map((particle, index) => (
          <circle
            key={index}
            cx={(particle.x / 100) * SVG_WIDTH}
            cy={(particle.y / 100) * SVG_HEIGHT + Math.sin(index + temp / 10) * 8}
            r={particle.r + temp / 55}
            fill={temp > 60 ? 'rgb(239 68 68)' : 'rgb(37 99 235)'}
            opacity="0.78"
          />
        ))}
      </svg>
    </VisualShell>
  );
}

function SolidVisual({ state }: { state: PatternEngineState }) {
  const rotation = Number(state.rotation ?? 30);
  return (
    <VisualShell label="3D solid">
      <div className="flex min-h-[280px] items-center justify-center">
        <div className="relative h-32 w-32" style={{ transform: `rotateX(58deg) rotateZ(${rotation}deg)`, transformStyle: 'preserve-3d' }}>
          <div className="absolute inset-0 bg-blue-500/80 ring-1 ring-blue-700" />
          <div className="absolute inset-0 translate-x-8 -translate-y-8 bg-cyan-400/75 ring-1 ring-cyan-700" />
          <div className="absolute inset-y-0 right-0 w-8 -translate-y-4 translate-x-4 skew-y-[-45deg] bg-blue-700/70" />
          <div className="absolute inset-x-0 top-0 h-8 -translate-y-8 translate-x-4 skew-x-[-45deg] bg-blue-300/75" />
        </div>
      </div>
    </VisualShell>
  );
}

function GeometryVisual({ state }: { state: PatternEngineState }) {
  const angle = Number(state.angle ?? 60);
  const x2 = 260 + Math.cos((angle * Math.PI) / 180) * 160;
  const y2 = 220 - Math.sin((angle * Math.PI) / 180) * 160;
  return (
    <VisualShell label="Geometry construction">
      <svg viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} role="img" aria-label="geometry construction surface" className="h-auto w-full rounded bg-white dark:bg-zinc-950">
        <line x1="80" y1="220" x2="440" y2="220" stroke="rgb(148 163 184)" strokeWidth="2" />
        <line x1="260" y1="220" x2={x2} y2={y2} stroke="rgb(37 99 235)" strokeWidth="4" />
        <circle cx="260" cy="220" r="5" fill="rgb(37 99 235)" />
        <path d="M 300 220 A 40 40 0 0 0 280 185" fill="none" stroke="rgb(245 158 11)" strokeWidth="4" />
        <text x="290" y="190" className="fill-zinc-800 text-sm dark:fill-zinc-100">{angle} deg</text>
      </svg>
    </VisualShell>
  );
}

function TimelineVisual({ engineData }: { engineData: Record<string, unknown> }) {
  const events = Array.isArray(engineData.timeline) ? engineData.timeline as Point[] : [];
  return (
    <VisualShell label="Timeline">
      <svg viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} role="img" aria-label="timeline surface" className="h-auto w-full rounded bg-white dark:bg-zinc-950">
        <line x1="52" y1="140" x2="468" y2="140" stroke="rgb(148 163 184)" strokeWidth="3" />
        {events.map((event, index) => {
          const x = 52 + (event.value / 100) * 416;
          return (
            <g key={event.label}>
              <circle cx={x} cy="140" r="12" fill="rgb(37 99 235)" />
              <text x={x} y={index % 2 === 0 ? 105 : 182} textAnchor="middle" className="fill-zinc-800 text-xs dark:fill-zinc-100">{event.label}</text>
            </g>
          );
        })}
      </svg>
    </VisualShell>
  );
}

function MapVisual({ state }: { state: PatternEngineState }) {
  const layer = String(state.layer ?? 'physical');
  return (
    <VisualShell label="Map explorer">
      <svg viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} role="img" aria-label="map explorer surface" className="h-auto w-full rounded bg-white dark:bg-zinc-950">
        <path d="M80 70 L205 42 L280 95 L248 180 L120 205 Z" fill={layer === 'physical' ? 'rgb(34 197 94)' : 'rgb(147 197 253)'} opacity="0.85" />
        <path d="M285 62 L430 82 L455 190 L330 230 L260 160 Z" fill={layer === 'human' ? 'rgb(245 158 11)' : 'rgb(125 211 252)'} opacity="0.85" />
        <path d="M130 205 L248 180 L330 230 L200 250 Z" fill={layer === 'change' ? 'rgb(239 68 68)' : 'rgb(96 165 250)'} opacity="0.75" />
        <text x="36" y="34" className="fill-zinc-700 text-sm dark:fill-zinc-200">Layer: {layer}</text>
      </svg>
    </VisualShell>
  );
}

function NetworkVisual({ engineData }: { engineData: Record<string, unknown> }) {
  const nodes = nodesFrom(engineData);
  const positions = [{ x: 110, y: 70 }, { x: 300, y: 60 }, { x: 410, y: 180 }, { x: 180, y: 220 }];
  return (
    <VisualShell label="Network builder">
      <svg viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} role="img" aria-label="network builder surface" className="h-auto w-full rounded bg-white dark:bg-zinc-950">
        <polyline points={positions.map((p) => `${p.x},${p.y}`).join(' ')} fill="none" stroke="rgb(37 99 235)" strokeWidth="4" strokeLinecap="round" />
        {nodes.map((node, index) => (
          <g key={node.id}>
            <circle cx={positions[index]?.x ?? 80} cy={positions[index]?.y ?? 80} r="28" fill="rgb(219 234 254)" stroke="rgb(37 99 235)" strokeWidth="3" />
            <text x={positions[index]?.x ?? 80} y={(positions[index]?.y ?? 80) + 4} textAnchor="middle" className="fill-blue-950 text-xs font-bold">{node.label}</text>
          </g>
        ))}
      </svg>
    </VisualShell>
  );
}

function ProbabilityVisual({ state }: { state: PatternEngineState }) {
  const trials = Number(state.trials ?? 100);
  const empirical = 42 + Math.sin(trials / 80) * 12;
  return (
    <VisualShell label="Probability simulation">
      <svg viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} role="img" aria-label="probability simulation surface" className="h-auto w-full rounded bg-white dark:bg-zinc-950">
        <rect x="120" y={230 - empirical * 2} width="88" height={empirical * 2} fill="rgb(37 99 235)" />
        <rect x="300" y="130" width="88" height="100" fill="rgb(16 185 129)" />
        <text x="164" y="250" textAnchor="middle" className="fill-zinc-800 text-sm dark:fill-zinc-100">empirical</text>
        <text x="344" y="250" textAnchor="middle" className="fill-zinc-800 text-sm dark:fill-zinc-100">theoretical</text>
      </svg>
    </VisualShell>
  );
}

function MatchingVisual({ engineData }: { engineData: Record<string, unknown> }) {
  const categories = categoriesFrom(engineData);
  return (
    <VisualShell label="Matching quiz">
      <div className="grid gap-2 sm:grid-cols-3">
        {categories.map((category) => (
          <div key={category.id} className="rounded-md bg-white p-3 ring-1 ring-zinc-200 dark:bg-zinc-950 dark:ring-zinc-800">
            <div className="font-bold text-zinc-950 dark:text-zinc-50">{category.label}</div>
            <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {category.items[0]} {'->'} {category.items.at(-1)}
            </div>
          </div>
        ))}
      </div>
    </VisualShell>
  );
}

function TransformationVisual({ unitId, engineData }: { unitId: string; engineData: Record<string, unknown> }) {
  return (
    <VisualShell label="Transformation converter">
      <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr]">
        <div className="rounded-md bg-white p-4 ring-1 ring-zinc-200 dark:bg-zinc-950 dark:ring-zinc-800">{String(engineData.unitTitle ?? unitId)}</div>
        <div className="flex items-center justify-center font-bold text-blue-700">to</div>
        <div className="rounded-md bg-blue-50 p-4 font-semibold text-blue-950 dark:bg-blue-950/30 dark:text-blue-100">{String(engineData.formula ?? 'equivalent form')}</div>
      </div>
    </VisualShell>
  );
}

function TreeVisual({ state, engineData }: { state: PatternEngineState; engineData: Record<string, unknown> }) {
  const depth = Math.max(1, Math.min(5, Number(state.depth ?? 2)));
  const steps = stepsFrom(engineData).slice(0, depth);
  return (
    <VisualShell label="Tree builder">
      <div className="space-y-2">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center gap-2" style={{ marginLeft: index * 22 }}>
            <span className="h-3 w-3 rounded-full bg-blue-600" />
            <span className="rounded-md bg-white px-3 py-2 text-sm ring-1 ring-zinc-200 dark:bg-zinc-950 dark:ring-zinc-800">{step}</span>
          </div>
        ))}
      </div>
    </VisualShell>
  );
}

function DataVisual({ state, engineData }: { state: PatternEngineState; engineData: Record<string, unknown> }) {
  const sampleSize = Number(state.sampleSize ?? 8);
  const points = pointsFrom(engineData);
  return (
    <VisualShell label="Data visualization">
      <svg viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} role="img" aria-label="data visualization surface" className="h-auto w-full rounded bg-white dark:bg-zinc-950">
        {points.map((point, index) => {
          const height = point.value + sampleSize;
          return <rect key={point.label} x={80 + index * 96} y={230 - height * 2} width="52" height={height * 2} rx="6" fill="rgb(37 99 235)" opacity={0.65 + index * 0.08} />;
        })}
      </svg>
    </VisualShell>
  );
}

function CalculusVisual({ state }: { state: PatternEngineState }) {
  const x = Number(state.x ?? 1);
  const cx = 260 + x * 34;
  const cy = 175 - x * x * 5;
  return (
    <VisualShell label="Calculus visualization">
      <svg viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} role="img" aria-label="calculus visualization surface" className="h-auto w-full rounded bg-white dark:bg-zinc-950">
        <path d="M70 220 C160 40 320 40 450 220" fill="none" stroke="rgb(37 99 235)" strokeWidth="4" />
        <line x1={cx - 90} y1={cy + 36} x2={cx + 90} y2={cy - 36} stroke="rgb(245 158 11)" strokeWidth="4" />
        <circle cx={cx} cy={cy} r="8" fill="rgb(239 68 68)" />
      </svg>
    </VisualShell>
  );
}

function MolecularVisual({ state }: { state: PatternEngineState }) {
  const angle = Number(state.bondAngle ?? 109.5);
  const x2 = 260 + Math.cos((angle * Math.PI) / 180) * 95;
  const y2 = 150 - Math.sin((angle * Math.PI) / 180) * 95;
  return (
    <VisualShell label="Molecular 3D">
      <svg viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} role="img" aria-label="molecular 3d surface" className="h-auto w-full rounded bg-white dark:bg-zinc-950">
        <line x1="260" y1="150" x2="160" y2="215" stroke="rgb(148 163 184)" strokeWidth="8" />
        <line x1="260" y1="150" x2={x2} y2={y2} stroke="rgb(148 163 184)" strokeWidth="8" />
        <circle cx="260" cy="150" r="28" fill="rgb(37 99 235)" />
        <circle cx="160" cy="215" r="20" fill="rgb(239 68 68)" />
        <circle cx={x2} cy={y2} r="20" fill="rgb(16 185 129)" />
      </svg>
    </VisualShell>
  );
}

function AstronomyVisual({ state }: { state: PatternEngineState }) {
  const scale = Number(state.timeScale ?? 30);
  const angle = (scale / 365) * Math.PI * 2;
  return (
    <VisualShell label="Astronomy simulation">
      <svg viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} role="img" aria-label="astronomy simulation surface" className="h-auto w-full rounded bg-white dark:bg-zinc-950">
        <circle cx="260" cy="140" r="32" fill="rgb(245 158 11)" />
        <ellipse cx="260" cy="140" rx="170" ry="84" fill="none" stroke="rgb(148 163 184)" strokeWidth="3" />
        <circle cx={260 + Math.cos(angle) * 170} cy={140 + Math.sin(angle) * 84} r="16" fill="rgb(37 99 235)" />
      </svg>
    </VisualShell>
  );
}

function VectorMatrixVisual({ state }: { state: PatternEngineState }) {
  const scale = Number(state.scale ?? 1);
  return (
    <VisualShell label="Vector and matrix">
      <svg viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} role="img" aria-label="vector matrix surface" className="h-auto w-full rounded bg-white dark:bg-zinc-950">
        <line x1="260" y1="30" x2="260" y2="250" stroke="rgb(226 232 240)" />
        <line x1="60" y1="140" x2="460" y2="140" stroke="rgb(226 232 240)" />
        <line x1="260" y1="140" x2={260 + 90 * scale} y2={140 - 55 * scale} stroke="rgb(37 99 235)" strokeWidth="5" markerEnd="url(#arrow)" />
        <defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="rgb(37 99 235)" /></marker></defs>
      </svg>
    </VisualShell>
  );
}

function BiologyVisual({ state, engineData }: { state: PatternEngineState; engineData: Record<string, unknown> }) {
  const active = Math.max(1, Math.min(6, Number(state.stage ?? 1)));
  const steps = stepsFrom(engineData);
  return (
    <VisualShell label="Biology mechanism">
      <div className="grid gap-2">
        {steps.concat(['feedback', 'stability']).slice(0, 6).map((step, index) => (
          <div key={`${step}-${index}`} className={`rounded-md px-3 py-2 text-sm ${index + 1 === active ? 'bg-emerald-600 font-semibold text-white' : 'bg-white text-zinc-700 ring-1 ring-zinc-200 dark:bg-zinc-950 dark:text-zinc-300 dark:ring-zinc-800'}`}>
            {index + 1}. {step}
          </div>
        ))}
      </div>
    </VisualShell>
  );
}

function EconomicsVisual({ state }: { state: PatternEngineState }) {
  const rate = Number(state.rate ?? 3);
  const values = [80, 92 + rate, 105 + rate * 1.4, 118 + rate * 1.8];
  return (
    <VisualShell label="Economics and finance">
      <svg viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} role="img" aria-label="economics finance surface" className="h-auto w-full rounded bg-white dark:bg-zinc-950">
        <polyline points={values.map((value, index) => `${80 + index * 120},${250 - value}`).join(' ')} fill="none" stroke="rgb(37 99 235)" strokeWidth="4" />
        {values.map((value, index) => <circle key={index} cx={80 + index * 120} cy={250 - value} r="7" fill="rgb(37 99 235)" />)}
      </svg>
    </VisualShell>
  );
}
