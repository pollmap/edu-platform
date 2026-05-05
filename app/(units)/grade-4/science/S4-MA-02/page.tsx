import { notFound } from 'next/navigation';
import { MixtureSeparationExplorer } from '@/components/interactive/science/MixtureSeparationExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'S4-MA-02';

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
          <strong>혼합물</strong>은 두 가지 이상이 섞여 있는 것이에요. 섞여 있어도 각자의 성질은 그대로 남아 있어서,
          <strong>다른 점</strong>(크기·무게·녹는 정도·자석에 붙는지)을 이용하면 다시 나눌 수 있어요.
        </p>
      </SectionCard>
      <SectionCard title="어떻게 나눌 수 있을까">
        <p>
          알갱이 크기가 다르면 <strong>체</strong>로 거를 수 있어요(콩과 모래). 한쪽이 자석에 붙으면 <strong>자석</strong>으로
          끄집어내요(쇳가루와 흙). 한쪽만 물에 녹으면 녹여서 <strong>거름종이</strong>로 거른 뒤, 거른 물을 햇볕에 말려요(소금과 모래).
          기름과 물처럼 무게가 다르면 가벼운 쪽이 위로 떠서 <strong>분리 깔때기</strong>로 따로 받을 수 있어요.
          어떤 방법을 쓸지는 두 물질의 가장 큰 차이가 무엇인가에 달렸어요.
        </p>
      </SectionCard>
      <SectionCard title="자주 헷갈리는 점">
        <ul className="list-disc pl-5 space-y-1">
          <li>혼합물과 화합물은 달라요. 화합물(물·소금)은 분해하지 않으면 다시 나눌 수 없어요. 혼합물은 <strong>물리적</strong>으로 나눌 수 있어요.</li>
          <li>소금물은 혼합물이에요. 소금이 보이지 않아도 분리하면 다시 나타나요.</li>
          <li>여과(거름)는 <strong>고체와 액체</strong>를 나누는 방법. 두 액체는 거름종이로 못 나눠요.</li>
        </ul>
      </SectionCard>
      <SectionCard title="실생활 속 혼합물 분리">
        <p>
          정수장은 모래·자갈·숯으로 물을 걸러요. 광산에서는 자석으로 철광석을 분리해요. 천일염은 바닷물을 햇볕과 바람으로 증발시켜
          소금을 얻어요. 폐기물 재활용 공장도 자석·바람·물 비중을 이용해 종류별로 분리해요.
        </p>
      </SectionCard>
      <SectionCard title="분리 방법 골라 보기">
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <MixtureSeparationExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
