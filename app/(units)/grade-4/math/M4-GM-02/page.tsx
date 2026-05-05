import { notFound } from 'next/navigation';
import { TransformationExplorer } from '@/components/interactive/math/TransformationExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'M4-GM-02';

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
          평면 도형은 모양·크기를 그대로 둔 채 <strong>밀고(이동)·돌리고(회전)·뒤집을(대칭)</strong> 수 있어요.
          이 세 가지 움직임을 한국어로 묶어 <strong>도형의 이동</strong>이라 불러요.
        </p>
      </SectionCard>
      <SectionCard title="세 가지 이동, 무엇이 변하고 무엇이 그대로일까">
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li><strong>밀기(평행 이동)</strong> — 위치만 바뀜. 모양·크기·방향 그대로</li>
          <li><strong>돌리기(회전)</strong> — 한 점을 중심으로 빙글, 방향이 바뀜</li>
          <li><strong>뒤집기(대칭)</strong> — 거울처럼 좌우(또는 위아래)가 반대로</li>
        </ul>
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
          공통점은 <strong>크기와 모양은 변하지 않는다</strong>는 거예요. 색종이로 직접 잘라 옮겨 보면 손이 먼저 알아요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <TransformationExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
