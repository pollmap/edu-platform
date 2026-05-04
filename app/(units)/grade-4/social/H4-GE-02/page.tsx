import { notFound } from 'next/navigation';
import { KoreaRegionExplorer } from '@/components/interactive/social/KoreaRegionExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'H4-GE-02';

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
          사람이 많이 모여 살면 <strong>도시</strong>, 농사·어업·임업을 주로 하면 <strong>촌락</strong>. 둘은 다른 모습이지만 서로 도와가며 공존해요.
        </p>
      </SectionCard>
      <SectionCard title="도시와 촌락이 서로에게 필요한 이유">
        <p>
          촌락이 농산물·수산물·임산물을 생산하면 도시는 그것을 먹고, 도시가 만든 공산품·서비스를 촌락이 이용해요.
          어느 한쪽만으로는 살 수 없는 <strong>상호 의존</strong> 관계예요. 한국 행정구역(시·군·구)을 살펴보면 도시와 촌락의 위치가 보여요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <KoreaRegionExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
