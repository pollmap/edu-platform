'use client';

// K-RD-03 추론·비판적 읽기 — 단서/배경지식 → 추론 → 검증 단계 시각화.
// 저작권: 실제 글 인용 X. 일반화된 예시 시나리오만.

import { useState } from 'react';

interface Scenario {
  id: string;
  topic: string;
  clue: string;
  background: string;
  inference: string;
  check: string;
  caution: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 'rain',
    topic: '비가 왔던 흔적',
    clue: '글에 "길이 젖어 있고 우산을 든 사람들이 보였다" 라고 나왔어요.',
    background: '비가 오면 길이 젖고 사람들이 우산을 써요.',
    inference: '조금 전에 비가 내렸겠다.',
    check: '글 뒤쪽에 "하늘이 맑게 갠 직후" 같은 표현이 나오면 추론이 맞아요.',
    caution: '"길이 젖어 있다"는 살수차나 청소 때문일 수도 있어요. 한 가지 단서만 믿지 말고 추가 단서를 찾아야 해요.',
  },
  {
    id: 'mood',
    topic: '인물의 속마음',
    clue: '"창밖만 바라보며 한참을 말이 없었다" 라는 문장.',
    background: '말없이 창밖을 바라보는 것은 보통 슬픔·고민·기다림의 신호예요.',
    inference: '인물은 무언가 마음에 걸리는 일이 있다.',
    check: '바로 앞 장면에서 안 좋은 소식을 들었다거나, 누군가를 기다린다는 정보가 있으면 확정.',
    caution: '단순히 풍경에 감탄해서 그랬을 수도 있어요. 앞뒤 문맥을 같이 봐야 해요.',
  },
  {
    id: 'argument',
    topic: '주장의 숨은 전제',
    clue: '"청소년에게 휴대폰을 주면 안 된다" 라는 주장.',
    background: '주장에는 보통 숨은 전제가 있어요(휴대폰 = 해롭다).',
    inference: '글쓴이는 휴대폰이 청소년에게 해롭다고 믿고 있다.',
    check: '본론에서 "왜 해로운지" 근거가 나오는지 확인.',
    caution: '근거가 부족하거나, 이득은 무시한 채 단점만 말한다면 비판적으로 의심해야 해요.',
  },
  {
    id: 'ad',
    topic: '광고 문구의 의도',
    clue: '"10명 중 9명이 만족!" 이라는 광고 카피.',
    background: '숫자는 객관적으로 보이지만 표본이 누구인지 모르면 신뢰할 수 없어요.',
    inference: '광고주는 제품이 매우 좋다고 믿게 만들고 싶어 한다.',
    check: '"누구를 대상으로 한 조사인가? 표본 수는?" 출처를 따져야 해요.',
    caution: '회사가 자기 고객만 대상으로 조사했다면 만족도가 부풀려질 수 있어요. 비판적 시선 필수.',
  },
];

const STEPS = [
  { id: 'clue', label: '① 단서', color: 'red' },
  { id: 'background', label: '② 배경지식', color: 'amber' },
  { id: 'inference', label: '③ 추론', color: 'red' },
  { id: 'check', label: '④ 확인', color: 'green' },
  { id: 'caution', label: '⑤ 비판적 점검', color: 'rose' },
] as const;

type StepId = (typeof STEPS)[number]['id'];

export function InferenceStepsExplorer() {
  const [scenarioId, setScenarioId] = useState(SCENARIOS[0].id);
  const [step, setStep] = useState<StepId>('clue');

  const scenario = SCENARIOS.find((s) => s.id === scenarioId)!;
  const stepText = scenario[step];

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-1">
          추론은 단서 + 배경지식으로 만들어요
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          글에 직접 쓰여 있지 않아도 <strong>단서</strong>를 찾고 <strong>배경지식</strong>을 더하면 글쓴이의 숨은 뜻을 알 수 있어요. 항상 마지막엔 <strong>비판적 점검</strong>까지.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {SCENARIOS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => {
              setScenarioId(s.id);
              setStep('clue');
            }}
            className={`px-3 py-2 text-xs rounded-md border min-h-[44px] text-left ${
              scenarioId === s.id
                ? 'bg-red-50 dark:bg-red-950/30 border-red-500 ring-2 ring-red-300 font-bold'
                : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800'
            }`}
          >
            {s.topic}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-1.5">
        {STEPS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setStep(s.id)}
            className={`px-1 py-2 text-[11px] rounded-md border min-h-[44px] ${
              step === s.id
                ? 'bg-red-50 dark:bg-red-950/30 border-red-500 ring-2 ring-red-300 font-bold'
                : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500 p-4 space-y-2">
        <div className="text-sm font-bold text-red-800 dark:text-red-300">
          {STEPS.find((s) => s.id === step)?.label} — {scenario.topic}
        </div>
        <p className="text-sm text-zinc-700 dark:text-zinc-300">{stepText}</p>
      </div>

      <div className="rounded-lg bg-zinc-50 dark:bg-zinc-950/40 p-3 text-xs text-zinc-600 dark:text-zinc-400">
        추론은 <strong>증거 기반 짐작</strong>이지 상상이 아니에요. 비판적 읽기는 "이 추론이 맞는가?" 한 번 더 묻는 습관이에요.
      </div>
    </div>
  );
}
