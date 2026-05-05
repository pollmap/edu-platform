'use client';

// S6-ME-03 에너지와 생활 — 에너지 형태 변환 다이어그램.
// 시나리오 선택 → 에너지가 어떻게 형태를 바꾸는지 단계별 흐름.

import { useState } from 'react';

interface Scenario {
  key: string;
  name: string;
  steps: { from: string; to: string; device: string }[];
  efficiency: number; // 0~1
}

const SCENARIOS: Scenario[] = [
  {
    key: 'lamp',
    name: '💡 LED 전구 켜기',
    steps: [
      { from: '화학', to: '전기', device: '발전소(석탄·태양·원자력)' },
      { from: '전기', to: '빛+열', device: 'LED' },
    ],
    efficiency: 0.45,
  },
  {
    key: 'car',
    name: '🚗 자동차 운행',
    steps: [
      { from: '화학', to: '열', device: '엔진 연소' },
      { from: '열', to: '운동', device: '피스톤·바퀴' },
    ],
    efficiency: 0.25,
  },
  {
    key: 'plant',
    name: '🌱 식물 광합성',
    steps: [
      { from: '빛(태양)', to: '화학', device: '엽록체' },
    ],
    efficiency: 0.06,
  },
  {
    key: 'phone',
    name: '📱 스마트폰 충전·사용',
    steps: [
      { from: '전기', to: '화학', device: '배터리 충전' },
      { from: '화학', to: '전기', device: '배터리 방전' },
      { from: '전기', to: '빛+소리+열', device: '화면·스피커' },
    ],
    efficiency: 0.4,
  },
  {
    key: 'hydro',
    name: '🌊 수력발전',
    steps: [
      { from: '위치(높이)', to: '운동', device: '낙하' },
      { from: '운동', to: '전기', device: '터빈·발전기' },
    ],
    efficiency: 0.85,
  },
  {
    key: 'human',
    name: '🚶 사람이 걷기',
    steps: [
      { from: '빛', to: '화학(식물)', device: '광합성' },
      { from: '화학(음식)', to: '운동', device: '근육' },
    ],
    efficiency: 0.2,
  },
];

const FORM_COLOR: Record<string, string> = {
  화학: '#a855f7',
  전기: '#3b82f6',
  운동: '#10b981',
  열: '#ef4444',
  '빛(태양)': '#fbbf24',
  빛: '#fbbf24',
  '빛+열': '#fbbf24',
  '빛+소리+열': '#fbbf24',
  '위치(높이)': '#06b6d4',
  '화학(식물)': '#a855f7',
  '화학(음식)': '#a855f7',
};

function colorOf(form: string) {
  return FORM_COLOR[form] || '#71717a';
}

export function EnergyTransformExplorer() {
  const [scIdx, setScIdx] = useState(0);
  const sc = SCENARIOS[scIdx];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {SCENARIOS.map((s, i) => (
          <button
            key={s.key}
            type="button"
            onClick={() => setScIdx(i)}
            className={`px-2 py-2 rounded text-xs font-medium min-h-[44px] ${
              i === scIdx ? 'bg-emerald-600 text-white' : 'bg-zinc-200 dark:bg-zinc-700'
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-900 p-4 border border-zinc-200 dark:border-zinc-700">
        <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-3 text-center">{sc.name}</div>
        <div className="space-y-3">
          {/* 시작 형태 */}
          <div className="flex items-center justify-center">
            <FormBadge form={sc.steps[0].from} />
          </div>
          {sc.steps.map((step, i) => (
            <div key={i} className="space-y-1">
              <div className="flex justify-center">
                <div className="text-2xl text-zinc-400">↓</div>
              </div>
              <div className="text-xs text-center text-zinc-600 dark:text-zinc-400">
                <span className="font-bold">{step.device}</span>
              </div>
              <div className="flex items-center justify-center">
                <FormBadge form={step.to} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-700">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">에너지 효율</span>
            <span className="ml-auto text-sm font-bold text-emerald-600 dark:text-emerald-400">
              {(sc.efficiency * 100).toFixed(0)}%
            </span>
          </div>
          <div className="flex h-5 rounded overflow-hidden bg-zinc-200 dark:bg-zinc-800">
            <div
              className="bg-emerald-500 flex items-center justify-center text-[10px] font-bold text-white"
              style={{ width: `${sc.efficiency * 100}%` }}
            >
              유용
            </div>
            <div
              className="bg-rose-500 flex items-center justify-center text-[10px] font-bold text-white"
              style={{ width: `${(1 - sc.efficiency) * 100}%` }}
            >
              낭비(주로 열)
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">에너지의 7가지 형태</div>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2 text-xs">
          {[
            { key: '화학', icon: '🔋', desc: '연료·음식' },
            { key: '전기', icon: '⚡', desc: '전류' },
            { key: '운동', icon: '🏃', desc: '움직임' },
            { key: '열', icon: '🔥', desc: '온도' },
            { key: '빛', icon: '💡', desc: '광자' },
            { key: '소리', icon: '🔊', desc: '진동' },
            { key: '위치', icon: '⛰️', desc: '높이·중력' },
            { key: '핵', icon: '☢️', desc: '원자핵' },
          ].map((e) => (
            <div
              key={e.key}
              className="rounded-lg p-2 text-center"
              style={{ background: `${colorOf(e.key)}25`, border: `1px solid ${colorOf(e.key)}55` }}
            >
              <div className="text-base">{e.icon}</div>
              <div className="font-bold text-xs">{e.key}</div>
              <div className="text-[10px] opacity-70">{e.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-xs text-zinc-500 dark:text-zinc-400">
        💡 에너지는 「만들어지지도 사라지지도」 않고 「형태만 바뀌어요」(에너지 보존). 단, 어느 변환이든 일부는 「열」로 흩어져 다시 못 모아요(열역학 제2법칙). 그래서 「효율」이 100%인 기계는 없어요.
      </div>
    </div>
  );
}

function FormBadge({ form }: { form: string }) {
  const c = colorOf(form);
  return (
    <div
      className="px-4 py-2 rounded-full font-bold text-sm border-2"
      style={{ background: `${c}25`, color: c, borderColor: c }}
    >
      {form} 에너지
    </div>
  );
}
