'use client';

// M7-GM-04 입체도형의 성질 — 정다면체·각기둥·각뿔의 면/모서리/꼭짓점·전개도.

import { useState } from 'react';

interface SolidInfo {
  name: string;
  V: number;
  E: number;
  F: number;
  desc: string;
}

const SOLIDS: Record<string, SolidInfo> = {
  tetra: { name: '정사면체', V: 4, E: 6, F: 4, desc: '4개 정삼각형' },
  cube: { name: '정육면체', V: 8, E: 12, F: 6, desc: '6개 정사각형' },
  octa: { name: '정팔면체', V: 6, E: 12, F: 8, desc: '8개 정삼각형' },
  dodeca: { name: '정십이면체', V: 20, E: 30, F: 12, desc: '12개 정오각형' },
  icosa: { name: '정이십면체', V: 12, E: 30, F: 20, desc: '20개 정삼각형' },
};

export function SolidPropertyExplorer() {
  const [key, setKey] = useState<keyof typeof SOLIDS>('cube');
  const s = SOLIDS[key];
  const euler = s.V - s.E + s.F;

  // 간단 outline diagrams
  const diagrams: Record<string, React.ReactNode> = {
    tetra: (
      <>
        <polygon points="100,30 30,160 170,160" fill="#60a5fa" stroke="#1e3a8a" strokeWidth="2" />
        <line x1={100} y1={30} x2={100} y2={130} stroke="#1e3a8a" strokeWidth="1.5" strokeDasharray="3" />
        <line x1={100} y1={130} x2={30} y2={160} stroke="#1e3a8a" strokeWidth="1" strokeDasharray="3" />
        <line x1={100} y1={130} x2={170} y2={160} stroke="#1e3a8a" strokeWidth="1" strokeDasharray="3" />
      </>
    ),
    cube: (
      <>
        <polygon points="40,140 140,140 170,110 70,110" fill="#93c5fd" stroke="#1e3a8a" strokeWidth="2" />
        <polygon points="40,140 140,140 140,60 40,60" fill="#60a5fa" stroke="#1e3a8a" strokeWidth="2" />
        <polygon points="140,140 170,110 170,30 140,60" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="2" />
      </>
    ),
    octa: (
      <>
        <polygon points="100,20 30,100 100,180 170,100" fill="#60a5fa" stroke="#1e3a8a" strokeWidth="2" />
        <line x1={100} y1={20} x2={100} y2={180} stroke="#1e3a8a" strokeWidth="1.5" strokeDasharray="3" />
        <line x1={30} y1={100} x2={170} y2={100} stroke="#1e3a8a" strokeWidth="1.5" />
      </>
    ),
    dodeca: (
      <>
        {Array.from({ length: 5 }, (_, i) => {
          const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
          return [100 + 70 * Math.cos(a), 100 + 70 * Math.sin(a)];
        }).map((p, i, arr) => (
          <line key={i} x1={p[0]} y1={p[1]} x2={arr[(i + 1) % 5][0]} y2={arr[(i + 1) % 5][1]} stroke="#1e3a8a" strokeWidth="2" />
        ))}
        <polygon
          points={Array.from({ length: 5 }, (_, i) => {
            const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
            return `${100 + 40 * Math.cos(a)},${100 + 40 * Math.sin(a)}`;
          }).join(' ')}
          fill="#60a5fa"
          stroke="#1e3a8a"
          strokeWidth="1.5"
        />
      </>
    ),
    icosa: (
      <>
        {Array.from({ length: 5 }, (_, i) => {
          const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
          const x = 100 + 70 * Math.cos(a);
          const y = 100 + 70 * Math.sin(a);
          return <line key={i} x1={100} y1={100} x2={x} y2={y} stroke="#1e3a8a" strokeWidth="1.5" />;
        })}
        <polygon
          points={Array.from({ length: 5 }, (_, i) => {
            const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
            return `${100 + 70 * Math.cos(a)},${100 + 70 * Math.sin(a)}`;
          }).join(' ')}
          fill="#60a5fa"
          stroke="#1e3a8a"
          strokeWidth="2"
        />
        <circle cx={100} cy={100} r="3" fill="#dc2626" />
      </>
    ),
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {(Object.keys(SOLIDS) as Array<keyof typeof SOLIDS>).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setKey(k)}
            className={`px-2 py-2 min-h-[44px] rounded-lg text-xs font-semibold ${
              key === k ? 'bg-blue-600 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
            }`}
          >
            {SOLIDS[k].name}
          </button>
        ))}
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-900 p-3 rounded-lg flex justify-center">
        <svg viewBox="0 0 200 200" className="w-full max-w-md aspect-square">
          {diagrams[key]}
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-2 text-sm">
        <div className="bg-zinc-100 dark:bg-zinc-800 p-2 rounded text-center">
          <div className="text-xs text-zinc-500">꼭짓점 V</div>
          <div className="font-bold text-blue-600 dark:text-blue-400">{s.V}</div>
        </div>
        <div className="bg-zinc-100 dark:bg-zinc-800 p-2 rounded text-center">
          <div className="text-xs text-zinc-500">모서리 E</div>
          <div className="font-bold text-blue-600 dark:text-blue-400">{s.E}</div>
        </div>
        <div className="bg-zinc-100 dark:bg-zinc-800 p-2 rounded text-center">
          <div className="text-xs text-zinc-500">면 F</div>
          <div className="font-bold text-blue-600 dark:text-blue-400">{s.F}</div>
        </div>
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-800 p-3 rounded-lg text-sm space-y-1">
        <div>
          <strong>구성</strong>: {s.desc}
        </div>
        <div className="font-mono">
          오일러 공식: V − E + F = {s.V} − {s.E} + {s.F} ={' '}
          <span className="text-red-500 font-bold">{euler}</span>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg text-sm">
        💡 정다면체는 고대 그리스 시대부터 알려진 단 5가지뿐이에요 (플라톤 입체).
      </div>
    </div>
  );
}
