'use client';

// M6-GM-01 각기둥과 각뿔 — 밑면 변 수에 따른 면/모서리/꼭짓점 변화를 인터랙티브로.

import { useState } from 'react';

type Solid = 'prism' | 'pyramid';

export function PrismPyramidExplorer() {
  const [n, setN] = useState(4);
  const [solid, setSolid] = useState<Solid>('prism');

  const faces = solid === 'prism' ? n + 2 : n + 1;
  const edges = solid === 'prism' ? n * 3 : n * 2;
  const vertices = solid === 'prism' ? n * 2 : n + 1;

  // 오일러 공식: V - E + F = 2
  const eulerOk = vertices - edges + faces === 2;

  const cx = 150;
  const cyTop = 60;
  const cyBot = 200;
  const r = 60;

  const topPoints: Array<[number, number]> = Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    return [cx + r * Math.cos(a), cyTop + r * 0.4 * Math.sin(a)];
  });
  const botPoints: Array<[number, number]> = Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    return [cx + r * Math.cos(a), cyBot + r * 0.4 * Math.sin(a)];
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(['prism', 'pyramid'] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSolid(s)}
            className={`px-3 py-2 min-h-[44px] rounded-lg text-sm font-semibold ${
              solid === s ? 'bg-blue-600 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
            }`}
          >
            {s === 'prism' ? '각기둥' : '각뿔'}
          </button>
        ))}
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-800 p-3 rounded-lg">
        <div className="flex justify-between mb-2 text-sm">
          <span className="font-bold text-blue-700 dark:text-blue-400">밑면 변의 개수 (n)</span>
          <span className="font-mono text-red-500 font-semibold">{n}각{solid === 'prism' ? '기둥' : '뿔'}</span>
        </div>
        <input
          type="range"
          min={3}
          max={10}
          step={1}
          value={n}
          onChange={(e) => setN(parseInt(e.target.value, 10))}
          className="w-full h-3 cursor-pointer accent-blue-600"
        />
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-3 flex justify-center">
        <svg viewBox="0 0 300 260" className="w-full max-w-md aspect-square">
          {solid === 'prism' ? (
            <>
              {topPoints.map((p, i) => (
                <line key={`v-${i}`} x1={p[0]} y1={p[1]} x2={botPoints[i][0]} y2={botPoints[i][1]} stroke="#1e3a8a" strokeWidth="1.5" />
              ))}
              <polygon points={topPoints.map((p) => p.join(',')).join(' ')} fill="rgba(96,165,250,0.5)" stroke="#1e3a8a" strokeWidth="2" />
              <polygon points={botPoints.map((p) => p.join(',')).join(' ')} fill="rgba(59,130,246,0.6)" stroke="#1e3a8a" strokeWidth="2" />
            </>
          ) : (
            <>
              {botPoints.map((p, i) => (
                <line key={`p-${i}`} x1={p[0]} y1={p[1]} x2={cx} y2={cyTop} stroke="#1e3a8a" strokeWidth="1.5" />
              ))}
              <polygon points={botPoints.map((p) => p.join(',')).join(' ')} fill="rgba(59,130,246,0.6)" stroke="#1e3a8a" strokeWidth="2" />
              <circle cx={cx} cy={cyTop} r="3" fill="#dc2626" />
            </>
          )}
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-2 text-sm">
        <div className="bg-zinc-100 dark:bg-zinc-800 p-2 rounded text-center">
          <div className="text-xs text-zinc-500">면 (F)</div>
          <div className="font-bold text-blue-600 dark:text-blue-400">{faces}</div>
        </div>
        <div className="bg-zinc-100 dark:bg-zinc-800 p-2 rounded text-center">
          <div className="text-xs text-zinc-500">모서리 (E)</div>
          <div className="font-bold text-blue-600 dark:text-blue-400">{edges}</div>
        </div>
        <div className="bg-zinc-100 dark:bg-zinc-800 p-2 rounded text-center">
          <div className="text-xs text-zinc-500">꼭짓점 (V)</div>
          <div className="font-bold text-blue-600 dark:text-blue-400">{vertices}</div>
        </div>
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-800 p-3 rounded-lg text-sm font-mono text-center">
        오일러 공식: V − E + F = {vertices} − {edges} + {faces} ={' '}
        <span className="text-red-500 font-bold">{vertices - edges + faces}</span>
        {eulerOk ? ' ✓ (=2)' : ''}
      </div>
    </div>
  );
}
