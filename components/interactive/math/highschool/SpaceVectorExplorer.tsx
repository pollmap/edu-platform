'use client';

// M-GE-06 공간벡터 — 3차원 벡터 합·내적·크기.

import { useEffect, useRef, useState } from 'react';
import { MathFormula } from '@/components/primitives/MathFormula';
import { SliderRow } from '@/components/primitives/SliderRow';

interface V3 {
  x: number;
  y: number;
  z: number;
}

export function SpaceVectorExplorer() {
  const [u, setU] = useState<V3>({ x: 2, y: 1, z: 1 });
  const [v, setV] = useState<V3>({ x: 1, y: 2, z: 0.5 });
  const [yaw, setYaw] = useState(40);
  const [pitch, setPitch] = useState(20);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const dot = u.x * v.x + u.y * v.y + u.z * v.z;
  const magU = Math.sqrt(u.x ** 2 + u.y ** 2 + u.z ** 2);
  const magV = Math.sqrt(v.x ** 2 + v.y ** 2 + v.z ** 2);
  const cosTheta = magU * magV > 0 ? dot / (magU * magV) : 0;
  const angle = (Math.acos(Math.min(1, Math.max(-1, cosTheta))) * 180) / Math.PI;
  const sum: V3 = { x: u.x + v.x, y: u.y + v.y, z: u.z + v.z };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    drawVecs(ctx, canvas.width, canvas.height, u, v, sum, yaw, pitch);
  }, [u, v, sum, yaw, pitch]);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          공간벡터 — 3차원의 벡터 합과 내적
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          평면벡터와 공식이 같아요. 단지 z 성분이 추가됐을 뿐.
        </p>
      </div>

      <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 p-3 text-center">
        <MathFormula tex={'\\vec u \\cdot \\vec v = u_1v_1 + u_2v_2 + u_3v_3 = |\\vec u||\\vec v|\\cos\\theta'} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="aspect-square rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden">
          <canvas ref={canvasRef} width={500} height={500} className="w-full h-full block" />
        </div>
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-3 gap-1">
            <SliderRow label="u.x" value={u.x} min={-3} max={3} step={0.1} onChange={(val) => setU({ ...u, x: val })} />
            <SliderRow label="u.y" value={u.y} min={-3} max={3} step={0.1} onChange={(val) => setU({ ...u, y: val })} />
            <SliderRow label="u.z" value={u.z} min={-3} max={3} step={0.1} onChange={(val) => setU({ ...u, z: val })} />
          </div>
          <div className="grid grid-cols-3 gap-1">
            <SliderRow label="v.x" value={v.x} min={-3} max={3} step={0.1} onChange={(val) => setV({ ...v, x: val })} />
            <SliderRow label="v.y" value={v.y} min={-3} max={3} step={0.1} onChange={(val) => setV({ ...v, y: val })} />
            <SliderRow label="v.z" value={v.z} min={-3} max={3} step={0.1} onChange={(val) => setV({ ...v, z: val })} />
          </div>
          <div className="grid grid-cols-2 gap-1">
            <SliderRow label="회전" value={yaw} min={0} max={360} step={1} onChange={setYaw} format={(v) => v.toFixed(0)} unit="°" />
            <SliderRow label="기울기" value={pitch} min={-60} max={60} step={1} onChange={setPitch} format={(v) => v.toFixed(0)} unit="°" />
          </div>
          <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 p-3 text-sm space-y-1">
            <p>|u| = <span className="font-mono">{magU.toFixed(3)}</span>, |v| = <span className="font-mono">{magV.toFixed(3)}</span></p>
            <p>u·v = <span className="font-mono">{dot.toFixed(3)}</span></p>
            <p>각도 θ ≈ <span className="font-mono">{angle.toFixed(1)}°</span></p>
            <p>u + v = <span className="font-mono">({sum.x.toFixed(2)}, {sum.y.toFixed(2)}, {sum.z.toFixed(2)})</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

function project(p: V3, yaw: number, pitch: number): { x: number; y: number } {
  const cy = Math.cos(yaw),
    sy = Math.sin(yaw);
  const cp = Math.cos(pitch),
    sp = Math.sin(pitch);
  const x1 = cy * p.x - sy * p.y;
  const z1 = sy * p.x + cy * p.y;
  const y1 = p.z;
  const y2 = cp * y1 - sp * z1;
  return { x: x1, y: y2 };
}

function drawVecs(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  u: V3,
  v: V3,
  sum: V3,
  yawDeg: number,
  pitchDeg: number,
) {
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, W, H);

  const yaw = (yawDeg * Math.PI) / 180;
  const pitch = (pitchDeg * Math.PI) / 180;
  const scale = 60;
  const cx = W / 2,
    cy = H / 2;

  const toS = (p: V3) => {
    const pr = project(p, yaw, pitch);
    return [cx + pr.x * scale, cy - pr.y * scale];
  };

  const drawArrow = (a: V3, b: V3, color: string, label: string) => {
    const [ax, ay] = toS(a);
    const [bx, by] = toS(b);
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.lineTo(bx, by);
    ctx.stroke();
    // 화살촉
    const angle = Math.atan2(by - ay, bx - ax);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(bx, by);
    ctx.lineTo(bx - 12 * Math.cos(angle - 0.4), by - 12 * Math.sin(angle - 0.4));
    ctx.lineTo(bx - 12 * Math.cos(angle + 0.4), by - 12 * Math.sin(angle + 0.4));
    ctx.closePath();
    ctx.fill();
    ctx.font = 'bold 14px system-ui';
    ctx.fillText(label, bx + 6, by - 6);
  };

  // 축
  const axisLen: V3[] = [
    { x: 3, y: 0, z: 0 },
    { x: 0, y: 3, z: 0 },
    { x: 0, y: 0, z: 3 },
  ];
  const axisColor = ['#dc2626', '#16a34a', '#2563eb'];
  const axisLabel = ['x', 'y', 'z'];
  for (let i = 0; i < 3; i++) {
    drawArrow({ x: 0, y: 0, z: 0 }, axisLen[i], axisColor[i], axisLabel[i]);
  }

  drawArrow({ x: 0, y: 0, z: 0 }, u, '#1e40af', 'u');
  drawArrow({ x: 0, y: 0, z: 0 }, v, '#7c3aed', 'v');
  drawArrow({ x: 0, y: 0, z: 0 }, sum, '#f59e0b', 'u+v');
}
