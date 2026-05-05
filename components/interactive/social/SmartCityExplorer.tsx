'use client';

// H-UF 도시의 미래 — 스마트시티 구성 요소 시뮬레이터.
// 자체 정리. 가치 중립.

import { useState } from 'react';

interface Layer {
  id: string;
  name: string;
  emoji: string;
  desc: string;
  examples: string[];
  tradeoff: string;
}

const LAYERS: Layer[] = [
  {
    id: 'mobility',
    name: '교통·이동',
    emoji: '🚇',
    desc: '실시간 신호·자율주행·MaaS(통합 교통 서비스)로 이동의 효율과 안전을 높인다.',
    examples: ['실시간 신호 최적화', '자율주행 셔틀', '공유 모빌리티(따릉이·전동킥보드)', 'C-ITS(차세대 지능형 교통)'],
    tradeoff: '데이터가 많을수록 정확하지만, 위치 정보 추적은 사생활 우려를 낳는다.',
  },
  {
    id: 'energy',
    name: '에너지·환경',
    emoji: '⚡',
    desc: '스마트 그리드·신재생·건물 에너지 관리로 탄소 배출과 비용을 줄인다.',
    examples: ['스마트 그리드 수요 예측', '태양광·풍력', 'BEMS(건물 에너지 관리)', '폐기물 자동 수거'],
    tradeoff: '초기 투자비용이 크고, 신재생은 변동성으로 안정성 문제가 따른다.',
  },
  {
    id: 'safety',
    name: '안전·재난',
    emoji: '🚨',
    desc: 'CCTV·재난 센서·5G로 위험을 조기 탐지하고 대응 속도를 높인다.',
    examples: ['지능형 CCTV', '홍수·미세먼지 센서', '재난 안전망 어플', '응급 우선 신호'],
    tradeoff: '감시 인프라의 확대는 시민 자유와 인권 영향을 동반한다.',
  },
  {
    id: 'governance',
    name: '시민·행정',
    emoji: '🏛️',
    desc: '디지털 민원·시민 참여 플랫폼·열린 데이터로 행정의 투명성·접근성을 높인다.',
    examples: ['모바일 신분증', '시민 참여 예산제', '오픈 데이터', '챗봇 민원'],
    tradeoff: '디지털 격차로 노년·취약계층의 접근이 어려울 수 있다.',
  },
  {
    id: 'data',
    name: '데이터·플랫폼',
    emoji: '📊',
    desc: '도시 곳곳에서 수집된 데이터를 통합 관리·개방해 새로운 서비스를 만든다.',
    examples: ['도시 디지털 트윈', '오픈 API', 'AI 분석 플랫폼', '데이터 거래소'],
    tradeoff: '개인 정보 보호·데이터 주권이 핵심 쟁점.',
  },
  {
    id: 'health',
    name: '보건·복지',
    emoji: '🏥',
    desc: '원격 의료·웨어러블·돌봄 로봇 등으로 보건·복지 서비스의 도달 범위를 넓힌다.',
    examples: ['원격 진료', '돌봄 IoT', '응급 모니터링 워치', '복지 AI 매칭'],
    tradeoff: '의료 데이터의 보안·표준화 과제. 대면 의료의 가치도 함께 고려해야.',
  },
];

const SLIDER_CASES = [
  { id: 'efficiency', label: '효율 우선', center: 'mobility', describe: '교통 흐름과 에너지 최적화에 큰 비중을 두는 도시 모델.' },
  { id: 'sustain', label: '지속가능 우선', center: 'energy', describe: '탄소 중립과 재생에너지 비중을 높이는 도시 모델.' },
  { id: 'safety', label: '안전 우선', center: 'safety', describe: '재난·범죄 대응에 자원과 데이터를 집중하는 도시 모델.' },
  { id: 'citizen', label: '시민·열린 데이터 우선', center: 'governance', describe: '시민 참여와 데이터 개방을 핵심으로 하는 도시 모델.' },
];

export function SmartCityExplorer() {
  const [layerId, setLayerId] = useState(LAYERS[0].id);
  const [caseId, setCaseId] = useState(SLIDER_CASES[0].id);

  const layer = LAYERS.find((l) => l.id === layerId) ?? LAYERS[0];
  const c = SLIDER_CASES.find((s) => s.id === caseId) ?? SLIDER_CASES[0];

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900/40">
        <p className="mb-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400">도시 모델 시나리오</p>
        <div className="flex flex-wrap gap-2">
          {SLIDER_CASES.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                setCaseId(s.id);
                setLayerId(s.center);
              }}
              className={`min-h-11 rounded-md px-3 py-2 text-sm font-medium transition ${
                caseId === s.id
                  ? 'bg-orange-600 text-white'
                  : 'bg-white text-zinc-700 hover:bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">{c.describe}</p>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {LAYERS.map((l) => (
          <button
            key={l.id}
            type="button"
            onClick={() => setLayerId(l.id)}
            className={`min-h-11 rounded-md border p-3 text-left text-sm transition ${
              layerId === l.id
                ? 'border-orange-400 bg-orange-50 dark:border-orange-600 dark:bg-orange-950/30'
                : 'border-zinc-200 bg-white hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-600'
            }`}
          >
            <div className="text-lg">{l.emoji}</div>
            <div className="font-bold">{l.name}</div>
          </button>
        ))}
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="mb-2 flex items-center gap-2 text-lg font-bold">
          <span className="text-2xl">{layer.emoji}</span> {layer.name}
        </h3>
        <p className="mb-3 text-sm text-zinc-700 dark:text-zinc-300">{layer.desc}</p>
        <div className="mb-3">
          <p className="mb-1 text-xs font-semibold text-zinc-500 dark:text-zinc-400">실제 사례·기술</p>
          <ul className="list-disc space-y-1 pl-5 text-sm">
            {layer.examples.map((ex, i) => (
              <li key={i}>{ex}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-md bg-amber-50 p-3 text-sm dark:bg-amber-950/30">
          <strong className="text-amber-700 dark:text-amber-300">트레이드오프 </strong>
          {layer.tradeoff}
        </div>
      </div>

      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        ※ 어떤 「우선」도 부작용을 동반해요. 도시는 시민이 어떤 가치를 더 중요하게 여기는지 끊임없이 합의·재합의하는 과정이에요.
      </p>
    </div>
  );
}
