'use client';

// M-MC-02 수학과 자연 — 피보나치 수열·해바라기 나선·로그 나선.

import { useEffect, useRef, useState } from 'react';
import { MathFormula } from '@/components/primitives/MathFormula';
import { SliderRow } from '@/components/primitives/SliderRow';

const GOLDEN_ANGLE = (Math.PI * (3 - Math.sqrt(5))); // 137.5도 (라디안)

type View = 'sequence' | 'sunflower';

export function FibonacciNatureExplorer() {
  const [view, setView] = useState<View>('sunflower');
  const [n, setN] = useState(12);
  const [seeds, setSeeds] = useState(300);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const fibs = computeFibs(20);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    if (view === 'sequence') drawFibSequence(ctx, canvas.width, canvas.height, fibs.slice(0, n));
    else drawSunflower(ctx, canvas.width, canvas.height, seeds);
  }, [view, n, seeds, fibs]);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          수학과 자연 — 피보나치와 황금각
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          연속한 두 항의 비가 황금비 φ로 수렴해요. 식물의 잎차례·솔방울·해바라기에 나타나는 패턴.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setView('sequence')}
          className={`px-3 py-2 rounded-md text-sm font-semibold min-h-[44px] ${
            view === 'sequence' ? 'bg-blue-600 text-white' : 'bg-zinc-100 dark:bg-zinc-800'
          }`}
        >
          피보나치 수열
        </button>
        <button
          type="button"
          onClick={() => setView('sunflower')}
          className={`px-3 py-2 rounded-md text-sm font-semibold min-h-[44px] ${
            view === 'sunflower' ? 'bg-blue-600 text-white' : 'bg-zinc-100 dark:bg-zinc-800'
          }`}
        >
          해바라기 나선 (137.5°)
        </button>
      </div>

      <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 p-3 text-center">
        <MathFormula tex={'F_{n+1} = F_n + F_{n-1},\\quad \\frac{F_{n+1}}{F_n} \\to \\varphi'} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="aspect-square rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden">
          <canvas ref={canvasRef} width={500} height={500} className="w-full h-full block" />
        </div>
        <div className="flex flex-col gap-3">
          {view === 'sequence' ? (
            <SliderRow label="항 수 n" value={n} min={3} max={18} step={1} onChange={setN} format={(v) => v.toFixed(0)} />
          ) : (
            <SliderRow label="씨앗 개수" value={seeds} min={50} max={800} step={1} onChange={setSeeds} format={(v) => v.toFixed(0)} />
          )}
          <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 p-3 text-sm space-y-1">
            {view === 'sequence' ? (
              <>
                <p>F_{n - 1} / F_{n - 2} ≈ <span className="font-mono">{fibs[n - 1] / fibs[n - 2]}</span></p>
                <p className="text-xs text-zinc-500">피보나치: {fibs.slice(0, Math.min(10, n)).join(', ')}…</p>
              </>
            ) : (
              <>
                <p>황금각 ≈ <span className="font-mono">{(GOLDEN_ANGLE * 180 / Math.PI).toFixed(2)}°</span></p>
                <p className="text-xs text-zinc-500">매 씨앗을 137.5° 회전 + √n 거리에 배치</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function computeFibs(N: number): number[] {
  const arr: number[] = [1, 1];
  for (let i = 2; i < N; i++) arr.push(arr[i - 1] + arr[i - 2]);
  return arr;
}

function drawFibSequence(ctx: CanvasRenderingContext2D, W: number, H: number, fibs: number[]) {
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, W, H);

  // 피보나치 사각형 + 나선
  let cx = W / 2,
    cy = H / 2;
  const totalMax = Math.max(...fibs);
  const baseScale = Math.min(W, H) / (totalMax * 2.5);

  let x = cx,
    y = cy;
  let dir = 0;
  for (let i = 0; i < fibs.length; i++) {
    const s = fibs[i] * baseScale;
    let rx = x,
      ry = y;
    if (dir === 0) {
      rx = x;
      ry = y - s;
    } else if (dir === 1) {
      rx = x;
      ry = y;
    } else if (dir === 2) {
      rx = x - s;
      ry = y;
    } else {
      rx = x - s;
      ry = y - s;
    }
    ctx.fillStyle = `hsla(${i * 30}, 70%, 80%, 0.5)`;
    ctx.fillRect(rx, ry, s, s);
    ctx.strokeStyle = '#1e40af';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(rx, ry, s, s);

    // 호
    ctx.strokeStyle = '#dc2626';
    ctx.lineWidth = 2;
    ctx.beginPath();
    if (dir === 0) ctx.arc(rx, ry + s, s, 1.5 * Math.PI, 2 * Math.PI);
    else if (dir === 1) ctx.arc(rx, ry, s, 0, 0.5 * Math.PI);
    else if (dir === 2) ctx.arc(rx + s, ry, s, 0.5 * Math.PI, Math.PI);
    else ctx.arc(rx + s, ry + s, s, Math.PI, 1.5 * Math.PI);
    ctx.stroke();

    // 다음 위치
    if (dir === 0) {
      x = x + s;
      y = y - s;
    } else if (dir === 1) {
      x = x + s;
      y = y + s;
    } else if (dir === 2) {
      x = x - s;
      y = y + s;
    } else {
      x = x - s;
      y = y - s;
    }
    dir = (dir + 1) % 4;
  }
}

function drawSunflower(ctx: CanvasRenderingContext2D, W: number, H: number, n: number) {
  ctx.fillStyle = '#fffaf0';
  ctx.fillRect(0, 0, W, H);

  const cx = W / 2,
    cy = H / 2;
  const c = Math.min(W, H) / (2 * Math.sqrt(n));

  for (let i = 0; i < n; i++) {
    const angle = i * GOLDEN_ANGLE;
    const r = c * Math.sqrt(i);
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    ctx.fillStyle = `hsl(${30 + i * 0.3}, 70%, 50%)`;
    ctx.beginPath();
    ctx.arc(x, y, Math.max(2, c * 0.5), 0, 2 * Math.PI);
    ctx.fill();
  }
}
