import { notFound } from 'next/navigation';
import { DecimalPlaceColumns } from '@/components/interactive/math/DecimalPlaceColumns';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'M3-NA-05';

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
          소수는 <strong>1보다 작은 수</strong>를 나타내는 또 다른 방법이에요. 0.1은 1을 10조각으로 나눈 한 조각, 0.01은 100조각으로 나눈 한 조각이에요.
        </p>
      </SectionCard>
      <SectionCard title="분수와 친구예요">
        <p>
          0.1 = 1/10, 0.5 = 5/10 = 1/2, 0.25 = 25/100 = 1/4 — 소수와 분수는 같은 양을 다르게 적은 거예요.
          시계나 돈에서 자연스럽게 만나요. 1000원의 0.5는 500원, 1000원의 1/2도 500원.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <DecimalPlaceColumns />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
