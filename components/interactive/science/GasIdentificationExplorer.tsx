'use client';

// S6-MA-01 여러 가지 기체 — 산소·이산화탄소·수소·질소 발생법과 성질 식별.
// 시약을 선택하면 발생 기체와 검출 시험 결과가 나옴.

import { useState } from 'react';

interface Gas {
  key: string;
  name: string;
  formula: string;
  reagents: string;
  properties: string[];
  test: string;
  uses: string;
  color: string;
}

const GASES: Gas[] = [
  {
    key: 'o2',
    name: '산소',
    formula: 'O₂',
    reagents: '과산화수소수 + 이산화망간(촉매)',
    properties: ['색·냄새 없음', '물에 잘 안 녹음', '연소를 도움', '공기보다 조금 무거움'],
    test: '꺼져 가는 불씨를 다시 살림 (불씨 살아남)',
    uses: '의료용 호흡, 수중호흡장치, 용접',
    color: '#ef4444',
  },
  {
    key: 'co2',
    name: '이산화탄소',
    formula: 'CO₂',
    reagents: '대리석(탄산칼슘) + 묽은 염산',
    properties: ['색·냄새 없음', '물에 약간 녹아 산성', '공기보다 무거움', '불을 끔'],
    test: '석회수가 뿌옇게 흐려짐',
    uses: '소화기, 탄산음료, 드라이아이스',
    color: '#3b82f6',
  },
  {
    key: 'h2',
    name: '수소',
    formula: 'H₂',
    reagents: '아연 + 묽은 염산',
    properties: ['색·냄새 없음', '가장 가벼움 (공기의 1/14)', '잘 탐 → 연소 시 폭발음'],
    test: '불꽃을 가까이 대면 「퍽」 소리',
    uses: '연료전지, 풍선, 로켓',
    color: '#10b981',
  },
  {
    key: 'n2',
    name: '질소',
    formula: 'N₂',
    reagents: '공기 분리 (액화 후 분별증류)',
    properties: ['색·냄새 없음', '반응성 매우 작음', '공기의 78%'],
    test: '특별한 반응 없음 (다른 기체 제거 후 남음)',
    uses: '냉동, 식품 포장 (산화 방지)',
    color: '#a855f7',
  },
];

export function GasIdentificationExplorer() {
  const [gasIdx, setGasIdx] = useState(0);
  const [stage, setStage] = useState<'idle' | 'collecting' | 'testing'>('idle');
  const gas = GASES[gasIdx];

  const startCollect = () => {
    setStage('collecting');
    setTimeout(() => setStage('testing'), 1000);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {GASES.map((g, i) => (
          <button
            key={g.key}
            type="button"
            onClick={() => {
              setGasIdx(i);
              setStage('idle');
            }}
            className={`px-2 py-2 rounded text-xs font-medium min-h-[44px] ${
              i === gasIdx ? 'text-white' : 'bg-zinc-200 dark:bg-zinc-700'
            }`}
            style={i === gasIdx ? { background: g.color } : undefined}
          >
            {g.name} ({g.formula})
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-900 p-4 border border-zinc-200 dark:border-zinc-700">
        <div className="flex items-center gap-4">
          {/* 시약 플라스크 */}
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 80 100" width={70} height={90} role="img" aria-label="시약">
              <path
                d="M 30 10 L 30 35 L 15 80 L 65 80 L 50 35 L 50 10 Z"
                fill={stage !== 'idle' ? `${gas.color}40` : '#e4e4e7'}
                stroke={gas.color}
                strokeWidth={1.5}
              />
              {stage !== 'idle' &&
                Array.from({ length: 6 }).map((_, i) => (
                  <circle
                    key={i}
                    cx={20 + i * 8}
                    cy={50 + (i % 2) * 8}
                    r={2}
                    fill={gas.color}
                  >
                    <animate attributeName="cy" values="50;15;50" dur="1.5s" repeatCount="indefinite" begin={`${i * 0.2}s`} />
                  </circle>
                ))}
            </svg>
            <div className="text-[10px] text-zinc-500 mt-1">시약</div>
          </div>

          {/* 화살표 */}
          <div className="text-2xl">→</div>

          {/* 집기병 */}
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 80 100" width={70} height={90} role="img" aria-label="집기병">
              <rect x={15} y={15} width={50} height={75} fill={stage === 'testing' ? `${gas.color}30` : '#e4e4e7'} stroke={gas.color} strokeWidth={1.5} rx={3} />
              <rect x={20} y={10} width={40} height={8} fill={gas.color} opacity={0.6} />
            </svg>
            <div className="text-[10px] text-zinc-500 mt-1">기체</div>
          </div>

          {/* 검출 도구 */}
          {stage === 'testing' && (
            <>
              <div className="text-2xl">+</div>
              <div className="flex flex-col items-center">
                <div className="text-3xl">{gas.key === 'o2' ? '🕯️' : gas.key === 'co2' ? '🥛' : gas.key === 'h2' ? '🔥' : '❓'}</div>
                <div className="text-[10px] text-zinc-500 mt-1">검출</div>
              </div>
            </>
          )}
        </div>

        <div className="mt-3 text-xs text-zinc-600 dark:text-zinc-400">
          <div>
            <span className="font-bold">시약: </span>
            {gas.reagents}
          </div>
          {stage === 'testing' && (
            <div className="mt-1 p-2 rounded-lg" style={{ background: `${gas.color}20` }}>
              <span className="font-bold">검출 결과: </span>
              {gas.test}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={startCollect}
          disabled={stage !== 'idle'}
          className="w-full mt-3 px-3 py-2 rounded-lg bg-emerald-600 text-white font-medium min-h-[44px] disabled:opacity-50"
        >
          {stage === 'idle' ? '🧪 실험 시작' : stage === 'collecting' ? '집기 중...' : '✅ 완료'}
        </button>
        {stage !== 'idle' && (
          <button
            type="button"
            onClick={() => setStage('idle')}
            className="w-full mt-2 px-3 py-2 rounded-lg bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-sm min-h-[44px]"
          >
            다시
          </button>
        )}
      </div>

      <div className="rounded-xl bg-zinc-100 dark:bg-zinc-800 p-3">
        <div className="text-xs font-bold mb-2" style={{ color: gas.color }}>
          {gas.name}({gas.formula})의 성질
        </div>
        <ul className="text-sm space-y-1 text-zinc-700 dark:text-zinc-300">
          {gas.properties.map((p) => (
            <li key={p}>• {p}</li>
          ))}
        </ul>
        <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 pt-2 border-t border-zinc-200 dark:border-zinc-700">
          <span className="font-bold">실생활: </span>
          {gas.uses}
        </div>
      </div>

      <div className="text-xs text-zinc-500 dark:text-zinc-400">
        💡 기체는 「색·냄새」가 없는 경우가 많아 「검출 시험」으로 종류를 알아내요. 산소는 불을 키우고, 이산화탄소는 석회수를 흐리고, 수소는 폭발음을 내요. 각 시험은 그 기체만의 「특이반응」.
      </div>
    </div>
  );
}
