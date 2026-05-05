'use client';

// K-GR-07 높임법·시제·피동·사동 — 변환 시뮬레이터.

import { useState } from 'react';

type Topic = '높임' | '시제' | '피동' | '사동';

const TOPICS: Record<Topic, {
  desc: string;
  pairs: { label: string; from: string; to: string; note: string }[];
}> = {
  높임: {
    desc: '말하는 대상을 높이거나 듣는 사람을 공손히 대할 때 형태가 바뀌어요.',
    pairs: [
      { label: '주체 높임', from: '할아버지가 잔다.', to: '할아버지께서 주무신다.', note: '주어를 높임. 조사 께서 + 동사에 시-' },
      { label: '객체 높임', from: '아이가 선생님에게 책을 줬다.', to: '아이가 선생님께 책을 드렸다.', note: '목적어/부사어 대상을 높임. 께 + 드리다·여쭙다·뵙다' },
      { label: '상대 높임', from: '먹어.', to: '드세요. / 잡수십시오.', note: '듣는 사람을 높임. 종결 어미로 등급 조절' },
    ],
  },
  시제: {
    desc: '일이 일어난 때(과거·현재·미래)를 어미로 표시해요.',
    pairs: [
      { label: '과거', from: '나는 책을 읽다.', to: '나는 책을 읽었다.', note: '-았/었- 또는 -았었/었었-' },
      { label: '현재', from: '비가 오겠다.', to: '비가 온다. / 비가 오는 중이다.', note: '-는/ㄴ-, 진행은 -고 있다' },
      { label: '미래', from: '내일 만나.', to: '내일 만나겠다. / 내일 만날 것이다.', note: '-겠-, -(으)ㄹ 것이다' },
    ],
  },
  피동: {
    desc: '주어가 다른 힘에 의해 동작을 당할 때 써요.',
    pairs: [
      { label: '능동 → 피동', from: '경찰이 도둑을 잡았다.', to: '도둑이 경찰에게 잡혔다.', note: '주어와 목적어가 자리를 바꾸고, 동사에 -이/히/리/기-' },
      { label: '능동 → 피동', from: '바람이 문을 닫았다.', to: '문이 바람에 닫혔다.', note: '-히-' },
      { label: '~되다 형태', from: '학교가 공사를 했다.', to: '공사가 진행되었다.', note: '-되다/-받다/-당하다 도 피동 표현' },
    ],
  },
  사동: {
    desc: '남에게 어떤 동작을 하게 시킬 때 써요.',
    pairs: [
      { label: '주동 → 사동', from: '아기가 옷을 입다.', to: '엄마가 아기에게 옷을 입혔다.', note: '시키는 사람이 주어, 동사에 -이/히/리/기/우/구/추-' },
      { label: '주동 → 사동', from: '얼음이 녹다.', to: '햇빛이 얼음을 녹였다.', note: '-이-' },
      { label: '~게 하다 형태', from: '동생이 공부한다.', to: '엄마가 동생을 공부하게 한다.', note: '-게 하다 도 사동 표현' },
    ],
  },
};

const TOPIC_LIST: Topic[] = ['높임', '시제', '피동', '사동'];

export function HonorificTenseExplorer() {
  const [topic, setTopic] = useState<Topic>('높임');
  const data = TOPICS[topic];

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-1">문법 변환기</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          한국어는 같은 의미라도 <strong>높임·시제·피동·사동</strong>에 따라 형태가 달라져요. 네 가지 변환을 비교해 보아요.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {TOPIC_LIST.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTopic(t)}
            className={`px-3 py-3 border rounded-md text-sm min-h-[44px] ${
              topic === t
                ? 'border-red-600 bg-red-50 dark:bg-red-900/40 text-red-700 dark:text-red-300 font-semibold'
                : 'border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <p className="text-sm text-zinc-700 dark:text-zinc-300 px-1">{data.desc}</p>

      <div className="space-y-3">
        {data.pairs.map((p, i) => (
          <div key={i} className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 bg-zinc-50 dark:bg-zinc-950/40">
            <p className="text-xs font-semibold text-red-700 dark:text-red-400 mb-2">{p.label}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-stretch">
              <div className="rounded-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3">
                <p className="text-xs text-zinc-500 mb-1">변환 전</p>
                <p className="text-sm">{p.from}</p>
              </div>
              <div className="rounded-md bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 p-3">
                <p className="text-xs text-red-600 dark:text-red-400 mb-1">변환 후</p>
                <p className="text-sm font-semibold">{p.to}</p>
              </div>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2"><strong>규칙:</strong> {p.note}</p>
          </div>
        ))}
      </div>

      <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3 text-sm">
        <p className="font-semibold text-red-800 dark:text-red-300 mb-1">자주 헷갈리는 점</p>
        <ul className="list-disc pl-5 space-y-0.5 text-red-900 dark:text-red-200">
          <li>피동과 사동 어미는 -이/히/리/기- 가 겹쳐 보여요. <strong>의미</strong>로 구별: 당하면 피동, 시키면 사동.</li>
          <li>이중 피동(잡혀지다·놓여지다)은 어색한 문장. <strong>잡히다·놓이다</strong>로 충분.</li>
          <li>주체 높임 -시-는 동사에, 객체 높임은 어휘 자체(드리다·여쭙다)로 표현.</li>
        </ul>
      </div>
    </div>
  );
}
