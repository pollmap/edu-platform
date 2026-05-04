'use client';

// S5-LI-02 생물과 환경 — 먹이그물 + 한 종 사라질 때 영향 시각화.

import { useMemo, useState } from 'react';

interface Species {
  id: string;
  name: string;
  level: 'producer' | 'primary' | 'secondary' | 'tertiary';
  x: number;
  y: number;
  eats: string[];
}

const SPECIES: Species[] = [
  { id: 'plant', name: '식물(풀)', level: 'producer', x: 50, y: 250, eats: [] },
  { id: 'rice', name: '벼', level: 'producer', x: 250, y: 250, eats: [] },
  { id: 'tree', name: '나무 열매', level: 'producer', x: 450, y: 250, eats: [] },
  { id: 'rabbit', name: '토끼', level: 'primary', x: 80, y: 160, eats: ['plant'] },
  { id: 'mouse', name: '들쥐', level: 'primary', x: 250, y: 160, eats: ['rice'] },
  { id: 'bird', name: '참새', level: 'primary', x: 420, y: 160, eats: ['tree', 'rice'] },
  { id: 'snake', name: '뱀', level: 'secondary', x: 180, y: 80, eats: ['mouse', 'bird'] },
  { id: 'fox', name: '여우', level: 'secondary', x: 350, y: 80, eats: ['rabbit', 'mouse'] },
  { id: 'eagle', name: '독수리', level: 'tertiary', x: 250, y: 20, eats: ['snake', 'fox', 'bird'] },
];

const COLOR: Record<Species['level'], string> = {
  producer: '#16a34a',
  primary: '#2563eb',
  secondary: '#f59e0b',
  tertiary: '#dc2626',
};

const LEVEL_LABEL: Record<Species['level'], string> = {
  producer: '생산자',
  primary: '1차 소비자',
  secondary: '2차 소비자',
  tertiary: '3차 소비자',
};

export function FoodWebExplorer() {
  const [removed, setRemoved] = useState<Set<string>>(new Set());

  const affected = useMemo(() => {
    if (removed.size === 0) return new Set<string>();
    const out = new Set<string>();
    for (const s of SPECIES) {
      if (removed.has(s.id)) continue;
      const liveFood = s.eats.filter((id) => !removed.has(id));
      if (s.eats.length > 0 && liveFood.length === 0) out.add(s.id);
    }
    return out;
  }, [removed]);

  const toggle = (id: string) => {
    setRemoved((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-1">
          먹이그물 — 사라지면 어떤 일이?
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          어떤 생물이 사라지면 <strong>그것을 먹던 생물</strong>이 굶게 돼요. 한 종을 클릭해 사라지게 해 보세요.
        </p>
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-4 overflow-x-auto">
        <svg viewBox="0 0 500 280" className="w-full" style={{ minWidth: 400 }}>
          {SPECIES.flatMap((s) =>
            s.eats.map((preyId) => {
              const prey = SPECIES.find((x) => x.id === preyId)!;
              const dim = removed.has(s.id) || removed.has(prey.id);
              return (
                <line
                  key={`${s.id}-${preyId}`}
                  x1={s.x}
                  y1={s.y + 14}
                  x2={prey.x}
                  y2={prey.y - 14}
                  stroke={dim ? '#cbd5e1' : '#94a3b8'}
                  strokeWidth={dim ? 1 : 1.5}
                  strokeDasharray={dim ? '3 3' : ''}
                />
              );
            }),
          )}
          {SPECIES.map((s) => {
            const isRemoved = removed.has(s.id);
            const isAffected = affected.has(s.id);
            const fill = isRemoved ? '#e5e7eb' : COLOR[s.level];
            const stroke = isAffected ? '#dc2626' : '#1f2937';
            return (
              <g
                key={s.id}
                transform={`translate(${s.x}, ${s.y})`}
                onClick={() => toggle(s.id)}
                style={{ cursor: 'pointer', opacity: isRemoved ? 0.4 : 1 }}
              >
                <ellipse
                  rx="38"
                  ry="14"
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={isAffected ? 3 : 1.5}
                />
                <text
                  textAnchor="middle"
                  y="4"
                  fontSize="10"
                  fontWeight="bold"
                  fill={isRemoved ? '#94a3b8' : 'white'}
                >
                  {s.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="flex flex-wrap gap-2 text-xs">
        {(['producer', 'primary', 'secondary', 'tertiary'] as const).map((lv) => (
          <div key={lv} className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded" style={{ background: COLOR[lv] }} />
            <span className="text-zinc-600 dark:text-zinc-400">{LEVEL_LABEL[lv]}</span>
          </div>
        ))}
      </div>

      {affected.size > 0 && (
        <div className="rounded-xl bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500 p-4 text-sm">
          <div className="font-bold text-red-800 dark:text-red-300 mb-1">⚠ 영향을 받은 종</div>
          <div className="text-zinc-700 dark:text-zinc-300">
            먹이가 모두 사라진 종: <strong>{[...affected].map((id) => SPECIES.find((s) => s.id === id)?.name).join(', ')}</strong>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setRemoved(new Set())}
        className="px-3 py-2 text-xs rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800"
        disabled={removed.size === 0}
      >
        모두 복원
      </button>
    </div>
  );
}
