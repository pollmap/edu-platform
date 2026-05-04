import { notFound } from 'next/navigation';
import { SeasonsExplorer } from '@/components/interactive/science/SeasonsExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'S6-EU-02';

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
          계절이 생기는 이유는 <strong>지구의 자전축이 23.5° 기울어져 있기 때문</strong>이에요.
          태양과의 거리 때문이 아니에요. 기울어진 채 태양 주위를 돌기 때문에, 같은 곳이라도
          햇빛 받는 각도가 달라져 더울 때(여름)와 추울 때(겨울)가 생겨요.
        </p>
      </SectionCard>
      <SectionCard title="여름이 더운 진짜 이유">
        <p>
          여름엔 햇빛이 거의 머리 위에서 내리쬐 같은 면적에 더 많은 에너지가 닿아요.
          반대로 겨울엔 햇빛이 비스듬히 들어와 같은 양의 에너지가 더 넓게 퍼져요. 그래서 단위 면적당
          받는 에너지가 적어 추워요. 거리는 거의 변화가 없어요(약 3% 정도).
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <SeasonsExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
