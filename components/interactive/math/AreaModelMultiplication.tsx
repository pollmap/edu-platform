'use client';

// M3-NA-02 곱셈 (두 자리 × 한 자리) — 격자 면적 모델.

import { useMemo, useState } from 'react';

export function AreaModelMultiplication() {
  const [a, setA] = useState(23);
  const [b, setB] = useState(4);

  const tens = Math.floor(a / 10) * 10;
  const ones = a % 10;
  const tensProduct = tens * b;
  const onesProduct = ones * b;
  const total = a * b;

  const widthScale = 8;
  const tensW = tens * (widthScale / 10);
  const onesW = ones * widthScale;
  const heightUnit = 18;
  const totalH = b * heightUnit;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          격자 곱셈 (Area Model)
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          두 자리 수를 <strong>십의 자리 + 일의 자리</strong>로 쪼개 곱하면 쉬워요.
          {a} × {b} = ({tens} + {ones}) × {b} = {tensProduct} + {onesProduct} = <strong>{total}</strong>.
        </p>
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-4 overflow-x-auto">
        <svg viewBox={`0 0 ${tensW + onesW + 60} ${totalH + 80}`} className="w-full" style={{ minWidth: 360 }}>
          <text x="20" y="30" fontSize="12" fontWeight="bold" fill="#2563eb">{tens}</text>
          <text x={20 + tensW + 10} y="30" fontSize="12" fontWeight="bold" fill="#16a34a">+ {ones}</text>
          <text x="5" y={50 + totalH / 2} fontSize="12" fontWeight="bold" fill="#dc2626">{b}</text>

          <rect x="20" y="40" width={tensW} height={totalH} fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
          <text x={20 + tensW / 2} y={40 + totalH / 2 + 5} fontSize="14" fontWeight="bold" fill="#1e40af" textAnchor="middle">
            {tensProduct}
          </text>

          <rect x={20 + tensW} y="40" width={onesW} height={totalH} fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
          <text x={20 + tensW + onesW / 2} y={40 + totalH / 2 + 5} fontSize="14" fontWeight="bold" fill="#15803d" textAnchor="middle">
            {onesProduct}
          </text>

          <text x={20} y={50 + totalH + 25} fontSize="11" fill="#64748b">
            {tens} × {b} = {tensProduct}
          </text>
          <text x={20 + tensW + 10} y={50 + totalH + 25} fontSize="11" fill="#64748b">
            {ones} × {b} = {onesProduct}
          </text>
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <div className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
            첫째 수: {a}
          </div>
          <input
            type="range"
            min={11}
            max={99}
            value={a}
            onChange={(e) => setA(Number(e.target.value))}
            className="w-full h-3 cursor-pointer"
            aria-label="첫째 수"
          />
        </div>
        <div className="space-y-1">
          <div className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
            둘째 수: {b}
          </div>
          <input
            type="range"
            min={2}
            max={9}
            value={b}
            onChange={(e) => setB(Number(e.target.value))}
            className="w-full h-3 cursor-pointer"
            aria-label="둘째 수"
          />
        </div>
      </div>

      <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-500 p-4">
        <div className="text-sm font-mono text-zinc-700 dark:text-zinc-300">
          {a} × {b} = ({tens} × {b}) + ({ones} × {b}) = {tensProduct} + {onesProduct} ={' '}
          <span className="font-bold text-blue-700 dark:text-blue-300 text-lg">{total}</span>
        </div>
      </div>
    </div>
  );
}
