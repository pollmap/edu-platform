import { notFound } from 'next/navigation';
import { ParticleStateSimulator } from '@/components/interactive/science/ParticleStateSimulator';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'S7-MA-01';

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
      <SectionCard title="한마디로">
        <p>
          모든 물질은 눈에 보이지 않는 작은 알갱이, <strong>입자</strong>로 이루어져 있어요.
          입자가 얼마나 빠르게 움직이고 얼마나 가깝게 모여 있느냐에 따라{' '}
          <strong>고체·액체·기체</strong>로 나뉩니다.
        </p>
      </SectionCard>
      <SectionCard title="왜 온도가 중요한가">
        <p>
          온도는 입자들의 <strong>평균 운동 에너지</strong>예요. 따라서 온도가 올라가면 입자가
          더 빠르게 움직이고, 서로의 인력을 이겨내며 자유로워져요. 그래서 고체 → 액체 → 기체로
          상태가 바뀝니다.
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
