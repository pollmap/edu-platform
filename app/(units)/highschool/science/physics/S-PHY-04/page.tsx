import { notFound } from 'next/navigation';
import { MomentumCollisionExplorer } from '@/components/interactive/science/highschool/MomentumCollisionExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'S-PHY-04';

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
          운동량 p = mv 는 <strong>"움직임의 크기와 방향을 함께 담은 양"</strong>이에요.
          외력이 없으면 충돌 전후 운동량 합은 항상 보존돼요. 자동차 추돌 사고부터 당구공·로켓까지
          전부 같은 보존 법칙으로 설명돼요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 충격량과 충돌">
        <p>
          충격량 J = F·Δt = Δp. 같은 운동량 변화를 만들 때, 시간(Δt)을 길게 하면 힘(F)은 작아져요.
          탄성충돌은 운동에너지까지 보존, 비탄성충돌은 운동에너지 일부가 열·소리·변형으로 손실.
          완전비탄성은 충돌 후 두 물체가 붙어서 같은 속도로 움직여요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "운동량은 곧 운동에너지" — 운동량은 벡터(mv), 운동에너지는 스칼라(½mv²). 다른 양이에요.
          ❌ "비탄성 충돌은 운동량이 안 보존된다" — 운동량은 모든 충돌에서 보존. 보존 안 되는 건 운동에너지뿐.
          ❌ "에어백이 충격을 줄이는 건 힘을 흡수해서다" — 정확히는 <strong>충돌 시간 Δt를 늘려서</strong> F를 줄이는 거예요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          야구 글러브가 푹신한 이유, 번지점프 줄이 늘어나는 이유 — 모두 Δt를 늘려 F를 줄이는 충격량 원리.
          로켓이 추진되는 것도 분사 기체의 운동량 = 로켓 운동량(반대방향). 우주에선 추진제가 없으면 가속 못 해요.
          수능 「역학과 에너지」 단원의 단골 출제 주제. 표 비교형 문제 자주 나와요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <MomentumCollisionExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
