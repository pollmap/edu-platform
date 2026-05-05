import { notFound } from 'next/navigation';
import { EnergyTransformExplorer } from '@/components/interactive/science/EnergyTransformExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'S6-ME-03';

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
          에너지는 「만들어지지도 사라지지도 않고」, 「형태만 바뀌어요」. 우리가 살아가는 모든 활동은 에너지의
          「형태 변환」이에요.
        </p>
      </SectionCard>

      <SectionCard title="에너지 보존 법칙">
        <p>
          에너지는 우주 전체로 보면 항상 일정해요. 변환할 때마다 「유용한 에너지」는 줄고 「열에너지(낭비)」가
          늘어나요. 그래서 효율 100%인 기계는 만들 수 없어요.
        </p>
      </SectionCard>

      <SectionCard title="에너지 변환 다이어그램">
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <EnergyTransformExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard title="에너지 절약은 왜 중요할까?">
        <p>
          에너지는 「변환만 가능하지 다시 모을 수는 없어요」. 한번 열로 흩어지면 「쓸모 없는 에너지」가 돼요.
          화석연료는 만드는 데 수억 년 걸리지만 태우는 데 100년이면 끝나요. 「태양·풍력·수력」은 매일 새로 들어오는
          에너지라 오래오래 쓸 수 있어요.
        </p>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
