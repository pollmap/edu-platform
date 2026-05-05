import { notFound } from 'next/navigation';
import { QuadrilateralHierarchy } from '@/components/interactive/math/QuadrilateralHierarchy';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'M4-GM-05';

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
          <strong>다각형</strong>은 곧은 선분만으로 닫혀 있는 도형이에요. 변의 수에 따라
          삼각형(3) · 사각형(4) · 오각형(5) · 육각형(6) … 으로 이름이 정해져요.
          모든 변의 길이가 같고 모든 각이 같으면 <strong>정다각형</strong>이라고 불러요.
        </p>
      </SectionCard>
      <SectionCard title="다각형의 두 가지 분류 기준">
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li><strong>변의 수</strong> — 3·4·5·6·7…개</li>
          <li><strong>규칙성</strong> — 정다각형(모든 변·각이 같음) vs 일반 다각형</li>
        </ul>
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
          사각형 안에는 또 <strong>사다리꼴 → 평행사변형 → 직사각형 → 정사각형</strong> 같은 가족 관계가 있어요.
          포함 관계로 외워 두면 평면도형 정리가 한결 쉬워져요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <QuadrilateralHierarchy />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
