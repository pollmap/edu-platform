'use client';

// K-GR-01 한글 자음·모음 체계 — 닿소리/홀소리 + 만든 원리.

import { useState } from 'react';

const CONSONANTS = [
  { ch: 'ㄱ', name: '기역', shape: '혀뿌리가 목구멍을 막는 모양', kind: 'basic' },
  { ch: 'ㄴ', name: '니은', shape: '혀끝이 윗잇몸에 닿는 모양', kind: 'basic' },
  { ch: 'ㄷ', name: '디귿', shape: 'ㄴ에 한 획 더', kind: 'derived' },
  { ch: 'ㄹ', name: '리을', shape: '혀끝이 윗잇몸에 닿았다 떨어지는 모양', kind: 'derived' },
  { ch: 'ㅁ', name: '미음', shape: '입술 모양', kind: 'basic' },
  { ch: 'ㅂ', name: '비읍', shape: 'ㅁ에 두 획 더', kind: 'derived' },
  { ch: 'ㅅ', name: '시옷', shape: '이 모양', kind: 'basic' },
  { ch: 'ㅈ', name: '지읒', shape: 'ㅅ에 한 획 더', kind: 'derived' },
  { ch: 'ㅇ', name: '이응', shape: '목구멍 모양', kind: 'basic' },
  { ch: 'ㅎ', name: '히읗', shape: 'ㅇ에 두 획 더', kind: 'derived' },
];

const VOWELS = [
  { ch: 'ㅏ', name: '아', mean: '하늘이 동쪽에 있는 모양 (양성)' },
  { ch: 'ㅓ', name: '어', mean: '하늘이 서쪽에 있는 모양 (음성)' },
  { ch: 'ㅗ', name: '오', mean: '하늘이 위에 있는 모양 (양성)' },
  { ch: 'ㅜ', name: '우', mean: '하늘이 아래에 있는 모양 (음성)' },
  { ch: 'ㅡ', name: '으', mean: '땅(평평함)' },
  { ch: 'ㅣ', name: '이', mean: '사람(서 있음)' },
];

export function HangulSystemExplorer() {
  const [tab, setTab] = useState<'cons' | 'vowel'>('cons');
  const [selected, setSelected] = useState<string | null>('ㄱ');

  const items = tab === 'cons' ? CONSONANTS : VOWELS;
  const cur = items.find((i) => i.ch === selected);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-1">
          한글 — 발음 기관과 천지인을 본뜬 글자
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          한글은 1443년 세종이 만든 글자예요. <strong>자음(닿소리)</strong>은 입·혀 모양에서, <strong>모음(홀소리)</strong>은 하늘·땅·사람에서 따왔어요.
        </p>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => { setTab('cons'); setSelected('ㄱ'); }}
          className={`flex-1 px-3 py-2 text-sm rounded-md border min-h-[44px] ${
            tab === 'cons' ? 'bg-red-50 dark:bg-red-950/30 border-red-500 ring-2 ring-red-300 font-bold' : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700'
          }`}
        >
          자음 (닿소리)
        </button>
        <button
          type="button"
          onClick={() => { setTab('vowel'); setSelected('ㅏ'); }}
          className={`flex-1 px-3 py-2 text-sm rounded-md border min-h-[44px] ${
            tab === 'vowel' ? 'bg-red-50 dark:bg-red-950/30 border-red-500 ring-2 ring-red-300 font-bold' : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700'
          }`}
        >
          모음 (홀소리)
        </button>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {items.map((it) => (
          <button
            key={it.ch}
            type="button"
            onClick={() => setSelected(it.ch)}
            className={`py-3 rounded-md border text-center min-h-[60px] ${
              selected === it.ch
                ? 'bg-red-50 dark:bg-red-950/30 border-red-500 ring-2 ring-red-300'
                : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800'
            }`}
          >
            <div className="text-2xl text-zinc-900 dark:text-zinc-100">{it.ch}</div>
            <div className="text-xs text-zinc-500 mt-1">{it.name}</div>
          </button>
        ))}
      </div>

      {cur && (
        <div className="rounded-xl bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500 p-4 space-y-1">
          <div className="text-3xl font-bold text-red-800 dark:text-red-300">{cur.ch}</div>
          <div className="text-sm text-zinc-700 dark:text-zinc-300">
            <strong>{cur.name}</strong> — {tab === 'cons' ? (cur as typeof CONSONANTS[0]).shape : (cur as typeof VOWELS[0]).mean}
          </div>
          {tab === 'cons' && (cur as typeof CONSONANTS[0]).kind === 'derived' && (
            <div className="text-xs text-zinc-500">기본자에 획을 더해 만든 글자예요(가획).</div>
          )}
        </div>
      )}

      <div className="rounded-lg bg-zinc-50 dark:bg-zinc-950/40 p-3 text-xs text-zinc-600 dark:text-zinc-400">
        한글 28자(자음 17 + 모음 11)에서 시작 → 오늘날 자음 14·모음 10·합성 글자로 발전. 모든 음절이 <strong>자음 + 모음 (+ 받침)</strong> 구조라 매우 체계적이에요.
      </div>
    </div>
  );
}
