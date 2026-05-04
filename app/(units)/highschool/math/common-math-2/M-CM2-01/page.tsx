import { notFound } from 'next/navigation';
import { PlaneCoordinateExplorer } from '@/components/interactive/math/PlaneCoordinateExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-CM2-01';

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
          평면좌표는 <strong>도형을 식으로 다루는 출발점</strong>이에요.
          두 점 사이의 거리·중점·내분점·외분점 — 단 네 가지 공식만으로 평면의 거의 모든 위치 문제가 풀려요.
          공통수학2 의 직선·원·이동 단원 모두 이 네 공식 위에 쌓여요.
        </p>
      </SectionCard>

      <SectionCard title="핵심 — 거리·중점·내분·외분">
        <p>
          ① <strong>거리</strong>: |AB| = √((x₂ − x₁)² + (y₂ − y₁)²) — 피타고라스 그대로.<br />
          ② <strong>중점</strong>: M = ((x₁ + x₂)/2, (y₁ + y₂)/2).<br />
          ③ <strong>m:n 내분점</strong>: P = ((m·x₂ + n·x₁)/(m + n), (m·y₂ + n·y₁)/(m + n)).<br />
          ④ <strong>m:n 외분점</strong>: Q = ((m·x₂ − n·x₁)/(m − n), …). m = n 이면 외분점은 정의 안 됨.
        </p>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <p>
          ❌ 내분점 공식에서 분자의 가중치를 거꾸로 — m:n 이면 「B 쪽에 m, A 쪽에 n」이 곱해져요.<br />
          ❌ 외분점에서 부호 실수 — 분모가 m − n 이라 m &lt; n 이면 음수가 돼요.<br />
          ❌ 거리 공식에서 좌표를 빼기 전에 절댓값을 씌움 — 제곱이 들어가니 부호는 자동으로 사라져요.
        </p>
      </SectionCard>

      <SectionCard title="실생활·시험 응용">
        <p>
          GPS 좌표 두 지점 거리, 두 도시 사이의 중간 도시, 벡터의 가중평균 — 모두 같은 공식.
          수능에서는 「선분 AB 가 점 P 에서 m:n 으로 내분, 점 P 의 좌표는?」 같은 단순 적용 문제가 1번 자리에 자주 나와요.
          공식 자체보다 「m, n 의 위치」를 헷갈리지 않도록 시각적으로 익히는 게 중요해요.
        </p>
      </SectionCard>

      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <PlaneCoordinateExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
