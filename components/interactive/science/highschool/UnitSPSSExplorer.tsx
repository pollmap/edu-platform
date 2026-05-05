'use client';

// S-PSS 행성우주과학 — 외계행성 시선속도 / 통과 깊이 + 허블 법칙.

import { useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';

type Topic = 'transit' | 'rv' | 'hubble';

const H0 = 70; // km/s/Mpc
const C_KM = 299792; // km/s

export function UnitSPSSExplorer() {
  const [topic, setTopic] = useState<Topic>('transit');

  // 통과 (transit)
  const [planetR, setPlanetR] = useState(1.0); // 지구 반지름 단위
  const [starR, setStarR] = useState(1.0); // 태양 반지름 단위
  const transitDepth = Math.pow((planetR * 6371) / (starR * 696000), 2) * 100; // %

  // 시선속도
  const [planetMass, setPlanetMass] = useState(1); // M_J
  const [orbitDays, setOrbitDays] = useState(365);
  // 단순 근사: K (m/s) ≈ 28.4 * (M_p sin i / M_J) * (P/yr)^(-1/3)
  const Pyear = orbitDays / 365;
  const K = 28.4 * planetMass * Math.pow(Pyear, -1 / 3);

  // 허블
  const [distMpc, setDistMpc] = useState(100);
  const v = H0 * distMpc;
  const z = v / C_KM;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-1">
          외계행성 검출 · 우주의 팽창
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          별빛이 살짝 어두워지는 것·살짝 흔들리는 것으로 행성을 찾고, 적색편이로 우주 거리를 잰다.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2 text-xs sm:text-sm">
        {(['transit', 'rv', 'hubble'] as Topic[]).map((id) => (
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
            {id === 'transit' ? '통과법' : id === 'rv' ? '시선속도' : '허블'}
          </button>
        ))}
      </div>

      {topic === 'transit' && (
        <>
          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4">
            <svg viewBox="0 0 360 160" className="w-full h-auto" role="img" aria-label="통과">
              <circle cx={120} cy={80} r={Math.min(50, starR * 30)} fill="#fde68a" stroke="#eab308" strokeWidth={1.5} />
              <circle cx={120} cy={80} r={Math.min(20, planetR * 4)} fill="#1f2937" />
              <text x={120} y={140} fontSize={10} textAnchor="middle" fill="#71717a">
                별 + 행성
              </text>
              {/* 광도곡선 */}
              <line x1={210} y1={60} x2={250} y2={60} stroke="#22c55e" strokeWidth={2} />
              <line x1={250} y1={60} x2={250} y2={60 + Math.min(40, transitDepth * 6)} stroke="#22c55e" strokeWidth={2} />
              <line x1={250} y1={60 + Math.min(40, transitDepth * 6)} x2={290} y2={60 + Math.min(40, transitDepth * 6)} stroke="#22c55e" strokeWidth={2} />
              <line x1={290} y1={60 + Math.min(40, transitDepth * 6)} x2={290} y2={60} stroke="#22c55e" strokeWidth={2} />
              <line x1={290} y1={60} x2={340} y2={60} stroke="#22c55e" strokeWidth={2} />
              <text x={275} y={140} fontSize={10} textAnchor="middle" fill="#16a34a" fontWeight={700}>
                감광량 {transitDepth.toFixed(3)} %
              </text>
            </svg>
          </div>

          <SliderRow
            label="행성 반지름 (R⊕)"
            value={planetR}
            min={0.5}
            max={11}
            step={0.1}
            onChange={setPlanetR}
            unit=" R⊕"
          />
          <SliderRow
            label="별 반지름 (R⊙)"
            value={starR}
            min={0.3}
            max={3}
            step={0.05}
            onChange={setStarR}
            unit=" R⊙"
          />

          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3 text-sm">
            <div className="flex justify-between">
              <span>통과 감광량 = (Rp/Rs)²</span>
              <span className="font-mono font-bold text-green-600 dark:text-green-400">
                {transitDepth.toFixed(4)} %
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Kepler·TESS 위성이 ppm 수준의 감광량으로 5,000+ 외계행성 발견.
            </p>
          </div>
        </>
      )}

      {topic === 'rv' && (
        <>
          <SliderRow
            label="행성 질량 (M_J)"
            value={planetMass}
            min={0.1}
            max={15}
            step={0.1}
            onChange={setPlanetMass}
            unit=" M_J"
          />
          <SliderRow
            label="공전 주기 (일)"
            value={orbitDays}
            min={3}
            max={3000}
            step={1}
            onChange={setOrbitDays}
            format={(v) => v.toFixed(0)}
            unit=" 일"
          />

          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3 text-sm">
            <div className="flex justify-between">
              <span>별의 시선속도 진폭 K</span>
              <span className="font-mono font-bold text-green-600 dark:text-green-400">
                {K.toFixed(2)} m/s
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              지구가 태양을 끌어당겨 만드는 K ≈ 0.09 m/s. 목성은 12 m/s. HARPS·ESPRESSO 분광기 정확도 ~0.5 m/s.
            </p>
          </div>
        </>
      )}

      {topic === 'hubble' && (
        <>
          <SliderRow
            label="거리 d (Mpc)"
            value={distMpc}
            min={10}
            max={4000}
            step={10}
            onChange={setDistMpc}
            format={(v) => v.toFixed(0)}
            unit=" Mpc"
          />

          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3 text-sm space-y-1">
            <div className="flex justify-between">
              <span>v = H₀d (H₀ ≈ 70)</span>
              <span className="font-mono">{v.toFixed(0)} km/s</span>
            </div>
            <div className="flex justify-between border-t border-zinc-200 dark:border-zinc-700 pt-1">
              <span className="font-bold">적색편이 z = v/c</span>
              <span className="font-mono font-bold text-green-600 dark:text-green-400">
                {z.toFixed(4)}
              </span>
            </div>
          </div>

          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            먼 은하일수록 빠르게 멀어진다 = 우주는 팽창. z &gt; 1이면 광속 근접 영역. JWST가 z ≈ 13의 초기 은하까지 관측.
          </p>
        </>
      )}
    </div>
  );
}
