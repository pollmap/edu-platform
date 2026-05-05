'use client';

// H-EH 동아시아 역사 기행 — 시대별 영토·교류 변화.
// 자체 정리. 영토 분쟁·국가 간 사안은 객관적 사실만.

import { useState } from 'react';

interface Era {
  id: string;
  range: string;
  centuryStart: number;
  korea: string;
  china: string;
  japan: string;
  exchange: string;
  highlight: string;
}

const ERAS: Era[] = [
  {
    id: 'ancient',
    range: 'BC 7세기 ~ AD 6세기',
    centuryStart: -700,
    korea: '고조선 → 삼국(고구려·백제·신라) 정립.',
    china: '춘추전국 → 진·한 통일 → 삼국·위진남북조의 분열.',
    japan: '야요이·고분 시대. 백제·신라로부터 불교·문자 전래.',
    exchange: '한자·불교·유교가 한반도를 거쳐 일본으로. 삼국이 동아시아 문명의 중요한 가교.',
    highlight: '광개토대왕·장수왕의 만주 진출 → 한반도 중심의 자립적 문화.',
  },
  {
    id: 'tang-shilla',
    range: '7~9세기',
    centuryStart: 600,
    korea: '신라 통일(676) → 발해 건국(698, 고구려 후예).',
    china: '당 제국의 전성기. 동아시아 최대 국제 도시 장안.',
    japan: '아스카·나라·헤이안. 견당사·견신라사 파견.',
    exchange: '율령 체제·불교 사찰·도성 모델이 동아시아 표준화. 한국 - 「동방예의지국」 평가의 시기.',
    highlight: '발해는 「해동성국」으로 불릴 만큼 번성, 그러나 한국사·중국사 양측에서 귀속 논쟁이 있다.',
  },
  {
    id: 'goryeo-song',
    range: '10~13세기',
    centuryStart: 900,
    korea: '고려 건국(918), 거란·여진과 외교·전쟁. 13세기 몽골 침입.',
    china: '송 → 금 → 원(몽골). 북방 민족의 부상.',
    japan: '헤이안 후기 → 가마쿠라 막부. 몽골의 두 차례 일본 원정 실패.',
    exchange: '고려청자·금속활자·인쇄술이 정점. 송·고려·일본 간 해상 무역.',
    highlight: '팔만대장경(1251) — 몽골 침입 시기 만든 세계기록유산.',
  },
  {
    id: 'joseon-ming',
    range: '14~16세기',
    centuryStart: 1300,
    korea: '조선(1392~) — 성리학 국가. 훈민정음(1443).',
    china: '명 — 동아시아 외교 질서(조공 책봉 체제)의 중심.',
    japan: '무로마치 → 전국시대 → 임진왜란(1592~1598).',
    exchange: '조공 책봉이라는 동아시아 외교 틀. 임진왜란으로 동북아 전체가 격동.',
    highlight: '이순신의 한산·명량 해전 — 동아시아 해상 전사(戰史)의 중요 사건.',
  },
  {
    id: 'joseon-qing',
    range: '17~19세기',
    centuryStart: 1600,
    korea: '병자호란(1636) → 조선 후기. 실학·서학·동학 등장.',
    china: '청(만주족) — 200년의 평화·확장기. 19세기 후반 쇠퇴.',
    japan: '에도 막부 — 쇄국하에서 상업·도시 발달. 1853 페리 내항.',
    exchange: '제한된 통신사 외교(조선·일본). 19세기 후반 서구 함선의 동시 압박.',
    highlight: '아편전쟁(1840) → 동아시아의 「개항」 시대 시작.',
  },
  {
    id: 'modern',
    range: '19세기 말 ~ 1945',
    centuryStart: 1860,
    korea: '강화도조약(1876) → 대한제국(1897) → 1910 한일합병 → 일제강점기.',
    china: '청 멸망(1912) → 신해혁명·중화민국 → 군벌·국공내전.',
    japan: '메이지 유신(1868) → 청일전쟁 승리(1895) → 제국주의 팽창 → 1945 패전.',
    exchange: '제국주의·식민지·전쟁의 시대. 동아시아 각국의 근대 국가 형성과 충돌이 동시 진행.',
    highlight: '식민·전쟁의 기억은 오늘날 동아시아 외교 갈등의 깊은 배경.',
  },
  {
    id: 'postwar',
    range: '1945~현재',
    centuryStart: 1945,
    korea: '광복 → 분단 → 한국전쟁 → 산업화·민주화 → IT 강국.',
    china: '중화인민공화국(1949) → 개혁개방(1978) → 세계 2위 경제권.',
    japan: '평화헌법 → 고도성장 → 잃어버린 30년 → 안보 정책 변화.',
    exchange: '냉전 → 데탕트 → 경제 통합. 그러나 영토·역사 인식·안보 갈등은 지속.',
    highlight: '한·중·일 삼각 경제 의존도가 매우 높은 동시에 정치적 긴장도 큰 「상호 의존+긴장」 구조.',
  },
];

export function EastAsianTerritoryTimeline() {
  const [eraId, setEraId] = useState(ERAS[0].id);
  const era = ERAS.find((e) => e.id === eraId) ?? ERAS[0];

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900">
        <p className="mb-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400">시대 선택</p>
        <div className="flex flex-wrap gap-2">
          {ERAS.map((e) => (
            <button
              key={e.id}
              type="button"
              onClick={() => setEraId(e.id)}
              className={`min-h-11 rounded-md px-3 py-2 text-sm font-medium transition ${
                eraId === e.id
                  ? 'bg-orange-600 text-white'
                  : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              {e.range}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="mb-3 text-lg font-bold">{era.range}</h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-md border border-orange-200 bg-orange-50 p-3 text-sm dark:border-orange-900 dark:bg-orange-950/30">
            <div className="mb-1 flex items-center gap-1 text-xs font-bold text-orange-700 dark:text-orange-300">
              <span>🇰🇷</span> 한국
            </div>
            <p>{era.korea}</p>
          </div>
          <div className="rounded-md border border-rose-200 bg-rose-50 p-3 text-sm dark:border-rose-900 dark:bg-rose-950/30">
            <div className="mb-1 flex items-center gap-1 text-xs font-bold text-rose-700 dark:text-rose-300">
              <span>🇨🇳</span> 중국
            </div>
            <p>{era.china}</p>
          </div>
          <div className="rounded-md border border-zinc-200 bg-zinc-50 p-3 text-sm dark:border-zinc-700 dark:bg-zinc-800/50">
            <div className="mb-1 flex items-center gap-1 text-xs font-bold text-zinc-700 dark:text-zinc-300">
              <span>🇯🇵</span> 일본
            </div>
            <p>{era.japan}</p>
          </div>
        </div>

        <div className="mt-3 rounded-md bg-zinc-50 p-3 text-sm dark:bg-zinc-800/50">
          <p className="mb-1 text-xs font-semibold text-zinc-500 dark:text-zinc-400">교류·관계</p>
          <p className="text-zinc-700 dark:text-zinc-300">{era.exchange}</p>
        </div>
        <div className="mt-2 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm dark:border-amber-900 dark:bg-amber-950/30">
          <strong className="text-amber-700 dark:text-amber-300">눈여겨볼 점 </strong>
          {era.highlight}
        </div>
      </div>

      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        ※ 동아시아 역사는 영토·이름·국경이 시대마다 달라요. 한 나라의 시각이 아닌 「관계」의 흐름으로 보면 더 잘 보여요.
      </p>
    </div>
  );
}
