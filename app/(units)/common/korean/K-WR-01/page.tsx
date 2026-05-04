import { notFound } from 'next/navigation';
import { ParagraphStructureBuilder } from '@/components/interactive/korean/ParagraphStructureBuilder';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'K-WR-01';

export function generateMetadata() {
  const unit = findUnit(UNIT_ID);
  return unit ? makeUnitMetadata(unit) : {};
}

export default function Page() {
  const unit = findUnit(UNIT_ID);
  if (!unit) notFound();

  return (
    <main className="container mx-auto max-w-5xl px-4 py-8">
      <UnitHeader
        unit={unit}
        breadcrumb={[
          { label: '홈', href: '/' },
          { label: `학년 공통 / ${SUBJECT_LABEL[unit.subject]}`, href: `/common/${unit.subject}` },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          글은 막 쓰면 흩어져요. <strong>처음·가운데·끝</strong> 또는 <strong>서론·본론·결론</strong> 같은 짜임을 갖추면 읽는 사람이 따라오기 쉬워요.
        </p>
      </SectionCard>
      <SectionCard title="대표 짜임 3가지">
        <p>
          ① <strong>3단 (처음·가운데·끝)</strong>: 모든 글의 기본. 도입 → 본격 → 마무리.
          ② <strong>서론·본론·결론</strong>: 논설문에서 자주 — 문제 제기 → 근거 → 주장 정리.
          ③ <strong>PREP</strong>: 영어권의 짧은 글 패턴 — Point(주장) → Reason(이유) → Example(예시) → Point(반복).
          어느 짜임이든 핵심은 "독자가 길을 잃지 않게"입니다.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "본론을 길게 = 좋은 글" — 본론이 길어도 토픽이 흩어지면 핵심이 안 보여요. 단락마다 한 가지 생각.
          ❌ "결론은 새로운 정보 추가" — 결론은 본론 정리. 새 근거를 들고 오면 글이 늘어져요.
          ❌ "짜임은 시험용" — 모든 글(이메일·발표 슬라이드·블로그 포스트)에서 짜임이 핵심. 일이든 일상이든 평생 무기.
        </p>
      </SectionCard>
      <SectionCard title="실생활 속 글 짜임">
        <p>
          교사·면접관·상사·동료에게 글을 보낼 때 짜임이 있으면 한 번에 통과. 짜임이 없으면 다시 쓰기 요청을 받기 쉬워요.
          이메일도 인사 → 본문(요청·이유) → 다음 행동 → 마무리 인사 짜임을 따르면 깔끔.
          블록 쌓기 인터랙티브로 실제 짜임을 직접 조립해 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <ParagraphStructureBuilder />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
