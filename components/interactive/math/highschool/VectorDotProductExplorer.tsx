'use client';

// M-GE-04 평면벡터 내적 — a·b = |a||b|cos θ.

import { useEffect, useRef, useState } from 'react';
import { MathFormula } from '@/components/primitives/MathFormula';
import { SliderRow } from '@/components/primitives/SliderRow';

export function VectorDotProductExplorer() {
  const [ax, setAx] = useState(4);
  const [ay, setAy] = useState(0);
  const [bx, setBx] = useState(2);
  const [by, setBy] = useState(3);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const dot = ax * bx + ay * by;
  const magA = Math.hypot(ax, ay);
  const magB = Math.hypot(bx, by);
  const cosTheta = magA * magB > 0 ? dot / (magA * magB) : 0;
  const theta = (Math.acos(Math.max(-1, Math.min(1, cosTheta))) * 180) / Math.PI;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    drawDot(ctx, canvas.width, canvas.height, ax, ay, bx, by);
  }, [ax, ay, bx, by]);

  const isPerp = Math.abs(dot) < 0.001;
  const isParallel = Math.abs(Math.abs(cosTheta) - 1) < 0.01;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          벡터 내적 — 두 벡터가 얼마나 같은 방향인가
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          a · b = |a||b|cos θ. 0이면 수직, 양수면 예각, 음수면 둔각.
        </p>
      </div>

      <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 p-3 text-center text-lg">
        <MathFormula
          tex={`\\vec{a} \\cdot \\vec{b} = ${ax}\\cdot${bx} + ${ay}\\cdot${by} = ${dot.toFixed(2)}`}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="aspect-square rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden">
          <canvas ref={canvasRef} width={500} height={500} className="w-full h-full block" />
        </div>
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-2">
            <SliderRow label="aₓ" value={ax} min={-5} max={5} step={0.5} onChange={setAx} />
            <SliderRow label="aᵧ" value={ay} min={-5} max={5} step={0.5} onChange={setAy} />
            <SliderRow label="bₓ" value={bx} min={-5} max={5} step={0.5} onChange={setBx} />
            <SliderRow label="bᵧ" value={by} min={-5} max={5} step={0.5} onChange={setBy} />
          </div>
          <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 p-3 text-sm space-y-1 font-mono">
            <p>|a| = {magA.toFixed(3)}, |b| = {magB.toFixed(3)}</p>
            <p>cos θ = {cosTheta.toFixed(3)}</p>
            <p className="text-base">θ ≈ <strong>{theta.toFixed(1)}°</strong></p>
          </div>
          <div
            className={`rounded-xl p-3 text-sm border-l-4 ${
              isPerp
                ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500 text-emerald-700 dark:text-emerald-300'
                : isParallel
                  ? 'bg-purple-50 dark:bg-purple-950/30 border-purple-500'
                  : dot > 0
                    ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-500'
                    : 'bg-rose-50 dark:bg-rose-950/30 border-rose-500'
            }`}
          >
            <strong>
              {isPerp ? '⊥ 수직' : isParallel ? '∥ 평행' : dot > 0 ? '예각 (<90°)' : '둔각 (>90°)'}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}

function drawDot(ctx: CanvasRenderingContext2D, W: number, H: number, ax: number, ay: number, bx: number, by: number) {
  const SCALE = 35;
  const cx = W / 2;
  const cy = H / 2;
  const toX = (x: number) => cx + x * SCALE;
  const toY = (y: number) => cy - y * SCALE;

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = '#e5e7eb';
  ctx.lineWidth = 1;
  for (let i = -7; i <= 7; i++) {
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
  ctx.moveTo(0, cy);
  ctx.lineTo(W, cy);
  ctx.moveTo(cx, 0);
  ctx.lineTo(cx, H);
  ctx.stroke();

  // 사영 표시
  const magA2 = ax * ax + ay * ay;
  if (magA2 > 0.001) {
    const proj = (ax * bx + ay * by) / magA2;
    const px = proj * ax;
    const py = proj * ay;
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([5, 4]);
    ctx.beginPath();
    ctx.moveTo(toX(bx), toY(by));
    ctx.lineTo(toX(px), toY(py));
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(toX(px), toY(py), 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.font = '11px sans-serif';
    ctx.fillStyle = '#92400e';
    ctx.fillText('사영', toX(px) + 8, toY(py) - 4);
  }

  drawArrow(ctx, cx, cy, toX(ax), toY(ay), '#1e40af', 'a');
  drawArrow(ctx, cx, cy, toX(bx), toY(by), '#7e22ce', 'b');
}

function drawArrow(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color: string,
  label: string,
) {
  const HEAD = 12;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  if (len < 1) return;
  const ang = Math.atan2(dy, dx);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - HEAD * Math.cos(ang - 0.4), y2 - HEAD * Math.sin(ang - 0.4));
  ctx.lineTo(x2 - HEAD * Math.cos(ang + 0.4), y2 - HEAD * Math.sin(ang + 0.4));
  ctx.closePath();
  ctx.fill();
  ctx.font = 'bold 14px sans-serif';
  ctx.fillText(label, x2 + 8, y2 - 4);
}
