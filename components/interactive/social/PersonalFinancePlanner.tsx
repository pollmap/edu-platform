'use client';

// H-FE 금융과 경제생활 — 가계부·자산배분·은퇴 계산기.
// 자체 작성. 교육 목적 단순 계산 (실제 투자 권유 X).

import { useMemo, useState } from 'react';

export function PersonalFinancePlanner() {
  const [income, setIncome] = useState(300); // 월 소득 (만원)
  const [savingRate, setSavingRate] = useState(20); // 저축률 %
  const [years, setYears] = useState(30); // 운용 기간 (년)
  const [returnRate, setReturnRate] = useState(5); // 연 수익률 %

  const result = useMemo(() => {
    const monthlySave = income * (savingRate / 100);
    const yearlySave = monthlySave * 12;
    const r = returnRate / 100;
    // 미래가치 (연복리, 매년 말 yearlySave 추가)
    let fv = 0;
    for (let i = 0; i < years; i++) {
      fv = (fv + yearlySave) * (1 + r);
    }
    // 단순 합산(이자 X)
    const totalSaved = yearlySave * years;

    return {
      monthlySave,
      yearlySave,
      totalSaved,
      fv,
      gain: fv - totalSaved,
    };
  }, [income, savingRate, years, returnRate]);

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <h4 className="mb-3 font-bold">조건 설정</h4>

        <div className="space-y-3">
          <div>
            <label className="mb-1 flex justify-between text-sm">
              <span>월 소득 (세후)</span>
              <span className="font-mono">{income}만원</span>
            </label>
            <input
              type="range"
              min={150}
              max={1000}
              step={10}
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
              className="h-11 w-full"
            />
          </div>

          <div>
            <label className="mb-1 flex justify-between text-sm">
              <span>저축률</span>
              <span className="font-mono">{savingRate}%</span>
            </label>
            <input
              type="range"
              min={5}
              max={60}
              step={1}
              value={savingRate}
              onChange={(e) => setSavingRate(Number(e.target.value))}
              className="h-11 w-full"
            />
          </div>

          <div>
            <label className="mb-1 flex justify-between text-sm">
              <span>운용 기간</span>
              <span className="font-mono">{years}년</span>
            </label>
            <input
              type="range"
              min={1}
              max={50}
              step={1}
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="h-11 w-full"
            />
          </div>

          <div>
            <label className="mb-1 flex justify-between text-sm">
              <span>연 평균 수익률</span>
              <span className="font-mono">{returnRate}%</span>
            </label>
            <input
              type="range"
              min={0}
              max={12}
              step={0.5}
              value={returnRate}
              onChange={(e) => setReturnRate(Number(e.target.value))}
              className="h-11 w-full"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-md border border-zinc-200 bg-white p-3 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">월 저축액</div>
          <div className="text-lg font-bold">{result.monthlySave.toFixed(0)}만원</div>
        </div>
        <div className="rounded-md border border-zinc-200 bg-white p-3 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">총 저축 원금</div>
          <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{Math.round(result.totalSaved).toLocaleString()}만원</div>
        </div>
        <div className="rounded-md border border-zinc-200 bg-white p-3 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">{years}년 후 평가액</div>
          <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{Math.round(result.fv).toLocaleString()}만원</div>
        </div>
        <div className="rounded-md border border-zinc-200 bg-white p-3 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">복리 효과</div>
          <div className="text-lg font-bold text-orange-600 dark:text-orange-400">+{Math.round(result.gain).toLocaleString()}만원</div>
        </div>
      </div>

      <div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-sm dark:border-amber-900 dark:bg-amber-950/30">
        <p className="mb-1 font-bold text-amber-700 dark:text-amber-300">복리의 마법 — 시간이 가장 큰 무기</p>
        <p className="text-zinc-700 dark:text-zinc-300">
          같은 금액이라도 운용 기간이 길수록 복리 효과가 기하급수적으로 커져요. 「언제 시작하느냐」가 「얼마나 모으느냐」만큼 중요해요.
        </p>
      </div>

      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        ※ 이 계산기는 교육 목적의 단순 모델이에요. 실제 투자에는 위험·세금·인플레이션이 함께 작용해요. 어떤 특정 상품에 대한 권유가 아니에요.
      </p>
    </div>
  );
}
