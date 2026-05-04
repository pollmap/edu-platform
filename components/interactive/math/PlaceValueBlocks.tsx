'use client';

// M3-NA-01 세 자리 수 덧셈과 뺄셈 — 자릿값 블록 시각화 + 받아올림/내림 표시.

import { useMemo, useState } from 'react';
import { SliderRow } from '@/components/primitives/SliderRow';

type Op = '+' | '-';

interface Digit {
  hundreds: number;
  tens: number;
  ones: number;
}

function fromNumber(n: number): Digit {
  return {
    hundreds: Math.floor(n / 100) % 10,
    tens: Math.floor(n / 10) % 10,
    ones: n % 10,
  };
}

export function PlaceValueBlocks() {
  const [a, setA] = useState(247);
  const [b, setB] = useState(186);
  const [op, setOp] = useState<Op>('+');

  const result = op === '+' ? a + b : a - b;
  const da = fromNumber(a);
  const db = fromNumber(b);

  const carries = useMemo(() => {
    if (op === '+') {
      const onesCarry = da.ones + db.ones >= 10;
      const tensCarry = da.tens + db.tens + (onesCarry ? 1 : 0) >= 10;
      return { ones: onesCarry, tens: tensCarry, label: '받아올림' };
    }
    const onesBorrow = da.ones < db.ones;
    const tensBorrow = da.tens - (onesBorrow ? 1 : 0) < db.tens;
    return { ones: onesBorrow, tens: tensBorrow, label: '받아내림' };
  }, [op, da, db]);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          자릿값 블록
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          백·십·일의 자리 블록 수가 <strong>10개</strong>가 되면 윗자리 1개로 합쳐 가요. 이게 <strong>받아올림</strong>이에요.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <BlockRow label={`a = ${a}`} digit={da} />
          <BlockRow label={`b = ${b}`} digit={db} />
          <div className="border-t-2 border-zinc-300 dark:border-zinc-700 pt-3">
            <BlockRow label={`a ${op} b = ${result}`} digit={fromNumber(Math.max(0, result))} highlight />
          </div>
        </div>

        <div className="space-y-3">
          <SliderRow label="a" value={a} min={0} max={999} step={1} onChange={setA} />
          <SliderRow label="b" value={b} min={0} max={999} step={1} onChange={setB} />
          <div className="flex gap-2">
            {(['+', '-'] as const).map((o) => (
              <button
                key={o}
                type="button"
                onClick={() => setOp(o)}
                className={`flex-1 min-h-[44px] rounded-md border-2 font-mono text-lg ${
                  op === o
                    ? 'bg-blue-600 text-white border-blue-700'
                    : 'bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200'
                }`}
              >
                {o}
              </button>
            ))}
          </div>
          <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-500 p-3 text-sm space-y-1">
            <div className="font-mono text-zinc-900 dark:text-zinc-100">
              {a} {op} {b} = <strong>{result}</strong>
            </div>
            <div className="text-xs text-zinc-600 dark:text-zinc-400">
              {carries.label}: 일의 자리 {carries.ones ? '있음' : '없음'} · 십의 자리 {carries.tens ? '있음' : '없음'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BlockRow({ label, digit, highlight }: { label: string; digit: Digit; highlight?: boolean }) {
  const cellBg = highlight ? 'bg-amber-50 dark:bg-amber-950/30' : 'bg-zinc-50 dark:bg-zinc-800/40';
  return (
    <div className={`rounded-lg ${cellBg} p-3 border border-zinc-200 dark:border-zinc-700`}>
      <div className="text-xs font-mono text-zinc-600 dark:text-zinc-400 mb-2">{label}</div>
      <div className="grid grid-cols-3 gap-2 text-center">
        <PlaceCell label="백" count={digit.hundreds} color="#dc2626" />
        <PlaceCell label="십" count={digit.tens} color="#2563eb" />
        <PlaceCell label="일" count={digit.ones} color="#10b981" />
      </div>
    </div>
  );
}

function PlaceCell({ label, count, color }: { label: string; count: number; color: string }) {
  return (
    <div className="space-y-1">
      <div className="text-[10px] text-zinc-500 dark:text-zinc-400">{label}</div>
      <div className="flex flex-wrap gap-0.5 min-h-[28px] justify-center">
        {Array.from({ length: count }, (_, i) => (
          <div key={i} className="w-3 h-3 rounded-sm" style={{ background: color }} />
        ))}
      </div>
      <div className="font-mono text-sm font-bold" style={{ color }}>
        {count}
      </div>
    </div>
  );
}
