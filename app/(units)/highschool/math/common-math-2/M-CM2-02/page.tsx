import { notFound } from 'next/navigation';
import { LinearFunctionExplorer } from '@/components/interactive/math/LinearFunctionExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-CM2-02';

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
          직선의 방정식은 <strong>「기울기 + 한 점」 또는 「두 점」</strong>으로 결정돼요.
          y = mx + k 한 식에서 m(기울기)과 k(y절편)를 읽고,
          두 직선의 평행·수직·교점은 모두 m, k 의 관계 한 줄로 설명돼요.
        </p>
      </SectionCard>

      <SectionCard title="핵심 — 식의 형태와 위치 관계">
        <p>
          ① 점-기울기형: y − y₁ = m(x − x₁). 한 점 (x₁, y₁) 과 기울기 m 으로 결정.<br />
          ② 일반형: ax + by + c = 0. 컴퓨터로 다룰 때 편함.<br />
          ③ 두 직선이 <strong>평행</strong> ⇔ 기울기가 같고 절편이 다름. <strong>일치</strong> ⇔ 기울기·절편 모두 같음.<br />
          ④ 두 직선이 <strong>수직</strong> ⇔ m₁ · m₂ = −1 (단, 둘 다 x축에 평행 X).
        </p>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <p>
          ❌ 「수직 = 기울기의 곱이 −1」 을 무조건 — x축·y축에 평행한 직선은 예외예요.<br />
          ❌ 두 직선이 만나면 무조건 한 점 — 평행이거나 일치인 경우는 「만나는 점」 의미가 달라져요.<br />
          ❌ 기울기 = (y₂ − y₁) / (x₂ − x₁) 의 분모·분자 순서 헷갈림 — y 차이를 분자에.
        </p>
      </SectionCard>

      <SectionCard title="실생활·시험 응용">
        <p>
          속도-시간 그래프, 회귀선, 이미지 처리의 직선 검출(Hough transform) — 모두 같은 직선의 식 위에서.
          수능에서는 「세 점이 일직선」, 「점·직선 거리」, 「두 직선 평행 조건」 같이 평이한 문제가 많지만,
          이 단원이 흔들리면 원·이동 단원에서 식이 안 풀려요.
        </p>
      </SectionCard>

      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <LinearFunctionExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
