'use client';

// M5-GM-03 직육면체와 정육면체 — 가로/세로/높이 슬라이더로 3D 박스를 회전·전개도 토글.

import { useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';

type View = 'solid' | 'net';

export function RectangularSolidExplorer() {
  const [w, setW] = useState(4);
  const [d, setD] = useState(3);
  const [h, setH] = useState(2);
  const [view, setView] = useState<View>('solid');

  const isCube = w === d && d === h;
  const surface = 2 * (w * d + d * h + w * h);
  const volume = w * d * h;
  const edges = 12;
  const faces = 6;
  const vertices = 8;

  const SCALE = 28;
  const oxX = w * SCALE;
  const oxY = h * SCALE;
  const offX = d * SCALE * 0.5;
  const offY = -d * SCALE * 0.4;

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(['solid', 'net'] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setView(m)}
            className={`px-3 py-2 min-h-[44px] rounded-lg text-sm font-semibold transition-colors ${
              view === m
                ? 'bg-blue-600 text-white'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
            }`}
          >
            {m === 'solid' ? '입체도형' : '전개도'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <SliderRow label="가로" value={w} min={1} max={6} step={1} onChange={setW} format={(v) => `${v}`} unit=" cm" />
        <SliderRow label="세로" value={d} min={1} max={6} step={1} onChange={setD} format={(v) => `${v}`} unit=" cm" />
        <SliderRow label="높이" value={h} min={1} max={6} step={1} onChange={setH} format={(v) => `${v}`} unit=" cm" />
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-3 flex justify-center">
        {view === 'solid' ? (
          <svg viewBox={`-40 -${oxY + 60} ${oxX + offX + 80} ${oxY + 80}`} className="w-full max-w-md aspect-square">
            <polygon points={`0,0 ${oxX},0 ${oxX + offX},${offY} ${offX},${offY}`} fill="#60a5fa" stroke="#1e3a8a" strokeWidth="2" />
            <polygon points={`${oxX},0 ${oxX},${-oxY} ${oxX + offX},${-oxY + offY} ${oxX + offX},${offY}`} fill="#3b82f6" stroke="#1e3a8a" strokeWidth="2" />
            <polygon points={`0,0 ${oxX},0 ${oxX},${-oxY} 0,${-oxY}`} fill="#93c5fd" stroke="#1e3a8a" strokeWidth="2" />
          </svg>
        ) : (
          <svg viewBox={`0 0 ${(2 * w + 2 * d) * SCALE + 20} ${(2 * d + h) * SCALE + 20}`} className="w-full max-w-md">
            {/* 윗면 */}
            <rect x={d * SCALE + 10} y={10} width={w * SCALE} height={d * SCALE} fill="#93c5fd" stroke="#1e3a8a" strokeWidth="2" />
            {/* 옆면 4개 (가운데 줄) */}
            <rect x={10} y={d * SCALE + 10} width={d * SCALE} height={h * SCALE} fill="#3b82f6" stroke="#1e3a8a" strokeWidth="2" />
            <rect x={d * SCALE + 10} y={d * SCALE + 10} width={w * SCALE} height={h * SCALE} fill="#60a5fa" stroke="#1e3a8a" strokeWidth="2" />
            <rect x={(d + w) * SCALE + 10} y={d * SCALE + 10} width={d * SCALE} height={h * SCALE} fill="#3b82f6" stroke="#1e3a8a" strokeWidth="2" />
            <rect x={(2 * d + w) * SCALE + 10} y={d * SCALE + 10} width={w * SCALE} height={h * SCALE} fill="#60a5fa" stroke="#1e3a8a" strokeWidth="2" />
            {/* 밑면 */}
            <rect x={d * SCALE + 10} y={(d + h) * SCALE + 10} width={w * SCALE} height={d * SCALE} fill="#93c5fd" stroke="#1e3a8a" strokeWidth="2" />
          </svg>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
        <div className="bg-zinc-100 dark:bg-zinc-800 p-2 rounded text-center">
          <div className="text-xs text-zinc-500">면</div>
          <div className="font-bold text-blue-600 dark:text-blue-400">{faces}</div>
        </div>
        <div className="bg-zinc-100 dark:bg-zinc-800 p-2 rounded text-center">
          <div className="text-xs text-zinc-500">모서리</div>
          <div className="font-bold text-blue-600 dark:text-blue-400">{edges}</div>
        </div>
        <div className="bg-zinc-100 dark:bg-zinc-800 p-2 rounded text-center">
          <div className="text-xs text-zinc-500">꼭짓점</div>
          <div className="font-bold text-blue-600 dark:text-blue-400">{vertices}</div>
        </div>
        <div className="bg-zinc-100 dark:bg-zinc-800 p-2 rounded text-center">
          <div className="text-xs text-zinc-500">분류</div>
          <div className="font-bold text-blue-600 dark:text-blue-400">{isCube ? '정육면체' : '직육면체'}</div>
        </div>
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-800 p-3 rounded-lg text-sm font-mono">
        <div>겉넓이 = 2(가로·세로 + 세로·높이 + 가로·높이) = <span className="text-red-500 font-bold">{surface}</span> cm²</div>
        <div>부피 = 가로 × 세로 × 높이 = <span className="text-red-500 font-bold">{volume}</span> cm³</div>
      </div>
    </div>
  );
}
