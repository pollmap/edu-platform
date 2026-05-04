'use client';

// H8-GE-01 인구 변화·문제 — 인구 피라미드 3가지 형태(피라미드형/종형/항아리형) 비교.

import { useMemo, useState } from 'react';

type PyramidType = 'pyramid' | 'bell' | 'urn';

interface AgeGroup {
  label: string;
  pyramid: { male: number; female: number };
  bell: { male: number; female: number };
  urn: { male: number; female: number };
}

// 5세 단위, 0~80+ (값은 단순화한 학습용 비율)
const AGE_GROUPS: AgeGroup[] = [
  { label: '80+', pyramid: { male: 1, female: 1 }, bell: { male: 4, female: 6 }, urn: { male: 6, female: 9 } },
  { label: '70-79', pyramid: { male: 2, female: 2 }, bell: { male: 5, female: 7 }, urn: { male: 8, female: 11 } },
  { label: '60-69', pyramid: { male: 3, female: 3 }, bell: { male: 7, female: 8 }, urn: { male: 10, female: 12 } },
  { label: '50-59', pyramid: { male: 4, female: 4 }, bell: { male: 9, female: 9 }, urn: { male: 12, female: 13 } },
  { label: '40-49', pyramid: { male: 5, female: 5 }, bell: { male: 10, female: 10 }, urn: { male: 11, female: 12 } },
  { label: '30-39', pyramid: { male: 7, female: 7 }, bell: { male: 11, female: 11 }, urn: { male: 9, female: 10 } },
  { label: '20-29', pyramid: { male: 9, female: 9 }, bell: { male: 11, female: 11 }, urn: { male: 8, female: 8 } },
  { label: '10-19', pyramid: { male: 11, female: 11 }, bell: { male: 10, female: 10 }, urn: { male: 6, female: 6 } },
  { label: '0-9', pyramid: { male: 13, female: 13 }, bell: { male: 9, female: 9 }, urn: { male: 4, female: 4 } },
];

const TYPE_INFO: Record<PyramidType, { label: string; period: string; desc: string; problems: string[] }> = {
  pyramid: {
    label: '피라미드형',
    period: '발전 초기 / 1960년대 한국 또는 현재 일부 개발도상국',
    desc: '아래(어린이)가 넓고 위(노인)는 좁아요. 출생률·사망률이 모두 높아 평균 수명이 짧아요.',
    problems: ['어린이를 위한 학교·돌봄 시설 부족 가능', '경제 활동 인구 부담 큼'],
  },
  bell: {
    label: '종형 (벨형)',
    period: '20세기 후반 한국 / 선진국 안정기',
    desc: '출생률·사망률이 모두 낮아져 모양이 종(벨)처럼 균형 잡혀요.',
    problems: ['균형은 좋지만 곧 노령화로 진행될 수 있음'],
  },
  urn: {
    label: '항아리형',
    period: '현재의 한국·일본·유럽 다수 선진국',
    desc: '아래가 좁고 가운데~위가 넓어요. 출생률이 매우 낮고 노인 비율이 높은 「저출생·고령화」.',
    problems: ['일할 사람(생산가능인구) 감소', '노인 부양 부담 증가', '학교·소아과 줄고 요양시설 늘어남'],
  },
};

const MAX_VAL = 14;

export function PopulationPyramidExplorer() {
  const [type, setType] = useState<PyramidType>('pyramid');

  const data = useMemo(
    () =>
      AGE_GROUPS.map((g) => ({
        label: g.label,
        male: g[type].male,
        female: g[type].female,
      })),
    [type]
  );

  const info = TYPE_INFO[type];

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-orange-700 dark:text-orange-400 mb-1">
          인구 피라미드 — 한 사회의 「나이 그림」
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          가로 막대 길이는 그 나이대 사람 수예요. <strong>왼쪽=남자, 오른쪽=여자</strong>. 모양이 피라미드형 → 종형 → 항아리형 순으로 변하면서 사회 문제도 달라져요.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-1.5">
        {(['pyramid', 'bell', 'urn'] as PyramidType[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setType(t)}
            className={`px-2 py-2 text-xs sm:text-sm rounded-md border min-h-[44px] ${
              type === t
                ? 'border-orange-500 ring-2 ring-orange-300 font-bold bg-orange-50 dark:bg-orange-950/30'
                : 'border-zinc-200 dark:border-zinc-700'
            }`}
          >
            {TYPE_INFO[t].label}
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-800 p-4">
        <div className="flex items-center text-[10px] font-bold text-zinc-500 dark:text-zinc-400 mb-1">
          <div className="flex-1 text-right">남자</div>
          <div className="w-16 text-center">나이대</div>
          <div className="flex-1 text-left">여자</div>
        </div>
        {data.map((row) => (
          <div key={row.label} className="flex items-center text-xs my-0.5">
            <div className="flex-1 flex justify-end">
              <div
                className="h-4 bg-blue-500 dark:bg-blue-400 rounded-sm transition-all duration-300"
                style={{ width: `${(row.male / MAX_VAL) * 100}%` }}
                aria-label={`남자 ${row.label}: ${row.male}`}
              />
            </div>
            <div className="w-16 text-center font-mono text-zinc-600 dark:text-zinc-300">{row.label}</div>
            <div className="flex-1 flex">
              <div
                className="h-4 bg-rose-500 dark:bg-rose-400 rounded-sm transition-all duration-300"
                style={{ width: `${(row.female / MAX_VAL) * 100}%` }}
                aria-label={`여자 ${row.label}: ${row.female}`}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border-l-4 border-orange-500 bg-orange-50/50 dark:bg-orange-950/20 p-4 space-y-2 text-sm">
        <div className="font-bold text-orange-700 dark:text-orange-400">
          {info.label} <span className="text-xs font-normal text-zinc-500">— {info.period}</span>
        </div>
        <p>{info.desc}</p>
        <div className="text-xs">
          <div className="font-bold mb-1">생길 수 있는 문제</div>
          <ul className="list-disc list-inside space-y-1 text-zinc-700 dark:text-zinc-300">
            {info.problems.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
