import { notFound } from 'next/navigation';
import { CultureComparisonMatrix } from '@/components/interactive/social/CultureComparisonMatrix';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'H-IS2-02';

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
          문화는 <strong>우열이 아니라 축의 차이</strong>예요. 개인-집단, 권력 거리, 불확실성 회피, 시간 관점, 성역할 유연성 등
          여러 축에서 위치가 다른 것이지, 어느 한쪽이 더 옳은 게 아니에요. 이게 <strong>문화 상대주의</strong>의 출발점.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 5축 비교">
        <p>
          비교 연구는 문화권 간 차이를 5가지 축으로 보여 줘요. 같은 사회 안에서도 세대·지역·계층마다 위치가 다르고,
          시간이 지나면서 축 위에서의 위치도 이동해요. 단일 차원으로 "이 나라 vs 저 나라"라고 말하기보다,
          여러 축의 조합으로 보는 게 정확.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "한 나라는 한 가지 문화를 가진다" — 어느 사회나 내부에 다수의 하위 문화가 공존.
          ❌ "다른 문화는 이상하다" — 익숙한 기준에서 벗어났을 뿐, 그 안에서는 일관된 논리가 있어요.
          ❌ "문화 상대주의 = 모든 게 다 OK" — 인권·생명 같은 보편 가치를 부정하지는 않아요(절충적 상대주의).
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          유학·해외 교환·다문화 가족·국제 협업 — 5축 감각을 가지면 충돌의 원인을 빠르게 짚을 수 있어요.
          내신·수행평가는 사례를 5축에 맞춰 비교 분석하는 문제가 자주. 아래 슬라이더를 조정해 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <CultureComparisonMatrix />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
