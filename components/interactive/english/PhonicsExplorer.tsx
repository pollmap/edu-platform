'use client';

// E-VOC-01 알파벳·파닉스 — 패턴 11 매칭 + Web Speech API.
// 26 알파벳 + 대표 발음 + 단어 예시. 클릭 시 TTS.

import { useEffect, useState } from 'react';

interface Letter {
  letter: string;
  ipa: string;
  word: string;
  meaning: string;
}

const LETTERS: Letter[] = [
  { letter: 'A', ipa: '/æ/', word: 'apple', meaning: '사과' },
  { letter: 'B', ipa: '/b/', word: 'ball', meaning: '공' },
  { letter: 'C', ipa: '/k/', word: 'cat', meaning: '고양이' },
  { letter: 'D', ipa: '/d/', word: 'dog', meaning: '개' },
  { letter: 'E', ipa: '/e/', word: 'egg', meaning: '달걀' },
  { letter: 'F', ipa: '/f/', word: 'fish', meaning: '물고기' },
  { letter: 'G', ipa: '/ɡ/', word: 'goat', meaning: '염소' },
  { letter: 'H', ipa: '/h/', word: 'hat', meaning: '모자' },
  { letter: 'I', ipa: '/ɪ/', word: 'igloo', meaning: '얼음집' },
  { letter: 'J', ipa: '/dʒ/', word: 'jam', meaning: '잼' },
  { letter: 'K', ipa: '/k/', word: 'kite', meaning: '연' },
  { letter: 'L', ipa: '/l/', word: 'lion', meaning: '사자' },
  { letter: 'M', ipa: '/m/', word: 'moon', meaning: '달' },
  { letter: 'N', ipa: '/n/', word: 'nest', meaning: '둥지' },
  { letter: 'O', ipa: '/ɒ/', word: 'orange', meaning: '오렌지' },
  { letter: 'P', ipa: '/p/', word: 'pig', meaning: '돼지' },
  { letter: 'Q', ipa: '/kw/', word: 'queen', meaning: '여왕' },
  { letter: 'R', ipa: '/r/', word: 'rabbit', meaning: '토끼' },
  { letter: 'S', ipa: '/s/', word: 'sun', meaning: '해' },
  { letter: 'T', ipa: '/t/', word: 'tiger', meaning: '호랑이' },
  { letter: 'U', ipa: '/ʌ/', word: 'umbrella', meaning: '우산' },
  { letter: 'V', ipa: '/v/', word: 'violin', meaning: '바이올린' },
  { letter: 'W', ipa: '/w/', word: 'water', meaning: '물' },
  { letter: 'X', ipa: '/ks/', word: 'box', meaning: '상자' },
  { letter: 'Y', ipa: '/j/', word: 'yellow', meaning: '노랑' },
  { letter: 'Z', ipa: '/z/', word: 'zebra', meaning: '얼룩말' },
];

export function PhonicsExplorer() {
  const [active, setActive] = useState<string | null>(null);
  const [voiceReady, setVoiceReady] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setVoiceReady(false);
      return;
    }
    const ready = () => setVoiceReady(true);
    if (window.speechSynthesis.getVoices().length > 0) {
      setVoiceReady(true);
    } else {
      window.speechSynthesis.addEventListener('voiceschanged', ready);
      return () => window.speechSynthesis.removeEventListener('voiceschanged', ready);
    }
  }, []);

  const speak = (text: string) => {
    if (!voiceReady) return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = 0.9;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  };

  const current = LETTERS.find((l) => l.letter === active);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-1">
          알파벳 & 파닉스
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          글자를 누르면 그 글자의 <strong>대표 소리</strong>와 그 소리로 시작하는 <strong>단어</strong>를 듣고 볼 수 있어요.
          {!voiceReady && ' (이 브라우저에서는 음성 재생이 지원되지 않을 수 있어요.)'}
        </p>
      </div>

      <div className="grid grid-cols-6 sm:grid-cols-9 md:grid-cols-13 gap-2">
        {LETTERS.map((l) => (
          <button
            key={l.letter}
            type="button"
            onClick={() => {
              setActive(l.letter);
              speak(l.letter);
            }}
            className={`min-h-[44px] aspect-square rounded-lg border-2 font-bold text-lg transition ${
              active === l.letter
                ? 'bg-purple-600 text-white border-purple-700 scale-105'
                : 'bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 hover:bg-purple-50 dark:hover:bg-purple-950/30'
            }`}
            aria-label={`알파벳 ${l.letter}`}
          >
            {l.letter}
          </button>
        ))}
      </div>

      {current && (
        <div className="rounded-xl bg-purple-50 dark:bg-purple-950/30 border-l-4 border-purple-500 p-4 space-y-2">
          <div className="flex items-baseline gap-3 flex-wrap">
            <span className="text-4xl font-bold text-purple-700 dark:text-purple-300">{current.letter}</span>
            <span className="font-mono text-purple-700 dark:text-purple-300">{current.ipa}</span>
          </div>
          <button
            type="button"
            onClick={() => speak(current.word)}
            disabled={!voiceReady}
            className="px-4 py-2 rounded-md border-2 border-purple-500 bg-white dark:bg-zinc-900 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-950/50 disabled:opacity-50 min-h-[44px]"
          >
            🔊 {current.word} <span className="text-xs text-zinc-500 ml-2">{current.meaning}</span>
          </button>
        </div>
      )}
    </div>
  );
}
