'use client';

// M-CA1-06 정적분 (구분구적법) — 리만합이 적분으로 수렴하는 과정.

import { useEffect, useRef, useState } from 'react';
import { MathFormula } from '@/components/primitives/MathFormula';
import { SliderRow } from '@/components/primitives/SliderRow';

type Method = 'left' | 'right' | 'mid';

const METHODS: Array<{ id: Method; label: string }> = [
  { id: 'left', label: '왼쪽 끝점' },
  { id: 'mid', label: '중점' },
  { id: 'right', label: '오른쪽 끝점' },
];

export function RiemannSumExplorer() {
  const [n, setN] = useState(8);
  const [method, setMethod] = useState<Method>('mid');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const A = 0;
  const B = 2;
  const truth = (B ** 3 - A ** 3) / 3; // ∫₀² x² dx = 8/3 ≈ 2.667

  const sum = computeRiemannSum(A, B, n, method);
  const error = sum - truth;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    drawRiemann(ctx, canvas.width, canvas.height, A, B, n, method);
  }, [n, method]);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          정적분 — 리만합의 극한
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          구간을 n조각으로 잘라 직사각형 면적을 더하면, n→∞에서 정확한 곡선 아래 면적이 돼요.
        </p>
      </div>

      <div className="text-center text-lg rounded-xl bg-blue-50 dark:bg-blue-950/30 p-3">
        <MathFormula tex="\int_0^2 x^2 \, dx = \frac{8}{3} \approx 2.667" />
      </div>

      <div className="flex gap-2">
        {METHODS.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setMethod(m.id)}
            className={`flex-1 px-3 py-2 rounded-md text-sm font-semibold min-h-[44px] transition-colors ${
              method === m.id
                ? 'bg-blue-600 text-white'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="aspect-square rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden">
          <canvas ref={canvasRef} width={500} height={500} className="w-full h-full block" />
        </div>
        <div className="flex flex-col gap-3">
          <SliderRow label="분할 수 n" value={n} min={2} max={120} step={1} onChange={setN} />
          <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 p-3 text-sm space-y-1">
            <p>리만합 ≈ <strong className="font-mono">{sum.toFixed(4)}</strong></p>
            <p>참값 = <strong className="font-mono">{truth.toFixed(4)}</strong></p>
            <p>오차 = <strong className={`font-mono ${Math.abs(error) < 0.01 ? 'text-emerald-600 dark:text-emerald-400' : ''}`}>
              {error.toFixed(4)}
            </strong></p>
          </div>
          <details className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-3 text-sm">
            <summary className="font-semibold cursor-pointer">왜 중점이 가장 정확할까?</summary>
            <p className="mt-2 text-zinc-700 dark:text-zinc-300">
              왼쪽·오른쪽 끝점은 한쪽이 항상 부족하거나 넘쳐요. 중점은 윗부분의 부족과 아랫부분의
              넘침이 서로 상쇄돼서 같은 n에서도 오차가 훨씬 작아요.
            </p>
          </details>
        </div>
      </div>
    </div>
  );
}

function f(x: number): number {
  return x * x;
}

function computeRiemannSum(a: number, b: number, n: number, method: Method): number {
  const dx = (b - a) / n;
  let sum = 0;
  for (let i = 0; i < n; i++) {
    const xL = a + i * dx;
    const xR = xL + dx;
    const x = method === 'left' ? xL : method === 'right' ? xR : (xL + xR) / 2;
    sum += f(x) * dx;
  }
  return sum;
}

function drawRiemann(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  a: number,
  b: number,
  n: number,
  method: Method,
) {
  const X_MIN = -0.5;
  const X_MAX = 2.5;
  const Y_MIN = -0.5;
  const Y_MAX = 5;
  const toX = (x: number) => ((x - X_MIN) / (X_MAX - X_MIN)) * W;
  const toY = (y: number) => H - ((y - Y_MIN) / (Y_MAX - Y_MIN)) * H;

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = '#e5e7eb';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 2; i++) {
    ctx.beginPath();
    ctx.moveTo(toX(i), 0);
    ctx.lineTo(toX(i), H);
    ctx.stroke();
  }
  for (let i = 0; i <= 5; i++) {
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

  // 직사각형
  const dx = (b - a) / n;
  for (let i = 0; i < n; i++) {
    const xL = a + i * dx;
    const xR = xL + dx;
    const x = method === 'left' ? xL : method === 'right' ? xR : (xL + xR) / 2;
    const h = f(x);
    ctx.fillStyle = 'rgba(59, 130, 246, 0.45)';
    ctx.strokeStyle = '#1e40af';
    ctx.lineWidth = 1;
    const rectX = toX(xL);
    const rectY = toY(h);
    const rectW = toX(xR) - toX(xL);
    const rectH = toY(0) - toY(h);
    ctx.fillRect(rectX, rectY, rectW, rectH);
    ctx.strokeRect(rectX, rectY, rectW, rectH);
  }

  // 곡선 y = x²
  ctx.strokeStyle = '#dc2626';
  ctx.lineWidth = 3;
  ctx.beginPath();
  let started = false;
  for (let px = 0; px <= W; px += 1) {
    const x = X_MIN + (px / W) * (X_MAX - X_MIN);
    const y = f(x);
    if (y > Y_MIN && y < Y_MAX) {
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
