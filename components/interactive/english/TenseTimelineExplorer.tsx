'use client';

import { useState } from 'react';

type Time = 'past' | 'present' | 'future';
type Aspect = 'simple' | 'continuous' | 'perfect' | 'perfect-continuous';

interface TenseInfo {
  time: Time;
  aspect: Aspect;
  name: string;
  formula: string;
  example: string;
  meaning: string;
}

const ROW_LABEL: Record<Aspect, string> = {
  simple: '단순 (Simple)',
  continuous: '진행 (Continuous)',
  perfect: '완료 (Perfect)',
  'perfect-continuous': '완료진행 (Perfect Continuous)',
};

const COL_LABEL: Record<Time, string> = {
  past: '과거 (Past)',
  present: '현재 (Present)',
  future: '미래 (Future)',
};

const TENSES: TenseInfo[] = [
  { time: 'past', aspect: 'simple', name: 'Simple Past', formula: 'V-ed', example: 'I studied.', meaning: '과거에 끝난 일' },
  { time: 'present', aspect: 'simple', name: 'Simple Present', formula: 'V / V-s', example: 'I study.', meaning: '습관·일반 사실' },
  { time: 'future', aspect: 'simple', name: 'Simple Future', formula: 'will V', example: 'I will study.', meaning: '미래의 의지·예측' },
  { time: 'past', aspect: 'continuous', name: 'Past Continuous', formula: 'was/were V-ing', example: 'I was studying.', meaning: '과거의 한 시점에 진행 중' },
  { time: 'present', aspect: 'continuous', name: 'Present Continuous', formula: 'am/is/are V-ing', example: 'I am studying.', meaning: '지금 진행 중' },
  { time: 'future', aspect: 'continuous', name: 'Future Continuous', formula: 'will be V-ing', example: 'I will be studying.', meaning: '미래 한 시점에 진행 중' },
  { time: 'past', aspect: 'perfect', name: 'Past Perfect', formula: 'had V-ed', example: 'I had studied.', meaning: '과거 어느 시점 이전 완료' },
  { time: 'present', aspect: 'perfect', name: 'Present Perfect', formula: 'have/has V-ed', example: 'I have studied.', meaning: '과거~현재 영향' },
  { time: 'future', aspect: 'perfect', name: 'Future Perfect', formula: 'will have V-ed', example: 'I will have studied.', meaning: '미래 시점 전 완료' },
  { time: 'past', aspect: 'perfect-continuous', name: 'Past Perfect Continuous', formula: 'had been V-ing', example: 'I had been studying.', meaning: '과거 시점까지 계속' },
  { time: 'present', aspect: 'perfect-continuous', name: 'Present Perfect Continuous', formula: 'have/has been V-ing', example: 'I have been studying.', meaning: '과거~현재 계속' },
  { time: 'future', aspect: 'perfect-continuous', name: 'Future Perfect Continuous', formula: 'will have been V-ing', example: 'I will have been studying.', meaning: '미래 시점까지 계속' },
];

const TIMES: Time[] = ['past', 'present', 'future'];
const ASPECTS: Aspect[] = ['simple', 'continuous', 'perfect', 'perfect-continuous'];

export function TenseTimelineExplorer() {
  const [selected, setSelected] = useState<TenseInfo>(TENSES[1]);

  const speak = (text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    window.speechSynthesis.speak(u);
  };

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800">
      <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-1">
        영어 12 시제 매트릭스
      </h2>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
        시간(과거·현재·미래) × 상(단순·진행·완료·완료진행) = 12 시제. 칸을 누르면 예문과 의미가 보여요.
      </p>

      <div className="overflow-x-auto mb-6">
        <table className="w-full border-collapse min-w-[480px]">
          <thead>
            <tr>
              <th className="text-xs text-zinc-500 dark:text-zinc-400 p-2"></th>
              {TIMES.map((t) => (
                <th key={t} className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 p-2 border-b border-zinc-200 dark:border-zinc-800">
                  {COL_LABEL[t]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ASPECTS.map((a) => (
              <tr key={a}>
                <th className="text-xs text-zinc-500 dark:text-zinc-400 text-left p-2 whitespace-nowrap">
                  {ROW_LABEL[a]}
                </th>
                {TIMES.map((t) => {
                  const tense = TENSES.find((x) => x.time === t && x.aspect === a)!;
                  const isSel = selected === tense;
                  return (
                    <td key={t} className="p-1">
                      <button
                        type="button"
                        onClick={() => setSelected(tense)}
                        aria-pressed={isSel}
                        className={`w-full min-h-[44px] p-2 rounded-md border text-xs font-mono transition ${
                          isSel
                            ? 'bg-purple-600 text-white border-purple-700'
                            : 'bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 hover:border-purple-500'
                        }`}
                      >
                        {tense.formula}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <article className="rounded-xl bg-purple-50 dark:bg-purple-950/30 border-l-4 border-purple-500 p-5 space-y-3">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{selected.name}</h3>
        <p className="text-sm text-zinc-700 dark:text-zinc-300">{selected.meaning}</p>
        <div className="flex items-center gap-3">
          <p className="font-mono text-zinc-900 dark:text-zinc-100">{selected.example}</p>
          <button
            type="button"
            onClick={() => speak(selected.example)}
            className="px-3 py-1.5 text-xs border border-purple-500 text-purple-700 dark:text-purple-300 rounded-md hover:bg-purple-100 dark:hover:bg-purple-900 min-h-[44px]"
            aria-label="예문 음성으로 듣기"
          >
            ▶ 듣기
          </button>
        </div>
        <p className="text-xs font-mono text-zinc-500 dark:text-zinc-500">
          공식: {selected.formula}
        </p>
      </article>

      <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-500">
        음성: 브라우저 Web Speech API (Chrome/Safari/Edge 지원).
      </p>
    </div>
  );
}
