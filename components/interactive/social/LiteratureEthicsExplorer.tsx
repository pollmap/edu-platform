'use client';

// H-HE 인문학과 윤리 — 문학·예술 작품 속 윤리적 주제 탐구.
// 본문 인용 X. 줄거리·주제·쟁점만 자체 정리.

import { useState } from 'react';

interface Work {
  id: string;
  title: string;
  author: string;
  era: string;
  genre: string;
  theme: string;
  ethicalIssues: string[];
  perspective: string;
}

const WORKS: Work[] = [
  {
    id: 'antigone',
    title: '안티고네',
    author: '소포클레스',
    era: '고대 그리스 (BC 5세기)',
    genre: '비극',
    theme: '국가의 법 vs 가족·신의 의무',
    ethicalIssues: [
      '실정법(왕의 명령)과 자연법(인륜) 중 무엇이 우선인가?',
      '시민 불복종은 언제 정당화되는가?',
      '권력자의 자존심이 정의를 가릴 때.',
    ],
    perspective: '의무론·자연법 전통의 시작점. 「양심에 따른 거부」 논의의 고전.',
  },
  {
    id: 'crime-punishment',
    title: '죄와 벌',
    author: '도스토옙스키',
    era: '19세기 러시아',
    genre: '장편소설',
    theme: '한 생명을 희생해 다수를 구할 수 있는가?',
    ethicalIssues: [
      '"비범인 이론" — 일부 인간에게 도덕을 넘어설 권리가 있다는 생각의 위험.',
      '죄책감·양심은 외부 처벌과 어떻게 다른가.',
      '구원·회개가 형벌의 본질이 될 수 있는가.',
    ],
    perspective: '공리주의의 한계와 의무론·종교 윤리 사이의 긴장을 그림.',
  },
  {
    id: 'mokmin',
    title: '목민심서',
    author: '정약용',
    era: '조선 후기 (1818)',
    genre: '실학 저술',
    theme: '관료가 백성을 위해 어떻게 행정해야 하는가',
    ethicalIssues: [
      '권한 남용·부정부패의 구체적 사례와 처방.',
      '약자 보호·재난 행정의 실제 절차.',
      '청렴과 실용성의 균형.',
    ],
    perspective: '동양적 행정 윤리·민본주의의 대표 텍스트.',
  },
  {
    id: 'mother-hyon',
    title: '운수 좋은 날',
    author: '현진건',
    era: '1924 (일제 강점기)',
    genre: '단편소설',
    theme: '가난·사회 구조 속 개인의 비극',
    ethicalIssues: [
      '개인의 노력만으로 극복할 수 없는 구조적 빈곤.',
      '식민지 사회에서 「운」과 「운명」의 의미.',
      '연민(compassion)은 윤리에서 어떤 자리에 있는가.',
    ],
    perspective: '근대 한국 사실주의 — 사회 구조에 대한 윤리적 시선.',
  },
  {
    id: 'samdae',
    title: '삼대',
    author: '염상섭',
    era: '1931',
    genre: '장편소설',
    theme: '세대 갈등과 사회 변화',
    ethicalIssues: [
      '전통적 가치(효·가문)와 근대적 자아 의식의 충돌.',
      '돈·권력 앞에서 무너지는 윤리.',
      '시대 변화 속에서 「올바름」을 어떻게 새로 정의하는가.',
    ],
    perspective: '식민지 근대화 시기 한국 사회의 윤리적 풍경 기록.',
  },
  {
    id: 'just-mercy',
    title: '레미제라블',
    author: '빅토르 위고',
    era: '19세기 프랑스',
    genre: '장편소설',
    theme: '법의 정의와 인간적 자비의 갈등',
    ethicalIssues: [
      '한 번의 죄로 평생 낙인을 찍는 사회는 정당한가.',
      '용서·자비가 정의의 일부일 수 있는가.',
      '빈곤·계급은 도덕적 책임에 어떤 영향을 주는가.',
    ],
    perspective: '회복적 정의(restorative justice) 개념의 문학적 원형.',
  },
];

export function LiteratureEthicsExplorer() {
  const [workId, setWorkId] = useState(WORKS[0].id);
  const work = WORKS.find((w) => w.id === workId) ?? WORKS[0];

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900/40">
        <p className="mb-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400">작품 선택</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {WORKS.map((w) => (
            <button
              key={w.id}
              type="button"
              onClick={() => setWorkId(w.id)}
              className={`min-h-11 rounded-md px-3 py-2 text-left text-sm transition ${
                workId === w.id
                  ? 'bg-orange-600 text-white'
                  : 'bg-white text-zinc-700 hover:bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              <div className="font-semibold">{w.title}</div>
              <div className={`text-xs ${workId === w.id ? 'text-orange-100' : 'text-zinc-500 dark:text-zinc-400'}`}>
                {w.author}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-3 flex flex-wrap items-baseline gap-2">
          <h3 className="text-lg font-bold">{work.title}</h3>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            {work.author} · {work.era} · {work.genre}
          </span>
        </div>
        <div className="mb-3 rounded-md bg-orange-50 p-3 text-sm dark:bg-orange-950/30">
          <p className="mb-1 text-xs font-semibold text-orange-700 dark:text-orange-300">주제</p>
          <p>{work.theme}</p>
        </div>
        <div className="mb-3">
          <p className="mb-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400">윤리적 쟁점</p>
          <ul className="list-disc space-y-1 pl-5 text-sm text-zinc-700 dark:text-zinc-300">
            {work.ethicalIssues.map((issue, i) => (
              <li key={i}>{issue}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-md border border-zinc-200 p-3 text-sm dark:border-zinc-700">
          <p className="mb-1 text-xs font-semibold text-zinc-500 dark:text-zinc-400">윤리학적 관점</p>
          <p className="text-zinc-700 dark:text-zinc-300">{work.perspective}</p>
        </div>
      </div>

      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        ※ 작품 본문은 인용하지 않았어요. 줄거리·주제만 자체 요약했어요. 원작의 미묘한 결은 직접 읽어야 살아나요.
      </p>
    </div>
  );
}
