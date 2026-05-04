'use client';

// M-CA1-01 함수의 극한 — 좌극한·우극한·발산 시각화.

import { useEffect, useRef, useState } from 'react';
import { MathFormula } from '@/components/primitives/MathFormula';
import { SliderRow } from '@/components/primitives/SliderRow';

type Case = 'continuous' | 'jump' | 'pole' | 'oscillate';

const CASES: Array<{ id: Case; label: string; desc: string; tex: string }> = [
  { id: 'continuous', label: '연속', desc: '좌극한 = 우극한 = 함숫값', tex: 'f(x) = x^2 - 1' },
  { id: 'jump', label: '점프 (좌≠우)', desc: '좌극한 ≠ 우극한 → 극한 없음', tex: 'f(x) = \\begin{cases} x+1 & (x<a) \\\\ x-1 & (x \\ge a) \\end{cases}' },
  { id: 'pole', label: '발산 (∞)', desc: '값이 무한대로', tex: 'f(x) = \\frac{1}{(x-a)^2}' },
  { id: 'oscillate', label: '진동', desc: '값이 두 점 사이를 무한 진동', tex: 'f(x) = \\sin\\left(\\frac{1}{x-a}\\right)' },
];

export function FunctionLimitExplorer() {
  const [a, setA] = useState(1);
  const [delta, setDelta] = useState(0.5);
  const [caseId, setCaseId] = useState<Case>('continuous');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    drawLimit(ctx, canvas.width, canvas.height, a, delta, caseId);
  }, [a, delta, caseId]);

  const left = evalFunc(a - 0.0001, a, caseId);
  const right = evalFunc(a + 0.0001, a, caseId);
  const exists = caseId === 'continuous' || (caseId === 'jump' ? false : Number.isFinite(left) && Number.isFinite(right) && Math.abs(left - right) < 0.01);
  const current = CASES.find((c) => c.id === caseId)!;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          함수의 극한 — 다가갈 때 무엇에 가까워지나
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          x → a 일 때 좌·우에서 다가가는 값이 같으면 극한이 존재해요.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {CASES.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setCaseId(c.id)}
            className={`px-3 py-2 rounded-md text-xs font-semibold min-h-[44px] transition-colors ${
              caseId === c.id
                ? 'bg-blue-600 text-white'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 p-3 text-center text-sm">
        <MathFormula tex={current.tex} />
        <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">{current.desc}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="aspect-square rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden">
          <canvas ref={canvasRef} width={500} height={500} className="w-full h-full block" />
        </div>
        <div className="flex flex-col gap-3">
          <SliderRow label="a (다가가는 점)" value={a} min={-3} max={3} step={0.1} onChange={setA} />
          <SliderRow label="δ (이웃 폭)" value={delta} min={0.05} max={1} step={0.05} onChange={setDelta} />
          <ResultBox label="좌극한 lim x→a⁻" value={fmt(left)} color="rose" />
          <ResultBox label="우극한 lim x→a⁺" value={fmt(right)} color="emerald" />
          <ResultBox label="극한 존재?" value={exists ? '예' : '아니오'} color={exists ? 'blue' : 'rose'} />
        </div>
      </div>
    </div>
  );
}

interface ResultBoxProps {
  label: string;
  value: string;
  color: 'rose' | 'blue' | 'emerald';
}

function ResultBox({ label, value, color }: ResultBoxProps) {
  const colors: Record<ResultBoxProps['color'], string> = {
    rose: 'bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300',
    blue: 'bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300',
    emerald: 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300',
  };
  return (
    <div className={`rounded-lg p-3 ${colors[color]} flex justify-between`}>
      <span className="text-sm font-semibold">{label}</span>
      <span className="font-mono">{value}</span>
    </div>
  );
}

function fmt(v: number): string {
  if (!Number.isFinite(v)) return v > 0 ? '+∞' : '−∞';
  return v.toFixed(3);
}

function evalFunc(x: number, a: number, c: Case): number {
  if (c === 'continuous') return x * x - 1;
  if (c === 'jump') return x < a ? x + 1 : x - 1;
  if (c === 'pole') {
    const dx = x - a;
    return Math.abs(dx) < 1e-6 ? Infinity : 1 / (dx * dx);
  }
  return Math.sin(1 / (x - a));
}

function drawLimit(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  a: number,
  delta: number,
  c: Case,
) {
  const X_MIN = -4;
  const X_MAX = 4;
  const Y_MIN = -4;
  const Y_MAX = 4;
  const toX = (x: number) => ((x - X_MIN) / (X_MAX - X_MIN)) * W;
  const toY = (y: number) => H - ((y - Y_MIN) / (Y_MAX - Y_MIN)) * H;

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = '#e5e7eb';
  ctx.lineWidth = 1;
  for (let i = X_MIN; i <= X_MAX; i++) {
    ctx.beginPath();
    ctx.moveTo(toX(i), 0);
    ctx.lineTo(toX(i), H);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, toY(i));
    ctx.lineTo(W, toY(i));
    ctx.stroke();
  }

  ctx.strokeStyle = '#1f2937';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, toY(0));
  ctx.lineTo(W, toY(0));
  ctx.moveTo(toX(0), 0);
  ctx.lineTo(toX(0), H);
  ctx.stroke();

  // δ 영역
  ctx.fillStyle = 'rgba(245, 158, 11, 0.18)';
  ctx.fillRect(toX(a - delta), 0, toX(a + delta) - toX(a - delta), H);

  // 수직선 x = a
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([5, 4]);
  ctx.beginPath();
  ctx.moveTo(toX(a), 0);
  ctx.lineTo(toX(a), H);
  ctx.stroke();
  ctx.setLineDash([]);

  // 함수 그래프
  const drawSegment = (xStart: number, xEnd: number, color: string) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    let started = false;
    const px0 = toX(xStart);
    const px1 = toX(xEnd);
    for (let px = px0; px <= px1; px += 1) {
      const x = X_MIN + (px / W) * (X_MAX - X_MIN);
      const y = evalFunc(x, a, c);
      if (Number.isFinite(y) && y > Y_MIN && y < Y_MAX) {
        const cy = toY(y);
        if (!started) {
          ctx.moveTo(px, cy);
          started = true;
        } else {
          ctx.lineTo(px, cy);
        }
      } else {
        started = false;
      }
    }
    ctx.stroke();
  };

  if (c === 'jump') {
    drawSegment(X_MIN, a - 0.001, '#1e40af');
    drawSegment(a + 0.001, X_MAX, '#1e40af');
  } else {
    drawSegment(X_MIN, X_MAX, '#1e40af');
  }
}
