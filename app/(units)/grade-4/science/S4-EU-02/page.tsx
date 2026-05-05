import { notFound } from 'next/navigation';
import { WaterCycleExplorer } from '@/components/interactive/science/WaterCycleExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'S4-EU-02';

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
          지구 위 물은 <strong>사라지지 않고 모양을 바꾸며 돌아요</strong>. 바다·강에서 하늘로 올라갔다가 비·눈으로 다시
          땅에 내려와 강을 따라 바다로 돌아가요. 이 끊임없는 흐름을 <strong>물의 순환</strong>이라고 해요.
        </p>
      </SectionCard>
      <SectionCard title="네 단계로 보는 물의 여행">
        <p>
          <strong>① 증발</strong> — 햇빛이 바다·강·호수의 물을 데우면 물 알갱이가 수증기로 바뀌어 위로 올라가요.{' '}
          <strong>② 응결</strong> — 높은 곳은 차가워서 수증기가 작은 물방울로 다시 변해요. 모이면 구름이 돼요.{' '}
          <strong>③ 강수</strong> — 구름 속 물방울이 무거워지면 비·눈으로 떨어져요.{' '}
          <strong>④ 흐름</strong> — 땅에 떨어진 물은 강을 따라 흐르거나 땅속으로 스며들어 결국 바다로 돌아가요. 이 과정이 끊임없이 반복돼요.
        </p>
      </SectionCard>
      <SectionCard title="자주 헷갈리는 점">
        <ul className="list-disc pl-5 space-y-1">
          <li>지구의 물 양은 <strong>거의 일정</strong>해요. 새로 생기지도, 사라지지도 않아요.</li>
          <li>증발과 끓음은 달라요. 증발은 100°C가 아니어도 천천히 일어나요(빨래 마름 = 증발).</li>
          <li>비는 구름에서 바로 떨어지는 게 아니라, 작은 물방울이 합쳐 무거워졌을 때 떨어져요.</li>
        </ul>
      </SectionCard>
      <SectionCard title="실생활 속 물의 순환">
        <p>
          빨래가 마르고, 차가운 음료수 컵 겉면에 물방울이 맺히고, 새벽에 풀잎에 이슬이 생기고, 안개가 끼는 일 모두 같은 원리예요.
          댐과 정수장은 자연의 순환에서 깨끗한 물을 모아 우리에게 보내주는 시설이에요. 지구의 물 중 우리가 마실 수 있는 깨끗한
          민물은 3%뿐. 그래서 물을 아껴 써야 해요.
        </p>
      </SectionCard>
      <SectionCard title="물의 순환 살펴보기">
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <WaterCycleExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
