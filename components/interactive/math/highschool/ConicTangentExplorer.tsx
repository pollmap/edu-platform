'use client';

// M-GE-02 이차곡선 접선 — 원·타원에 대한 접선과 접점 공식.

import { useEffect, useRef, useState } from 'react';
import { MathFormula } from '@/components/primitives/MathFormula';
import { SliderRow } from '@/components/primitives/SliderRow';

type Curve = 'circle' | 'ellipse';

export function ConicTangentExplorer() {
  const [curve, setCurve] = useState<Curve>('circle');
  const [r, setR] = useState(3);
  const [a, setA] = useState(4);
  const [b, setB] = useState(2);
  const [angle, setAngle] = useState(45); // 접점 각 (도)
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const theta = (angle * Math.PI) / 180;
  // 접점
  let px = 0,
    py = 0,
    tex = '',
    info: string[] = [];
  if (curve === 'circle') {
    px = r * Math.cos(theta);
    py = r * Math.sin(theta);
    // 접선: x·px + y·py = r²
    tex = 'x_1 x + y_1 y = r^2';
    info = [
      `접점 (${px.toFixed(2)}, ${py.toFixed(2)})`,
      `접선: ${px.toFixed(2)}x + ${py.toFixed(2)}y = ${(r * r).toFixed(2)}`,
    ];
  } else {
    px = a * Math.cos(theta);
    py = b * Math.sin(theta);
    // 접선: x·px/a² + y·py/b² = 1
    tex = '\\frac{x_1 x}{a^2} + \\frac{y_1 y}{b^2} = 1';
    info = [
      `접점 (${px.toFixed(2)}, ${py.toFixed(2)})`,
      `접선: ${(px / (a * a)).toFixed(3)}x + ${(py / (b * b)).toFixed(3)}y = 1`,
    ];
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    drawCT(ctx, canvas.width, canvas.height, curve, r, a, b, px, py);
  }, [curve, r, a, b, px, py]);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          이차곡선의 접선 — 접점 공식 한 줄
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          접점 (x₁, y₁)을 알면 접선 방정식이 곧장 나와요.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setCurve('circle')}
          className={`px-3 py-2 rounded-md text-sm font-semibold min-h-[44px] ${
            curve === 'circle' ? 'bg-blue-600 text-white' : 'bg-zinc-100 dark:bg-zinc-800'
          }`}
        >
          원
        </button>
        <button
          type="button"
          onClick={() => setCurve('ellipse')}
          className={`px-3 py-2 rounded-md text-sm font-semibold min-h-[44px] ${
            curve === 'ellipse' ? 'bg-blue-600 text-white' : 'bg-zinc-100 dark:bg-zinc-800'
          }`}
        >
          타원
        </button>
      </div>

      <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 p-3 text-center">
        <MathFormula tex={tex} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="aspect-square rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden">
          <canvas ref={canvasRef} width={500} height={500} className="w-full h-full block" />
        </div>
        <div className="flex flex-col gap-3">
          {curve === 'circle' ? (
            <SliderRow label="반지름 r" value={r} min={1} max={5} step={0.1} onChange={setR} />
          ) : (
            <>
              <SliderRow label="장축 a" value={a} min={1.5} max={6} step={0.1} onChange={setA} />
              <SliderRow label="단축 b" value={b} min={1} max={4} step={0.1} onChange={setB} />
            </>
          )}
          <SliderRow
            label="접점 각도"
            value={angle}
            min={0}
            max={360}
            step={1}
            onChange={setAngle}
            format={(v) => v.toFixed(0)}
            unit="°"
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

function drawCT(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  curve: Curve,
  r: number,
  a: number,
  b: number,
  px: number,
  py: number,
) {
  const X_MIN = -7,
    X_MAX = 7;

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, W, H);

  const toX = (x: number) => ((x - X_MIN) / (X_MAX - X_MIN)) * W;
  const toY = (y: number) => H - ((y - X_MIN) / (X_MAX - X_MIN)) * H;

  ctx.strokeStyle = '#e5e7eb';
  for (let i = X_MIN; i <= X_MAX; i++) {
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
  ctx.moveTo(0, toY(0));
  ctx.lineTo(W, toY(0));
  ctx.moveTo(toX(0), 0);
  ctx.lineTo(toX(0), H);
  ctx.stroke();

  // 곡선
  ctx.strokeStyle = '#1e40af';
  ctx.lineWidth = 3;
  ctx.beginPath();
  if (curve === 'circle') {
    for (let t = 0; t <= 2 * Math.PI + 0.01; t += 0.02) {
      const x = r * Math.cos(t);
      const y = r * Math.sin(t);
      if (t === 0) ctx.moveTo(toX(x), toY(y));
      else ctx.lineTo(toX(x), toY(y));
    }
  } else {
    for (let t = 0; t <= 2 * Math.PI + 0.01; t += 0.02) {
      const x = a * Math.cos(t);
      const y = b * Math.sin(t);
      if (t === 0) ctx.moveTo(toX(x), toY(y));
      else ctx.lineTo(toX(x), toY(y));
    }
  }
  ctx.stroke();

  // 접선 (수치적)
  let mx = 0,
    my = 0; // 법선 (gradient) 방향
  if (curve === 'circle') {
    mx = px;
    my = py;
  } else {
    mx = px / (a * a);
    my = py / (b * b);
  }
  // 접선 방향 벡터 = (−my, mx)
  ctx.strokeStyle = '#dc2626';
  ctx.lineWidth = 2.5;
  ctx.setLineDash([6, 4]);
  ctx.beginPath();
  const t1 = -10,
    t2 = 10;
  ctx.moveTo(toX(px - my * t1), toY(py + mx * t1));
  ctx.lineTo(toX(px - my * t2), toY(py + mx * t2));
  ctx.stroke();
  ctx.setLineDash([]);

  // 접점
  ctx.fillStyle = '#dc2626';
  ctx.beginPath();
  ctx.arc(toX(px), toY(py), 7, 0, 2 * Math.PI);
  ctx.fill();
}
