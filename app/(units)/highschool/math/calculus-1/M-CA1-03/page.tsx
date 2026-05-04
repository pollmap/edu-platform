import { notFound } from 'next/navigation';
import { DerivativeExplorer } from '@/components/interactive/math/highschool/DerivativeExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-CA1-03';

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
          미분계수는 <strong>「한 점에서 함수가 얼마나 빠르게 변하나」 = 「접선의 기울기」</strong>예요.
          모든 점의 접선 기울기를 모아 새로 만든 함수가 도함수 f′(x).
          미분의 본질은 「변화율」이며, 이 한 개념으로 물리·경제·공학의 모든 변화 분석이 시작돼요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 평균변화율 → 순간변화율 → 도함수">
        <p>
          평균변화율 [f(b) − f(a)] / (b − a)는 두 점을 잇는 직선의 기울기.
          극한을 취하면 <strong>순간변화율 f′(a) = lim h→0 [f(a+h) − f(a)] / h</strong> = 접선 기울기.
          모든 a에 대해 f′(a)를 모아 새 함수로 본 게 도함수 f′(x).
          기본 미분공식: (xⁿ)′ = nxⁿ⁻¹, (sin x)′ = cos x, (cos x)′ = −sin x.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "미분계수와 도함수는 같다" — 한 점의 값 vs 모든 점의 함수.
          ❌ "연속이면 항상 미분가능하다" — 절댓값 함수 |x|는 x = 0에서 연속이지만 미분 불가능 (꺾임).
          ❌ "(f·g)′ = f′·g′" — 절대 아님. 곱의 미분법은 (f·g)′ = f′g + fg′.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          속도 = 위치의 미분, 가속도 = 속도의 미분. 한계비용·한계수입은 비용·수입 함수의 미분이에요.
          수능 미적분에서 미분계수의 정의로부터 극한값을 구하는 문제가 매년 출제됩니다.
          빨간 접선이 슬라이더에 따라 보라색 도함수 그래프 위 점과 정확히 같은 높이로 움직이는 걸 확인해 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <DerivativeExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
