'use client';

// S3-ME-02 소리의 성질 — 진동수(높낮이)·진폭(크기) 슬라이더.

import { useMemo, useState } from 'react';

export function SoundWaveExplorer() {
  const [freq, setFreq] = useState<number>(3); // 1~6 (낮음~높음)
  const [amp, setAmp] = useState<number>(2); // 1~4 (작음~큼)

  const path = useMemo(() => {
    const W = 320;
    const H = 100;
    const cy = H / 2;
    const points: string[] = [];
    const cycles = freq;
    const amplitude = amp * 8 + 5;
    const steps = 80;
    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * W;
      const y = cy - amplitude * Math.sin((i / steps) * cycles * Math.PI * 2);
      points.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`);
    }
    return points.join(' ');
  }, [freq, amp]);

  const pitchLabel = freq <= 2 ? '낮은 소리' : freq >= 5 ? '높은 소리' : '보통 소리';
  const loudLabel = amp === 1 ? '아주 작은 소리' : amp === 2 ? '작은 소리' : amp === 3 ? '큰 소리' : '아주 큰 소리';
  const example = freq <= 2 && amp >= 3 ? '큰 북 · 천둥' : freq >= 5 && amp <= 2 ? '귀뚜라미 · 벨 소리' : freq >= 5 && amp >= 3 ? '비명 · 호루라기' : '말소리 · 노래';

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-1">소리 만들기</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          소리는 물체가 떨려서 생겨요. <strong>빨리 떨릴수록 높은 소리</strong>, <strong>크게 떨릴수록 큰 소리</strong>가 나요.
        </p>
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-4">
        <svg viewBox="0 0 320 100" className="w-full max-w-[480px] mx-auto block">
          <line x1="0" y1="50" x2="320" y2="50" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />
          <path d={path} stroke="#16a34a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </svg>
        <p className="text-center text-sm mt-2">
          <span className="font-semibold text-green-700 dark:text-green-400">{pitchLabel}</span> ·{' '}
          <span className="font-semibold text-green-700 dark:text-green-400">{loudLabel}</span>
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 flex justify-between mb-1">
            <span>떨리는 빠르기 (높낮이)</span>
            <span className="text-green-700 dark:text-green-400">{freq}</span>
          </label>
          <input
            type="range"
            min={1}
            max={6}
            value={freq}
            onChange={(e) => setFreq(Number(e.target.value))}
            className="w-full h-11 accent-green-600"
            aria-label="진동수"
          />
          <div className="flex justify-between text-xs text-zinc-500">
            <span>낮음</span>
            <span>높음</span>
          </div>
        </div>
        <div>
          <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 flex justify-between mb-1">
            <span>떨리는 크기 (소리 크기)</span>
            <span className="text-green-700 dark:text-green-400">{amp}</span>
          </label>
          <input
            type="range"
            min={1}
            max={4}
            value={amp}
            onChange={(e) => setAmp(Number(e.target.value))}
            className="w-full h-11 accent-green-600"
            aria-label="진폭"
          />
          <div className="flex justify-between text-xs text-zinc-500">
            <span>작음</span>
            <span>큼</span>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-3 text-sm">
        <p className="font-semibold text-emerald-800 dark:text-emerald-300 mb-1">이런 소리에 가까워요</p>
        <p className="text-emerald-900 dark:text-emerald-200">{example}</p>
        <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-2">
          소리는 공기·물·고체를 통해 퍼져요. 그래서 진공(공기 없는 곳)에서는 소리가 들리지 않아요.
        </p>
      </div>
    </div>
  );
}
