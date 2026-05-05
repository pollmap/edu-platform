'use client';

// M-CA2-07 정적분 활용 (회전체) — 곡선을 x축으로 회전한 부피.

import { useEffect, useRef, useState } from 'react';
import { MathFormula } from '@/components/primitives/MathFormula';
import { SliderRow } from '@/components/primitives/SliderRow';

export function SolidOfRevolutionExplorer() {
  // y = a·sqrt(x) 의 [x1, x2] 회전 부피 = π·∫a²·x dx = π·a²·(x²/2)|x1^x2
  const [a, setA] = useState(1);
  const [x1, setX1] = useState(0);
  const [x2, setX2] = useState(4);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const f = (x: number) => a * Math.sqrt(Math.max(0, x));
  const volume = (Math.PI * a * a * (x2 * x2 - x1 * x1)) / 2;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    drawSolid(ctx, canvas.width, canvas.height, f, x1, x2);
  }, [a, x1, x2]);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          회전체의 부피 — 얇은 디스크의 합
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          x = c에서 두께 dx, 반지름 f(c)인 디스크의 부피 πf(c)²dx를 모두 더해요.
        </p>
      </div>

      <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 p-3 text-center">
        <MathFormula tex={'V = \\pi \\int_{x_1}^{x_2} \\bigl(f(x)\\bigr)^2 dx'} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="aspect-square rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden">
          <canvas ref={canvasRef} width={500} height={500} className="w-full h-full block" />
        </div>
        <div className="flex flex-col gap-3">
          <SliderRow label="계수 a (y = a√x)" value={a} min={0.3} max={2.5} step={0.05} onChange={setA} />
          <SliderRow label="x₁" value={x1} min={0} max={3} step={0.1} onChange={setX1} />
          <SliderRow label="x₂" value={x2} min={1} max={6} step={0.1} onChange={setX2} />
          <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 p-3 text-sm space-y-1">
            <p>적분: π·∫a²x dx = π·a²·(x²/2)</p>
            <p>부피 V = <span className="font-mono">{volume.toFixed(4)}</span></p>
            <p className="text-xs text-zinc-500">곡선을 x축에 대해 회전 → 옆에서 본 단면이 화면에 표시</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function drawSolid(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  f: (x: number) => number,
  x1: number,
  x2: number,
) {
  const X_MIN = -1,
    X_MAX = 7;
  const Y_MIN = -3,
    Y_MAX = 3;

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, W, H);

  const toX = (x: number) => ((x - X_MIN) / (X_MAX - X_MIN)) * W;
  const toY = (y: number) => H - ((y - Y_MIN) / (Y_MAX - Y_MIN)) * H;

  ctx.strokeStyle = '#e5e7eb';
  for (let i = 0; i <= 6; i++) {
    ctx.beginPath();
    ctx.moveTo(toX(i), 0);
    ctx.lineTo(toX(i), H);
    ctx.stroke();
  }

  ctx.strokeStyle = '#1f2937';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, toY(0));
  ctx.lineTo(W, toY(0));
  ctx.stroke();

  // 회전체 단면 (위·아래)
  ctx.fillStyle = 'rgba(59, 130, 246, 0.25)';
  ctx.beginPath();
  ctx.moveTo(toX(x1), toY(0));
  for (let x = x1; x <= x2; x += 0.05) ctx.lineTo(toX(x), toY(f(x)));
  for (let x = x2; x >= x1; x -= 0.05) ctx.lineTo(toX(x), toY(-f(x)));
  ctx.closePath();
  ctx.fill();

  // 곡선
  ctx.strokeStyle = '#1e40af';
  ctx.lineWidth = 3;
  ctx.beginPath();
  for (let x = 0; x <= X_MAX; x += 0.05) {
    const y = f(x);
    if (x === 0) ctx.moveTo(toX(x), toY(y));
    else ctx.lineTo(toX(x), toY(y));
  }
  ctx.stroke();

  ctx.beginPath();
  for (let x = 0; x <= X_MAX; x += 0.05) {
    const y = -f(x);
    if (x === 0) ctx.moveTo(toX(x), toY(y));
    else ctx.lineTo(toX(x), toY(y));
  }
  ctx.stroke();

  // 디스크 가이드 (얇은 원판들)
  ctx.strokeStyle = '#dc2626';
  ctx.lineWidth = 1;
  const step = (x2 - x1) / 8;
  for (let x = x1; x <= x2; x += step) {
    const r = f(x);
    ctx.beginPath();
    ctx.moveTo(toX(x), toY(r));
    ctx.lineTo(toX(x), toY(-r));
    ctx.stroke();
  }

  // x1, x2 표시
  ctx.fillStyle = '#dc2626';
  ctx.font = 'bold 14px system-ui';
  ctx.textAlign = 'center';
  ctx.fillText(`x₁ = ${x1.toFixed(1)}`, toX(x1), toY(-0.4));
  ctx.fillText(`x₂ = ${x2.toFixed(1)}`, toX(x2), toY(-0.4));
}
