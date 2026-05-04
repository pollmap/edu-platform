import { notFound } from 'next/navigation';
import { DivisionRemainderExplorer } from '@/components/interactive/math/DivisionRemainderExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'M3-NA-03';

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
          나눗셈은 <strong>똑같이 묶어 보는 것</strong>이에요. 17개를 5개씩 묶으면 3묶음에 2개가 남죠.
          이때 <strong>3을 몫</strong>, <strong>2를 나머지</strong>라고 해요.
        </p>
      </SectionCard>
      <SectionCard title="검산이 중요해요">
        <p>
          나눗셈 결과가 맞는지 확인하려면 <strong>나누는 수 × 몫 + 나머지 = 나누어지는 수</strong>가 되는지 봐요.
          위 예: 5 × 3 + 2 = 17 ✓. 나머지는 항상 나누는 수보다 작아야 해요. 5보다 작은 0~4 사이.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <DivisionRemainderExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
