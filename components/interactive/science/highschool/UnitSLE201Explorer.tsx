'use client';

// S-LE2-01 첨단 과학 탐구 — AI/CRISPR/양자/핵융합 미래 기술 4가지 비교 시뮬.

import { useState } from 'react';

type Topic = 'ai' | 'crispr' | 'quantum' | 'fusion';

interface Tech {
  id: Topic;
  label: string;
  oneLine: string;
  principle: string;
  status: string;
  risk: string;
  trl: number; // 기술준비수준 1~9
}

const TECHS: Tech[] = [
  {
    id: 'ai',
    label: '대규모 AI',
    oneLine: '신경망이 인간 언어·이미지를 통계적으로 학습.',
    principle: '트랜스포머 구조에 수십억 매개변수, 텍스트 다음 토큰 예측을 반복 → 추론·번역·코드 생성.',
    status: '의료 영상 진단 보조·과학논문 요약·신약 후보 탐색에서 인간 보조 수준 상용.',
    risk: '환각·편향·일자리·통제 어려움. 안전 정렬 연구 필수.',
    trl: 9,
  },
  {
    id: 'crispr',
    label: 'CRISPR 유전자 편집',
    oneLine: 'DNA 특정 위치를 정확히 잘라 고치는 분자 가위.',
    principle: 'gRNA가 표적 DNA를 찾아주면 Cas9 단백질이 절단 → 세포가 복구하면서 새 서열 삽입.',
    status: '겸상적혈구·β-탈라세미아 치료제 (Casgevy, 2023 FDA) 승인.',
    risk: '오프타깃 편집·생식세포 변경 윤리. 「맞춤 아기」 논쟁.',
    trl: 8,
  },
  {
    id: 'quantum',
    label: '양자 컴퓨팅',
    oneLine: '큐비트의 중첩·얽힘으로 특정 문제를 지수적으로 빨리 풀이.',
    principle: '0과 1을 동시에 가지는 큐비트 N개로 2ⁿ 상태 동시 탐색. 쇼어 알고리즘은 RSA 암호 해독 가능.',
    status: 'IBM 1000+ 큐비트, 구글·중국 양자우위 시연. 오류율 낮추는 단계.',
    risk: '현재 RSA 암호 위협 → 포스트양자 암호 전환 필요. 안정 큐비트 수 부족.',
    trl: 5,
  },
  {
    id: 'fusion',
    label: '핵융합 발전',
    oneLine: '수소를 헬륨으로 합쳐 태양과 같은 방식으로 에너지 추출.',
    principle: 'D + T → He + n + 17.6 MeV. 1억 °C 플라즈마를 토카막·관성 가둠.',
    status: '미국 NIF 2022 점화 (Q > 1), ITER 2035 가동, KSTAR 100 M °C 30초 유지.',
    risk: '폐기물 적음·연쇄반응 X, 다만 상업화 2050년대 예상. 트리튬 공급·재료 내성.',
    trl: 4,
  },
];

export function UnitSLE201Explorer() {
  const [topic, setTopic] = useState<Topic>('ai');
  const t = TECHS.find((x) => x.id === topic) ?? TECHS[0];

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-1">
          첨단 기술 4종 비교
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          AI·CRISPR·양자·핵융합 — 「원리 / 현재 / 위험 / TRL」 4관점으로 정리.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
        {TECHS.map((tt) => (
          <button
            key={tt.id}
            type="button"
            onClick={() => setTopic(tt.id)}
            className={`min-h-[44px] rounded-lg px-2 ${
              topic === tt.id
                ? 'bg-green-600 text-white font-semibold'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
            }`}
          >
            {tt.label}
          </button>
        ))}
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4 space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-green-600 dark:text-green-400">{t.label}</div>
          <div className="text-xs">
            <span className="text-zinc-500 dark:text-zinc-400">TRL </span>
            <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{t.trl}/9</span>
          </div>
        </div>

        {/* TRL 막대 */}
        <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-green-500"
            style={{ width: `${(t.trl / 9) * 100}%` }}
          />
        </div>
        <div className="text-xs text-zinc-500 dark:text-zinc-400">
          TRL 1~3 기초연구 / 4~6 시제품 / 7~9 상용. 9는 일상 도입.
        </div>

        <div className="border-t border-zinc-200 dark:border-zinc-700 pt-2 italic">{t.oneLine}</div>

        <div>
          <div className="text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1">원리</div>
          <p>{t.principle}</p>
        </div>
        <div>
          <div className="text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1">현재 상태</div>
          <p>{t.status}</p>
        </div>
        <div>
          <div className="text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1">위험·윤리</div>
          <p className="text-red-500 dark:text-red-400">{t.risk}</p>
        </div>
      </div>

      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        모든 첨단 기술은 「가능성·필요성·위험」을 함께 고려해야 책임 있는 도입이 가능. 과학자만이 아니라 시민 전체의 합의가 필요한 영역.
      </p>
    </div>
  );
}
