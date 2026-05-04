import { notFound } from 'next/navigation';
import { HumanBodySystems } from '@/components/interactive/science/HumanBodySystems';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'S6-LI-01';

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
          우리 몸은 <strong>여덟 가지 시스템</strong>이 협력해 움직이는 정교한 기계예요.
          뼈가 지탱하고, 근육이 움직이고, 심장이 피를 보내고, 폐가 숨을 쉬고, 위·장이 음식을 소화하고,
          뇌가 신호를 보내고, 콩팥이 노폐물을 거르고, 감각기관이 바깥세상을 느껴요.
        </p>
      </SectionCard>
      <SectionCard title="시스템끼리 어떻게 연결되어 있을까?">
        <p>
          예를 들어 달리기를 하면 — 다리 <strong>근육</strong>이 움직이려고 <strong>호흡계</strong>가
          더 많은 산소를 들이마시고, <strong>순환계</strong>가 그 산소를 빠르게 근육으로 보내고,
          <strong>신경계</strong>가 균형을 잡아 줘요. 한 가지 활동에 거의 모든 시스템이 동시에 일해요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <HumanBodySystems />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
