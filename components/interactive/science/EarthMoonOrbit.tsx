'use client';

// S6-EU-01 지구와 달의 운동 — 자전·공전·달의 위상.

import { useEffect, useState } from 'react';

const PHASES = [
  { id: 0, name: '삭 (그믐)', shape: 'new', desc: '달이 태양과 같은 쪽 — 안 보임' },
  { id: 1, name: '초승달', shape: 'waxCrescent', desc: '오른쪽 가장자리만 살짝' },
  { id: 2, name: '상현', shape: 'firstQuarter', desc: '오른쪽 절반' },
  { id: 3, name: '상현망간', shape: 'waxGibbous', desc: '오른쪽 대부분' },
  { id: 4, name: '망 (보름)', shape: 'full', desc: '전체가 보임' },
  { id: 5, name: '하현망간', shape: 'wanGibbous', desc: '왼쪽 대부분' },
  { id: 6, name: '하현', shape: 'lastQuarter', desc: '왼쪽 절반' },
  { id: 7, name: '그믐달', shape: 'wanCrescent', desc: '왼쪽 가장자리만 살짝' },
];

function MoonShape({ shape, size = 60 }: { shape: string; size?: number }) {
  const cx = size / 2;
  const r = size / 2 - 2;
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
      <circle cx={cx} cy={cx} r={r} fill="#1e293b" />
      {shape === 'full' && <circle cx={cx} cy={cx} r={r} fill="#fef3c7" />}
      {shape === 'firstQuarter' && (
        <path d={`M ${cx} ${cx - r} A ${r} ${r} 0 0 1 ${cx} ${cx + r} L ${cx} ${cx - r} Z`} fill="#fef3c7" />
      )}
      {shape === 'lastQuarter' && (
        <path d={`M ${cx} ${cx - r} A ${r} ${r} 0 0 0 ${cx} ${cx + r} L ${cx} ${cx - r} Z`} fill="#fef3c7" />
      )}
      {shape === 'waxCrescent' && (
        <path d={`M ${cx} ${cx - r} A ${r * 0.4} ${r} 0 0 1 ${cx} ${cx + r} A ${r} ${r} 0 0 0 ${cx} ${cx - r} Z`} fill="#fef3c7" />
      )}
      {shape === 'wanCrescent' && (
        <path d={`M ${cx} ${cx - r} A ${r * 0.4} ${r} 0 0 0 ${cx} ${cx + r} A ${r} ${r} 0 0 1 ${cx} ${cx - r} Z`} fill="#fef3c7" />
      )}
      {shape === 'waxGibbous' && (
        <g>
          <circle cx={cx} cy={cx} r={r} fill="#fef3c7" />
          <path d={`M ${cx} ${cx - r} A ${r * 0.4} ${r} 0 0 0 ${cx} ${cx + r} A ${r} ${r} 0 0 0 ${cx} ${cx - r} Z`} fill="#1e293b" />
        </g>
      )}
      {shape === 'wanGibbous' && (
        <g>
          <circle cx={cx} cy={cx} r={r} fill="#fef3c7" />
          <path d={`M ${cx} ${cx - r} A ${r * 0.4} ${r} 0 0 1 ${cx} ${cx + r} A ${r} ${r} 0 0 1 ${cx} ${cx - r} Z`} fill="#1e293b" />
        </g>
      )}
      <circle cx={cx} cy={cx} r={r} fill="none" stroke="#475569" strokeWidth="0.6" />
    </svg>
  );
}

export function EarthMoonOrbit() {
  const [phaseIdx, setPhaseIdx] = useState(4);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setPhaseIdx((p) => (p + 1) % 8), 800);
    return () => clearInterval(id);
  }, [running]);

  const phase = PHASES[phaseIdx];

  // 8 위치 좌표 (지구 주변)
  const earthCx = 220;
  const earthCy = 130;
  const orbitR = 90;
  const angle = (phaseIdx * 45) * (Math.PI / 180);
  const moonCx = earthCx + Math.cos(angle - Math.PI / 2) * orbitR;
  const moonCy = earthCy + Math.sin(angle - Math.PI / 2) * orbitR;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-1">
          달은 왜 모양이 변할까? — 위상 변화
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          달은 약 <strong>한 달(29.5일)</strong>마다 지구를 한 바퀴 돌아요. 지구에서 보이는 달의 <strong>밝은 부분</strong>이 바뀌어 모양이 달라 보여요.
        </p>
      </div>

      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4 overflow-hidden">
        <svg viewBox="0 0 400 260" className="w-full">
          {[...Array(35)].map((_, i) => (
            <circle key={i} cx={(i * 53) % 400} cy={(i * 37) % 260} r="0.5" fill="white" opacity={0.25 + ((i * 7) % 10) / 25} />
          ))}

          <circle cx="40" cy="130" r="20" fill="#fbbf24" />
          <text x="40" y="158" fontSize="10" fill="#fde047" textAnchor="middle">태양</text>
          <line x1="60" y1="130" x2="370" y2="130" stroke="#475569" strokeWidth="0.4" strokeDasharray="2 2" opacity="0.5" />

          <circle cx={earthCx} cy={earthCy} r="18" fill="#3b82f6" />
          <ellipse cx={earthCx} cy={earthCy} rx="18" ry="18" fill="url(#earthShade)" />
          <defs>
            <linearGradient id="earthShade" x1="0%" x2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
          </defs>
          <text x={earthCx} y={earthCy + 32} fontSize="10" fill="#93c5fd" textAnchor="middle">지구</text>

          <circle cx={earthCx} cy={earthCy} r={orbitR} fill="none" stroke="#475569" strokeWidth="0.6" strokeDasharray="3 3" />

          {PHASES.map((p, i) => {
            const a = (i * 45) * (Math.PI / 180) - Math.PI / 2;
            const mx = earthCx + Math.cos(a) * orbitR;
            const my = earthCy + Math.sin(a) * orbitR;
            const sel = i === phaseIdx;
            return (
              <g key={i} onClick={() => setPhaseIdx(i)} style={{ cursor: 'pointer' }} opacity={sel ? 1 : 0.45}>
                <circle cx={mx} cy={my} r="9" fill="#1e293b" />
                <path d={`M ${mx} ${my - 9} A 4 9 0 0 1 ${mx} ${my + 9} A 9 9 0 0 0 ${mx} ${my - 9} Z`} fill="#fef3c7" />
                <circle cx={mx} cy={my} r="9" fill="none" stroke={sel ? '#fde047' : '#475569'} strokeWidth={sel ? 1.5 : 0.6} />
              </g>
            );
          })}

          <g>
            <circle cx={moonCx} cy={moonCy} r="14" fill="#1e293b" stroke="#fde047" strokeWidth="2" />
          </g>
        </svg>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {PHASES.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setPhaseIdx(i)}
            className={`p-2 rounded-md border min-h-[44px] flex flex-col items-center gap-1 ${
              phaseIdx === i
                ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-500 ring-2 ring-blue-300'
                : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700'
            }`}
          >
            <div className="w-7 h-7">
              <MoonShape shape={p.shape} size={28} />
            </div>
            <span className="text-[10px] text-zinc-700 dark:text-zinc-300">{p.name}</span>
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setRunning((r) => !r)}
        className="w-full px-3 py-2 text-sm rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 min-h-[44px]"
      >
        {running ? '일시정지' : '자동재생 (한 달 = 8단계)'}
      </button>

      <div className="rounded-lg bg-amber-50 dark:bg-amber-950/30 p-3 text-sm">
        <div className="font-bold text-amber-800 dark:text-amber-200 mb-1">{phase.name}</div>
        <div className="text-zinc-800 dark:text-zinc-200">{phase.desc}</div>
      </div>

      <p className="text-xs text-zinc-500">
        ※ 자전 = 지구가 스스로 도는 것 (24시간, 낮·밤). 공전 = 태양 주위 도는 것 (1년, 계절). 달은 지구를 공전.
      </p>
    </div>
  );
}
