'use client';

// M6-GM-02 직육면체 부피·겉넓이 — 단위 큐브 채우기 시각화.

import { useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';

export function BoxVolumeSurfaceExplorer() {
  const [w, setW] = useState(4);
  const [d, setD] = useState(3);
  const [h, setH] = useState(2);

  const volume = w * d * h;
  const surface = 2 * (w * d + d * h + w * h);

  const SCALE = 18;
  const cells: Array<[number, number, number]> = [];
  for (let z = 0; z < h; z++)
    for (let y = 0; y < d; y++) for (let x = 0; x < w; x++) cells.push([x, y, z]);

  // depth-first ordering for proper occlusion (back-bottom first)
  cells.sort((a, b) => b[1] - a[1] || a[2] - b[2] || a[0] - b[0]);

  const project = (x: number, y: number, z: number): [number, number] => [
    x * SCALE + y * SCALE * 0.5,
    -z * SCALE + y * SCALE * 0.4,
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <SliderRow label="가로" value={w} min={1} max={5} step={1} onChange={setW} format={(v) => `${v}`} unit=" cm" />
        <SliderRow label="세로" value={d} min={1} max={5} step={1} onChange={setD} format={(v) => `${v}`} unit=" cm" />
        <SliderRow label="높이" value={h} min={1} max={5} step={1} onChange={setH} format={(v) => `${v}`} unit=" cm" />
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-3 flex justify-center">
        <svg
          viewBox={`-${SCALE} -${h * SCALE + 20} ${(w + d * 0.5) * SCALE + SCALE * 2} ${(h + d * 0.4) * SCALE + SCALE * 2}`}
          className="w-full max-w-md aspect-square"
        >
          {cells.map(([x, y, z]) => {
            const [px, py] = project(x, y, z);
            return (
              <g key={`${x}-${y}-${z}`}>
                {/* top */}
                <polygon
                  points={`${px},${py} ${px + SCALE},${py} ${px + SCALE + SCALE * 0.5},${py - SCALE * 0.4} ${px + SCALE * 0.5},${py - SCALE * 0.4}`}
                  fill="#93c5fd"
                  stroke="#1e3a8a"
                  strokeWidth="0.5"
                />
                {/* front */}
                <polygon
                  points={`${px},${py} ${px + SCALE},${py} ${px + SCALE},${py + SCALE} ${px},${py + SCALE}`}
                  fill="#60a5fa"
                  stroke="#1e3a8a"
                  strokeWidth="0.5"
                />
                {/* right */}
                <polygon
                  points={`${px + SCALE},${py} ${px + SCALE + SCALE * 0.5},${py - SCALE * 0.4} ${px + SCALE + SCALE * 0.5},${py + SCALE - SCALE * 0.4} ${px + SCALE},${py + SCALE}`}
                  fill="#3b82f6"
                  stroke="#1e3a8a"
                  strokeWidth="0.5"
                />
              </g>
            );
          })}
        </svg>
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-800 p-3 rounded-lg text-sm font-mono space-y-1">
        <div>
          단위 큐브 개수 = {w} × {d} × {h} ={' '}
          <span className="text-red-500 font-bold">{volume}</span> 개 → 부피 {volume} cm³
        </div>
        <div>
          겉넓이 = 2({w}·{d} + {d}·{h} + {w}·{h}) ={' '}
          <span className="text-red-500 font-bold">{surface}</span> cm²
        </div>
      </div>
    </div>
  );
}
