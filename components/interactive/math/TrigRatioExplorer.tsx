'use client';

// M9-GM-01 삼각비 — 직각삼각형 + 단위원에서 sin/cos/tan 동시 표시.

import { useState } from 'react';

export function TrigRatioExplorer() {
  const [degrees, setDegrees] = useState(30);
  const rad = (degrees * Math.PI) / 180;

  const sinV = Math.sin(rad);
  const cosV = Math.cos(rad);
  const tanV = Math.tan(rad);

  // 단위원 시각화
  const cx = 100;
  const cy = 110;
  const R = 80;
  const px = cx + R * cosV;
  const py = cy - R * sinV;

  return (
    <div className="space-y-4">
      <div className="bg-zinc-50 dark:bg-zinc-800 p-3 rounded-lg">
        <div className="flex justify-between mb-2 text-sm">
          <span className="font-bold text-blue-700 dark:text-blue-400">각도 θ</span>
          <span className="font-mono text-red-500 font-semibold">{degrees}°</span>
        </div>
        <input
          type="range"
          min={0}
          max={89}
          step={1}
          value={degrees}
          onChange={(e) => setDegrees(parseInt(e.target.value, 10))}
          className="w-full h-3 cursor-pointer accent-blue-600"
        />
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-900 p-3 rounded-lg flex justify-center">
        <svg viewBox="0 0 220 220" className="w-full max-w-md aspect-square">
          {/* 축 */}
          <line x1={20} y1={cy} x2={200} y2={cy} stroke="#9ca3af" strokeWidth="1" />
          <line x1={cx} y1={20} x2={cx} y2={200} stroke="#9ca3af" strokeWidth="1" />
          {/* 단위원 */}
          <circle cx={cx} cy={cy} r={R} fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3" />
          {/* 빗변 */}
          <line x1={cx} y1={cy} x2={px} y2={py} stroke="#1e3a8a" strokeWidth="2.5" />
          {/* 밑변 (cos) */}
          <line x1={cx} y1={cy} x2={px} y2={cy} stroke="#dc2626" strokeWidth="2.5" />
          {/* 높이 (sin) */}
          <line x1={px} y1={cy} x2={px} y2={py} stroke="#16a34a" strokeWidth="2.5" />
          {/* 점 */}
          <circle cx={px} cy={py} r={4} fill="#1e3a8a" />
          {/* 각도 호 */}
          <path
            d={`M ${cx + 30} ${cy} A 30 30 0 0 0 ${cx + 30 * cosV} ${cy - 30 * sinV}`}
            fill="none"
            stroke="#7c3aed"
            strokeWidth="1.5"
          />
          <text x={cx + 36} y={cy - 8} fontSize="11" fill="#7c3aed">θ</text>
          <text x={(cx + px) / 2} y={cy + 14} fontSize="10" fill="#dc2626">cos</text>
          <text x={px + 5} y={(cy + py) / 2} fontSize="10" fill="#16a34a">sin</text>
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-2 text-sm">
        <div className="bg-zinc-100 dark:bg-zinc-800 p-2 rounded text-center">
          <div className="text-xs text-zinc-500">sin θ</div>
          <div className="font-bold text-green-600 dark:text-green-400 font-mono">{sinV.toFixed(3)}</div>
        </div>
        <div className="bg-zinc-100 dark:bg-zinc-800 p-2 rounded text-center">
          <div className="text-xs text-zinc-500">cos θ</div>
          <div className="font-bold text-red-600 dark:text-red-400 font-mono">{cosV.toFixed(3)}</div>
        </div>
        <div className="bg-zinc-100 dark:bg-zinc-800 p-2 rounded text-center">
          <div className="text-xs text-zinc-500">tan θ</div>
          <div className="font-bold text-purple-600 dark:text-purple-400 font-mono">
            {Math.abs(tanV) > 99 ? '∞' : tanV.toFixed(3)}
          </div>
        </div>
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-800 p-3 rounded-lg text-sm font-mono space-y-1">
        <div>sin θ = (대변) / (빗변) = 높이 / 1 = {sinV.toFixed(3)}</div>
        <div>cos θ = (밑변) / (빗변) = 밑변 / 1 = {cosV.toFixed(3)}</div>
        <div>tan θ = sin θ / cos θ = {Math.abs(tanV) > 99 ? '∞' : tanV.toFixed(3)}</div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg text-sm">
        💡 특수각: <strong>30°</strong> (sin=½, cos=√3/2), <strong>45°</strong> (sin=cos=√2/2), <strong>60°</strong> (sin=√3/2, cos=½).
      </div>
    </div>
  );
}
