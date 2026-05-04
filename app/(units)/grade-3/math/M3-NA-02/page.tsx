import { notFound } from 'next/navigation';
import { AreaModelMultiplication } from '@/components/interactive/math/AreaModelMultiplication';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'M3-NA-02';

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
          두 자리 수 곱셈은 <strong>십의 자리와 일의 자리로 쪼개</strong> 따로 곱한 뒤 더하면 쉬워요.
          예: 23 × 4 = (20 × 4) + (3 × 4) = 80 + 12 = 92.
        </p>
      </SectionCard>
      <SectionCard title="왜 면적 모델로 그릴까?">
        <p>
          격자(면적) 모델은 <strong>곱셈이 면적 계산과 같다</strong>는 걸 보여줘요. 23 × 4 는 가로 23칸 · 세로 4칸짜리 직사각형의 칸 수와 같아요.
          이걸 십의 자리(20)와 일의 자리(3)로 쪼개면 큰 직사각형 두 개로 단순해져요. 분배법칙(<strong>(a+b)×c = ac + bc</strong>)을 그림으로 본 거예요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <AreaModelMultiplication />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
