'use client';

// S-PHY-06 빛과 파동 — 이중슬릿 간섭무늬 시뮬.

import { useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';

export function WaveInterferenceExplorer() {
  const [wavelength, setWavelength] = useState(550); // nm
  const [slitGap, setSlitGap] = useState(0.2); // mm
  const [screenDist, setScreenDist] = useState(1.0); // m

  // 무늬 간격 Δy = λL/d
  const lambda_m = wavelength * 1e-9;
  const d_m = slitGap * 1e-3;
  const fringeSpacing = (lambda_m * screenDist) / d_m; // m
  const fringeMm = fringeSpacing * 1000;

  const W = 360;
  const H = 200;
  const cy = H / 2;
  const screenX = W - 30;

  // 색상 (가시광선 파장 → 대략적인 색)
  const colorOf = (nm: number) => {
    if (nm < 440) return '#7c3aed';
    if (nm < 490) return '#2563eb';
    if (nm < 510) return '#10b981';
    if (nm < 580) return '#eab308';
    if (nm < 645) return '#ea580c';
    return '#dc2626';
  };
  const color = colorOf(wavelength);

  // 간섭무늬 강도 분포 (cos²)
  const intensities: { y: number; I: number }[] = [];
  const SAMPLES = 80;
  for (let i = 0; i <= SAMPLES; i++) {
    const yPx = (i / SAMPLES) * H;
    const yPos = (yPx - cy) / 12; // mm 단위 변환
    const phase = (Math.PI * d_m * (yPos / 1000)) / (lambda_m * screenDist);
    const I = Math.cos(phase) ** 2;
    intensities.push({ y: yPx, I });
  }

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-1">
          파동은 겹쳐서 무늬를 만들어요
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          이중 슬릿을 통과한 빛은 보강·상쇄 간섭으로 줄무늬를 만들어요.
          무늬 간격 Δy = λL / d.
        </p>
      </div>

      <div className="bg-zinc-900 rounded-xl p-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="이중슬릿 간섭">
          {/* 슬릿 */}
          <rect x={50} y={0} width={4} height={cy - 12} fill="#52525b" />
          <rect x={50} y={cy - 8} width={4} height={16} fill="transparent" />
          <rect x={50} y={cy + 12} width={4} height={H - cy - 12} fill="#52525b" />
          {/* 광원 → 슬릿 */}
          <line x1={10} y1={cy} x2={50} y2={cy} stroke={color} strokeWidth={2} />
          {/* 슬릿 → 스크린 (회절) */}
          {[-1, 0, 1].map((k) => (
            <line key={k} x1={54} y1={cy + k * 4} x2={screenX} y2={cy + k * 30} stroke={color} strokeWidth={0.6} opacity={0.4} />
          ))}
          {/* 스크린 */}
          <rect x={screenX} y={0} width={6} height={H} fill="#0f172a" />
          {/* 강도 분포 */}
          {intensities.map((p, i) => (
            <rect
              key={i}
              x={screenX + 8}
              y={p.y}
              width={28}
              height={H / SAMPLES + 0.5}
              fill={color}
              opacity={p.I * 0.95}
            />
          ))}
        </svg>
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3 text-sm">
        <div className="flex justify-between">
          <span className="text-zinc-600 dark:text-zinc-300">무늬 간격 Δy</span>
          <span className="font-mono font-bold text-red-500">{fringeMm.toFixed(2)} mm</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-600 dark:text-zinc-300">색</span>
          <span className="font-mono">
            <span style={{ color }}>●</span> {wavelength} nm
          </span>
        </div>
      </div>

      <SliderRow label="파장 λ" value={wavelength} min={400} max={750} step={10} onChange={setWavelength} unit=" nm" />
      <SliderRow label="슬릿 간격 d" value={slitGap} min={0.05} max={1.0} step={0.05} onChange={setSlitGap} unit=" mm" />
      <SliderRow label="스크린 거리 L" value={screenDist} min={0.3} max={3.0} step={0.1} onChange={setScreenDist} unit=" m" />

      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        파장이 길수록(빨강) · 슬릿 간격이 좁을수록 · 스크린이 멀수록 무늬가 넓어져요.
      </p>
    </div>
  );
}
