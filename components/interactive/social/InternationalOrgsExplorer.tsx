'use client';

// H-IR 국제 관계의 이해 — 국제기구·국제법·분쟁 지도.
// 자체 정리. 정치 중립.

import { useState } from 'react';

type Category = 'general' | 'economic' | 'security' | 'specialized';

interface Org {
  id: string;
  name: string;
  abbr: string;
  founded: number;
  members: string;
  category: Category;
  hq: string;
  mission: string;
  korea: string;
  limit: string;
}

const ORGS: Org[] = [
  {
    id: 'un',
    name: '국제연합',
    abbr: 'UN',
    founded: 1945,
    members: '193개국',
    category: 'general',
    hq: '미국 뉴욕',
    mission: '평화·인권·개발·인도주의 협력. 안전보장이사회·총회·사무국·국제사법재판소(ICJ) 등으로 구성.',
    korea: '한국 1991년 가입. 2024-25 비상임이사국.',
    limit: '안보리 5상임이사국(미·중·러·영·프) 거부권으로 강대국 갈등 조정 한계.',
  },
  {
    id: 'wto',
    name: '세계무역기구',
    abbr: 'WTO',
    founded: 1995,
    members: '164개국',
    category: 'economic',
    hq: '스위스 제네바',
    mission: '자유무역 확대, 통상 분쟁 조정. GATT의 후신.',
    korea: '한국 창설 회원국. 통상 분쟁 다수 경험.',
    limit: '도하 라운드 정체, 분쟁해결기구(상소기구)는 사실상 마비 상태.',
  },
  {
    id: 'imf',
    name: '국제통화기금',
    abbr: 'IMF',
    founded: 1944,
    members: '190개국',
    category: 'economic',
    hq: '미국 워싱턴 DC',
    mission: '국제 통화·금융 안정. 외환위기국 구제금융.',
    korea: '한국 1997 IMF 외환위기 때 구제금융, 2001 조기 상환.',
    limit: '구제금융 조건의 가혹성 비판. 신흥국 의결권 비중이 경제 규모에 비해 낮다는 지적.',
  },
  {
    id: 'wb',
    name: '세계은행',
    abbr: 'WB',
    founded: 1944,
    members: '189개국',
    category: 'economic',
    hq: '미국 워싱턴 DC',
    mission: '개발도상국 빈곤 감소·인프라·교육·보건 차관 제공.',
    korea: '과거 차관 수원국 → 현재 출자국으로 전환.',
    limit: '대규모 인프라 사업의 환경·이주 영향 비판. 거버넌스 개혁 요구.',
  },
  {
    id: 'oecd',
    name: '경제협력개발기구',
    abbr: 'OECD',
    founded: 1961,
    members: '38개국',
    category: 'economic',
    hq: '프랑스 파리',
    mission: '선진 경제 정책 조정·통계·표준 개발.',
    korea: '한국 1996년 가입.',
    limit: '회원국이 주로 선진국에 한정.',
  },
  {
    id: 'g20',
    name: 'G20',
    abbr: 'G20',
    founded: 1999,
    members: '19국+EU+AU',
    category: 'economic',
    hq: '비상설(의장국 순환)',
    mission: '세계 경제 정책 조율 정상회의. 2008 금융위기 후 격상.',
    korea: '한국 2010년 서울 정상회의 개최.',
    limit: '구속력 부족, 구체적 합의 어려움.',
  },
  {
    id: 'nato',
    name: '북대서양조약기구',
    abbr: 'NATO',
    founded: 1949,
    members: '32개국',
    category: 'security',
    hq: '벨기에 브뤼셀',
    mission: '집단 방위 동맹. 회원국 한 곳에 대한 공격을 전체에 대한 공격으로 간주(5조).',
    korea: '한국은 회원국 아님. 2022년 글로벌 파트너로 정상회의 초청.',
    limit: '소속 국가의 안보 지출 부담, 전략 우선순위 차이.',
  },
  {
    id: 'who',
    name: '세계보건기구',
    abbr: 'WHO',
    founded: 1948,
    members: '194개국',
    category: 'specialized',
    hq: '스위스 제네바',
    mission: '국제 보건 표준·전염병 대응·예방접종.',
    korea: '한국 1949 가입. 2025-30 사무총장 후보 등.',
    limit: '예산 의존도(분담금·자발적 기부), 회원국 정치적 압력 노출.',
  },
  {
    id: 'icc',
    name: '국제형사재판소',
    abbr: 'ICC',
    founded: 2002,
    members: '125개국',
    category: 'specialized',
    hq: '네덜란드 헤이그',
    mission: '집단학살·전쟁범죄·반인도범죄·침략범죄 관련 개인 형사 책임.',
    korea: '한국 2003 가입.',
    limit: '미·중·러 등 미가입국, 집행 강제력 제한.',
  },
  {
    id: 'asean',
    name: '동남아국가연합',
    abbr: 'ASEAN',
    founded: 1967,
    members: '10개국',
    category: 'general',
    hq: '인도네시아 자카르타',
    mission: '동남아 지역 협력. 한·중·일과 ASEAN+3 등 연계 협의체 운영.',
    korea: 'ASEAN+한국 정상회의, 한·아세안 FTA(2007).',
    limit: '내정 불간섭 원칙, 합의제로 의사결정 속도 느림.',
  },
];

const CATEGORY_LABEL: Record<Category, string> = {
  general: '종합',
  economic: '경제',
  security: '안보',
  specialized: '전문',
};
const CATEGORY_COLOR: Record<Category, string> = {
  general: 'bg-blue-600',
  economic: 'bg-emerald-600',
  security: 'bg-rose-600',
  specialized: 'bg-amber-600',
};

export function InternationalOrgsExplorer() {
  const [filter, setFilter] = useState<'all' | Category>('all');
  const [orgId, setOrgId] = useState(ORGS[0].id);

  const filtered = ORGS.filter((o) => filter === 'all' || o.category === filter);
  const org = ORGS.find((o) => o.id === orgId) ?? ORGS[0];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 text-sm">
        {(['all', 'general', 'economic', 'security', 'specialized'] as const).map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setFilter(c)}
            className={`min-h-11 rounded-full px-4 py-2 font-semibold transition ${
              filter === c
                ? 'bg-orange-600 text-white'
                : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700'
            }`}
          >
            {c === 'all' ? '전체' : CATEGORY_LABEL[c as Category]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {filtered.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => setOrgId(o.id)}
            className={`min-h-11 rounded-md border p-3 text-left text-sm transition ${
              orgId === o.id
                ? 'border-orange-400 bg-orange-50 dark:border-orange-600 dark:bg-orange-950/30'
                : 'border-zinc-200 bg-white hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-600'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${CATEGORY_COLOR[o.category]}`} />
              <span className="font-bold">{o.abbr}</span>
            </div>
            <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">{o.name}</div>
          </button>
        ))}
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-2 flex flex-wrap items-baseline gap-2">
          <h3 className="text-lg font-bold">{org.name} ({org.abbr})</h3>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            창설 {org.founded} · 회원 {org.members} · 본부 {org.hq}
          </span>
        </div>
        <p className="mb-2 text-sm">
          <strong className="text-orange-600 dark:text-orange-400">목적·역할 </strong>
          {org.mission}
        </p>
        <p className="mb-2 text-sm">
          <strong className="text-orange-600 dark:text-orange-400">한국 관련 </strong>
          {org.korea}
        </p>
        <p className="text-sm text-zinc-700 dark:text-zinc-300">
          <strong className="text-zinc-900 dark:text-zinc-100">한계·쟁점 </strong>
          {org.limit}
        </p>
      </div>
    </div>
  );
}
