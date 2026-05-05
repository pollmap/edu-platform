'use client';

// S-CST 융합과학 탐구 — 자유 노트북: 가설 → 변인 → 결과 기록 템플릿.

import { useState } from 'react';

interface NotebookEntry {
  id: string;
  title: string;
  hypothesis: string;
  iv: string;
  dv: string;
  result: string;
}

const TEMPLATES: NotebookEntry[] = [
  {
    id: 't1',
    title: '식초 농도 vs 달걀 껍데기 분해 시간',
    hypothesis: '식초 농도가 높을수록 분해 시간이 짧을 것이다.',
    iv: '식초 농도 (5%, 10%, 15%, 20%)',
    dv: '껍데기가 완전히 분해되는 데 걸린 시간 (분)',
    result: '농도와 시간 사이에 음의 상관 (반비례 경향)',
  },
  {
    id: 't2',
    title: '학교 옥상 옥수수 광합성률 vs 빛 세기',
    hypothesis: '빛 세기가 일정 수준 이상이면 광합성률이 포화된다.',
    iv: '빛 세기 (lx)',
    dv: '단위시간당 O₂ 발생량 (mL/min)',
    result: '특정 광량 이상에서 곡선이 평평해짐 → 광포화점',
  },
];

export function UnitSCSTExplorer() {
  const [tab, setTab] = useState<'editor' | 'samples'>('editor');
  const [entry, setEntry] = useState<NotebookEntry>({
    id: 'mine',
    title: '',
    hypothesis: '',
    iv: '',
    dv: '',
    result: '',
  });

  function update<K extends keyof NotebookEntry>(k: K, v: NotebookEntry[K]) {
    setEntry((prev) => ({ ...prev, [k]: v }));
  }

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-1">
          융합과학 탐구 노트
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          제목 → 가설 → 독립변인 / 종속변인 → 결과. 모든 과학 탐구의 뼈대.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm">
        {(['editor', 'samples'] as const).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`min-h-[44px] rounded-lg px-3 ${
              tab === id
                ? 'bg-green-600 text-white font-semibold'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
            }`}
          >
            {id === 'editor' ? '나의 노트' : '예시'}
          </button>
        ))}
      </div>

      {tab === 'editor' ? (
        <div className="space-y-3">
          <Field label="탐구 주제" value={entry.title} onChange={(v) => update('title', v)} />
          <Field
            label="가설 (관찰 → 추측 → 검증 가능 형태)"
            value={entry.hypothesis}
            onChange={(v) => update('hypothesis', v)}
            multiline
          />
          <Field
            label="독립변인 (내가 바꾸는 것)"
            value={entry.iv}
            onChange={(v) => update('iv', v)}
          />
          <Field
            label="종속변인 (그 결과 변하는 것)"
            value={entry.dv}
            onChange={(v) => update('dv', v)}
          />
          <Field
            label="결과 / 결론"
            value={entry.result}
            onChange={(v) => update('result', v)}
            multiline
          />

          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3 text-xs text-zinc-500 dark:text-zinc-400">
            ✅ 좋은 가설은 숫자·방향성·검증 가능성 3가지를 갖춰야 해요. 「뭔가 변한다」는 가설은 너무 약함.
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {TEMPLATES.map((t) => (
            <div key={t.id} className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3 text-sm space-y-1">
              <div className="font-bold text-green-600 dark:text-green-400">{t.title}</div>
              <div>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">가설:</span> {t.hypothesis}
              </div>
              <div>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">독립변인:</span> {t.iv}
              </div>
              <div>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">종속변인:</span> {t.dv}
              </div>
              <div>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">결과:</span> {t.result}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
}

function Field({ label, value, onChange, multiline }: FieldProps) {
  return (
    <label className="block text-sm">
      <span className="block text-xs text-zinc-500 dark:text-zinc-400 mb-1">{label}</span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-zinc-50 dark:bg-zinc-800 rounded-lg p-2 min-h-[80px]"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-zinc-50 dark:bg-zinc-800 rounded-lg p-2 min-h-[44px]"
        />
      )}
    </label>
  );
}
