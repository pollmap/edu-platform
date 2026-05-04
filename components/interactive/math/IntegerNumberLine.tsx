'use client';

// M7-NA-02 정수와 유리수 — 패턴 01 슬라이더→그래프.
// 두 정수 a, b 를 수직선 위에서 이동 + 사칙연산 결과 표시.

import { useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';

type Op = '+' | '-' | '×' | '÷';

const OPS: Op[] = ['+', '-', '×', '÷'];

function compute(a: number, b: number, op: Op): number {
  switch (op) {
    case '+': return a + b;
    case '-': return a - b;
    case '×': return a * b;
    case '÷': return b === 0 ? NaN : a / b;
  }
}

export function IntegerNumberLine() {
  const [a, setA] = useState(3);
  const [b, setB] = useState(-2);
  const [op, setOp] = useState<Op>('+');

  const result = compute(a, b, op);

  const minTick = -10;
  const maxTick = 10;
  const W = 600;
  const H = 120;
  const margin = 30;
  const xOf = (n: number): number =>
    margin + ((n - minTick) / (maxTick - minTick)) * (W - margin * 2);
  const ticks = Array.from({ length: maxTick - minTick + 1 }, (_, i) => minTick + i);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          수직선 · 정수 사칙연산
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          음수는 0보다 작은 수예요. 수직선 위에서 0을 기준으로 <strong>오른쪽은 양수, 왼쪽은 음수</strong>입니다.
        </p>
      </div>

      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[600px] mx-auto">
          <line x1={margin} y1={H / 2} x2={W - margin} y2={H / 2} stroke="#94a3b8" strokeWidth="2" />
          <polygon
            points={`${W - margin},${H / 2} ${W - margin - 8},${H / 2 - 5} ${W - margin - 8},${H / 2 + 5}`}
            fill="#94a3b8"
          />
          <polygon
            points={`${margin},${H / 2} ${margin + 8},${H / 2 - 5} ${margin + 8},${H / 2 + 5}`}
            fill="#94a3b8"
          />
          {ticks.map((t) => (
            <g key={t}>
              <line x1={xOf(t)} y1={H / 2 - 4} x2={xOf(t)} y2={H / 2 + 4} stroke="#94a3b8" strokeWidth="1" />
              <text
                x={xOf(t)}
                y={H / 2 + 18}
                fontSize="10"
                textAnchor="middle"
                fill={t === 0 ? '#dc2626' : '#64748b'}
                fontWeight={t === 0 ? 'bold' : 'normal'}
              >
                {t}
              </text>
            </g>
          ))}
          <Marker x={xOf(a)} y={H / 2} label={`a=${a}`} color="#2563eb" />
          <Marker x={xOf(b)} y={H / 2} label={`b=${b}`} color="#10b981" offsetY={28} />
          {Number.isFinite(result) && result >= minTick && result <= maxTick && (
            <Marker x={xOf(result)} y={H / 2} label={`= ${result}`} color="#f59e0b" offsetY={56} />
          )}
        </svg>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <SliderRow label="a" value={a} min={minTick} max={maxTick} step={1} onChange={setA} />
          <SliderRow label="b" value={b} min={minTick} max={maxTick} step={1} onChange={setB} />
        </div>
        <div className="space-y-3">
          <div>
            <div className="text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">연산</div>
            <div className="flex gap-2">
              {OPS.map((o) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => setOp(o)}
                  className={`flex-1 min-h-[44px] rounded-md border-2 font-mono text-lg transition ${
                    op === o
                      ? 'bg-blue-600 text-white border-blue-700'
                      : 'bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                  }`}
                >
                  {o}
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 p-4">
            <div className="text-sm text-zinc-600 dark:text-zinc-400">결과</div>
            <div className="font-mono text-2xl text-zinc-900 dark:text-zinc-100 mt-0.5">
              {a} {op} {b} ={' '}
              <span className="text-amber-700 dark:text-amber-300">
                {Number.isFinite(result) ? result : '정의 안 됨 (0으로 나누기)'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Marker({
  x,
  y,
  label,
  color,
  offsetY = 0,
}: {
  x: number;
  y: number;
  label: string;
  color: string;
  offsetY?: number;
}) {
  return (
    <g>
      <circle cx={x} cy={y} r="6" fill={color} />
      <line x1={x} y1={y} x2={x} y2={y - 22 - offsetY} stroke={color} strokeWidth="1" strokeDasharray="2 2" />
      <text x={x} y={y - 26 - offsetY} textAnchor="middle" fontSize="11" fill={color} fontWeight="bold">
        {label}
      </text>
    </g>
  );
}
