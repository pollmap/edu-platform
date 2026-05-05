'use client';

// S-MEC 역학과 에너지 — 운동방정식·등가원리·열기관 사이클.

import { useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';

type Topic = 'projectile' | 'circular' | 'kepler';

const G = 9.8;

export function UnitSMECExplorer() {
  const [topic, setTopic] = useState<Topic>('projectile');

  // 포물선 운동
  const [v0, setV0] = useState(20);
  const [angleDeg, setAngleDeg] = useState(45);
  const angle = (angleDeg * Math.PI) / 180;
  const vx = v0 * Math.cos(angle);
  const vy = v0 * Math.sin(angle);
  const tFlight = (2 * vy) / G;
  const range = vx * tFlight;
  const hMax = (vy * vy) / (2 * G);

  // 원운동
  const [radius, setRadius] = useState(2);
  const [vCirc, setVCirc] = useState(5);
  const aCent = (vCirc * vCirc) / radius;
  const period = (2 * Math.PI * radius) / vCirc;

  // 케플러 (T² = a³, 천문단위)
  const [aAU, setAaAU] = useState(1);
  const Tyears = Math.pow(aAU, 1.5);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-1">
          포물선 · 등속원운동 · 케플러 제3법칙
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          F = ma, a = v²/r, T² ∝ a³ — 같은 중력으로 행성도 야구공도 설명돼요.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2 text-xs sm:text-sm">
        {(['projectile', 'circular', 'kepler'] as Topic[]).map((id) => (
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
            {id === 'projectile' ? '포물선' : id === 'circular' ? '원운동' : '케플러'}
          </button>
        ))}
      </div>

      {topic === 'projectile' && (
        <>
          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4">
            <svg viewBox="0 0 360 200" className="w-full h-auto" role="img" aria-label="포물선 운동">
              <line x1={20} y1={180} x2={340} y2={180} stroke="#71717a" strokeWidth={1.5} />
              {Array.from({ length: 30 }).map((_, i) => {
                const t = (i / 29) * tFlight;
                const x = 20 + (vx * t * 320) / Math.max(range, 1);
                const y = 180 - ((vy * t - 0.5 * G * t * t) * 150) / Math.max(hMax, 1);
                return <circle key={i} cx={x} cy={y} r={2} fill="#16a34a" />;
              })}
              <text x={20} y={195} fontSize={10} fill="#71717a">
                0
              </text>
              <text x={340} y={195} fontSize={10} textAnchor="end" fill="#71717a">
                {range.toFixed(1)} m
              </text>
            </svg>
          </div>

          <SliderRow label="초기 속도 v₀" value={v0} min={5} max={60} step={1} onChange={setV0} unit=" m/s" />
          <SliderRow
            label="발사각 θ"
            value={angleDeg}
            min={5}
            max={85}
            step={1}
            onChange={setAngleDeg}
            format={(v) => v.toFixed(0)}
            unit=" °"
          />

          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3 text-sm space-y-1">
            <div className="flex justify-between">
              <span>최고 높이 h</span>
              <span className="font-mono">{hMax.toFixed(1)} m</span>
            </div>
            <div className="flex justify-between">
              <span>비행 시간 t</span>
              <span className="font-mono">{tFlight.toFixed(2)} s</span>
            </div>
            <div className="flex justify-between border-t border-zinc-200 dark:border-zinc-700 pt-1">
              <span className="font-bold">수평 거리 R</span>
              <span className="font-mono font-bold text-green-600 dark:text-green-400">
                {range.toFixed(1)} m
              </span>
            </div>
          </div>

          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            45°에서 사거리 최대. R = v₀² sin(2θ)/g. 공기저항 무시 시.
          </p>
        </>
      )}

      {topic === 'circular' && (
        <>
          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4">
            <svg viewBox="0 0 360 200" className="w-full h-auto" role="img" aria-label="원운동">
              <circle cx={180} cy={100} r={60} fill="none" stroke="#71717a" strokeWidth={1.5} strokeDasharray="3 3" />
              <circle cx={180} cy={100} r={4} fill="#71717a" />
              <circle cx={240} cy={100} r={8} fill="#16a34a" stroke="#fff" strokeWidth={1.5} />
              <line x1={240} y1={100} x2={240} y2={70} stroke="#dc2626" strokeWidth={2} markerEnd="url(#arrR)" />
              <text x={258} y={86} fontSize={10} fill="#dc2626" fontWeight={700}>
                v
              </text>
              <line x1={240} y1={100} x2={200} y2={100} stroke="#3b82f6" strokeWidth={2} markerEnd="url(#arrB)" />
              <text x={208} y={94} fontSize={10} fill="#3b82f6" fontWeight={700}>
                a_c
              </text>
              <text x={180} y={180} fontSize={11} textAnchor="middle" fill="#71717a">
                반지름 r = {radius.toFixed(1)} m
              </text>
              <defs>
                <marker id="arrR" viewBox="0 0 10 10" refX={9} refY={5} markerWidth={5} markerHeight={5} orient="auto">
                  <path d="M0,0 L10,5 L0,10 Z" fill="#dc2626" />
                </marker>
                <marker id="arrB" viewBox="0 0 10 10" refX={9} refY={5} markerWidth={5} markerHeight={5} orient="auto">
                  <path d="M0,0 L10,5 L0,10 Z" fill="#3b82f6" />
                </marker>
              </defs>
            </svg>
          </div>

          <SliderRow label="반지름 r" value={radius} min={0.5} max={10} step={0.1} onChange={setRadius} unit=" m" />
          <SliderRow label="속도 v" value={vCirc} min={1} max={20} step={0.5} onChange={setVCirc} unit=" m/s" />

          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3 text-sm space-y-1">
            <div className="flex justify-between">
              <span>구심 가속도 a_c = v²/r</span>
              <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                {aCent.toFixed(2)} m/s²
              </span>
            </div>
            <div className="flex justify-between">
              <span>주기 T = 2πr/v</span>
              <span className="font-mono">{period.toFixed(2)} s</span>
            </div>
          </div>
        </>
      )}

      {topic === 'kepler' && (
        <>
          <SliderRow
            label="궤도 반지름 a (AU)"
            value={aAU}
            min={0.3}
            max={40}
            step={0.1}
            onChange={setAaAU}
            unit=" AU"
          />

          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3 text-sm space-y-1">
            <div className="flex justify-between">
              <span>케플러: T² = a³</span>
              <span className="font-mono">a³ = {Math.pow(aAU, 3).toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t border-zinc-200 dark:border-zinc-700 pt-1">
              <span className="font-bold">공전 주기 T</span>
              <span className="font-mono font-bold text-green-600 dark:text-green-400">
                {Tyears.toFixed(2)} 년
              </span>
            </div>
          </div>

          <div className="text-xs text-zinc-500 dark:text-zinc-400 space-y-1">
            <div>지구 1 AU → 1 년 ✓</div>
            <div>화성 1.52 AU → 1.88 년</div>
            <div>목성 5.2 AU → 11.86 년</div>
            <div>해왕성 30 AU → 165 년</div>
          </div>
        </>
      )}
    </div>
  );
}
