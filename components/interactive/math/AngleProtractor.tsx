'use client';

// M4-GM-01 각도 — 각도기 시각화 + 분류.

import { useState } from 'react';

export function AngleProtractor() {
  const [angle, setAngle] = useState(45);

  const classify = (a: number) =>
    a === 0 ? '0도' :
    a < 90 ? '예각 (acute)' :
    a === 90 ? '직각 (right)' :
    a < 180 ? '둔각 (obtuse)' :
    a === 180 ? '평각 (straight)' : '반사각 (reflex)';

  const color =
    angle < 90 ? '#3b82f6' :
    angle === 90 ? '#16a34a' :
    angle < 180 ? '#f59e0b' :
    angle === 180 ? '#a855f7' : '#dc2626';

  const cx = 150;
  const cy = 160;
  const r = 110;
  const rad = (angle * Math.PI) / 180;
  const ex = cx + r * Math.cos(-rad);
  const ey = cy - r * Math.sin(rad);

  const arcLargeFlag = angle > 180 ? 1 : 0;
  const arcRadius = 30;
  const arcEndX = cx + arcRadius * Math.cos(-rad);
  const arcEndY = cy - arcRadius * Math.sin(rad);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          각도기 — 0°부터 360°까지
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          각도는 두 변이 만드는 벌어진 정도를 0~360으로 표시해요. 슬라이더로 각도를 바꿔 보세요.
        </p>
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-4">
        <svg viewBox="0 0 300 200" className="w-full max-w-[400px] mx-auto block">
          <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`} fill="none" stroke="#94a3b8" strokeWidth="1" />
          {[0, 30, 60, 90, 120, 150, 180].map((a) => {
            const ar = (a * Math.PI) / 180;
            const x1 = cx + (r - 5) * Math.cos(-ar);
            const y1 = cy - (r - 5) * Math.sin(ar);
            const x2 = cx + r * Math.cos(-ar);
            const y2 = cy - r * Math.sin(ar);
            return (
              <g key={a}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#64748b" strokeWidth="0.8" />
                <text
                  x={cx + (r + 12) * Math.cos(-ar)}
                  y={cy - (r + 12) * Math.sin(ar) + 3}
                  fontSize="9"
                  textAnchor="middle"
                  fill="#64748b"
                >
                  {a}
                </text>
              </g>
            );
          })}

          <line x1={cx - r} y1={cy} x2={cx + r} y2={cy} stroke="#475569" strokeWidth="2" />
          <line x1={cx} y1={cy} x2={ex} y2={ey} stroke={color} strokeWidth="2.5" strokeLinecap="round" />

          {angle > 0 && (
            <path
              d={`M ${cx + arcRadius} ${cy} A ${arcRadius} ${arcRadius} 0 ${arcLargeFlag} 0 ${arcEndX} ${arcEndY}`}
              fill={color}
              fillOpacity="0.25"
              stroke={color}
              strokeWidth="1.5"
            />
          )}

          <circle cx={cx} cy={cy} r="4" fill={color} />
          <text x={cx} y={cy + 18} textAnchor="middle" fontSize="11" fontWeight="bold" fill={color}>
            {angle}°
          </text>
        </svg>
      </div>

      <div className="space-y-1">
        <div className="text-xs font-medium text-zinc-700 dark:text-zinc-300">각도: {angle}°</div>
        <input
          type="range"
          min={0}
          max={360}
          value={angle}
          onChange={(e) => setAngle(Number(e.target.value))}
          className="w-full h-3 cursor-pointer"
          aria-label="각도"
        />
      </div>

      <div className="rounded-xl border-l-4 p-4" style={{ borderColor: color, background: color + '11' }}>
        <div className="text-lg font-bold" style={{ color }}>{classify(angle)}</div>
        <div className="text-sm text-zinc-700 dark:text-zinc-300 mt-1">
          {angle === 90 && '두 직선이 정확히 수직으로 만나요. 사각형의 모서리, 책의 모서리.'}
          {angle === 180 && '두 변이 일직선. 시계의 6시 방향.'}
          {angle < 90 && angle > 0 && '90도보다 작아요. 시계의 1시 방향이 약 30도.'}
          {angle > 90 && angle < 180 && '90도보다 크고 180도보다 작아요. 시계의 5시 방향이 약 150도.'}
          {angle > 180 && '180도를 넘어선 큰 각이에요. 보통 360°-각도로 표시하기도 해요.'}
          {angle === 0 && '두 변이 겹쳐 있어요.'}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
        {[
          { label: '예각', range: '0 < a < 90', c: '#3b82f6' },
          { label: '직각', range: 'a = 90', c: '#16a34a' },
          { label: '둔각', range: '90 < a < 180', c: '#f59e0b' },
          { label: '평각', range: 'a = 180', c: '#a855f7' },
          { label: '반사각', range: '180 < a < 360', c: '#dc2626' },
        ].map((t) => (
          <div key={t.label} className="rounded-md border border-zinc-200 dark:border-zinc-700 p-2 text-center">
            <div style={{ color: t.c }} className="font-bold">{t.label}</div>
            <div className="text-zinc-500 font-mono text-[10px]">{t.range}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
