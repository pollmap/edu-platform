import { notFound } from 'next/navigation';
import { ProbabilityVennExplorer } from '@/components/interactive/math/highschool/ProbabilityVennExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-PS-03';

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
          { label: '확률과 통계', href: '/highschool/math/probability-statistics' },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          확률은 <strong>「가능한 모든 경우(표본공간) 위에 합이 1이 되도록 가중치를 얹는 함수」</strong>예요.
          관심 사건은 표본공간의 부분집합이고, 합집합·교집합·여집합 규칙은 결국 집합 연산이에요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 합집합 공식과 여집합">
        <p>
          P(A∪B) = P(A) + P(B) − P(A∩B). 「두 영역을 다 덮은 부분」을 두 번 세지 않도록 빼주는 거예요.
          여집합 P(Aᶜ) = 1 − P(A)는 특히 「적어도 한 번」 류 문제에서 강력해요.
          서로 배반(disjoint)이면 P(A∩B) = 0이라 합집합이 단순 덧셈이 돼요.
          확률은 0과 1 사이, 표본공간의 확률은 항상 1.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ 「합집합 = 그냥 더하기」 — 교집합을 한 번 빼야 해요.
          ❌ 「독립 = 배반」 — 둘은 다른 개념. 배반은 「동시에 못 일어남」, 독립은 「영향을 안 주는 사이」.
          ❌ 「P(Aᶜ) = −P(A)」 — 1에서 빼야 해요. 확률은 음수가 될 수 없어요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          주사위·카드·동전 같은 고전 확률뿐 아니라, 「당첨 확률」, 「비 올 확률」, 「검사 양성률」 모두 표본공간 위 사건이에요.
          수능 「확률과 통계」 단원에서는 합집합 공식과 여집합을 결합한 문제가 단골.
          벤다이어그램에 P(A), P(B), P(A∩B)를 직접 채워 보는 습관을 들이면 실수가 줄어요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <ProbabilityVennExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
