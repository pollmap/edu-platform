import { notFound } from 'next/navigation';
import { SolarSystemExplorer } from '@/components/interactive/science/SolarSystemExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'S5-EU-01';

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
          태양계는 <strong>태양과 그를 도는 8개 행성</strong> + 위성·소행성·혜성으로 이루어졌어요. 행성은 태양에 가까울수록 빨리 돌고, 멀수록 천천히 돌아요.
        </p>
      </SectionCard>
      <SectionCard title="행성의 두 종류">
        <p>
          <strong>지구형 행성</strong> (수성·금성·지구·화성) 은 작고 단단해요. <strong>목성형 행성</strong> (목성·토성·천왕성·해왕성) 은 크고 가스로 된 두꺼운 대기를 가졌어요. 두 종류 사이에는 소행성대가 있어요.
        </p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
          ※ 시각화에서 거리는 가독성을 위해 압축됐어요. 실제로 해왕성은 지구의 약 30배 멀리 있어요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <SolarSystemExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
