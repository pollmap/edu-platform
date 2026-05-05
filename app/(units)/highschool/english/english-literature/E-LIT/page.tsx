import { notFound } from 'next/navigation';
import { LiteraryEraTimeline } from '@/components/interactive/english/LiteraryEraTimeline';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'E-LIT';

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
          영미 문학 읽기는 <strong>시대별 사조</strong>를 도구로 작품을 읽어내는 과목이에요.
          르네상스·낭만주의·모더니즘 — 시대 배경을 알면 처음 읽는 작품도 빨리 이해돼요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 시대 → 형식 → 주제">
        <p>
          영미 문학사는 <strong>역사적 사건 → 형식 변화 → 주제 변화</strong>의 흐름으로 읽어요.
          예: 1·2차 대전 → 파편화된 시간 → 모더니즘의 의식의 흐름. 형식과 주제는 시대에서 자라나요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ &quot;옛날 영어는 어렵기만&quot; — 시대 배경을 알면 어휘 추측이 훨씬 쉬워져요.
          ❌ &quot;시는 감정만 읽는 것&quot; — 운율·이미지·시대 맥락 함께 읽어야 깊이 이해.
          ❌ &quot;고전은 보편적 진리만 담아&quot; — 모든 작품은 그 시대의 산물, 시대 비판과 함께 읽기.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          대학 영문학 입문·SAT 문학·교양 강의 — 모두 시대별 사조가 출발점.
          저작권 보호로 본문 인용은 하지 않지만, 작가·시기·사조 정보로도 충분히 흐름이 보여요.
          아래 6시대 타임라인을 비교해 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <LiteraryEraTimeline />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
