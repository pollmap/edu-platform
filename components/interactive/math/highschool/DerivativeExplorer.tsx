'use client';

// M-CA1-03 미분계수와 도함수 — 접선 기울기로부터 도함수 그리기.

import { useEffect, useRef, useState } from 'react';
import { MathFormula } from '@/components/primitives/MathFormula';
import { SliderRow } from '@/components/primitives/SliderRow';

type Func = 'cubic' | 'quadratic' | 'sin';

const FUNCS: Array<{ id: Func; label: string; tex: string; deriv: string }> = [
  { id: 'cubic', label: 'x³', tex: 'f(x) = x^3', deriv: "f'(x) = 3x^2" },
  { id: 'quadratic', label: 'x²', tex: 'f(x) = x^2', deriv: "f'(x) = 2x" },
  { id: 'sin', label: 'sin x', tex: 'f(x) = \\sin x', deriv: "f'(x) = \\cos x" },
];

export function DerivativeExplorer() {
  const [a, setA] = useState(1);
  const [funcId, setFuncId] = useState<Func>('cubic');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    drawDerivative(ctx, canvas.width, canvas.height, a, funcId);
  }, [a, funcId]);

  const fa = f(a, funcId);
  const slope = fPrime(a, funcId);
  const current = FUNCS.find((c) => c.id === funcId)!;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          미분계수와 도함수 — 접선 기울기 = 변화율
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          각 점의 접선 기울기를 모은 게 도함수 f′(x).
        </p>
      </div>

      <div className="flex gap-2">
        {FUNCS.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setFuncId(c.id)}
            className={`px-3 py-2 rounded-md text-sm font-semibold min-h-[44px] transition-colors ${
              funcId === c.id
                ? 'bg-blue-600 text-white'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center text-sm">
        <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 p-3">
          <MathFormula tex={current.tex} />
        </div>
        <div className="rounded-xl bg-rose-50 dark:bg-rose-950/30 p-3">
          <MathFormula tex={current.deriv} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="aspect-square rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden">
          <canvas ref={canvasRef} width={500} height={500} className="w-full h-full block" />
        </div>
        <div className="flex flex-col gap-3">
          <SliderRow label="접점의 x = a" value={a} min={-3} max={3} step={0.1} onChange={setA} />
          <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 p-3 text-sm space-y-1">
            <p>접점 (a, f(a)) = ({a.toFixed(2)}, {fa.toFixed(3)})</p>
            <p>미분계수 f′({a.toFixed(2)}) = <strong>{slope.toFixed(3)}</strong></p>
            <p>접선: y − {fa.toFixed(2)} = {slope.toFixed(2)}(x − {a.toFixed(2)})</p>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            파란선 = 원함수, 보라선 = 도함수. 빨간선 = 현재 점의 접선.
            슬라이더를 움직이면 접선 기울기가 보라 그래프 높이로 정확히 따라가요.
          </p>
        </div>
      </div>
    </div>
  );
}

function f(x: number, id: Func): number {
  if (id === 'cubic') return x ** 3;
  if (id === 'quadratic') return x ** 2;
  return Math.sin(x);
}

function fPrime(x: number, id: Func): number {
  if (id === 'cubic') return 3 * x ** 2;
  if (id === 'quadratic') return 2 * x;
  return Math.cos(x);
}

function drawDerivative(ctx: CanvasRenderingContext2D, W: number, H: number, a: number, id: Func) {
  const X_MIN = -3.5;
  const X_MAX = 3.5;
  const Y_MIN = -4;
  const Y_MAX = 4;
  const toX = (x: number) => ((x - X_MIN) / (X_MAX - X_MIN)) * W;
  const toY = (y: number) => H - ((y - Y_MIN) / (Y_MAX - Y_MIN)) * H;

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = '#e5e7eb';
  ctx.lineWidth = 1;
  for (let i = -4; i <= 4; i++) {
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

  // 원함수
  drawCurve(ctx, W, X_MIN, X_MAX, Y_MIN, Y_MAX, toX, toY, (x) => f(x, id), '#1e40af', 3);
  // 도함수
  drawCurve(ctx, W, X_MIN, X_MAX, Y_MIN, Y_MAX, toX, toY, (x) => fPrime(x, id), '#7e22ce', 2.5);

  // 접선
  const slope = fPrime(a, id);
  const fa = f(a, id);
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(toX(X_MIN), toY(slope * (X_MIN - a) + fa));
  ctx.lineTo(toX(X_MAX), toY(slope * (X_MAX - a) + fa));
  ctx.stroke();

  // 접점
  if (fa > Y_MIN && fa < Y_MAX) {
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(toX(a), toY(fa), 7, 0, 2 * Math.PI);
    ctx.fill();
  }

  // 도함수 위 점
  if (slope > Y_MIN && slope < Y_MAX) {
    ctx.fillStyle = '#7e22ce';
    ctx.beginPath();
    ctx.arc(toX(a), toY(slope), 7, 0, 2 * Math.PI);
    ctx.fill();
  }
}

function drawCurve(
  ctx: CanvasRenderingContext2D,
  W: number,
  xmin: number,
  xmax: number,
  ymin: number,
  ymax: number,
  toX: (x: number) => number,
  toY: (y: number) => number,
  fn: (x: number) => number,
  color: string,
  lw: number,
) {
  ctx.strokeStyle = color;
  ctx.lineWidth = lw;
  ctx.beginPath();
  let started = false;
  for (let px = 0; px <= W; px += 1) {
    const x = xmin + (px / W) * (xmax - xmin);
    const y = fn(x);
    if (Number.isFinite(y) && y > ymin && y < ymax) {
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
}
