'use client';

// S-ESS 지구시스템과학 — 탄소·물·질소 순환 + 단순 기후 복사 균형 모델.

import { useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';

type Cycle = 'carbon' | 'water' | 'nitrogen' | 'energy';

const STEFAN = 5.67e-8;
const SOLAR = 1361; // W/m^2

export function UnitSESSExplorer() {
  const [cycle, setCycle] = useState<Cycle>('carbon');

  // 에너지 균형 (간단 모델)
  const [albedo, setAlbedo] = useState(0.3);
  const [emissivity, setEmissivity] = useState(0.61); // 온실효과 포함 effective
  const absorbed = (SOLAR * (1 - albedo)) / 4; // W/m^2 평균
  const Tk = Math.pow(absorbed / (emissivity * STEFAN), 0.25);
  const Tc = Tk - 273.15;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-1">
          지구의 4대 순환 · 복사 균형으로 본 지구 온도
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          탄소·물·질소가 어떻게 돌고, 알베도와 온실효과가 평균 기온을 어떻게 정하는지.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
        {(['carbon', 'water', 'nitrogen', 'energy'] as Cycle[]).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setCycle(id)}
            className={`min-h-[44px] rounded-lg px-2 ${
              cycle === id
                ? 'bg-green-600 text-white font-semibold'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
            }`}
          >
            {id === 'carbon' ? '탄소' : id === 'water' ? '물' : id === 'nitrogen' ? '질소' : '복사'}
          </button>
        ))}
      </div>

      {cycle === 'carbon' && (
        <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4">
          <svg viewBox="0 0 360 200" className="w-full h-auto" role="img" aria-label="탄소순환">
            <rect x={20} y={20} width={120} height={60} fill="#bfdbfe" stroke="#3b82f6" strokeWidth={1.5} rx={6} />
            <text x={80} y={45} fontSize={11} textAnchor="middle" fill="#1d4ed8" fontWeight={700}>
              대기 CO₂
            </text>
            <text x={80} y={62} fontSize={10} textAnchor="middle" fill="#1d4ed8">
              ~880 GtC
            </text>
            <rect x={220} y={20} width={120} height={60} fill="#dcfce7" stroke="#22c55e" strokeWidth={1.5} rx={6} />
            <text x={280} y={45} fontSize={11} textAnchor="middle" fill="#16a34a" fontWeight={700}>
              생물권
            </text>
            <text x={280} y={62} fontSize={10} textAnchor="middle" fill="#16a34a">
              ~560 GtC
            </text>
            <rect x={20} y={130} width={120} height={50} fill="#bae6fd" stroke="#0ea5e9" strokeWidth={1.5} rx={6} />
            <text x={80} y={155} fontSize={11} textAnchor="middle" fill="#0369a1" fontWeight={700}>
              해양
            </text>
            <text x={80} y={172} fontSize={10} textAnchor="middle" fill="#0369a1">
              ~38000 GtC
            </text>
            <rect x={220} y={130} width={120} height={50} fill="#fef3c7" stroke="#eab308" strokeWidth={1.5} rx={6} />
            <text x={280} y={155} fontSize={11} textAnchor="middle" fill="#a16207" fontWeight={700}>
              화석연료·암석
            </text>
            <text x={280} y={172} fontSize={10} textAnchor="middle" fill="#a16207">
              ~10⁷ GtC
            </text>
            {/* 화살표 */}
            <line x1={140} y1={50} x2={220} y2={50} stroke="#22c55e" strokeWidth={2} markerEnd="url(#arr)" />
            <text x={180} y={42} fontSize={9} textAnchor="middle" fill="#16a34a">
              광합성
            </text>
            <line x1={220} y1={70} x2={140} y2={70} stroke="#dc2626" strokeWidth={2} markerEnd="url(#arrR)" />
            <text x={180} y={82} fontSize={9} textAnchor="middle" fill="#dc2626">
              호흡·연소
            </text>
            <line x1={80} y1={80} x2={80} y2={130} stroke="#0ea5e9" strokeWidth={2} markerEnd="url(#arrB)" />
            <text x={100} y={108} fontSize={9} fill="#0369a1">
              용해
            </text>
            <line x1={280} y1={130} x2={280} y2={80} stroke="#dc2626" strokeWidth={2} markerEnd="url(#arrR)" />
            <text x={310} y={108} fontSize={9} fill="#dc2626">
              연소 9 Gt/yr
            </text>
            <defs>
              <marker id="arr" viewBox="0 0 10 10" refX={9} refY={5} markerWidth={5} markerHeight={5} orient="auto">
                <path d="M0,0 L10,5 L0,10 Z" fill="#22c55e" />
              </marker>
              <marker id="arrR" viewBox="0 0 10 10" refX={9} refY={5} markerWidth={5} markerHeight={5} orient="auto">
                <path d="M0,0 L10,5 L0,10 Z" fill="#dc2626" />
              </marker>
              <marker id="arrB" viewBox="0 0 10 10" refX={9} refY={5} markerWidth={5} markerHeight={5} orient="auto">
                <path d="M0,0 L10,5 L0,10 Z" fill="#0ea5e9" />
              </marker>
            </defs>
          </svg>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
            인간 활동(연소 ≈ 9 GtC/yr)이 자연 균형을 깨면서 대기 CO₂가 산업혁명 전 280 ppm → 현재 420 ppm 이상으로 상승.
          </p>
        </div>
      )}

      {cycle === 'water' && (
        <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4 text-sm space-y-2">
          <div className="font-bold text-green-600 dark:text-green-400">물 순환의 4단계</div>
          <ul className="list-disc pl-5 space-y-1">
            <li>증발(해양 89 %·육지 11 %) → 대기 수증기</li>
            <li>응결 → 구름 형성</li>
            <li>강수 → 육지·해양으로 분배</li>
            <li>유출 → 하천·지하수 → 해양 환원</li>
          </ul>
          <div className="text-xs text-zinc-500 dark:text-zinc-400">
            대기 중 수증기 평균 체류시간 약 9일. 순환량은 연 ~ 5×10¹⁴ m³.
          </div>
        </div>
      )}

      {cycle === 'nitrogen' && (
        <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4 text-sm space-y-2">
          <div className="font-bold text-green-600 dark:text-green-400">질소 순환 핵심 4과정</div>
          <ol className="list-decimal pl-5 space-y-1">
            <li>고정 — N₂ → NH₃ (뿌리혹·번개·하버-보슈)</li>
            <li>질산화 — NH₃ → NO₂⁻ → NO₃⁻ (질화세균)</li>
            <li>동화 — 식물이 NO₃⁻ 흡수 → 단백질</li>
            <li>탈질 — NO₃⁻ → N₂ (탈질세균)</li>
          </ol>
          <div className="text-xs text-zinc-500 dark:text-zinc-400">
            인간의 화학비료가 자연 고정량의 2배 이상 추가 → 부영양화·아산화질소(N₂O) 증가.
          </div>
        </div>
      )}

      {cycle === 'energy' && (
        <>
          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4">
            <svg viewBox="0 0 360 160" className="w-full h-auto" role="img" aria-label="복사 균형">
              <circle cx={70} cy={80} r={28} fill="#fde68a" stroke="#eab308" strokeWidth={2} />
              <text x={70} y={84} fontSize={11} textAnchor="middle" fill="#a16207" fontWeight={700}>
                태양
              </text>
              <line x1={100} y1={80} x2={170} y2={80} stroke="#eab308" strokeWidth={2} markerEnd="url(#arrY)" />
              <text x={135} y={72} fontSize={10} textAnchor="middle" fill="#a16207">
                {SOLAR} W/m²
              </text>
              <circle cx={230} cy={80} r={36} fill="#bfdbfe" stroke="#3b82f6" strokeWidth={2} />
              <text x={230} y={78} fontSize={11} textAnchor="middle" fill="#1d4ed8" fontWeight={700}>
                지구
              </text>
              <text x={230} y={94} fontSize={11} textAnchor="middle" fill="#1d4ed8" fontWeight={700}>
                {Tc.toFixed(1)} °C
              </text>
              <line x1={270} y1={80} x2={340} y2={80} stroke="#dc2626" strokeWidth={2} markerEnd="url(#arrR)" />
              <text x={310} y={72} fontSize={10} textAnchor="middle" fill="#dc2626">
                σT⁴ 방출
              </text>
              <defs>
                <marker id="arrY" viewBox="0 0 10 10" refX={9} refY={5} markerWidth={5} markerHeight={5} orient="auto">
                  <path d="M0,0 L10,5 L0,10 Z" fill="#eab308" />
                </marker>
                <marker id="arrR" viewBox="0 0 10 10" refX={9} refY={5} markerWidth={5} markerHeight={5} orient="auto">
                  <path d="M0,0 L10,5 L0,10 Z" fill="#dc2626" />
                </marker>
              </defs>
            </svg>
          </div>

          <SliderRow
            label="알베도 α"
            value={albedo}
            min={0.05}
            max={0.6}
            step={0.01}
            onChange={setAlbedo}
            format={(v) => v.toFixed(2)}
          />
          <SliderRow
            label="유효 방출률 ε (온실효과 포함)"
            value={emissivity}
            min={0.4}
            max={1.0}
            step={0.01}
            onChange={setEmissivity}
            format={(v) => v.toFixed(2)}
          />

          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3 text-sm space-y-1">
            <div className="flex justify-between">
              <span>흡수 에너지</span>
              <span className="font-mono">{absorbed.toFixed(1)} W/m²</span>
            </div>
            <div className="flex justify-between border-t border-zinc-200 dark:border-zinc-700 pt-1">
              <span className="font-bold">평형 온도</span>
              <span className="font-mono font-bold text-green-600 dark:text-green-400">
                {Tc.toFixed(1)} °C
              </span>
            </div>
          </div>

          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            ε=1(완전 방출체)이면 −19 °C. 현재 ~14 °C는 온실가스가 ε ≈ 0.61로 낮춰 주는 덕분. CO₂ 추가 → ε ↘ → T ↗.
          </p>
        </>
      )}
    </div>
  );
}
