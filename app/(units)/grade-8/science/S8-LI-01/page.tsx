import { notFound } from 'next/navigation';
import { FoodWebExplorer } from '@/components/interactive/science/FoodWebExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'S8-LI-01';

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
          동물은 식물이 만든 양분을 먹어 에너지를 얻어요. 이 흐름은 <strong>생산자 → 1차 → 2차 → 3차 소비자</strong> 단계로 이어지며, 단계가 올라갈 때마다 에너지가 약 90%씩 줄어요.
        </p>
      </SectionCard>
      <SectionCard title="에너지 피라미드">
        <p>
          햇빛 → 식물(생산자) → 초식동물 → 육식동물. 한 단계 위로 갈 때 에너지의 약 10%만 전달돼요(나머지는 호흡·열로 빠짐).
          그래서 큰 육식동물(사자·호랑이·독수리)은 수가 적을 수밖에 없어요. 같은 면적에서 더 많은 에너지를 받쳐 줄 식물·초식동물이 더 많이 필요하니까요.
          이걸 <strong>10% 법칙</strong>이라고 해요(린드만 법칙).
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "더 큰 동물이 더 많은 종" — 정반대예요. 작은 곤충·세균이 압도적으로 많아요.
          ❌ "한 종이 사라져도 괜찮다" — 먹이 그물은 촘촘히 연결돼 있어요. 한 종이 사라지면 연쇄 영향이 커요.
          ❌ "최상위 포식자만 중요" — 분해자(곰팡이·세균)도 핵심. 죽은 생물을 분해해 양분을 다시 식물로 돌려보내요.
        </p>
      </SectionCard>
      <SectionCard title="실생활 속 먹이 관계">
        <p>
          농약으로 곤충을 죽이면 곤충을 먹는 새가 줄고, 새가 줄면 다시 곤충 천적이 약해져 다른 해충이 폭발할 수 있어요.
          바다에서 큰 물고기를 너무 많이 잡으면 작은 물고기가 폭증해 플랑크톤이 줄고, 결국 산소·생태 균형이 깨져요.
          내가 먹는 음식의 단계를 의식해 보면 우리도 이 그물의 한 부분이에요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <FoodWebExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
