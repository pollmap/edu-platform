'use client';

// H-TG 여행지리 — 여행지 추천(지리·문화 결합).
// 자체 정리. 특정 여행 상품 광고 X.

import { useState } from 'react';

interface Destination {
  id: string;
  name: string;
  country: string;
  climate: 'tropical' | 'temperate' | 'continental' | 'highland' | 'cold';
  type: 'history' | 'nature' | 'city' | 'food' | 'adventure';
  bestSeason: string;
  highlights: string[];
  geographyNote: string;
}

const DESTS: Destination[] = [
  { id: 'jeju', name: '제주', country: '한국', climate: 'temperate', type: 'nature', bestSeason: '봄·가을', highlights: ['한라산 화산지형', '주상절리·용암동굴', '유네스코 자연유산'], geographyNote: '신생대 화산활동으로 형성된 한국 최대 섬. 현무암 지질.' },
  { id: 'gyeongju', name: '경주', country: '한국', climate: 'temperate', type: 'history', bestSeason: '봄·가을', highlights: ['신라 천 년 도읍', '석굴암·불국사', '고분군'], geographyNote: '경상분지 안 분지 도시. 형산강 유역.' },
  { id: 'kyoto', name: '교토', country: '일본', climate: 'temperate', type: 'history', bestSeason: '봄(벚꽃)·가을(단풍)', highlights: ['헤이안 천 년 수도', '청수사·금각사', '전통 정원'], geographyNote: '분지 지형으로 여름 무덥고 겨울 추움.' },
  { id: 'iceland', name: '아이슬란드', country: '아이슬란드', climate: 'cold', type: 'nature', bestSeason: '여름(백야)·겨울(오로라)', highlights: ['빙하·간헐천', '오로라', '활화산'], geographyNote: '북대서양 중앙해령 위 — 유라시아·북아메리카 판이 갈라지는 곳.' },
  { id: 'sahara', name: '사하라 사막', country: '북아프리카', climate: 'tropical', type: 'adventure', bestSeason: '겨울', highlights: ['세계 최대 사막', '베르베르 문화', '별 관측'], geographyNote: '아열대 고압대 영향으로 강수량 극히 적음. 사막화 진행 중.' },
  { id: 'andes', name: '안데스 (마추픽추)', country: '페루', climate: 'highland', type: 'history', bestSeason: '5~10월', highlights: ['잉카 제국 유적', '안데스 산악 풍경', '고산 식생'], geographyNote: '평균 고도 4000m. 고산병 주의. 판 충돌로 형성된 세계 최장 산맥.' },
  { id: 'amazon', name: '아마존', country: '브라질·페루', climate: 'tropical', type: 'nature', bestSeason: '건기 6~10월', highlights: ['세계 최대 열대우림', '생물 다양성', '강 생태계'], geographyNote: '적도 부근 연중 고온다습. 「지구의 허파」.' },
  { id: 'paris', name: '파리', country: '프랑스', climate: 'temperate', type: 'city', bestSeason: '봄·여름', highlights: ['루브르·오르세 박물관', '근대 도시 계획', '미식'], geographyNote: '센 강 유역. 서안해양성 기후로 연중 온화.' },
  { id: 'venice', name: '베네치아', country: '이탈리아', climate: 'temperate', type: 'history', bestSeason: '봄·가을', highlights: ['수상 도시', '르네상스 미술', '곤돌라'], geographyNote: '석호 위 인공섬 도시. 해수면 상승·지반 침하로 위협받는 도시.' },
  { id: 'patagonia', name: '파타고니아', country: '아르헨티나·칠레', climate: 'cold', type: 'adventure', bestSeason: '11~3월(남반구 여름)', highlights: ['빙하·피오르드', '국립공원 트레킹', '야생동물'], geographyNote: '남위 40도 이남. 강한 편서풍·빙하 지형.' },
];

const CLIMATE_LABEL: Record<Destination['climate'], string> = {
  tropical: '열대', temperate: '온대', continental: '대륙성', highland: '고산', cold: '한대',
};
const TYPE_LABEL: Record<Destination['type'], string> = {
  history: '역사·문화', nature: '자연', city: '도시·미식', food: '미식', adventure: '모험',
};

export function TravelGeographyMatcher() {
  const [climate, setClimate] = useState<'all' | Destination['climate']>('all');
  const [type, setType] = useState<'all' | Destination['type']>('all');
  const [destId, setDestId] = useState(DESTS[0].id);

  const filtered = DESTS.filter(
    (d) => (climate === 'all' || d.climate === climate) && (type === 'all' || d.type === type)
  );
  const dest = DESTS.find((d) => d.id === destId) ?? DESTS[0];

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900/40">
        <p className="mb-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400">기후</p>
        <div className="mb-3 flex flex-wrap gap-2">
          {(['all', 'tropical', 'temperate', 'continental', 'highland', 'cold'] as const).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setClimate(c)}
              className={`min-h-11 rounded-full px-3 py-1 text-xs font-semibold transition ${
                climate === c
                  ? 'bg-orange-600 text-white'
                  : 'bg-white text-zinc-700 hover:bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              {c === 'all' ? '전체' : CLIMATE_LABEL[c as Destination['climate']]}
            </button>
          ))}
        </div>
        <p className="mb-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400">테마</p>
        <div className="flex flex-wrap gap-2">
          {(['all', 'history', 'nature', 'city', 'food', 'adventure'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className={`min-h-11 rounded-full px-3 py-1 text-xs font-semibold transition ${
                type === t
                  ? 'bg-orange-600 text-white'
                  : 'bg-white text-zinc-700 hover:bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              {t === 'all' ? '전체' : TYPE_LABEL[t as Destination['type']]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {filtered.map((d) => (
          <button
            key={d.id}
            type="button"
            onClick={() => setDestId(d.id)}
            className={`min-h-11 rounded-md border p-3 text-left text-sm transition ${
              destId === d.id
                ? 'border-orange-400 bg-orange-50 dark:border-orange-600 dark:bg-orange-950/30'
                : 'border-zinc-200 bg-white hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-600'
            }`}
          >
            <div className="font-bold">{d.name}</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">{d.country}</div>
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full text-sm text-zinc-500 dark:text-zinc-400">조건에 맞는 여행지가 없어요.</p>
        )}
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="mb-1 text-lg font-bold">{dest.name}, {dest.country}</h3>
        <p className="mb-2 text-xs text-zinc-500 dark:text-zinc-400">
          기후 {CLIMATE_LABEL[dest.climate]} · 테마 {TYPE_LABEL[dest.type]} · 추천 시기 {dest.bestSeason}
        </p>
        <ul className="mb-3 list-disc space-y-1 pl-5 text-sm">
          {dest.highlights.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
        <div className="rounded-md bg-orange-50 p-3 text-sm dark:bg-orange-950/30">
          <strong className="text-orange-700 dark:text-orange-300">지리 메모 </strong>
          {dest.geographyNote}
        </div>
      </div>
    </div>
  );
}
