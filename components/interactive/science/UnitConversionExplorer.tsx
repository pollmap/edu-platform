'use client';

// S-IS1-01 과학의 기초 — 단위 변환 + 유효숫자 + 과학적 표기.
// 다양한 차원(길이·질량·시간·속도)을 SI 단위로 변환하고 유효숫자에 맞춰 반올림.

import { useMemo, useState } from 'react';

interface Unit {
  id: string;
  label: string;
  factor: number; // SI 기본 단위(m, kg, s, m/s)에 대한 비율
}

interface Dimension {
  id: string;
  label: string;
  baseUnit: string;
  units: Unit[];
}

const DIMENSIONS: Dimension[] = [
  {
    id: 'length',
    label: '길이',
    baseUnit: 'm',
    units: [
      { id: 'nm', label: 'nm (나노미터)', factor: 1e-9 },
      { id: 'um', label: 'μm (마이크로)', factor: 1e-6 },
      { id: 'mm', label: 'mm', factor: 1e-3 },
      { id: 'cm', label: 'cm', factor: 1e-2 },
      { id: 'm', label: 'm', factor: 1 },
      { id: 'km', label: 'km', factor: 1e3 },
      { id: 'au', label: '천문단위 AU', factor: 1.496e11 },
      { id: 'ly', label: '광년 ly', factor: 9.461e15 },
    ],
  },
  {
    id: 'mass',
    label: '질량',
    baseUnit: 'kg',
    units: [
      { id: 'mg', label: 'mg', factor: 1e-6 },
      { id: 'g', label: 'g', factor: 1e-3 },
      { id: 'kg', label: 'kg', factor: 1 },
      { id: 't', label: '톤', factor: 1e3 },
    ],
  },
  {
    id: 'time',
    label: '시간',
    baseUnit: 's',
    units: [
      { id: 'ms', label: 'ms', factor: 1e-3 },
      { id: 's', label: '초', factor: 1 },
      { id: 'min', label: '분', factor: 60 },
      { id: 'hr', label: '시간', factor: 3600 },
      { id: 'day', label: '일', factor: 86400 },
      { id: 'year', label: '년', factor: 3.156e7 },
    ],
  },
  {
    id: 'speed',
    label: '속도',
    baseUnit: 'm/s',
    units: [
      { id: 'mps', label: 'm/s', factor: 1 },
      { id: 'kmh', label: 'km/h', factor: 1 / 3.6 },
      { id: 'mph', label: 'mph', factor: 0.4470 },
      { id: 'knot', label: 'knot', factor: 0.5144 },
      { id: 'mach', label: 'Mach (음속)', factor: 343 },
      { id: 'c', label: 'c (광속)', factor: 2.998e8 },
    ],
  },
];

function toScientific(n: number, sigFigs: number): string {
  if (n === 0) return '0';
  if (!isFinite(n)) return '∞';
  const exp = Math.floor(Math.log10(Math.abs(n)));
  const mantissa = n / Math.pow(10, exp);
  return `${mantissa.toFixed(sigFigs - 1)} × 10^${exp}`;
}

function toFixedSig(n: number, sigFigs: number): string {
  if (n === 0) return '0';
  const abs = Math.abs(n);
  if (abs >= 1e6 || abs < 1e-3) return toScientific(n, sigFigs);
  const exp = Math.floor(Math.log10(abs));
  const decimals = Math.max(0, sigFigs - exp - 1);
  return n.toFixed(decimals);
}

export function UnitConversionExplorer() {
  const [dimensionId, setDimensionId] = useState('length');
  const [fromUnitId, setFromUnitId] = useState('m');
  const [toUnitId, setToUnitId] = useState('km');
  const [valueStr, setValueStr] = useState('1500');
  const [sigFigs, setSigFigs] = useState(3);

  const dimension = useMemo(() => DIMENSIONS.find((d) => d.id === dimensionId)!, [dimensionId]);
  const fromUnit = useMemo(() => dimension.units.find((u) => u.id === fromUnitId) ?? dimension.units[0], [dimension, fromUnitId]);
  const toUnit = useMemo(() => dimension.units.find((u) => u.id === toUnitId) ?? dimension.units[1], [dimension, toUnitId]);

  const value = parseFloat(valueStr);
  const result = useMemo(() => {
    if (isNaN(value)) return null;
    const inBase = value * fromUnit.factor;
    const out = inBase / toUnit.factor;
    return out;
  }, [value, fromUnit, toUnit]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {DIMENSIONS.map((d) => (
          <button
            key={d.id}
            type="button"
            onClick={() => {
              setDimensionId(d.id);
              setFromUnitId(d.units[0].id);
              setToUnitId(d.units[Math.min(1, d.units.length - 1)].id);
            }}
            className={`px-3 py-2 rounded-lg text-sm font-medium min-h-[44px] ${
              dimensionId === d.id ? 'bg-emerald-600 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">입력 값</label>
          <input
            type="text"
            inputMode="decimal"
            value={valueStr}
            onChange={(e) => setValueStr(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 font-mono"
          />
          <select
            value={fromUnitId}
            onChange={(e) => setFromUnitId(e.target.value)}
            className="mt-2 block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2"
          >
            {dimension.units.map((u) => (
              <option key={u.id} value={u.id}>
                {u.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">변환된 값</label>
          <div className="mt-1 block w-full rounded-lg border border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-2 font-mono text-emerald-700 dark:text-emerald-300 min-h-[42px] flex items-center">
            {result === null ? '—' : toFixedSig(result, sigFigs)}
          </div>
          <select
            value={toUnitId}
            onChange={(e) => setToUnitId(e.target.value)}
            className="mt-2 block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2"
          >
            {dimension.units.map((u) => (
              <option key={u.id} value={u.id}>
                {u.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-800 p-3 rounded-lg">
        <div className="flex justify-between mb-2 text-sm">
          <span className="font-bold text-blue-700 dark:text-blue-400">유효숫자</span>
          <span className="font-mono">{sigFigs} 자리</span>
        </div>
        <input
          type="range"
          value={sigFigs}
          min={1}
          max={6}
          step={1}
          onChange={(e) => setSigFigs(parseInt(e.target.value))}
          className="w-full h-3 cursor-pointer accent-blue-600"
          aria-label="유효숫자"
        />
      </div>

      {result !== null && (
        <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/40 p-4 border border-emerald-200 dark:border-emerald-800">
          <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">결과</div>
          <div className="font-mono text-lg">
            {value} {fromUnit.label.split(' ')[0]} = <span className="font-bold text-emerald-700 dark:text-emerald-300">{toFixedSig(result, sigFigs)}</span> {toUnit.label.split(' ')[0]}
          </div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 font-mono">
            과학적 표기: {toScientific(result, sigFigs)} {toUnit.label.split(' ')[0]}
          </div>
        </div>
      )}

      <div className="text-xs text-zinc-500 dark:text-zinc-400">
        💡 과학에서는 「유효숫자(significant figures)」로 측정의 정밀도를 표현해요. 1.50 × 10³과 1500은 의미가 달라요 (전자는 3자리, 후자는 모호).
      </div>
    </div>
  );
}
