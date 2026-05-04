import { notFound } from 'next/navigation';
import { OrderOfOperationsTrainer } from '@/components/interactive/math/OrderOfOperationsTrainer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'M5-NA-01';

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
          한 식에 +, −, ×, ÷ 가 섞여 있으면 <strong>괄호 → ×, ÷ → +, −</strong> 순으로 계산해요.
          같은 우선순위는 <strong>왼쪽부터</strong>.
        </p>
      </SectionCard>
      <SectionCard title="왜 순서가 중요할까?">
        <p>
          12 + 3 × 4 를 왼쪽부터 그냥 계산하면 (12 + 3) × 4 = 60 이지만, 정답은 12 + (3 × 4) = 24 예요.
          순서가 다르면 답이 완전히 달라져요. 모두가 같은 답에 도달하려면 약속이 필요했고, 수학자들이 정한 약속이 <strong>괄호 → ×÷ → +−</strong>예요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <OrderOfOperationsTrainer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
