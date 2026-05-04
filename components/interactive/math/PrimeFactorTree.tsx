'use client';

// M7-NA-01 소인수분해 — 패턴 13 트리.
// N 슬라이더 → 약수 트리 재귀 시각화 + 소인수분해 결과.

import { useMemo, useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';

interface TreeNode {
  value: number;
  isPrime: boolean;
  left?: TreeNode;
  right?: TreeNode;
}

function smallestPrimeFactor(n: number): number {
  if (n % 2 === 0) return 2;
  for (let i = 3; i * i <= n; i += 2) {
    if (n % i === 0) return i;
  }
  return n;
}

function buildTree(n: number): TreeNode {
  if (n < 2) return { value: n, isPrime: false };
  const p = smallestPrimeFactor(n);
  if (p === n) return { value: n, isPrime: true };
  return {
    value: n,
    isPrime: false,
    left: { value: p, isPrime: true },
    right: buildTree(n / p),
  };
}

function primeFactors(n: number): number[] {
  const out: number[] = [];
  let m = n;
  while (m > 1) {
    const p = smallestPrimeFactor(m);
    out.push(p);
    m = m / p;
  }
  return out;
}

const PRESETS = [12, 18, 24, 36, 60, 72, 100];

export function PrimeFactorTree() {
  const [n, setN] = useState(36);
  const tree = useMemo(() => buildTree(n), [n]);
  const factors = useMemo(() => primeFactors(n), [n]);

  const grouped = useMemo(() => {
    const map = new Map<number, number>();
    for (const p of factors) map.set(p, (map.get(p) ?? 0) + 1);
    return Array.from(map.entries()).sort((a, b) => a[0] - b[0]);
  }, [factors]);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          약수 트리 — 소인수분해
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          숫자를 <strong>소수(자기 자신과 1만 약수인 수)</strong>로만 나누어떨어질 때까지 쪼개면, 어떤 자연수든 <strong>오직 하나의 방법</strong>으로 표현돼요.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <div className="md:col-span-2 overflow-x-auto rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-4">
          <TreeSvg root={tree} />
        </div>

        <div className="space-y-3">
          <SliderRow label="N" value={n} min={2} max={120} step={1} onChange={setN} />
          <div className="flex flex-wrap gap-1.5">
            {PRESETS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setN(p)}
                className="px-2.5 py-1.5 text-xs rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 min-h-[32px] font-mono"
              >
                {p}
              </button>
            ))}
          </div>
          <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-500 p-4 space-y-1">
            <div className="text-xs text-zinc-600 dark:text-zinc-400">소인수분해</div>
            <div className="font-mono text-xl text-zinc-900 dark:text-zinc-100">
              {n} ={' '}
              {grouped.map((g, i) => (
                <span key={g[0]}>
                  {i > 0 ? ' × ' : ''}
                  {g[0]}
                  {g[1] > 1 ? <sup>{g[1]}</sup> : null}
                </span>
              ))}
            </div>
            <div className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
              총 {factors.length}개 소인수 · {tree.isPrime ? '이 수 자체가 소수' : '합성수'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TreeSvg({ root }: { root: TreeNode }) {
  const positions: Array<{ x: number; y: number; node: TreeNode }> = [];
  const edges: Array<{ x1: number; y1: number; x2: number; y2: number }> = [];

  function layout(node: TreeNode, depth: number, leftBound: number, rightBound: number): number {
    const x = (leftBound + rightBound) / 2;
    const y = 30 + depth * 60;
    positions.push({ x, y, node });
    if (node.left && node.right) {
      const mid = (leftBound + rightBound) / 2;
      const lx = layout(node.left, depth + 1, leftBound, mid);
      const rx = layout(node.right, depth + 1, mid, rightBound);
      edges.push({ x1: x, y1: y + 12, x2: lx, y2: y + 60 - 12 });
      edges.push({ x1: x, y1: y + 12, x2: rx, y2: y + 60 - 12 });
    }
    return x;
  }

  const W = 460;
  layout(root, 0, 10, W - 10);
  const maxY = Math.max(...positions.map((p) => p.y)) + 30;

  return (
    <svg viewBox={`0 0 ${W} ${maxY}`} className="w-full" style={{ minHeight: 200 }}>
      {edges.map((e, i) => (
        <line key={i} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} stroke="#94a3b8" strokeWidth="1.5" />
      ))}
      {positions.map((p, i) => (
        <g key={i} transform={`translate(${p.x}, ${p.y})`}>
          <circle
            r="18"
            fill={p.node.isPrime ? '#2563eb' : '#fef3c7'}
            stroke={p.node.isPrime ? '#1e40af' : '#f59e0b'}
            strokeWidth="2"
          />
          <text
            textAnchor="middle"
            y="4"
            fontSize="13"
            fontWeight="bold"
            fill={p.node.isPrime ? 'white' : '#78350f'}
          >
            {p.node.value}
          </text>
        </g>
      ))}
    </svg>
  );
}
