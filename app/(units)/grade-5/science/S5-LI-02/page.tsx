import { notFound } from 'next/navigation';
import { FoodWebExplorer } from '@/components/interactive/science/FoodWebExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'S5-LI-02';

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
          생태계는 생산자(식물) → 1차 소비자 → 2차 소비자 → 3차 소비자 같은 <strong>먹이 관계의 그물</strong>이에요. 한 종이 사라지면 연결된 종 모두가 영향을 받아요.
        </p>
      </SectionCard>
      <SectionCard title="먹이 사슬 vs 먹이 그물">
        <p>
          먹이 사슬은 한 줄짜리 사슬: A→B→C. 그러나 자연에서는 한 종이 여러 종을 먹고 여러 종에게 먹히죠. 그래서 실제 모습은 <strong>그물</strong>에 가까워요. 그물이 촘촘할수록 한 종이 사라져도 다른 길로 에너지가 흐를 수 있어 안정적이에요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <FoodWebExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
