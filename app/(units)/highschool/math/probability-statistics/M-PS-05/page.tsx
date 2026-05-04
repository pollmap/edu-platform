import { notFound } from 'next/navigation';
import { DiscreteDistributionExplorer } from '@/components/interactive/math/highschool/DiscreteDistributionExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-PS-05';

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
          확률변수는 <strong>「가능한 결과에 숫자를 붙인 것」</strong>이고, 분포는 <strong>「그 숫자들이 나올 확률을 모두 모은 표」</strong>예요.
          기댓값은 무게중심, 분산은 흩어짐.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — E(X), V(X) 그리고 선형성">
        <p>
          E(X) = Σ x·P(X=x), V(X) = E((X−μ)²) = E(X²) − μ².
          선형성: E(aX + b) = aE(X) + b, V(aX + b) = a²V(X) — 평균은 평행이동이 그대로 따라가지만,
          분산은 「상수항」을 더해도 안 변하고 「배율」만 제곱으로 따라가요.
          이산이든 연속이든 P(x) ≥ 0, ΣP(x) = 1 (적분=1)은 변하지 않아요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ 「기댓값 = 가장 자주 나오는 값」 — 그건 최빈값. 기댓값은 가중평균이에요.
          ❌ 「분산이 0 = 데이터가 같다」 — 맞아요, 다만 분산은 단위가 제곱이라 비교 시 표준편차(√V) 사용.
          ❌ 「확률값이 음수일 수 있다」 — 절대 안 돼요. P(X) ∈ [0,1] 그리고 합은 1.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          보험료(기댓값으로 계산), 게임 디자인(랜덤 박스 기댓값), 투자 수익률 분석(분산=리스크) 모두 확률변수의 분포로 모델링해요.
          수능에서는 표 형태로 분포를 주고 E, V를 묻는 문제가 자주 나와요.
          공식보다 「가중평균 + 평행이동·배율의 효과」를 직관으로 잡는 게 더 빨라요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <DiscreteDistributionExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
