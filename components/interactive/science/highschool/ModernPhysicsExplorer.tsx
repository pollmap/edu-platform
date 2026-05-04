'use client';

// S-PHY-07 현대물리 — 광전효과 + 시간 팽창 토글.

import { useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';

type Topic = 'photoelectric' | 'dilation';

const H_PLANCK_EV = 4.136e-15; // eV·s
const C = 2.998e8; // m/s

export function ModernPhysicsExplorer() {
  const [topic, setTopic] = useState<Topic>('photoelectric');

  // 광전효과
  const [wavelength, setWavelength] = useState(450); // nm
  const [workFn, setWorkFn] = useState(2.5); // eV
  const photonE = (H_PLANCK_EV * C) / (wavelength * 1e-9); // eV
  const ke = Math.max(0, photonE - workFn);
  const emits = photonE > workFn;

  // 시간 팽창
  const [vRatio, setVRatio] = useState(0.5); // v/c
  const gamma = 1 / Math.sqrt(1 - vRatio ** 2);
  const dilatedTime = gamma * 1; // 1초 = ?

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-1">
          빛의 입자성 · 빠를수록 시간이 느려진다
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          현대물리는 양자(아인슈타인 광전효과)와 상대성(시간 팽창)의 두 기둥에서 출발해요.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm">
        {(['photoelectric', 'dilation'] as Topic[]).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setTopic(id)}
            className={`min-h-[44px] rounded-lg px-3 ${
              topic === id
                ? 'bg-green-600 text-white font-semibold'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
            }`}
          >
            {id === 'photoelectric' ? '광전효과' : '시간 팽창'}
          </button>
        ))}
      </div>

      {topic === 'photoelectric' ? (
        <>
          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4">
            <svg viewBox="0 0 360 160" className="w-full h-auto" role="img" aria-label="광전효과">
              {/* 금속판 */}
              <rect x={20} y={50} width={20} height={70} fill="#71717a" />
              {/* 광자 입사 */}
              <line x1={300} y1={30} x2={50} y2={70} stroke={`hsl(${280 - (wavelength - 400) * 0.8}, 80%, 55%)`} strokeWidth={3} />
              <circle cx={300} cy={30} r={5} fill={`hsl(${280 - (wavelength - 400) * 0.8}, 80%, 55%)`} />
              {/* 전자 방출 */}
              {emits && (
                <>
                  <circle cx={60 + ke * 30} cy={90} r={6} fill="#3b82f6" stroke="#fff" strokeWidth={1} />
                  <text x={60 + ke * 30} y={84} fontSize={10} textAnchor="middle" fill="#3b82f6" fontWeight={700}>
                    e⁻
                  </text>
                  <line x1={45} y1={95} x2={60 + ke * 30 - 8} y2={92} stroke="#3b82f6" strokeDasharray="2 2" />
                </>
              )}
              <text x={30} y={140} fontSize={11} fill="#71717a" textAnchor="middle">금속</text>
            </svg>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3 text-sm space-y-1">
            <div className="flex justify-between">
              <span>광자 에너지 E = hf</span>
              <span className="font-mono">{photonE.toFixed(2)} eV</span>
            </div>
            <div className="flex justify-between">
              <span>일함수 W</span>
              <span className="font-mono">{workFn.toFixed(2)} eV</span>
            </div>
            <div className="flex justify-between border-t border-zinc-200 dark:border-zinc-700 pt-1">
              <span className="font-bold">방출 전자 KE</span>
              <span className={`font-mono font-bold ${emits ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-400'}`}>
                {emits ? `${ke.toFixed(2)} eV` : '방출 안 됨'}
              </span>
            </div>
          </div>

          <SliderRow label="빛 파장 λ" value={wavelength} min={200} max={700} step={10} onChange={setWavelength} unit=" nm" />
          <SliderRow label="금속 일함수 W" value={workFn} min={1.5} max={5.0} step={0.1} onChange={setWorkFn} unit=" eV" />

          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            빛이 약해도(많은 광자) 파장이 길면(에너지 작음) 전자는 안 튀어나와요. 양자성의 직접 증거.
          </p>
        </>
      ) : (
        <>
          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4">
            <svg viewBox="0 0 360 160" className="w-full h-auto" role="img" aria-label="시간 팽창">
              {/* 정지 시계 */}
              <circle cx={80} cy={80} r={36} fill="none" stroke="#9ca3af" strokeWidth={2} />
              <line x1={80} y1={80} x2={80} y2={50} stroke="#3b82f6" strokeWidth={3} />
              <text x={80} y={130} fontSize={11} textAnchor="middle" fill="#3b82f6" fontWeight={700}>
                정지 1.00초
              </text>
              {/* 운동 시계 */}
              <circle cx={280} cy={80} r={36} fill="none" stroke="#9ca3af" strokeWidth={2} />
              <line x1={280} y1={80} x2={280 + 30 * Math.cos(-Math.PI / 2 + (1 / gamma) * Math.PI * 2 * 0.25)} y2={80 + 30 * Math.sin(-Math.PI / 2 + (1 / gamma) * Math.PI * 2 * 0.25)} stroke="#dc2626" strokeWidth={3} />
              <text x={280} y={130} fontSize={11} textAnchor="middle" fill="#dc2626" fontWeight={700}>
                관측 {dilatedTime.toFixed(2)}초
              </text>
              <text x={180} y={45} fontSize={11} textAnchor="middle" fill="#71717a">v = {(vRatio * 100).toFixed(0)}% c</text>
            </svg>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3 text-sm space-y-1">
            <div className="flex justify-between">
              <span>로런츠 인자 γ</span>
              <span className="font-mono font-bold text-red-500">{gamma.toFixed(3)}</span>
            </div>
            <div className="flex justify-between">
              <span>1초 → 외부 관측</span>
              <span className="font-mono font-bold">{dilatedTime.toFixed(3)}초</span>
            </div>
          </div>

          <SliderRow label="속도 비율 v/c" value={vRatio} min={0} max={0.99} step={0.01} onChange={setVRatio} />

          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            광속에 가까울수록 γ가 폭증. v = 0.87c면 γ ≈ 2 (시간이 절반 속도). GPS 위성도 보정해 사용해요.
          </p>
        </>
      )}
    </div>
  );
}
