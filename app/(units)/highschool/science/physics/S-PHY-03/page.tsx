import { notFound } from 'next/navigation';
import { EnergyTransformExplorer } from '@/components/interactive/science/highschool/EnergyTransformExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'S-PHY-03';

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
          에너지는 <strong>"형태가 달라도 총량은 일정"</strong>한 양이에요.
          높이를 잃으면 속도를 얻고, 마찰이 있으면 일부가 열이 돼요.
          <strong>에너지 보존</strong>은 우주를 관통하는 가장 강력한 법칙 중 하나예요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 일과 에너지 정리">
        <p>
          힘이 한 일 W = F·d·cosθ. 이 일은 곧 운동에너지의 변화 ΔK = ½mv² - ½mv₀².
          중력이 한 일은 위치에너지의 변화 -ΔU = -mg·Δh와 같아요.
          마찰이 없으면 K + U = const. 이게 <strong>역학적 에너지 보존 법칙</strong>이에요.
          마찰이 있으면 빠진 에너지만큼 정확히 열로 전환돼요(에너지 보존은 그래도 성립).
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "롤러코스터는 에너지를 잃는다" — 마찰 무시하면 안 잃어요. 위치 ↔ 운동 사이에서 형태만 바뀝니다.
          ❌ "더 무거운 물체가 더 빨리 떨어진다" — 같은 높이에서 속도는 √(2gh). 질량 무관(공기저항 무시).
          ❌ "일을 했으니 힘은 무조건 있다" — 우주에서 떠다니는 위성은 등속운동. 힘은 있지만 일은 0.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          댐 발전은 위치에너지 → 운동에너지 → 전기에너지 변환의 정석.
          미끄럼틀의 끝 속도는 시작 높이로 결정. 자동차 정지거리는 운동에너지 ½mv²에 비례 — 속도 2배 → 거리 4배.
          수능 「역학과 에너지」 단원에서 가장 출제 빈도 높은 주제예요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <EnergyTransformExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
