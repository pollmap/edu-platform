import { notFound } from 'next/navigation';
import { WorkplaceWritingTemplates } from '@/components/interactive/korean/WorkplaceWritingTemplates';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'K-PC';

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
          { label: '고등학교', href: '/highschool' },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          직무 의사소통은 <strong>일터에서 통하는 글·말</strong>을 익히는 과목이에요.
          이메일·보고서·회의록·제안서 — 각각 정해진 구조와 톤이 있고, 그 틀을 지키면 신뢰가 쌓여요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 직무 글쓰기 3원칙">
        <p>
          ① <strong>두괄식</strong>(결론 먼저) ② <strong>구체성</strong>(수치·일정·담당자)
          ③ <strong>책임 명시</strong>(누가 무엇을 언제까지). 이 세 가지가 빠지면
          잘 쓴 글이라도 일터에서는 안 통해요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ &quot;길게 쓸수록 성의 있다&quot; — 의사결정자는 짧고 명확한 글을 선호해요.
          ❌ &quot;인사·아이스브레이킹이 길어야 예의&quot; — 본론을 빨리 보여주는 게 진짜 예의.
          ❌ &quot;사실만 적으면 끝&quot; — 다음 행동·의사결정에 필요한 정보를 짚어줘야 완성.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          취업 면접·인턴 첫주·동아리 회의 — 모두 같은 템플릿으로 풀려요.
          NCS·논술·자소서에서도 같은 구조를 평가합니다. 아래 6가지 직무 템플릿을 비교해 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <WorkplaceWritingTemplates />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
