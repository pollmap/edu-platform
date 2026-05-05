import { notFound } from 'next/navigation';
import { WorkEnergyExplorer } from '@/components/interactive/science/WorkEnergyExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'S9-ME-02';

export function generateMetadata() {
  const unit = findUnit(UNIT_ID);
  if (!unit) return {};
  return makeUnitMetadata(unit);
}

export default function Page() {
  const unit = findUnit(UNIT_ID);
  if (!unit || unit.schoolLevel === 'highschool' || unit.grade === undefined) {
    notFound();
  }

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
          높이 들면 「위치에너지」를 얻고, 빨리 움직이면 「운동에너지」를 얻어요. 마찰이 없으면 둘의 합은 항상
          일정 — 형태만 바뀌어요.
        </p>
      </SectionCard>

      <SectionCard title="일과 에너지">
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>일(W)</strong> = 힘 × 거리. 힘을 줘서 물체가 그 방향으로 움직였을 때만 일을 한 거예요.</li>
          <li><strong>위치에너지 Ep</strong> = m·g·h. 높이에 비례해요.</li>
          <li><strong>운동에너지 Ek</strong> = ½·m·v². 속도의 제곱에 비례해요.</li>
        </ul>
      </SectionCard>

      <SectionCard title="역학적 에너지 보존 시뮬레이션">
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <WorkEnergyExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard title="실전 — 롤러코스터·진자">
        <p>
          롤러코스터가 출발 지점보다 더 높이 올라가지 못하는 이유, 그네가 점점 작아지는 이유는 「마찰과 공기저항으로
          역학적 에너지가 열에너지로 빠져나가기」 때문이에요. 「에너지 보존」은 변하지 않지만, 「역학적 에너지」는 줄어요.
        </p>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
