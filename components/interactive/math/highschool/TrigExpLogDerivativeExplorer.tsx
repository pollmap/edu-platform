'use client';

// M-CA2-03 여러 함수의 미분 — sin/cos/tan/exp/log의 도함수.

import { useEffect, useRef, useState } from 'react';
import { MathFormula } from '@/components/primitives/MathFormula';
import { SliderRow } from '@/components/primitives/SliderRow';

type Kind = 'sin' | 'cos' | 'tan' | 'exp' | 'ln';

const KINDS: Array<{ id: Kind; label: string; tex: string; pri: string }> = [
  { id: 'sin', label: 'sin', tex: 'f = \\sin x', pri: "f' = \\cos x" },
  { id: 'cos', label: 'cos', tex: 'f = \\cos x', pri: "f' = -\\sin x" },
  { id: 'tan', label: 'tan', tex: 'f = \\tan x', pri: "f' = \\sec^2 x" },
  { id: 'exp', label: 'eˣ', tex: 'f = e^x', pri: "f' = e^x" },
  { id: 'ln', label: 'ln x', tex: 'f = \\ln x', pri: "f' = 1/x" },
];

export function TrigExpLogDerivativeExplorer() {
  const [kind, setKind] = useState<Kind>('sin');
  const [x0, setX0] = useState(1);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const f = (x: number): number => {
    if (kind === 'sin') return Math.sin(x);
    if (kind === 'cos') return Math.cos(x);
    if (kind === 'tan') return Math.tan(x);
    if (kind === 'exp') return Math.exp(Math.min(3, x));
    return x > 0 ? Math.log(x) : NaN;
  };
  const fp = (x: number): number => {
    if (kind === 'sin') return Math.cos(x);
    if (kind === 'cos') return -Math.sin(x);
    if (kind === 'tan') {
      const c = Math.cos(x);
      return 1 / (c * c);
    }
    if (kind === 'exp') return Math.exp(Math.min(3, x));
    return x > 0 ? 1 / x : NaN;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    drawFG(ctx, canvas.width, canvas.height, f, fp, x0, kind);
  }, [kind, x0]);

  const current = KINDS.find((k) => k.id === kind)!;
  const yVal = f(x0);
  const slope = fp(x0);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          여러 함수의 미분 — 5가지 핵심 도함수
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          삼각·지수·로그 함수의 도함수는 외워 두면 모든 응용에 바로 쓰여요.
        </p>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
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
        <div className="text-sm">↓ 미분</div>
        <MathFormula tex={current.pri} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="aspect-square rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden">
          <canvas ref={canvasRef} width={500} height={500} className="w-full h-full block" />
        </div>
        <div className="flex flex-col gap-3">
          <SliderRow label="x₀" value={x0} min={-3} max={3} step={0.05} onChange={setX0} />
          <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 p-3 text-sm space-y-1">
            <p>f(x₀) = <span className="font-mono">{isFinite(yVal) ? yVal.toFixed(3) : '미정의'}</span></p>
            <p>f&apos;(x₀) = <span className="font-mono">{isFinite(slope) ? slope.toFixed(3) : '미정의'}</span></p>
            <p className="text-xs text-zinc-500">파랑 = f, 빨강 = f&apos;</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function drawFG(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  f: (x: number) => number,
  fp: (x: number) => number,
  x0: number,
  kind: Kind,
) {
  const X_MIN = kind === 'ln' ? 0.05 : -3.5;
  const X_MAX = 3.5;
  const Y_MIN = -4,
    Y_MAX = 4;

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, W, H);

  const toX = (x: number) => ((x - X_MIN) / (X_MAX - X_MIN)) * W;
  const toY = (y: number) => H - ((y - Y_MIN) / (Y_MAX - Y_MIN)) * H;

  ctx.strokeStyle = '#e5e7eb';
  for (let i = Math.ceil(X_MIN); i <= X_MAX; i++) {
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

  drawFn(ctx, X_MIN, X_MAX, Y_MAX, toX, toY, f, '#1e40af');
  drawFn(ctx, X_MIN, X_MAX, Y_MAX, toX, toY, fp, '#dc2626');

  // x0 marker
  if (x0 >= X_MIN && x0 <= X_MAX) {
    const y = f(x0);
    if (isFinite(y)) {
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(toX(x0), toY(y), 6, 0, 2 * Math.PI);
      ctx.fill();
    }
  }
}

function drawFn(
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
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  let started = false;
  for (let x = xMin; x <= xMax; x += 0.02) {
    const y = fn(x);
    if (isFinite(y) && Math.abs(y) < yMax * 1.5) {
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
