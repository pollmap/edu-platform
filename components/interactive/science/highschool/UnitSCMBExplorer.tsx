'use client';

// S-CMB 세포와 물질대사 — 해당과정 → TCA → 산화적 인산화 ATP 회계 + 광합성 명·암반응 토글.

import { useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';

type Topic = 'respiration' | 'photosynthesis';

const RESPIRATION_STAGES = [
  { id: 'glycolysis', label: '해당과정', site: '세포질', net: 2, nadh: 2, fadh2: 0 },
  { id: 'pyruvate', label: '피루브산 산화', site: '미토콘드리아 기질', net: 0, nadh: 2, fadh2: 0 },
  { id: 'tca', label: 'TCA 회로', site: '미토콘드리아 기질', net: 2, nadh: 6, fadh2: 2 },
  { id: 'oxphos', label: '산화적 인산화', site: '내막', net: 0, nadh: 0, fadh2: 0 },
] as const;

export function UnitSCMBExplorer() {
  const [topic, setTopic] = useState<Topic>('respiration');
  const [glucose, setGlucose] = useState(1); // 분자 수
  const [lightIntensity, setLightIntensity] = useState(60); // %
  const [co2Level, setCo2Level] = useState(400); // ppm

  // ATP 회계 (이론값)
  // 해당 4 - 2 = 2 ATP
  // TCA 2 ATP
  // NADH 10개 * 2.5 = 25
  // FADH2 2개 * 1.5 = 3
  // 합계 32 ATP
  const totalNADH = 10;
  const totalFADH2 = 2;
  const directATP = 4;
  const totalATP = (directATP + totalNADH * 2.5 + totalFADH2 * 1.5) * glucose;

  // 광합성 비율
  const photoRate = Math.min(
    100,
    Math.round((Math.log(lightIntensity + 1) / Math.log(101)) * 100 * Math.min(1, co2Level / 1000)),
  );

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-1">
          ATP 회계 · 빛이 곧 당분
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          포도당 1분자가 어떻게 32 ATP가 되는지, 빛이 어떻게 CO₂를 당으로 바꾸는지 추적해 보세요.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm">
        {(['respiration', 'photosynthesis'] as Topic[]).map((id) => (
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
            {id === 'respiration' ? '세포호흡' : '광합성'}
          </button>
        ))}
      </div>

      {topic === 'respiration' ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {RESPIRATION_STAGES.map((stage) => (
              <div key={stage.id} className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3 text-sm">
                <div className="font-bold text-green-600 dark:text-green-400">{stage.label}</div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">{stage.site}</div>
                <div className="grid grid-cols-3 gap-1 text-xs">
                  <span>ATP {stage.net}</span>
                  <span>NADH {stage.nadh}</span>
                  <span>FADH₂ {stage.fadh2}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3 text-sm space-y-1">
            <div className="flex justify-between">
              <span>NADH × 2.5 ATP</span>
              <span className="font-mono">{(totalNADH * 2.5 * glucose).toFixed(1)}</span>
            </div>
            <div className="flex justify-between">
              <span>FADH₂ × 1.5 ATP</span>
              <span className="font-mono">{(totalFADH2 * 1.5 * glucose).toFixed(1)}</span>
            </div>
            <div className="flex justify-between">
              <span>기질 인산화 ATP</span>
              <span className="font-mono">{(directATP * glucose).toFixed(0)}</span>
            </div>
            <div className="flex justify-between border-t border-zinc-200 dark:border-zinc-700 pt-1">
              <span className="font-bold">총 ATP</span>
              <span className="font-mono font-bold text-green-600 dark:text-green-400">
                {totalATP.toFixed(1)}
              </span>
            </div>
          </div>

          <SliderRow
            label="포도당 분자 수"
            value={glucose}
            min={1}
            max={5}
            step={1}
            onChange={setGlucose}
            format={(v) => v.toFixed(0)}
            unit="개"
          />

          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            P/O 비율(NADH=2.5, FADH₂=1.5)을 적용한 현대 교과서 기준. 옛 교과서의 38 ATP는 P/O=3·2 가정.
          </p>
        </>
      ) : (
        <>
          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4">
            <svg viewBox="0 0 360 180" className="w-full h-auto" role="img" aria-label="광합성">
              <rect x={20} y={40} width={320} height={100} rx={12} fill="#dcfce7" stroke="#22c55e" strokeWidth={1.5} />
              <text x={180} y={32} fontSize={11} textAnchor="middle" fill="#16a34a" fontWeight={700}>
                엽록체
              </text>
              {/* 명반응 */}
              <ellipse cx={110} cy={90} rx={60} ry={32} fill="#fef9c3" stroke="#eab308" strokeWidth={1.5} />
              <text x={110} y={88} fontSize={11} textAnchor="middle" fill="#a16207" fontWeight={700}>
                명반응
              </text>
              <text x={110} y={102} fontSize={9} textAnchor="middle" fill="#a16207">
                (틸라코이드)
              </text>
              {/* 화살표 */}
              <line x1={170} y1={90} x2={210} y2={90} stroke="#22c55e" strokeWidth={2} markerEnd="url(#arr)" />
              <text x={190} y={84} fontSize={9} textAnchor="middle" fill="#16a34a">
                ATP·NADPH
              </text>
              {/* 암반응 */}
              <ellipse cx={260} cy={90} rx={60} ry={32} fill="#bfdbfe" stroke="#3b82f6" strokeWidth={1.5} />
              <text x={260} y={88} fontSize={11} textAnchor="middle" fill="#1d4ed8" fontWeight={700}>
                암반응
              </text>
              <text x={260} y={102} fontSize={9} textAnchor="middle" fill="#1d4ed8">
                (캘빈회로)
              </text>
              {/* 광자 */}
              <circle cx={50} cy={50} r={4} fill="#fbbf24" opacity={lightIntensity / 100} />
              <line x1={50} y1={55} x2={90} y2={75} stroke="#fbbf24" strokeWidth={1.5} opacity={lightIntensity / 100} />
              <text x={50} y={42} fontSize={9} textAnchor="middle" fill="#a16207">
                hν
              </text>
              {/* CO2 */}
              <text x={310} y={48} fontSize={11} textAnchor="middle" fill="#1d4ed8" fontWeight={700}>
                CO₂
              </text>
              <line x1={310} y1={55} x2={290} y2={75} stroke="#3b82f6" strokeWidth={1.5} opacity={Math.min(1, co2Level / 1000)} />
              {/* 산물 */}
              <text x={260} y={130} fontSize={11} textAnchor="middle" fill="#16a34a" fontWeight={700}>
                C₆H₁₂O₆
              </text>
              <text x={110} y={130} fontSize={11} textAnchor="middle" fill="#16a34a" fontWeight={700}>
                O₂
              </text>
              <defs>
                <marker id="arr" viewBox="0 0 10 10" refX={9} refY={5} markerWidth={5} markerHeight={5} orient="auto">
                  <path d="M0,0 L10,5 L0,10 Z" fill="#22c55e" />
                </marker>
              </defs>
            </svg>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3 text-sm space-y-1">
            <div className="flex justify-between">
              <span>광합성 속도</span>
              <span className="font-mono font-bold text-green-600 dark:text-green-400">
                {photoRate} %
              </span>
            </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              저광·저 CO₂에서는 둘 중 하나가 「제한 요인」. 충분한 빛이라도 CO₂가 부족하면 정체.
            </div>
          </div>

          <SliderRow
            label="빛 세기"
            value={lightIntensity}
            min={0}
            max={100}
            step={5}
            onChange={setLightIntensity}
            format={(v) => v.toFixed(0)}
            unit=" %"
          />
          <SliderRow
            label="CO₂ 농도"
            value={co2Level}
            min={50}
            max={1500}
            step={50}
            onChange={setCo2Level}
            format={(v) => v.toFixed(0)}
            unit=" ppm"
          />

          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            6CO₂ + 6H₂O + 빛 → C₆H₁₂O₆ + 6O₂. 명반응이 ATP·NADPH를 만들고, 암반응(캘빈)이 그것으로 CO₂를 당으로 바꿔요.
          </p>
        </>
      )}
    </div>
  );
}
