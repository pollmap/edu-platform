'use client';

// M-CA1-07 정적분 활용 — 두 곡선 사이 넓이 / 직선과의 넓이.

import { useEffect, useRef, useState } from 'react';
import { MathFormula } from '@/components/primitives/MathFormula';
import { SliderRow } from '@/components/primitives/SliderRow';

export function DefiniteIntegralAreaExplorer() {
  // f(x) = -x^2 + a, g(x) = b
  const [a, setA] = useState(4);
  const [b, setB] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const f = (x: number) => -x * x + a;
  const g = (x: number) => b;

  // 교점: -x²+a = b → x = ±√(a−b), a > b 일 때
  const diff = a - b;
  const hasIntersect = diff > 0;
  const xR = hasIntersect ? Math.sqrt(diff) : 0;
  const xL = -xR;

  // 넓이: ∫(f - g) dx = ∫(-x² + a - b) dx = [-x³/3 + (a-b)x] from xL to xR
  const F = (x: number) => -(x ** 3) / 3 + diff * x;
  const area = hasIntersect ? F(xR) - F(xL) : 0;
  // 공식 검증: 4/3 (a-b)^(3/2)
  const areaFormula = hasIntersect ? (4 / 3) * Math.pow(diff, 1.5) : 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    drawArea(ctx, canvas.width, canvas.height, f, g, xL, xR);
  }, [a, b]);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          정적분 활용 — 두 곡선 사이의 넓이
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          (위 함수 − 아래 함수)의 정적분이 닫힌 영역의 넓이예요.
        </p>
      </div>

      <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 p-3 text-center">
        <MathFormula tex={'\\text{Area} = \\int_{\\alpha}^{\\beta} \\bigl(f(x) - g(x)\\bigr)\\,dx'} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="aspect-square rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden">
          <canvas ref={canvasRef} width={500} height={500} className="w-full h-full block" />
        </div>
        <div className="flex flex-col gap-3">
          <SliderRow label="포물선 정점 a" value={a} min={1} max={9} step={0.1} onChange={setA} />
          <SliderRow label="수평선 b" value={b} min={-3} max={6} step={0.1} onChange={setB} />
          <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 p-3 text-sm space-y-1">
            {hasIntersect ? (
              <>
                <p>교점 α = {xL.toFixed(3)}, β = {xR.toFixed(3)}</p>
                <p>넓이 = <span className="font-mono">{area.toFixed(4)}</span></p>
                <p className="text-xs text-zinc-500">공식: (4/3)(a−b)^(3/2) = {areaFormula.toFixed(4)}</p>
              </>
            ) : (
              <p className="text-red-500">두 곡선이 만나지 않음 (a ≤ b)</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function drawArea(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  f: (x: number) => number,
  g: (x: number) => number,
  xL: number,
  xR: number,
) {
  const X_MIN = -4,
    X_MAX = 4;
  const Y_MIN = -4,
    Y_MAX = 10;

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

  // 영역
  if (xR > xL) {
    ctx.fillStyle = 'rgba(59, 130, 246, 0.3)';
    ctx.beginPath();
    ctx.moveTo(toX(xL), toY(g(xL)));
    for (let x = xL; x <= xR; x += 0.02) {
      ctx.lineTo(toX(x), toY(f(x)));
    }
    for (let x = xR; x >= xL; x -= 0.02) {
      ctx.lineTo(toX(x), toY(g(x)));
    }
    ctx.closePath();
    ctx.fill();
  }

  // f
  ctx.strokeStyle = '#1e40af';
  ctx.lineWidth = 3;
  ctx.beginPath();
  let started = false;
  for (let x = X_MIN; x <= X_MAX; x += 0.04) {
    const y = f(x);
    if (Math.abs(y) < 30) {
      if (!started) {
        ctx.moveTo(toX(x), toY(y));
        started = true;
      } else {
        ctx.lineTo(toX(x), toY(y));
      }
    }
  }
  ctx.stroke();

  // g
  ctx.strokeStyle = '#dc2626';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(toX(X_MIN), toY(g(0)));
  ctx.lineTo(toX(X_MAX), toY(g(0)));
  ctx.stroke();
}
