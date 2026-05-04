'use client';

// M-EM-02 수열과 금융 — 연금 미래가치·대출 월상환액 계산기.

import { useMemo, useState } from 'react';
import { MathFormula } from '@/components/primitives/MathFormula';
import { SliderRow } from '@/components/primitives/SliderRow';

type Mode = 'fv' | 'loan';

export function AnnuityCalculator() {
  const [mode, setMode] = useState<Mode>('fv');
  const [pmt, setPmt] = useState(300000);
  const [years, setYears] = useState(20);
  const [annualRate, setAnnualRate] = useState(5);
  const [loanAmount, setLoanAmount] = useState(200000000);
  const [loanYears, setLoanYears] = useState(30);

  const monthlyRate = annualRate / 100 / 12;
  const months = years * 12;

  const fv = useMemo(() => {
    if (monthlyRate === 0) return pmt * months;
    return pmt * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
  }, [pmt, monthlyRate, months]);

  const loanRate = annualRate / 100 / 12;
  const loanMonths = loanYears * 12;
  const monthlyPayment = useMemo(() => {
    if (loanRate === 0) return loanAmount / loanMonths;
    return (loanAmount * loanRate * Math.pow(1 + loanRate, loanMonths)) / (Math.pow(1 + loanRate, loanMonths) - 1);
  }, [loanAmount, loanRate, loanMonths]);

  // chart series for FV growth
  const series = useMemo(() => {
    const arr: { m: number; balance: number; deposited: number }[] = [];
    let bal = 0;
    for (let m = 0; m <= months; m++) {
      arr.push({ m, balance: bal, deposited: pmt * m });
      bal = bal * (1 + monthlyRate) + pmt;
    }
    return arr;
  }, [pmt, months, monthlyRate]);

  const W = 480;
  const H = 200;
  const padL = 50;
  const padR = 10;
  const padT = 10;
  const padB = 30;
  const yMax = Math.max(series[series.length - 1]?.balance || 1, 1);
  const xToPix = (m: number): number => padL + (m / Math.max(months, 1)) * (W - padL - padR);
  const yToPix = (y: number): number => padT + (1 - y / yMax) * (H - padT - padB);

  function fmt(n: number): string {
    return n.toLocaleString('ko-KR', { maximumFractionDigits: 0 });
  }

  const totalInterest = monthlyPayment * loanMonths - loanAmount;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          연금·대출 — 등비수열 합 공식이 그대로 쓰이는 현장
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          매달 같은 금액을 적립·상환하는 「등비수열」을 더하면 연금의 미래가치(FV)와 대출의 월상환액이 나와요.
          공식 안의 (1+r)ⁿ이 곧 시간의 마법이에요.
        </p>
      </div>

      <div className="flex gap-2">
        {([
          { id: 'fv', label: '연금 미래가치' },
          { id: 'loan', label: '대출 월상환' },
        ] as { id: Mode; label: string }[]).map((b) => (
          <button
            key={b.id}
            type="button"
            onClick={() => setMode(b.id)}
            className={`flex-1 min-h-[44px] px-3 rounded-md text-sm border-2 ${
              mode === b.id
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-semibold'
                : 'border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300'
            }`}
          >
            {b.label}
          </button>
        ))}
      </div>

      <SliderRow label="연이율 r" value={annualRate} min={0} max={15} step={0.1} onChange={setAnnualRate} format={(v) => v.toFixed(1)} unit="%" />

      {mode === 'fv' ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <SliderRow label="월 적립액" value={pmt} min={50000} max={3000000} step={50000} onChange={setPmt} format={fmt} unit="원" />
            <SliderRow label="기간" value={years} min={1} max={40} step={1} onChange={setYears} format={(v) => v.toString()} unit="년" />
          </div>

          <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 p-4 text-center text-xs">
            <MathFormula tex={`FV = PMT \\cdot \\frac{(1+r/12)^{n} - 1}{r/12}`} />
          </div>

          <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-3">
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
              <line x1={padL} y1={H - padB} x2={W - padR} y2={H - padB} stroke="#94a3b8" />
              <line x1={padL} y1={padT} x2={padL} y2={H - padB} stroke="#94a3b8" />
              <path
                d={series.map((s, i) => `${i === 0 ? 'M' : 'L'} ${xToPix(s.m).toFixed(1)} ${yToPix(s.deposited).toFixed(1)}`).join(' ')}
                fill="none"
                stroke="#94a3b8"
                strokeWidth="1.5"
                strokeDasharray="3 2"
              />
              <path
                d={series.map((s, i) => `${i === 0 ? 'M' : 'L'} ${xToPix(s.m).toFixed(1)} ${yToPix(s.balance).toFixed(1)}`).join(' ')}
                fill="none"
                stroke="#2563eb"
                strokeWidth="2"
              />
              <text x={W - padR - 5} y={padT + 14} textAnchor="end" fontSize="10" fill="#2563eb">— 잔액 (이자 포함)</text>
              <text x={W - padR - 5} y={padT + 28} textAnchor="end" fontSize="10" className="fill-zinc-500 dark:fill-zinc-400">--- 누적 입금액</text>
            </svg>
          </div>

          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="rounded bg-zinc-50 dark:bg-zinc-950/40 p-3 text-center">
              <div className="text-xs text-zinc-500">총 입금</div>
              <div className="font-mono text-base text-zinc-700 dark:text-zinc-300 break-all">{fmt(pmt * months)}원</div>
            </div>
            <div className="rounded bg-blue-50 dark:bg-blue-950/30 p-3 text-center">
              <div className="text-xs text-blue-700 dark:text-blue-300">미래가치 FV</div>
              <div className="font-mono text-base text-blue-800 dark:text-blue-200 break-all">{fmt(fv)}원</div>
            </div>
            <div className="rounded bg-green-50 dark:bg-green-950/30 p-3 text-center">
              <div className="text-xs text-green-700 dark:text-green-300">이자 수익</div>
              <div className="font-mono text-base text-green-800 dark:text-green-200 break-all">+{fmt(fv - pmt * months)}원</div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <SliderRow label="대출 원금" value={loanAmount} min={10000000} max={1000000000} step={10000000} onChange={setLoanAmount} format={fmt} unit="원" />
            <SliderRow label="기간" value={loanYears} min={1} max={40} step={1} onChange={setLoanYears} format={(v) => v.toString()} unit="년" />
          </div>

          <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 p-4 text-center text-xs">
            <MathFormula tex={`PMT = \\frac{L \\cdot r}{1 - (1+r)^{-n}}`} />
          </div>

          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="rounded bg-blue-50 dark:bg-blue-950/30 p-3 text-center">
              <div className="text-xs text-blue-700 dark:text-blue-300">월 상환액</div>
              <div className="font-mono text-base text-blue-800 dark:text-blue-200 break-all">{fmt(monthlyPayment)}원</div>
            </div>
            <div className="rounded bg-zinc-50 dark:bg-zinc-950/40 p-3 text-center">
              <div className="text-xs text-zinc-500">총 상환액</div>
              <div className="font-mono text-base text-zinc-700 dark:text-zinc-300 break-all">{fmt(monthlyPayment * loanMonths)}원</div>
            </div>
            <div className="rounded bg-red-50 dark:bg-red-950/30 p-3 text-center">
              <div className="text-xs text-red-700 dark:text-red-300">총 이자</div>
              <div className="font-mono text-base text-red-800 dark:text-red-200 break-all">{fmt(totalInterest)}원</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
