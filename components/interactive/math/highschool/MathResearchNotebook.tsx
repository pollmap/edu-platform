'use client';

// M-MR-01 수학과제 탐구 — 자유 노트북: 함수 그리기 + 메모.

import { useEffect, useRef, useState } from 'react';

type Preset = 'sin' | 'parabola' | 'cubic' | 'reciprocal' | 'gauss';

const PRESETS: Record<Preset, { label: string; fn: (x: number, k: number) => number }> = {
  sin: { label: 'sin(kx)', fn: (x, k) => Math.sin(k * x) },
  parabola: { label: 'kx²', fn: (x, k) => k * x * x },
  cubic: { label: 'x³ − kx', fn: (x, k) => x * x * x - k * x },
  reciprocal: { label: 'k/x', fn: (x, k) => (Math.abs(x) < 0.05 ? NaN : k / x) },
  gauss: { label: 'e^(−kx²)', fn: (x, k) => Math.exp(-k * x * x) },
};

export function MathResearchNotebook() {
  const [preset, setPreset] = useState<Preset>('sin');
  const [k, setK] = useState(1);
  const [hypothesis, setHypothesis] = useState('이 함수는 ...에서 ...한 성질을 가진다.');
  const [observation, setObservation] = useState('관찰: 슬라이더를 움직여 보면 ...');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    drawFunction(ctx, canvas.width, canvas.height, PRESETS[preset].fn, k);
  }, [preset, k]);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          수학 과제 탐구 노트북
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          가설 → 시각화 → 관찰 → 일반화. 4단계 사이클로 작은 연구를 수행해 보세요.
        </p>
      </div>

      <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 p-3 text-sm">
        <p className="font-semibold mb-1">탐구 가설</p>
        <textarea
          className="w-full bg-white dark:bg-zinc-800 rounded-md p-2 text-sm border border-blue-200 dark:border-blue-800 min-h-[60px]"
          value={hypothesis}
          onChange={(e) => setHypothesis(e.target.value)}
          aria-label="가설"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {(Object.keys(PRESETS) as Preset[]).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPreset(p)}
            className={`px-3 py-2 rounded-md text-xs font-semibold min-h-[44px] ${
              preset === p ? 'bg-blue-600 text-white' : 'bg-zinc-100 dark:bg-zinc-800'
            }`}
          >
            {PRESETS[p].label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="aspect-square rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden">
          <canvas ref={canvasRef} width={500} height={500} className="w-full h-full block" />
        </div>
        <div className="flex flex-col gap-3">
          <div className="bg-zinc-50 dark:bg-zinc-800 p-3 rounded-lg">
            <div className="flex justify-between mb-2 text-sm">
              <span className="font-bold text-blue-700 dark:text-blue-400">매개변수 k</span>
              <span className="font-mono text-red-500 font-semibold">{k.toFixed(2)}</span>
            </div>
            <input
              type="range"
              value={k}
              min={-3}
              max={3}
              step={0.05}
              onChange={(e) => setK(parseFloat(e.target.value))}
              className="w-full h-3 cursor-pointer accent-blue-600"
              aria-label="k"
            />
          </div>
          <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 p-3 text-sm">
            <p className="font-semibold mb-1">관찰 노트</p>
            <textarea
              className="w-full bg-white dark:bg-zinc-800 rounded-md p-2 text-sm border border-amber-200 dark:border-amber-800 min-h-[100px]"
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
              aria-label="관찰"
            />
          </div>
          <div className="text-xs text-zinc-500">
            팁: k의 부호·크기·임계값을 바꾸며 그래프 변화 → 일반화 가능한 패턴 찾기.
          </div>
        </div>
      </div>
    </div>
  );
}

function drawFunction(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  fn: (x: number, k: number) => number,
  k: number,
) {
  const X_MIN = -5,
    X_MAX = 5;
  const Y_MIN = -5,
    Y_MAX = 5;

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
  let started = false;
  for (let x = X_MIN; x <= X_MAX; x += 0.02) {
    const y = fn(x, k);
    if (isFinite(y) && Math.abs(y) < Y_MAX * 1.5) {
      if (!started) {
        ctx.moveTo(toX(x), toY(y));
        started = true;
      } else ctx.lineTo(toX(x), toY(y));
    } else started = false;
  }
  ctx.stroke();
}
