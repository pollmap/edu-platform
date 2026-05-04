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

const UNIT_ID = 'S3-LI-01';

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
          동물은 사는 곳(<strong>서식지</strong>)에 따라 몸의 모양과 행동이 달라요. 땅·물·하늘·사막처럼 환경이 다르면 살아남는 방법도 다르거든요.
        </p>
      </SectionCard>
      <SectionCard title="환경에 맞춰 진화한 몸">
        <p>
          물고기는 물에서 헤엄치려 지느러미가 있고, 새는 하늘을 날려고 가벼운 깃털과 강한 가슴근육이 있어요.
          낙타는 물이 적은 사막에서 살려고 혹에 지방을 저장해요. 똑같은 동물이라도 사는 곳이 바뀌면 살기 어려운 이유예요.
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
