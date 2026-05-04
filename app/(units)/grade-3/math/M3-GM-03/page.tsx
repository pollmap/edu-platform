import { notFound } from 'next/navigation';
import { CapacityWeightExplorer } from '@/components/interactive/math/CapacityWeightExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'M3-GM-03';

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
          <strong>들이</strong>는 통 안에 담을 수 있는 양(액체의 부피), <strong>무게</strong>는 물체가 끌어당겨지는 정도예요.
          들이는 mL·L, 무게는 g·kg으로 재요. 둘 다 <strong>1000배 단위</strong>로 묶여 있어요.
        </p>
      </SectionCard>
      <SectionCard title="왜 단위가 필요할까">
        <p>
          그냥 &ldquo;많다&rdquo;, &ldquo;무겁다&rdquo;고만 하면 사람마다 느낌이 달라요. 누구가 봐도 똑같이 비교하려면 <strong>약속된 단위</strong>가 필요해요.
          물 한 컵은 어디서나 약 200mL, 사과 한 개는 약 200g처럼 단위로 적으면 다른 사람도 같은 양을 떠올릴 수 있어요.
        </p>
      </SectionCard>
      <SectionCard title="자주 헷갈리는 점">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>들이 vs 부피</strong>: 들이는 통이 담을 수 있는 액체의 양, 부피는 물체가 차지하는 공간이에요. 비슷하지만 정확히 다른 말.</li>
          <li><strong>무게 vs 질량</strong>: 일상에선 같이 써요. 초등에선 g·kg을 쓰면 충분.</li>
          <li>&ldquo;1L = 100mL&rdquo;라고 잘못 외우는 친구가 많아요. 정답은 <strong>1L = 1000mL</strong>!</li>
        </ul>
      </SectionCard>
      <SectionCard title="실생활 속 들이·무게">
        <p>
          음료수 페트병(500mL/1.5L), 우유팩(1L), 쌀 포대(5kg/10kg), 택배 무게(kg), 약병에 적힌 mg까지 모두 들이·무게 단위예요.
          요리할 때 계량컵·계량 스푼을 쓰는 것도, 슈퍼에서 g 단위로 고기를 사는 것도 다 같은 원리.
        </p>
      </SectionCard>
      <SectionCard title="저울과 계량컵 만져 보기">
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <CapacityWeightExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
