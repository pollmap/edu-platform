'use client';

// S4-ME-02 그림자와 거울 — 빛의 직진/반사 시뮬.

import { useState } from 'react';

type Mode = 'shadow' | 'mirror';

export function ShadowMirrorExplorer() {
  const [mode, setMode] = useState<Mode>('shadow');
  const [lightX, setLightX] = useState(60); // 빛 위치 (그림자 모드)
  const [angle, setAngle] = useState(30); // 입사각 (거울 모드)

  // 그림자 길이 = 빛이 옆에 있을수록 길어짐 (간이 모델)
  const shadowLen = Math.abs(180 - lightX);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-1">빛이 만나는 두 가지</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          빛은 <strong>곧게 나아가요</strong>. 빛을 막으면 <strong>그림자</strong>가, 빛이 거울에 부딪히면 <strong>반사</strong>가 일어나요.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setMode('shadow')}
          className={`px-3 py-3 border rounded-md text-sm min-h-[44px] ${
            mode === 'shadow'
              ? 'border-green-600 bg-green-50 dark:bg-green-900/40 text-green-700 dark:text-green-300 font-semibold'
              : 'border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800'
          }`}
        >
          그림자
        </button>
        <button
          type="button"
          onClick={() => setMode('mirror')}
          className={`px-3 py-3 border rounded-md text-sm min-h-[44px] ${
            mode === 'mirror'
              ? 'border-green-600 bg-green-50 dark:bg-green-900/40 text-green-700 dark:text-green-300 font-semibold'
              : 'border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800'
          }`}
        >
          거울
        </button>
      </div>

      {mode === 'shadow' ? (
        <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-4 space-y-4">
          <svg viewBox="0 0 320 180" className="w-full max-w-[480px] mx-auto block">
            {/* 바닥 */}
            <line x1="0" y1="150" x2="320" y2="150" stroke="#475569" strokeWidth="2" />
            {/* 물체 */}
            <rect x="170" y="80" width="20" height="70" fill="#16a34a" />
            {/* 빛 */}
            <circle cx={lightX} cy={40} r={14} fill="#fbbf24" />
            {/* 빛줄기 */}
            <line x1={lightX} y1={40} x2={170} y2={80} stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="3 2" />
            <line x1={lightX} y1={40} x2={190} y2={80} stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="3 2" />
            {/* 그림자 */}
            <polygon
              points={lightX < 180
                ? `190,150 ${190 + shadowLen * 0.6},150 ${190 + shadowLen * 0.4},155`
                : `170,150 ${170 - shadowLen * 0.6},150 ${170 - shadowLen * 0.4},155`}
              fill="#27272a"
              opacity="0.8"
            />
            <text x={lightX < 180 ? 220 : 130} y="170" fontSize="10" textAnchor="middle" fill="#52525b">그림자</text>
          </svg>
          <div>
            <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 flex justify-between mb-1">
              <span>빛(전등) 위치</span>
              <span className="text-green-700 dark:text-green-400">{lightX < 180 ? '왼쪽' : '오른쪽'}</span>
            </label>
            <input
              type="range"
              min={20}
              max={300}
              value={lightX}
              onChange={(e) => setLightX(Number(e.target.value))}
              className="w-full h-11 accent-green-600"
              aria-label="빛 위치"
            />
          </div>
          <p className="text-sm text-zinc-700 dark:text-zinc-300 text-center">
            빛이 <strong>물체 가까이</strong>일수록 그림자가 짧고, <strong>비스듬히 멀리</strong>일수록 그림자가 길어요.
          </p>
        </div>
      ) : (
        <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-4 space-y-4">
          <svg viewBox="0 0 320 180" className="w-full max-w-[480px] mx-auto block">
            {/* 거울 */}
            <line x1="20" y1="150" x2="300" y2="150" stroke="#3b82f6" strokeWidth="4" />
            <text x="160" y="170" fontSize="10" textAnchor="middle" fill="#1e40af">거울</text>
            {/* 법선 */}
            <line x1="160" y1="60" x2="160" y2="150" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
            {/* 입사 */}
            <line
              x1={160 - Math.sin((angle * Math.PI) / 180) * 90}
              y1={150 - Math.cos((angle * Math.PI) / 180) * 90}
              x2="160"
              y2="150"
              stroke="#dc2626"
              strokeWidth="2.5"
              markerEnd="url(#arr2)"
            />
            {/* 반사 */}
            <line
              x1="160"
              y1="150"
              x2={160 + Math.sin((angle * Math.PI) / 180) * 90}
              y2={150 - Math.cos((angle * Math.PI) / 180) * 90}
              stroke="#16a34a"
              strokeWidth="2.5"
              markerEnd="url(#arr3)"
            />
            <text x={160 - Math.sin((angle * Math.PI) / 180) * 70} y={70} fontSize="10" fill="#dc2626">들어옴</text>
            <text x={160 + Math.sin((angle * Math.PI) / 180) * 70} y={70} fontSize="10" fill="#16a34a">반사됨</text>
            <text x={160 - 18} y={130} fontSize="9" fill="#dc2626">{angle}°</text>
            <text x={160 + 5} y={130} fontSize="9" fill="#16a34a">{angle}°</text>
            <defs>
              <marker id="arr2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M 0 0 L 6 3 L 0 6 Z" fill="#dc2626" />
              </marker>
              <marker id="arr3" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M 0 0 L 6 3 L 0 6 Z" fill="#16a34a" />
              </marker>
            </defs>
          </svg>
          <div>
            <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 flex justify-between mb-1">
              <span>빛이 들어오는 각도</span>
              <span className="text-green-700 dark:text-green-400">{angle}°</span>
            </label>
            <input
              type="range"
              min={5}
              max={75}
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              className="w-full h-11 accent-green-600"
              aria-label="입사각"
            />
          </div>
          <p className="text-sm text-zinc-700 dark:text-zinc-300 text-center">
            거울에서 <strong>들어오는 각도와 반사되는 각도는 항상 같아요</strong>. 이것이 빛의 반사 법칙이에요.
          </p>
        </div>
      )}

      <div className="rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-3 text-sm">
        <p className="font-semibold text-emerald-800 dark:text-emerald-300 mb-1">실생활 속 빛</p>
        <ul className="list-disc pl-5 space-y-0.5 text-emerald-900 dark:text-emerald-200">
          <li>그림자 — 해시계, 그림자 놀이, 일식·월식</li>
          <li>거울 반사 — 욕실 거울, 자동차 사이드미러, 잠망경, 만화경</li>
        </ul>
      </div>
    </div>
  );
}
