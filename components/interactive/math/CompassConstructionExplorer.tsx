'use client';

// M7-GM-02 작도와 합동 — 길이/각/수직이등분선 작도 단계 시각화.

import { useState } from 'react';

type Step = 0 | 1 | 2 | 3;
type Mode = 'segment' | 'angle' | 'bisector';

export function CompassConstructionExplorer() {
  const [mode, setMode] = useState<Mode>('segment');
  const [step, setStep] = useState<Step>(0);

  const labels = {
    segment: '길이가 같은 선분',
    angle: '크기가 같은 각',
    bisector: '수직이등분선',
  };

  const stepDescs: Record<Mode, string[]> = {
    segment: [
      '시작: 주어진 선분 AB',
      '직선 위에 한 점 C 표시',
      '컴퍼스로 AB 길이를 재서 C에 대고 호',
      '호와 직선이 만나는 점 D → CD = AB',
    ],
    angle: [
      '시작: 주어진 각 ∠O',
      '점 O에서 호를 그려 두 변과 만나는 점 표시',
      '같은 반지름의 호를 새 위치 P에서 그리기',
      '교점을 잇는 직선 → 같은 크기의 각',
    ],
    bisector: [
      '시작: 주어진 선분 AB',
      'A·B에서 같은 반지름(>AB/2)으로 호',
      '두 호의 교점 P, Q 표시',
      'PQ를 그으면 AB의 수직이등분선',
    ],
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        {(Object.keys(labels) as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => {
              setMode(m);
              setStep(0);
            }}
            className={`px-3 py-2 min-h-[44px] rounded-lg text-sm font-semibold ${
              mode === m ? 'bg-blue-600 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
            }`}
          >
            {labels[m]}
          </button>
        ))}
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-900 p-3 rounded-lg flex justify-center">
        <svg viewBox="0 0 300 200" className="w-full max-w-md aspect-square">
          {mode === 'segment' && (
            <>
              <line x1={30} y1={60} x2={110} y2={60} stroke="#1e3a8a" strokeWidth="2.5" />
              <text x={28} y={55} fontSize="11" fill="#1e3a8a">A</text>
              <text x={108} y={55} fontSize="11" fill="#1e3a8a">B</text>
              {step >= 1 && <line x1={30} y1={130} x2={270} y2={130} stroke="#1e3a8a" strokeWidth="1" />}
              {step >= 1 && <circle cx={60} cy={130} r="3" fill="#dc2626" />}
              {step >= 1 && <text x={55} y={148} fontSize="11" fill="#dc2626">C</text>}
              {step >= 2 && <path d={`M ${20} ${130} A 80 80 0 0 1 ${100} ${130}`} fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3" transform="translate(-20)" />}
              {step >= 3 && <circle cx={140} cy={130} r="3" fill="#16a34a" />}
              {step >= 3 && <text x={135} y={148} fontSize="11" fill="#16a34a">D</text>}
              {step >= 3 && <line x1={60} y1={130} x2={140} y2={130} stroke="#16a34a" strokeWidth="2.5" />}
            </>
          )}
          {mode === 'angle' && (
            <>
              <line x1={50} y1={150} x2={150} y2={150} stroke="#1e3a8a" strokeWidth="2" />
              <line x1={50} y1={150} x2={130} y2={70} stroke="#1e3a8a" strokeWidth="2" />
              <text x={42} y={165} fontSize="11" fill="#1e3a8a">O</text>
              {step >= 1 && <path d={`M ${100} ${150} A 50 50 0 0 0 ${85} ${115}`} fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3" />}
              {step >= 2 && <line x1={170} y1={150} x2={270} y2={150} stroke="#1e3a8a" strokeWidth="2" />}
              {step >= 2 && <text x={162} y={165} fontSize="11" fill="#1e3a8a">P</text>}
              {step >= 2 && <path d={`M ${220} ${150} A 50 50 0 0 0 ${205} ${115}`} fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3" />}
              {step >= 3 && <line x1={170} y1={150} x2={250} y2={70} stroke="#16a34a" strokeWidth="2" />}
            </>
          )}
          {mode === 'bisector' && (
            <>
              <line x1={70} y1={120} x2={230} y2={120} stroke="#1e3a8a" strokeWidth="2.5" />
              <text x={62} y={135} fontSize="11" fill="#1e3a8a">A</text>
              <text x={228} y={135} fontSize="11" fill="#1e3a8a">B</text>
              {step >= 1 && <circle cx={70} cy={120} r="100" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3" />}
              {step >= 1 && <circle cx={230} cy={120} r="100" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3" />}
              {step >= 2 && <circle cx={150} cy={60} r="3" fill="#dc2626" />}
              {step >= 2 && <text x={155} y={58} fontSize="11" fill="#dc2626">P</text>}
              {step >= 2 && <circle cx={150} cy={180} r="3" fill="#dc2626" />}
              {step >= 2 && <text x={155} y={196} fontSize="11" fill="#dc2626">Q</text>}
              {step >= 3 && <line x1={150} y1={60} x2={150} y2={180} stroke="#16a34a" strokeWidth="2.5" />}
            </>
          )}
        </svg>
      </div>

      <div className="flex gap-2 justify-between items-center">
        <button
          type="button"
          onClick={() => setStep((s) => (s > 0 ? ((s - 1) as Step) : s))}
          className="px-3 py-2 min-h-[44px] bg-zinc-200 dark:bg-zinc-700 rounded-lg text-sm"
          disabled={step === 0}
        >
          ◀ 이전
        </button>
        <div className="text-sm text-zinc-700 dark:text-zinc-300 text-center flex-1">
          단계 {step + 1} / 4
        </div>
        <button
          type="button"
          onClick={() => setStep((s) => (s < 3 ? ((s + 1) as Step) : s))}
          className="px-3 py-2 min-h-[44px] bg-blue-600 text-white rounded-lg text-sm"
          disabled={step === 3}
        >
          다음 ▶
        </button>
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-800 p-3 rounded-lg text-sm">
        <div className="font-bold text-blue-700 dark:text-blue-400">{stepDescs[mode][step]}</div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg text-sm">
        💡 <strong>합동 조건 SSS·SAS·ASA</strong> — 작도로 만든 두 도형이 같은 측정값을 가지면 합동이에요.
      </div>
    </div>
  );
}
