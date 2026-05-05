'use client';

// M-MC-01 수학과 예술 — 황금비 직사각형과 만델브로 줌.

import { useEffect, useRef, useState } from 'react';
import { MathFormula } from '@/components/primitives/MathFormula';
import { SliderRow } from '@/components/primitives/SliderRow';

type View = 'golden' | 'mandelbrot';

const PHI = (1 + Math.sqrt(5)) / 2;

export function GoldenRatioMandelbrotExplorer() {
  const [view, setView] = useState<View>('golden');
  const [n, setN] = useState(6);
  const [zoom, setZoom] = useState(1);
  const [iter, setIter] = useState(60);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    if (view === 'golden') drawGolden(ctx, canvas.width, canvas.height, n);
    else drawMandelbrot(ctx, canvas.width, canvas.height, zoom, iter);
  }, [view, n, zoom, iter]);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          수학과 예술 — 황금비와 프랙털
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          황금비 φ ≈ 1.618은 자기 닮음의 가장 단순한 예. 만델브로 집합은 자기닮음의 극단.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setView('golden')}
          className={`px-3 py-2 rounded-md text-sm font-semibold min-h-[44px] ${
            view === 'golden' ? 'bg-blue-600 text-white' : 'bg-zinc-100 dark:bg-zinc-800'
          }`}
        >
          황금비 직사각형
        </button>
        <button
          type="button"
          onClick={() => setView('mandelbrot')}
          className={`px-3 py-2 rounded-md text-sm font-semibold min-h-[44px] ${
            view === 'mandelbrot' ? 'bg-blue-600 text-white' : 'bg-zinc-100 dark:bg-zinc-800'
          }`}
        >
          만델브로
        </button>
      </div>

      <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 p-3 text-center">
        {view === 'golden' ? (
          <MathFormula tex={'\\varphi = \\frac{1+\\sqrt{5}}{2} \\approx 1.6180\\ldots'} />
        ) : (
          <MathFormula tex={'z_{n+1} = z_n^2 + c,\\quad z_0 = 0'} />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="aspect-square rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden">
          <canvas ref={canvasRef} width={500} height={500} className="w-full h-full block" />
        </div>
        <div className="flex flex-col gap-3">
          {view === 'golden' ? (
            <SliderRow label="분할 단계 n" value={n} min={1} max={9} step={1} onChange={setN} format={(v) => v.toFixed(0)} />
          ) : (
            <>
              <SliderRow label="줌 배율" value={zoom} min={0.5} max={50} step={0.1} onChange={setZoom} />
              <SliderRow label="반복 횟수" value={iter} min={20} max={200} step={1} onChange={setIter} format={(v) => v.toFixed(0)} />
            </>
          )}
          <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 p-3 text-sm space-y-1">
            {view === 'golden' ? (
              <>
                <p>φ ≈ <span className="font-mono">{PHI.toFixed(6)}</span></p>
                <p className="text-xs text-zinc-500">큰 사각형 : 작은 사각형 = (a+b) : a = a : b = φ</p>
              </>
            ) : (
              <p className="text-xs text-zinc-500">발산 속도에 따라 색을 입힌 자기닮음 패턴</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function drawGolden(ctx: CanvasRenderingContext2D, W: number, H: number, n: number) {
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, W, H);

  const margin = 30;
  let w = W - 2 * margin;
  let h = w / PHI;
  let x = margin;
  let y = (H - h) / 2;
  let dir = 0; // 0=right, 1=down, 2=left, 3=up

  for (let i = 0; i < n; i++) {
    ctx.strokeStyle = '#1e40af';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, w, h);

    // 정사각형을 잘라낸 부분
    const sq = Math.min(w, h);
    let sx = x,
      sy = y,
      sw = sq,
      sh = sq;
    if (dir === 0) {
      // right: 왼쪽 정사각형 자름
      sx = x;
      sy = y;
      sw = h;
      sh = h;
      // 다음 사각형: 오른쪽 부분
      x = x + h;
      w = w - h;
    } else if (dir === 1) {
      sx = x;
      sy = y;
      sw = w;
      sh = w;
      y = y + w;
      h = h - w;
    } else if (dir === 2) {
      sx = x + (w - h);
      sy = y;
      sw = h;
      sh = h;
      w = w - h;
    } else {
      sx = x;
      sy = y + (h - w);
      sw = w;
      sh = w;
      h = h - w;
    }

    ctx.fillStyle = `hsla(${30 + i * 25}, 70%, 80%, 0.5)`;
    ctx.fillRect(sx, sy, sw, sh);

    // 호 (피보나치 나선처럼)
    ctx.strokeStyle = '#dc2626';
    ctx.lineWidth = 2;
    ctx.beginPath();
    if (dir === 0) ctx.arc(sx + sw, sy + sh, sw, Math.PI, 1.5 * Math.PI);
    else if (dir === 1) ctx.arc(sx, sy + sh, sw, 1.5 * Math.PI, 2 * Math.PI);
    else if (dir === 2) ctx.arc(sx, sy, sw, 0, 0.5 * Math.PI);
    else ctx.arc(sx + sw, sy, sw, 0.5 * Math.PI, Math.PI);
    ctx.stroke();

    dir = (dir + 1) % 4;
    if (w <= 0 || h <= 0) break;
  }
}

function drawMandelbrot(ctx: CanvasRenderingContext2D, W: number, H: number, zoom: number, maxIter: number) {
  const img = ctx.createImageData(W, H);
  const data = img.data;
  const cxC = -0.7;
  const cyC = 0;
  const range = 3 / zoom;

  for (let py = 0; py < H; py++) {
    for (let px = 0; px < W; px++) {
      const cx = cxC + ((px - W / 2) / W) * range;
      const cy = cyC + ((py - H / 2) / H) * range;
      let zx = 0,
        zy = 0;
      let i = 0;
      while (zx * zx + zy * zy < 4 && i < maxIter) {
        const tx = zx * zx - zy * zy + cx;
        zy = 2 * zx * zy + cy;
        zx = tx;
        i++;
      }
      const idx = (py * W + px) * 4;
      if (i === maxIter) {
        data[idx] = 0;
        data[idx + 1] = 0;
        data[idx + 2] = 0;
      } else {
        const t = i / maxIter;
        data[idx] = Math.floor(9 * (1 - t) * t * t * t * 255);
        data[idx + 1] = Math.floor(15 * (1 - t) * (1 - t) * t * t * 255);
        data[idx + 2] = Math.floor(8.5 * (1 - t) * (1 - t) * (1 - t) * t * 255);
      }
      data[idx + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
}
