'use client';

import { useMemo, useState } from 'react';
import type {
  UnitInteractionFeedbackRule,
  UnitInteractionVariable,
} from '@/lib/unit-blueprints';

interface SliderGraphPatternEngineProps {
  unitId: string;
  title: string;
  variables: UnitInteractionVariable[];
  feedbackRules: UnitInteractionFeedbackRule[];
}

type EngineState = Record<string, string | number | boolean>;

const X_MIN = -10;
const X_MAX = 10;
const SVG_WIDTH = 520;
const SVG_HEIGHT = 280;
const PAD = 28;

export function SliderGraphPatternEngine({
  unitId,
  title,
  variables,
  feedbackRules,
}: SliderGraphPatternEngineProps) {
  const initialState = useMemo<EngineState>(
    () => Object.fromEntries(variables.map((variable) => [variable.id, variable.initial])),
    [variables],
  );
  const [state, setState] = useState<EngineState>(initialState);

  const graph = useMemo(() => buildGraph(unitId, state), [unitId, state]);
  const formula = formulaFor(unitId, state);
  const hint = feedbackRules[0]?.message ?? 'Change one variable and compare the result.';

  return (
    <div className="rounded-lg border border-blue-100 bg-white p-4 shadow-sm dark:border-blue-900/60 dark:bg-zinc-950">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-xs font-bold uppercase text-blue-700 dark:text-blue-300">Pattern engine</div>
          <h2 className="mt-1 text-xl font-extrabold text-zinc-950 dark:text-zinc-50">{title}</h2>
        </div>
        <button
          type="button"
          onClick={() => setState(initialState)}
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
            {hint}
          </div>
        </div>

        <div className="min-w-0">
          <div className="mb-2 rounded-md bg-zinc-50 px-3 py-2 font-mono text-sm text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100">
            {formula}
          </div>
          <svg
            viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
            role="img"
            aria-label={`${title} graph`}
            className="h-auto w-full rounded-md border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
          >
            <line
              x1={scaleX(0)}
              x2={scaleX(0)}
              y1={PAD}
              y2={SVG_HEIGHT - PAD}
              stroke="currentColor"
              className="text-zinc-300 dark:text-zinc-700"
            />
            <line
              x1={PAD}
              x2={SVG_WIDTH - PAD}
              y1={scaleY(0, graph.yMin, graph.yMax)}
              y2={scaleY(0, graph.yMin, graph.yMax)}
              stroke="currentColor"
              className="text-zinc-300 dark:text-zinc-700"
            />
            <polyline
              fill="none"
              stroke="rgb(37 99 235)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={graph.points.map((point) => `${scaleX(point.x)},${scaleY(point.y, graph.yMin, graph.yMax)}`).join(' ')}
            />
          </svg>
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

function buildGraph(unitId: string, state: EngineState) {
  const points = Array.from({ length: 121 }, (_, index) => {
    const x = X_MIN + ((X_MAX - X_MIN) * index) / 120;
    return { x, y: valueAt(unitId, state, x) };
  });
  const values = points.map((point) => point.y);
  const rawMin = Math.min(-1, ...values);
  const rawMax = Math.max(1, ...values);
  const pad = Math.max(1, (rawMax - rawMin) * 0.08);
  return {
    points,
    yMin: rawMin - pad,
    yMax: rawMax + pad,
  };
}

function valueAt(unitId: string, state: EngineState, x: number): number {
  if (unitId === 'M9-CR-03') {
    const a = Number(state.a ?? 1);
    const b = Number(state.b ?? 0);
    const c = Number(state.c ?? 0);
    return a * x * x + b * x + c;
  }
  return Number(state.parameter ?? 1) * x;
}

function formulaFor(unitId: string, state: EngineState): string {
  if (unitId === 'M9-CR-03') {
    return `y = ${Number(state.a ?? 1)}x^2 + ${Number(state.b ?? 0)}x + ${Number(state.c ?? 0)}`;
  }
  return `y = ${Number(state.parameter ?? 1)}x`;
}

function scaleX(x: number): number {
  return PAD + ((x - X_MIN) / (X_MAX - X_MIN)) * (SVG_WIDTH - PAD * 2);
}

function scaleY(y: number, yMin: number, yMax: number): number {
  return SVG_HEIGHT - PAD - ((y - yMin) / (yMax - yMin)) * (SVG_HEIGHT - PAD * 2);
}
