'use client';

// K-LT-04 시점 — 1인칭 주인공/관찰자 + 3인칭 관찰자/전지적 4종 비교.
// 저작권: 실제 소설 인용 X. 같은 추상 사건을 4 시점으로 직접 다시 쓴 짧은 자작 문장만.

import { useState } from 'react';

interface Perspective {
  id: string;
  label: string;
  short: string;
  range: string;
  pros: string;
  cons: string;
  paraphrase: string;
}

const PERSPECTIVES: Perspective[] = [
  {
    id: '1st-main',
    label: '1인칭 주인공 시점',
    short: '"나"가 직접 겪은 일을 말함',
    range: '나의 안 + 내가 본 바깥',
    pros: '심리 묘사 깊고 친밀해요',
    cons: '내가 모르는 일은 못 보여줘요',
    paraphrase:
      '나는 문 앞에서 한참 망설였다. 마음이 쿵쾅거렸다. 결국 손잡이를 돌렸지만 누가 안에 있는지 알 수 없었다.',
  },
  {
    id: '1st-observer',
    label: '1인칭 관찰자 시점',
    short: '"나"가 옆에서 다른 인물을 관찰',
    range: '내가 본 것 + 추측',
    pros: '주인공을 객관적으로 보여줄 수 있어요',
    cons: '주인공 마음은 추측만 가능',
    paraphrase:
      '나는 옆에서 그가 문 앞에 한참 서 있는 모습을 보았다. 표정이 굳어 있었다. 무엇을 망설이는지는 알 수 없었지만 손이 떨리는 게 보였다.',
  },
  {
    id: '3rd-observer',
    label: '3인칭 관찰자 시점',
    short: '카메라처럼 바깥에서 묘사',
    range: '겉으로 보이는 행동·말만',
    pros: '독자가 직접 해석하게 함, 객관적',
    cons: '인물의 속마음을 모름',
    paraphrase:
      '그는 문 앞에 한참 서 있었다. 손잡이에 손을 얹었다가 다시 거두었다. 마침내 문이 열렸다.',
  },
  {
    id: '3rd-omni',
    label: '3인칭 전지적 시점',
    short: '신처럼 모든 인물의 속을 다 앎',
    range: '모든 인물의 안 + 바깥',
    pros: '여러 인물의 마음을 자유롭게',
    cons: '몰입도가 흐려질 수 있음',
    paraphrase:
      '그는 문 앞에서 두려움에 사로잡혔다. 동시에 안에 있던 그녀는 누가 올지 몰라 숨을 죽였다. 두 사람의 심장이 같은 박자로 뛰었다.',
  },
];

export function NarratorPerspectiveExplorer() {
  const [activeId, setActiveId] = useState(PERSPECTIVES[0].id);
  const cur = PERSPECTIVES.find((p) => p.id === activeId)!;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-1">
          누가 이야기하느냐가 이야기를 바꾼다
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          같은 사건도 시점이 바뀌면 보이는 것·숨는 것이 달라져요. 아래 같은 장면을 4가지 시점으로 다시 써 봤어요.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {PERSPECTIVES.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setActiveId(p.id)}
            className={`px-2 py-3 text-xs rounded-md border min-h-[60px] text-left ${
              activeId === p.id
                ? 'bg-red-50 dark:bg-red-950/30 border-red-500 ring-2 ring-red-300 font-bold'
                : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border-2 border-zinc-200 dark:border-zinc-800 p-4 space-y-1">
        <div className="text-xs font-bold text-zinc-500 dark:text-zinc-400">같은 장면, 다른 시점</div>
        <p className="text-sm text-zinc-800 dark:text-zinc-200 italic leading-relaxed">{cur.paraphrase}</p>
      </div>

      <div className="rounded-xl bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500 p-4 space-y-2">
        <div className="text-base font-bold text-red-800 dark:text-red-300">{cur.label}</div>
        <p className="text-sm text-zinc-700 dark:text-zinc-300">{cur.short}</p>
        <dl className="text-xs text-zinc-700 dark:text-zinc-300 space-y-1 pt-1 border-t border-red-200 dark:border-red-900">
          <div><dt className="inline font-bold">시야: </dt><dd className="inline">{cur.range}</dd></div>
          <div><dt className="inline font-bold text-green-700 dark:text-green-400">장점: </dt><dd className="inline">{cur.pros}</dd></div>
          <div><dt className="inline font-bold text-amber-700 dark:text-amber-400">단점: </dt><dd className="inline">{cur.cons}</dd></div>
        </dl>
      </div>

      <div className="rounded-lg bg-zinc-50 dark:bg-zinc-950/40 p-3 text-xs text-zinc-600 dark:text-zinc-400">
        <strong>판별법:</strong> "나"가 나오면 1인칭, 안 나오면 3인칭. "나"가 주인공이면 주인공 시점, 옆에서 보면 관찰자. 3인칭 + 모든 인물 마음 = 전지적.
      </div>
    </div>
  );
}
