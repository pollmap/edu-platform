import { notFound } from 'next/navigation';
import { PolygonAreaExplorer } from '@/components/interactive/math/PolygonAreaExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'M3-GM-01';

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
          평면도형은 <strong>변(line)·각(angle)</strong>으로 이루어진 평평한 모양이에요. 변과 각의 개수·크기에 따라 삼각형·사각형·다각형으로 나뉘어요.
        </p>
      </SectionCard>
      <SectionCard title="모양마다 이름과 성질이 있어요">
        <p>
          삼각형은 변 3개, 사각형은 4개… 변이 5개면 오각형, 6개면 육각형. 각 변의 길이와 각의 크기에 따라 또 세부 분류돼요(직각삼각형, 정사각형 등).
          이번 단원에서는 다양한 다각형의 면적을 격자로 직접 채워 보며 도형의 핵심 성질을 익혀요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <PolygonAreaExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
