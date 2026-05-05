'use client';

// S-LE1-01 역사 속 과학 탐구 — 4대 고전 실험 재현 비교.

import { useState } from 'react';

interface Replica {
  id: string;
  who: string;
  year: number;
  title: string;
  setup: string;
  finding: string;
  modernCheck: string;
}

const REPLICAS: Replica[] = [
  {
    id: 'eratosthenes',
    who: '에라토스테네스',
    year: -240,
    title: '지구 둘레 측정',
    setup: '시에네(현 아스완)와 알렉산드리아에서 같은 시각 기둥 그림자 길이의 차',
    finding: '두 도시 위도차 ≈ 7.2° → 지구 둘레 ≈ 250,000 stadia ≈ 39,000 km',
    modernCheck: '실제 둘레 40,075 km. 오차 약 2 %.',
  },
  {
    id: 'galileo',
    who: '갈릴레이',
    year: 1604,
    title: '경사면 낙하 실험',
    setup: '경사면을 굴러 내려가는 공의 거리/시간 측정 (시간은 물시계)',
    finding: '낙하 거리는 시간의 제곱에 비례 (등가속도)',
    modernCheck: 'd = ½gt² 로 정확히 일치. g ≈ 9.8 m/s².',
  },
  {
    id: 'cavendish',
    who: '캐번디시',
    year: 1798,
    title: '만유인력 상수 측정',
    setup: '비틀림 저울로 두 납공 사이의 인력 직접 측정',
    finding: '만유인력 상수 G ≈ 6.74 × 10⁻¹¹ Nm²/kg² (지구 질량 계산)',
    modernCheck: '현재 G = 6.674 × 10⁻¹¹. 오차 < 1 %.',
  },
  {
    id: 'mendel',
    who: '멘델',
    year: 1865,
    title: '완두콩 유전 비율',
    setup: '완두콩 7개 형질을 8년에 걸쳐 ~28,000개 교배·분류',
    finding: '우열·분리·독립의 법칙. 표현형 비 3:1, 9:3:3:1',
    modernCheck: 'DNA·유전자 발견 후에도 멘델 비율 그대로 성립.',
  },
];

export function UnitSLE101Explorer() {
  const [selectedId, setSelectedId] = useState<string>(REPLICAS[0].id);
  const r = REPLICAS.find((x) => x.id === selectedId) ?? REPLICAS[0];

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-1">
          역사 속 과학 탐구 재현
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          이름만 알던 고전 실험. 「설계 → 결과 → 현대 검증」 셋을 비교해 보세요.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
        {REPLICAS.map((rep) => (
          <button
            key={rep.id}
            type="button"
            onClick={() => setSelectedId(rep.id)}
            className={`min-h-[44px] rounded-lg px-2 ${
              selectedId === rep.id
                ? 'bg-green-600 text-white font-semibold'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
            }`}
          >
            {rep.who}
          </button>
        ))}
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4 text-sm space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-green-600 dark:text-green-400">{r.title}</span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
            {r.who} · {r.year > 0 ? `${r.year}년` : `BC ${-r.year}년`}
          </span>
        </div>
        <div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400 font-bold mb-1">실험 설계</div>
          <p>{r.setup}</p>
        </div>
        <div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400 font-bold mb-1">결과</div>
          <p>{r.finding}</p>
        </div>
        <div className="border-t border-zinc-200 dark:border-zinc-700 pt-2">
          <div className="text-xs text-zinc-500 dark:text-zinc-400 font-bold mb-1">현대 측정과 비교</div>
          <p className="text-blue-600 dark:text-blue-400 font-medium">{r.modernCheck}</p>
        </div>
      </div>

      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        과학은 「오래된 결과」도 더 정밀한 측정으로 재검증을 거쳐 살아남거나 폐기. 멘델 비율과 g 값은 이미 200~150년 검증을 통과한 핵심 결과.
      </p>
    </div>
  );
}
