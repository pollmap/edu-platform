'use client';

// M-CA2-02 급수 — 부분합과 수렴/발산 시각화.

import { useEffect, useMemo, useRef, useState } from 'react';
import { MathFormula } from '@/components/primitives/MathFormula';
import { SliderRow } from '@/components/primitives/SliderRow';

type Kind = 'geometric' | 'harmonic' | 'pSeries' | 'alternating';

const KINDS: Array<{ id: Kind; label: string; tex: string; converges: (param: number) => boolean }> = [
  {
    id: 'geometric',
    label: '등비급수 r^n',
    tex: '\\sum_{n=0}^{\\infty} r^n = \\frac{1}{1-r}\\ (|r|<1)',
    converges: (r) => Math.abs(r) < 1,
  },
  { id: 'harmonic', label: '조화급수 1/n', tex: '\\sum \\frac{1}{n}\\ \\to\\ \\infty', converges: () => false },
  { id: 'pSeries', label: 'p-급수 1/nᵖ', tex: '\\sum \\frac{1}{n^p}\\ (p>1\\Rightarrow\\text{수렴})', converges: (p) => p > 1 },
  {
    id: 'alternating',
    label: '교대 (-1)ⁿ/n',
    tex: '\\sum \\frac{(-1)^{n}}{n} = -\\ln 2',
    converges: () => true,
  },
];

export function SeriesConvergenceExplorer() {
  const [kind, setKind] = useState<Kind>('geometric');
  const [param, setParam] = useState(0.5);
  const [N, setN] = useState(20);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const partials = useMemo(() => {
    const arr: number[] = [];
    let s = 0;
    for (let n = 1; n <= N; n++) {
      let term = 0;
      if (kind === 'geometric') term = Math.pow(param, n - 1);
      else if (kind === 'harmonic') term = 1 / n;
      else if (kind === 'pSeries') term = 1 / Math.pow(n, param);
      else term = Math.pow(-1, n + 1) / n;
      s += term;
      arr.push(s);
    }
    return arr;
  }, [kind, param, N]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    drawSeries(ctx, canvas.width, canvas.height, partials);
  }, [partials]);

  const current = KINDS.find((k) => k.id === kind)!;
  const converges = current.converges(param);
  const last = partials[partials.length - 1] ?? 0;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          급수 — 무한히 더한 결과는 어디로 가나
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          부분합 Sₙ의 수열이 한 값에 가까워지면 「수렴」, 그렇지 않으면 「발산」.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {KINDS.map((k) => (
          <button
            key={k.id}
            type="button"
            onClick={() => setKind(k.id)}
            className={`px-3 py-2 rounded-md text-xs font-semibold min-h-[44px] transition-colors ${
              kind === k.id
                ? 'bg-blue-600 text-white'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
            }`}
          >
            {k.label}
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 p-3 text-center">
        <MathFormula tex={current.tex} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="aspect-square rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden">
          <canvas ref={canvasRef} width={500} height={500} className="w-full h-full block" />
        </div>
        <div className="flex flex-col gap-3">
          {kind === 'geometric' ? (
            <SliderRow label="공비 r" value={param} min={-1.5} max={1.5} step={0.05} onChange={setParam} />
          ) : kind === 'pSeries' ? (
            <SliderRow label="지수 p" value={param} min={0.5} max={3} step={0.1} onChange={setParam} />
          ) : null}
          <SliderRow label="항 수 N" value={N} min={5} max={200} step={1} onChange={setN} format={(v) => v.toFixed(0)} />
          <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 p-3 text-sm space-y-1">
            <p>S_{N} = <span className="font-mono">{last.toFixed(4)}</span></p>
            <p className={`font-semibold ${converges ? 'text-green-600' : 'text-red-600'}`}>
              {converges ? '✓ 수렴' : '✗ 발산'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function drawSeries(ctx: CanvasRenderingContext2D, W: number, H: number, partials: number[]) {
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, W, H);

  const yMin = Math.min(...partials, 0);
  const yMax = Math.max(...partials, 0);
  const padY = (yMax - yMin) * 0.1 || 1;
  const Y_MIN = yMin - padY;
  const Y_MAX = yMax + padY;
  const N = partials.length;

  const toX = (i: number) => 40 + (i / Math.max(1, N - 1)) * (W - 60);
  const toY = (y: number) => H - 40 - ((y - Y_MIN) / (Y_MAX - Y_MIN)) * (H - 60);

  ctx.strokeStyle = '#e5e7eb';
  for (let j = 0; j < 6; j++) {
    const y = Y_MIN + ((Y_MAX - Y_MIN) * j) / 5;
    ctx.beginPath();
    ctx.moveTo(toX(0), toY(y));
    ctx.lineTo(toX(N - 1), toY(y));
    ctx.stroke();
  }

  ctx.strokeStyle = '#1f2937';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(toX(0), toY(0));
  ctx.lineTo(toX(N - 1), toY(0));
  ctx.stroke();

  ctx.strokeStyle = '#1e40af';
  ctx.lineWidth = 2;
  ctx.beginPath();
  partials.forEach((s, i) => {
    if (i === 0) ctx.moveTo(toX(i), toY(s));
    else ctx.lineTo(toX(i), toY(s));
  });
  ctx.stroke();

  ctx.fillStyle = '#dc2626';
  partials.forEach((s, i) => {
    ctx.beginPath();
    ctx.arc(toX(i), toY(s), 3, 0, 2 * Math.PI);
    ctx.fill();
  });
}
