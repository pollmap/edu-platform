'use client';

// H-KH2-03 통일과 평화 — 분단·남북관계 타임라인.
// 정치 중립. 학계 일반 합의 수준에서 사실만.

import { useState } from 'react';

type Tone = 'tension' | 'dialogue' | 'crisis';

interface Event {
  id: string;
  year: number;
  title: string;
  tone: Tone;
  summary: string;
  significance: string;
}

const EVENTS: Event[] = [
  { id: 'division', year: 1945, title: '38선 분할 점령', tone: 'tension', summary: '광복 직후 미·소가 한반도를 38도선 기준 분할 점령.', significance: '분단의 출발점.' },
  { id: 'rok-dprk', year: 1948, title: '대한민국·조선민주주의인민공화국 정부 수립', tone: 'tension', summary: '8월 15일 대한민국, 9월 9일 북측 정부 수립.', significance: '두 체제의 공식 분단 고착.' },
  { id: 'korean-war', year: 1950, title: '한국 전쟁 발발', tone: 'crisis', summary: '6월 25일 북한 남침. 1953년 정전 협정.', significance: '약 200만 명 이상의 인명 피해. 분단의 영구화.' },
  { id: '74-statement', year: 1972, title: '7·4 남북 공동성명', tone: 'dialogue', summary: '평화·자주·민족대단결 3원칙 합의. 처음으로 양측 합의 문건 발표.', significance: '대화 채널의 시작.' },
  { id: 'red-cross', year: 1985, title: '이산가족 첫 상봉', tone: 'dialogue', summary: '서울·평양에서 이산가족 고향 방문 첫 실시.', significance: '인도주의 교류의 첫 사례.' },
  { id: 'agreement', year: 1991, title: '남북 기본합의서', tone: 'dialogue', summary: '서로 「특수 관계」로 인정. 화해·불가침·교류협력 약속.', significance: '관계 정상화의 제도적 첫 틀.' },
  { id: 'un-join', year: 1991, title: '남·북 유엔 동시 가입', tone: 'dialogue', summary: 'UN 회원국으로 동시 가입.', significance: '국제사회에서 두 체제의 병존 인정.' },
  { id: 'sunshine', year: 2000, title: '제1차 남북정상회담', tone: 'dialogue', summary: '김대중·김정일 평양 정상회담. 6·15 공동선언.', significance: '햇볕정책의 정점. 개성공단·금강산 관광 출발.' },
  { id: 'kaesong', year: 2004, title: '개성공단 가동', tone: 'dialogue', summary: '남측 자본·기술 + 북측 노동력 결합 산업단지.', significance: '경제 협력의 가장 큰 실험. 2016 가동 중단.' },
  { id: 'nuclear', year: 2006, title: '북한 1차 핵실험', tone: 'crisis', summary: '북한이 처음으로 지하 핵실험 실시.', significance: '한반도 비핵화 문제의 본격화.' },
  { id: 'cheonan', year: 2010, title: '천안함·연평도 사건', tone: 'crisis', summary: '천안함 침몰(3월)·연평도 포격(11월).', significance: '군사적 긴장 고조. 5·24 조치로 교류 중단.' },
  { id: '2018-summit', year: 2018, title: '2018 정상회담들', tone: 'dialogue', summary: '판문점·평양 남북정상회담. 싱가포르·하노이 북·미 정상회담.', significance: '대화 무드 일시 형성.' },
  { id: 'recent', year: 2023, title: '대화 단절·긴장 지속', tone: 'tension', summary: '북한의 미사일 시험 빈도 증가, 대화 채널 단절.', significance: '관계 회복의 새 모색이 필요한 시점.' },
];

const TONE_COLOR: Record<Tone, string> = {
  tension: 'bg-zinc-500',
  dialogue: 'bg-emerald-600',
  crisis: 'bg-rose-600',
};
const TONE_LABEL: Record<Tone, string> = {
  tension: '긴장',
  dialogue: '대화',
  crisis: '위기',
};

export function InterKoreanTimeline() {
  const [eventId, setEventId] = useState(EVENTS[0].id);
  const event = EVENTS.find((e) => e.id === eventId) ?? EVENTS[0];

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900">
        <p className="mb-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400">남북관계 타임라인 (1945~)</p>
        <ul className="space-y-1">
          {EVENTS.map((e) => (
            <li key={e.id}>
              <button
                type="button"
                onClick={() => setEventId(e.id)}
                className={`flex w-full items-center gap-3 rounded-md p-2 text-left text-sm transition ${
                  eventId === e.id
                    ? 'bg-orange-100 dark:bg-orange-950/40'
                    : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                <span className={`h-3 w-3 shrink-0 rounded-full ${TONE_COLOR[e.tone]}`} />
                <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">{e.year}</span>
                <span className="flex-1 font-medium">{e.title}</span>
                <span className={`hidden rounded-full px-2 py-0.5 text-xs font-semibold text-white sm:inline ${TONE_COLOR[e.tone]}`}>
                  {TONE_LABEL[e.tone]}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-2 flex flex-wrap items-baseline gap-2">
          <h3 className="text-lg font-bold">{event.title}</h3>
          <span className={`rounded-full px-2 py-0.5 text-xs font-semibold text-white ${TONE_COLOR[event.tone]}`}>
            {TONE_LABEL[event.tone]}
          </span>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">{event.year}</span>
        </div>
        <p className="mb-3 text-sm text-zinc-700 dark:text-zinc-300">{event.summary}</p>
        <div className="rounded-md bg-zinc-50 p-2 text-sm dark:bg-zinc-800/50">
          <strong className="text-orange-600 dark:text-orange-400">의의 </strong>
          {event.significance}
        </div>
      </div>

      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        ※ 통일·평화에 대한 구체적 방법은 사회적 논쟁 영역이에요. 이 자료는 정책 제안이 아니라 기록을 정리한 거예요.
      </p>
    </div>
  );
}
