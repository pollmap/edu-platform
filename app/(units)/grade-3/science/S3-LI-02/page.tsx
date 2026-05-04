import { notFound } from 'next/navigation';
import { AnimalHabitatExplorer } from '@/components/interactive/science/AnimalHabitatExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'S3-LI-02';

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
          식물의 한살이는 <strong>씨앗 → 싹 → 자라기 → 꽃 → 열매·씨앗</strong> 순환이에요. 이 과정을 통해 식물은 다음 세대로 이어져요.
        </p>
      </SectionCard>
      <SectionCard title="씨앗에서 새 식물까지">
        <p>
          씨앗은 흙·물·따뜻함이 갖춰지면 싹을 틔워요. 떡잎이 먼저 나오고 본잎이 자라요.
          뿌리는 물과 양분을 빨아들이고, 줄기는 잎으로 연결해 주고, 잎은 햇빛을 받아 양분을 만들어요.
          꽃이 피면 곤충·바람이 꽃가루를 옮겨 수정이 되고, 그 자리에 열매와 씨앗이 만들어져요.
          새 씨앗이 다시 땅에 떨어져 한살이가 반복돼요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "씨앗 안에 작은 식물이 들어있다" — 씨앗 안에는 어린 식물의 시작 부분(배)과 양분(배젖)만 있어요. 줄기·잎은 자라면서 새로 만들어져요.
          ❌ "꽃은 예쁘기만 한 장식" — 꽃은 식물의 생식기관이에요. 곤충·바람을 부르려고 화려한 색·향기를 가져요.
          ❌ "모든 식물은 씨앗으로 번식" — 고사리는 포자, 감자·튤립은 뿌리·구근으로도 번식해요.
        </p>
      </SectionCard>
      <SectionCard title="실생활 속 식물 한살이">
        <p>
          쌀·밀·콩·옥수수 — 우리가 먹는 곡식은 모두 식물의 씨앗이에요.
          벚꽃이 피고 지면 그 자리에 버찌(작은 열매), 사과나무 꽃이 지면 사과가 자라요.
          텃밭에 무·상추·방울토마토를 직접 심어 보면 한살이가 한눈에 들어와요. 지구상 식물이 사라지면 모든 동물이 굶어요(생산자 역할).
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <AnimalHabitatExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
