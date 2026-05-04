'use client';

// M-AL-04 삼각함수 그래프 — y = A sin(B(x − C)) + D, 진폭·주기·위상·수직이동.

import { useEffect, useRef, useState } from 'react';
import { MathFormula } from '@/components/primitives/MathFormula';
import { SliderRow } from '@/components/primitives/SliderRow';

type Func = 'sin' | 'cos';

const X_MIN = -2 * Math.PI;
const X_MAX = 2 * Math.PI;
const Y_MIN = -4;
const Y_MAX = 4;

export function TrigGraphExplorer() {
  const [A, setA] = useState(1);
  const [B, setB] = useState(1);
  const [C, setC] = useState(0);
  const [D, setD] = useState(0);
  const [func, setFunc] = useState<Func>('sin');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    drawTrig(ctx, canvas.width, canvas.height, A, B, C, D, func);
  }, [A, B, C, D, func]);

  const period = (2 * Math.PI) / Math.max(0.01, Math.abs(B));
  const formula = `y = ${A.toFixed(1)} \\${func}(${B.toFixed(1)}(x ${C >= 0 ? '-' : '+'} ${Math.abs(C).toFixed(1)})) ${D >= 0 ? '+' : '-'} ${Math.abs(D).toFixed(1)}`;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          삼각함수 그래프 — 4가지 변형
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          A 진폭 · B 주기 · C 위상이동 · D 수직이동. 네 슬라이더로 모든 사인 곡선이 만들어져요.
        </p>
      </div>

      <div className="flex gap-2">
        {(['sin', 'cos'] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFunc(f)}
            className={`px-4 py-2 rounded-md text-sm font-semibold min-h-[44px] transition-colors ${
              func === f
                ? 'bg-blue-600 text-white'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 p-4 text-center text-lg">
        <MathFormula tex={formula} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="aspect-square rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden">
          <canvas ref={canvasRef} width={500} height={500} className="w-full h-full block" />
        </div>
        <div className="flex flex-col gap-3">
          <SliderRow label="A 진폭" value={A} min={-3} max={3} step={0.1} onChange={setA} />
          <SliderRow label="B 주기상수" value={B} min={0.1} max={3} step={0.1} onChange={setB} />
          <SliderRow label="C 위상이동" value={C} min={-Math.PI} max={Math.PI} step={0.1} onChange={setC} />
          <SliderRow label="D 수직이동" value={D} min={-3} max={3} step={0.1} onChange={setD} />
          <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 p-3 text-sm space-y-1">
            <p>주기 T = 2π / |B| ≈ <strong>{period.toFixed(2)}</strong></p>
            <p>최댓값 = D + |A| = <strong>{(D + Math.abs(A)).toFixed(2)}</strong></p>
            <p>최솟값 = D − |A| = <strong>{(D - Math.abs(A)).toFixed(2)}</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
}

function drawTrig(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  A: number,
  B: number,
  C: number,
  D: number,
  func: Func,
) {
  const toX = (x: number) => ((x - X_MIN) / (X_MAX - X_MIN)) * W;
  const toY = (y: number) => H - ((y - Y_MIN) / (Y_MAX - Y_MIN)) * H;
  const fn = func === 'sin' ? Math.sin : Math.cos;

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = '#e5e7eb';
  ctx.lineWidth = 1;
  for (let i = -2; i <= 2; i++) {
    const x = i * Math.PI;
    ctx.beginPath();
    ctx.moveTo(toX(x), 0);
    ctx.lineTo(toX(x), H);
    ctx.stroke();
  }
  for (let i = Y_MIN; i <= Y_MAX; i++) {
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

  // π 라벨
  ctx.fillStyle = '#6b7280';
  ctx.font = '11px sans-serif';
  ['-2π', '-π', '0', 'π', '2π'].forEach((label, i) => {
    const x = (i - 2) * Math.PI;
    ctx.fillText(label, toX(x) - 8, toY(0) + 14);
  });

  ctx.strokeStyle = '#1e40af';
  ctx.lineWidth = 3;
  ctx.beginPath();
  let started = false;
  for (let px = 0; px <= W; px += 1) {
    const x = X_MIN + (px / W) * (X_MAX - X_MIN);
    const y = A * fn(B * (x - C)) + D;
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
