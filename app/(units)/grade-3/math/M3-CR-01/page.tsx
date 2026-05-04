import { notFound } from 'next/navigation';
import { SequencePatternDetector } from '@/components/interactive/math/SequencePatternDetector';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'M3-CR-01';

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
          수가 늘어나는 모양에 <strong>규칙</strong>이 숨어 있어요. 1, 3, 5, 7, ... → 2씩 더하는 규칙. 2, 4, 8, 16, ... → 2를 곱하는 규칙.
        </p>
      </SectionCard>
      <SectionCard title="규칙 찾기는 수학의 첫 발걸음">
        <p>
          모든 수학은 패턴 발견에서 시작해요. 규칙을 알면 다음에 올 수를 미리 예측할 수 있어요.
          중·고등학교에서 배우는 함수·수열·미적분도 모두 이 규칙 찾기를 더 정교하게 다룬 거예요.
          예: 매일 1000원씩 모으면 30일 후 얼마? 규칙(1000씩 증가) → 답 30000원.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <SequencePatternDetector />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
