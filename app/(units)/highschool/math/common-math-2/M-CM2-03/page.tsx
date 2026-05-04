import { notFound } from 'next/navigation';
import { CircleEquationExplorer } from '@/components/interactive/math/CircleEquationExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-CM2-03';

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
          원의 방정식 <strong>(x − a)² + (y − b)² = r²</strong> 은 「중심 (a, b) 에서 거리가 r 인 점들」 이라는 정의를 그대로 식으로 옮긴 거예요.
          직선과의 위치 관계(만나지 않음 / 접함 / 두 점)는 <strong>중심에서 직선까지의 거리 d</strong> 와 반지름 r 만 비교하면 끝나요.
        </p>
      </SectionCard>

      <SectionCard title="핵심 — 표준형과 일반형">
        <p>
          ① 표준형: (x − a)² + (y − b)² = r². 중심·반지름이 한눈에.<br />
          ② 일반형: x² + y² + Dx + Ey + F = 0. 평방완성하면 표준형으로 변환.<br />
          ③ 직선 ax + by + c = 0 까지 점 (x₀, y₀) 의 거리: |ax₀ + by₀ + c| / √(a² + b²).<br />
          ④ d &lt; r → 두 점, d = r → 접함, d &gt; r → 만나지 않음.
        </p>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <p>
          ❌ x² + y² + Dx + Ey + F = 0 을 무조건 원으로 — D²/4 + E²/4 − F &gt; 0 이어야 실제 원이에요.<br />
          ❌ 「원과 직선 교점」 풀 때 식 두 개를 동시에 안 다룸 — 직선식을 원식에 대입해 이차방정식으로 풀어야 해요.<br />
          ❌ 점-직선 거리 공식의 분모 √(a² + b²) 빠뜨림.
        </p>
      </SectionCard>

      <SectionCard title="실생활·시험 응용">
        <p>
          GPS·통신의 도달 범위, 레이더, 자율주행 차량의 충돌 회피(원형 안전 거리) — 모두 「원과 직선·원과 원」 위치 관계.
          수능에서는 「원의 방정식 + 직선의 절편」 결합 문제가 단골이고,
          공통수학2 마지막 단원(도형의 이동) 직전에 익혀 둬야 변환이 자연스러워요.
        </p>
      </SectionCard>

      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <CircleEquationExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
