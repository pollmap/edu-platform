import { notFound } from 'next/navigation';
import { WeightScaleExplorer } from '@/components/interactive/science/WeightScaleExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'S4-ME-01';

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
          <strong>무게</strong>는 지구가 물건을 끌어당기는 힘의 크기예요. 그래서 무거울수록 손이 더 아래로 당겨지고,
          저울에 더 큰 숫자가 나와요. 단위는 <strong>g(그램)</strong>과 <strong>kg(킬로그램)</strong>을 써요.
        </p>
      </SectionCard>
      <SectionCard title="저울은 두 종류">
        <p>
          <strong>양팔저울</strong>은 두 접시에 물건과 추를 올려서 어느 쪽이 더 무거운지 비교해요. 두 쪽이 수평이 되면 같은 무게.
          <strong>용수철저울</strong>은 무거울수록 용수철이 더 늘어나는 성질을 이용해요. 늘어난 만큼 눈금을 읽으면 무게가 나와요.
          전자저울은 안에 작은 용수철 같은 부품(센서)이 들어 있어서 같은 원리로 작동해요.
        </p>
      </SectionCard>
      <SectionCard title="자주 헷갈리는 점">
        <ul className="list-disc pl-5 space-y-1">
          <li>무게와 질량은 약간 달라요. 같은 물건이라도 <strong>달에서는 무게가 가벼워요</strong>(달의 중력이 약하니까). 하지만 알갱이 양(질량)은 그대로예요.</li>
          <li>1 kg = 1000 g 이에요. 1.5 kg은 1500 g.</li>
          <li>저울이 망가지지 않게 너무 무거운 물건은 큰 저울로 재요(체중계 vs 부엌저울).</li>
        </ul>
      </SectionCard>
      <SectionCard title="실생활 속 저울">
        <p>
          마트 정육 코너의 저울, 우체국 택배 저울, 병원 체중계, 학교 보건실 신장계 옆 저울 모두 같은 원리예요.
          요리할 때 정확한 양을 잴 때, 택배비를 정할 때, 약을 처방할 때 무게는 꼭 필요해요. 저울이 없던 옛날에는 사람이 손으로
          들어 올려 비교하거나, 천칭(양팔저울)을 썼어요.
        </p>
      </SectionCard>
      <SectionCard title="두 저울 비교해 보기">
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <WeightScaleExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
