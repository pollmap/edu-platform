'use client';

// M-GE-03 평면벡터 — 합·차·스칼라배 시각화.

import { useEffect, useRef, useState } from 'react';
import { MathFormula } from '@/components/primitives/MathFormula';
import { SliderRow } from '@/components/primitives/SliderRow';

type Op = 'add' | 'sub' | 'scalar';

export function VectorPlaneExplorer() {
  const [ax, setAx] = useState(3);
  const [ay, setAy] = useState(2);
  const [bx, setBx] = useState(1);
  const [by, setBy] = useState(3);
  const [k, setK] = useState(2);
  const [op, setOp] = useState<Op>('add');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    drawVectors(ctx, canvas.width, canvas.height, { ax, ay, bx, by, k, op });
  }, [ax, ay, bx, by, k, op]);

  const result =
    op === 'add'
      ? { x: ax + bx, y: ay + by, tex: '\\vec{a} + \\vec{b}' }
      : op === 'sub'
        ? { x: ax - bx, y: ay - by, tex: '\\vec{a} - \\vec{b}' }
        : { x: k * ax, y: k * ay, tex: `${k}\\vec{a}` };
  const magA = Math.hypot(ax, ay);
  const magB = Math.hypot(bx, by);
  const magR = Math.hypot(result.x, result.y);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          평면벡터 — 화살표의 덧셈·뺄셈
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          벡터는 「방향 + 크기」의 화살표. 합은 평행이동, 차는 끝점에서 시작점으로.
        </p>
      </div>

      <div className="flex gap-2">
        {(['add', 'sub', 'scalar'] as const).map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => setOp(o)}
            className={`flex-1 px-3 py-2 rounded-md text-sm font-semibold min-h-[44px] transition-colors ${
              op === o
                ? 'bg-blue-600 text-white'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
            }`}
          >
            {o === 'add' ? 'a + b' : o === 'sub' ? 'a − b' : 'k·a'}
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 p-3 text-center">
        <MathFormula tex={`${result.tex} = (${result.x.toFixed(2)},\\, ${result.y.toFixed(2)})`} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="aspect-square rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden">
          <canvas ref={canvasRef} width={500} height={500} className="w-full h-full block" />
        </div>
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-2">
            <SliderRow label="aₓ" value={ax} min={-5} max={5} step={0.5} onChange={setAx} />
            <SliderRow label="aᵧ" value={ay} min={-5} max={5} step={0.5} onChange={setAy} />
            {op !== 'scalar' ? (
              <>
                <SliderRow label="bₓ" value={bx} min={-5} max={5} step={0.5} onChange={setBx} />
                <SliderRow label="bᵧ" value={by} min={-5} max={5} step={0.5} onChange={setBy} />
              </>
            ) : (
              <div className="col-span-2">
                <SliderRow label="k (스칼라)" value={k} min={-3} max={3} step={0.5} onChange={setK} />
              </div>
            )}
          </div>
          <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 p-3 text-sm space-y-1 font-mono">
            <p>|a| = {magA.toFixed(3)}</p>
            {op !== 'scalar' ? <p>|b| = {magB.toFixed(3)}</p> : null}
            <p className="font-bold">|결과| = {magR.toFixed(3)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface DrawArgs {
  ax: number;
  ay: number;
  bx: number;
  by: number;
  k: number;
  op: Op;
}

function drawVectors(ctx: CanvasRenderingContext2D, W: number, H: number, p: DrawArgs) {
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

  drawArrow(ctx, toX(0), toY(0), toX(p.ax), toY(p.ay), '#1e40af', 'a');

  if (p.op !== 'scalar') {
    drawArrow(ctx, toX(0), toY(0), toX(p.bx), toY(p.by), '#7e22ce', 'b');
    if (p.op === 'add') {
      // b를 a 끝에 평행이동
      drawArrow(ctx, toX(p.ax), toY(p.ay), toX(p.ax + p.bx), toY(p.ay + p.by), '#9ca3af', '');
      drawArrow(ctx, toX(0), toY(0), toX(p.ax + p.bx), toY(p.ay + p.by), '#dc2626', 'a+b');
    } else {
      drawArrow(ctx, toX(p.bx), toY(p.by), toX(p.ax), toY(p.ay), '#dc2626', 'a−b');
    }
  } else {
    drawArrow(ctx, toX(0), toY(0), toX(p.k * p.ax), toY(p.k * p.ay), '#dc2626', `${p.k}a`);
  }
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
  if (label) {
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText(label, x2 + 8, y2 - 4);
  }
}
