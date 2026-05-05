'use client';

// S9-LI-02 자극과 반응 — 무릎반사·뜨거운 것 만지기 등 반사궁(reflex arc).
// 자극→감각뉴런→연합뉴런(척수)→운동뉴런→반응 흐름을 단계별로 점등.

import { useEffect, useState } from 'react';

interface Stimulus {
  key: string;
  name: string;
  steps: string[];
  organ: string;
  type: 'reflex' | 'voluntary';
}

const STIMULI: Stimulus[] = [
  {
    key: 'hot',
    name: '🔥 뜨거운 컵 만짐',
    steps: ['피부 통점 자극', '감각뉴런', '척수(연합뉴런)', '운동뉴런', '팔 근육 수축 → 손 떼기'],
    organ: '척수반사',
    type: 'reflex',
  },
  {
    key: 'knee',
    name: '🦵 무릎 망치 두드림',
    steps: ['무릎 힘줄 자극', '감각뉴런', '척수', '운동뉴런', '대퇴근 수축 → 다리 차기'],
    organ: '척수반사',
    type: 'reflex',
  },
  {
    key: 'light',
    name: '💡 밝은 빛',
    steps: ['망막 자극', '시신경(감각)', '뇌 시각피질 → 자율신경', '동공 운동뉴런', '동공 축소'],
    organ: '뇌·자율신경',
    type: 'reflex',
  },
  {
    key: 'voluntary',
    name: '🎵 음악 듣고 손뼉',
    steps: ['귀 자극', '청신경', '대뇌 청각/운동피질', '운동뉴런', '손 박수 (의식적)'],
    organ: '대뇌(의식)',
    type: 'voluntary',
  },
];

export function NeuralReflexExplorer() {
  const [stimIdx, setStimIdx] = useState(0);
  const [step, setStep] = useState(-1); // -1: 정지
  const [running, setRunning] = useState(false);
  const stim = STIMULI[stimIdx];

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setStep((s) => {
        if (s >= stim.steps.length - 1) {
          setRunning(false);
          return s;
        }
        return s + 1;
      });
    }, 700);
    return () => clearInterval(id);
  }, [running, stim.steps.length]);

  const reset = () => {
    setStep(-1);
    setRunning(false);
  };

  const start = () => {
    setStep(0);
    setRunning(true);
  };

  // SVG 신경 경로
  const W = 360;
  const H = 220;
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {STIMULI.map((s, i) => (
          <button
            key={s.key}
            type="button"
            onClick={() => {
              setStimIdx(i);
              reset();
            }}
            className={`px-2 py-2 rounded text-xs font-medium min-h-[44px] ${
              i === stimIdx
                ? 'bg-emerald-600 text-white'
                : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-900 p-3 border border-zinc-200 dark:border-zinc-700">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="반사궁">
          {/* 신호 경로 */}
          {[0, 1, 2, 3, 4].map((i) => {
            const x = 30 + i * 75;
            const active = step >= i;
            return (
              <g key={i}>
                <circle
                  cx={x}
                  cy={H / 2}
                  r={active ? 22 : 18}
                  fill={active ? '#10b981' : '#e4e4e7'}
                  stroke={active ? '#047857' : '#a1a1aa'}
                  strokeWidth={2}
                  className="transition-all duration-300"
                />
                {i > 0 && (
                  <line
                    x1={30 + (i - 1) * 75 + 22}
                    y1={H / 2}
                    x2={x - 22}
                    y2={H / 2}
                    stroke={active ? '#10b981' : '#a1a1aa'}
                    strokeWidth={3}
                    strokeDasharray={active ? '0' : '4 4'}
                  />
                )}
                <text
                  x={x}
                  y={H / 2 + 5}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="bold"
                  fill={active ? 'white' : '#52525b'}
                >
                  {i + 1}
                </text>
                <text
                  x={x}
                  y={H / 2 + 50}
                  textAnchor="middle"
                  fontSize="9"
                  fill="currentColor"
                  opacity={0.7}
                >
                  {['자극', '감각', stim.type === 'reflex' ? '척수' : '뇌', '운동', '반응'][i]}
                </text>
              </g>
            );
          })}
          {/* 자극·반응 라벨 */}
          <text x={30} y={H / 2 - 35} textAnchor="middle" fontSize="20">
            ⚡
          </text>
          <text x={30 + 4 * 75} y={H / 2 - 35} textAnchor="middle" fontSize="20">
            💪
          </text>
        </svg>
      </div>

      <div className="space-y-2">
        {stim.steps.map((s, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg flex items-center gap-2 transition-all ${
              i <= step
                ? 'bg-emerald-100 dark:bg-emerald-950/40 border border-emerald-400'
                : 'bg-zinc-100 dark:bg-zinc-800 border border-transparent'
            }`}
          >
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                i <= step ? 'bg-emerald-600 text-white' : 'bg-zinc-300 dark:bg-zinc-700 text-zinc-500'
              }`}
            >
              {i + 1}
            </span>
            <span className={i <= step ? 'font-bold text-emerald-800 dark:text-emerald-300' : 'text-zinc-600 dark:text-zinc-400'}>
              {s}
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={start}
          disabled={running}
          className="flex-1 px-4 py-2 rounded-lg bg-emerald-600 text-white font-medium min-h-[44px] disabled:opacity-60"
        >
          ▶️ 자극 시작
        </button>
        <button
          type="button"
          onClick={reset}
          className="px-4 py-2 rounded-lg bg-zinc-200 dark:bg-zinc-700 font-medium min-h-[44px]"
        >
          초기화
        </button>
      </div>

      <div
        className={`rounded-xl p-3 text-sm border ${
          stim.type === 'reflex'
            ? 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800'
            : 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800'
        }`}
      >
        <div className="font-bold mb-1">
          {stim.type === 'reflex' ? '⚡ 무조건 반사 (척수반사)' : '🧠 의식적 반응 (대뇌)'}
        </div>
        <div className="text-zinc-700 dark:text-zinc-300">
          경로: {stim.organ} · {stim.type === 'reflex' ? '뇌를 거치지 않아 빠름 (~50ms)' : '대뇌 처리로 느림 (~200ms+)'}
        </div>
      </div>

      <div className="text-xs text-zinc-500 dark:text-zinc-400">
        💡 「뜨거운 것 만지면 손 떼기」는 뇌가 「뜨겁다」고 느끼기 전에 척수에서 신호가 되돌아가는 거예요. 반사는 위험으로부터 몸을 지키는 진화적 안전장치.
      </div>
    </div>
  );
}
