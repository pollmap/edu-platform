import { notFound } from 'next/navigation';
import { OceanCurrentExplorer } from '@/components/interactive/science/OceanCurrentExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'S8-EU-01';

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
          지구의 「수권」(물 영역) 중 97%는 바다예요. 바닷물은 가만히 있지 않고 「해류」를 따라 끊임없이 순환해요.
          한반도는 사면이 바다라서 한·난류 모두의 영향을 받는 「복합 어장」이에요.
        </p>
      </SectionCard>

      <SectionCard title="해류는 왜 흐를까?">
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>바람</strong>: 무역풍·편서풍이 표층수를 밀어요</li>
          <li><strong>지구 자전</strong>: 코리올리 효과로 북반구는 오른쪽으로 휨</li>
          <li><strong>밀도 차</strong>: 차고 짠 물은 가라앉고, 따뜻하고 묽은 물은 떠올라요 (심층 순환)</li>
        </ul>
      </SectionCard>

      <SectionCard title="한반도 주변 해류와 수온·염분">
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <OceanCurrentExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard title="조경수역의 풍요">
        <p>
          동해의 「조경수역」은 동한난류와 북한한류가 만나는 곳. 차가운 물과 따뜻한 물이 섞이며 영양분과 산소가 풍부해
          플랑크톤이 폭증하고, 그 위로 명태·오징어·정어리가 모여요. 한반도가 「물 좋은 어장」인 이유예요.
        </p>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
