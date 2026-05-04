import { notFound } from 'next/navigation';
import { ParticleStateSimulator } from '@/components/interactive/science/ParticleStateSimulator';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'S3-MA-02';

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
          물질은 <strong>고체 · 액체 · 기체</strong> 세 가지 상태로 있을 수 있어요. 모양·부피가 어떻게 다른지가 핵심이에요.
        </p>
      </SectionCard>
      <SectionCard title="물 한 가지 물질, 세 가지 상태">
        <p>
          얼음(고체) → 물(액체) → 수증기(기체). 같은 물 분자가 <strong>입자 사이 간격과 운동</strong>이 달라져 상태가 바뀌어요.
          고체는 입자가 가까이 붙어 모양이 고정, 액체는 흘러서 그릇 모양 따라가지만 부피는 일정, 기체는 사방으로 퍼져 부피도 변해요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <ParticleStateSimulator />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
