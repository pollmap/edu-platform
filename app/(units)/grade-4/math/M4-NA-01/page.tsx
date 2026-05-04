import { notFound } from 'next/navigation';
import { BigNumberPlaceValue } from '@/components/interactive/math/BigNumberPlaceValue';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'M4-NA-01';

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
          한국어는 큰 수를 <strong>4자리씩 묶어서</strong> 만·억·조 같은 단위 이름을 붙여요. 1만 = 10,000, 1억 = 1만의 1만배, 1조 = 1억의 1만배.
        </p>
      </SectionCard>
      <SectionCard title="왜 4자리씩 묶을까?">
        <p>
          한자 문화권의 전통이에요. 영어는 thousand(1,000), million(1,000,000)처럼 3자리씩 묶지만 한국어·중국어·일본어는 4자리 단위. 그래서 영문 자료 환산 때 종종 헷갈리지요.
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>10⁴ = 만</li>
          <li>10⁸ = 억 (만 × 만)</li>
          <li>10¹² = 조 (억 × 만)</li>
          <li>10¹⁶ = 경</li>
        </ul>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <BigNumberPlaceValue />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
