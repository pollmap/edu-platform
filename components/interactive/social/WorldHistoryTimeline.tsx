'use client';

// H-WH 세계사 — 세계사 타임라인 (한국사 동기화).
// 자체 정리. 객관적 사실 위주, 정치 중립.

import { useState } from 'react';

interface Event {
  id: string;
  year: number;
  title: string;
  region: string;
  korea: string;
  summary: string;
}

const EVENTS: Event[] = [
  { id: 'first-civ', year: -3500, title: '4대 문명 발생', region: '메소포타미아·이집트·인더스·황하', korea: '신석기 → 청동기 진입', summary: '큰 강 유역에서 농경·도시·문자가 시작.' },
  { id: 'gojoseon', year: -2333, title: '고조선 건국 (전통)', region: '한반도', korea: '청동기 사회', summary: '단군신화에 따른 한국사 첫 국가의 전통 연대.' },
  { id: 'greek-classical', year: -500, title: '그리스 고전기', region: '지중해', korea: '철기 도입, 부족 사회', summary: '아테네 민주정·페르시아 전쟁·소크라테스.' },
  { id: 'qin-han', year: -221, title: '진(秦) 통일', region: '중국', korea: '고조선 후기', summary: '진시황의 중국 통일. 만리장성·표준화.' },
  { id: 'rome-empire', year: 27, title: '로마 제국 성립', region: '지중해', korea: '삼국 정립 단계', summary: '아우구스투스 즉위 → 5세기 서로마 멸망.' },
  { id: 'three-kingdoms', year: 372, title: '삼국 시대 본격화', region: '한반도', korea: '고구려 불교 수용', summary: '고구려·백제·신라가 한반도를 분점.' },
  { id: 'tang', year: 618, title: '당 제국 건국', region: '중국', korea: '신라 통일(676) 직전', summary: '동아시아 최대 국제 도시 장안. 동·서 문명 교류 정점.' },
  { id: 'shilla-unified', year: 676, title: '신라 통일', region: '한반도', korea: '발해 건국(698)', summary: '한국사 첫 영토 통일. 당과의 외교·문화 교류.' },
  { id: 'islam', year: 622, title: '이슬람 발흥', region: '아라비아', korea: '삼국 후기', summary: '무함마드의 메디나 이주(헤지라) → 이슬람 제국 확장.' },
  { id: 'goryeo', year: 918, title: '고려 건국', region: '한반도', korea: '광종 노비안검법(956)', summary: '왕건의 고려 건국. 거란·여진과 외교·전쟁.' },
  { id: 'crusades', year: 1095, title: '십자군 원정', region: '유럽·중동', korea: '고려 중기', summary: '11~13세기 약 200년 간 8차에 걸친 원정.' },
  { id: 'mongol', year: 1206, title: '몽골 제국', region: '유라시아', korea: '고려 무신정권', summary: '칭기즈 칸 즉위. 역사상 최대 육상 제국.' },
  { id: 'joseon', year: 1392, title: '조선 건국', region: '한반도', korea: '훈민정음(1443)', summary: '이성계의 조선 건국. 성리학 국가.' },
  { id: 'columbus', year: 1492, title: '콜럼버스 항해', region: '대서양', korea: '조선 성종', summary: '신대륙 도달 → 대항해 시대 본격화.' },
  { id: 'reformation', year: 1517, title: '종교 개혁', region: '유럽', korea: '조선 중종', summary: '루터의 95개조. 가톨릭·개신교 분리.' },
  { id: 'imjin', year: 1592, title: '임진왜란', region: '한반도', korea: '조선·명·일본 동시 격동', summary: '7년 전쟁. 동아시아 전체 질서 흔들림.' },
  { id: 'glorious', year: 1688, title: '명예혁명', region: '영국', korea: '조선 숙종', summary: '의회 우위 확립. 권리장전(1689).' },
  { id: 'us-indep', year: 1776, title: '미국 독립선언', region: '북미', korea: '조선 정조', summary: '계몽사상 → 근대 공화국의 출발.' },
  { id: 'fr-rev', year: 1789, title: '프랑스 혁명', region: '프랑스', korea: '조선 정조', summary: '인권 선언. 근대 민주주의의 결정적 사건.' },
  { id: 'opium', year: 1840, title: '아편전쟁', region: '중국', korea: '조선 헌종', summary: '동아시아 「개항」 시대 시작.' },
  { id: 'meiji', year: 1868, title: '메이지 유신', region: '일본', korea: '흥선대원군 집권', summary: '일본 근대화의 본격 출발.' },
  { id: 'kanghwa', year: 1876, title: '강화도조약', region: '한반도', korea: '조선 개항', summary: '조선의 첫 근대 조약. 불평등 조약.' },
  { id: 'ww1', year: 1914, title: '제1차 세계대전', region: '유럽·세계', korea: '일제강점기 초', summary: '4년간의 대전. 제국주의·민족주의 충돌.' },
  { id: '3-1', year: 1919, title: '3·1 운동', region: '한반도', korea: '독립운동', summary: '비폭력 만세 운동. 임시정부 수립의 계기.' },
  { id: 'ww2', year: 1939, title: '제2차 세계대전', region: '세계', korea: '강점기 후반', summary: '6년간 5천만 명 이상 사망. 1945 종전.' },
  { id: 'liberation', year: 1945, title: '광복·분단', region: '한반도', korea: '38선 분할', summary: '광복과 동시에 한반도 분할 점령.' },
  { id: 'cold-war', year: 1947, title: '냉전 본격화', region: '미·소', korea: '남북 정부 수립(1948)', summary: '트루먼 독트린 → 양극 체제.' },
  { id: 'korean-war', year: 1950, title: '한국 전쟁', region: '한반도', korea: '냉전 첫 열전', summary: '1953 정전 협정. 분단의 영구화.' },
  { id: 'wall-fall', year: 1989, title: '베를린 장벽 붕괴', region: '유럽', korea: '한국 민주화 직후', summary: '냉전 종식의 상징. 1991 소련 해체.' },
  { id: 'wto-globalization', year: 1995, title: 'WTO 출범', region: '국제', korea: 'OECD 가입(1996)', summary: '세계 무역 체계의 제도화.' },
  { id: '911', year: 2001, title: '9·11 테러', region: '미국', korea: '한·일 월드컵 직전', summary: '21세기 안보의 분기점.' },
  { id: 'gfc', year: 2008, title: '글로벌 금융위기', region: '세계', korea: '동시 충격', summary: '서브프라임 → 세계 동시 침체.' },
  { id: 'covid', year: 2020, title: '코로나19 팬데믹', region: '세계', korea: '국가별 대응 차이', summary: '디지털 전환 가속.' },
];

const MIN_YEAR = -3600;
const MAX_YEAR = 2050;

export function WorldHistoryTimeline() {
  const [eventId, setEventId] = useState(EVENTS[0].id);
  const event = EVENTS.find((e) => e.id === eventId) ?? EVENTS[0];

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900">
        <p className="mb-2 text-xs text-zinc-500 dark:text-zinc-400">사건 선택 (BC 3500 ~ 현재)</p>
        <div className="max-h-64 space-y-1 overflow-y-auto pr-1">
          {EVENTS.map((e) => (
            <button
              key={e.id}
              type="button"
              onClick={() => setEventId(e.id)}
              className={`flex w-full items-center gap-3 rounded-md p-2 text-left text-sm transition ${
                eventId === e.id
                  ? 'bg-orange-100 dark:bg-orange-950/40'
                  : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400 sm:w-16">
                {e.year < 0 ? `BC ${Math.abs(e.year)}` : e.year}
              </span>
              <span className="flex-1 font-medium">{e.title}</span>
              <span className="hidden text-xs text-zinc-500 dark:text-zinc-400 sm:inline">{e.region}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-2 flex flex-wrap items-baseline gap-2">
          <h3 className="text-lg font-bold">{event.title}</h3>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            {event.year < 0 ? `BC ${Math.abs(event.year)}` : event.year} · {event.region}
          </span>
        </div>
        <p className="mb-3 text-sm text-zinc-700 dark:text-zinc-300">{event.summary}</p>
        <div className="rounded-md bg-orange-50 p-3 text-sm dark:bg-orange-950/30">
          <strong className="text-orange-700 dark:text-orange-300">한국사 동기 </strong>
          {event.korea}
        </div>
      </div>

      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        ※ 「세계사」와 「한국사」는 따로 흐르지 않아요. 같은 시대의 한반도가 무엇을 하고 있었는지를 함께 보면 흐름이 살아나요.
      </p>
    </div>
  );
}
