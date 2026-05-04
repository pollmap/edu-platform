import { notFound } from 'next/navigation';
import { ForceVectorExplorer } from '@/components/interactive/science/ForceVectorExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'S7-ME-01';

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
          힘은 물체의 <strong>운동 상태나 모양을 변화시키는 원인</strong>이에요. 크기와 방향이 모두 있어 화살표(벡터)로 그려요.
          중력·마찰력·탄성력·부력은 일상에서 가장 흔히 만나는 4가지 힘이에요.
        </p>
      </SectionCard>

      <SectionCard title="핵심 원리 — 4가지 힘">
        <p>
          <strong>중력</strong>은 지구가 모든 물체를 끌어당기는 힘으로, 항상 지구 중심을 향해요. 무게(N) = 질량(kg) × g(≈ 9.8 m/s²).
          <strong>마찰력</strong>은 두 면이 서로 미끄러지지 않게 막는 힘으로, 운동 방향과 반대로 작용해요.
          <strong>탄성력</strong>은 늘어나거나 압축된 물체가 원래 모양으로 돌아가려는 힘으로, 변형 방향의 반대로 작용하고 변형이 클수록 커져요(F = -kx).
          <strong>부력</strong>은 액체·기체에 잠긴 물체를 위로 떠받치는 힘으로, 잠긴 부피에 비례해요. 부력 ≥ 중력 이면 뜨고, 부력 &lt; 중력 이면 가라앉아요.
        </p>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <ul className="list-disc list-inside space-y-1">
          <li>&quot;무게와 질량은 같다&quot; → 질량은 물체 자체의 양(kg), 무게는 그 물체에 작용하는 중력(N)이에요. 달에서는 질량은 그대로지만 무게는 약 1/6로 줄어요.</li>
          <li>&quot;마찰력은 항상 나쁘다&quot; → 마찰력 덕분에 우리가 걸을 수 있고, 자동차가 멈출 수 있어요. 빙판이 위험한 이유는 마찰력이 작기 때문이에요.</li>
          <li>&quot;가벼운 물체가 빨리 뜬다&quot; → 부력은 잠긴 부피로 결정돼요. 같은 부피라도 평균 밀도가 물보다 작으면 떠요. 쇠로 만든 배가 뜨는 이유는 안이 비어 평균 밀도가 낮기 때문이에요.</li>
          <li>&quot;정지한 물체에는 힘이 작용하지 않는다&quot; → 책상 위 책에는 중력 ↓ 와 책상의 수직항력 ↑ 가 작용해요. 두 힘이 균형을 이뤄 정지해 있을 뿐이에요.</li>
        </ul>
      </SectionCard>

      <SectionCard title="실생활 속 힘">
        <ul className="list-disc list-inside space-y-1">
          <li>자동차 브레이크 = 마찰력으로 운동을 멈춤. 비 오는 날 정지거리가 길어지는 이유.</li>
          <li>스프링 저울·체중계 = 탄성력으로 무게(중력) 측정.</li>
          <li>잠수함은 물탱크에 물을 채우거나 빼서 부력을 조절해 떠오르고 가라앉아요.</li>
          <li>번지점프 줄·자전거 안장·매트리스 = 모두 탄성을 이용한 도구예요.</li>
        </ul>
      </SectionCard>

      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <ForceVectorExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
