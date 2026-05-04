'use client';

// S6-EU-02 계절의 변화 — 지축 23.5° 기울기 + 공전 위치별 햇빛 각도.

import { useMemo, useState } from 'react';

const POSITIONS = [
  { id: 'spring', label: '봄 (춘분)', month: '3월', angle: 0, daylight: 12, temp: '온화' },
  { id: 'summer', label: '여름 (하지)', month: '6월', angle: 90, daylight: 14.5, temp: '더움' },
  { id: 'autumn', label: '가을 (추분)', month: '9월', angle: 180, daylight: 12, temp: '시원' },
  { id: 'winter', label: '겨울 (동지)', month: '12월', angle: 270, daylight: 9.5, temp: '추움' },
];

export function SeasonsExplorer() {
  const [pos, setPos] = useState(0);
  const current = POSITIONS[pos];

  const earth = useMemo(() => {
    const rad = (current.angle * Math.PI) / 180;
    const cx = 200 + Math.cos(rad) * 110;
    const cy = 130 + Math.sin(rad) * 60;
    const tilted = current.id === 'summer' || current.id === 'winter';
    const tiltDir = current.id === 'summer' ? -1 : 1;
    return { cx, cy, tilted, tiltDir };
  }, [current]);

  const sunAngleNH =
    current.id === 'summer' ? '거의 머리 위' : current.id === 'winter' ? '낮게' : '중간';

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-1">
          왜 계절이 바뀔까? — 지축 23.5° 기울기
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          지구는 <strong>23.5° 기울어진 채</strong> 태양 주위를 돌아요. 그래서 같은 곳이라도 햇빛 받는 각도가 달라져 계절이 생겨요.
        </p>
      </div>

      <div className="rounded-xl bg-zinc-900 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-4 overflow-hidden">
        <svg viewBox="0 0 400 260" className="w-full">
          {[...Array(40)].map((_, i) => (
            <circle
              key={i}
              cx={(i * 47) % 400}
              cy={(i * 31) % 260}
              r="0.6"
              fill="white"
              opacity={0.3 + ((i * 13) % 10) / 20}
            />
          ))}

          <ellipse cx="200" cy="130" rx="110" ry="60" fill="none" stroke="#475569" strokeWidth="0.6" strokeDasharray="3 3" />

          <circle cx="200" cy="130" r="22" fill="#fbbf24" />
          <circle cx="200" cy="130" r="22" fill="url(#sunGlow)" />
          <defs>
            <radialGradient id="sunGlow">
              <stop offset="50%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </radialGradient>
          </defs>

          {POSITIONS.map((p, i) => {
            const rad = (p.angle * Math.PI) / 180;
            const cx = 200 + Math.cos(rad) * 110;
            const cy = 130 + Math.sin(rad) * 60;
            const isCurrent = i === pos;
            return (
              <g
                key={p.id}
                onClick={() => setPos(i)}
                style={{ cursor: 'pointer' }}
                opacity={isCurrent ? 1 : 0.45}
              >
                <circle cx={cx} cy={cy} r={isCurrent ? 14 : 9} fill="#3b82f6" stroke="white" strokeWidth="1" />
                {isCurrent && (() => {
                  const tilt = p.id === 'summer' ? -23.5 : p.id === 'winter' ? 23.5 : 0;
                  return (
                    <line
                      x1={cx + Math.sin((tilt * Math.PI) / 180) * 18}
                      y1={cy - Math.cos((tilt * Math.PI) / 180) * 18}
                      x2={cx - Math.sin((tilt * Math.PI) / 180) * 18}
                      y2={cy + Math.cos((tilt * Math.PI) / 180) * 18}
                      stroke="#ef4444"
                      strokeWidth="2"
                    />
                  );
                })()}
                <text x={cx} y={cy + 30} textAnchor="middle" fontSize="9" fill="white" fontWeight={isCurrent ? 'bold' : 'normal'}>
                  {p.label}
                </text>
              </g>
            );
          })}

          <line x1="222" y1="130" x2={earth.cx - 14} y2={earth.cy} stroke="#fde047" strokeWidth="0.8" opacity="0.5" />
        </svg>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {POSITIONS.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setPos(i)}
            className={`px-2 py-2 text-xs rounded-md border min-h-[44px] ${
              pos === i
                ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-500 ring-2 ring-blue-300'
                : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800'
            }`}
          >
            <div className="font-medium text-zinc-900 dark:text-zinc-100">{p.label}</div>
            <div className="text-zinc-500">{p.month}</div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2 text-sm">
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/30 p-3 text-center">
          <div className="text-xs text-zinc-500">낮 길이</div>
          <div className="text-lg font-bold text-amber-700 dark:text-amber-300">{current.daylight}h</div>
        </div>
        <div className="rounded-lg bg-red-50 dark:bg-red-950/30 p-3 text-center">
          <div className="text-xs text-zinc-500">기온 (북반구)</div>
          <div className="text-lg font-bold text-red-700 dark:text-red-300">{current.temp}</div>
        </div>
        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 p-3 text-center">
          <div className="text-xs text-zinc-500">태양 높이</div>
          <div className="text-lg font-bold text-blue-700 dark:text-blue-300">{sunAngleNH}</div>
        </div>
      </div>

      <p className="text-xs text-zinc-500">
        ※ 남반구는 정확히 반대로 — 우리(북반구)가 여름이면 호주는 겨울이에요.
      </p>
    </div>
  );
}
