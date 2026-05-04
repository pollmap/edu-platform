'use client';

// M-EM-01 수와 생활경제 — 단리 vs 복리 비교 시뮬.

import { useMemo, useState } from 'react';
import { MathFormula } from '@/components/primitives/MathFormula';
import { SliderRow } from '@/components/primitives/SliderRow';

export function CompoundInterestExplorer() {
  const [principal, setPrincipal] = useState(1000000);
  const [rate, setRate] = useState(5);
  const [years, setYears] = useState(10);
  const [freq, setFreq] = useState<1 | 4 | 12 | 365>(1);

  const data = useMemo(() => {
    const r = rate / 100;
    const points: { year: number; simple: number; compound: number }[] = [];
    for (let t = 0; t <= years; t++) {
      const simple = principal * (1 + r * t);
      const compound = principal * Math.pow(1 + r / freq, freq * t);
      points.push({ year: t, simple, compound });
    }
    return points;
  }, [principal, rate, years, freq]);

  const last = data[data.length - 1];
  const diff = last ? last.compound - last.simple : 0;

  const W = 480;
  const H = 220;
  const padL = 50;
  const padR = 10;
  const padT = 10;
  const padB = 30;
  const yMax = Math.max(...data.map((d) => d.compound), 1);
  const xToPix = (t: number): number => padL + (t / Math.max(years, 1)) * (W - padL - padR);
  const yToPix = (y: number): number => padT + (1 - y / yMax) * (H - padT - padB);

  const simplePath = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${xToPix(d.year).toFixed(1)} ${yToPix(d.simple).toFixed(1)}`).join(' ');
  const compoundPath = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${xToPix(d.year).toFixed(1)} ${yToPix(d.compound).toFixed(1)}`).join(' ');

  function fmt(n: number): string {
    return n.toLocaleString('ko-KR', { maximumFractionDigits: 0 });
  }

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          단리 vs 복리 — 시간이 길어질수록 갈리는 두 곡선
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          단리는 「원금에만」, 복리는 「이자에 또 이자」가 붙어요. 이자가 붙는 횟수가 많고 기간이 길수록 복리의 위력이 폭발해요.
          이게 워런 버핏이 말한 「복리는 세상에서 8번째 불가사의」의 본뜻이에요.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <SliderRow label="원금" value={principal} min={100000} max={10000000} step={100000} onChange={setPrincipal} format={(v) => fmt(v)} unit="원" />
        <SliderRow label="연이율 r" value={rate} min={0} max={20} step={0.5} onChange={setRate} format={(v) => v.toFixed(1)} unit="%" />
        <SliderRow label="기간 t" value={years} min={1} max={50} step={1} onChange={setYears} format={(v) => v.toString()} unit="년" />
        <div>
          <div className="text-sm font-bold text-blue-700 dark:text-blue-400 mb-2">복리 빈도</div>
          <div className="flex gap-2 flex-wrap">
            {([1, 4, 12, 365] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFreq(f)}
                className={`min-h-[44px] px-3 rounded-md border-2 text-xs ${
                  freq === f
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-semibold'
                    : 'border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300'
                }`}
              >
                {f === 1 ? '연' : f === 4 ? '분기' : f === 12 ? '월' : '일'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 p-4 text-center text-xs">
        <MathFormula tex={`A_\\text{단리} = P(1 + rt),\\quad A_\\text{복리} = P\\left(1 + \\frac{r}{n}\\right)^{nt}`} />
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
          <line x1={padL} y1={H - padB} x2={W - padR} y2={H - padB} stroke="#94a3b8" />
          <line x1={padL} y1={padT} x2={padL} y2={H - padB} stroke="#94a3b8" />
          <path d={simplePath} fill="none" stroke="#16a34a" strokeWidth="2" />
          <path d={compoundPath} fill="none" stroke="#dc2626" strokeWidth="2" />
          {[0, Math.floor(years / 2), years].map((t) => (
            <text key={t} x={xToPix(t)} y={H - padB + 14} textAnchor="middle" fontSize="9" fontFamily="monospace" className="fill-zinc-600 dark:fill-zinc-400">
              {t}년
            </text>
          ))}
          <text x={padL - 4} y={yToPix(yMax)} textAnchor="end" fontSize="9" fontFamily="monospace" className="fill-zinc-600 dark:fill-zinc-400">
            {fmt(yMax)}
          </text>
          <text x={padL - 4} y={H - padB} textAnchor="end" fontSize="9" fontFamily="monospace" className="fill-zinc-600 dark:fill-zinc-400">
            0
          </text>
          <text x={W - padR - 5} y={padT + 14} textAnchor="end" fontSize="10" fill="#dc2626">— 복리</text>
          <text x={W - padR - 5} y={padT + 28} textAnchor="end" fontSize="10" fill="#16a34a">— 단리</text>
        </svg>
      </div>

      {last && (
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div className="rounded bg-green-50 dark:bg-green-950/30 p-3 text-center">
            <div className="text-xs text-green-700 dark:text-green-300">{years}년 후 단리</div>
            <div className="font-mono text-base text-green-800 dark:text-green-200 break-all">{fmt(last.simple)}원</div>
          </div>
          <div className="rounded bg-red-50 dark:bg-red-950/30 p-3 text-center">
            <div className="text-xs text-red-700 dark:text-red-300">{years}년 후 복리</div>
            <div className="font-mono text-base text-red-800 dark:text-red-200 break-all">{fmt(last.compound)}원</div>
          </div>
          <div className="rounded bg-blue-50 dark:bg-blue-950/30 p-3 text-center">
            <div className="text-xs text-blue-700 dark:text-blue-300">차이</div>
            <div className="font-mono text-base text-blue-800 dark:text-blue-200 break-all">+{fmt(diff)}원</div>
          </div>
        </div>
      )}
    </div>
  );
}
