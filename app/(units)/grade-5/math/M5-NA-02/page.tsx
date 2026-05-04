import { notFound } from 'next/navigation';
import { PrimeFactorTree } from '@/components/interactive/math/PrimeFactorTree';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'M5-NA-02';

export function generateMetadata() {
  const unit = findUnit(UNIT_ID);
  return unit ? makeUnitMetadata(unit) : {};
}

export default function Page() {
  const unit = findUnit(UNIT_ID);
  if (!unit || unit.schoolLevel === 'highschool' || unit.grade === undefined) notFound();

  return (
    <main className="container mx-auto max-w-5xl px-4 py-8">
      <UnitHeader
        unit={unit}
        breadcrumb={[
          { label: '홈', href: '/' },
          { label: `${GRADE_LABEL[unit.grade]} / ${SUBJECT_LABEL[unit.subject]}`, href: `/grade-${unit.grade}/${unit.subject}` },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          어떤 수를 <strong>나누어떨어지게 하는 수</strong>가 약수, <strong>그 수를 곱한 수</strong>가 배수예요.
          12의 약수: 1·2·3·4·6·12 / 12의 배수: 12·24·36·...
        </p>
      </SectionCard>
      <SectionCard title="소인수분해가 핵심">
        <p>
          모든 수는 <strong>소수의 곱</strong>으로 단 한 가지 방식으로 쪼갤 수 있어요.
          12 = 2 × 2 × 3, 30 = 2 × 3 × 5. 이걸 알면 약분·통분·최대공약수·최소공배수가 모두 쉬워져요.
          수학에서 가장 중요한 정리 중 하나예요(<strong>산술의 기본정리</strong>).
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <PrimeFactorTree />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
