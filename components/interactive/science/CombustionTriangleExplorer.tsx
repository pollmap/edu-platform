'use client';

// S6-MA-02 연소와 소화 — 연소의 3요소(연료·산소·발화점) + 소화 원리.
// 3요소 토글로 불이 붙는지 / 어떻게 끄는지 본다.

import { useMemo, useState } from 'react';

interface ExtinguishMethod {
  key: 'remove-fuel' | 'remove-oxygen' | 'lower-temp';
  name: string;
  example: string;
  removes: 'fuel' | 'oxygen' | 'heat';
}

const METHODS: ExtinguishMethod[] = [
  { key: 'remove-fuel', name: '제거 소화', example: '가스 밸브 잠그기, 산불에 방화선', removes: 'fuel' },
  { key: 'remove-oxygen', name: '질식 소화', example: '담요·소화기 거품, 모래로 덮기', removes: 'oxygen' },
  { key: 'lower-temp', name: '냉각 소화', example: '물을 끼얹어 발화점 아래로', removes: 'heat' },
];

export function CombustionTriangleExplorer() {
  const [fuel, setFuel] = useState(true);
  const [oxygen, setOxygen] = useState(true);
  const [heat, setHeat] = useState(true);
  const [method, setMethod] = useState<ExtinguishMethod | null>(null);

  const burning = fuel && oxygen && heat;

  const reset = () => {
    setFuel(true);
    setOxygen(true);
    setHeat(true);
    setMethod(null);
  };

  const applyMethod = (m: ExtinguishMethod) => {
    setMethod(m);
    if (m.removes === 'fuel') setFuel(false);
    else if (m.removes === 'oxygen') setOxygen(false);
    else setHeat(false);
  };

  const flameSize = useMemo(() => {
    let size = 0;
    if (fuel) size += 30;
    if (oxygen) size += 30;
    if (heat) size += 30;
    return burning ? 60 : size > 0 ? 0 : 0;
  }, [fuel, oxygen, heat, burning]);

  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-900 p-4 border border-zinc-200 dark:border-zinc-700">
        <svg viewBox="0 0 360 240" className="w-full h-auto" role="img" aria-label="연소 삼각형">
          {/* 삼각형 꼭짓점 = 3요소 */}
          {/* 연료 (왼쪽 아래) */}
          <g>
            <circle cx={70} cy={180} r={42} fill={fuel ? '#f59e0b' : '#3f3f46'} fillOpacity={fuel ? 0.4 : 0.15} stroke={fuel ? '#f59e0b' : '#6b7280'} strokeWidth={2} strokeDasharray={fuel ? '0' : '4 4'} />
            <text x={70} y={170} textAnchor="middle" fontSize="16">
              🪵
            </text>
            <text x={70} y={188} textAnchor="middle" fontSize="11" fontWeight="bold" fill="currentColor">
              연료
            </text>
            <text x={70} y={202} textAnchor="middle" fontSize="9" fill="currentColor" opacity={0.7}>
              {fuel ? '있음' : '없음'}
            </text>
          </g>
          {/* 산소 (오른쪽 아래) */}
          <g>
            <circle cx={290} cy={180} r={42} fill={oxygen ? '#3b82f6' : '#3f3f46'} fillOpacity={oxygen ? 0.4 : 0.15} stroke={oxygen ? '#3b82f6' : '#6b7280'} strokeWidth={2} strokeDasharray={oxygen ? '0' : '4 4'} />
            <text x={290} y={170} textAnchor="middle" fontSize="16">
              💨
            </text>
            <text x={290} y={188} textAnchor="middle" fontSize="11" fontWeight="bold" fill="currentColor">
              산소
            </text>
            <text x={290} y={202} textAnchor="middle" fontSize="9" fill="currentColor" opacity={0.7}>
              {oxygen ? '있음' : '없음'}
            </text>
          </g>
          {/* 발화점/열 (위) */}
          <g>
            <circle cx={180} cy={50} r={42} fill={heat ? '#ef4444' : '#3f3f46'} fillOpacity={heat ? 0.4 : 0.15} stroke={heat ? '#ef4444' : '#6b7280'} strokeWidth={2} strokeDasharray={heat ? '0' : '4 4'} />
            <text x={180} y={42} textAnchor="middle" fontSize="16">
              🔥
            </text>
            <text x={180} y={58} textAnchor="middle" fontSize="11" fontWeight="bold" fill="currentColor">
              발화점
            </text>
            <text x={180} y={72} textAnchor="middle" fontSize="9" fill="currentColor" opacity={0.7}>
              {heat ? '도달' : '낮음'}
            </text>
          </g>
          {/* 삼각형 선 */}
          <polygon
            points="70,180 290,180 180,50"
            fill="none"
            stroke={burning ? '#ef4444' : '#6b7280'}
            strokeWidth={burning ? 2 : 1}
            strokeOpacity={burning ? 0.8 : 0.3}
            strokeDasharray={burning ? '0' : '4 4'}
          />
          {/* 중앙의 불 */}
          <g transform="translate(180 130)">
            <ellipse
              cx={0}
              cy={0}
              rx={flameSize * 0.6}
              ry={flameSize}
              fill={burning ? '#fbbf24' : '#71717a'}
              opacity={burning ? 0.85 : 0}
              className="transition-all"
            />
            <text textAnchor="middle" fontSize={burning ? '32' : '24'} y={10} opacity={burning ? 1 : 0.3}>
              {burning ? '🔥' : '💨'}
            </text>
          </g>
        </svg>

        <div className="grid grid-cols-3 gap-2 mt-3">
          <button
            type="button"
            onClick={() => setFuel((f) => !f)}
            className={`px-2 py-2 rounded text-xs font-medium min-h-[44px] ${
              fuel ? 'bg-amber-500 text-white' : 'bg-zinc-200 dark:bg-zinc-700'
            }`}
          >
            연료 {fuel ? '✓' : '✗'}
          </button>
          <button
            type="button"
            onClick={() => setOxygen((f) => !f)}
            className={`px-2 py-2 rounded text-xs font-medium min-h-[44px] ${
              oxygen ? 'bg-blue-500 text-white' : 'bg-zinc-200 dark:bg-zinc-700'
            }`}
          >
            산소 {oxygen ? '✓' : '✗'}
          </button>
          <button
            type="button"
            onClick={() => setHeat((f) => !f)}
            className={`px-2 py-2 rounded text-xs font-medium min-h-[44px] ${
              heat ? 'bg-rose-500 text-white' : 'bg-zinc-200 dark:bg-zinc-700'
            }`}
          >
            발화점 {heat ? '✓' : '✗'}
          </button>
        </div>
      </div>

      <div
        className={`rounded-xl p-3 text-center text-sm font-bold ${
          burning
            ? 'bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
            : 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
        }`}
      >
        {burning ? '🔥 활활 타고 있어요 (3요소 모두 충족)' : '💧 불이 꺼졌어요 (1요소 이상 부족)'}
      </div>

      <div>
        <div className="text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">소화 방법 (불 끄기)</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {METHODS.map((m) => (
            <button
              key={m.key}
              type="button"
              onClick={() => applyMethod(m)}
              className={`px-2 py-3 rounded-lg text-left min-h-[44px] ${
                method?.key === m.key
                  ? 'bg-blue-600 text-white'
                  : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
              }`}
            >
              <div className="text-sm font-bold">{m.name}</div>
              <div className={`text-xs mt-1 ${method?.key === m.key ? 'text-blue-100' : 'text-zinc-500 dark:text-zinc-400'}`}>
                {m.example}
              </div>
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={reset}
        className="w-full px-3 py-2 rounded-lg bg-zinc-200 dark:bg-zinc-700 font-medium min-h-[44px]"
      >
        🔄 초기화
      </button>

      <div className="text-xs text-zinc-500 dark:text-zinc-400">
        💡 불은 「연료 + 산소 + 발화점 이상의 열」 세 가지가 동시에 있어야 타요. 하나만 빼앗아도 꺼져요. 산불에 방화선을 만드는 건 「연료 제거」, 거품 소화기는 「산소 차단」, 물은 「냉각」.
      </div>
    </div>
  );
}
