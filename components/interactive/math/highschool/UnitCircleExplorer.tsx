'use client';

// M-AL-03 삼각함수 — 단위원 위의 점 (cos θ, sin θ).

import { useEffect, useRef, useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';

export function UnitCircleExplorer() {
  const [degrees, setDegrees] = useState(60);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const radians = (degrees * Math.PI) / 180;
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  const tan = Math.abs(cos) > 0.001 ? sin / cos : NaN;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    drawUnitCircle(ctx, canvas.width, canvas.height, radians);
  }, [radians]);

  const quadrant =
    sin >= 0 && cos >= 0 ? 'I' : sin >= 0 && cos < 0 ? 'II' : sin < 0 && cos < 0 ? 'III' : 'IV';

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          삼각함수 — 단위원의 좌표
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          반지름 1인 원 위의 점이 각도에 따라 어떻게 움직이는지가 sin·cos·tan의 정의예요.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="aspect-square rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden">
          <canvas ref={canvasRef} width={500} height={500} className="w-full h-full block" />
        </div>
        <div className="flex flex-col gap-4">
          <SliderRow
            label="각도 θ"
            value={degrees}
            min={0}
            max={360}
            step={5}
            onChange={setDegrees}
            unit="°"
          />
          <div className="grid grid-cols-3 gap-2 text-center">
            <ValueBox color="rose" label="sin θ" value={sin.toFixed(3)} />
            <ValueBox color="blue" label="cos θ" value={cos.toFixed(3)} />
            <ValueBox color="emerald" label="tan θ" value={Number.isNaN(tan) ? '∞' : tan.toFixed(3)} />
          </div>
          <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 p-3 text-sm space-y-1">
            <p>제 {quadrant} 사분면</p>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              부호 패턴: I(+,+), II(−,+), III(−,−), IV(+,−). 항상 sin² + cos² = 1.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {[0, 30, 45, 60, 90, 180, 270].map((deg) => (
              <button
                key={deg}
                type="button"
                onClick={() => setDegrees(deg)}
                className="px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-sm hover:border-blue-700 transition-colors min-h-[44px]"
              >
                {deg}°
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface ValueBoxProps {
  color: 'rose' | 'blue' | 'emerald';
  label: string;
  value: string;
}

function ValueBox({ color, label, value }: ValueBoxProps) {
  const colors: Record<ValueBoxProps['color'], string> = {
    rose: 'bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300',
    blue: 'bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300',
    emerald: 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300',
  };
  return (
    <div className={`rounded-lg p-3 ${colors[color]}`}>
      <div className="text-xs font-semibold">{label}</div>
      <div className="font-mono text-lg">{value}</div>
    </div>
  );
}

function drawUnitCircle(ctx: CanvasRenderingContext2D, W: number, H: number, theta: number) {
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, W, H);

  const cx = W / 2;
  const cy = H / 2;
  const R = Math.min(W, H) * 0.4;

  // 격자
  ctx.strokeStyle = '#e5e7eb';
  ctx.lineWidth = 1;
  for (let i = -1; i <= 1; i += 0.5) {
    ctx.beginPath();
    ctx.moveTo(cx + i * R, 0);
    ctx.lineTo(cx + i * R, H);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, cy - i * R);
    ctx.lineTo(W, cy - i * R);
    ctx.stroke();
  }

  // 축
  ctx.strokeStyle = '#1f2937';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, cy);
  ctx.lineTo(W, cy);
  ctx.moveTo(cx, 0);
  ctx.lineTo(cx, H);
  ctx.stroke();

  // 단위원
  ctx.strokeStyle = '#9ca3af';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, 2 * Math.PI);
  ctx.stroke();

  const px = cx + R * Math.cos(theta);
  const py = cy - R * Math.sin(theta);

  // 각도 부채꼴
  ctx.fillStyle = 'rgba(245, 158, 11, 0.2)';
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.arc(cx, cy, R * 0.3, 0, -theta, theta < 0);
  ctx.closePath();
  ctx.fill();

  // 반지름선
  ctx.strokeStyle = '#3b82f6';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(px, py);
  ctx.stroke();

  // sin (수직선)
  ctx.strokeStyle = '#f43f5e';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(px, cy);
  ctx.lineTo(px, py);
  ctx.stroke();

  // cos (수평선)
  ctx.strokeStyle = '#1e40af';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(px, cy);
  ctx.stroke();

  // 점
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.arc(px, py, 7, 0, 2 * Math.PI);
  ctx.fill();

  // 라벨
  ctx.fillStyle = '#1f2937';
  ctx.font = 'bold 13px sans-serif';
  ctx.fillText('cos θ', cx + (px - cx) / 2 - 18, cy + 16);
  ctx.fillText('sin θ', px + 8, cy + (py - cy) / 2 + 4);
  ctx.fillText('1', cx + (px - cx) / 2 - 6, cy + (py - cy) / 2 - 8);
}
