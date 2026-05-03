'use client';

import { useEffect, useRef, useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const PARTICLE_COUNT = 60;

function statesByTemp(temp: number): { label: string; color: string; clusterStrength: number; speed: number } {
  if (temp < 35) {
    return { label: '고체', color: '#1e40af', clusterStrength: 0.6, speed: 0.4 };
  }
  if (temp < 70) {
    return { label: '액체', color: '#0d9488', clusterStrength: 0.15, speed: 1.0 };
  }
  return { label: '기체', color: '#dc2626', clusterStrength: 0.0, speed: 2.5 };
}

export function ParticleStateSimulator() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number | null>(null);
  const [temp, setTemp] = useState(20);
  const [running, setRunning] = useState(true);

  // 초기화
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const W = canvas.width;
    const H = canvas.height;
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
    }));
  }, []);

  // 애니메이션 루프
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;

    let lastT = performance.now();

    const step = (now: number) => {
      const dt = Math.min(0.05, (now - lastT) / 1000);
      lastT = now;
      const state = statesByTemp(temp);
      const targetSpeed = state.speed;
      const cluster = state.clusterStrength;

      const cx = W / 2;
      const cy = H / 2;

      for (const p of particlesRef.current) {
        // 입자별 속도 정규화 (온도 기준)
        const sp = Math.hypot(p.vx, p.vy) || 0.001;
        const factor = 0.96 + 0.08 * Math.tanh(targetSpeed - sp);
        p.vx *= factor;
        p.vy *= factor;

        // 클러스터링 (응집력 — 고체일수록 ↑)
        if (cluster > 0) {
          p.vx += (cx - p.x) * cluster * dt * 0.5;
          p.vy += (cy - p.y) * cluster * dt * 0.5;
        }

        // 위치 업데이트
        p.x += p.vx * targetSpeed * 30 * dt;
        p.y += p.vy * targetSpeed * 30 * dt;

        // 벽 반사
        if (p.x < 6) { p.x = 6; p.vx = -p.vx; }
        if (p.x > W - 6) { p.x = W - 6; p.vx = -p.vx; }
        if (p.y < 6) { p.y = 6; p.vy = -p.vy; }
        if (p.y > H - 6) { p.y = H - 6; p.vy = -p.vy; }
      }

      // 그리기
      ctx.fillStyle = 'rgba(0,0,0,0)';
      ctx.clearRect(0, 0, W, H);
      // 배경
      ctx.strokeStyle = 'rgba(120,120,120,0.2)';
      ctx.lineWidth = 1;
      ctx.strokeRect(2, 2, W - 4, H - 4);
      // 입자
      ctx.fillStyle = state.color;
      for (const p of particlesRef.current) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
        ctx.fill();
      }

      if (running) {
        rafRef.current = requestAnimationFrame(step);
      }
    };

    if (running) {
      rafRef.current = requestAnimationFrame(step);
    }

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [running, temp]);

  const state = statesByTemp(temp);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800">
      <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-1">
        입자 모형 — 온도와 물질의 상태
      </h2>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
        온도가 낮으면 입자들이 가깝게 모여 있고(고체), 높을수록 빠르고 자유롭게 움직여요(기체).
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="aspect-square rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden">
          <canvas ref={canvasRef} width={400} height={400} className="w-full h-full block" />
        </div>
        <div className="space-y-4">
          <SliderRow
            label="온도"
            value={temp}
            min={0}
            max={100}
            step={1}
            onChange={setTemp}
            unit=" ℃"
          />
          <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 p-4 text-sm">
            <div className="font-bold text-amber-900 dark:text-amber-200 mb-1">현재 상태</div>
            <div className="font-mono text-zinc-800 dark:text-zinc-200">
              {state.label} (입자 평균 속도 ≈ {state.speed.toFixed(1)})
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2">
              ※ 시각화이며 실제 물질의 상태 변화 온도(녹는점·끓는점)는 물질마다 다릅니다.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setRunning((r) => !r)}
            className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 min-h-[44px]"
          >
            {running ? '⏸ 정지' : '▶ 재생'}
          </button>
        </div>
      </div>
    </div>
  );
}
