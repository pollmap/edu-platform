import { notFound } from 'next/navigation';
import { SpaceVectorExplorer } from '@/components/interactive/math/highschool/SpaceVectorExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-GE-06';

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
          공간벡터는 평면벡터에 <strong>「z 성분」 한 줄을 더한 것」</strong>입니다.
          벡터 합·크기·내적의 공식 형태가 모두 동일 — 단지 항 하나만 추가될 뿐.
          이게 좋은 점: 평면에서 익힌 직관이 그대로 3차원에 옮겨 가요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 4가지 공식">
        <p>
          <strong>벡터 합</strong>: u⃗ + v⃗ = (u₁+v₁, u₂+v₂, u₃+v₃).
          <strong>크기</strong>: |u⃗| = √(u₁² + u₂² + u₃²).
          <strong>내적</strong>: u⃗·v⃗ = u₁v₁ + u₂v₂ + u₃v₃ = |u⃗||v⃗|cosθ.
          <strong>외적(고급)</strong>: u⃗ × v⃗ — 두 벡터에 모두 수직인 새 벡터. 공간벡터에서만 정의.
          내적은 「두 벡터가 얼마나 같은 방향인가」, 외적은 「두 벡터가 만든 평행사변형의 넓이·법선」.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ 「내적의 결과는 벡터」 — 내적은 스칼라(숫자) 한 개. 외적이 벡터예요.
          ❌ 「u⃗·v⃗ = 0이면 두 벡터가 영벡터」 — u⃗ ⊥ v⃗ (수직)일 때도 내적이 0. 영벡터가 아니어도 됩니다.
          ❌ 「크기가 같으면 같은 벡터」 — 방향까지 같아야 같은 벡터. 크기는 같지만 반대 방향이면 −u⃗.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          물리: 힘·속도·전기장이 모두 공간벡터. 두 힘이 이루는 각도 → cosθ는 일(W = F⃗·d⃗) 계산의 핵심.
          그래픽: 광원이 표면을 비추는 각도 = 법선 벡터 내적. 음수면 「뒷면」.
          u⃗, v⃗를 슬라이더로 움직여 보세요. yaw/pitch로 시점을 회전하면 3차원 벡터 합 (평행사변형 법칙)이 한눈에 들어옵니다.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <SpaceVectorExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
