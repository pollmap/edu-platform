'use client';

// M-AL-05 사인·코사인 법칙 — 임의 삼각형의 변·각 관계.

import { useEffect, useRef, useState } from 'react';
import { MathFormula } from '@/components/primitives/MathFormula';
import { SliderRow } from '@/components/primitives/SliderRow';

export function SineCosineLawExplorer() {
  const [a, setA] = useState(5);
  const [b, setB] = useState(7);
  const [angleC, setAngleC] = useState(60); // 끼인각 C (도)
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 코사인 법칙으로 c 계산: c² = a² + b² − 2ab·cosC
  const C_rad = (angleC * Math.PI) / 180;
  const cSquared = a * a + b * b - 2 * a * b * Math.cos(C_rad);
  const c = Math.sqrt(Math.max(0, cSquared));

  // 사인 법칙: a/sinA = b/sinB = c/sinC = 2R
  const sinC = Math.sin(C_rad);
  const twoR = c / Math.max(1e-9, sinC);
  const sinA = a / twoR;
  const sinB = b / twoR;
  const angleA = (Math.asin(Math.min(1, Math.max(-1, sinA))) * 180) / Math.PI;
  const angleB = (Math.asin(Math.min(1, Math.max(-1, sinB))) * 180) / Math.PI;
  const R = twoR / 2;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    drawTriangle(ctx, canvas.width, canvas.height, a, b, angleC, c, R);
  }, [a, b, angleC, c, R]);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          사인·코사인 법칙 — 임의 삼각형의 황금 공식 두 개
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          두 변과 끼인각만 알면 나머지가 모두 결정돼요.
        </p>
      </div>

      <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 p-3 space-y-2 text-center">
        <div className="text-sm text-zinc-600 dark:text-zinc-300">코사인 법칙</div>
        <MathFormula tex={'c^2 = a^2 + b^2 - 2ab\\cos C'} />
        <div className="text-sm text-zinc-600 dark:text-zinc-300 pt-2">사인 법칙</div>
        <MathFormula tex={'\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C} = 2R'} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="aspect-square rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden">
          <canvas ref={canvasRef} width={500} height={500} className="w-full h-full block" />
        </div>
        <div className="flex flex-col gap-3">
          <SliderRow label="변 a" value={a} min={2} max={10} step={0.1} onChange={setA} />
          <SliderRow label="변 b" value={b} min={2} max={10} step={0.1} onChange={setB} />
          <SliderRow
            label="끼인각 C"
            value={angleC}
            min={20}
            max={160}
            step={1}
            onChange={setAngleC}
            format={(v) => v.toFixed(0)}
            unit="°"
          />
          <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 p-3 text-sm space-y-1">
            <p>
              c = <span className="font-mono">{c.toFixed(3)}</span>
            </p>
            <p>
              ∠A ≈ <span className="font-mono">{angleA.toFixed(1)}°</span>, ∠B ≈{' '}
              <span className="font-mono">{angleB.toFixed(1)}°</span>
            </p>
            <p>
              외접원 반지름 R ≈ <span className="font-mono">{R.toFixed(3)}</span>
            </p>
            <p className="text-xs text-zinc-500 mt-1">합 A+B+C = {(angleA + angleB + angleC).toFixed(1)}°</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function drawTriangle(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  a: number,
  b: number,
  angleC: number,
  c: number,
  R: number,
) {
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, W, H);

  // 자동 스케일
  const maxLen = Math.max(a, b, c, 2 * R);
  const scale = (Math.min(W, H) * 0.32) / maxLen;
  const cx = W / 2;
  const cy = H / 2 + scale * 1.5;

  // 꼭짓점: C=(0,0), B=(a,0) (가로축), A는 끼인각 C로 b만큼 떨어진 곳
  const C_rad = (angleC * Math.PI) / 180;
  const Cx = 0,
    Cy = 0;
  const Bx = a,
    By = 0;
  const Ax = b * Math.cos(C_rad);
  const Ay = b * Math.sin(C_rad);

  // 중심 정렬
  const ox = (Cx + Bx + Ax) / 3;
  const oy = (Cy + By + Ay) / 3;

  const toPx = (x: number, y: number): [number, number] => [cx + (x - ox) * scale, cy - (y - oy) * scale];

  const [pCx, pCy] = toPx(Cx, Cy);
  const [pBx, pBy] = toPx(Bx, By);
  const [pAx, pAy] = toPx(Ax, Ay);

  // 외접원
  const Ox = (Cx + Bx + Ax) / 3;
  const Oy = (Cy + By + Ay) / 3;
  // (정확 외심 계산 생략 — R 시각화 위해 무게중심 기준 근사 표시)

  // 삼각형 채움
  ctx.beginPath();
  ctx.moveTo(pCx, pCy);
  ctx.lineTo(pBx, pBy);
  ctx.lineTo(pAx, pAy);
  ctx.closePath();
  ctx.fillStyle = 'rgba(59, 130, 246, 0.15)';
  ctx.fill();
  ctx.strokeStyle = '#1e40af';
  ctx.lineWidth = 3;
  ctx.stroke();

  // 변 라벨
  ctx.font = 'bold 18px system-ui';
  ctx.fillStyle = '#dc2626';
  ctx.textAlign = 'center';
  ctx.fillText('a', (pBx + pCx) / 2, (pBy + pCy) / 2 + 22);
  ctx.fillText('b', (pAx + pCx) / 2 - 16, (pAy + pCy) / 2);
  ctx.fillText('c', (pAx + pBx) / 2 + 16, (pAy + pBy) / 2);

  // 꼭짓점 라벨
  ctx.fillStyle = '#1f2937';
  ctx.font = 'bold 16px system-ui';
  ctx.fillText('A', pAx, pAy - 10);
  ctx.fillText('B', pBx + 14, pBy + 6);
  ctx.fillText('C', pCx - 14, pCy + 6);

  // 끼인각 호
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(pCx, pCy, 24, -C_rad, 0);
  ctx.stroke();

  // 결과값 표기
  void Ox;
  void Oy;
}
