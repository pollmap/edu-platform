'use client';

// M-AL-02 지수·로그 함수 — y = a^x 와 y = log_a x 그래프 (a 슬라이더, 역함수 대칭).

import { useEffect, useRef, useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';

const X_MIN = -4;
const X_MAX = 4;
const Y_MIN = -4;
const Y_MAX = 4;

export function ExponentLogFunctionExplorer() {
  const [a, setA] = useState(2);
  const [showLog, setShowLog] = useState(true);
  const [showLine, setShowLine] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    drawExponentLog(ctx, canvas.width, canvas.height, a, showLog, showLine);
  }, [a, showLog, showLine]);

  const isDecay = a < 1;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          지수·로그 함수 — 역함수는 y = x 대칭
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          a 값을 바꾸면 두 그래프가 어떻게 같이 변하는지 보세요.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="aspect-square rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden">
          <canvas ref={canvasRef} width={500} height={500} className="w-full h-full block" />
        </div>
        <div className="flex flex-col gap-4">
          <SliderRow label="밑 a" value={a} min={0.3} max={5} step={0.1} onChange={setA} />
          <div className="flex flex-col gap-2 text-sm">
            <label className="flex items-center gap-2 cursor-pointer min-h-[44px]">
              <input
                type="checkbox"
                checked={showLog}
                onChange={(e) => setShowLog(e.target.checked)}
                className="w-4 h-4 accent-purple-600"
              />
              <span className="text-purple-700 dark:text-purple-400 font-medium">로그함수 y = log_a x</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer min-h-[44px]">
              <input
                type="checkbox"
                checked={showLine}
                onChange={(e) => setShowLine(e.target.checked)}
                className="w-4 h-4 accent-amber-500"
              />
              <span className="text-amber-700 dark:text-amber-400 font-medium">대칭축 y = x</span>
            </label>
          </div>
          <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 p-3 text-sm space-y-1.5">
            <p>
              <strong>{isDecay ? '감소 (0 < a < 1)' : a > 1 ? '증가 (a > 1)' : 'a = 1 (수평선)'}</strong>
            </p>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              지수함수는 항상 (0, 1)을 지나고, 로그함수는 항상 (1, 0)을 지나요. 두 그래프는 y = x에
              대해 거울처럼 대칭이에요 — 역함수의 정의 그 자체.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function drawExponentLog(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  a: number,
  showLog: boolean,
  showLine: boolean,
) {
  const toX = (x: number) => ((x - X_MIN) / (X_MAX - X_MIN)) * W;
  const toY = (y: number) => H - ((y - Y_MIN) / (Y_MAX - Y_MIN)) * H;

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, W, H);

  // 격자
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

  // 축
  ctx.strokeStyle = '#1f2937';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, toY(0));
  ctx.lineTo(W, toY(0));
  ctx.moveTo(toX(0), 0);
  ctx.lineTo(toX(0), H);
  ctx.stroke();

  // y = x
  if (showLine) {
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([6, 4]);
    ctx.beginPath();
    ctx.moveTo(toX(X_MIN), toY(X_MIN));
    ctx.lineTo(toX(X_MAX), toY(X_MAX));
    ctx.stroke();
    ctx.setLineDash([]);
  }

  // 지수함수 y = a^x
  if (a > 0 && Math.abs(a - 1) > 0.01) {
    ctx.strokeStyle = '#1e40af';
    ctx.lineWidth = 3;
    ctx.beginPath();
    let started = false;
    for (let px = 0; px <= W; px++) {
      const x = X_MIN + (px / W) * (X_MAX - X_MIN);
      const y = Math.pow(a, x);
      if (Number.isFinite(y) && y > Y_MIN && y < Y_MAX) {
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

    if (showLog) {
      ctx.strokeStyle = '#7e22ce';
      ctx.lineWidth = 3;
      ctx.beginPath();
      started = false;
      for (let px = 0; px <= W; px++) {
        const x = X_MIN + (px / W) * (X_MAX - X_MIN);
        if (x <= 0) continue;
        const y = Math.log(x) / Math.log(a);
        if (Number.isFinite(y) && y > Y_MIN && y < Y_MAX) {
          const cy = toY(y);
          if (!started) {
            ctx.moveTo(toX(x), cy);
            started = true;
          } else {
            ctx.lineTo(toX(x), cy);
          }
        } else {
          started = false;
        }
      }
      ctx.stroke();
    }
  }
}
