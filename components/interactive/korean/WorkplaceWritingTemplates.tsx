'use client';

// K-PC 직무 의사소통 — 직무 글쓰기 6종 템플릿(구조만, 실제 사례 X).

import { useState } from 'react';

interface Template {
  id: string;
  label: string;
  purpose: string;
  reader: string;
  blocks: { name: string; desc: string }[];
  tone: string;
  pitfall: string;
}

const TEMPLATES: Template[] = [
  {
    id: 'email',
    label: '업무 이메일',
    purpose: '명확한 요청·보고를 짧게 전달',
    reader: '직장 동료·상사·외부 파트너',
    blocks: [
      { name: '제목', desc: '핵심 키워드 + 마감 (예: "[보고] 4월 매출 자료 / ~5/3")' },
      { name: '인사 1줄', desc: '수신자 호칭 + 짧은 인사' },
      { name: '용건', desc: '요청·전달 사항 1~2줄, 두괄식' },
      { name: '근거·맥락', desc: '필요한 배경만 간결히, 첨부 파일 안내' },
      { name: '맺음', desc: '회신 기한 + 감사 인사 + 서명' },
    ],
    tone: '존댓말, 짧은 문장, 불필요한 수식어 X',
    pitfall: '본론 없이 인사만 길어지거나 마감을 빼먹는 실수',
  },
  {
    id: 'report',
    label: '업무 보고서',
    purpose: '진행 상황·결과를 의사결정자에게 전달',
    reader: '팀장·임원·관련 부서',
    blocks: [
      { name: '제목·요약', desc: '한 페이지 요약(핵심 결과·요청사항)' },
      { name: '배경', desc: '왜 이 일을 했는가 (1~2줄)' },
      { name: '진행·결과', desc: '수치·표 중심, 추측 X' },
      { name: '이슈·리스크', desc: '문제·지연 원인을 솔직히' },
      { name: '제안·다음 단계', desc: '의사결정자에게 필요한 결정 사항' },
    ],
    tone: '객관적, 수치 표기, 결론을 먼저',
    pitfall: '미사여구·자기 자랑이 결과 부분을 가리는 경우',
  },
  {
    id: 'meeting',
    label: '회의록',
    purpose: '결정·할일·책임자를 기록',
    reader: '참석자 + 미참석자',
    blocks: [
      { name: '메타 정보', desc: '일시·장소·참석/불참' },
      { name: '안건 목록', desc: '논의 항목 번호로 정리' },
      { name: '논의 요지', desc: '발언자 + 핵심 의견(요약)' },
      { name: '결정 사항', desc: '확정된 내용을 굵게' },
      { name: '액션 아이템', desc: '담당자·마감일 표 형식' },
    ],
    tone: '중립적, 발언 그대로 옮기지 말고 요지만',
    pitfall: '결정·담당자 누락, 논의와 결론 구분 모호',
  },
  {
    id: 'proposal',
    label: '제안서',
    purpose: '새 아이디어·프로젝트 승인 요청',
    reader: '의사결정권자·협력사',
    blocks: [
      { name: '문제 정의', desc: '왜 지금 이 제안이 필요한가' },
      { name: '해결 방안', desc: '제안 내용 핵심 + 차별점' },
      { name: '실행 계획', desc: '일정·리소스·역할 분담' },
      { name: '예산·기대 효과', desc: '비용 vs 효과 정량 비교' },
      { name: '리스크·대응', desc: '실패 가능성과 대비책' },
    ],
    tone: '설득적, 데이터·근거 충실',
    pitfall: '효과 과장, 리스크 누락',
  },
  {
    id: 'manual',
    label: '업무 매뉴얼',
    purpose: '같은 일을 다른 사람도 똑같이 하도록',
    reader: '신규 입사자·교대자',
    blocks: [
      { name: '목적·범위', desc: '이 매뉴얼이 다루는 작업' },
      { name: '준비물', desc: '도구·계정·권한' },
      { name: '단계별 절차', desc: '번호 매긴 순서 + 스크린샷' },
      { name: '예외 처리', desc: '오류·예외 상황 대응' },
      { name: '문의처', desc: '담당자·연락처' },
    ],
    tone: '명령형 짧은 문장, 그림·표 활용',
    pitfall: '작성자만 아는 약어·전문용어 미설명',
  },
  {
    id: 'apology',
    label: '사과·해명문',
    purpose: '실수·문제 발생 시 신뢰 회복',
    reader: '고객·외부 이해관계자',
    blocks: [
      { name: '사실 인정', desc: '무엇이 일어났는지 정확히' },
      { name: '원인 설명', desc: '책임 회피 X, 구체적 원인' },
      { name: '사과 표현', desc: '"불편을 끼쳐 죄송합니다"' },
      { name: '재발 방지', desc: '구체적 조치·일정' },
      { name: '연락 채널', desc: '추가 문의처' },
    ],
    tone: '진지·간결, 변명 단어 회피',
    pitfall: '책임 분산 표현("어쩔 수 없는 사정"), 재발 방지 막연',
  },
];

export function WorkplaceWritingTemplates() {
  const [active, setActive] = useState('email');
  const cur = TEMPLATES.find((t) => t.id === active)!;

  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-600 dark:text-zinc-300">
        직무 상황별로 글의 <strong>블록 순서</strong>가 다르게 정해져 있어요. 6가지 표준 템플릿을 비교해 보세요.
      </p>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {TEMPLATES.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`min-h-[44px] rounded-lg border px-3 py-2 text-sm font-medium transition ${
              active === t.id
                ? 'border-red-500 bg-red-50 text-red-900 dark:border-red-400 dark:bg-red-900/30 dark:text-red-100'
                : 'border-zinc-300 bg-white text-zinc-700 hover:border-red-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="mb-1 text-base font-bold text-zinc-900 dark:text-zinc-100">{cur.label}</h3>
        <p className="text-xs text-zinc-500">
          목적: {cur.purpose} · 독자: {cur.reader}
        </p>
        <ol className="mt-3 space-y-2">
          {cur.blocks.map((b, i) => (
            <li
              key={b.name}
              className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-800"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {i + 1}
                </span>
                <strong className="text-sm text-zinc-900 dark:text-zinc-100">{b.name}</strong>
              </div>
              <p className="mt-1 ml-8 text-sm text-zinc-700 dark:text-zinc-300">{b.desc}</p>
            </li>
          ))}
        </ol>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <div className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-100">
            <strong>톤·문체</strong> — {cur.tone}
          </div>
          <div className="rounded-lg bg-amber-50 p-3 text-sm text-amber-900 dark:bg-amber-900/30 dark:text-amber-100">
            <strong>흔한 실수</strong> — {cur.pitfall}
          </div>
        </div>
      </div>
    </div>
  );
}
