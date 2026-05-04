'use client';

// M-GE-01 이차곡선 — 원·타원·포물선·쌍곡선.

import { useEffect, useRef, useState } from 'react';
import { MathFormula } from '@/components/primitives/MathFormula';
import { SliderRow } from '@/components/primitives/SliderRow';

type Conic = 'circle' | 'ellipse' | 'parabola' | 'hyperbola';

const CONICS: Array<{ id: Conic; label: string; tex: string }> = [
  { id: 'circle', label: '원', tex: 'x^2 + y^2 = r^2' },
  { id: 'ellipse', label: '타원', tex: '\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1' },
  { id: 'parabola', label: '포물선', tex: 'y^2 = 4px' },
  { id: 'hyperbola', label: '쌍곡선', tex: '\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1' },
];

export function ConicSectionExplorer() {
  const [conic, setConic] = useState<Conic>('ellipse');
  const [a, setA] = useState(3);
  const [b, setB] = useState(2);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    drawConic(ctx, canvas.width, canvas.height, conic, a, b);
  }, [conic, a, b]);

  const current = CONICS.find((c) => c.id === conic)!;
  const info = getInfo(conic, a, b);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          이차곡선 — 한 평면을 자르는 4가지 모양
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          원뿔을 어떻게 자르냐에 따라 원, 타원, 포물선, 쌍곡선이 나와요.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {CONICS.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setConic(c.id)}
            className={`px-3 py-2 rounded-md text-sm font-semibold min-h-[44px] transition-colors ${
              conic === c.id
                ? 'bg-blue-600 text-white'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 p-3 text-center text-lg">
        <MathFormula tex={current.tex} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="aspect-square rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden">
          <canvas ref={canvasRef} width={500} height={500} className="w-full h-full block" />
        </div>
        <div className="flex flex-col gap-3">
          <SliderRow label="a" value={a} min={0.5} max={5} step={0.1} onChange={setA} />
          {conic !== 'parabola' && conic !== 'circle' ? (
            <SliderRow label="b" value={b} min={0.5} max={5} step={0.1} onChange={setB} />
          ) : null}
          <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 p-3 text-sm space-y-1">
            {info.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function getInfo(conic: Conic, a: number, b: number): string[] {
  if (conic === 'circle') return [`반지름 r = ${a.toFixed(2)}`, `면적 = πr² ≈ ${(Math.PI * a * a).toFixed(2)}`];
  if (conic === 'ellipse') {
    const c = Math.sqrt(Math.max(0, a * a - b * b));
    return [
      `장축 = 2a = ${(2 * a).toFixed(2)}`,
      `단축 = 2b = ${(2 * b).toFixed(2)}`,
      `초점 c = √(a²−b²) = ${c.toFixed(3)}`,
    ];
  }
  if (conic === 'parabola') {
    return [`p = ${a.toFixed(2)}`, `초점 (p, 0) = (${a.toFixed(2)}, 0)`, `준선 x = −${a.toFixed(2)}`];
  }
  const c = Math.sqrt(a * a + b * b);
  return [
    `점근선 y = ±(b/a)x = ±${(b / a).toFixed(2)}x`,
    `초점 c = √(a²+b²) = ${c.toFixed(3)}`,
  ];
}

function drawConic(ctx: CanvasRenderingContext2D, W: number, H: number, conic: Conic, a: number, b: number) {
  const X_MIN = -6;
  const X_MAX = 6;
  const Y_MIN = -6;
  const Y_MAX = 6;
  const toX = (x: number) => ((x - X_MIN) / (X_MAX - X_MIN)) * W;
  const toY = (y: number) => H - ((y - Y_MIN) / (Y_MAX - Y_MIN)) * H;

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = '#e5e7eb';
  ctx.lineWidth = 1;
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

  ctx.strokeStyle = '#1e40af';
  ctx.lineWidth = 3;
  ctx.beginPath();

  if (conic === 'circle') {
    for (let theta = 0; theta <= 2 * Math.PI + 0.01; theta += 0.02) {
      const x = a * Math.cos(theta);
      const y = a * Math.sin(theta);
      if (theta === 0) ctx.moveTo(toX(x), toY(y));
      else ctx.lineTo(toX(x), toY(y));
    }
  } else if (conic === 'ellipse') {
    for (let theta = 0; theta <= 2 * Math.PI + 0.01; theta += 0.02) {
      const x = a * Math.cos(theta);
      const y = b * Math.sin(theta);
      if (theta === 0) ctx.moveTo(toX(x), toY(y));
      else ctx.lineTo(toX(x), toY(y));
    }
  } else if (conic === 'parabola') {
    let started = false;
    for (let y = -6; y <= 6; y += 0.05) {
      const x = (y * y) / (4 * a);
      if (x < X_MAX) {
        if (!started) {
          ctx.moveTo(toX(x), toY(y));
          started = true;
        } else {
          ctx.lineTo(toX(x), toY(y));
        }
      }
    }
  } else {
    // 쌍곡선 (오른쪽)
    let started = false;
    for (let theta = -1.3; theta <= 1.3; theta += 0.02) {
      const x = a / Math.cos(theta);
      const y = b * Math.tan(theta);
      if (Math.abs(x) < X_MAX && Math.abs(y) < Y_MAX) {
        if (!started) {
          ctx.moveTo(toX(x), toY(y));
          started = true;
        } else {
          ctx.lineTo(toX(x), toY(y));
        }
      } else started = false;
    }
    // 왼쪽
    started = false;
    for (let theta = -1.3; theta <= 1.3; theta += 0.02) {
      const x = -a / Math.cos(theta);
      const y = b * Math.tan(theta);
      if (Math.abs(x) < X_MAX && Math.abs(y) < Y_MAX) {
        if (!started) {
          ctx.moveTo(toX(x), toY(y));
          started = true;
        } else {
          ctx.lineTo(toX(x), toY(y));
        }
      } else started = false;
    }
  }
  ctx.stroke();

  // 점근선 (쌍곡선)
  if (conic === 'hyperbola') {
    ctx.strokeStyle = '#9ca3af';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([5, 5]);
    const slope = b / a;
    ctx.beginPath();
    ctx.moveTo(toX(X_MIN), toY(slope * X_MIN));
    ctx.lineTo(toX(X_MAX), toY(slope * X_MAX));
    ctx.moveTo(toX(X_MIN), toY(-slope * X_MIN));
    ctx.lineTo(toX(X_MAX), toY(-slope * X_MAX));
    ctx.stroke();
    ctx.setLineDash([]);
  }
}
