'use client';

// E-WC 세계 문화 영어 — 영어권·비영어권 문화의 의사소통 차이.

import { useState } from 'react';

interface Region {
  id: string;
  label: string;
  greeting: string;
  meeting: string;
  silence: string;
  formality: string;
  taboo: string;
  takeaway: string;
}

const REGIONS: Region[] = [
  {
    id: 'us',
    label: '미국·캐나다',
    greeting: '"How are you?" 는 인사말, 진짜 답변 기대 X. "Good, thanks. You?" 가 표준',
    meeting: '회의에서 자기 의견 적극 발언. 침묵 = 동의 X 오히려 "참여 안 함"',
    silence: '3초 이상 침묵 어색. 대화 공백 채우는 small talk 발달',
    formality: '직장에서도 first name 호칭 일반. Mr./Ms.는 매우 격식',
    taboo: '연봉·정치·종교는 처음 만난 사이 금기',
    takeaway: '명확하게, 적극적으로, 짧고 구체적으로',
  },
  {
    id: 'uk',
    label: '영국',
    greeting: '"How do you do?" 는 격식 표현으로 같은 말로 답함. 일상은 "Hi, alright?"',
    meeting: '돌려 말하기 발달. "with respect" 는 사실 강한 반대 신호',
    silence: '침묵 자체는 어색하지 않음. 다만 sarcasm·건조한 유머가 일상',
    formality: 'Sir/Madam 은 식당·공무 상황. 직장 first name 일반',
    taboo: '직접 칭찬·자기 자랑 — 겸손이 미덕',
    takeaway: '말 그대로 받아들이지 말 것 — 톤·문맥이 진짜 의미',
  },
  {
    id: 'australia',
    label: '호주·뉴질랜드',
    greeting: '"G\'day" 친근한 인사. "How ya going?" = How are you',
    meeting: '평등주의. 임원·신입 호칭 차이 거의 없음',
    silence: '편안한 침묵 OK. 자조적 농담 자주',
    formality: '거의 모든 상황에서 casual. 정장·격식 분위기 적음',
    taboo: '잘난 척 ("tall poppy syndrome" — 두드러지면 깎임)',
    takeaway: '편하게, 자기 비하 유머 OK, 너무 진지하면 부담',
  },
  {
    id: 'east-asia',
    label: '동아시아 (한·일·중)',
    greeting: '나이·직급·관계에 따라 호칭·인사 달라짐. 영어 첫인사도 격식 톤 선호',
    meeting: '발언 순서·서열 중시. 동의는 명시적, 반대는 우회적',
    silence: '깊은 생각·존중의 표현. 즉답 강요 X',
    formality: 'Mr./Ms. + 성씨 표준. 친해진 후 first name',
    taboo: '공개적 반박·체면 손상',
    takeaway: '간접 표현 + 서열 인지 + 침묵 존중',
  },
  {
    id: 'middle-east',
    label: '중동·북아프리카',
    greeting: '안부 인사 길게 — 가족 안부도 묻는 게 예의',
    meeting: '관계 형성 우선 → 본론은 그 다음. 첫 미팅에서 계약 체결 드뭄',
    silence: '대화 중 침묵은 부정적 — 대화 유지가 관계의 신호',
    formality: '직급·연령 호칭 중요. 환대(차·식사) 거절 신중',
    taboo: '왼손으로 명함·물건 건네기, 종교 비하',
    takeaway: '관계 먼저, 비즈니스 둘째. 환대 받는 자세 존중',
  },
  {
    id: 'nordic',
    label: '북유럽 (스칸디나비아)',
    greeting: '간단·짧음. "Hi" 후 바로 본론',
    meeting: '평등·합의 중심. 모두 발언 기회',
    silence: '편안하고 자연스러움. 침묵 = 사고 중',
    formality: 'first name 거의 모든 상황. 직급 차이 표현 약함',
    taboo: '과한 자기 자랑·과장된 표현',
    takeaway: '솔직, 간결, 평등하게',
  },
];

export function WorldCultureExplorer() {
  const [active, setActive] = useState('us');
  const cur = REGIONS.find((r) => r.id === active)!;

  const aspects = [
    { label: '인사', value: cur.greeting },
    { label: '회의·대화', value: cur.meeting },
    { label: '침묵', value: cur.silence },
    { label: '격식', value: cur.formality },
    { label: '금기', value: cur.taboo },
  ];

  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-600 dark:text-zinc-300">
        같은 영어라도 <strong>지역·문화</strong>에 따라 의사소통 규칙이 달라요. 6개 권역을 비교해 보세요.
      </p>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {REGIONS.map((r) => (
          <button
            key={r.id}
            onClick={() => setActive(r.id)}
            className={`min-h-[44px] rounded-lg border px-3 py-2 text-xs font-medium transition ${
              active === r.id
                ? 'border-purple-500 bg-purple-50 text-purple-900 dark:border-purple-400 dark:bg-purple-900/30 dark:text-purple-100'
                : 'border-zinc-300 bg-white text-zinc-700 hover:border-purple-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300'
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="mb-3 text-base font-bold text-zinc-900 dark:text-zinc-100">{cur.label}</h3>
        <ul className="space-y-2">
          {aspects.map((a) => (
            <li key={a.label} className="rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800">
              <p className="text-xs font-semibold text-purple-700 dark:text-purple-300">{a.label}</p>
              <p className="text-sm text-zinc-700 dark:text-zinc-300">{a.value}</p>
            </li>
          ))}
        </ul>
        <div className="mt-3 rounded-lg bg-purple-50 p-3 text-sm text-purple-900 dark:bg-purple-900/30 dark:text-purple-100">
          <strong>핵심</strong> — {cur.takeaway}
        </div>
      </div>
    </div>
  );
}
