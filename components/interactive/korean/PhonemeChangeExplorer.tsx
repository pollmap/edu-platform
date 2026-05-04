'use client';

// K-GR-02 음운 변동 — 한국어 5대 변동 규칙.

import { useState } from 'react';

interface Rule {
  id: string;
  name: string;
  meaning: string;
  before: string;
  after: string;
  example: string;
  why: string;
}

const RULES: Rule[] = [
  {
    id: 'liaison',
    name: '연음',
    meaning: '받침이 다음 음절 첫소리로 옮겨감',
    before: '꽃이',
    after: '꼬치',
    example: '꽃이 → [꼬치], 책을 → [채글], 옷이 → [오시]',
    why: '받침을 뒤 모음에 자연스럽게 이어 발음하면 더 매끄러워요.',
  },
  {
    id: 'tense',
    name: '경음화',
    meaning: '거센·된소리로 변함',
    before: '국밥',
    after: '국빱',
    example: '국밥 → [국빱], 학교 → [학꾜], 잡고 → [잡꼬]',
    why: '받침 ㄱ·ㄷ·ㅂ 다음에 ㄱ·ㄷ·ㅂ·ㅅ·ㅈ가 오면 된소리(ㄲ·ㄸ·ㅃ·ㅆ·ㅉ)로 발음돼요.',
  },
  {
    id: 'aspiration',
    name: '격음화',
    meaning: 'ㅎ과 합쳐 거센소리로',
    before: '좋고',
    after: '조코',
    example: '좋고 → [조코], 많다 → [만타], 입학 → [이팍]',
    why: 'ㅎ + ㄱ·ㄷ·ㅂ·ㅈ → ㅋ·ㅌ·ㅍ·ㅊ. 예사소리에 거센 바람을 더한 소리.',
  },
  {
    id: 'nasal',
    name: '비음화',
    meaning: '받침이 콧소리(ㄴ·ㅁ·ㅇ)로 변함',
    before: '국물',
    after: '궁물',
    example: '국물 → [궁물], 닫는다 → [단는다], 잡는 → [잠는]',
    why: '받침 ㄱ·ㄷ·ㅂ 뒤에 ㄴ·ㅁ이 오면 같은 위치 콧소리로 동화돼요.',
  },
  {
    id: 'palatalization',
    name: '구개음화',
    meaning: 'ㄷ·ㅌ이 ㅈ·ㅊ으로',
    before: '같이',
    after: '가치',
    example: '같이 → [가치], 굳이 → [구지], 해돋이 → [해도지]',
    why: 'ㄷ·ㅌ + ㅣ → ㅈ·ㅊ. 혀가 입천장 가운데로 자연스럽게 옮겨가요.',
  },
];

export function PhonemeChangeExplorer() {
  const [active, setActive] = useState('liaison');
  const cur = RULES.find((r) => r.id === active)!;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-1">
          한국어 음운 변동 5가지
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          글자대로 읽지 않고 발음이 바뀌는 규칙이에요. 외울 게 많아 보이지만 사실 우리가 매일 자연스럽게 쓰는 거예요.
        </p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
        {RULES.map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() => setActive(r.id)}
            className={`px-2 py-2 text-xs rounded-md border min-h-[50px] ${
              active === r.id
                ? 'bg-red-50 dark:bg-red-950/30 border-red-500 ring-2 ring-red-300 font-bold'
                : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700'
            }`}
          >
            {r.name}
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border-2 border-zinc-200 dark:border-zinc-800 p-6 text-center space-y-3">
        <div className="text-xs text-zinc-500 dark:text-zinc-400">{cur.meaning}</div>
        <div className="flex items-center justify-center gap-4 text-2xl">
          <span className="font-bold text-zinc-900 dark:text-zinc-100">{cur.before}</span>
          <span className="text-red-500">→</span>
          <span className="font-bold text-red-700 dark:text-red-300">[{cur.after}]</span>
        </div>
      </div>

      <div className="rounded-xl bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500 p-4 space-y-2">
        <div className="font-bold text-red-800 dark:text-red-300">{cur.name}</div>
        <p className="text-sm text-zinc-700 dark:text-zinc-300">
          <strong>예:</strong> {cur.example}
        </p>
        <p className="text-xs text-zinc-600 dark:text-zinc-400">
          💡 {cur.why}
        </p>
      </div>
    </div>
  );
}
