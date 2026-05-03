'use client';

import { useEffect, useRef, useState } from 'react';
import { MathFormula } from '@/components/primitives/MathFormula';

const X_MIN = -10;
const X_MAX = 10;
const Y_MIN = -10;
const Y_MAX = 10;

interface Coefs {
  a: number;
  b: number;
  c: number;
}

const PRESETS: Array<{ label: string; coefs: Coefs }> = [
  { label: 'y = x²', coefs: { a: 1, b: 0, c: 0 } },
  { label: 'y = -x²', coefs: { a: -1, b: 0, c: 0 } },
  { label: '근 ±2', coefs: { a: 1, b: 0, c: -4 } },
  { label: '표준형', coefs: { a: 2, b: -4, c: 1 } },
  { label: '완만', coefs: { a: 0.3, b: 0, c: 0 } },
];

export function QuadraticFunctionExplorer() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    drawGraph(ctx, canvas.width, canvas.height, a, b, c);
  }, [a, b, c]);

  const isParabola = Math.abs(a) > 0.01;
  const vertexX = isParabola ? -b / (2 * a) : null;
  const vertexY = vertexX !== null ? a * vertexX * vertexX + b * vertexX + c : null;
  const D = b * b - 4 * a * c;

  const discriminantText = !isParabola
    ? '이차식이 아님 (a = 0)'
    : D > 0.001
      ? `D = ${D.toFixed(2)} > 0 (x축과 두 점에서 만남)`
      : D < -0.001
        ? `D = ${D.toFixed(2)} < 0 (x축과 만나지 않음)`
        : `D = ${D.toFixed(2)} = 0 (x축에 접함)`;

  const formula = formatFormula(a, b, c);

  const reset = () => {
    setA(1);
    setB(0);
    setC(0);
  };
  const applyPreset = (p: Coefs) => {
    setA(p.a);
    setB(p.b);
    setC(p.c);
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border border-zinc-200">
      <h2 className="text-2xl font-bold text-blue-700 mb-1">이차함수 탐험기</h2>
      <p className="text-sm text-zinc-500 mb-6">
        중3 · 변화와 관계 · M9-CR-03 — 슬라이더로 a, b, c가 그래프에 어떻게 영향을 주는지 확인해 보세요
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 좌측: 그래프 */}
        <div className="flex flex-col gap-4">
          <div className="rounded-xl bg-blue-50 p-4 text-center text-xl min-h-[60px] flex items-center justify-center">
            <MathFormula tex={formula} />
          </div>
          <div className="aspect-square rounded-xl border border-zinc-200 bg-white overflow-hidden">
            <canvas ref={canvasRef} width={500} height={500} className="w-full h-full block" />
          </div>
          <div className="bg-amber-50 border-l-4 border-amber-500 rounded p-3 text-sm space-y-2">
            <div>
              <div className="font-bold text-amber-900">꼭짓점 좌표</div>
              <div className="font-mono text-zinc-800">
                {vertexX !== null && vertexY !== null
                  ? `(${vertexX.toFixed(2)}, ${vertexY.toFixed(2)})`
                  : '없음 (직선)'}
              </div>
            </div>
            <div>
              <div className="font-bold text-amber-900">대칭축</div>
              <div className="font-mono text-zinc-800">
                {vertexX !== null ? `x = ${vertexX.toFixed(2)}` : '없음'}
              </div>
            </div>
            <div>
              <div className="font-bold text-amber-900">판별식 D = b² − 4ac</div>
              <div className="font-mono text-zinc-800">{discriminantText}</div>
            </div>
          </div>
        </div>

        {/* 우측: 컨트롤 */}
        <div className="flex flex-col gap-4">
          <Slider label="a (이차항 계수)" value={a} min={-3} max={3} step={0.1} onChange={setA} />
          <Slider label="b (일차항 계수)" value={b} min={-5} max={5} step={0.1} onChange={setB} />
          <Slider label="c (상수항)" value={c} min={-5} max={5} step={0.1} onChange={setC} />

          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() => applyPreset(p.coefs)}
                className="px-3 py-2 border border-zinc-300 rounded-md bg-white text-sm hover:bg-zinc-50 hover:border-blue-700 hover:text-blue-700 transition-colors min-h-[44px]"
              >
                {p.label}
              </button>
            ))}
          </div>

          <button
            onClick={reset}
            className="self-end px-4 py-2 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 transition-colors min-h-[44px]"
          >
            처음으로
          </button>

          <details className="bg-zinc-50 rounded-xl p-4 cursor-pointer">
            <summary className="font-semibold text-blue-700 cursor-pointer">왜 이렇게 되는가?</summary>
            <div className="mt-3 space-y-2 text-sm text-zinc-700 cursor-text">
              <p>
                <strong className="text-zinc-900">a의 역할:</strong> 그래프의 모양·방향을 결정. a &gt; 0이면
                아래로 볼록(U), a &lt; 0이면 위로 볼록(∩). |a|가 클수록 폭이 좁아져요.
              </p>
              <p>
                <strong className="text-zinc-900">b의 역할:</strong> 꼭짓점의 x좌표를 좌우로 이동.
                꼭짓점 x = −b/(2a).
              </p>
              <p>
                <strong className="text-zinc-900">c의 역할:</strong> y축과 만나는 점. x = 0 대입 → y = c.
              </p>
              <p>
                <strong className="text-zinc-900">판별식 D:</strong> x축과 몇 번 만나는지 알려줘요. D &gt; 0
                두 점, D = 0 한 점(접함), D &lt; 0 만나지 않음.
              </p>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}

function Slider({ label, value, min, max, step, onChange }: SliderProps) {
  return (
    <div className="bg-zinc-50 p-3 rounded-lg">
      <div className="flex justify-between mb-2 text-sm">
        <span className="font-bold text-blue-700">{label}</span>
        <span className="font-mono text-red-500 font-semibold">{value.toFixed(2)}</span>
      </div>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-3 cursor-pointer"
        aria-label={label}
      />
    </div>
  );
}

function trim(n: number): string {
  const s = n.toFixed(2).replace(/\.?0+$/, '');
  return s.length === 0 ? '0' : s;
}

function formatFormula(a: number, b: number, c: number): string {
  const parts: string[] = [];
  if (Math.abs(a) > 0.01) {
    const aStr = a === 1 ? '' : a === -1 ? '-' : trim(a);
    parts.push(`${aStr}x^2`);
  }
  if (Math.abs(b) > 0.01) {
    const sign = b > 0 ? (parts.length ? '+ ' : '') : '- ';
    const bAbs = Math.abs(b);
    const bStr = bAbs === 1 ? '' : trim(bAbs);
    parts.push(`${sign}${bStr}x`);
  }
  if (Math.abs(c) > 0.01) {
    const sign = c > 0 ? (parts.length ? '+ ' : '') : '- ';
    parts.push(`${sign}${trim(Math.abs(c))}`);
  }
  if (parts.length === 0) parts.push('0');
  return `y = ${parts.join(' ')}`;
}

function drawGraph(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  a: number,
  b: number,
  c: number,
) {
  const toX = (x: number) => ((x - X_MIN) / (X_MAX - X_MIN)) * W;
  const toY = (y: number) => H - ((y - Y_MIN) / (Y_MAX - Y_MIN)) * H;

  ctx.clearRect(0, 0, W, H);

  // 격자
  ctx.strokeStyle = '#e5e7eb';
  ctx.lineWidth = 1;
  for (let i = X_MIN; i <= X_MAX; i++) {
    ctx.beginPath();
    ctx.moveTo(toX(i), 0);
    ctx.lineTo(toX(i), H);
    ctx.stroke();
  }
  for (let i = Y_MIN; i <= Y_MAX; i++) {
    ctx.beginPath();
    ctx.moveTo(0, toY(i));
    ctx.lineTo(W, toY(i));
    ctx.stroke();
  }

  // 축
  ctx.strokeStyle = '#1f2937';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, toY(0));
  ctx.lineTo(W, toY(0));
  ctx.moveTo(toX(0), 0);
  ctx.lineTo(toX(0), H);
  ctx.stroke();

  // 축 레이블
  ctx.fillStyle = '#6b7280';
  ctx.font = '12px sans-serif';
  for (let i = X_MIN + 1; i <= X_MAX - 1; i++) {
    if (i === 0) continue;
    ctx.fillText(String(i), toX(i) - 4, toY(0) + 14);
  }
  for (let i = Y_MIN + 1; i <= Y_MAX - 1; i++) {
    if (i === 0) continue;
    ctx.fillText(String(i), toX(0) + 4, toY(i) + 4);
  }

  // 대칭축
  if (Math.abs(a) > 0.01) {
    const axisX = -b / (2 * a);
    if (axisX > X_MIN && axisX < X_MAX) {
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(toX(axisX), 0);
      ctx.lineTo(toX(axisX), H);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }

  // 곡선
  ctx.strokeStyle = '#1e40af';
  ctx.lineWidth = 3;
  ctx.beginPath();
  let started = false;
  for (let px = 0; px <= W; px += 1) {
    const x = X_MIN + (px / W) * (X_MAX - X_MIN);
    const y = a * x * x + b * x + c;
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

  // 꼭짓점 (빨간 점)
  if (Math.abs(a) > 0.01) {
    const vx = -b / (2 * a);
    const vy = a * vx * vx + b * vx + c;
    if (vx > X_MIN && vx < X_MAX && vy > Y_MIN && vy < Y_MAX) {
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(toX(vx), toY(vy), 6, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  // y절편 (초록 점)
  if (c > Y_MIN && c < Y_MAX) {
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(toX(0), toY(c), 5, 0, 2 * Math.PI);
    ctx.fill();
  }
}
