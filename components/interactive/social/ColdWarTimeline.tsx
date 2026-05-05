'use client';

// H-MW 역사로 탐구하는 현대 세계 — 냉전·세계화·테러 타임라인.
// 자체 정리. 객관적·중립적 서술.

import { useState } from 'react';

type Phase = 'cold-war' | 'globalization' | 'post-911';

interface Event {
  id: string;
  year: number;
  title: string;
  phase: Phase;
  region: string;
  summary: string;
  significance: string;
}

const EVENTS: Event[] = [
  { id: 'yalta', year: 1945, title: '얄타 회담 / 2차 대전 종전', phase: 'cold-war', region: '미·소·영', summary: '연합국이 전후 질서를 합의. 동유럽이 사실상 소련 영향권으로.', significance: '냉전의 출발점. 양극 체제의 골격.' },
  { id: 'un', year: 1945, title: '유엔(UN) 창설', phase: 'cold-war', region: '국제', summary: '국제 연맹의 한계 극복을 목표로 출범. 안보리 5상임이사국 거부권.', significance: '국제 협력의 새 틀, 그러나 거부권으로 강대국 정치도 지속.' },
  { id: 'korean-war', year: 1950, title: '한국 전쟁', phase: 'cold-war', region: '한반도', summary: '북한의 남침으로 발발, 1953 휴전. 미·중·소가 사실상 개입.', significance: '아시아 첫 「열전」. 한반도 분단 고착화.' },
  { id: 'cuban-missile', year: 1962, title: '쿠바 미사일 위기', phase: 'cold-war', region: '카리브해', summary: '소련의 쿠바 핵미사일 배치 시도 → 미국 해상 봉쇄 → 13일간 핵전쟁 직전.', significance: '냉전 중 가장 위험했던 순간. 핫라인·군축 협상의 계기.' },
  { id: 'vietnam', year: 1965, title: '베트남 전쟁 미국 본격 개입', phase: 'cold-war', region: '동남아', summary: '미국 지상군 대규모 파병. 1975 사이공 함락으로 종전.', significance: '냉전 대리전의 대표 사례. 미국 사회 분열의 원인.' },
  { id: 'détente', year: 1972, title: '데탕트 — 닉슨 방중·SALT-I', phase: 'cold-war', region: '미·중·소', summary: '미·중 화해, 미·소 전략무기제한협정.', significance: '양극에서 다극으로 가는 전환점.' },
  { id: 'oil-shock', year: 1973, title: '제1차 오일쇼크', phase: 'cold-war', region: '중동', summary: '4차 중동전쟁 → OPEC 감산 → 유가 4배 폭등.', significance: '서구 경제 모델의 전환(케인스주의 → 신자유주의 전환의 배경).' },
  { id: 'gorbachev', year: 1985, title: '고르바초프 등장 — 페레스트로이카', phase: 'cold-war', region: '소련', summary: '개혁(페레스트로이카)·개방(글라스노스트) 정책 선포.', significance: '냉전 종식의 결정적 동력.' },
  { id: 'berlin-wall', year: 1989, title: '베를린 장벽 붕괴', phase: 'cold-war', region: '유럽', summary: '동독 시민의 대규모 시위와 정치 변화로 장벽 개방.', significance: '동유럽 공산권 붕괴 도미노의 상징.' },
  { id: 'soviet-fall', year: 1991, title: '소련 해체', phase: 'cold-war', region: '러시아·CIS', summary: '15개 공화국으로 분리. 미국 단극 시대 시작.', significance: '냉전 공식 종료. 「역사의 종언」 논쟁.' },

  { id: 'wto', year: 1995, title: 'WTO 출범', phase: 'globalization', region: '국제', summary: 'GATT를 대체하는 세계무역기구 출범. 분쟁 해결 기능 강화.', significance: '제도적 세계화의 정점.' },
  { id: 'eu-euro', year: 1999, title: '유로화 도입', phase: 'globalization', region: '유럽', summary: '유럽 11개국 단일 통화 출범 (현재 20개국).', significance: '경제 통합의 가장 깊은 실험.' },
  { id: 'china-wto', year: 2001, title: '중국 WTO 가입', phase: 'globalization', region: '중국', summary: '세계 무역 체계에 본격 편입. 글로벌 공급망 재편.', significance: '21세기 가장 큰 경제 변화 중 하나.' },

  { id: '911', year: 2001, title: '9·11 테러', phase: 'post-911', region: '미국', summary: '뉴욕·워싱턴 동시 다발 테러. 약 3000명 사망.', significance: '21세기 안보·국제 정치의 분기점.' },
  { id: 'iraq', year: 2003, title: '이라크 전쟁', phase: 'post-911', region: '중동', summary: '미국 주도 다국적군 침공. 대량살상무기 명분은 사후 부정확으로 판명.', significance: '단극 체제·예방 전쟁 논리의 한계 노출.' },
  { id: 'gfc', year: 2008, title: '글로벌 금융위기', phase: 'post-911', region: '미국·세계', summary: '서브프라임 모기지 → 리먼 브러더스 파산 → 세계 동시 침체.', significance: '신자유주의·금융 세계화에 대한 광범위한 재검토.' },
  { id: 'arab-spring', year: 2011, title: '아랍의 봄', phase: 'post-911', region: '중동·북아프리카', summary: '튀니지에서 시작된 민주화 시위가 다국으로 확산.', significance: '결과는 지역마다 달라(민주화·내전·재권위주의).' },
  { id: 'brexit', year: 2016, title: '브렉시트 국민투표', phase: 'post-911', region: '영국', summary: 'EU 탈퇴 결정. 2020 공식 탈퇴.', significance: '세계화·통합에 대한 반작용을 보여준 상징적 사건.' },
  { id: 'covid', year: 2020, title: '코로나19 팬데믹', phase: 'post-911', region: '전 세계', summary: '세계 보건·경제·이동에 동시 충격. 1억+ 확진.', significance: '글로벌 공급망 재편·디지털 전환 가속.' },
  { id: 'ukraine', year: 2022, title: '러시아의 우크라이나 침공', phase: 'post-911', region: '유럽', summary: '냉전 후 유럽 최대 전쟁. 에너지·식량 공급망 충격.', significance: '국제 질서가 다시 강대국 경쟁 시대로 진입했음을 보여줌.' },
];

const PHASE_COLOR: Record<Phase, string> = {
  'cold-war': 'bg-blue-600',
  globalization: 'bg-emerald-600',
  'post-911': 'bg-rose-600',
};
const PHASE_LABEL: Record<Phase, string> = {
  'cold-war': '냉전',
  globalization: '세계화',
  'post-911': '21세기',
};

export function ColdWarTimeline() {
  const [phase, setPhase] = useState<'all' | Phase>('all');
  const [eventId, setEventId] = useState(EVENTS[0].id);

  const filtered = EVENTS.filter((e) => phase === 'all' || e.phase === phase);
  const event = EVENTS.find((e) => e.id === eventId) ?? EVENTS[0];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 text-sm">
        {(['all', 'cold-war', 'globalization', 'post-911'] as const).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPhase(p)}
            className={`min-h-11 rounded-full px-4 py-2 font-semibold transition ${
              phase === p
                ? 'bg-orange-600 text-white'
                : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700'
            }`}
          >
            {p === 'all' ? '전체' : PHASE_LABEL[p as Phase]}
          </button>
        ))}
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900">
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {filtered.map((e) => (
            <li key={e.id}>
              <button
                type="button"
                onClick={() => setEventId(e.id)}
                className={`flex w-full items-center gap-3 rounded-md border p-2 text-left text-sm transition ${
                  eventId === e.id
                    ? 'border-orange-400 bg-orange-50 dark:border-orange-600 dark:bg-orange-950/30'
                    : 'border-zinc-200 hover:border-zinc-300 dark:border-zinc-700 dark:hover:border-zinc-600'
                }`}
              >
                <span className={`h-3 w-3 shrink-0 rounded-full ${PHASE_COLOR[e.phase]}`} />
                <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">{e.year}</span>
                <span className="flex-1 font-medium">{e.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-2 flex flex-wrap items-baseline gap-2">
          <h3 className="text-lg font-bold">{event.title}</h3>
          <span className={`rounded-full px-2 py-0.5 text-xs font-semibold text-white ${PHASE_COLOR[event.phase]}`}>
            {PHASE_LABEL[event.phase]}
          </span>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            {event.year} · {event.region}
          </span>
        </div>
        <p className="mb-3 text-sm text-zinc-700 dark:text-zinc-300">{event.summary}</p>
        <div className="rounded-md bg-zinc-50 p-2 text-sm dark:bg-zinc-800/50">
          <strong className="text-orange-600 dark:text-orange-400">의의 </strong>
          {event.significance}
        </div>
      </div>
    </div>
  );
}
