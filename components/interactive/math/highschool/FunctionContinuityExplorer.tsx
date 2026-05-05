'use client';

// M-CA1-02 함수의 연속 — 점프·구멍·발산 불연속 시각화.

import { useEffect, useRef, useState } from 'react';
import { MathFormula } from '@/components/primitives/MathFormula';
import { SliderRow } from '@/components/primitives/SliderRow';

type Kind = 'continuous' | 'removable' | 'jump' | 'infinite';

const KINDS: Array<{ id: Kind; label: string; tex: string; desc: string }> = [
  { id: 'continuous', label: '연속', tex: 'f(x) = x^2 + 1', desc: '극한 = 함숫값 = 좌극한 = 우극한' },
  { id: 'removable', label: '구멍 (제거가능)', tex: 'f(x) = \\frac{x^2-1}{x-1}', desc: '극한은 있지만 함숫값이 다르거나 미정의' },
  { id: 'jump', label: '점프', tex: 'f(x) = \\begin{cases} x & x<a \\\\ x+1 & x \\ge a \\end{cases}', desc: '좌극한 ≠ 우극한' },
  { id: 'infinite', label: '발산', tex: 'f(x) = \\frac{1}{x-a}', desc: '극한값이 ±∞ (점근선)' },
];

export function FunctionContinuityExplorer() {
  const [kind, setKind] = useState<Kind>('jump');
  const [a, setA] = useState(2);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    drawCurve(ctx, canvas.width, canvas.height, kind, a);
  }, [kind, a]);

  const current = KINDS.find((k) => k.id === kind)!;

  const limitLeft = computeLeftLimit(kind, a);
  const limitRight = computeRightLimit(kind, a);
  const value = computeValue(kind, a);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          함수의 연속 — 「펜을 떼지 않고 그릴 수 있나」
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          연속 = (1) 함숫값 존재, (2) 극한 존재, (3) 둘이 같음 — 세 조건 모두 만족.
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

      <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 p-3 text-center space-y-1">
        <MathFormula tex={current.tex} />
        <p className="text-xs text-zinc-500 mt-1">{current.desc}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="aspect-square rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden">
          <canvas ref={canvasRef} width={500} height={500} className="w-full h-full block" />
        </div>
        <div className="flex flex-col gap-3">
          <SliderRow label="검사점 a" value={a} min={-3} max={3} step={0.1} onChange={setA} />
          <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 p-3 text-sm space-y-1">
            <p>좌극한 lim_(x→a−) f(x) = <span className="font-mono">{fmt(limitLeft)}</span></p>
            <p>우극한 lim_(x→a+) f(x) = <span className="font-mono">{fmt(limitRight)}</span></p>
            <p>함숫값 f(a) = <span className="font-mono">{fmt(value)}</span></p>
            <p className="pt-2 font-semibold">
              {isContinuousAt(limitLeft, limitRight, value) ? '✓ a에서 연속' : '✗ a에서 불연속'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function fmt(v: number | null): string {
  if (v === null) return '미정의';
  if (!isFinite(v)) return v > 0 ? '+∞' : '−∞';
  return v.toFixed(2);
}

function isContinuousAt(L: number | null, R: number | null, V: number | null): boolean {
  if (L === null || R === null || V === null) return false;
  if (!isFinite(L) || !isFinite(R) || !isFinite(V)) return false;
  return Math.abs(L - R) < 1e-3 && Math.abs(L - V) < 1e-3;
}

function computeLeftLimit(kind: Kind, a: number): number | null {
  if (kind === 'continuous') return a * a + 1;
  if (kind === 'removable') return a + 1; // (x²−1)/(x−1) → x+1
  if (kind === 'jump') return a;
  return Number.NEGATIVE_INFINITY;
}

function computeRightLimit(kind: Kind, a: number): number | null {
  if (kind === 'continuous') return a * a + 1;
  if (kind === 'removable') return a + 1;
  if (kind === 'jump') return a + 1;
  return Number.POSITIVE_INFINITY;
}

function computeValue(kind: Kind, a: number): number | null {
  if (kind === 'continuous') return a * a + 1;
  if (kind === 'removable') return null; // x=1에서 미정의 (실제 a 위치에 따라)
  if (kind === 'jump') return a + 1;
  return null;
}

function drawCurve(ctx: CanvasRenderingContext2D, W: number, H: number, kind: Kind, a: number) {
  const X_MIN = -5,
    X_MAX = 5;
  const Y_MIN = -5,
    Y_MAX = 8;

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, W, H);

  const toX = (x: number) => ((x - X_MIN) / (X_MAX - X_MIN)) * W;
  const toY = (y: number) => H - ((y - Y_MIN) / (Y_MAX - Y_MIN)) * H;

  ctx.strokeStyle = '#e5e7eb';
  for (let i = X_MIN; i <= X_MAX; i++) {
    ctx.beginPath();
    ctx.moveTo(toX(i), 0);
    ctx.lineTo(toX(i), H);
    ctx.stroke();
  }
  for (let j = Y_MIN; j <= Y_MAX; j++) {
    ctx.beginPath();
    ctx.moveTo(0, toY(j));
    ctx.lineTo(W, toY(j));
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

  if (kind === 'continuous') {
    let started = false;
    for (let x = X_MIN; x <= X_MAX; x += 0.05) {
      const y = x * x + 1;
      if (!started) {
        ctx.moveTo(toX(x), toY(y));
        started = true;
      } else {
        ctx.lineTo(toX(x), toY(y));
      }
    }
    ctx.stroke();
  } else if (kind === 'removable') {
    let started = false;
    for (let x = X_MIN; x <= X_MAX; x += 0.05) {
      if (Math.abs(x - 1) < 0.04) continue;
      const y = x + 1;
      if (!started) {
        ctx.moveTo(toX(x), toY(y));
        started = true;
      } else {
        ctx.lineTo(toX(x), toY(y));
      }
    }
    ctx.stroke();
    // hole
    ctx.beginPath();
    ctx.arc(toX(1), toY(2), 6, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.stroke();
  } else if (kind === 'jump') {
    // x<a: y=x, x>=a: y=x+1
    let started = false;
    for (let x = X_MIN; x < a; x += 0.05) {
      const y = x;
      if (!started) {
        ctx.moveTo(toX(x), toY(y));
        started = true;
      } else {
        ctx.lineTo(toX(x), toY(y));
      }
    }
    ctx.stroke();
    ctx.beginPath();
    started = false;
    for (let x = a; x <= X_MAX; x += 0.05) {
      const y = x + 1;
      if (!started) {
        ctx.moveTo(toX(x), toY(y));
        started = true;
      } else {
        ctx.lineTo(toX(x), toY(y));
      }
    }
    ctx.stroke();
    // open dot at left, closed at right
    ctx.beginPath();
    ctx.arc(toX(a), toY(a), 5, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(toX(a), toY(a + 1), 5, 0, 2 * Math.PI);
    ctx.fillStyle = '#1e40af';
    ctx.fill();
  } else {
    // infinite: 1/(x-a)
    let started = false;
    for (let x = X_MIN; x < a - 0.05; x += 0.02) {
      const y = 1 / (x - a);
      if (Math.abs(y) < Y_MAX) {
        if (!started) {
          ctx.moveTo(toX(x), toY(y));
          started = true;
        } else {
          ctx.lineTo(toX(x), toY(y));
        }
      } else started = false;
    }
    ctx.stroke();
    ctx.beginPath();
    started = false;
    for (let x = a + 0.05; x <= X_MAX; x += 0.02) {
      const y = 1 / (x - a);
      if (Math.abs(y) < Y_MAX) {
        if (!started) {
          ctx.moveTo(toX(x), toY(y));
          started = true;
        } else {
          ctx.lineTo(toX(x), toY(y));
        }
      } else started = false;
    }
    ctx.stroke();
    // 점근선
    ctx.strokeStyle = '#9ca3af';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(toX(a), 0);
    ctx.lineTo(toX(a), H);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  // 검사선
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([3, 3]);
  ctx.beginPath();
  ctx.moveTo(toX(a), 0);
  ctx.lineTo(toX(a), H);
  ctx.stroke();
  ctx.setLineDash([]);
}
