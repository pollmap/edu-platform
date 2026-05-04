'use client';

// E-GR-05 조동사 — can / will / must / should / may / might / could 의미 매트릭스.

import { useState } from 'react';

type Modal = 'can' | 'could' | 'will' | 'would' | 'may' | 'might' | 'must' | 'should';
type Sense = 'ability' | 'permission' | 'possibility' | 'necessity' | 'advice' | 'futurity';

interface Cell {
  fits: boolean;
  example: string;
  note: string;
}

const MODAL_LABEL: Record<Modal, string> = {
  can: 'can',
  could: 'could',
  will: 'will',
  would: 'would',
  may: 'may',
  might: 'might',
  must: 'must',
  should: 'should',
};

const SENSE_LABEL: Record<Sense, string> = {
  ability: '능력 (할 수 있다)',
  permission: '허락 (해도 된다)',
  possibility: '가능성 (할지 모른다)',
  necessity: '의무 (해야 한다)',
  advice: '충고 (하는 게 좋다)',
  futurity: '미래 (할 것이다)',
};

const CELLS: Record<Modal, Record<Sense, Cell>> = {
  can: {
    ability: { fits: true, example: 'I can swim.', note: '가장 흔한 능력 표현' },
    permission: { fits: true, example: 'You can leave now.', note: '편한 사이의 허락' },
    possibility: { fits: true, example: 'It can rain in April.', note: '일반적 가능성' },
    necessity: { fits: false, example: '—', note: '의무 의미 없음' },
    advice: { fits: false, example: '—', note: '충고 의미 없음' },
    futurity: { fits: false, example: '—', note: '미래 의미 없음' },
  },
  could: {
    ability: { fits: true, example: 'I could swim at five.', note: '과거의 능력' },
    permission: { fits: true, example: 'Could I borrow your pen?', note: '정중한 허락 요청' },
    possibility: { fits: true, example: 'It could snow tomorrow.', note: '약한 가능성' },
    necessity: { fits: false, example: '—', note: '의무 의미 없음' },
    advice: { fits: false, example: '—', note: '약한 제안 정도' },
    futurity: { fits: false, example: '—', note: '미래 의미 없음' },
  },
  will: {
    ability: { fits: false, example: '—', note: '능력 의미 없음' },
    permission: { fits: false, example: '—', note: '허락 의미 없음' },
    possibility: { fits: false, example: '—', note: '확정 미래' },
    necessity: { fits: false, example: '—', note: '의무 의미 없음' },
    advice: { fits: false, example: '—', note: '충고 의미 없음' },
    futurity: { fits: true, example: 'I will call you tomorrow.', note: '확정 미래·의지' },
  },
  would: {
    ability: { fits: false, example: '—', note: '능력 의미 없음' },
    permission: { fits: true, example: 'Would you help me?', note: '정중한 부탁' },
    possibility: { fits: true, example: 'That would be fun.', note: '가정적 가능성' },
    necessity: { fits: false, example: '—', note: '의무 의미 없음' },
    advice: { fits: false, example: '—', note: '충고 의미 없음' },
    futurity: { fits: true, example: 'He said he would come.', note: '과거 시점의 미래' },
  },
  may: {
    ability: { fits: false, example: '—', note: '능력 의미 없음' },
    permission: { fits: true, example: 'May I come in?', note: '격식 있는 허락' },
    possibility: { fits: true, example: 'It may rain today.', note: '50% 정도 가능성' },
    necessity: { fits: false, example: '—', note: '의무 의미 없음' },
    advice: { fits: false, example: '—', note: '충고 의미 없음' },
    futurity: { fits: false, example: '—', note: '미래 의미 없음' },
  },
  might: {
    ability: { fits: false, example: '—', note: '능력 의미 없음' },
    permission: { fits: false, example: '—', note: '허락 거의 안 씀' },
    possibility: { fits: true, example: 'It might rain.', note: 'may보다 약한 가능성' },
    necessity: { fits: false, example: '—', note: '의무 의미 없음' },
    advice: { fits: false, example: '—', note: '충고 의미 없음' },
    futurity: { fits: false, example: '—', note: '미래 의미 없음' },
  },
  must: {
    ability: { fits: false, example: '—', note: '능력 의미 없음' },
    permission: { fits: false, example: '—', note: '허락 의미 없음' },
    possibility: { fits: true, example: 'He must be home now.', note: '강한 추측 (분명히)' },
    necessity: { fits: true, example: 'You must wear a helmet.', note: '강한 의무·법' },
    advice: { fits: false, example: '—', note: '충고가 아닌 의무' },
    futurity: { fits: false, example: '—', note: '미래 의미 없음' },
  },
  should: {
    ability: { fits: false, example: '—', note: '능력 의미 없음' },
    permission: { fits: false, example: '—', note: '허락 의미 없음' },
    possibility: { fits: true, example: 'They should be here soon.', note: '예상 (그럴 것 같다)' },
    necessity: { fits: false, example: '—', note: 'must 만큼 강하지 않음' },
    advice: { fits: true, example: 'You should rest.', note: '가장 흔한 충고' },
    futurity: { fits: false, example: '—', note: '미래 의미 없음' },
  },
};

const MODALS: Modal[] = ['can', 'could', 'will', 'would', 'may', 'might', 'must', 'should'];
const SENSES: Sense[] = ['ability', 'permission', 'possibility', 'necessity', 'advice', 'futurity'];

export function ModalVerbMatrix() {
  const [sel, setSel] = useState<{ modal: Modal; sense: Sense }>({
    modal: 'can',
    sense: 'ability',
  });

  const cell = CELLS[sel.modal][sel.sense];

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-1">
          조동사 의미 매트릭스
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          한국어 ‘~할 수 있다’가 영어에서는 의미에 따라 다른 조동사로 갈라져요. 행(조동사) ×
          열(의미)에서 색이 진한 칸이 자연스러운 조합입니다.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[640px] text-xs sm:text-sm">
          <thead>
            <tr>
              <th className="p-2"></th>
              {SENSES.map((s) => (
                <th
                  key={s}
                  className="text-zinc-600 dark:text-zinc-300 font-semibold p-2 border-b border-zinc-200 dark:border-zinc-800 text-left"
                >
                  {SENSE_LABEL[s]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MODALS.map((m) => (
              <tr key={m}>
                <th className="text-zinc-600 dark:text-zinc-300 text-left p-2 whitespace-nowrap font-mono font-semibold">
                  {MODAL_LABEL[m]}
                </th>
                {SENSES.map((s) => {
                  const c = CELLS[m][s];
                  const isSel = sel.modal === m && sel.sense === s;
                  return (
                    <td key={s} className="p-1">
                      <button
                        type="button"
                        onClick={() => setSel({ modal: m, sense: s })}
                        aria-pressed={isSel}
                        className={`w-full min-h-[44px] px-2 py-1 rounded-md border text-xs transition ${
                          isSel
                            ? 'bg-purple-600 text-white border-purple-700'
                            : c.fits
                              ? 'bg-purple-50 dark:bg-purple-950/40 border-purple-300 dark:border-purple-800 text-purple-800 dark:text-purple-200 hover:border-purple-500'
                              : 'bg-zinc-50 dark:bg-zinc-950/40 border-zinc-200 dark:border-zinc-800 text-zinc-400'
                        }`}
                      >
                        {c.fits ? '○' : '·'}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <article
        className={`rounded-xl border-l-4 p-5 space-y-2 ${
          cell.fits
            ? 'bg-purple-50 dark:bg-purple-950/30 border-purple-500'
            : 'bg-zinc-50 dark:bg-zinc-950/40 border-zinc-400'
        }`}
      >
        <div className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
          {MODAL_LABEL[sel.modal]} · {SENSE_LABEL[sel.sense]}
        </div>
        <div className="text-base font-mono text-zinc-900 dark:text-zinc-100">{cell.example}</div>
        <div className="text-sm text-zinc-600 dark:text-zinc-400">{cell.note}</div>
      </article>

      <div className="rounded-lg bg-zinc-50 dark:bg-zinc-950/40 p-3 text-xs text-zinc-600 dark:text-zinc-400">
        💡 <strong>흔한 실수</strong>: 조동사 뒤에는 항상 <strong>동사 원형</strong> (3인칭 단수 s
        붙이지 않음). <code>She can swims</code> ✗ → <code>She can swim</code> ○.
      </div>
    </div>
  );
}
