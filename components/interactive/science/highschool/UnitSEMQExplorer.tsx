'use client';

// S-EMQ 전자기와 양자 — 전자기 유도 + 광전효과 + 드브로이 물질파.

import { useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';

type Topic = 'induction' | 'photoelectric' | 'matterwave';

const H = 6.626e-34; // J·s
const H_eV = 4.136e-15; // eV·s
const C = 2.998e8; // m/s
const ME = 9.109e-31; // kg
const E_CHG = 1.602e-19; // C

export function UnitSEMQExplorer() {
  const [topic, setTopic] = useState<Topic>('induction');

  // 전자기 유도
  const [bField, setBField] = useState(0.5); // T
  const [vBar, setVBar] = useState(2); // m/s
  const [length, setLength] = useState(0.5); // m
  const emf = bField * vBar * length;

  // 광전
  const [wavelength, setWavelength] = useState(450); // nm
  const [workFn, setWorkFn] = useState(2.5); // eV
  const photonE = (H_eV * C) / (wavelength * 1e-9);
  const ke = Math.max(0, photonE - workFn);
  const emits = photonE > workFn;
  const thresholdNm = (H_eV * C) / (workFn * 1e-9) * 1e9;

  // 물질파
  const [mass, setMass] = useState(1e-30); // kg (electron-like)
  const [velocity, setVelocity] = useState(1e6); // m/s
  const debroglie = H / (mass * velocity); // m
  const debroglieNm = debroglie * 1e9;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-1">
          전자기 유도 · 광전효과 · 물질파
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          전류는 어떻게 만들어지고, 빛은 입자이면서 파동이고, 전자도 파동이라는 사실을 직접 계산.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2 text-xs sm:text-sm">
        {(['induction', 'photoelectric', 'matterwave'] as Topic[]).map((id) => (
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
            {id === 'induction' ? '전자기 유도' : id === 'photoelectric' ? '광전효과' : '물질파'}
          </button>
        ))}
      </div>

      {topic === 'induction' && (
        <>
          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4">
            <svg viewBox="0 0 360 160" className="w-full h-auto" role="img" aria-label="전자기 유도">
              {/* B 필드 점 */}
              {Array.from({ length: 24 }).map((_, i) => (
                <circle key={i} cx={40 + (i % 8) * 36} cy={40 + Math.floor(i / 8) * 36} r={2} fill="#9ca3af" />
              ))}
              {/* 도선 */}
              <line x1={50} y1={30} x2={50} y2={130} stroke="#71717a" strokeWidth={2} />
              <line x1={310} y1={30} x2={310} y2={130} stroke="#71717a" strokeWidth={2} />
              <line x1={50} y1={30} x2={310} y2={30} stroke="#71717a" strokeWidth={2} />
              <line x1={50} y1={130} x2={310} y2={130} stroke="#71717a" strokeWidth={2} />
              {/* 움직이는 막대 */}
              <line
                x1={120 + vBar * 20}
                y1={30}
                x2={120 + vBar * 20}
                y2={130}
                stroke="#dc2626"
                strokeWidth={4}
              />
              <line
                x1={120 + vBar * 20 + 10}
                y1={80}
                x2={120 + vBar * 20 + 30}
                y2={80}
                stroke="#dc2626"
                strokeWidth={2}
                markerEnd="url(#arrV)"
              />
              <text x={120 + vBar * 20} y={150} fontSize={11} textAnchor="middle" fill="#dc2626" fontWeight={700}>
                v = {vBar} m/s
              </text>
              <text x={350} y={80} fontSize={11} textAnchor="end" fill="#16a34a" fontWeight={700}>
                ε = {emf.toFixed(2)} V
              </text>
              <defs>
                <marker id="arrV" viewBox="0 0 10 10" refX={9} refY={5} markerWidth={6} markerHeight={6} orient="auto">
                  <path d="M0,0 L10,5 L0,10 Z" fill="#dc2626" />
                </marker>
              </defs>
            </svg>
          </div>

          <SliderRow label="자기장 B" value={bField} min={0.1} max={2.0} step={0.05} onChange={setBField} unit=" T" />
          <SliderRow label="속도 v" value={vBar} min={0.5} max={5.0} step={0.1} onChange={setVBar} unit=" m/s" />
          <SliderRow label="막대 길이 L" value={length} min={0.1} max={1.0} step={0.05} onChange={setLength} unit=" m" />

          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3 text-sm">
            <div className="flex justify-between">
              <span>유도 기전력 ε = BLv</span>
              <span className="font-mono font-bold text-green-600 dark:text-green-400">
                {emf.toFixed(3)} V
              </span>
            </div>
          </div>

          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            패러데이의 법칙. 발전기·변압기·인덕션레인지 모두 이 식이 출발점.
          </p>
        </>
      )}

      {topic === 'photoelectric' && (
        <>
          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4">
            <svg viewBox="0 0 360 160" className="w-full h-auto" role="img" aria-label="광전효과">
              <rect x={20} y={50} width={20} height={70} fill="#71717a" />
              <line x1={300} y1={30} x2={50} y2={70} stroke={`hsl(${280 - (wavelength - 200) * 0.6}, 80%, 55%)`} strokeWidth={3} />
              <circle cx={300} cy={30} r={5} fill={`hsl(${280 - (wavelength - 200) * 0.6}, 80%, 55%)`} />
              {emits && (
                <>
                  <circle cx={60 + ke * 30} cy={90} r={6} fill="#3b82f6" stroke="#fff" strokeWidth={1} />
                  <text x={60 + ke * 30} y={84} fontSize={10} textAnchor="middle" fill="#3b82f6" fontWeight={700}>
                    e⁻
                  </text>
                </>
              )}
              <text x={30} y={140} fontSize={11} fill="#71717a" textAnchor="middle">
                금속
              </text>
            </svg>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3 text-sm space-y-1">
            <div className="flex justify-between">
              <span>광자 E = hc/λ</span>
              <span className="font-mono">{photonE.toFixed(2)} eV</span>
            </div>
            <div className="flex justify-between">
              <span>일함수 W</span>
              <span className="font-mono">{workFn.toFixed(2)} eV</span>
            </div>
            <div className="flex justify-between">
              <span>한계 파장 λ₀</span>
              <span className="font-mono">{thresholdNm.toFixed(0)} nm</span>
            </div>
            <div className="flex justify-between border-t border-zinc-200 dark:border-zinc-700 pt-1">
              <span className="font-bold">최대 KE</span>
              <span className={`font-mono font-bold ${emits ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-400'}`}>
                {emits ? `${ke.toFixed(2)} eV` : '방출 안 됨'}
              </span>
            </div>
          </div>

          <SliderRow label="빛 파장 λ" value={wavelength} min={200} max={700} step={10} onChange={setWavelength} unit=" nm" />
          <SliderRow label="일함수 W" value={workFn} min={1.5} max={5.0} step={0.1} onChange={setWorkFn} unit=" eV" />
        </>
      )}

      {topic === 'matterwave' && (
        <>
          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4">
            <svg viewBox="0 0 360 100" className="w-full h-auto" role="img" aria-label="물질파">
              {Array.from({ length: 60 }).map((_, i) => {
                const t = i / 60;
                const x = 20 + t * 320;
                const lambda = Math.max(8, Math.min(60, debroglieNm * 5));
                const y = 50 + 25 * Math.sin((t * 320 * 2 * Math.PI) / lambda);
                return <circle key={i} cx={x} cy={y} r={1.5} fill="#16a34a" />;
              })}
              <text x={180} y={92} fontSize={11} textAnchor="middle" fill="#16a34a" fontWeight={700}>
                λ = h / (mv) = {debroglieNm.toExponential(2)} nm
              </text>
            </svg>
          </div>

          <SliderRow
            label="질량 m (×10⁻³⁰ kg)"
            value={mass * 1e30}
            min={0.5}
            max={1000}
            step={0.5}
            onChange={(v) => setMass(v * 1e-30)}
            format={(v) => v.toFixed(1)}
          />
          <SliderRow
            label="속도 v (×10⁶ m/s)"
            value={velocity / 1e6}
            min={0.1}
            max={10}
            step={0.1}
            onChange={(v) => setVelocity(v * 1e6)}
            unit=" Mm/s"
          />

          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3 text-sm">
            <div className="flex justify-between">
              <span>드브로이 파장 λ</span>
              <span className="font-mono font-bold text-green-600 dark:text-green-400">
                {debroglieNm.toExponential(3)} nm
              </span>
            </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              전자(m ≈ 9.1×10⁻³¹ kg) 정도면 nm 단위 → 결정 격자 회절. 야구공은 너무 작아 관측 불가.
            </div>
          </div>
        </>
      )}
    </div>
  );
}
