'use client';

// M-AM-06 확률과 통계 (AI수학) — 나이브 베이즈 스팸 분류기.

import { useMemo, useState } from 'react';
import { MathFormula } from '@/components/primitives/MathFormula';

interface TrainDoc { text: string; label: 'spam' | 'ham'; }

const DEFAULT_TRAIN: TrainDoc[] = [
  { text: '무료 쿠폰 당첨 클릭', label: 'spam' },
  { text: '대박 이벤트 무료 당첨', label: 'spam' },
  { text: '클릭 한방에 100만원', label: 'spam' },
  { text: '안녕하세요 회의 시간 변경', label: 'ham' },
  { text: '점심 같이 먹을래 회의', label: 'ham' },
  { text: '안녕 오늘 약속 시간 확인', label: 'ham' },
];

function tokenize(s: string): string[] {
  return s.trim().split(/\s+/).filter((w) => w.length > 0);
}

export function NaiveBayesClassifier() {
  const [train] = useState<TrainDoc[]>(DEFAULT_TRAIN);
  const [test, setTest] = useState('무료 클릭 당첨');

  const model = useMemo(() => {
    const spam = train.filter((d) => d.label === 'spam');
    const ham = train.filter((d) => d.label === 'ham');
    const allWords = Array.from(new Set(train.flatMap((d) => tokenize(d.text))));
    const wc = (docs: TrainDoc[], w: string): number => docs.reduce((c, d) => c + tokenize(d.text).filter((x) => x === w).length, 0);
    const totalWords = (docs: TrainDoc[]): number => docs.reduce((c, d) => c + tokenize(d.text).length, 0);
    const V = allWords.length;
    const spamTotal = totalWords(spam);
    const hamTotal = totalWords(ham);
    return {
      pSpam: spam.length / train.length,
      pHam: ham.length / train.length,
      // Laplace smoothed
      pWordSpam: (w: string) => (wc(spam, w) + 1) / (spamTotal + V),
      pWordHam: (w: string) => (wc(ham, w) + 1) / (hamTotal + V),
      vocabSize: V,
    };
  }, [train]);

  const prediction = useMemo(() => {
    const tokens = tokenize(test);
    let logS = Math.log(model.pSpam || 1e-9);
    let logH = Math.log(model.pHam || 1e-9);
    const breakdown: { w: string; ps: number; ph: number }[] = [];
    for (const w of tokens) {
      const ps = model.pWordSpam(w);
      const ph = model.pWordHam(w);
      logS += Math.log(ps);
      logH += Math.log(ph);
      breakdown.push({ w, ps, ph });
    }
    const m = Math.max(logS, logH);
    const sExp = Math.exp(logS - m);
    const hExp = Math.exp(logH - m);
    const probSpam = sExp / (sExp + hExp);
    return {
      breakdown,
      probSpam,
      label: probSpam > 0.5 ? 'spam' : 'ham',
    };
  }, [test, model]);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          나이브 베이즈 — 「단어가 독립이라 가정」하는 가장 단순한 AI 분류기
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          입력 문장의 단어들이 서로 독립이라고 「순진하게(naive)」 가정해, 각 단어가 스팸·햄에서 등장할 확률을 곱해
          어느 쪽이 더 그럴듯한지 비교해요. 단순하지만 스팸 필터·뉴스 분류에 오랫동안 쓰인 알고리즘이에요.
        </p>
      </div>

      <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 p-4 text-center">
        <MathFormula tex={`P(C|w_1,\\ldots,w_n) \\propto P(C)\\prod_{i} P(w_i|C)`} />
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-3">
        <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">학습 데이터 (고정)</div>
        <ul className="text-xs space-y-1 font-mono">
          {train.map((d, i) => (
            <li key={i} className="flex gap-2">
              <span className={`px-1.5 rounded ${d.label === 'spam' ? 'bg-red-200 dark:bg-red-800 text-red-900 dark:text-red-100' : 'bg-green-200 dark:bg-green-800 text-green-900 dark:text-green-100'}`}>
                {d.label}
              </span>
              <span className="text-zinc-700 dark:text-zinc-300">{d.text}</span>
            </li>
          ))}
        </ul>
        <div className="mt-2 text-[11px] text-zinc-500 dark:text-zinc-500 font-mono">
          P(spam) = {model.pSpam.toFixed(2)} / P(ham) = {model.pHam.toFixed(2)} / |V| = {model.vocabSize}
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-blue-700 dark:text-blue-400 mb-2">분류할 문장</label>
        <input
          type="text"
          value={test}
          onChange={(e) => setTest(e.target.value)}
          className="w-full min-h-[44px] px-3 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 font-mono text-sm"
        />
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-3 overflow-x-auto">
        <table className="w-full text-xs font-mono">
          <thead>
            <tr className="border-b border-zinc-300 dark:border-zinc-700">
              <th className="text-left px-2 py-1 text-zinc-500">단어</th>
              <th className="text-right px-2 py-1 text-red-600">P(w|spam)</th>
              <th className="text-right px-2 py-1 text-green-600">P(w|ham)</th>
            </tr>
          </thead>
          <tbody>
            {prediction.breakdown.map((b, i) => (
              <tr key={i} className="border-b border-zinc-200 dark:border-zinc-800">
                <td className="px-2 py-1 font-bold text-zinc-800 dark:text-zinc-200">{b.w}</td>
                <td className="text-right px-2 py-1 text-red-600 dark:text-red-400">{b.ps.toFixed(4)}</td>
                <td className="text-right px-2 py-1 text-green-600 dark:text-green-400">{b.ph.toFixed(4)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={`rounded-xl p-5 text-center ${prediction.label === 'spam' ? 'bg-red-50 dark:bg-red-950/30' : 'bg-green-50 dark:bg-green-950/30'}`}>
        <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">판정</div>
        <div className={`text-2xl font-bold ${prediction.label === 'spam' ? 'text-red-700 dark:text-red-300' : 'text-green-700 dark:text-green-300'}`}>
          {prediction.label.toUpperCase()}
        </div>
        <div className="text-xs font-mono text-zinc-600 dark:text-zinc-400 mt-1">
          P(spam | 문장) ≈ {(prediction.probSpam * 100).toFixed(1)}%
        </div>
      </div>
    </div>
  );
}
