'use client';

// M-GE-05 공간도형·공간좌표 — 두 점 사이 거리, 중점, 단순 투영.

import { useEffect, useRef, useState } from 'react';
import { MathFormula } from '@/components/primitives/MathFormula';
import { SliderRow } from '@/components/primitives/SliderRow';

interface Pt3 {
  x: number;
  y: number;
  z: number;
}

export function SpaceCoordinateExplorer() {
  const [P, setP] = useState<Pt3>({ x: 1, y: 2, z: 1 });
  const [Q, setQ] = useState<Pt3>({ x: 3, y: 1, z: 2 });
  const [yaw, setYaw] = useState(35);
  const [pitch, setPitch] = useState(25);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const dist = Math.sqrt((P.x - Q.x) ** 2 + (P.y - Q.y) ** 2 + (P.z - Q.z) ** 2);
  const mid: Pt3 = { x: (P.x + Q.x) / 2, y: (P.y + Q.y) / 2, z: (P.z + Q.z) / 2 };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    draw3D(ctx, canvas.width, canvas.height, P, Q, mid, yaw, pitch);
  }, [P, Q, yaw, pitch]);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          공간좌표 — 3차원으로 확장된 거리·중점
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          평면의 피타고라스를 z축까지 한 번 더 적용하면 공간 거리 공식이에요.
        </p>
      </div>

      <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 p-3 text-center">
        <MathFormula tex={'\\overline{PQ} = \\sqrt{(x_1-x_2)^2 + (y_1-y_2)^2 + (z_1-z_2)^2}'} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="aspect-square rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden">
          <canvas ref={canvasRef} width={500} height={500} className="w-full h-full block" />
        </div>
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-3 gap-1">
            <SliderRow label="P.x" value={P.x} min={-4} max={4} step={0.1} onChange={(v) => setP({ ...P, x: v })} />
            <SliderRow label="P.y" value={P.y} min={-4} max={4} step={0.1} onChange={(v) => setP({ ...P, y: v })} />
            <SliderRow label="P.z" value={P.z} min={-4} max={4} step={0.1} onChange={(v) => setP({ ...P, z: v })} />
          </div>
          <div className="grid grid-cols-3 gap-1">
            <SliderRow label="Q.x" value={Q.x} min={-4} max={4} step={0.1} onChange={(v) => setQ({ ...Q, x: v })} />
            <SliderRow label="Q.y" value={Q.y} min={-4} max={4} step={0.1} onChange={(v) => setQ({ ...Q, y: v })} />
            <SliderRow label="Q.z" value={Q.z} min={-4} max={4} step={0.1} onChange={(v) => setQ({ ...Q, z: v })} />
          </div>
          <div className="grid grid-cols-2 gap-1">
            <SliderRow label="회전 yaw" value={yaw} min={0} max={360} step={1} onChange={setYaw} format={(v) => v.toFixed(0)} unit="°" />
            <SliderRow label="기울기 pitch" value={pitch} min={-60} max={60} step={1} onChange={setPitch} format={(v) => v.toFixed(0)} unit="°" />
          </div>
          <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 p-3 text-sm space-y-1">
            <p>거리 PQ = <span className="font-mono">{dist.toFixed(3)}</span></p>
            <p>중점 M = <span className="font-mono">({mid.x.toFixed(2)}, {mid.y.toFixed(2)}, {mid.z.toFixed(2)})</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

function project(p: Pt3, yaw: number, pitch: number): { x: number; y: number; depth: number } {
  const cy = Math.cos(yaw),
    sy = Math.sin(yaw);
  const cp = Math.cos(pitch),
    sp = Math.sin(pitch);
  const x1 = cy * p.x - sy * p.y;
  const z1 = sy * p.x + cy * p.y;
  const y1 = p.z;
  const y2 = cp * y1 - sp * z1;
  const z2 = sp * y1 + cp * z1;
  return { x: x1, y: y2, depth: z2 };
}

function draw3D(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  P: Pt3,
  Q: Pt3,
  M: Pt3,
  yawDeg: number,
  pitchDeg: number,
) {
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, W, H);

  const yaw = (yawDeg * Math.PI) / 180;
  const pitch = (pitchDeg * Math.PI) / 180;
  const scale = 50;
  const cx = W / 2,
    cy = H / 2;

  const toScreen = (p: Pt3) => {
    const pr = project(p, yaw, pitch);
    return [cx + pr.x * scale, cy - pr.y * scale];
  };

  // 축
  const axes: [Pt3, Pt3, string, string][] = [
    [{ x: -4, y: 0, z: 0 }, { x: 4, y: 0, z: 0 }, '#dc2626', 'x'],
    [{ x: 0, y: -4, z: 0 }, { x: 0, y: 4, z: 0 }, '#16a34a', 'y'],
    [{ x: 0, y: 0, z: -4 }, { x: 0, y: 0, z: 4 }, '#2563eb', 'z'],
  ];
  ctx.lineWidth = 1.5;
  for (const [s, e, color, label] of axes) {
    const [sx, sy] = toScreen(s);
    const [ex, ey] = toScreen(e);
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(ex, ey);
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.font = 'bold 14px system-ui';
    ctx.fillText(label, ex + 6, ey - 6);
  }

  // PQ 선
  const [pxS, pyS] = toScreen(P);
  const [qxS, qyS] = toScreen(Q);
  const [mxS, myS] = toScreen(M);

  ctx.strokeStyle = '#1e40af';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(pxS, pyS);
  ctx.lineTo(qxS, qyS);
  ctx.stroke();

  // 점들
  const drawPt = (sx: number, sy: number, color: string, label: string) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(sx, sy, 7, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 13px system-ui';
    ctx.fillText(label, sx + 10, sy - 8);
  };
  drawPt(pxS, pyS, '#1e40af', 'P');
  drawPt(qxS, qyS, '#1e40af', 'Q');
  drawPt(mxS, myS, '#f59e0b', 'M');
}
