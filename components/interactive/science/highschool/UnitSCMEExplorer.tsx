'use client';

// S-CME 물질과 에너지 — 이상기체 PV=nRT 시뮬 + 카르노 효율 + 엔트로피 변화.

import { useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';

type Topic = 'gas' | 'carnot' | 'entropy';

const R = 0.0821; // L·atm/(mol·K)

export function UnitSCMEExplorer() {
  const [topic, setTopic] = useState<Topic>('gas');

  // 이상기체
  const [pressure, setPressure] = useState(1.0); // atm
  const [volume, setVolume] = useState(22.4); // L
  const [temperature, setTemperature] = useState(273); // K
  const moles = (pressure * volume) / (R * temperature);

  // 카르노
  const [tHot, setTHot] = useState(600); // K
  const [tCold, setTCold] = useState(300); // K
  const efficiency = Math.max(0, 1 - tCold / tHot);

  // 엔트로피
  const [process, setProcess] = useState<'fusion' | 'mix' | 'expand'>('fusion');
  const entropySign = process === 'fusion' ? '+' : process === 'mix' ? '+' : '+';
  const entropyValue = process === 'fusion' ? 22 : process === 'mix' ? 5.7 : 11.5; // J/(mol·K)

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-1">
          PV = nRT · 카르노 한계 · 무질서의 방향
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          기체의 압력·부피·온도가 어떻게 묶여 있고, 열기관의 효율이 왜 1을 넘을 수 없는지 직접 확인.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2 text-xs sm:text-sm">
        {(['gas', 'carnot', 'entropy'] as Topic[]).map((id) => (
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
            {id === 'gas' ? '이상기체' : id === 'carnot' ? '카르노' : '엔트로피'}
          </button>
        ))}
      </div>

      {topic === 'gas' && (
        <>
          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4">
            <svg viewBox="0 0 360 160" className="w-full h-auto" role="img" aria-label="기체 부피">
              <rect x={20} y={20} width={Math.min(320, volume * 10)} height={120} fill="#bbf7d0" stroke="#22c55e" strokeWidth={2} rx={6} />
              {Array.from({ length: Math.min(40, Math.round(moles * 10)) }).map((_, i) => (
                <circle
                  key={i}
                  cx={30 + ((i * 17) % Math.min(310, volume * 10 - 10))}
                  cy={30 + Math.floor((i * 13) % 110)}
                  r={3}
                  fill="#16a34a"
                />
              ))}
              <text x={180} y={155} fontSize={11} textAnchor="middle" fill="#16a34a" fontWeight={700}>
                {volume.toFixed(1)} L · {moles.toFixed(3)} mol · {temperature} K
              </text>
            </svg>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3 text-sm space-y-1">
            <div className="flex justify-between">
              <span>P × V</span>
              <span className="font-mono">{(pressure * volume).toFixed(2)} L·atm</span>
            </div>
            <div className="flex justify-between">
              <span>n × R × T</span>
              <span className="font-mono">{(moles * R * temperature).toFixed(2)} L·atm</span>
            </div>
            <div className="flex justify-between border-t border-zinc-200 dark:border-zinc-700 pt-1">
              <span className="font-bold">몰수 n = PV/RT</span>
              <span className="font-mono font-bold text-green-600 dark:text-green-400">
                {moles.toFixed(4)} mol
              </span>
            </div>
          </div>

          <SliderRow label="압력 P" value={pressure} min={0.1} max={5.0} step={0.1} onChange={setPressure} unit=" atm" />
          <SliderRow label="부피 V" value={volume} min={1} max={50} step={0.5} onChange={setVolume} unit=" L" />
          <SliderRow
            label="온도 T"
            value={temperature}
            min={100}
            max={800}
            step={10}
            onChange={setTemperature}
            format={(v) => v.toFixed(0)}
            unit=" K"
          />
        </>
      )}

      {topic === 'carnot' && (
        <>
          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4">
            <svg viewBox="0 0 360 160" className="w-full h-auto" role="img" aria-label="카르노">
              <rect x={20} y={30} width={80} height={100} fill="#fecaca" stroke="#dc2626" strokeWidth={2} rx={6} />
              <text x={60} y={60} fontSize={11} textAnchor="middle" fill="#b91c1c" fontWeight={700}>
                고온 T_H
              </text>
              <text x={60} y={80} fontSize={14} textAnchor="middle" fill="#b91c1c" fontWeight={700}>
                {tHot} K
              </text>
              <rect x={260} y={30} width={80} height={100} fill="#bfdbfe" stroke="#2563eb" strokeWidth={2} rx={6} />
              <text x={300} y={60} fontSize={11} textAnchor="middle" fill="#1d4ed8" fontWeight={700}>
                저온 T_C
              </text>
              <text x={300} y={80} fontSize={14} textAnchor="middle" fill="#1d4ed8" fontWeight={700}>
                {tCold} K
              </text>
              <circle cx={180} cy={80} r={28} fill="#fef9c3" stroke="#eab308" strokeWidth={2} />
              <text x={180} y={84} fontSize={11} textAnchor="middle" fill="#a16207" fontWeight={700}>
                엔진
              </text>
              <line x1={100} y1={80} x2={150} y2={80} stroke="#dc2626" strokeWidth={2} markerEnd="url(#arrR)" />
              <line x1={210} y1={80} x2={260} y2={80} stroke="#2563eb" strokeWidth={2} markerEnd="url(#arrB)" />
              <text x={180} y={140} fontSize={12} textAnchor="middle" fill="#a16207" fontWeight={700}>
                W = Q_H − Q_C
              </text>
              <defs>
                <marker id="arrR" viewBox="0 0 10 10" refX={9} refY={5} markerWidth={5} markerHeight={5} orient="auto">
                  <path d="M0,0 L10,5 L0,10 Z" fill="#dc2626" />
                </marker>
                <marker id="arrB" viewBox="0 0 10 10" refX={9} refY={5} markerWidth={5} markerHeight={5} orient="auto">
                  <path d="M0,0 L10,5 L0,10 Z" fill="#2563eb" />
                </marker>
              </defs>
            </svg>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3 text-sm space-y-1">
            <div className="flex justify-between">
              <span>η = 1 − T_C/T_H</span>
              <span className="font-mono font-bold text-green-600 dark:text-green-400">
                {(efficiency * 100).toFixed(1)} %
              </span>
            </div>
          </div>

          <SliderRow label="고온 T_H" value={tHot} min={300} max={1500} step={10} onChange={setTHot} format={(v) => v.toFixed(0)} unit=" K" />
          <SliderRow label="저온 T_C" value={tCold} min={100} max={tHot - 10} step={10} onChange={setTCold} format={(v) => v.toFixed(0)} unit=" K" />

          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            T_C가 0 K이 되어야 효율 100 %. 어떤 열기관도 카르노 한계를 못 넘어요. 자동차 가솔린 엔진 ≈ 25 %, 화력발전 ≈ 40 %.
          </p>
        </>
      )}

      {topic === 'entropy' && (
        <>
          <div className="grid grid-cols-3 gap-2 text-xs">
            {(['fusion', 'mix', 'expand'] as const).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setProcess(p)}
                className={`min-h-[40px] rounded-lg px-2 ${
                  process === p
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
                }`}
              >
                {p === 'fusion' ? '얼음→물' : p === 'mix' ? '기체 혼합' : '단열 팽창'}
              </button>
            ))}
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3 text-sm space-y-1">
            <div className="flex justify-between">
              <span>변화 방향</span>
              <span className="font-mono font-bold text-green-600 dark:text-green-400">{entropySign}ΔS</span>
            </div>
            <div className="flex justify-between">
              <span>대략적 ΔS</span>
              <span className="font-mono">{entropyValue.toFixed(1)} J/(mol·K)</span>
            </div>
          </div>

          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            얼음(고체)→물(액체)→수증기(기체)로 갈수록 무질서도가 폭증. 두 기체가 섞이면 자발적으로 ΔS &gt; 0. 단열팽창에선 분자가 차지할 공간이 늘어나 ΔS &gt; 0.
          </p>
        </>
      )}
    </div>
  );
}
