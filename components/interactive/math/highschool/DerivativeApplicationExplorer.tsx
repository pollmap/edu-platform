'use client';

// M-CA1-04 도함수 활용 — 접선·증감·극값 시각화.

import { useEffect, useRef, useState } from 'react';
import { MathFormula } from '@/components/primitives/MathFormula';
import { SliderRow } from '@/components/primitives/SliderRow';

export function DerivativeApplicationExplorer() {
  // f(x) = ax^3 + bx^2 + cx + d
  const [a, setA] = useState(1);
  const [b, setB] = useState(-3);
  const [c, setC] = useState(0);
  const [x0, setX0] = useState(0.8);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const f = (x: number) => a * x ** 3 + b * x ** 2 + c * x + 1;
  const fp = (x: number) => 3 * a * x ** 2 + 2 * b * x + c;

  // 극값: f'(x)=0의 근 (이차방정식)
  const A2 = 3 * a;
  const B2 = 2 * b;
  const C2 = c;
  const disc = B2 * B2 - 4 * A2 * C2;
  let critical: number[] = [];
  if (Math.abs(A2) < 1e-9) {
    if (Math.abs(B2) > 1e-9) critical = [-C2 / B2];
  } else if (disc >= 0) {
    const sq = Math.sqrt(disc);
    critical = [(-B2 + sq) / (2 * A2), (-B2 - sq) / (2 * A2)];
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    drawCubic(ctx, canvas.width, canvas.height, f, fp, x0, critical);
  }, [a, b, c, x0]);

  const slope = fp(x0);
  const yAtX0 = f(x0);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          도함수 활용 — 접선·증감·극값 한 화면에
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          f&apos;(x) = 0이 되는 점이 후보 극값. 부호가 바뀌면 진짜 극값이에요.
        </p>
      </div>

      <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 p-3 text-center">
        <MathFormula tex={`f(x) = ${a}x^3 ${b >= 0 ? '+' : ''}${b}x^2 ${c >= 0 ? '+' : ''}${c}x + 1`} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="aspect-square rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden">
          <canvas ref={canvasRef} width={500} height={500} className="w-full h-full block" />
        </div>
        <div className="flex flex-col gap-3">
          <SliderRow label="계수 a" value={a} min={-2} max={2} step={0.1} onChange={setA} />
          <SliderRow label="계수 b" value={b} min={-5} max={5} step={0.1} onChange={setB} />
          <SliderRow label="계수 c" value={c} min={-5} max={5} step={0.1} onChange={setC} />
          <SliderRow label="접점 x₀" value={x0} min={-3} max={3} step={0.05} onChange={setX0} />
          <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 p-3 text-sm space-y-1">
            <p>
              f(x₀) = <span className="font-mono">{yAtX0.toFixed(3)}</span>
            </p>
            <p>
              접선 기울기 f&apos;(x₀) = <span className="font-mono">{slope.toFixed(3)}</span>
            </p>
            <p>
              접선: y = {slope.toFixed(2)}(x − {x0.toFixed(2)}) + {yAtX0.toFixed(2)}
            </p>
            <p className="text-xs text-zinc-500 mt-1">
              극값 후보 x: {critical.length === 0 ? '없음' : critical.map((v) => v.toFixed(3)).join(', ')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function drawCubic(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  f: (x: number) => number,
  fp: (x: number) => number,
  x0: number,
  crit: number[],
) {
  const X_MIN = -4,
    X_MAX = 4;
  const Y_MIN = -8,
    Y_MAX = 8;

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
  for (let j = Y_MIN; j <= Y_MAX; j += 2) {
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

  // 곡선
  ctx.strokeStyle = '#1e40af';
  ctx.lineWidth = 3;
  ctx.beginPath();
  let started = false;
  for (let x = X_MIN; x <= X_MAX; x += 0.05) {
    const y = f(x);
    if (Math.abs(y) < Y_MAX * 1.5) {
      if (!started) {
        ctx.moveTo(toX(x), toY(y));
        started = true;
      } else {
        ctx.lineTo(toX(x), toY(y));
      }
    } else started = false;
  }
  ctx.stroke();

  // 접선
  const slope = fp(x0);
  const yAtX0 = f(x0);
  ctx.strokeStyle = '#dc2626';
  ctx.lineWidth = 2.5;
  ctx.setLineDash([6, 4]);
  ctx.beginPath();
  ctx.moveTo(toX(X_MIN), toY(slope * (X_MIN - x0) + yAtX0));
  ctx.lineTo(toX(X_MAX), toY(slope * (X_MAX - x0) + yAtX0));
  ctx.stroke();
  ctx.setLineDash([]);

  // 접점
  ctx.fillStyle = '#dc2626';
  ctx.beginPath();
  ctx.arc(toX(x0), toY(yAtX0), 6, 0, 2 * Math.PI);
  ctx.fill();

  // 극값 점
  ctx.fillStyle = '#f59e0b';
  for (const xc of crit) {
    if (xc >= X_MIN && xc <= X_MAX) {
      ctx.beginPath();
      ctx.arc(toX(xc), toY(f(xc)), 7, 0, 2 * Math.PI);
      ctx.fill();
    }
  }
}
