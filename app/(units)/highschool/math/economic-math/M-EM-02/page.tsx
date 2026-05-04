import { notFound } from 'next/navigation';
import { AnnuityCalculator } from '@/components/interactive/math/highschool/AnnuityCalculator';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-EM-02';

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
          { label: '경제 수학', href: '/highschool/math/economic-math' },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          매달 같은 금액을 넣거나 갚는 「등비수열」을 더한 게 곧 <strong>연금의 미래가치</strong>·<strong>대출의 월상환액</strong>이에요.
          수열의 합 공식이 그대로 금융 현장에서 살아 움직여요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 연금 FV와 대출 PMT">
        <p>
          매달 PMT 적립, 월이율 r, n개월: FV = PMT · ((1+r)ⁿ − 1)/r.
          대출 원금 L, 월 상환액: PMT = L · r / (1 − (1+r)^(−n)).
          두 공식 모두 등비수열 합 1 + (1+r) + (1+r)² + ... + (1+r)^(n−1) = ((1+r)ⁿ − 1)/r 에서 출발해요.
          기간이 길수록 FV가 커지지만 대출은 총이자도 따라 커져요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ 「적금 만기 = 입금액 합」 — 이자 때문에 그것보다 항상 커요. 단, 세금 떼면 다소 줄어요.
          ❌ 「장기대출이 항상 유리」 — 월 부담은 작아도 총 이자는 폭증해요. 30년 대출이 15년 대출보다 이자 2~3배가 보통.
          ❌ 「월이율 = 연이율/12」는 단순 근사 — 정확히는 (1+연이율)^(1/12) − 1. 고등 수준에서는 r/12 사용 OK.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          청년도약계좌, 국민연금, 주택담보대출, 학자금 대출, 자동차 할부 — 모두 이 두 공식 위에서 굴러가요.
          경제 수학에서는 「월 적립액과 기간이 미래가치에 어떻게 영향을 주는지」, 「대출 조건별 총이자 비교」가 단골.
          시뮬레이터로 30년 후 모인 돈이 입금액의 몇 배가 되는지, 부동산 대출 이자가 얼마인지 직접 확인해 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <AnnuityCalculator />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
