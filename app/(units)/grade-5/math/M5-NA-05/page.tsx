import { notFound } from 'next/navigation';
import { FractionMultiplicationExplorer } from '@/components/interactive/math/FractionMultiplicationExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'M5-NA-05';

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
          분수의 곱셈은 <strong>분자끼리, 분모끼리</strong> 곱하면 끝이에요.
          예: <strong>2/3 × 3/4 = 6/12 = 1/2</strong>. 통분이 필요 없어요!
        </p>
      </SectionCard>
      <SectionCard title="왜 이게 자연스러울까?">
        <p>
          전체를 가로 4칸 · 세로 3칸으로 나누면 12칸이 돼요. 가로로 3/4 만큼, 세로로 2/3 만큼
          색칠하면 겹치는 부분이 6칸이에요. 그래서 <strong>2/3 × 3/4 = 6/12 = 1/2</strong>.
          격자 시뮬레이션으로 직접 확인해 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <FractionMultiplicationExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
