'use client';

// M-PS-04 조건부 확률·독립 — 의료 검사 베이즈 정리 시뮬.

import { useState } from 'react';
import { MathFormula } from '@/components/primitives/MathFormula';
import { SliderRow } from '@/components/primitives/SliderRow';

export function BayesTheoremSimulator() {
  const [prevalence, setPrevalence] = useState(0.01); // P(D)
  const [sensitivity, setSensitivity] = useState(0.95); // P(+|D)
  const [specificity, setSpecificity] = useState(0.95); // P(-|~D)

  const fpr = 1 - specificity; // P(+|~D)
  const pD = prevalence;
  const pNotD = 1 - pD;
  const pPos = sensitivity * pD + fpr * pNotD;
  const posterior = (sensitivity * pD) / (pPos || 1e-9);

  // 100x100 dot grid representing 10000 people
  const N = 10000;
  const sick = Math.round(N * pD);
  const healthy = N - sick;
  const tp = Math.round(sick * sensitivity);
  const fn = sick - tp;
  const fp = Math.round(healthy * fpr);
  const tn = healthy - fp;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          베이즈 정리 — 검사 양성이 나왔을 때 진짜로 환자일 확률은?
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          민감도 95%, 특이도 95%여도 유병률이 1%면 양성 결과가 나와도 실제 환자일 확률은 16% 정도밖에 안 돼요.
          이게 「희귀 질환은 다시 검사해야 하는」 이유예요.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <SliderRow label="유병률 P(D)" value={prevalence} min={0.001} max={0.5} step={0.001} onChange={setPrevalence} format={(v) => `${(v * 100).toFixed(1)}%`} />
        <SliderRow label="민감도 P(+|D)" value={sensitivity} min={0.5} max={1} step={0.01} onChange={setSensitivity} format={(v) => `${(v * 100).toFixed(0)}%`} />
        <SliderRow label="특이도 P(−|¬D)" value={specificity} min={0.5} max={1} step={0.01} onChange={setSpecificity} format={(v) => `${(v * 100).toFixed(0)}%`} />
      </div>

      <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 p-5 text-center">
        <div className="text-xs text-blue-700 dark:text-blue-300 mb-2">양성 판정 시 환자일 확률</div>
        <MathFormula
          tex={`P(D|+) = \\frac{P(+|D)\\,P(D)}{P(+)} = \\frac{${sensitivity.toFixed(2)}\\times ${pD.toFixed(3)}}{${pPos.toFixed(4)}} = ${(posterior * 100).toFixed(1)}\\%`}
        />
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-4">
        <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">10,000명 모의실험 (반올림)</div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="rounded p-2 bg-red-100 dark:bg-red-900/40">
            <div className="text-xs text-red-700 dark:text-red-300">진짜 환자 양성 (TP)</div>
            <div className="font-mono text-lg text-red-800 dark:text-red-200">{tp.toLocaleString()}명</div>
          </div>
          <div className="rounded p-2 bg-orange-100 dark:bg-orange-900/40">
            <div className="text-xs text-orange-700 dark:text-orange-300">건강한데 양성 (FP)</div>
            <div className="font-mono text-lg text-orange-800 dark:text-orange-200">{fp.toLocaleString()}명</div>
          </div>
          <div className="rounded p-2 bg-yellow-100 dark:bg-yellow-900/40">
            <div className="text-xs text-yellow-700 dark:text-yellow-300">환자인데 음성 (FN)</div>
            <div className="font-mono text-lg text-yellow-800 dark:text-yellow-200">{fn.toLocaleString()}명</div>
          </div>
          <div className="rounded p-2 bg-green-100 dark:bg-green-900/40">
            <div className="text-xs text-green-700 dark:text-green-300">건강한 음성 (TN)</div>
            <div className="font-mono text-lg text-green-800 dark:text-green-200">{tn.toLocaleString()}명</div>
          </div>
        </div>
        <div className="mt-3 text-xs text-zinc-600 dark:text-zinc-400 font-mono">
          양성 전체 = TP + FP = {(tp + fp).toLocaleString()}명 → 그중 진짜 환자 비율 = {tp.toLocaleString()} / {(tp + fp).toLocaleString()} ≈ {((tp / Math.max(tp + fp, 1)) * 100).toFixed(1)}%
        </div>
      </div>
    </div>
  );
}
