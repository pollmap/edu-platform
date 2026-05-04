import { notFound } from 'next/navigation';
import { ConfidenceIntervalSimulator } from '@/components/interactive/math/highschool/ConfidenceIntervalSimulator';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-PS-07';

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
          통계적 추정은 <strong>표본 하나로 모집단의 평균을 「범위(신뢰구간)」로 추측하는 일</strong>이에요.
          같은 절차를 반복하면 그 범위가 진짜 평균을 덮을 비율이 신뢰수준(예: 95%)이에요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 표본평균의 분포와 자(尺) 만들기">
        <p>
          표본평균 X̄의 분포는 N(μ, σ²/n) (또는 그 근사). 따라서 95% 신뢰구간은
          X̄ ± 1.96·(σ/√n). n이 클수록 ±폭이 좁아지고, σ가 작을수록 더 정밀해져요.
          신뢰구간은 「추정량 자체가 변동하는」 것이지, 진짜 평균은 고정값이라는 점을 명심해야 해요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ 「95% 신뢰구간 = 진짜 평균이 그 안에 있을 확률 95%」 — 정확히는 「같은 절차를 반복할 때 95번은 덮는다」예요.
          ❌ 「표본이 많을수록 항상 좋다」 — n을 4배로 해야 폭이 1/2이 돼요(√n 효과). 비용 대비 효과 고려.
          ❌ 「σ를 모르면 못 푼다」 — 표본표준편차 s와 t분포를 사용하는 방법(t-검정)이 있어요(고등에서는 z 위주).
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          여론조사 「±3%포인트」, 임상시험 효과 추정, 품질 관리 평균 추정 — 모두 신뢰구간 그 자체예요.
          수능에서는 신뢰수준·표본 크기·표준편차가 신뢰구간 폭에 미치는 영향을 묻는 문제가 핵심.
          시뮬레이터로 100번 표본을 뽑아 「덮은 비율」이 신뢰수준에 가까운지 확인해 보면 정의가 명확해져요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <ConfidenceIntervalSimulator />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
