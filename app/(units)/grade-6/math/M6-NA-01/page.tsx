import { notFound } from 'next/navigation';
import { FractionDivisionExplorer } from '@/components/interactive/math/FractionDivisionExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'M6-NA-01';

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
          분수로 나누는 것은 <strong>그 분수의 역수를 곱하는 것</strong>과 같아요. <code>(a/b) ÷ (c/d) = (a/b) × (d/c)</code>.
        </p>
      </SectionCard>
      <SectionCard title="왜 역수를 곱하지?">
        <p>
          나누기는 “몇 번 들어가느냐”를 묻는 연산이에요. 1 안에 1/2 은 2번 들어가니 <strong>1 ÷ 1/2 = 2</strong>. 분모를 1로 만들기 위해 같은 수의 곱을 쓰는데, 그 수가 바로 <strong>역수</strong>예요. 이렇게 나눗셈을 곱셈으로 바꾸면 계산이 단순해집니다.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <FractionDivisionExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
