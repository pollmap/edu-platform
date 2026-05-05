'use client';

// H-EI 윤리와 사상 — 동서양 윤리 사상가 타임라인.
// 자체 정리(공공 인물·사상 요약). 중립적 서술.

import { useState } from 'react';

type Tradition = 'east' | 'west';

interface Thinker {
  id: string;
  name: string;
  era: string;
  year: number; // 대표 활동 연도 (음수=BC)
  tradition: Tradition;
  region: string;
  school: string;
  keyIdea: string;
  legacy: string;
}

const THINKERS: Thinker[] = [
  { id: 'confucius', name: '공자(孔子)', era: '춘추 시대', year: -500, tradition: 'east', region: '중국', school: '유가', keyIdea: '인(仁)과 예(禮)로 사람다움을 이루고 사회 질서를 회복.', legacy: '동아시아 2500년 도덕·정치·교육의 기초가 됨.' },
  { id: 'laotzu', name: '노자(老子)', era: '춘추 시대', year: -500, tradition: 'east', region: '중국', school: '도가', keyIdea: '무위자연(無爲自然) — 인위적 통제를 줄이고 자연의 흐름을 따른다.', legacy: '도가·도교 형성, 동양 자연관에 깊은 영향.' },
  { id: 'mozi', name: '묵자(墨子)', era: '전국 시대', year: -440, tradition: 'east', region: '중국', school: '묵가', keyIdea: '겸애(兼愛) — 차별 없는 사랑, 비공(非攻) — 침략 전쟁 반대.', legacy: '평등·평화 사상의 동양적 원형 중 하나.' },
  { id: 'mencius', name: '맹자(孟子)', era: '전국 시대', year: -350, tradition: 'east', region: '중국', school: '유가', keyIdea: '성선설(性善說) — 사람은 본래 선하며 사단(四端)이 마음에 있다.', legacy: '유교의 인간관·민본정치 사상의 근거.' },
  { id: 'xunzi', name: '순자(荀子)', era: '전국 시대', year: -280, tradition: 'east', region: '중국', school: '유가', keyIdea: '성악설(性惡說) — 사람의 본성은 다듬어야 하며 예(禮)·교육이 핵심.', legacy: '제도·교육 중시 흐름, 후대 법가에도 영향.' },
  { id: 'buddha', name: '석가모니(고타마 싯다르타)', era: '고대', year: -500, tradition: 'east', region: '인도', school: '불교', keyIdea: '사성제·팔정도 — 고통의 원인은 집착, 중도와 자비로 해탈.', legacy: '아시아 전역에 불교 전파, 한국 사상에도 깊이 침투.' },
  { id: 'wonhyo', name: '원효', era: '신라', year: 650, tradition: 'east', region: '한국', school: '불교(화쟁)', keyIdea: '화쟁사상 — 여러 종파의 다툼을 회통(會通)으로 풀어낸다.', legacy: '한국 불교의 통합적 성격과 대중 불교의 출발.' },
  { id: 'jujahak', name: '주희(朱熹)', era: '송', year: 1180, tradition: 'east', region: '중국', school: '성리학', keyIdea: '이기론(理氣論) — 만물에는 이(理)와 기(氣)가 함께 있다.', legacy: '조선 500년 사상의 기둥(주자학) — 이황·이이로 이어짐.' },
  { id: 'yi-hwang', name: '이황(퇴계)', era: '조선', year: 1560, tradition: 'east', region: '한국', school: '성리학(주리)', keyIdea: '이기호발설 — 사단은 이(理)가 발하고 칠정은 기(氣)가 발한다.', legacy: '영남학파 형성, 일본 성리학에도 영향.' },
  { id: 'yi-i', name: '이이(율곡)', era: '조선', year: 1580, tradition: 'east', region: '한국', school: '성리학(주기)', keyIdea: '기발이승일도설 — 발하는 것은 기, 이는 그 위에 탄다.', legacy: '기호학파, 사회 개혁(경장) 사상의 토대.' },
  { id: 'jeong-yak', name: '정약용(다산)', era: '조선 후기', year: 1800, tradition: 'east', region: '한국', school: '실학(경세치용)', keyIdea: '실용·민생을 중시. 목민심서·경세유표.', legacy: '근대적 행정·법 사고의 동양적 단초.' },

  { id: 'socrates', name: '소크라테스', era: '고대 그리스', year: -420, tradition: 'west', region: '그리스', school: '고전 철학', keyIdea: '"너 자신을 알라" — 무지를 자각하고 끊임없이 묻는 것이 덕의 출발.', legacy: '서양 철학의 시작점, 대화법·산파술.' },
  { id: 'plato', name: '플라톤', era: '고대 그리스', year: -380, tradition: 'west', region: '그리스', school: '이데아론', keyIdea: '진정한 선(善)의 이데아가 있고, 현실은 그 그림자.', legacy: '서양 형이상학·정치철학의 기초(국가론).' },
  { id: 'aristotle', name: '아리스토텔레스', era: '고대 그리스', year: -330, tradition: 'west', region: '그리스', school: '덕윤리', keyIdea: '중용(中庸) — 두 극단 사이의 중간이 덕. 좋은 습관이 좋은 성격을 만든다.', legacy: '덕윤리 전통의 시원, 중세 신학·근대 윤리에 영향.' },
  { id: 'epicurus', name: '에피쿠로스', era: '헬레니즘', year: -300, tradition: 'west', region: '그리스', school: '쾌락주의', keyIdea: '아타락시아 — 마음의 평정. 절제된 쾌락이 진정한 행복.', legacy: '근대 공리주의의 먼 뿌리.' },
  { id: 'aquinas', name: '토마스 아퀴나스', era: '중세', year: 1265, tradition: 'west', region: '이탈리아', school: '스콜라 철학', keyIdea: '자연법 — 신의 이성이 인간 이성에 반영되어 도덕의 근거가 된다.', legacy: '서양 자연법 전통, 인권 사상의 먼 토대.' },
  { id: 'kant', name: '임마누엘 칸트', era: '근대', year: 1785, tradition: 'west', region: '독일', school: '의무론', keyIdea: '정언명령 — "네 행위의 준칙이 보편 법칙이 되도록 행위하라."', legacy: '근대 의무론·인간 존엄·인권 담론의 핵심.' },
  { id: 'bentham', name: '제러미 벤담', era: '근대', year: 1789, tradition: 'west', region: '영국', school: '공리주의', keyIdea: '"최대 다수의 최대 행복" — 행위의 옳음은 산출되는 효용으로 평가.', legacy: 'J.S.밀로 이어지는 공리주의 전통, 정책 결정 모델에 광범위 영향.' },
  { id: 'mill', name: '존 스튜어트 밀', era: '근대', year: 1860, tradition: 'west', region: '영국', school: '공리주의', keyIdea: '쾌락에 질적 차이가 있다. 자유·개성·소수의 권리를 강조.', legacy: '근대 자유주의·민주주의 이론의 핵심 인물.' },
  { id: 'rawls', name: '존 롤스', era: '현대', year: 1971, tradition: 'west', region: '미국', school: '정의론', keyIdea: '무지의 베일·차등의 원칙 — 가장 불리한 사람의 처지를 개선해야 정의.', legacy: '현대 분배 정의·복지국가 논의의 표준.' },
];

const MIN_YEAR = -600;
const MAX_YEAR = 2000;

function pct(year: number) {
  return ((year - MIN_YEAR) / (MAX_YEAR - MIN_YEAR)) * 100;
}

function formatYear(year: number) {
  return year < 0 ? `BC ${Math.abs(year)}` : `${year}`;
}

export function EthicsThinkersTimeline() {
  const [selectedId, setSelectedId] = useState<string>('confucius');
  const [tradition, setTradition] = useState<'all' | Tradition>('all');

  const filtered = THINKERS.filter((t) => tradition === 'all' || t.tradition === tradition);
  const selected = THINKERS.find((t) => t.id === selectedId) ?? THINKERS[0];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 text-sm">
        {(['all', 'east', 'west'] as const).map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => setTradition(opt)}
            className={`min-h-11 rounded-full px-4 py-2 font-semibold transition ${
              tradition === opt
                ? 'bg-orange-600 text-white'
                : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700'
            }`}
          >
            {opt === 'all' ? '전체' : opt === 'east' ? '동양' : '서양'}
          </button>
        ))}
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <p className="mb-2 text-xs text-zinc-500 dark:text-zinc-400">시대 축 (BC 600 ~ AD 2000)</p>
        <div className="relative h-24 rounded-md bg-gradient-to-r from-amber-50 via-emerald-50 to-sky-50 dark:from-amber-950/40 dark:via-emerald-950/40 dark:to-sky-950/40">
          <div className="absolute inset-x-0 top-1/2 h-px bg-zinc-300 dark:bg-zinc-700" />
          {filtered.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setSelectedId(t.id)}
              className={`absolute -translate-x-1/2 rounded-full border-2 transition ${
                t.tradition === 'east'
                  ? 'border-amber-600 bg-amber-100 dark:bg-amber-900/60'
                  : 'border-sky-600 bg-sky-100 dark:bg-sky-900/60'
              } ${selectedId === t.id ? 'ring-4 ring-orange-400 dark:ring-orange-500' : 'opacity-80 hover:opacity-100'}`}
              style={{
                left: `${pct(t.year)}%`,
                top: t.tradition === 'east' ? '20%' : '60%',
                width: 14,
                height: 14,
              }}
              aria-label={`${t.name} (${formatYear(t.year)})`}
              title={`${t.name} ${formatYear(t.year)}`}
            />
          ))}
        </div>
        <div className="mt-2 flex justify-between text-xs text-zinc-500 dark:text-zinc-400">
          <span>BC 600</span>
          <span>0</span>
          <span>1000</span>
          <span>2000</span>
        </div>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-2 flex flex-wrap items-baseline gap-2">
          <h3 className="text-lg font-bold">{selected.name}</h3>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            {selected.era} · {selected.region} · {formatYear(selected.year)}
          </span>
        </div>
        <p className="mb-2 text-sm">
          <strong className="text-orange-600 dark:text-orange-400">학파</strong> {selected.school}
        </p>
        <p className="mb-2 text-sm">
          <strong className="text-orange-600 dark:text-orange-400">핵심 사상</strong> {selected.keyIdea}
        </p>
        <p className="text-sm text-zinc-700 dark:text-zinc-300">
          <strong className="text-zinc-900 dark:text-zinc-100">남긴 것</strong> {selected.legacy}
        </p>
      </div>

      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        ※ 사상가 평가는 학파·시대에 따라 달라요. 연도는 대표 활동 시점으로 단순화한 표시예요.
      </p>
    </div>
  );
}
