'use client';

// M9-GM-02 원의 성질 — 원주각·중심각 일정성, 같은 호에 대한 원주각 동일.

import { useState } from 'react';

type Theorem = 'inscribed' | 'thales' | 'tangent';

export function CircleTheoremExplorer() {
  const [theorem, setTheorem] = useState<Theorem>('inscribed');
  const [arcDeg, setArcDeg] = useState(120); // 호 AB가 이루는 중심각
  const [pPos, setPPos] = useState(60); // 원주 위 P의 각도 위치 (반대편)

  const cx = 150;
  const cy = 150;
  const R = 100;

  const aRad = (Math.PI * 0) / 180;
  const bRad = (Math.PI * arcDeg) / 180;
  const ax = cx + R * Math.cos(aRad);
  const ay = cy + R * Math.sin(aRad);
  const bx = cx + R * Math.cos(bRad);
  const by = cy + R * Math.sin(bRad);

  // P는 호 AB가 아닌 반대편
  const pRad = ((arcDeg + pPos) * Math.PI) / 180;
  const px = cx + R * Math.cos(pRad);
  const py = cy + R * Math.sin(pRad);

  const inscribedAngle = arcDeg / 2;
  const labels = {
    inscribed: '원주각 = ½ × 중심각',
    thales: '탈레스 정리 (반원의 원주각 = 90°)',
    tangent: '접선과 반지름은 수직',
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        {(Object.keys(labels) as Theorem[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => {
              setTheorem(t);
              if (t === 'thales') setArcDeg(180);
            }}
            className={`px-3 py-2 min-h-[44px] rounded-lg text-xs font-semibold ${
              theorem === t ? 'bg-blue-600 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
            }`}
          >
            {t === 'inscribed' ? '원주각' : t === 'thales' ? '탈레스' : '접선'}
          </button>
        ))}
      </div>

      {theorem !== 'tangent' && (
        <div className="bg-zinc-50 dark:bg-zinc-800 p-3 rounded-lg">
          <div className="flex justify-between mb-2 text-sm">
            <span className="font-bold text-blue-700 dark:text-blue-400">중심각 (호 AB)</span>
            <span className="font-mono text-red-500 font-semibold">{arcDeg}°</span>
          </div>
          <input
            type="range"
            min={30}
            max={300}
            step={10}
            value={arcDeg}
            disabled={theorem === 'thales'}
            onChange={(e) => setArcDeg(parseInt(e.target.value, 10))}
            className="w-full h-3 cursor-pointer accent-blue-600 disabled:opacity-50"
          />
        </div>
      )}

      <div className="bg-zinc-50 dark:bg-zinc-900 p-3 rounded-lg flex justify-center">
        <svg viewBox="0 0 300 300" className="w-full max-w-md aspect-square">
          <circle cx={cx} cy={cy} r={R} fill="none" stroke="#1e3a8a" strokeWidth="2" />
          <circle cx={cx} cy={cy} r={3} fill="#1e3a8a" />
          <text x={cx + 5} y={cy - 5} fontSize="11" fill="#1e3a8a">O</text>

          {theorem === 'tangent' ? (
            <>
              <line x1={cx} y1={cy} x2={ax} y2={ay} stroke="#1e3a8a" strokeWidth="2" />
              <line x1={ax - 60} y1={ay} x2={ax + 60} y2={ay} stroke="#dc2626" strokeWidth="2.5" />
              <rect x={ax - 12} y={ay - 12} width={12} height={12} fill="none" stroke="#16a34a" strokeWidth="1.5" />
              <text x={ax + 5} y={ay + 18} fontSize="11" fill="#dc2626">접선</text>
              <text x={cx + 30} y={cy + 12} fontSize="11" fill="#1e3a8a">반지름</text>
              <text x={ax - 25} y={ay - 5} fontSize="11" fill="#16a34a">90°</text>
            </>
          ) : (
            <>
              {/* 호 AB */}
              <path
                d={`M ${ax} ${ay} A ${R} ${R} 0 ${arcDeg > 180 ? 1 : 0} 1 ${bx} ${by}`}
                fill="none"
                stroke="#dc2626"
                strokeWidth="3"
              />
              {/* 중심각 */}
              <line x1={cx} y1={cy} x2={ax} y2={ay} stroke="#1e3a8a" strokeWidth="1.5" strokeDasharray="3" />
              <line x1={cx} y1={cy} x2={bx} y2={by} stroke="#1e3a8a" strokeWidth="1.5" strokeDasharray="3" />
              {/* 원주각 */}
              <line x1={px} y1={py} x2={ax} y2={ay} stroke="#16a34a" strokeWidth="2" />
              <line x1={px} y1={py} x2={bx} y2={by} stroke="#16a34a" strokeWidth="2" />
              {/* 점들 */}
              <circle cx={ax} cy={ay} r={4} fill="#dc2626" />
              <text x={ax + 5} y={ay + 5} fontSize="11" fill="#dc2626">A</text>
              <circle cx={bx} cy={by} r={4} fill="#dc2626" />
              <text x={bx + 5} y={by + 5} fontSize="11" fill="#dc2626">B</text>
              <circle cx={px} cy={py} r={4} fill="#16a34a" />
              <text x={px + 5} y={py + 5} fontSize="11" fill="#16a34a">P</text>
            </>
          )}
        </svg>
      </div>

      {theorem !== 'tangent' && (
        <div className="bg-zinc-50 dark:bg-zinc-800 p-3 rounded-lg text-sm font-mono space-y-1">
          <div>중심각 ∠AOB = <span className="text-red-500 font-bold">{arcDeg}°</span></div>
          <div>원주각 ∠APB = <span className="text-green-600 dark:text-green-400 font-bold">{inscribedAngle}°</span></div>
          <div className="border-t border-zinc-300 dark:border-zinc-700 pt-1 mt-1">
            중심각 ÷ 원주각 = <span className="text-red-500 font-bold">2</span>
          </div>
        </div>
      )}

      <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg text-sm">
        💡 <strong>{labels[theorem]}</strong>
        {theorem === 'inscribed' && ' — 같은 호 위 어느 점에서 원주각을 그려도 크기가 같아요.'}
        {theorem === 'thales' && ' — 지름이 빗변인 직각삼각형은 항상 원에 내접해요.'}
        {theorem === 'tangent' && ' — 원에 접선을 그으면 접점에서 반지름과 90°를 이뤄요.'}
      </div>
    </div>
  );
}
