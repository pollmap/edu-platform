'use client';

// H-SC 사회와 문화 — 사회구조·계층·매스미디어 인터랙티브.
// 자체 정리. 학계 일반 합의 수준의 개념 위주, 정치 중립.

import { useState } from 'react';

interface Layer {
  id: string;
  label: string;
  share: number; // 가상의 분포 (총 100)
  color: string;
  description: string;
  example: string;
}

interface Theory {
  id: string;
  name: string;
  view: string;
  critique: string;
}

const LAYERS: Layer[] = [
  {
    id: 'upper',
    label: '상층',
    share: 10,
    color: 'bg-rose-600',
    description: '경제적 자원·문화 자본·사회적 네트워크가 풍부한 층.',
    example: '대기업 경영진, 고소득 전문직, 자본 소득자.',
  },
  {
    id: 'upper-middle',
    label: '중상층',
    share: 25,
    color: 'bg-amber-500',
    description: '전문적인 직무를 수행하며 안정적 소득을 가진 층.',
    example: '의사·변호사·교수 등 전문직, 중간 관리자.',
  },
  {
    id: 'middle',
    label: '중간층',
    share: 35,
    color: 'bg-emerald-500',
    description: '사무·기술직 중심으로 평균적 소득과 자산을 가진 층.',
    example: '일반 회사원, 공무원, 자영업자 일부.',
  },
  {
    id: 'lower-middle',
    label: '중하층',
    share: 20,
    color: 'bg-sky-500',
    description: '저숙련 노동을 주로 하며 가계 재정이 빠듯한 층.',
    example: '서비스직, 비정규직 일부, 소상공인 일부.',
  },
  {
    id: 'lower',
    label: '하층',
    share: 10,
    color: 'bg-purple-600',
    description: '소득이 낮고 사회 안전망 의존도가 높은 층.',
    example: '실업자, 저임금 단순 노동자, 빈곤 가구.',
  },
];

const THEORIES: Theory[] = [
  {
    id: 'functional',
    name: '기능론',
    view: '계층은 사회의 기능 수행을 위해 사람들에게 다른 자리·다른 보상을 분배하는 시스템이라고 봄. 어려운 일·중요한 일에 더 큰 보상을 주는 것이 사회 전체의 효율을 높인다는 설명.',
    critique: '실제 보상이 「어려움·중요성」과 일치하는지, 그리고 이미 가진 자원이 다음 세대에 그대로 이어지는 「귀속」 문제를 잘 설명하지 못함.',
  },
  {
    id: 'conflict',
    name: '갈등론',
    view: '계층은 「자원·권력의 불균등 분배」 그 자체이며, 가진 사람이 자기 위치를 유지하려는 구조적 결과라고 봄. 보상 차이는 합리적 분배가 아니라 권력 차이의 반영.',
    critique: '갈등만 강조하면 사람들이 협력하는 측면, 사회 통합이 이뤄지는 메커니즘을 충분히 설명하기 어려움.',
  },
  {
    id: 'symbolic',
    name: '상호작용론',
    view: '계층은 사람들 사이의 일상 상호작용·기호·의미 부여 속에서 만들어지고 유지된다고 봄. 옷차림·말투·취향 같은 「구별 짓기」가 작동.',
    critique: '거시적인 경제 구조나 권력 분포 같은 큰 그림을 다루기에는 시야가 좁다는 지적이 있음.',
  },
];

const MEDIA_VIEWS = [
  {
    id: 'agenda',
    label: '의제 설정',
    body: '미디어가 「무엇을 다루느냐」가 사람들이 「무엇을 중요하게 여기느냐」에 영향을 미친다는 관점.',
  },
  {
    id: 'frame',
    label: '프레이밍',
    body: '같은 사실도 「어떤 틀로 보여주느냐」에 따라 받아들이는 의미가 달라진다는 관점.',
  },
  {
    id: 'two-step',
    label: '2단계 흐름',
    body: '미디어 → 의견 지도자 → 일반 수용자로 흐른다는 관점. SNS 시대에는 인플루언서가 그 역할을 함.',
  },
  {
    id: 'critical',
    label: '비판적 수용',
    body: '미디어를 그냥 받아들이지 않고 「누가 만들었나·무엇을 빠뜨렸나·어떤 효과를 노리나」를 따져 보는 자세.',
  },
];

type Tab = 'structure' | 'class' | 'media';

export function SocialStratificationExplorer() {
  const [tab, setTab] = useState<Tab>('class');
  const [layerId, setLayerId] = useState('middle');
  const [theoryId, setTheoryId] = useState('functional');
  const [mediaId, setMediaId] = useState('agenda');

  const layer = LAYERS.find((l) => l.id === layerId)!;
  const theory = THEORIES.find((t) => t.id === theoryId)!;
  const media = MEDIA_VIEWS.find((m) => m.id === mediaId)!;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-orange-700 dark:text-orange-400 mb-1">사회와 문화 — 3 입구</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          ① 사회 구조와 계층 ② 계층을 보는 이론 ③ 미디어와 사회 — 3개 탭으로 보세요.
        </p>
      </div>

      <div className="flex gap-2">
        {(['structure', 'class', 'media'] as Tab[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`flex-1 rounded-md border px-3 py-2 text-xs ${
              tab === t
                ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-400 font-bold'
                : 'border-zinc-200 dark:border-zinc-700'
            }`}
          >
            {t === 'structure' ? '① 계층 분포' : t === 'class' ? '② 이론 비교' : '③ 미디어'}
          </button>
        ))}
      </div>

      {tab === 'structure' && (
        <div className="space-y-3">
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            가상의 사회 분포 막대(피라미드)예요. 실제 통계가 아니라 「계층이 어떻게 펼쳐져 있나」를 감 잡기 위한 시뮬레이션.
          </p>
          <div className="space-y-1.5">
            {LAYERS.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => setLayerId(l.id)}
                className={`w-full text-left text-xs rounded-md border p-2 ${
                  layerId === l.id ? 'border-orange-500' : 'border-zinc-200 dark:border-zinc-700'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold w-14 shrink-0">{l.label}</span>
                  <span className="text-zinc-500 dark:text-zinc-400">{l.share}%</span>
                </div>
                <div
                  className={`${l.color} h-3 rounded-sm`}
                  style={{ width: `${l.share * 2.5}%` }}
                />
              </button>
            ))}
          </div>
          <div className="rounded-xl bg-orange-50 dark:bg-orange-950/30 border-l-4 border-orange-500 p-4 space-y-1.5">
            <div className="text-sm font-bold text-orange-800 dark:text-orange-300">{layer.label}</div>
            <p className="text-sm">{layer.description}</p>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">예) {layer.example}</p>
          </div>
        </div>
      )}

      {tab === 'class' && (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {THEORIES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTheoryId(t.id)}
                className={`rounded-md border px-3 py-1.5 text-xs ${
                  theoryId === t.id
                    ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-400 font-bold'
                    : 'border-zinc-200 dark:border-zinc-700'
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>
          <div className="rounded-md border border-zinc-200 dark:border-zinc-700 p-3 space-y-1.5">
            <div className="text-xs font-bold text-orange-700 dark:text-orange-400">관점</div>
            <p className="text-sm">{theory.view}</p>
          </div>
          <div className="rounded-md border border-zinc-200 dark:border-zinc-700 p-3 space-y-1.5">
            <div className="text-xs font-bold text-zinc-500 dark:text-zinc-400">한계·비판</div>
            <p className="text-sm">{theory.critique}</p>
          </div>
          <div className="rounded-md bg-yellow-50 dark:bg-yellow-950/20 px-3 py-2 text-xs text-yellow-800 dark:text-yellow-200">
            🎯 한 이론만 정답이 아니에요. 같은 사회 현상도 어느 이론으로 보느냐에 따라 다르게 보여요.
          </div>
        </div>
      )}

      {tab === 'media' && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {MEDIA_VIEWS.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMediaId(m.id)}
                className={`rounded-md border px-3 py-2 text-xs text-left ${
                  mediaId === m.id
                    ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-400 font-bold'
                    : 'border-zinc-200 dark:border-zinc-700'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
          <div className="rounded-xl bg-orange-50 dark:bg-orange-950/30 border-l-4 border-orange-500 p-4 space-y-1.5">
            <div className="text-sm font-bold text-orange-800 dark:text-orange-300">{media.label}</div>
            <p className="text-sm">{media.body}</p>
          </div>
          <div className="rounded-md bg-zinc-50 dark:bg-zinc-800 px-3 py-2 text-xs text-zinc-600 dark:text-zinc-400">
            🪶 미디어 리터러시 — 정보의 양보다 「누가, 왜, 무엇을 빠뜨리고」 만들었는지를 묻는 능력이에요.
          </div>
        </div>
      )}
    </div>
  );
}
