'use client';

// S3-ME-01 자석의 이용 — 자기력선 + 극의 인력/척력 시뮬.

import { useState } from 'react';

const OBJECTS = [
  { name: '클립 (철)', attracted: true, color: '#94a3b8' },
  { name: '못 (철)', attracted: true, color: '#475569' },
  { name: '동전 (구리·니켈)', attracted: false, color: '#ca8a04' },
  { name: '나무 막대', attracted: false, color: '#92400e' },
  { name: '플라스틱', attracted: false, color: '#16a34a' },
  { name: '알루미늄 캔', attracted: false, color: '#a3a3a3' },
];

type Mode = 'NS' | 'NN' | 'SS';

const MODE_LABEL: Record<Mode, string> = {
  NS: 'N극 ↔ S극',
  NN: 'N극 ↔ N극',
  SS: 'S극 ↔ S극',
};

export function MagnetExplorer() {
  const [mode, setMode] = useState<Mode>('NS');
  const [selected, setSelected] = useState<number>(0);

  const isAttract = mode === 'NS';
  const obj = OBJECTS[selected];

  const W = 360;
  const H = 180;
  const cy = 90;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-1">자석 실험</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          자석은 N극과 S극 두 극이 있어요. <strong>다른 극끼리 끌어당기고, 같은 극끼리는 밀어내요</strong>.
        </p>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">두 자석을 마주 놓아 보기</p>
        <div className="flex flex-wrap gap-2">
          {(['NS', 'NN', 'SS'] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`px-3 py-2 border rounded-md text-sm min-h-[44px] ${
                mode === m
                  ? 'border-green-600 bg-green-50 dark:bg-green-900/40 text-green-700 dark:text-green-300'
                  : 'border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800'
              }`}
            >
              {MODE_LABEL[m]}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-4">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[480px] mx-auto block">
          {/* 왼쪽 자석 */}
          <rect x={50} y={cy - 22} width={50} height={44} fill="#dc2626" />
          <rect x={100} y={cy - 22} width={50} height={44} fill="#3b82f6" />
          <text x={75} y={cy + 4} fontSize="18" textAnchor="middle" fill="white" fontWeight="bold">
            N
          </text>
          <text x={125} y={cy + 4} fontSize="18" textAnchor="middle" fill="white" fontWeight="bold">
            S
          </text>
          {/* 오른쪽 자석 */}
          <rect x={210} y={cy - 22} width={50} height={44} fill={mode.startsWith('N') ? '#dc2626' : '#3b82f6'} />
          <rect x={260} y={cy - 22} width={50} height={44} fill={mode.endsWith('N') ? '#dc2626' : '#3b82f6'} />
          <text x={235} y={cy + 4} fontSize="18" textAnchor="middle" fill="white" fontWeight="bold">
            {mode.startsWith('N') ? 'N' : 'S'}
          </text>
          <text x={285} y={cy + 4} fontSize="18" textAnchor="middle" fill="white" fontWeight="bold">
            {mode.endsWith('N') ? 'N' : 'S'}
          </text>

          {/* 화살표 */}
          {isAttract ? (
            <>
              <path d="M 155 90 L 200 90" stroke="#16a34a" strokeWidth="2.5" markerEnd="url(#arrowR)" />
              <path d="M 205 90 L 160 90" stroke="#16a34a" strokeWidth="2.5" markerEnd="url(#arrowL)" />
              <text x={180} y={70} fontSize="14" textAnchor="middle" fontWeight="bold" fill="#16a34a">
                끌어당김
              </text>
            </>
          ) : (
            <>
              <path d="M 200 90 L 155 90" stroke="#dc2626" strokeWidth="2.5" markerEnd="url(#arrowL)" />
              <path d="M 160 90 L 205 90" stroke="#dc2626" strokeWidth="2.5" markerEnd="url(#arrowR)" />
              <text x={180} y={70} fontSize="14" textAnchor="middle" fontWeight="bold" fill="#dc2626">
                밀어냄
              </text>
            </>
          )}

          <defs>
            <marker id="arrowR" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
              <path d="M 0 0 L 8 3 L 0 6 Z" fill="#16a34a" />
            </marker>
            <marker id="arrowL" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
              <path d="M 0 0 L 8 3 L 0 6 Z" fill="#dc2626" />
            </marker>
          </defs>
        </svg>
        <p className="text-center text-sm mt-2 text-zinc-700 dark:text-zinc-300">
          {isAttract ? '다른 극(N-S)이 만나면 ' : '같은 극이 만나면 '}
          <strong style={{ color: isAttract ? '#16a34a' : '#dc2626' }}>{isAttract ? '서로 끌어당겨요' : '서로 밀어내요'}</strong>.
        </p>
      </div>

      <div className="border-t border-zinc-200 dark:border-zinc-800 pt-5">
        <h3 className="text-lg font-semibold mb-3 text-green-700 dark:text-green-400">자석에 붙는 물체 찾기</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {OBJECTS.map((o, i) => (
            <button
              key={o.name}
              type="button"
              onClick={() => setSelected(i)}
              className={`p-3 rounded-lg border text-sm min-h-[44px] ${
                selected === i
                  ? 'border-green-600 bg-green-50 dark:bg-green-900/40'
                  : 'border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800'
              }`}
            >
              <span className="block w-3 h-3 rounded-full mb-1 mx-auto" style={{ backgroundColor: o.color }} />
              {o.name}
            </button>
          ))}
        </div>
        <div
          className={`mt-3 rounded-lg p-3 text-sm ${
            obj.attracted ? 'bg-green-50 dark:bg-green-900/30' : 'bg-zinc-100 dark:bg-zinc-800'
          }`}
        >
          <p>
            <strong>{obj.name}</strong>은(는) 자석에{' '}
            <strong className={obj.attracted ? 'text-green-700 dark:text-green-300' : 'text-zinc-700 dark:text-zinc-300'}>
              {obj.attracted ? '붙어요!' : '안 붙어요'}
            </strong>
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            자석에는 <strong>철로 만든 물건</strong>만 붙어요. 알루미늄·구리·니켈은 붙지 않아요(단, 니켈은 약하게 붙는 종류도 있어요).
          </p>
        </div>
      </div>
    </div>
  );
}
