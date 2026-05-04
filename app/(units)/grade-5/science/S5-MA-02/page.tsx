import { notFound } from 'next/navigation';
import { PHIndicator } from '@/components/interactive/science/PHIndicator';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'S5-MA-02';

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
          물질을 물에 녹였을 때 <strong>신맛이 나거나 금속을 녹이면 산성</strong>, <strong>미끈거리며 단백질을 풀어내면 염기성</strong>. 이 성질의 강함을 0~14의 숫자로 적은 것이 <strong>pH</strong>예요.
        </p>
      </SectionCard>
      <SectionCard title="왜 지시약이 색이 바뀔까">
        <p>
          지시약은 산성·염기성에서 분자 모양이 달라져 빛을 흡수하는 방식이 변해요. 그래서 같은 지시약이라도 pH 에 따라 색이 다르게 보이는 거예요. 우리 눈에 색은 빠르고 직관적인 신호라 농도 측정에 유리해요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <PHIndicator />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
