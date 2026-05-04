import { notFound } from 'next/navigation';
import { FractionAddSubExplorer } from '@/components/interactive/math/FractionAddSubExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'M5-NA-03';

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
          <strong>약분</strong>은 분자·분모를 같은 수로 나눠 분수를 간단히 만드는 것 (4/8 = 1/2),
          <strong>통분</strong>은 분모를 같게 만드는 것 (1/2 + 1/3 → 3/6 + 2/6).
        </p>
      </SectionCard>
      <SectionCard title="왜 둘 다 필요할까?">
        <p>
          약분은 답을 깔끔하게 정리할 때, 통분은 분모가 다른 분수를 더하거나 뺄 때 필수예요.
          둘 다 <strong>약수와 배수</strong>(M5-NA-02)를 잘 알아야 빠르게 할 수 있어요.
          최대공약수로 약분, 최소공배수로 통분 — 약수·배수가 분수의 핵심 도구예요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <FractionAddSubExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
