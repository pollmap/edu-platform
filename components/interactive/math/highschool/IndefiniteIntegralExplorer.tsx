'use client';

// M-CA1-05 부정적분 — F'(x) = f(x), 적분상수 C와 그래프의 평행 이동.

import { useEffect, useRef, useState } from 'react';
import { MathFormula } from '@/components/primitives/MathFormula';
import { SliderRow } from '@/components/primitives/SliderRow';

type Kind = 'power' | 'sin' | 'cos' | 'exp';

const KINDS: Array<{ id: Kind; label: string; tex: string; antiTex: string }> = [
  { id: 'power', label: 'xⁿ', tex: 'f(x) = x^n', antiTex: 'F(x) = \\frac{x^{n+1}}{n+1} + C' },
  { id: 'sin', label: 'sin x', tex: 'f(x) = \\sin x', antiTex: 'F(x) = -\\cos x + C' },
  { id: 'cos', label: 'cos x', tex: 'f(x) = \\cos x', antiTex: 'F(x) = \\sin x + C' },
  { id: 'exp', label: 'eˣ', tex: 'f(x) = e^x', antiTex: 'F(x) = e^x + C' },
];

export function IndefiniteIntegralExplorer() {
  const [kind, setKind] = useState<Kind>('power');
  const [n, setN] = useState(2);
  const [C, setC] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const f = (x: number) => {
    if (kind === 'power') return Math.pow(x, n);
    if (kind === 'sin') return Math.sin(x);
    if (kind === 'cos') return Math.cos(x);
    return Math.exp(Math.min(3, x));
  };
  const F = (x: number) => {
    if (kind === 'power') return Math.pow(x, n + 1) / (n + 1) + C;
    if (kind === 'sin') return -Math.cos(x) + C;
    if (kind === 'cos') return Math.sin(x) + C;
    return Math.exp(Math.min(3, x)) + C;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    drawTwo(ctx, canvas.width, canvas.height, f, F);
  }, [kind, n, C]);

  const current = KINDS.find((k) => k.id === kind)!;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          부정적분 — 미분의 「되돌리기」, 그리고 적분상수 C
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          F&apos;(x) = f(x)를 만족하는 모든 F는 상수 차이만 있어요. 그래프는 위·아래 평행 이동.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {KINDS.map((k) => (
          <button
            key={k.id}
            type="button"
            onClick={() => setKind(k.id)}
            className={`px-3 py-2 rounded-md text-sm font-semibold min-h-[44px] transition-colors ${
              kind === k.id
                ? 'bg-blue-600 text-white'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
            }`}
          >
            {k.label}
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 p-3 text-center space-y-2">
        <MathFormula tex={current.tex} />
        <div className="text-sm text-zinc-600 dark:text-zinc-300 pt-1">↓ 부정적분</div>
        <MathFormula tex={current.antiTex} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="aspect-square rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden">
          <canvas ref={canvasRef} width={500} height={500} className="w-full h-full block" />
        </div>
        <div className="flex flex-col gap-3">
          {kind === 'power' ? (
            <SliderRow label="지수 n" value={n} min={1} max={4} step={1} onChange={setN} format={(v) => v.toFixed(0)} />
          ) : null}
          <SliderRow label="적분상수 C" value={C} min={-3} max={3} step={0.1} onChange={setC} />
          <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 p-3 text-sm space-y-1">
            <p>파란 = f(x), 빨강 = F(x)</p>
            <p className="text-xs text-zinc-500">C 값을 움직이면 F만 위·아래로 이동, f는 변하지 않아요.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function drawTwo(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  f: (x: number) => number,
  F: (x: number) => number,
) {
  const X_MIN = -3,
    X_MAX = 3;
  const Y_MIN = -5,
    Y_MAX = 5;

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, W, H);

  const toX = (x: number) => ((x - X_MIN) / (X_MAX - X_MIN)) * W;
  const toY = (y: number) => H - ((y - Y_MIN) / (Y_MAX - Y_MIN)) * H;

  ctx.strokeStyle = '#e5e7eb';
  for (let i = X_MIN; i <= X_MAX; i++) {
    ctx.beginPath();
    ctx.moveTo(toX(i), 0);
    ctx.lineTo(toX(i), H);
    ctx.stroke();
  }
  for (let j = Y_MIN; j <= Y_MAX; j++) {
    ctx.beginPath();
    ctx.moveTo(0, toY(j));
    ctx.lineTo(W, toY(j));
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

  drawCurve(ctx, X_MIN, X_MAX, Y_MAX, toX, toY, f, '#1e40af');
  drawCurve(ctx, X_MIN, X_MAX, Y_MAX, toX, toY, F, '#dc2626');
}

function drawCurve(
  ctx: CanvasRenderingContext2D,
  xMin: number,
  xMax: number,
  yMax: number,
  toX: (x: number) => number,
  toY: (y: number) => number,
  fn: (x: number) => number,
  color: string,
) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.beginPath();
  let started = false;
  for (let x = xMin; x <= xMax; x += 0.04) {
    const y = fn(x);
    if (Math.abs(y) < yMax * 1.5) {
      if (!started) {
        ctx.moveTo(toX(x), toY(y));
        started = true;
      } else {
        ctx.lineTo(toX(x), toY(y));
      }
    } else started = false;
  }
  ctx.stroke();
}
