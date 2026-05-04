'use client';

// M-CM2-08 유리·무리함수 — y = k / (x − p) + q 와 y = √(x − p) + q 그래프.
// 점근선·정의역·치역을 동적으로 표시.

import { useEffect, useMemo, useRef, useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';

type FuncMode = 'rational' | 'sqrt';

interface State {
  mode: FuncMode;
  k: number;
  p: number;
  q: number;
}

const X_MIN = -8;
const X_MAX = 8;
const Y_MIN = -8;
const Y_MAX = 8;

function evalFn(s: State, x: number): number | null {
  if (s.mode === 'rational') {
    if (Math.abs(x - s.p) < 0.01) return null;
    return s.k / (x - s.p) + s.q;
  }
  if (x < s.p) return null;
  return Math.sqrt(x - s.p) + s.q;
}

export function RationalIrrationalFunctionExplorer() {
  const [s, setS] = useState<State>({ mode: 'rational', k: 2, p: 0, q: 0 });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const xToPx = (x: number) => ((x - X_MIN) / (X_MAX - X_MIN)) * W;
    const yToPx = (y: number) => H - ((y - Y_MIN) / (Y_MAX - Y_MIN)) * H;

    // grid
    ctx.strokeStyle = 'rgba(127,127,127,0.18)';
    ctx.lineWidth = 1;
    for (let g = X_MIN; g <= X_MAX; g++) {
      ctx.beginPath();
      ctx.moveTo(xToPx(g), 0);
      ctx.lineTo(xToPx(g), H);
      ctx.stroke();
    }
    for (let g = Y_MIN; g <= Y_MAX; g++) {
      ctx.beginPath();
      ctx.moveTo(0, yToPx(g));
      ctx.lineTo(W, yToPx(g));
      ctx.stroke();
    }
    ctx.strokeStyle = 'rgba(127,127,127,0.6)';
    ctx.beginPath();
    ctx.moveTo(0, yToPx(0));
    ctx.lineTo(W, yToPx(0));
    ctx.moveTo(xToPx(0), 0);
    ctx.lineTo(xToPx(0), H);
    ctx.stroke();

    // 점근선
    if (s.mode === 'rational') {
      ctx.strokeStyle = '#a855f7';
      ctx.setLineDash([5, 4]);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(xToPx(s.p), 0);
      ctx.lineTo(xToPx(s.p), H);
      ctx.moveTo(0, yToPx(s.q));
      ctx.lineTo(W, yToPx(s.q));
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // 곡선
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 2;
    let started = false;
    ctx.beginPath();
    for (let px = 0; px <= W; px += 1) {
      const x = X_MIN + (px / W) * (X_MAX - X_MIN);
      const y = evalFn(s, x);
      if (y === null || y > Y_MAX * 1.5 || y < Y_MIN * 1.5) {
        started = false;
        continue;
      }
      const py = yToPx(y);
      if (!started) {
        ctx.moveTo(px, py);
        started = true;
      } else {
        ctx.lineTo(px, py);
      }
    }
    ctx.stroke();
  }, [s]);

  const description = useMemo(() => {
    if (s.mode === 'rational') {
      return {
        eq: `y = ${s.k} / (x − ${s.p}) + ${s.q}`,
        domain: `x ≠ ${s.p}`,
        range: `y ≠ ${s.q}`,
        asymptote: `세로 점근선: x = ${s.p}, 가로 점근선: y = ${s.q}`,
      };
    }
    return {
      eq: `y = √(x − ${s.p}) + ${s.q}`,
      domain: `x ≥ ${s.p}`,
      range: `y ≥ ${s.q}`,
      asymptote: '시작점: (' + s.p + ', ' + s.q + ')',
    };
  }, [s]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setS({ mode: 'rational', k: 2, p: 0, q: 0 })}
          className={`flex-1 px-3 py-2 border rounded-md text-sm min-h-[44px] ${
            s.mode === 'rational'
              ? 'border-blue-700 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400'
              : 'border-zinc-300 dark:border-zinc-700 hover:border-blue-700'
          }`}
        >
          유리함수 y = k/(x−p) + q
        </button>
        <button
          type="button"
          onClick={() => setS({ mode: 'sqrt', k: 1, p: 0, q: 0 })}
          className={`flex-1 px-3 py-2 border rounded-md text-sm min-h-[44px] ${
            s.mode === 'sqrt'
              ? 'border-blue-700 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400'
              : 'border-zinc-300 dark:border-zinc-700 hover:border-blue-700'
          }`}
        >
          무리함수 y = √(x−p) + q
        </button>
      </div>

      <div className="grid gap-2 md:grid-cols-2">
        {s.mode === 'rational' && (
          <SliderRow label="k (분자)" value={s.k} min={-5} max={5} step={0.5} onChange={(v) => setS({ ...s, k: v === 0 ? 0.5 : v })} format={(v) => v.toFixed(1)} />
        )}
        <SliderRow label="p (x 이동)" value={s.p} min={-5} max={5} step={1} onChange={(v) => setS({ ...s, p: v })} format={(v) => v.toFixed(0)} />
        <SliderRow label="q (y 이동)" value={s.q} min={-5} max={5} step={1} onChange={(v) => setS({ ...s, q: v })} format={(v) => v.toFixed(0)} />
      </div>

      <canvas ref={canvasRef} width={520} height={360} className="w-full max-w-xl mx-auto rounded-lg bg-zinc-50 dark:bg-zinc-900" aria-label="유리·무리함수 그래프" />

      <div className="grid gap-2 md:grid-cols-2 text-sm">
        <div className="rounded-md bg-blue-50 dark:bg-blue-950/40 p-3">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">식</div>
          <div className="font-mono mt-1 text-blue-700 dark:text-blue-300">{description.eq}</div>
        </div>
        <div className="rounded-md bg-purple-50 dark:bg-purple-950/40 p-3">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">{s.mode === 'rational' ? '점근선' : '시작점'}</div>
          <div className="font-mono mt-1 text-purple-700 dark:text-purple-300">{description.asymptote}</div>
        </div>
        <div className="rounded-md bg-emerald-50 dark:bg-emerald-950/40 p-3">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">정의역</div>
          <div className="font-mono mt-1 text-emerald-700 dark:text-emerald-300">{description.domain}</div>
        </div>
        <div className="rounded-md bg-amber-50 dark:bg-amber-950/40 p-3">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">치역</div>
          <div className="font-mono mt-1 text-amber-700 dark:text-amber-300">{description.range}</div>
        </div>
      </div>
    </div>
  );
}
