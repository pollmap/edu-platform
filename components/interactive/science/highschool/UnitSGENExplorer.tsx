'use client';

// S-GEN 생물의 유전 — DNA 복제 / 전사 / 번역 토글 + 상보적 염기 시뮬레이터.

import { useState } from 'react';

type Stage = 'replication' | 'transcription' | 'translation';

const CODON_TABLE: Record<string, string> = {
  AUG: 'Met (시작)',
  UUU: 'Phe',
  UUC: 'Phe',
  UUA: 'Leu',
  UUG: 'Leu',
  GCU: 'Ala',
  GCA: 'Ala',
  GAA: 'Glu',
  GAG: 'Glu',
  UAA: 'STOP',
  UAG: 'STOP',
  UGA: 'STOP',
};

function complement(b: string, rna: boolean): string {
  if (b === 'A') return rna ? 'U' : 'T';
  if (b === 'T' || b === 'U') return 'A';
  if (b === 'G') return 'C';
  if (b === 'C') return 'G';
  return b;
}

export function UnitSGENExplorer() {
  const [stage, setStage] = useState<Stage>('replication');
  const [seq, setSeq] = useState('ATGGCAGAA');

  const dnaTemplate = seq.toUpperCase().replace(/[^ATGC]/g, '');
  const dnaComp = dnaTemplate.split('').map((b) => complement(b, false)).join('');
  const mRNA = dnaTemplate.split('').map((b) => complement(b, true)).join('');
  const codons: string[] = [];
  for (let i = 0; i + 3 <= mRNA.length; i += 3) {
    codons.push(mRNA.slice(i, i + 3));
  }
  const protein = codons.map((c) => CODON_TABLE[c] ?? '?').join(' - ');

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-1">
          DNA 복제 · 전사 · 번역
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          DNA 서열을 입력하면 복제 가닥 / mRNA / 단백질이 자동 생성. 「유전정보의 흐름」 직접 추적.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2 text-xs sm:text-sm">
        {(['replication', 'transcription', 'translation'] as Stage[]).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setStage(id)}
            className={`min-h-[44px] rounded-lg px-2 ${
              stage === id
                ? 'bg-green-600 text-white font-semibold'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
            }`}
          >
            {id === 'replication' ? '복제' : id === 'transcription' ? '전사' : '번역'}
          </button>
        ))}
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3">
        <label className="block text-xs text-zinc-500 dark:text-zinc-400 mb-1">DNA 주형 가닥 (3'→5')</label>
        <input
          type="text"
          value={seq}
          onChange={(e) => setSeq(e.target.value)}
          className="w-full bg-white dark:bg-zinc-900 rounded p-2 font-mono text-sm"
          maxLength={36}
          aria-label="DNA 서열"
        />
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
          A·T·G·C만 입력. 길이 3 배수 권장.
        </p>
      </div>

      {stage === 'replication' && (
        <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4 font-mono text-sm space-y-2">
          <div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">주형:</span>{' '}
            <span className="text-blue-600 dark:text-blue-400">{dnaTemplate || '—'}</span>
          </div>
          <div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">새 가닥 (DNA pol):</span>{' '}
            <span className="text-green-600 dark:text-green-400">{dnaComp || '—'}</span>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            A↔T / G↔C 상보 결합. 양쪽 가닥이 각각 주형 → 두 동일한 이중나선 (반보존적 복제).
          </p>
        </div>
      )}

      {stage === 'transcription' && (
        <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4 font-mono text-sm space-y-2">
          <div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">DNA 주형:</span>{' '}
            <span className="text-blue-600 dark:text-blue-400">{dnaTemplate || '—'}</span>
          </div>
          <div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">mRNA (5'→3'):</span>{' '}
            <span className="text-purple-600 dark:text-purple-400">{mRNA || '—'}</span>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            DNA 주형의 T → A, A → U. RNA 중합효소가 핵 안에서 mRNA 합성. 인트론 제거 후 핵 밖으로.
          </p>
        </div>
      )}

      {stage === 'translation' && (
        <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4 font-mono text-sm space-y-2">
          <div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">mRNA:</span>{' '}
            <span className="text-purple-600 dark:text-purple-400">{mRNA || '—'}</span>
          </div>
          <div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">코돈:</span>{' '}
            <span className="text-zinc-600 dark:text-zinc-300">{codons.join(' ') || '—'}</span>
          </div>
          <div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">아미노산:</span>{' '}
            <span className="text-green-600 dark:text-green-400">{protein || '—'}</span>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            리보솜이 mRNA를 3개씩(코돈) 읽어 tRNA가 가져온 아미노산을 펩티드 결합. AUG 시작, UAA/UAG/UGA 종결.
          </p>
        </div>
      )}
    </div>
  );
}
