import { notFound } from 'next/navigation';
import { QuadraticFunctionExplorer } from '@/components/interactive/math/QuadraticFunctionExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'M9-CR-03';

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
          일차함수가 직선이라면, 이차함수는 <strong>포물선</strong>입니다. 공을 던졌을 때 그리는
          궤적이 바로 이차함수의 모양이에요.
        </p>
      </SectionCard>

      <SectionCard title="본질">
        <p>
          이차함수는{' '}
          <code className="px-1 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded text-sm">
            y = ax² + bx + c
          </code>{' '}
          형태입니다. 세 매개변수{' '}
          <code className="px-1 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded text-sm">a, b, c</code>가
          곡선의 모양을 결정해요.
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>a</strong>: 곡선의 폭과 방향 (위로/아래로 볼록)
          </li>
          <li>
            <strong>b</strong>: 꼭짓점의 좌우 이동
          </li>
          <li>
            <strong>c</strong>: y축과 만나는 점
          </li>
        </ul>
      </SectionCard>

      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <QuadraticFunctionExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
