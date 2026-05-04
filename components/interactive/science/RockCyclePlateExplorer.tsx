'use client';

// S7-EU-01 지권의 변화 — 암석 순환 + 판 경계 토글.

import { useState } from 'react';

type Tab = 'cycle' | 'plate';

const ROCKS = [
  { id: 'igneous', name: '화성암', color: '#dc2626', example: '화강암·현무암', from: '마그마가 식어 굳음' },
  { id: 'sedimentary', name: '퇴적암', color: '#f59e0b', example: '사암·셰일·석회암', from: '퇴적물이 쌓여 굳음' },
  { id: 'metamorphic', name: '변성암', color: '#8b5cf6', example: '대리암·편마암', from: '높은 열·압력으로 변함' },
];

type Boundary = 'divergent' | 'convergent' | 'transform';

const BOUNDARIES: { id: Boundary; label: string; desc: string; result: string }[] = [
  { id: 'divergent', label: '발산형 (벌어짐)', desc: '두 판이 멀어지며 새 지각이 생김', result: '해령·열곡대' },
  { id: 'convergent', label: '수렴형 (부딪힘)', desc: '두 판이 만나 한쪽이 가라앉거나 솟아오름', result: '해구·습곡산맥·화산' },
  { id: 'transform', label: '보존형 (어긋남)', desc: '두 판이 옆으로 미끄러짐', result: '단층·지진' },
];

export function RockCyclePlateExplorer() {
  const [tab, setTab] = useState<Tab>('cycle');
  const [rockSel, setRockSel] = useState('igneous');
  const [bSel, setBSel] = useState<Boundary>('convergent');

  const rock = ROCKS.find((r) => r.id === rockSel)!;
  const boundary = BOUNDARIES.find((b) => b.id === bSel)!;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-1">
          돌도, 대륙도 천천히 변해요
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          <strong>암석 순환</strong>은 돌이 다른 종류의 돌로 바뀌는 큰 흐름이에요. <strong>판 구조론</strong>은 지구 표면이 여러 판으로 나뉘어 움직인다는 이론이에요.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setTab('cycle')}
          className={`px-2 py-3 text-sm rounded-md border min-h-[44px] font-medium ${
            tab === 'cycle'
              ? 'bg-green-50 dark:bg-green-950/40 border-green-500 ring-2 ring-green-300 text-green-800 dark:text-green-200'
              : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700'
          }`}
        >
          암석 순환
        </button>
        <button
          type="button"
          onClick={() => setTab('plate')}
          className={`px-2 py-3 text-sm rounded-md border min-h-[44px] font-medium ${
            tab === 'plate'
              ? 'bg-green-50 dark:bg-green-950/40 border-green-500 ring-2 ring-green-300 text-green-800 dark:text-green-200'
              : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700'
          }`}
        >
          판 경계
        </button>
      </div>

      {tab === 'cycle' ? (
        <>
          <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4">
            <svg viewBox="0 0 400 260" className="w-full" role="img" aria-label="암석 순환">
              {ROCKS.map((r, i) => {
                const a = (i * 120 - 90) * (Math.PI / 180);
                const cx = 200 + Math.cos(a) * 90;
                const cy = 130 + Math.sin(a) * 80;
                const sel = r.id === rockSel;
                return (
                  <g key={r.id} onClick={() => setRockSel(r.id)} style={{ cursor: 'pointer' }}>
                    <circle cx={cx} cy={cy} r={sel ? 38 : 30} fill={r.color} opacity={sel ? 0.9 : 0.5} stroke="white" strokeWidth={sel ? 2 : 0.6} />
                    <text x={cx} y={cy + 4} fontSize="11" fill="white" textAnchor="middle" fontWeight="bold">{r.name}</text>
                  </g>
                );
              })}

              {[0, 1, 2].map((i) => {
                const a1 = (i * 120 - 90) * (Math.PI / 180);
                const a2 = (((i + 1) % 3) * 120 - 90) * (Math.PI / 180);
                const x1 = 200 + Math.cos(a1) * 90;
                const y1 = 130 + Math.sin(a1) * 80;
                const x2 = 200 + Math.cos(a2) * 90;
                const y2 = 130 + Math.sin(a2) * 80;
                return (
                  <g key={`a${i}`}>
                    <path
                      d={`M ${x1 + (x2 - x1) * 0.3} ${y1 + (y2 - y1) * 0.3} Q 200 130 ${x1 + (x2 - x1) * 0.7} ${y1 + (y2 - y1) * 0.7}`}
                      fill="none"
                      stroke="#fde047"
                      strokeWidth="1.2"
                      markerEnd="url(#arrowY)"
                    />
                  </g>
                );
              })}
              <defs>
                <marker id="arrowY" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#fde047" />
                </marker>
              </defs>

              <circle cx="200" cy="130" r="18" fill="#7c2d12" />
              <text x="200" y="134" fontSize="10" fill="#fed7aa" textAnchor="middle">마그마</text>
            </svg>
          </div>

          <div className="rounded-lg p-3" style={{ background: `${rock.color}22` }}>
            <div className="font-bold mb-1" style={{ color: rock.color }}>{rock.name}</div>
            <div className="text-sm text-zinc-800 dark:text-zinc-200">생성: {rock.from}</div>
            <div className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">예: {rock.example}</div>
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-2">
            {BOUNDARIES.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setBSel(b.id)}
                className={`px-2 py-2 text-xs rounded-md border min-h-[44px] ${
                  bSel === b.id
                    ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-500 ring-2 ring-blue-300'
                    : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700'
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>

          <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4">
            <svg viewBox="0 0 400 220" className="w-full" role="img" aria-label="판 경계 단면">
              <rect x="0" y="0" width="400" height="80" fill="#1e3a8a" />
              <text x="20" y="20" fontSize="10" fill="#93c5fd">대기·바다</text>

              {bSel === 'divergent' && (
                <g>
                  <polygon points="0,80 180,80 170,140 0,140" fill="#475569" stroke="#94a3b8" />
                  <polygon points="220,80 400,80 400,140 230,140" fill="#475569" stroke="#94a3b8" />
                  <polygon points="170,140 230,140 200,200" fill="#dc2626" />
                  <text x="200" y="170" fontSize="10" fill="#fca5a5" textAnchor="middle">마그마 상승</text>
                  <text x="100" y="100" fontSize="11" fill="white" textAnchor="middle">← 판 A</text>
                  <text x="300" y="100" fontSize="11" fill="white" textAnchor="middle">판 B →</text>
                </g>
              )}
              {bSel === 'convergent' && (
                <g>
                  <polygon points="0,80 200,80 230,140 0,140" fill="#64748b" stroke="#94a3b8" />
                  <polygon points="200,80 400,80 400,200 250,200 230,140" fill="#475569" stroke="#94a3b8" />
                  <polygon points="220,80 250,60 240,40 230,30 220,80" fill="#dc2626" />
                  <text x="80" y="105" fontSize="11" fill="white">판 A →</text>
                  <text x="320" y="105" fontSize="11" fill="white">← 판 B</text>
                  <text x="240" y="40" fontSize="9" fill="#fca5a5" textAnchor="middle">화산</text>
                </g>
              )}
              {bSel === 'transform' && (
                <g>
                  <polygon points="0,80 195,80 195,200 0,200" fill="#475569" stroke="#94a3b8" />
                  <polygon points="205,80 400,80 400,200 205,200" fill="#64748b" stroke="#94a3b8" />
                  <line x1="200" y1="60" x2="200" y2="210" stroke="#dc2626" strokeWidth="3" strokeDasharray="6 4" />
                  <text x="100" y="150" fontSize="11" fill="white" textAnchor="middle">↑ 판 A</text>
                  <text x="300" y="150" fontSize="11" fill="white" textAnchor="middle">↓ 판 B</text>
                  <text x="200" y="30" fontSize="10" fill="#fca5a5" textAnchor="middle">단층선</text>
                </g>
              )}
            </svg>
          </div>

          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 p-3 text-sm space-y-1">
            <div className="font-bold text-blue-800 dark:text-blue-200">{boundary.label}</div>
            <div className="text-zinc-800 dark:text-zinc-200">{boundary.desc}</div>
            <div className="text-xs text-zinc-600 dark:text-zinc-400">결과 지형: {boundary.result}</div>
          </div>
        </>
      )}

      <p className="text-xs text-zinc-500">
        ※ 한반도는 여러 판이 만나는 지역 — 판 운동의 흔적이 산맥·해안선·지진 분포에 남아 있어요.
      </p>
    </div>
  );
}
