'use client';

// S-LE1-02 생활 속 과학 탐구 — 일상 현상 4가지를 재현 가능한 미니실험으로.

import { useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';

type Topic = 'pressure' | 'sound' | 'rainbow' | 'fermentation';

export function UnitSLE102Explorer() {
  const [topic, setTopic] = useState<Topic>('pressure');

  // 압력 (대기압 vs 진공컵)
  const [areaCm2, setAreaCm2] = useState(50);
  const force = (areaCm2 / 1e4) * 101325; // N

  // 소리 (현 길이 vs 진동수)
  const [strLen, setStrLen] = useState(60); // cm
  const freq = 440 * (60 / strLen); // 60 cm = A4

  // 무지개 (스넬 굴절)
  const [n, setN] = useState(1.33); // 물
  const incident = 60; // 도
  const sinR = Math.sin((incident * Math.PI) / 180) / n;
  const refracted = (Math.asin(sinR) * 180) / Math.PI;

  // 발효 (시간 vs CO2 부피)
  const [hours, setHours] = useState(2);
  const co2mL = Math.round(15 * hours * 1.4); // 단순화

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-1">
          일상 현상 미니 실험실
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          빨래 흡판, 기타 줄, 무지개, 빵 발효 — 모두 같은 원리로 풀 수 있어요.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
        {(['pressure', 'sound', 'rainbow', 'fermentation'] as Topic[]).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setTopic(id)}
            className={`min-h-[44px] rounded-lg px-2 ${
              topic === id
                ? 'bg-green-600 text-white font-semibold'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
            }`}
          >
            {id === 'pressure'
              ? '흡판 힘'
              : id === 'sound'
                ? '기타 줄'
                : id === 'rainbow'
                  ? '무지개'
                  : '빵 발효'}
          </button>
        ))}
      </div>

      {topic === 'pressure' && (
        <>
          <SliderRow
            label="흡판 면적"
            value={areaCm2}
            min={10}
            max={300}
            step={5}
            onChange={setAreaCm2}
            format={(v) => v.toFixed(0)}
            unit=" cm²"
          />
          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3 text-sm">
            <div className="flex justify-between">
              <span>대기압 × 면적</span>
              <span className="font-mono font-bold text-green-600 dark:text-green-400">
                {force.toFixed(1)} N (≈ {(force / 9.8).toFixed(1)} kg 무게)
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              101 kPa × 단면적 = 우리를 위에서 누르는 힘. 흡판은 안쪽 진공 → 바깥 대기압이 빨래에 붙여 줌.
            </p>
          </div>
        </>
      )}

      {topic === 'sound' && (
        <>
          <SliderRow
            label="현 길이"
            value={strLen}
            min={20}
            max={120}
            step={1}
            onChange={setStrLen}
            format={(v) => v.toFixed(0)}
            unit=" cm"
          />
          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3 text-sm">
            <div className="flex justify-between">
              <span>진동수 (60 cm = A4 = 440 Hz 기준)</span>
              <span className="font-mono font-bold text-green-600 dark:text-green-400">
                {freq.toFixed(1)} Hz
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              현 길이가 짧을수록 진동수 ↑ → 음 ↑. 기타 프렛을 누르면 줄이 짧아져 음이 올라가요. f ∝ 1/L.
            </p>
          </div>
        </>
      )}

      {topic === 'rainbow' && (
        <>
          <SliderRow
            label="물질 굴절률 n"
            value={n}
            min={1.0}
            max={2.5}
            step={0.01}
            onChange={setN}
            format={(v) => v.toFixed(2)}
          />
          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3 text-sm space-y-1">
            <div className="flex justify-between">
              <span>입사각</span>
              <span className="font-mono">60°</span>
            </div>
            <div className="flex justify-between border-t border-zinc-200 dark:border-zinc-700 pt-1">
              <span className="font-bold">굴절각 (스넬)</span>
              <span className="font-mono font-bold text-green-600 dark:text-green-400">
                {refracted.toFixed(1)}°
              </span>
            </div>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            물(1.33) · 유리(1.5) · 다이아몬드(2.4). 색깔별 n이 미세하게 달라 빛이 분산 → 무지개·프리즘.
          </p>
        </>
      )}

      {topic === 'fermentation' && (
        <>
          <SliderRow
            label="시간"
            value={hours}
            min={0}
            max={6}
            step={0.5}
            onChange={setHours}
            format={(v) => v.toFixed(1)}
            unit=" h"
          />
          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3 text-sm">
            <div className="flex justify-between">
              <span>발생 CO₂ (효모 50 g 기준 추정)</span>
              <span className="font-mono font-bold text-green-600 dark:text-green-400">
                {co2mL} mL
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂. 빵이 부풀고 막걸리가 거품 내는 이유. 무산소 호흡(알코올 발효).
            </p>
          </div>
        </>
      )}
    </div>
  );
}
