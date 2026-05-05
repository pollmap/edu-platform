'use client';

// H-EP 윤리문제 탐구 — 윤리 딜레마 시뮬레이터.
// 의무론 / 공리주의 / 덕윤리 세 관점으로 동일 사례를 비교한다.

import { useState } from 'react';

type Lens = 'deontology' | 'utility' | 'virtue';

interface Dilemma {
  id: string;
  title: string;
  context: string;
  question: string;
  views: Record<Lens, { stance: string; reasoning: string; risk: string }>;
}

const DILEMMAS: Dilemma[] = [
  {
    id: 'self-driving',
    title: '자율주행차의 충돌 회피 알고리즘',
    context: '브레이크 고장. 직진하면 보행자 5명, 핸들을 꺾으면 운전자 1명이 위험. AI는 어떤 우선순위로 판단해야 할까?',
    question: '운전자를 희생해 5명을 살리도록 프로그래밍하는 것은 정당한가?',
    views: {
      deontology: {
        stance: '운전자를 의도적으로 희생시키는 결정은 인간을 수단으로 삼는 것에 가까워 정당화하기 어렵다.',
        reasoning: '"보편 법칙으로 정해도 좋은 행위인가?"를 묻는 칸트의 정언명령 관점에서, 한 사람의 생명을 다수의 효용을 위해 도구화하는 규칙은 보편화하기 어렵다.',
        risk: '결과적으로 5명이 죽을 수 있다. 「최선의 결과」 자체를 정의하지 않는다는 비판.',
      },
      utility: {
        stance: '5명을 살리는 선택이 산출되는 총 효용이 크므로 정당하다.',
        reasoning: '벤담·밀의 공리주의 — 행위의 옳음은 결과의 총 행복으로 결정. 1명 < 5명이라는 단순 셈이 출발점.',
        risk: '소수자 권리·생명권을 다수의 이익으로 환원할 수 있다는 위험. 누가 「가치」를 매기는가?',
      },
      virtue: {
        stance: '미리 정해진 답보다, 「책임 있는 운전자·시민」이라면 어떤 규칙을 받아들일지가 핵심.',
        reasoning: '아리스토텔레스의 덕윤리 — 좋은 성격(prudence·정의·용기)을 가진 사람의 판단을 기준으로. 사회적 합의·투명성도 덕의 일부.',
        risk: '구체적 답이 모호하다는 비판. 어떤 「유덕한 사람」을 기준으로 삼을지 사회마다 다름.',
      },
    },
  },
  {
    id: 'ai-hiring',
    title: 'AI 채용 면접의 편향',
    context: '회사가 AI로 이력서를 1차 필터링. 학습 데이터에 과거 편향(예: 특정 성별·학력 선호)이 들어 있을 수 있다.',
    question: '효율적이지만 편향 가능성이 있는 AI 채용을 도입해도 되는가?',
    views: {
      deontology: {
        stance: '지원자를 동등하게 대우할 의무가 있으므로 편향이 검증되지 않은 시스템은 사용해선 안 된다.',
        reasoning: '인간의 존엄과 동등한 대우는 결과와 무관한 의무. 알고리즘이 차별을 「가린다」면 더 큰 문제.',
        risk: '극단적 적용 시 모든 자동화 거부 → 효율 저하·비용 증가.',
      },
      utility: {
        stance: '편향을 모니터링·교정한다는 전제 하에, 채용 효율 증가 → 전체 효용 증가.',
        reasoning: '기업·지원자·사회 전체의 시간·비용 감소가 산출되는 총 효용.',
        risk: '소수 집단이 받는 차별 비용이 「총합」 안에 가려질 수 있다.',
      },
      virtue: {
        stance: '"공정한 채용 담당자라면 어떻게 할까?" — 투명성·설명 가능성·이의 제기 절차를 갖추는 것이 덕.',
        reasoning: 'AI는 도구. 책임은 그것을 쓰는 사람·조직의 성격(integrity)에 있다.',
        risk: '실무적 가이드가 모호. 조직마다 「유덕한 운영」의 기준이 다름.',
      },
    },
  },
  {
    id: 'whistleblower',
    title: '내부 고발과 충성',
    context: '내가 다니는 회사가 환경 규제를 위반하고 있다는 사실을 알게 됐다. 신고하면 회사는 큰 타격, 동료들은 일자리를 잃을 수 있다.',
    question: '회사에 대한 충성과 사회적 책임 중 무엇이 우선인가?',
    views: {
      deontology: {
        stance: '거짓·해악을 묵인하지 않을 의무가 우선이다. 신고는 정당화된다.',
        reasoning: '진실 의무·시민 일반에 대한 의무는 특정 조직에 대한 의무보다 더 보편적.',
        risk: '동료의 일자리·생계라는 구체적 피해를 충분히 다루지 못함.',
      },
      utility: {
        stance: '환경 피해의 규모와 신고로 인한 피해를 견주어 결정. 보통 환경·공중보건 피해가 더 광범위.',
        reasoning: '단기적으로 회사·동료 손해, 장기적으로 사회·미래 세대 이익이 큼.',
        risk: '계산이 어렵거나 결과가 불확실할 때 결정이 흔들림.',
      },
      virtue: {
        stance: '용기·정직·정의의 균형. 절차(내부 보고 → 외부 고발)를 거치는 것이 덕에 가깝다.',
        reasoning: '한쪽의 극단(맹목적 충성 vs 무차별 폭로) 모두 덕에서 멀어진다.',
        risk: '"적절한 절차"의 기준이 사람마다 다르며, 보복으로부터 개인을 보호할 제도가 함께 필요.',
      },
    },
  },
];

const LENS_LABEL: Record<Lens, string> = {
  deontology: '의무론 (칸트)',
  utility: '공리주의 (벤담·밀)',
  virtue: '덕윤리 (아리스토텔레스)',
};

const LENS_COLOR: Record<Lens, string> = {
  deontology: 'bg-blue-600',
  utility: 'bg-emerald-600',
  virtue: 'bg-amber-600',
};

export function EthicsDilemmaSimulator() {
  const [dilemmaId, setDilemmaId] = useState(DILEMMAS[0].id);
  const [lens, setLens] = useState<Lens>('deontology');

  const dilemma = DILEMMAS.find((d) => d.id === dilemmaId) ?? DILEMMAS[0];
  const view = dilemma.views[lens];

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900/40">
        <p className="mb-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400">사례 선택</p>
        <div className="flex flex-wrap gap-2">
          {DILEMMAS.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setDilemmaId(d.id)}
              className={`min-h-11 rounded-md px-3 py-2 text-sm font-medium transition ${
                dilemmaId === d.id
                  ? 'bg-orange-600 text-white'
                  : 'bg-white text-zinc-700 hover:bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              {d.title}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="mb-2 text-base font-bold">{dilemma.title}</h3>
        <p className="mb-2 text-sm text-zinc-600 dark:text-zinc-400">{dilemma.context}</p>
        <p className="text-sm font-semibold text-orange-700 dark:text-orange-400">Q. {dilemma.question}</p>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <p className="mb-3 text-xs font-semibold text-zinc-500 dark:text-zinc-400">관점 전환</p>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(LENS_LABEL) as Lens[]).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLens(l)}
              className={`min-h-11 rounded-md px-3 py-2 text-sm font-semibold transition ${
                lens === l
                  ? `${LENS_COLOR[l]} text-white`
                  : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              {LENS_LABEL[l]}
            </button>
          ))}
        </div>

        <div className="mt-4 space-y-3 text-sm">
          <div>
            <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">입장</p>
            <p className="font-medium">{view.stance}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">근거</p>
            <p className="text-zinc-700 dark:text-zinc-300">{view.reasoning}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">한계·반론</p>
            <p className="text-zinc-700 dark:text-zinc-300">{view.risk}</p>
          </div>
        </div>
      </div>

      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        ※ 어느 한 입장이 「정답」은 아니에요. 각 관점이 무엇을 잘 보고 무엇을 놓치는지 비교하는 것이 윤리 탐구예요.
      </p>
    </div>
  );
}
