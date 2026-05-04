import { notFound } from 'next/navigation';
import { SupplyDemandExplorer } from '@/components/interactive/social/SupplyDemandExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'H-IS1-06';

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
          시장경제는 <strong>가격이라는 신호</strong>로 자원을 배분해요. 그 출발점이 수요·공급 곡선이에요.
          금융 상품(예금·주식·채권·보험)도 같은 원리로 가격이 형성돼요. 통합사회 경제 단원의 도구상자.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 균형과 외부 충격">
        <p>
          <strong>수요</strong>는 가격이 오르면 줄고, <strong>공급</strong>은 가격이 오르면 늘어요. 두 곡선이 만나는 점이 균형(P*, Q*).
          소득·기호·기술·날씨 같은 요인은 곡선 자체를 좌우로 이동시켜 균형을 옮겨요. 정부가 가격 상한·하한을 둘 때
          어떤 부작용이 생기는지(품귀·잉여)도 같은 그래프로 설명돼요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "수요가 늘면 가격이 무조건 오른다" — 공급이 같이 늘면 가격은 그대로일 수도.
          ❌ "정부가 가격을 누르면 무조건 좋다" — 균형 가격보다 낮은 상한은 만성 품귀를 만들어요.
          ❌ "주식·예금은 완전히 다르다" — 위험·수익 비율은 다르지만, 가격 결정 원리는 같은 수요·공급 틀 안.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          농산물 가격 급등, 유가 변동, 부동산 정책, 금리 변경 — 한 그래프로 분석돼요.
          수능 사회탐구 경제·통합사회의 단골 출제 주제. 아래 슬라이더로 곡선을 직접 움직여 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <SupplyDemandExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
