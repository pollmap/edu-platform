import { notFound } from 'next/navigation';
import { DebateStructureExplorer } from '@/components/interactive/korean/DebateStructureExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'K-RD';

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
          독서토론은 <strong>같은 책을 읽고 다른 의견을 만나는</strong> 과목이에요.
          혼자 읽을 때 보이지 않던 빈틈이 토론에서 드러나고, 거기서 더 깊은 이해가 시작돼요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 독서토론 4단계">
        <p>
          ① <strong>입론</strong>(내 해석 + 근거 3개) →
          ② <strong>교차 질의</strong>(상대 근거 검증) →
          ③ <strong>반론</strong>(상대 약점 정리) →
          ④ <strong>최종 변론</strong>(핵심 정리). 이 흐름은 학술 토론·면접·논술의 공통 틀이에요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ &quot;토론은 이기는 게 목적&quot; — 더 나은 해석을 함께 찾는 과정이에요.
          ❌ &quot;감정에 호소하면 설득된다&quot; — 단기 효과는 있지만 약점이 드러나면 역효과.
          ❌ &quot;책 본문 인용이 많을수록 좋다&quot; — 인용보다 본문 근거의 해석이 더 중요해요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          학교 독서토론·논술·면접·동아리 회의 — 같은 4단계 구조로 풀려요.
          수능 화법·작문에서는 토론 단계 식별과 발화 의도 분석이 자주 출제. 아래에서 4단계를 직접 클릭해 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <DebateStructureExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
