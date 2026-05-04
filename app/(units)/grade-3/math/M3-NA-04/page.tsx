import { notFound } from 'next/navigation';
import { FractionMeaningExplorer } from '@/components/interactive/math/FractionMeaningExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'M3-NA-04';

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
          분수 <strong>n/d</strong> 는 “전체를 똑같이 d 조각으로 나눈 것 중에서 n 조각”이라는 뜻이에요. 피자, 케이크, 색종이 같은 일상 물건을 떠올리면 쉬워요.
        </p>
      </SectionCard>
      <SectionCard title="왜 분수가 필요한가">
        <p>
          1보다 작은 양을 자연수로는 표현할 수 없어요. 사과 하나를 둘이 똑같이 나누면 한 사람이 받는 양은 1도 0도 아닌 <strong>1/2</strong>입니다. 분수는 “나눠진 양”을 정확하게 적는 도구예요.
        </p>
      </SectionCard>
      <SectionCard title="동치분수가 뭐야?">
        <p>
          1/2 과 2/4 는 다르게 생겼지만 가리키는 양은 같아요. 막대를 두 조각으로 나눈 것 중 하나, 네 조각으로 나눈 것 중 둘은 길이가 같으니까요. 이렇게 같은 양을 다르게 적은 분수를 <strong>동치분수</strong>라고 합니다.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <FractionMeaningExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
