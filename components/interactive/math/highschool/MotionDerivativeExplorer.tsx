'use client';

// M-CA2-05 도함수 활용 — 위치·속도·가속도 (운동 시뮬).

import { useEffect, useRef, useState } from 'react';
import { MathFormula } from '@/components/primitives/MathFormula';
import { SliderRow } from '@/components/primitives/SliderRow';

export function MotionDerivativeExplorer() {
  const [t, setT] = useState(2);
  const [playing, setPlaying] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  // s(t) = -t³ + 6t² (3차 함수, 굴곡 있는 운동)
  const s = (x: number) => -(x ** 3) + 6 * x ** 2;
  const v = (x: number) => -3 * x ** 2 + 12 * x;
  const aFn = (x: number) => -6 * x + 12;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    drawMotion(ctx, canvas.width, canvas.height, t, s, v, aFn);
  }, [t]);

  useEffect(() => {
    if (!playing) return;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setT((prev) => {
        const next = prev + dt * 0.8;
        if (next > 5) {
          setPlaying(false);
          return 0;
        }
        return next;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [playing]);

  const pos = s(t);
  const vel = v(t);
  const acc = aFn(t);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          속도·가속도 — 위치를 미분하면 속도, 한 번 더 미분하면 가속도
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          물리에서 미분이 왜 핵심인지 이 한 그림으로.
        </p>
      </div>

      <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 p-3 text-center text-sm">
        <MathFormula tex="s(t) = -t^3 + 6t^2, \quad v = s', \quad a = s''" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="aspect-square rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden">
          <canvas ref={canvasRef} width={500} height={500} className="w-full h-full block" />
        </div>
        <div className="flex flex-col gap-3">
          <SliderRow label="시간 t" value={t} min={0} max={5} step={0.05} onChange={setT} unit="초" />
          <button
            type="button"
            onClick={() => {
              if (!playing) setT(0);
              setPlaying(!playing);
            }}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold min-h-[44px]"
          >
            {playing ? '정지' : '재생 ▶'}
          </button>
          <ValueRow label="위치 s" value={pos} unit="m" color="blue" />
          <ValueRow label="속도 v" value={vel} unit="m/s" color="purple" />
          <ValueRow label="가속도 a" value={acc} unit="m/s²" color="emerald" />
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            v=0인 순간이 운동 방향이 바뀌는 순간 (극값). a=0인 순간이 속도가 최대/최소 (변곡점).
          </p>
        </div>
      </div>
    </div>
  );
}

interface ValueRowProps {
  label: string;
  value: number;
  unit: string;
  color: 'blue' | 'purple' | 'emerald';
}

function ValueRow({ label, value, unit, color }: ValueRowProps) {
  const colors: Record<ValueRowProps['color'], string> = {
    blue: 'bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300',
    purple: 'bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300',
    emerald: 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300',
  };
  return (
    <div className={`rounded-lg p-3 flex justify-between ${colors[color]}`}>
      <span className="text-sm font-semibold">{label}</span>
      <span className="font-mono">
        {value.toFixed(2)} {unit}
      </span>
    </div>
  );
}

function drawMotion(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  t: number,
  s: (x: number) => number,
  v: (x: number) => number,
  a: (x: number) => number,
) {
  const X_MIN = 0;
  const X_MAX = 5;
  const Y_MIN = -20;
  const Y_MAX = 35;
  const toX = (x: number) => ((x - X_MIN) / (X_MAX - X_MIN)) * W;
  const toY = (y: number) => H - ((y - Y_MIN) / (Y_MAX - Y_MIN)) * H;

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = '#e5e7eb';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 5; i++) {
    ctx.beginPath();
    ctx.moveTo(toX(i), 0);
    ctx.lineTo(toX(i), H);
    ctx.stroke();
  }
  for (let i = -20; i <= 35; i += 5) {
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
  ctx.stroke();

  // 곡선
  drawFn(ctx, W, X_MIN, X_MAX, Y_MIN, Y_MAX, toX, toY, s, '#1e40af', 3);
  drawFn(ctx, W, X_MIN, X_MAX, Y_MIN, Y_MAX, toX, toY, v, '#7e22ce', 2.5);
  drawFn(ctx, W, X_MIN, X_MAX, Y_MIN, Y_MAX, toX, toY, a, '#10b981', 2);

  // 현재 시점 점들
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(toX(t), 0);
  ctx.lineTo(toX(t), H);
  ctx.stroke();
  ctx.setLineDash([]);

  for (const [fn, color] of [[s, '#1e40af'], [v, '#7e22ce'], [a, '#10b981']] as Array<[(x: number) => number, string]>) {
    const y = fn(t);
    if (y > Y_MIN && y < Y_MAX) {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(toX(t), toY(y), 6, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  // 범례
  ctx.font = 'bold 12px sans-serif';
  ctx.fillStyle = '#1e40af';
  ctx.fillText('s(t) 위치', 10, 18);
  ctx.fillStyle = '#7e22ce';
  ctx.fillText('v(t) 속도', 10, 34);
  ctx.fillStyle = '#10b981';
  ctx.fillText('a(t) 가속도', 10, 50);
}

function drawFn(
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
