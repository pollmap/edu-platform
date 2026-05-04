import { notFound } from 'next/navigation';
import { ModernPhysicsExplorer } from '@/components/interactive/science/highschool/ModernPhysicsExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'S-PHY-07';

export function generateMetadata() {
  const unit = findUnit(UNIT_ID);
  return unit ? makeUnitMetadata(unit) : {};
}

export default function Page() {
  const unit = findUnit(UNIT_ID);
  if (!unit) notFound();

  return (
    <main className="container mx-auto max-w-5xl px-4 py-8">
      <UnitHeader
        unit={unit}
        breadcrumb={[
          { label: '홈', href: '/' },
          { label: '고등학교', href: '/highschool' },
          { label: '물리학' },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          20세기 물리 혁명은 두 기둥에서 출발했어요 — <strong>빛이 입자처럼 행동한다는 양자역학</strong>과
          <strong>시공간이 관찰자에 따라 다르다는 상대성이론</strong>. 둘 다 일상에서는 안 보이지만,
          GPS·반도체·LED·태양광 발전 모두 이 이론들이 없으면 작동 못 해요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 광전효과와 시간 팽창">
        <p>
          광전효과: 빛 에너지 E = hf. 이 에너지가 일함수 W보다 커야 전자가 튀어나와요.
          밝기(광자 수)가 아무리 커도 진동수가 낮으면 안 나옴 — 빛의 입자성 증거(아인슈타인 1905, 노벨상).
          상대성: 빠르게 움직이는 시계는 느리게 가요. γ = 1/√(1-v²/c²).
          v=0.87c면 γ≈2 (시간이 절반 속도).
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "빛이 강하면 전자가 더 많이 튀어나온다" — 전자 <strong>수</strong>는 늘어요. 하지만 <strong>운동에너지</strong>는 진동수만 결정.
          ❌ "빠르게 움직이면 내 시계도 내가 느낀다" — 자기 시계는 항상 정상. 외부 관측자가 봤을 때만 느려져요.
          ❌ "상대성은 일상과 무관" — GPS 위성은 매일 38 마이크로초씩 보정해야 정확. 안 하면 위치오차 11km.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          태양광 패널은 광전효과의 상업화. LED는 양자역학적 띠 구조 결과.
          MRI는 핵스핀의 양자 거동을 활용. 입자가속기는 상대성 보정 필수.
          수능 「전자기와 양자」 마지막 단원. 광전효과 그래프 해석 + 시간 팽창 계산 문제가 정형 패턴.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <ModernPhysicsExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
