import { notFound } from 'next/navigation';
import { FractionAddSubExplorer } from '@/components/interactive/math/FractionAddSubExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'M5-NA-04';

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
          분모가 같으면 분자끼리 그냥 더하면 돼요. 그런데 분모가 다르면? 먼저 분모를 맞춰야 해요.
          이걸 <strong>통분</strong>이라고 합니다.
        </p>
      </SectionCard>
      <SectionCard title="왜 통분이 필요해?">
        <p>
          1/2 과 1/3 은 같은 1을 다른 크기로 자른 조각이에요. 다른 크기 조각을 그대로 더할 수
          없으니, <strong>같은 크기로 다시 자른 뒤</strong> 합쳐야 정확해요.
        </p>
        <p>분모를 맞추는 가장 효율적인 수가 <strong>최소공배수</strong>입니다.</p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <FractionAddSubExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
