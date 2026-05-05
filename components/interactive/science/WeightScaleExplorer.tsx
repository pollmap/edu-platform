'use client';

// S4-ME-01 무게와 저울 — 양팔/용수철 저울 인터랙티브.

import { useState } from 'react';

type Mode = 'beam' | 'spring';

const ITEMS = [
  { name: '연필', g: 5 },
  { name: '사과', g: 200 },
  { name: '책', g: 500 },
  { name: '신발', g: 700 },
  { name: '책가방', g: 2500 },
];

export function WeightScaleExplorer() {
  const [mode, setMode] = useState<Mode>('beam');
  const [leftIdx, setLeftIdx] = useState(1);
  const [rightIdx, setRightIdx] = useState(2);
  const [singleIdx, setSingleIdx] = useState(1);

  const left = ITEMS[leftIdx];
  const right = ITEMS[rightIdx];
  const single = ITEMS[singleIdx];

  // 양팔 저울 기울기 (g 차이 기반)
  const diff = left.g - right.g;
  const tilt = Math.max(-20, Math.min(20, diff / 50));

  // 용수철 늘어남 (최대 60px)
  const stretch = Math.min(60, single.g / 50);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-1">저울로 무게 재기</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          무게는 <strong>지구가 물건을 끌어당기는 힘의 크기</strong>예요. 저울마다 무게를 재는 방식이 달라요.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setMode('beam')}
          className={`px-3 py-3 border rounded-md text-sm min-h-[44px] ${
            mode === 'beam'
              ? 'border-green-600 bg-green-50 dark:bg-green-900/40 text-green-700 dark:text-green-300 font-semibold'
              : 'border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800'
          }`}
        >
          양팔저울
        </button>
        <button
          type="button"
          onClick={() => setMode('spring')}
          className={`px-3 py-3 border rounded-md text-sm min-h-[44px] ${
            mode === 'spring'
              ? 'border-green-600 bg-green-50 dark:bg-green-900/40 text-green-700 dark:text-green-300 font-semibold'
              : 'border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800'
          }`}
        >
          용수철저울
        </button>
      </div>

      {mode === 'beam' ? (
        <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-4 space-y-4">
          <svg viewBox="0 0 320 180" className="w-full max-w-[420px] mx-auto block">
            <line x1="160" y1="50" x2="160" y2="160" stroke="#475569" strokeWidth="6" />
            <polygon points="140,160 180,160 160,170" fill="#475569" />
            <g transform={`rotate(${tilt} 160 50)`}>
              <line x1="50" y1="50" x2="270" y2="50" stroke="#475569" strokeWidth="4" />
              <rect x="40" y="50" width="40" height="20" fill="#fbbf24" stroke="#92400e" strokeWidth="1" />
              <rect x="240" y="50" width="40" height="20" fill="#60a5fa" stroke="#1e40af" strokeWidth="1" />
              <text x="60" y="65" fontSize="10" textAnchor="middle">{left.name}</text>
              <text x="260" y="65" fontSize="10" textAnchor="middle">{right.name}</text>
            </g>
          </svg>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">왼쪽 접시</p>
              <select value={leftIdx} onChange={(e) => setLeftIdx(Number(e.target.value))} className="w-full px-3 py-2 border rounded-md text-sm bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700">
                {ITEMS.map((it, i) => (<option key={i} value={i}>{it.name} ({it.g}g)</option>))}
              </select>
            </div>
            <div>
              <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">오른쪽 접시</p>
              <select value={rightIdx} onChange={(e) => setRightIdx(Number(e.target.value))} className="w-full px-3 py-2 border rounded-md text-sm bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700">
                {ITEMS.map((it, i) => (<option key={i} value={i}>{it.name} ({it.g}g)</option>))}
              </select>
            </div>
          </div>
          <p className="text-center text-sm">
            {diff === 0 ? (
              <span className="text-green-700 dark:text-green-400 font-semibold">두 물건의 무게가 같아요 (수평)</span>
            ) : diff > 0 ? (
              <><strong>{left.name}</strong>이(가) 더 무거워요</>
            ) : (
              <><strong>{right.name}</strong>이(가) 더 무거워요</>
            )}
          </p>
        </div>
      ) : (
        <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-4 space-y-4">
          <svg viewBox="0 0 200 220" className="w-full max-w-[260px] mx-auto block">
            <rect x="80" y="0" width="40" height="10" fill="#475569" />
            {/* 용수철 */}
            <path d={`M 100 10 L 100 ${20 + stretch}`} stroke="#94a3b8" strokeWidth="6" strokeDasharray="4 3" />
            {/* 물체 */}
            <rect x="70" y={20 + stretch} width="60" height="40" fill="#16a34a" />
            <text x="100" y={45 + stretch} fontSize="11" textAnchor="middle" fill="white" fontWeight="bold">{single.name}</text>
            {/* 눈금 */}
            {[0, 25, 50].map((y) => (
              <g key={y}>
                <line x1="135" y1={20 + y} x2="145" y2={20 + y} stroke="#475569" strokeWidth="1.5" />
                <text x="150" y={24 + y} fontSize="9" fill="#475569">{y * 50}g</text>
              </g>
            ))}
          </svg>
          <div>
            <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">물체 고르기</p>
            <select value={singleIdx} onChange={(e) => setSingleIdx(Number(e.target.value))} className="w-full px-3 py-2 border rounded-md text-sm bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700">
              {ITEMS.map((it, i) => (<option key={i} value={i}>{it.name}</option>))}
            </select>
          </div>
          <p className="text-center text-sm">
            <strong>{single.name}</strong>의 무게는 약 <strong className="text-green-700 dark:text-green-400">{single.g}g</strong>이에요. 물체가 무거울수록 용수철이 더 길게 늘어나요.
          </p>
        </div>
      )}

      <div className="rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-3 text-sm">
        <p className="font-semibold text-emerald-800 dark:text-emerald-300 mb-1">두 저울 비교</p>
        <ul className="list-disc pl-5 space-y-0.5 text-emerald-900 dark:text-emerald-200">
          <li><strong>양팔저울</strong> — 두 물건의 무게를 직접 비교해요. 평형(수평)이 되면 같은 무게.</li>
          <li><strong>용수철저울</strong> — 무게에 따라 용수철이 늘어나는 정도로 무게를 숫자로 알 수 있어요.</li>
        </ul>
      </div>
    </div>
  );
}
