'use client';

// H-HI-05 조선 사회 변동 — 임진왜란 이후 사회·경제·사상의 변화.
// 자체 정리. 학교 한국사 교과서 일반 합의 수준 기준.

import { useState } from 'react';

interface Topic {
  id: string;
  label: string;
  color: string;
  before: string;
  after: string;
  cause: string;
  examples: string[];
}

const TOPICS: Topic[] = [
  {
    id: 'economy',
    label: '경제 — 농업·상업의 변화',
    color: 'border-emerald-500',
    before: '소규모 자급 농업이 중심이었고, 시장은 5일장 정도. 화폐 사용이 제한적.',
    after: '모내기(이앙법)가 전국으로 퍼지면서 생산력이 크게 늘어남. 광작 농민·임금 노동자가 등장. 상평통보가 전국 화폐로 자리잡음. 송상·만상·내상 같은 거상이 활동.',
    cause: '왜란·호란 이후 토지 부족 → 농업 기술 개선 압력. 대동법 확대로 화폐·상품 유통 활성화.',
    examples: ['이앙법 확산', '대동법 시행(1608~1708)', '상평통보 보급', '광작·도조법'],
  },
  {
    id: 'society',
    label: '사회 — 신분제의 흔들림',
    color: 'border-amber-500',
    before: '양반·중인·상민·천민의 구분이 비교적 강하게 유지됨. 신분 이동이 매우 어려움.',
    after: '재산을 모은 상민이 공명첩을 사거나 족보를 위조해 양반이 되기도 함. 노비종모법(1731), 공노비 해방(1801) 등 신분제가 점차 약화됨.',
    cause: '전쟁으로 호적·토지 대장이 훼손. 정부 재정 부족 → 신분 매매 양성화. 상업 발달로 부유한 평민층 형성.',
    examples: ['공명첩 발급', '노비종모법(1731)', '공노비 해방(1801)', '족보 위조 증가'],
  },
  {
    id: 'thought',
    label: '사상 — 실학과 서학의 등장',
    color: 'border-blue-500',
    before: '성리학 중심의 학문. 명분과 의례를 중시.',
    after: '실생활·국가 운영의 실용적 개혁을 주장하는 실학이 등장. 중농 학파(유형원·이익·정약용), 중상 학파(유수원·박지원·박제가). 천주교(서학)도 들어와 일부 지식층에 퍼짐.',
    cause: '성리학적 명분론으로는 변동하는 현실 문제(토지·신분·재정)를 풀기 어려웠음. 청을 통해 서양 학문이 유입됨.',
    examples: ['반계수록(유형원)', '목민심서·경세유표(정약용)', '열하일기(박지원)', '천주교 박해(신해박해 등)'],
  },
  {
    id: 'politics',
    label: '정치 — 붕당과 세도 정치',
    color: 'border-purple-500',
    before: '여러 붕당이 견제하며 균형을 이루던 시기.',
    after: '17세기 예송 논쟁 등으로 붕당 갈등 격화 → 일당이 권력을 독점하는 환국 정치. 영조·정조의 탕평책 → 19세기 안동 김씨·풍양 조씨 가문이 권력을 독점하는 세도 정치.',
    cause: '왕권이 약해지고 특정 가문이 왕실과 혼인으로 권력을 잡음. 이 시기에 삼정의 문란이 심해짐.',
    examples: ['예송 논쟁(1659·1674)', '영조 탕평책', '정조 규장각', '세도 정치(1800~1863)'],
  },
  {
    id: 'culture',
    label: '문화 — 서민 문화의 등장',
    color: 'border-rose-500',
    before: '양반 중심의 한문학·정형시·궁중 회화가 주류.',
    after: '한글 소설(예: 홍길동전·춘향전)·판소리·탈춤 같은 서민 문화가 활성화. 진경산수화(정선)와 풍속화(김홍도·신윤복)가 발달. 청화 백자가 유행.',
    cause: '상업 발달과 서민층 성장으로 문화 수요가 늘어남. 서당의 보급으로 한글 사용층이 두꺼워짐.',
    examples: ['한글 소설·판소리·탈춤', '진경산수화', '풍속화 (김홍도·신윤복)', '서당 보급'],
  },
];

export function JoseonLateChangesExplorer() {
  const [activeId, setActiveId] = useState('economy');
  const t = TOPICS.find((x) => x.id === activeId)!;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-orange-700 dark:text-orange-400 mb-1">조선 후기 — 5가지 변동</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          영역을 골라서 「전→후」가 어떻게 달라졌는지 비교해 보세요.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {TOPICS.map((topic) => (
          <button
            key={topic.id}
            type="button"
            onClick={() => setActiveId(topic.id)}
            className={`rounded-md border-2 p-2 text-xs text-left transition ${
              activeId === topic.id
                ? `${topic.color} bg-orange-50 dark:bg-orange-950/30`
                : 'border-zinc-200 dark:border-zinc-700'
            }`}
          >
            {topic.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-md border border-zinc-200 dark:border-zinc-700 p-3 space-y-1.5">
          <div className="text-xs font-bold text-zinc-500 dark:text-zinc-400">변동 전 (전기)</div>
          <div className="text-sm">{t.before}</div>
        </div>
        <div className="rounded-md border-2 border-orange-300 dark:border-orange-700 p-3 space-y-1.5 bg-orange-50/50 dark:bg-orange-950/20">
          <div className="text-xs font-bold text-orange-700 dark:text-orange-400">변동 후 (후기)</div>
          <div className="text-sm">{t.after}</div>
        </div>
      </div>

      <div className="rounded-md bg-zinc-50 dark:bg-zinc-800 px-3 py-2 text-xs text-zinc-600 dark:text-zinc-400">
        <strong>원인 흐름</strong> — {t.cause}
      </div>

      <div>
        <div className="text-xs font-bold mb-1.5 text-zinc-700 dark:text-zinc-300">대표 사례</div>
        <ul className="grid grid-cols-2 gap-1.5 text-xs">
          {t.examples.map((e) => (
            <li
              key={e}
              className="rounded-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 px-2 py-1"
            >
              · {e}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-md bg-yellow-50 dark:bg-yellow-950/20 px-3 py-2 text-xs text-yellow-800 dark:text-yellow-200">
        💡 「전기 = 정착, 후기 = 흔들림」으로 외우면 큰 흐름이 잡혀요.
      </div>
    </div>
  );
}
