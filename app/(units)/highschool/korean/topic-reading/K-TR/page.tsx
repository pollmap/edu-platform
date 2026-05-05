import { notFound } from 'next/navigation';
import { ReadingPurposeMatrix } from '@/components/interactive/korean/ReadingPurposeMatrix';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'K-TR';

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
          주제별 독서는 <strong>같은 책도 목적에 따라 다르게 읽는다</strong>는 사실을 익히는 과목이에요.
          인문·사회·과학·예술·진로 — 분야가 다르면 읽는 속도·메모법·평가 질문이 달라져요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 목적별 독해 전략">
        <p>
          개념 이해(인문) → 구조 분석(사회) → 원리 추적(과학) → 형식 감상(예술) → 행동 적용(진로).
          각 영역마다 <strong>적합한 메모 형식과 평가 질문</strong>이 따로 있고, 이걸 알면
          독서량이 같아도 흡수율이 훨씬 높아져요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ &quot;독서는 같은 방법으로 모두 읽는 거다&quot; — 분야별로 핵심 단서가 달라요.
          ❌ &quot;메모는 시간 낭비&quot; — 메모 없는 독서는 한 달 후 거의 잊혀요.
          ❌ &quot;많이 읽기만 하면 된다&quot; — 적용·검증까지 가야 진짜 자기 것이 돼요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          학과 탐색·진로 독서·논술 자료 조사 — 모두 같은 매트릭스로 정리돼요.
          수능 비문학은 분야별 글의 구조를 빨리 파악하는 게 핵심. 아래 5영역의 독해 전략을 비교해 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <ReadingPurposeMatrix />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
