'use client';

// M6-CR-02 비례식과 비례배분 — 양팔 저울 메타포.
// a/b = c/d 가 성립하려면 양 팔의 무게가 같아야 함.

import { useMemo, useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';

export function ProportionBalance() {
  const [a, setA] = useState(2);
  const [b, setB] = useState(3);
  const [c, setC] = useState(4);
  const [d, setD] = useState(6);

  const left = a * d;
  const right = b * c;
  const balanced = left === right;
  const tilt = balanced ? 0 : left > right ? -8 : 8;

  const suggestedD = useMemo(() => (a === 0 ? 0 : (b * c) / a), [a, b, c]);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          비례식 — 양팔 저울
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          비례식 <strong>a:b = c:d</strong> 는 a×d = b×c 일 때만 성립해요. 양팔 저울이 평형을 이루는 조건과 같아요.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <BalanceSvg leftWeight={left} rightWeight={right} tilt={tilt} balanced={balanced} />

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <SliderRow label="a" value={a} min={1} max={20} step={1} onChange={setA} />
            <SliderRow label="b" value={b} min={1} max={20} step={1} onChange={setB} />
            <SliderRow label="c" value={c} min={1} max={20} step={1} onChange={setC} />
            <SliderRow label="d" value={d} min={1} max={20} step={1} onChange={setD} />
          </div>
          <div className={`rounded-xl border-l-4 p-4 text-sm space-y-1 ${
            balanced
              ? 'bg-green-50 dark:bg-green-950/30 border-green-500'
              : 'bg-red-50 dark:bg-red-950/30 border-red-500'
          }`}>
            <div className="font-mono text-zinc-900 dark:text-zinc-100">
              {a}:{b} {balanced ? '=' : '≠'} {c}:{d}
            </div>
            <div className="text-xs text-zinc-700 dark:text-zinc-300">
              a×d = {a}×{d} = <strong>{left}</strong> · b×c = {b}×{c} = <strong>{right}</strong>
            </div>
            {!balanced && (
              <div className="text-xs text-zinc-700 dark:text-zinc-300">
                d 를 <strong>{Number.isFinite(suggestedD) ? suggestedD : '?'}</strong> 으로 바꾸면 평형
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function BalanceSvg({ leftWeight, rightWeight, tilt, balanced }: {
  leftWeight: number; rightWeight: number; tilt: number; balanced: boolean;
}) {
  return (
    <svg viewBox="0 0 320 240" className="w-full">
      <line x1="160" y1="40" x2="160" y2="180" stroke="#6b7280" strokeWidth="3" />
      <polygon points="140,180 180,180 160,220" fill="#6b7280" />
      <g transform={`rotate(${tilt} 160 50)`}>
        <line x1="50" y1="50" x2="270" y2="50" stroke="#475569" strokeWidth="4" />
        <line x1="60" y1="50" x2="60" y2="100" stroke="#475569" strokeWidth="2" />
        <line x1="260" y1="50" x2="260" y2="100" stroke="#475569" strokeWidth="2" />
        <Pan cx={60} cy={130} weight={leftWeight} color="#3b82f6" />
        <Pan cx={260} cy={130} weight={rightWeight} color="#f59e0b" />
      </g>
      <text x="160" y="20" textAnchor="middle" fontSize="14" fontWeight="bold"
        fill={balanced ? '#10b981' : '#dc2626'}>
        {balanced ? '⚖ 평형' : '⚠ 기울어짐'}
      </text>
    </svg>
  );
}

function Pan({ cx, cy, weight, color }: { cx: number; cy: number; weight: number; color: string }) {
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx="36" ry="6" fill="#94a3b8" />
      <text x={cx} y={cy - 12} textAnchor="middle" fontSize="14" fontWeight="bold" fill={color}>
        {weight}
      </text>
    </g>
  );
}
