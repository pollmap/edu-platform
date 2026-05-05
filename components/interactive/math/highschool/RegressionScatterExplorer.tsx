'use client';

// M-AS-02 자료의 분석 (회귀·상관) — 산점도 + 회귀선 + 상관계수.

import { useEffect, useMemo, useRef, useState } from 'react';
import { MathFormula } from '@/components/primitives/MathFormula';
import { SliderRow } from '@/components/primitives/SliderRow';

interface Point {
  x: number;
  y: number;
}

function generateData(n: number, slope: number, noise: number, seed: number): Point[] {
  const rand = mulberry32(seed);
  const pts: Point[] = [];
  for (let i = 0; i < n; i++) {
    const x = i / (n - 1) * 10;
    const y = slope * x + 5 + (rand() - 0.5) * noise * 10;
    pts.push({ x, y });
  }
  return pts;
}

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function fitLine(pts: Point[]): { m: number; b: number; r: number } {
  const n = pts.length;
  if (n < 2) return { m: 0, b: 0, r: 0 };
  const mx = pts.reduce((s, p) => s + p.x, 0) / n;
  const my = pts.reduce((s, p) => s + p.y, 0) / n;
  let num = 0,
    denX = 0,
    denY = 0;
  for (const p of pts) {
    num += (p.x - mx) * (p.y - my);
    denX += (p.x - mx) ** 2;
    denY += (p.y - my) ** 2;
  }
  const m = denX === 0 ? 0 : num / denX;
  const b = my - m * mx;
  const r = denX * denY === 0 ? 0 : num / Math.sqrt(denX * denY);
  return { m, b, r };
}

export function RegressionScatterExplorer() {
  const [n, setN] = useState(20);
  const [slope, setSlope] = useState(1.0);
  const [noise, setNoise] = useState(2);
  const [seed, setSeed] = useState(42);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const points = useMemo(() => generateData(n, slope, noise, seed), [n, slope, noise, seed]);
  const fit = useMemo(() => fitLine(points), [points]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    drawScatter(ctx, canvas.width, canvas.height, points, fit);
  }, [points, fit]);

  const corrLabel =
    Math.abs(fit.r) >= 0.7 ? '강한 상관' : Math.abs(fit.r) >= 0.3 ? '약한 상관' : '거의 무상관';

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          산점도와 회귀선 — 두 변수 관계의 「방향」과 「강도」
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          상관계수 r은 −1~+1, 회귀선은 점들과의 거리 제곱합을 최소로 만들어요.
        </p>
      </div>

      <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 p-3 text-center space-y-2">
        <MathFormula tex={'\\hat y = mx + b, \\quad r = \\frac{\\sum (x_i-\\bar x)(y_i-\\bar y)}{\\sqrt{\\sum (x_i-\\bar x)^2 \\sum (y_i-\\bar y)^2}}'} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="aspect-square rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden">
          <canvas ref={canvasRef} width={500} height={500} className="w-full h-full block" />
        </div>
        <div className="flex flex-col gap-3">
          <SliderRow label="표본 크기 n" value={n} min={5} max={80} step={1} onChange={setN} format={(v) => v.toFixed(0)} />
          <SliderRow label="실제 기울기" value={slope} min={-2} max={2} step={0.1} onChange={setSlope} />
          <SliderRow label="잡음 정도" value={noise} min={0} max={6} step={0.1} onChange={setNoise} />
          <button
            type="button"
            onClick={() => setSeed((s) => s + 1)}
            className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-semibold min-h-[44px]"
          >
            새 표본 생성
          </button>
          <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 p-3 text-sm space-y-1">
            <p>
              회귀선: ŷ = <span className="font-mono">{fit.m.toFixed(3)}</span>x +{' '}
              <span className="font-mono">{fit.b.toFixed(3)}</span>
            </p>
            <p>
              상관계수 r = <span className="font-mono">{fit.r.toFixed(3)}</span>{' '}
              <span className="text-xs text-zinc-500">({corrLabel})</span>
            </p>
            <p>
              결정계수 R² = <span className="font-mono">{(fit.r * fit.r).toFixed(3)}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function drawScatter(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  pts: Point[],
  fit: { m: number; b: number; r: number },
) {
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, W, H);

  const X_MIN = -1,
    X_MAX = 11;
  let yMin = Math.min(...pts.map((p) => p.y), 0);
  let yMax = Math.max(...pts.map((p) => p.y), 10);
  const padY = (yMax - yMin) * 0.1;
  yMin -= padY;
  yMax += padY;

  const toX = (x: number) => 40 + ((x - X_MIN) / (X_MAX - X_MIN)) * (W - 60);
  const toY = (y: number) => H - 40 - ((y - yMin) / (yMax - yMin)) * (H - 60);

  ctx.strokeStyle = '#e5e7eb';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 10; i += 2) {
    ctx.beginPath();
    ctx.moveTo(toX(i), toY(yMin));
    ctx.lineTo(toX(i), toY(yMax));
    ctx.stroke();
  }

  ctx.strokeStyle = '#1f2937';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(toX(X_MIN), toY(0));
  ctx.lineTo(toX(X_MAX), toY(0));
  ctx.moveTo(toX(0), toY(yMin));
  ctx.lineTo(toX(0), toY(yMax));
  ctx.stroke();

  // 회귀선
  ctx.strokeStyle = '#dc2626';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(toX(0), toY(fit.b));
  ctx.lineTo(toX(10), toY(fit.m * 10 + fit.b));
  ctx.stroke();

  // 점
  ctx.fillStyle = '#1e40af';
  for (const p of pts) {
    ctx.beginPath();
    ctx.arc(toX(p.x), toY(p.y), 4, 0, 2 * Math.PI);
    ctx.fill();
  }
}
