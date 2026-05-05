'use client';

// K-LF 문학과 영상 — 같은 이야기를 매체별로 옮길 때 무엇이 달라지는가.
// 저작권 안전: 실제 작품 본문/대사 인용 X, 일반 구조만 비교.

import { useState } from 'react';

interface Format {
  id: string;
  label: string;
  medium: string;
  strengths: string[];
  weaknesses: string[];
  cue: string;
  workflow: string;
}

const FORMATS: Format[] = [
  {
    id: 'novel',
    label: '소설',
    medium: '글',
    strengths: ['내면 심리 묘사 자유', '시간 압축·확장 쉬움', '독자 상상 여지 큼'],
    weaknesses: ['시각·청각 정보는 묘사로만 전달', '읽는 데 시간 필요'],
    cue: '서술자 시점·문장 길이·비유 표현',
    workflow: '인물·사건·배경을 문장으로 설계 → 장 단위로 호흡 조절',
  },
  {
    id: 'film',
    label: '영화',
    medium: '영상+음향',
    strengths: ['장면을 한눈에 보여줌', '음악·미장센으로 분위기 즉시 전달', '편집으로 강한 정서 가능'],
    weaknesses: ['상영 시간 제약(보통 2시간)', '내면 묘사는 표정·대사·연출에 의존'],
    cue: '쇼트·앵글·컷·BGM·조명',
    workflow: '시나리오 → 콘티 → 촬영·편집 → 음향 후반 작업',
  },
  {
    id: 'drama',
    label: '드라마',
    medium: '영상+회차',
    strengths: ['긴 호흡으로 인물 변화 추적', '시청자 반응에 따라 후반 조정 가능'],
    weaknesses: ['예산·일정 압박', '회차마다 클리프행어 필요'],
    cue: '회차 마무리·OST·반복 모티프',
    workflow: '대본 회차별 분리 → 사전·생방 촬영 → 주간 단위 송출',
  },
  {
    id: 'webtoon',
    label: '웹툰',
    medium: '그림+세로 스크롤',
    strengths: ['컷 사이 여백으로 호흡 조절', '말풍선과 효과음 글자로 강약', '스마트폰 친화적'],
    weaknesses: ['움직임은 정지 컷의 연결로만 표현', '주 1회 분량 압박'],
    cue: '컷 크기·스크롤 페이스·효과음 글자',
    workflow: '시놉 → 콘티 → 선화·채색 → 컷 분배·식자',
  },
];

const CHANGES = [
  { from: '내면 독백', to: '표정·미장센·내레이션', who: '소설 → 영화/드라마' },
  { from: '긴 묘사 한 단락', to: '몇 초의 카메라 워크', who: '소설 → 영화' },
  { from: '연속된 장면', to: '컷 단위 정지 화면', who: '영화 → 웹툰' },
  { from: '한 권 결말', to: '회차별 절단·다음화 후크', who: '소설 → 드라마/웹툰' },
];

export function AdaptationFormatExplorer() {
  const [active, setActive] = useState('novel');
  const cur = FORMATS.find((f) => f.id === active)!;

  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-600 dark:text-zinc-300">
        같은 이야기라도 <strong>매체</strong>가 바뀌면 표현 방식이 달라져요. 4가지 형식의 강점·약점·작업 흐름을 비교해 보세요.
      </p>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {FORMATS.map((f) => (
          <button
            key={f.id}
            onClick={() => setActive(f.id)}
            className={`min-h-[44px] rounded-lg border px-3 py-2 text-sm font-medium transition ${
              active === f.id
                ? 'border-red-500 bg-red-50 text-red-900 dark:border-red-400 dark:bg-red-900/30 dark:text-red-100'
                : 'border-zinc-300 bg-white text-zinc-700 hover:border-red-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-2 flex items-baseline gap-2">
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">{cur.label}</h3>
          <span className="text-xs text-zinc-500">매체: {cur.medium}</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <p className="mb-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">강점</p>
            <ul className="space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
              {cur.strengths.map((s) => (
                <li key={s}>+ {s}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-1 text-xs font-semibold text-amber-700 dark:text-amber-300">약점·제약</p>
            <ul className="space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
              {cur.weaknesses.map((w) => (
                <li key={w}>- {w}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-3 rounded-lg bg-zinc-50 p-3 text-sm text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
          <p>
            <strong>주요 표현 단서</strong> — {cur.cue}
          </p>
          <p className="mt-1">
            <strong>작업 흐름</strong> — {cur.workflow}
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
        <p className="mb-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          매체 이동 시 자주 일어나는 변환
        </p>
        <ul className="space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
          {CHANGES.map((c) => (
            <li key={c.from}>
              <span className="text-xs text-zinc-500">[{c.who}]</span>{' '}
              <strong>{c.from}</strong> → {c.to}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
