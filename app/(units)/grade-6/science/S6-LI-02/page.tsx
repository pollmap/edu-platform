import { notFound } from 'next/navigation';
import { PhotosynthesisExplorer } from '@/components/interactive/science/PhotosynthesisExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'S6-LI-02';

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
          식물은 잎의 엽록체에서 <strong>햇빛 + 물 + 이산화탄소</strong>를 받아
          <strong>포도당과 산소</strong>를 만들어요. 이 과정을 <strong>광합성</strong>이라고 해요.
          식물은 스스로 양분을 만들 수 있는 <strong>생산자</strong>예요.
        </p>
      </SectionCard>
      <SectionCard title="우리가 숨 쉬는 산소는 어디서 왔을까?">
        <p>
          지구에 산소가 가득한 이유는 식물이 광합성을 하면서 산소를 내보내기 때문이에요.
          숲과 바다의 식물·플랑크톤이 매년 엄청난 양의 산소를 만들어 줘요. 식물이 사라지면 우리도 숨 쉬기 어려워요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <PhotosynthesisExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
