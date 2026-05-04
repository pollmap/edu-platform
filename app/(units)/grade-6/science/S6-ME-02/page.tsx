import { notFound } from 'next/navigation';
import { CircuitBuilder } from '@/components/interactive/science/CircuitBuilder';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'S6-ME-02';

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
          전기는 <strong>닫힌 길(회로)</strong>을 따라 흘러요. 길이 끊기면 흐르지 않아요. 회로를 잇는 방법에 따라 <strong>직렬</strong>과 <strong>병렬</strong>이 있고, 두 방식은 작동이 완전히 달라요.
        </p>
      </SectionCard>

      <SectionCard title="핵심 원리 — 회로의 두 모양">
        <p>
          <strong>직렬연결</strong>은 전구를 한 줄로 이어 붙이는 방식이에요. 전류는 한 길로만 흐르므로, 어느 한 곳이라도 끊기면 모든 전구가 꺼져요. 전압이 여러 전구에 나눠 걸리니 한 전구당 어두워져요.
          <strong>병렬연결</strong>은 갈래길처럼 여러 갈래로 나눠 잇는 방식이에요. 각 전구는 따로 길을 갖고 있어서 한 전구가 끊겨도 다른 전구는 그대로 켜져요. 전압도 각 갈래에 똑같이 걸려서 같은 밝기로 빛나요.
        </p>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <ul className="list-disc list-inside space-y-1">
          <li>&quot;전류는 (+) 단자에서 나와 (-) 단자로만 흐른다&quot; → 약속된 방향이 그렇긴 하지만, 실제로 전자는 (-)에서 (+)로 움직여요. 약속(관습적 전류)과 실제(전자 흐름)가 반대예요.</li>
          <li>&quot;전구가 닳으면 전구 안의 무언가가 줄어든다&quot; → 전류가 줄어드는 게 아니라, 필라멘트가 서서히 끊어지는 거예요. 전류는 회로를 따라 들어온 만큼 그대로 나가요.</li>
          <li>&quot;직렬이 더 밝다&quot; → 같은 건전지로 같은 수의 전구를 연결하면 <strong>병렬이 더 밝아요</strong>. 각 전구에 전압이 온전히 걸리거든요.</li>
        </ul>
      </SectionCard>

      <SectionCard title="실생활 속 회로">
        <ul className="list-disc list-inside space-y-1">
          <li>집안 콘센트는 모두 <strong>병렬</strong>이에요 — 한 방 전등을 꺼도 다른 방은 켜져 있는 이유.</li>
          <li>옛날 크리스마스 트리 전구는 직렬이라 한 알만 끊어져도 전체가 꺼졌어요. 요즘은 병렬이라 한 알 나가도 멀쩡해요.</li>
          <li>리모컨 건전지 두 개는 직렬 — 1.5V + 1.5V = 3V 로 전압을 더 키워 써요.</li>
          <li>두꺼비집의 차단기는 너무 큰 전류가 흐르면 회로를 끊어 화재를 막아요.</li>
        </ul>
      </SectionCard>

      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <CircuitBuilder />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
