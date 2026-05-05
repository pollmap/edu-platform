'use client';

// S9-MA-02 기체의 성질 — 보일·샤를 법칙 + 이상기체 PV=nRT.
// P, V, T 슬라이더와 입자 시뮬레이션으로 미시-거시 연결.

import { useEffect, useMemo, useRef, useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';

const W = 360;
const H = 220;
const N_PARTICLES = 22;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

// V를 컨테이너 폭(왼쪽 벽 위치)으로 매핑
function volumeToWall(V: number) {
  // V 50~200 → wallX 80~310
  return 80 + ((V - 50) / 150) * 230;
}

export function GasLawSimulator() {
  const [pressure, setPressure] = useState(1.0); // atm
  const [volume, setVolume] = useState(120); // mL
  const [temperature, setTemperature] = useState(300); // K
  const [mode, setMode] = useState<'boyle' | 'charles'>('boyle');

  // P*V = n*R*T 가 일정하도록 한 슬라이더 변경 시 다른 변수 업데이트
  // 보일: T 고정 → P↑이면 V↓
  // 샤를: P 고정 → T↑이면 V↑

  const updatePressure = (p: number) => {
    setPressure(p);
    if (mode === 'boyle') {
      // P1V1 = P2V2 → V = (P0*V0)/P
      const newV = (1.0 * 120) / p;
      setVolume(Math.max(50, Math.min(200, newV)));
    }
  };

  const updateTemperature = (t: number) => {
    setTemperature(t);
    if (mode === 'charles') {
      // V/T = const → V = (V0/T0)*T
      const newV = (120 / 300) * t;
      setVolume(Math.max(50, Math.min(200, newV)));
    }
  };

  // 입자 시뮬레이션
  const wallX = volumeToWall(volume);
  const particlesRef = useRef<Particle[]>([]);
  const [tick, setTick] = useState(0);

  if (particlesRef.current.length === 0) {
    particlesRef.current = Array.from({ length: N_PARTICLES }).map(() => ({
      x: 90 + Math.random() * 200,
      y: 30 + Math.random() * 160,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
    }));
  }

  useEffect(() => {
    const speed = Math.sqrt(temperature / 300);
    const id = setInterval(() => {
      particlesRef.current = particlesRef.current.map((p) => {
        let nx = p.x + p.vx * speed;
        let ny = p.y + p.vy * speed;
        let nvx = p.vx;
        let nvy = p.vy;
        if (nx < 80) {
          nx = 80;
          nvx = -nvx;
        }
        if (nx > wallX) {
          nx = wallX;
          nvx = -nvx;
        }
        if (ny < 20) {
          ny = 20;
          nvy = -nvy;
        }
        if (ny > 200) {
          ny = 200;
          nvy = -nvy;
        }
        return { x: nx, y: ny, vx: nvx, vy: nvy };
      });
      setTick((t) => t + 1);
    }, 50);
    return () => clearInterval(id);
  }, [wallX, temperature]);

  const product = useMemo(() => (pressure * volume) / temperature, [pressure, volume, temperature]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => {
            setMode('boyle');
            setPressure(1.0);
            setVolume(120);
            setTemperature(300);
          }}
          className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium min-h-[44px] ${
            mode === 'boyle'
              ? 'bg-emerald-600 text-white'
              : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
          }`}
        >
          보일 법칙 (T 고정, PV=일정)
        </button>
        <button
          type="button"
          onClick={() => {
            setMode('charles');
            setPressure(1.0);
            setVolume(120);
            setTemperature(300);
          }}
          className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium min-h-[44px] ${
            mode === 'charles'
              ? 'bg-emerald-600 text-white'
              : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
          }`}
        >
          샤를 법칙 (P 고정, V/T=일정)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <SliderRow
          label="압력 P (atm)"
          value={pressure}
          min={0.5}
          max={3}
          step={0.05}
          onChange={updatePressure}
          format={(v) => v.toFixed(2)}
        />
        <SliderRow
          label="부피 V (mL)"
          value={volume}
          min={50}
          max={200}
          step={1}
          onChange={(v) => setVolume(v)}
          format={(v) => v.toFixed(0)}
        />
        <SliderRow
          label="온도 T (K)"
          value={temperature}
          min={150}
          max={600}
          step={5}
          onChange={updateTemperature}
          format={(v) => v.toFixed(0)}
        />
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-900 p-3 border border-zinc-200 dark:border-zinc-700">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="기체 입자 시뮬레이션">
          {/* 컨테이너 */}
          <rect x={80} y={20} width={wallX - 80} height={180} fill="rgba(16,185,129,0.06)" stroke="#10b981" strokeWidth={2} />
          {/* 피스톤(이동 벽) */}
          <rect x={wallX - 4} y={15} width={8} height={190} fill="#fbbf24" />
          <text x={wallX} y={12} textAnchor="middle" fontSize="10" fill="currentColor" opacity={0.7}>
            ↔ 피스톤
          </text>
          {/* 입자 */}
          {particlesRef.current.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={3.5} fill="#3b82f6" />
          ))}
          {/* 라벨 */}
          <text x={84} y={215} fontSize="10" fill="currentColor" opacity={0.7}>
            T={temperature.toFixed(0)}K · P={pressure.toFixed(2)}atm
          </text>
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center text-sm">
        <div className="rounded-lg bg-zinc-100 dark:bg-zinc-800 p-2">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">PV</div>
          <div className="font-bold text-zinc-900 dark:text-zinc-100">{(pressure * volume).toFixed(1)}</div>
        </div>
        <div className="rounded-lg bg-zinc-100 dark:bg-zinc-800 p-2">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">V/T</div>
          <div className="font-bold text-zinc-900 dark:text-zinc-100">{(volume / temperature).toFixed(3)}</div>
        </div>
        <div className="rounded-lg bg-emerald-100 dark:bg-emerald-950/40 p-2">
          <div className="text-xs text-emerald-700 dark:text-emerald-300">PV/T (일정?)</div>
          <div className="font-bold text-emerald-800 dark:text-emerald-200">{product.toFixed(3)}</div>
        </div>
      </div>

      <div className="text-xs text-zinc-500 dark:text-zinc-400">
        💡 보일(1662): 온도가 일정하면 P×V=일정. 샤를(1787): 압력이 일정하면 V/T=일정. 둘을 합치면 이상기체 방정식 PV=nRT 가 됩니다.
        T(K)가 절대온도(켈빈)인 이유는 V/T가 음수가 되면 안 되기 때문이에요.
      </div>
    </div>
  );
}
