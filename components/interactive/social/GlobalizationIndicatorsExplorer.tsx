'use client';

// H-IS2-03 세계화·평화 — 세계화 지표와 평화 지수 비교.

import { useState } from 'react';

interface Domain {
  id: string;
  label: string;
  emoji: string;
  positive: string;
  negative: string;
  indicator: string;
}

const DOMAINS: Domain[] = [
  {
    id: 'trade',
    label: '경제(무역·자본)',
    emoji: '🌐',
    positive: '국가 간 분업으로 가격 하락, 다양한 상품 접근 가능, 신흥국의 성장 기회.',
    negative: '특정 산업의 일자리 이전, 외부 충격 전파 속도 증가, 무역 갈등.',
    indicator: 'GDP 대비 무역 비중, 외국인 직접투자(FDI) 규모.',
  },
  {
    id: 'culture',
    label: '문화·미디어',
    emoji: '🎬',
    positive: '음악·영화·음식 등 다양한 문화의 교류와 융합.',
    negative: '소수 문화의 동질화 위험, 문화 정체성 갈등.',
    indicator: '국제 콘텐츠 소비 비율, 다국어 사용 인구 비율.',
  },
  {
    id: 'people',
    label: '사람·이주',
    emoji: '✈️',
    positive: '인재 교류, 다문화 사회의 형성, 송출국 송금을 통한 가족 부양.',
    negative: '두뇌 유출, 이주민 사회 통합 과제, 송환·체류 관련 권리 분쟁.',
    indicator: '국제 이주자 수, 유학생 수, 송금 규모.',
  },
  {
    id: 'env',
    label: '환경·기후',
    emoji: '🌫️',
    positive: '국제 협약을 통한 오존층 회복 사례 등 공동 대응 가능성.',
    negative: '온실가스·해양 오염은 한 국가가 해결할 수 없는 초국경 문제로 부상.',
    indicator: '온실가스 배출량, 미세먼지 농도, 국제 기후 협약 가입 수.',
  },
  {
    id: 'security',
    label: '안보·평화',
    emoji: '🕊️',
    positive: '국제기구를 통한 분쟁 중재, 무역으로 인한 상호 의존이 갈등 비용을 높임.',
    negative: '사이버 공격, 테러, 첨단 무기 확산은 국경을 쉽게 넘음.',
    indicator: '글로벌 평화 지수(GPI), 무력 분쟁 발생 건수.',
  },
];

export function GlobalizationIndicatorsExplorer() {
  const [active, setActive] = useState('trade');
  const cur = DOMAINS.find((d) => d.id === active)!;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-orange-700 dark:text-orange-400 mb-1">세계화 5영역</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          세계화는 좋은 것도 나쁜 것도 아니에요. 영역마다 <strong>혜택과 비용</strong>이 다르게 나타나요.
        </p>
      </div>

      <div className="grid grid-cols-5 gap-1">
        {DOMAINS.map((d) => (
          <button
            key={d.id}
            type="button"
            onClick={() => setActive(d.id)}
            className={`px-1 py-2 text-[11px] rounded-md border min-h-[60px] ${
              active === d.id
                ? 'bg-orange-50 dark:bg-orange-950/30 border-orange-500 ring-2 ring-orange-300 font-bold'
                : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700'
            }`}
          >
            <div className="text-2xl">{d.emoji}</div>
            <div className="mt-0.5 leading-tight">{d.label}</div>
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-orange-50 dark:bg-orange-950/30 border-l-4 border-orange-500 p-4 space-y-2">
        <div className="text-lg font-bold text-orange-800 dark:text-orange-300">
          {cur.emoji} {cur.label}
        </div>
        <div className="rounded-md bg-green-50 dark:bg-green-950/20 px-3 py-2 text-xs text-green-700 dark:text-green-300">
          ➕ <strong>주요 혜택</strong> — {cur.positive}
        </div>
        <div className="rounded-md bg-orange-50 dark:bg-orange-950/20 px-3 py-2 text-xs text-orange-700 dark:text-orange-300">
          ➖ <strong>주요 비용</strong> — {cur.negative}
        </div>
        <div className="rounded-md bg-white dark:bg-zinc-900 px-3 py-2 text-xs text-zinc-700 dark:text-zinc-300">
          📊 <strong>관련 지표</strong> — {cur.indicator}
        </div>
      </div>

      <div className="rounded-md bg-zinc-50 dark:bg-zinc-800 px-3 py-2 text-xs text-zinc-600 dark:text-zinc-400">
        🎯 세계화에 대한 평가는 영역별·집단별로 갈려요. 어느 한 면만 보고 "찬성/반대"를 결론짓지 않는 게 핵심.
      </div>
    </div>
  );
}
