import { notFound } from 'next/navigation';
import { AnimalHabitatExplorer } from '@/components/interactive/science/AnimalHabitatExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'S4-LI-01';

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
          동물은 태어나서 자라고, 짝짓기를 하고, 알·새끼를 낳고, 늙어 죽어요. 이 과정을 <strong>한살이</strong>라고 해요.
        </p>
      </SectionCard>
      <SectionCard title="알을 낳는 동물 vs 새끼를 낳는 동물">
        <p>
          새·물고기·곤충·파충류는 보통 <strong>알</strong>을 낳고, 포유류(개·고양이·사람)는 <strong>새끼</strong>를 낳아요.
          나비처럼 알 → 애벌레 → 번데기 → 어른벌레 단계로 모양이 크게 바뀌는 동물도 있어요(<strong>완전 변태</strong>).
          서식지에 따라 한살이 모습이 다 다르니 다양한 동물을 비교해 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <AnimalHabitatExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
