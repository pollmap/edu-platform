'use client';

// M-CA2-04 합성함수·매개변수 미분 — 연쇄법칙 시각화.

import { useEffect, useRef, useState } from 'react';
import { MathFormula } from '@/components/primitives/MathFormula';
import { SliderRow } from '@/components/primitives/SliderRow';

type Kind = 'composite' | 'parametric';

export function ChainRuleExplorer() {
  const [kind, setKind] = useState<Kind>('composite');
  const [t, setT] = useState(0.7);
  const [k, setK] = useState(2);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 합성: f(g(x)) = sin(kx²) → df/dx = cos(kx²)·2kx
  // 매개변수: x = cos(t), y = sin(t) → dy/dx = -cos(t)/sin(t)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    if (kind === 'composite') drawComposite(ctx, canvas.width, canvas.height, k, t);
    else drawParametric(ctx, canvas.width, canvas.height, t);
  }, [kind, k, t]);

  let info: string[] = [];
  if (kind === 'composite') {
    const x = t * 2;
    const y = Math.sin(k * x * x);
    const dy = Math.cos(k * x * x) * 2 * k * x;
    info = [
      `x = ${x.toFixed(3)}`,
      `y = sin(kx²) = ${y.toFixed(3)}`,
      `dy/dx = cos(kx²)·2kx = ${dy.toFixed(3)}`,
    ];
  } else {
    const x = Math.cos(t * Math.PI);
    const y = Math.sin(t * Math.PI);
    const dxdt = -Math.sin(t * Math.PI);
    const dydt = Math.cos(t * Math.PI);
    const dy = Math.abs(dxdt) > 1e-3 ? dydt / dxdt : NaN;
    info = [
      `t = ${(t * Math.PI).toFixed(3)} rad`,
      `(x, y) = (${x.toFixed(3)}, ${y.toFixed(3)})`,
      `dx/dt = ${dxdt.toFixed(3)}, dy/dt = ${dydt.toFixed(3)}`,
      `dy/dx = (dy/dt)/(dx/dt) = ${isFinite(dy) ? dy.toFixed(3) : '발산'}`,
    ];
  }

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          연쇄법칙 — 합성·매개변수 미분의 한 줄
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          dy/dx = (dy/du)·(du/dx) — 「변수의 다리」를 놓는 법칙.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setKind('composite')}
          className={`px-3 py-2 rounded-md text-sm font-semibold min-h-[44px] ${
            kind === 'composite' ? 'bg-blue-600 text-white' : 'bg-zinc-100 dark:bg-zinc-800'
          }`}
        >
          합성함수
        </button>
        <button
          type="button"
          onClick={() => setKind('parametric')}
          className={`px-3 py-2 rounded-md text-sm font-semibold min-h-[44px] ${
            kind === 'parametric' ? 'bg-blue-600 text-white' : 'bg-zinc-100 dark:bg-zinc-800'
          }`}
        >
          매개변수
        </button>
      </div>

      <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 p-3 text-center">
        {kind === 'composite' ? (
          <MathFormula tex={'\\frac{d}{dx} f(g(x)) = f\'(g(x))\\cdot g\'(x)'} />
        ) : (
          <MathFormula tex={'\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt}'} />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="aspect-square rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden">
          <canvas ref={canvasRef} width={500} height={500} className="w-full h-full block" />
        </div>
        <div className="flex flex-col gap-3">
          {kind === 'composite' ? (
            <SliderRow label="계수 k" value={k} min={0.5} max={5} step={0.1} onChange={setK} />
          ) : null}
          <SliderRow
            label={kind === 'composite' ? '검사점 t' : '각 t/π'}
            value={t}
            min={kind === 'composite' ? -1 : 0.05}
            max={kind === 'composite' ? 1 : 1.95}
            step={0.01}
            onChange={setT}
          />
          <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 p-3 text-sm space-y-1">
            {info.map((line) => (
              <p key={line} className="font-mono text-xs">{line}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function drawComposite(ctx: CanvasRenderingContext2D, W: number, H: number, k: number, t: number) {
  const X_MIN = -2,
    X_MAX = 2;
  const Y_MIN = -1.5,
    Y_MAX = 1.5;

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, W, H);

  const toX = (x: number) => ((x - X_MIN) / (X_MAX - X_MIN)) * W;
  const toY = (y: number) => H - ((y - Y_MIN) / (Y_MAX - Y_MIN)) * H;

  ctx.strokeStyle = '#1f2937';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, toY(0));
  ctx.lineTo(W, toY(0));
  ctx.moveTo(toX(0), 0);
  ctx.lineTo(toX(0), H);
  ctx.stroke();

  ctx.strokeStyle = '#1e40af';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  let started = false;
  for (let x = X_MIN; x <= X_MAX; x += 0.005) {
    const y = Math.sin(k * x * x);
    if (!started) {
      ctx.moveTo(toX(x), toY(y));
      started = true;
    } else ctx.lineTo(toX(x), toY(y));
  }
  ctx.stroke();

  // 점·접선
  const x0 = t * 2;
  const y0 = Math.sin(k * x0 * x0);
  const slope = Math.cos(k * x0 * x0) * 2 * k * x0;

  ctx.strokeStyle = '#dc2626';
  ctx.lineWidth = 2;
  ctx.setLineDash([6, 4]);
  ctx.beginPath();
  ctx.moveTo(toX(X_MIN), toY(slope * (X_MIN - x0) + y0));
  ctx.lineTo(toX(X_MAX), toY(slope * (X_MAX - x0) + y0));
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = '#dc2626';
  ctx.beginPath();
  ctx.arc(toX(x0), toY(y0), 6, 0, 2 * Math.PI);
  ctx.fill();
}

function drawParametric(ctx: CanvasRenderingContext2D, W: number, H: number, t: number) {
  const X_MIN = -1.5,
    X_MAX = 1.5;
  const Y_MIN = -0.2,
    Y_MAX = 1.5;

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, W, H);

  const toX = (x: number) => ((x - X_MIN) / (X_MAX - X_MIN)) * W;
  const toY = (y: number) => H - ((y - Y_MIN) / (Y_MAX - Y_MIN)) * H;

  ctx.strokeStyle = '#1f2937';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, toY(0));
  ctx.lineTo(W, toY(0));
  ctx.moveTo(toX(0), 0);
  ctx.lineTo(toX(0), H);
  ctx.stroke();

  // 반원 (위쪽)
  ctx.strokeStyle = '#1e40af';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  for (let s = 0; s <= 1; s += 0.005) {
    const x = Math.cos(s * Math.PI);
    const y = Math.sin(s * Math.PI);
    if (s === 0) ctx.moveTo(toX(x), toY(y));
    else ctx.lineTo(toX(x), toY(y));
  }
  ctx.stroke();

  const x0 = Math.cos(t * Math.PI);
  const y0 = Math.sin(t * Math.PI);
  const dxdt = -Math.sin(t * Math.PI);
  const dydt = Math.cos(t * Math.PI);
  const slope = Math.abs(dxdt) > 1e-3 ? dydt / dxdt : 1e6;

  ctx.strokeStyle = '#dc2626';
  ctx.lineWidth = 2;
  ctx.setLineDash([6, 4]);
  ctx.beginPath();
  ctx.moveTo(toX(X_MIN), toY(slope * (X_MIN - x0) + y0));
  ctx.lineTo(toX(X_MAX), toY(slope * (X_MAX - x0) + y0));
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = '#dc2626';
  ctx.beginPath();
  ctx.arc(toX(x0), toY(y0), 6, 0, 2 * Math.PI);
  ctx.fill();
}
