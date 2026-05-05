import { notFound } from 'next/navigation';
import { ChemicalEquationBalancer } from '@/components/interactive/science/ChemicalEquationBalancer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'S9-MA-01';

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
          화학반응은 「원자의 재배열」이에요. 원자가 새로 만들어지지도, 사라지지도 않아요. 반응 전·후
          원자 수와 종류가 똑같아야 「균형 맞춘 화학반응식」이에요.
        </p>
      </SectionCard>

      <SectionCard title="질량보존의 법칙 (라부아지에, 1789)">
        <p>
          반응물의 총질량 = 생성물의 총질량. 닫힌 용기에서 화학반응이 일어나면 「무게가 변하지 않아요」.
          나무가 타면 가벼워 보이지만 실제로는 빠져나간 수증기·CO₂의 질량까지 합치면 일정해요.
        </p>
      </SectionCard>

      <SectionCard title="화학반응식 균형 맞추기">
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <ChemicalEquationBalancer />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard title="일정 성분비의 법칙">
        <p>
          한 화합물을 구성하는 성분 원소의 질량비는 항상 일정해요. 물(H₂O)은 어디에서 만들든 H:O = 1:8.
          이게 「화합물」과 「혼합물」을 구분하는 결정적 차이예요.
        </p>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
