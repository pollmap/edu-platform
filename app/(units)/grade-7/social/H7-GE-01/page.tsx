import { notFound } from 'next/navigation';
import { WorldContinentExplorer } from '@/components/interactive/social/WorldContinentExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'H7-GE-01';

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
          지구 육지는 <strong>아시아 · 아프리카 · 유럽 · 북아메리카 · 남아메리카 · 오세아니아</strong> 6대륙으로 나뉘어요. 각 대륙은 면적·인구·기후·문화가 모두 달라요.
        </p>
      </SectionCard>
      <SectionCard title="대륙은 왜 6개일까?">
        <p>
          지질학적으로는 7개(남극 포함)지만 인문지리에서는 사람이 사는 6대륙으로 자주 분류해요.
          유럽과 아시아는 한 덩어리(유라시아)지만 역사·문화 차이가 커서 따로 다뤄요. 호주·뉴질랜드·태평양 섬은 묶어서 오세아니아로 분류해요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <WorldContinentExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
