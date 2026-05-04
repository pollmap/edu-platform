'use client';

// M-AM-02 텍스트 처리 (벡터화) — TF-IDF로 단어 중요도 시각화.

import { useMemo, useState } from 'react';
import { MathFormula } from '@/components/primitives/MathFormula';

const DEFAULT_DOCS = [
  '강아지 좋아하다 산책',
  '고양이 좋아하다 잠 자다',
  '강아지 고양이 둘 다 좋아하다',
];

function tokenize(s: string): string[] {
  return s.trim().split(/\s+/).filter((w) => w.length > 0);
}

export function TfidfVectorExplorer() {
  const [docs, setDocs] = useState<string[]>(DEFAULT_DOCS);

  const result = useMemo(() => {
    const tokens = docs.map(tokenize);
    const vocab = Array.from(new Set(tokens.flat())).sort();
    const N = docs.length;
    const df: Record<string, number> = {};
    for (const term of vocab) {
      df[term] = tokens.filter((t) => t.includes(term)).length;
    }
    const tfidf = tokens.map((doc) => {
      const counts: Record<string, number> = {};
      for (const w of doc) counts[w] = (counts[w] || 0) + 1;
      const len = Math.max(doc.length, 1);
      const row: Record<string, number> = {};
      for (const term of vocab) {
        const tf = (counts[term] || 0) / len;
        const idf = Math.log((N + 1) / ((df[term] || 0) + 1)) + 1;
        row[term] = tf * idf;
      }
      return row;
    });
    return { vocab, df, tfidf };
  }, [docs]);

  function updateDoc(i: number, val: string): void {
    setDocs((d) => d.map((x, j) => (j === i ? val : x)));
  }

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
          TF-IDF — 「많이 나온 단어」 vs 「이 문서에서만 자주 나오는 단어」
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          AI는 텍스트를 그대로 이해할 수 없어요. 단어를 「빈도(TF)」와 「희소성(IDF)」으로 곱한 점수로 바꿔야 비교가 가능해져요.
          여러 문서에 다 나오는 단어(은,는,이,가)는 점수가 낮고, 한 문서에만 나오는 단어는 점수가 높아져요.
        </p>
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-3 space-y-2">
        <div className="text-xs text-zinc-500 dark:text-zinc-400">문서 (공백으로 단어 구분)</div>
        {docs.map((d, i) => (
          <div key={i} className="flex gap-2">
            <span className="self-center font-mono text-xs text-zinc-500 w-12">D{i + 1}</span>
            <input
              type="text"
              value={d}
              onChange={(e) => updateDoc(i, e.target.value)}
              className="flex-1 min-h-[44px] px-3 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 font-mono text-sm"
            />
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 p-4 text-center text-xs">
        <MathFormula tex={`\\text{TF-IDF}(t,d) = \\frac{\\#(t,d)}{|d|} \\times \\left(\\log\\frac{N+1}{df(t)+1} + 1\\right)`} />
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 p-3 overflow-x-auto">
        <table className="w-full text-xs font-mono">
          <thead>
            <tr className="border-b border-zinc-300 dark:border-zinc-700">
              <th className="text-left px-2 py-1 text-zinc-500">단어</th>
              <th className="text-right px-2 py-1 text-zinc-500">DF</th>
              {docs.map((_, i) => (
                <th key={i} className="text-right px-2 py-1 text-blue-700 dark:text-blue-400">D{i + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {result.vocab.map((term) => {
              const max = Math.max(...result.tfidf.map((r) => r[term] || 0), 0.01);
              return (
                <tr key={term} className="border-b border-zinc-200 dark:border-zinc-800">
                  <td className="px-2 py-1 font-bold text-zinc-800 dark:text-zinc-200">{term}</td>
                  <td className="text-right px-2 py-1 text-zinc-600 dark:text-zinc-400">{result.df[term]}</td>
                  {result.tfidf.map((row, i) => {
                    const v = row[term] || 0;
                    const intensity = v / max;
                    return (
                      <td key={i} className="text-right px-2 py-1" style={{ background: `rgba(59,130,246,${intensity * 0.5})` }}>
                        {v.toFixed(3)}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="text-xs text-zinc-500 dark:text-zinc-400">
        ☝ 모든 문서에 나오는 단어는 IDF가 작아져 점수가 깎이고, 특정 문서에만 등장하는 단어는 점수가 커져요. 이 벡터를 사용해 문서 유사도, 검색 랭킹, AI 분류기를 만들 수 있어요.
      </div>
    </div>
  );
}
