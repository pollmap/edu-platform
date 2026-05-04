import { notFound } from 'next/navigation';
import { SupplyDemandExplorer } from '@/components/interactive/social/SupplyDemandExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'H8-SO-02';

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
          가격은 <strong>사고 싶은 사람의 양(수요)</strong>과{' '}
          <strong>팔고 싶은 사람의 양(공급)</strong>이 만나는 지점에서 정해져요. 이 지점을{' '}
          <strong>시장 균형</strong>이라고 합니다.
        </p>
      </SectionCard>
      <SectionCard title="왜 곡선이 두 개일까?">
        <p>
          가격이 <em>오르면</em> 사람들은 적게 사려 하고 (수요 ↓), 생산자는 더 많이 팔려 합니다
          (공급 ↑). 가격이 <em>내리면</em> 반대예요. 이 두 반응이 만나는 한 지점에서만 시장이
          안정돼요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <SupplyDemandExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
