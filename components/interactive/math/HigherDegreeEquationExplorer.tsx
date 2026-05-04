'use client';

// M-CM1-07 여러 가지 방정식·부등식 — 삼차방정식의 그래프와 실근 위치 시각화.
// 슬라이더로 a, b, c, d 를 조절. y = ax³ + bx² + cx + d 그래프 + 실근 표시 + 부등식 영역 (y < 0 / y > 0) 색칠.

import { useEffect, useMemo, useRef, useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';
import { PresetBar } from '@/components/primitives/PresetBar';

interface Coefs {
  a: number;
  b: number;
  c: number;
  d: number;
}

const PRESETS = [
  { label: '실근 3개', value: { a: 1, b: 0, c: -3, d: 0 } },
  { label: '실근 1개', value: { a: 1, b: 0, c: 0, d: -2 } },
  { label: '인수형 (x−1)(x−2)(x+3)', value: { a: 1, b: 0, c: -7, d: 6 } },
  { label: '(x+1)³', value: { a: 1, b: 3, c: 3, d: 1 } },
];

const X_MIN = -5;
const X_MAX = 5;
const Y_MIN = -10;
const Y_MAX = 10;

function f(c: Coefs, x: number): number {
  return c.a * x ** 3 + c.b * x ** 2 + c.c * x + c.d;
}

function findRoots(c: Coefs): number[] {
  // 단순 수치 탐색: −5..5 를 작은 간격으로 부호 변화 찾기
  const roots: number[] = [];
  const step = 0.01;
  let prevX = X_MIN;
  let prevY = f(c, X_MIN);
  for (let x = X_MIN + step; x <= X_MAX; x += step) {
    const y = f(c, x);
    if (Math.abs(y) < 1e-3) {
      if (!roots.some((r) => Math.abs(r - x) < 0.05)) roots.push(Number(x.toFixed(2)));
    } else if (prevY * y < 0) {
      // 이등분으로 정밀화
      let lo = prevX;
      let hi = x;
      for (let i = 0; i < 30; i++) {
        const mid = (lo + hi) / 2;
        const fm = f(c, mid);
        if (prevY * fm < 0) hi = mid;
        else lo = mid;
      }
      const mid = (lo + hi) / 2;
      if (!roots.some((r) => Math.abs(r - mid) < 0.05)) roots.push(Number(mid.toFixed(2)));
    }
    prevX = x;
    prevY = y;
  }
  return roots;
}

export function HigherDegreeEquationExplorer() {
  const [coefs, setCoefs] = useState<Coefs>(PRESETS[0].value);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const roots = useMemo(() => findRoots(coefs), [coefs]);

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

    // 그리드
    ctx.strokeStyle = 'rgba(127,127,127,0.2)';
    ctx.lineWidth = 1;
    for (let g = X_MIN; g <= X_MAX; g++) {
      ctx.beginPath();
      ctx.moveTo(xToPx(g), 0);
      ctx.lineTo(xToPx(g), H);
      ctx.stroke();
    }
    for (let g = Y_MIN; g <= Y_MAX; g += 2) {
      ctx.beginPath();
      ctx.moveTo(0, yToPx(g));
      ctx.lineTo(W, yToPx(g));
      ctx.stroke();
    }
    // 축
    ctx.strokeStyle = 'rgba(127,127,127,0.7)';
    ctx.beginPath();
    ctx.moveTo(0, yToPx(0));
    ctx.lineTo(W, yToPx(0));
    ctx.moveTo(xToPx(0), 0);
    ctx.lineTo(xToPx(0), H);
    ctx.stroke();

    // y > 0 / y < 0 영역 미세 음영 (부등식)
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(W, 0);
    ctx.lineTo(W, yToPx(0));
    ctx.lineTo(0, yToPx(0));
    ctx.closePath();
    ctx.fillStyle = 'rgba(34,197,94,0.05)'; // y>0 초록
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(0, yToPx(0));
    ctx.lineTo(W, yToPx(0));
    ctx.lineTo(W, H);
    ctx.lineTo(0, H);
    ctx.closePath();
    ctx.fillStyle = 'rgba(239,68,68,0.05)'; // y<0 빨강
    ctx.fill();

    // 곡선
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 2;
    ctx.beginPath();
    let started = false;
    for (let px = 0; px <= W; px += 1) {
      const x = X_MIN + (px / W) * (X_MAX - X_MIN);
      const y = f(coefs, x);
      if (y > Y_MAX * 1.5 || y < Y_MIN * 1.5) {
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

    // 실근 점
    for (const r of roots) {
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.arc(xToPx(r), yToPx(0), 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [coefs, roots]);

  return (
    <div className="space-y-4">
      <PresetBar
        presets={PRESETS}
        onSelect={(v) => setCoefs({ ...v, a: v.a === 0 ? 1 : v.a })}
        onReset={() => setCoefs(PRESETS[0].value)}
      />
      <div className="grid gap-2 md:grid-cols-2">
        <SliderRow label="x³ 계수 a" value={coefs.a} min={-2} max={2} step={1} onChange={(v) => setCoefs({ ...coefs, a: v === 0 ? 1 : v })} format={(v) => v.toFixed(0)} />
        <SliderRow label="x² 계수 b" value={coefs.b} min={-5} max={5} step={1} onChange={(v) => setCoefs({ ...coefs, b: v })} format={(v) => v.toFixed(0)} />
        <SliderRow label="x 계수 c" value={coefs.c} min={-9} max={9} step={1} onChange={(v) => setCoefs({ ...coefs, c: v })} format={(v) => v.toFixed(0)} />
        <SliderRow label="상수항 d" value={coefs.d} min={-9} max={9} step={1} onChange={(v) => setCoefs({ ...coefs, d: v })} format={(v) => v.toFixed(0)} />
      </div>

      <canvas ref={canvasRef} width={520} height={340} className="w-full max-w-xl mx-auto rounded-lg bg-zinc-50 dark:bg-zinc-900" aria-label="삼차함수 그래프" />

      <div className="grid gap-2 md:grid-cols-2 text-sm">
        <div className="rounded-md bg-blue-50 dark:bg-blue-950/40 p-3">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">실근 (x축과 만나는 점)</div>
          <div className="font-mono mt-1 text-blue-700 dark:text-blue-300">
            {roots.length === 0 ? '범위 내 실근 없음' : roots.map((r) => r.toFixed(2)).join(', ')}
          </div>
        </div>
        <div className="rounded-md bg-emerald-50 dark:bg-emerald-950/40 p-3">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">부등식 해 (y &lt; 0)</div>
          <div className="font-mono mt-1 text-emerald-700 dark:text-emerald-300">
            그래프가 x축 아래에 있는 x 의 범위
          </div>
        </div>
      </div>
      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        ※ 삼·사차 부등식의 해는 결국 그래프가 0보다 큰지/작은지의 영역. 실근에서 부호가 바뀌는지 보세요.
      </p>
    </div>
  );
}
