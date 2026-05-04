'use client';

// E-CE1-03 쓰기 — 영문 단락(paragraph) 구조 빌더.

import { useState } from 'react';

interface Slot {
  id: string;
  label: string;
  placeholder: string;
  hint: string;
  example: string;
}

const SLOTS: Slot[] = [
  {
    id: 'topic',
    label: 'Topic Sentence (주제문)',
    placeholder: 'I think... / In my opinion... / Reading helps us...',
    hint: '단락의 핵심 주장을 한 문장으로. 너무 일반적이거나 너무 구체적이지 않게.',
    example: 'Daily reading is the most effective way to improve writing skills.',
  },
  {
    id: 'reason1',
    label: 'Reason / Detail 1',
    placeholder: 'First / One reason / For example...',
    hint: '주제를 받쳐 주는 첫 번째 근거나 이유. "First," 로 시작하면 안전.',
    example: 'First, it expands vocabulary in natural contexts, not just memorized lists.',
  },
  {
    id: 'reason2',
    label: 'Reason / Detail 2',
    placeholder: 'Second / In addition / Also...',
    hint: '두 번째 근거. 첫 번째와 다른 각도여야 함.',
    example: 'In addition, it shows readers how good writers structure paragraphs.',
  },
  {
    id: 'example',
    label: 'Specific Example (예시)',
    placeholder: 'For instance / A study showed...',
    hint: '추상적 주장을 구체화할 짧은 사례나 통계. 너무 길지 않게.',
    example: 'A 2022 OECD survey reported that frequent readers wrote essays with 30% fewer errors.',
  },
  {
    id: 'closing',
    label: 'Closing Sentence (마무리)',
    placeholder: 'Therefore / In conclusion / This is why...',
    hint: '주장을 다시 강조 + 글의 의의. 새 근거 추가 금지.',
    example: 'Therefore, students who want to write better should make reading a daily habit.',
  },
];

export function EnglishWritingBuilder() {
  const [draft, setDraft] = useState<Record<string, string>>({});
  const filled = SLOTS.filter((s) => (draft[s.id] || '').trim().length > 0).length;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-1">영문 단락 빌더</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          영작은 <strong>주제문 → 근거 2개 → 예시 → 마무리</strong> 5블록. 슬롯에 맞춰 채우면 자연스러운 단락이 완성돼요.
        </p>
      </div>

      <div className="rounded-md bg-purple-50 dark:bg-purple-950/30 px-3 py-2 text-xs text-zinc-700 dark:text-zinc-300">
        진행: {filled} / {SLOTS.length} 블록 채움
      </div>

      <div className="space-y-3">
        {SLOTS.map((s) => (
          <div key={s.id} className="rounded-md border border-zinc-200 dark:border-zinc-700 p-3 space-y-2">
            <div className="flex items-baseline justify-between">
              <div className="text-sm font-semibold text-purple-700 dark:text-purple-400">{s.label}</div>
              <div className="text-[10px] text-zinc-500 dark:text-zinc-400">{s.hint}</div>
            </div>
            <textarea
              value={draft[s.id] || ''}
              onChange={(e) => setDraft({ ...draft, [s.id]: e.target.value })}
              placeholder={s.placeholder}
              rows={2}
              className="w-full rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-2 text-sm text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <div className="text-[11px] text-zinc-500 dark:text-zinc-400 italic">예: {s.example}</div>
          </div>
        ))}
      </div>

      {filled === SLOTS.length && (
        <div className="rounded-xl bg-purple-50 dark:bg-purple-950/30 border-l-4 border-purple-500 p-4 space-y-2">
          <div className="text-sm font-semibold text-purple-700 dark:text-purple-400">완성된 단락</div>
          <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
            {SLOTS.map((s) => draft[s.id]).join(' ')}
          </p>
        </div>
      )}

      <div className="rounded-md bg-zinc-50 dark:bg-zinc-800 px-3 py-2 text-xs text-zinc-600 dark:text-zinc-400">
        🎯 영작에서 흔한 실수는 주제문 없이 예시부터 시작하는 것. 슬롯 순서대로 쓰는 연습이 가장 빠른 교정.
      </div>
    </div>
  );
}
