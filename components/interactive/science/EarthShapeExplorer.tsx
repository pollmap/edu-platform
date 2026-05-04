'use client';

// S3-EU-01 지구의 모습 — 지구 표면 구성 비율 + 회전 시각화.

import { useState } from 'react';

type Layer = 'surface' | 'water' | 'air';

const LAYERS: Record<Layer, { name: string; desc: string; color: string; ratio: { land: number; ocean: number; ice?: number } }> = {
  surface: {
    name: '땅과 바다',
    desc: '지구 표면의 약 71%는 바다, 29%는 땅이에요.',
    color: '#3b82f6',
    ratio: { land: 29, ocean: 71 },
  },
  water: {
    name: '물의 종류',
    desc: '지구 물의 97%가 짠 바닷물, 민물은 3%뿐이에요. 그 민물의 대부분은 빙하예요.',
    color: '#0891b2',
    ratio: { land: 3, ocean: 97 },
  },
  air: {
    name: '공기 구성',
    desc: '공기는 질소 78%, 산소 21%, 나머지 1%(이산화탄소·아르곤 등). 우리가 마시는 건 산소예요.',
    color: '#a855f7',
    ratio: { land: 78, ocean: 21, ice: 1 },
  },
};

export function EarthShapeExplorer() {
  const [layer, setLayer] = useState<Layer>('surface');
  const [rotate, setRotate] = useState(0);

  const cur = LAYERS[layer];

  // Pie chart geometry
  const cx = 60;
  const cy = 60;
  const r = 50;
  const total = 100;
  const oceanFrac = cur.ratio.ocean / total;
  const landFrac = cur.ratio.land / total;
  const iceFrac = (cur.ratio.ice ?? 0) / total;

  function arc(start: number, frac: number, color: string, key: string) {
    const a0 = start * 2 * Math.PI - Math.PI / 2;
    const a1 = (start + frac) * 2 * Math.PI - Math.PI / 2;
    const x0 = cx + r * Math.cos(a0);
    const y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1);
    const y1 = cy + r * Math.sin(a1);
    const large = frac > 0.5 ? 1 : 0;
    return (
      <path
        key={key}
        d={`M ${cx} ${cy} L ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1} Z`}
        fill={color}
        opacity={0.85}
      />
    );
  }

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-1">지구 살펴보기</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          지구는 둥근 행성이에요. 표면은 땅과 바다로 나뉘고, 그 위에 공기(대기)가 둘러싸고 있어요.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-5 items-center">
        <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-4">
          <svg viewBox="0 0 220 220" className="w-full max-w-[260px] mx-auto block">
            <defs>
              <radialGradient id="earthGrad" cx="40%" cy="40%">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="60%" stopColor="#1e40af" />
                <stop offset="100%" stopColor="#0c1f4a" />
              </radialGradient>
            </defs>
            <circle cx={110} cy={110} r={90} fill="url(#earthGrad)" />
            {/* land patches */}
            <g transform={`rotate(${rotate} 110 110)`}>
              <ellipse cx={80} cy={80} rx={28} ry={20} fill="#16a34a" opacity={0.85} />
              <ellipse cx={150} cy={120} rx={20} ry={28} fill="#16a34a" opacity={0.85} />
              <ellipse cx={100} cy={160} rx={18} ry={12} fill="#16a34a" opacity={0.85} />
              <ellipse cx={140} cy={70} rx={12} ry={8} fill="#16a34a" opacity={0.85} />
            </g>
            <ellipse cx={110} cy={110} rx={94} ry={94} fill="none" stroke="#a5f3fc" strokeWidth="2" opacity={0.4} />
          </svg>
          <div className="mt-3">
            <label className="block text-sm font-semibold mb-1 text-zinc-700 dark:text-zinc-300">지구 회전</label>
            <input
              type="range"
              value={rotate}
              min={0}
              max={360}
              step={1}
              onChange={(e) => setRotate(parseInt(e.target.value))}
              className="w-full h-3 cursor-pointer accent-green-600"
            />
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{rotate}° 회전</p>
          </div>
        </div>

        <div>
          <div className="flex flex-wrap gap-2 mb-3">
            {(Object.keys(LAYERS) as Layer[]).map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setLayer(k)}
                className={`px-3 py-2 border rounded-md text-sm min-h-[44px] ${
                  layer === k
                    ? 'border-green-600 bg-green-50 dark:bg-green-900/40 text-green-700 dark:text-green-300'
                    : 'border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                }`}
              >
                {LAYERS[k].name}
              </button>
            ))}
          </div>

          <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-4">
            <svg viewBox="0 0 120 120" className="w-32 h-32 mx-auto block">
              {layer === 'air' ? (
                <>
                  {arc(0, cur.ratio.land / 100, '#a78bfa', 'p1')}
                  {arc(cur.ratio.land / 100, cur.ratio.ocean / 100, '#3b82f6', 'p2')}
                  {arc((cur.ratio.land + cur.ratio.ocean) / 100, iceFrac, '#94a3b8', 'p3')}
                </>
              ) : (
                <>
                  {arc(0, oceanFrac, layer === 'water' ? '#0891b2' : '#3b82f6', 'p1')}
                  {arc(oceanFrac, landFrac, layer === 'water' ? '#94a3b8' : '#16a34a', 'p2')}
                </>
              )}
            </svg>
            <p className="text-center text-sm font-semibold mt-2" style={{ color: cur.color }}>
              {cur.name}
            </p>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 text-center">{cur.desc}</p>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-amber-50 dark:bg-amber-900/30 p-3 text-sm space-y-1">
        <p>
          <strong>핵심 비율:</strong> 바다 71% / 땅 29%, 공기는 질소 78% / 산소 21%
        </p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          그래서 우주에서 본 지구는 <strong>파란 행성</strong>이라고 불려요. 표면 대부분이 물이거든요.
        </p>
      </div>
    </div>
  );
}
