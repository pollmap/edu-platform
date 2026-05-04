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

const UNIT_ID = 'M7-NA-01';

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
          어떤 자연수든 <strong>소수의 곱</strong>으로 단 한 가지 방법으로 쪼갤 수 있어요. 이 쪼개기를 <strong>소인수분해</strong>라고 합니다.
        </p>
      </SectionCard>
      <SectionCard title="왜 소수만 쓸까?">
        <p>
          <strong>소수</strong>는 1과 자기 자신만 약수인 수예요 (2, 3, 5, 7, 11, ...). 다른 합성수로 더 쪼갤 수 있으니까, 가장 작은 부품인 소수까지 내려가야 더 이상 쪼갤 수 없어요.
        </p>
        <p>
          이 성질이 <strong>산술의 기본정리</strong>: 어떤 자연수의 소인수분해는 (순서를 빼면) 단 하나뿐.
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
