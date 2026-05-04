'use client';

// M7-GM-03 평면도형의 성질 — n각형 내각합 / 외각합 시뮬레이터.
// 변 개수 n을 바꾸면 (n-2)·180° 공식으로 내각합이 즉시 계산되고,
// 정n각형 한 내각, 한 외각, 외각의 합 360°(고정)을 함께 보여줘요.

import { useMemo, useState } from 'react';

const MIN_N = 3;
const MAX_N = 12;

interface PolygonGeo {
  points: string;
  cx: number;
  cy: number;
}

function buildRegularPolygon(n: number, radius: number, cx: number, cy: number): PolygonGeo {
  // SVG: y축은 아래로 양수. 정n각형은 위쪽 꼭짓점을 시작점으로.
  const pts: string[] = [];
  for (let i = 0; i < n; i++) {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    pts.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }
  return { points: pts.join(' '), cx, cy };
}

const POLYGON_NAME: Record<number, string> = {
  3: '삼각형',
  4: '사각형',
  5: '오각형',
  6: '육각형',
  7: '칠각형',
  8: '팔각형',
  9: '구각형',
  10: '십각형',
  11: '십일각형',
  12: '십이각형',
};

export function PolygonInteriorAngleExplorer() {
  const [n, setN] = useState(5);

  const interiorSum = (n - 2) * 180;
  const oneInterior = interiorSum / n;
  const oneExterior = 360 / n;

  const cx = 150;
  const cy = 150;
  const radius = 110;
  const geo = useMemo(() => buildRegularPolygon(n, radius, cx, cy), [n]);

  // 한 꼭짓점에서 (n-3)개의 대각선 → (n-2)개의 삼각형 분할.
  // 첫 꼭짓점(위쪽)에서 모든 다른 꼭짓점에 선을 그어요.
  const points = geo.points.split(' ').map((p) => {
    const [x, y] = p.split(',').map(Number);
    return { x, y };
  });
  const apex = points[0];
  const diagonals = points.slice(2, points.length - 1).map((pt, i) => ({
    key: i,
    x1: apex.x,
    y1: apex.y,
    x2: pt.x,
    y2: pt.y,
  }));

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          n각형 내각합 — (n − 2) × 180°
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          꼭짓점 수 n을 바꿔 보세요. 한 꼭짓점에서 대각선을 그으면 (n − 2)개의 삼각형으로 나뉘어요.
        </p>
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-4">
        <svg viewBox="0 0 300 300" className="w-full max-w-[420px] mx-auto block">
          {/* 분할된 삼각형들 (반투명 색상) */}
          {Array.from({ length: n - 2 }, (_, i) => {
            const a = apex;
            const b = points[i + 1];
            const c = points[i + 2];
            const hue = (i * 360) / Math.max(1, n - 2);
            return (
              <polygon
                key={`tri-${i}`}
                points={`${a.x},${a.y} ${b.x},${b.y} ${c.x},${c.y}`}
                fill={`hsl(${hue}, 75%, 75%)`}
                fillOpacity="0.45"
                stroke="none"
              />
            );
          })}

          {/* 다각형 외곽선 */}
          <polygon
            points={geo.points}
            fill="none"
            stroke="#1e40af"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* 대각선 (한 꼭짓점에서) */}
          {diagonals.map((d) => (
            <line
              key={`diag-${d.key}`}
              x1={d.x1}
              y1={d.y1}
              x2={d.x2}
              y2={d.y2}
              stroke="#94a3b8"
              strokeWidth="1.2"
              strokeDasharray="4 3"
            />
          ))}

          {/* 꼭짓점 */}
          {points.map((p, i) => (
            <circle
              key={`pt-${i}`}
              cx={p.x}
              cy={p.y}
              r="3.5"
              fill={i === 0 ? '#dc2626' : '#1e40af'}
            />
          ))}

          {/* 중앙 라벨 */}
          <text x={cx} y={cy + 5} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">
            {POLYGON_NAME[n] ?? `${n}각형`}
          </text>
        </svg>
      </div>

      <div className="space-y-2">
        <div className="flex items-baseline justify-between">
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            꼭짓점 수 n
          </span>
          <span className="font-mono text-blue-700 dark:text-blue-400 text-lg font-bold">{n}</span>
        </div>
        <input
          type="range"
          min={MIN_N}
          max={MAX_N}
          value={n}
          onChange={(e) => setN(Number(e.target.value))}
          className="w-full h-3 cursor-pointer"
          aria-label="꼭짓점 수"
        />
        <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
          <span>{MIN_N}</span>
          <span>{MAX_N}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/30 p-4">
          <div className="text-xs text-zinc-600 dark:text-zinc-400">내각의 합</div>
          <div className="text-xl font-bold text-blue-700 dark:text-blue-400 font-mono">
            ({n} − 2) × 180° = {interiorSum.toLocaleString('ko-KR')}°
          </div>
          <div className="text-xs text-zinc-700 dark:text-zinc-300 mt-1">
            정{POLYGON_NAME[n] ?? `${n}각형`}의 한 내각: {oneInterior.toFixed(2)}°
          </div>
        </div>
        <div className="rounded-xl border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-950/30 p-4">
          <div className="text-xs text-zinc-600 dark:text-zinc-400">외각의 합 (n에 무관)</div>
          <div className="text-xl font-bold text-orange-700 dark:text-orange-400 font-mono">
            항상 360°
          </div>
          <div className="text-xs text-zinc-700 dark:text-zinc-300 mt-1">
            정{POLYGON_NAME[n] ?? `${n}각형`}의 한 외각: {oneExterior.toFixed(2)}°
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-4 text-xs text-zinc-700 dark:text-zinc-300 space-y-1.5">
        <p>
          <strong>왜 (n − 2) × 180?</strong> 한 꼭짓점에서 대각선을 그으면 다각형이 (n − 2)개의 삼각형으로 쪼개져요.
          삼각형 한 개의 내각합이 180°이니, n각형 내각합은 <strong>(n − 2) × 180°</strong>.
        </p>
        <p>
          <strong>외각합이 항상 360°?</strong> 다각형 둘레를 한 바퀴 도는 동안 방향이 한 바퀴(360°) 도는 셈이에요. 그래서 변 개수와 상관없이 외각의 합은 360°.
        </p>
      </div>
    </div>
  );
}
