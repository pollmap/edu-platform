import { notFound } from 'next/navigation';
import { DebateStructureExplorer } from '@/components/interactive/korean/DebateStructureExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'K-LS-01';

export function generateMetadata() {
  const unit = findUnit(UNIT_ID);
  return unit ? makeUnitMetadata(unit) : {};
}

export default function Page() {
  const unit = findUnit(UNIT_ID);
  if (!unit) notFound();

  return (
    <main className="container mx-auto max-w-5xl px-4 py-8">
      <UnitHeader
        unit={unit}
        breadcrumb={[
          { label: '홈', href: '/' },
          { label: `학년 공통 / ${SUBJECT_LABEL[unit.subject]}`, href: `/common/${unit.subject}` },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          토론은 말다툼이 아니에요. <strong>입론 → 교차 질의 → 반론 → 최종 변론</strong> 4단계로
          정해진 구조 안에서 주장을 검증하는 활동이에요.
        </p>
      </SectionCard>
      <SectionCard title="토론 vs 토의 — 뭐가 달라?">
        <p>
          <strong>토론(debate)</strong>은 찬성·반대로 나뉘어 한 쪽이 옳음을 증명하는 활동이고,
          <strong>토의(discussion)</strong>는 같은 목표를 가진 사람들이 함께 좋은 답을 찾아가는 활동이에요.
          학교 회의는 대부분 토의에 가까워요. 발표는 그 결과를 다른 사람에게 명확히 전하는 단계예요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <DebateStructureExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
