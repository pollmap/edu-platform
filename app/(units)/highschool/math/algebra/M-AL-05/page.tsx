import { notFound } from 'next/navigation';
import { SineCosineLawExplorer } from '@/components/interactive/math/highschool/SineCosineLawExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-AL-05';

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
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          삼각함수 직각삼각형 정의를 <strong>「임의의 삼각형」</strong>으로 일반화한 두 가지 황금 공식이에요.
          코사인 법칙은 「두 변과 끼인각 → 나머지 한 변」, 사인 법칙은 「변과 마주보는 각의 비례 관계」를 알려줘요.
          측량·내비게이션·천문학에서 거리와 각을 다룰 때 가장 먼저 꺼내는 도구입니다.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 두 법칙">
        <p>
          코사인 법칙: <strong>c² = a² + b² − 2ab·cosC</strong>. C=90°이면 cosC=0이라 피타고라스 정리로 환원돼요.
          사인 법칙: <strong>a/sinA = b/sinB = c/sinC = 2R</strong>. 여기서 R은 외접원 반지름.
          모르는 정보가 「두 변+끼인각」인지 「두 각+한 변」인지에 따라 어느 법칙을 써야 할지 결정돼요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ 「sinA/A = sinB/B」 — 사인 법칙은 변과 sin 사이의 비례, 각끼리는 아니에요.
          ❌ 「코사인 법칙은 둔각삼각형에서만 쓴다」 — 모든 삼각형에 성립합니다.
          ❌ 「sinA = a」 — sin은 비율(0~1)이고 a는 길이라 단위가 달라요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          GPS 삼각측량은 두 신호기 거리·각으로 위치를 구할 때 사인·코사인 법칙을 결합해요.
          수능 「대수」에서 삼각함수 단원의 단골: 각 슬라이더를 움직이며 c가 어떻게 변하는지 직접 관찰해 보세요.
          C=90°에서 코사인 항이 사라지는 순간을 꼭 확인해야 해요 (피타고라스로 회귀).
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <SineCosineLawExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
