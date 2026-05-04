import { notFound } from 'next/navigation';
import { MediaComparisonMatrix } from '@/components/interactive/korean/MediaComparisonMatrix';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'K-CK1-06';

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
          매체는 <strong>정보를 전달하는 도구이자 형식</strong>이에요. 같은 사실도 신문 기사·뉴스 영상·SNS 게시물로
          전해지면 강조점·신뢰도·확산 속도가 달라져요. 어떤 매체로 정보를 받는지에 따라 우리가 보는 세상도 달라져요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 매체 4가지 축">
        <p>
          매체를 비교할 때는 <strong>속도 · 도달 범위 · 심층성 · 검증 강도</strong> 4축이 유용해요.
          인쇄 매체는 검증과 심층성에서 강하지만 속도가 느리고, SNS는 속도와 확산력이 강하지만 검증이 약해요.
          축마다 강·약점이 있다는 걸 이해하면 같은 사건을 여러 매체로 교차 점검하는 습관이 생겨요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "오래된 매체는 모두 신뢰할 수 있다" — 인쇄 매체도 의도적 편파 보도를 할 수 있어요.
          ❌ "SNS는 모두 가짜다" — 시민 제보처럼 빠르고 정확한 1차 정보가 SNS에 먼저 올라오기도 해요.
          ❌ "AI 요약을 그대로 믿어도 된다" — 요약 과정에서 핵심 사실이 빠지거나 왜곡될 수 있어요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          뉴스를 볼 때, 같은 사건의 인쇄·방송·유튜브·SNS 보도를 비교해 보세요. 4가지 매체에서 강조하는 점이 다 다를 거예요.
          수능 화법·작문에서는 매체별 특성을 묻는 문제가 매년 출제. 아래 매트릭스로 4축 비교를 직접 해 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <MediaComparisonMatrix />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
