import { notFound } from 'next/navigation';
import { PolynomialOperationsExplorer } from '@/components/interactive/math/PolynomialOperationsExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-CM1-01';

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
          다항식은 <strong>변수와 상수의 덧셈·뺄셈·곱으로 만들어진 식</strong>이에요.
          중학교에서 다루던 일·이차식보다 차수가 더 높아질 뿐, 「같은 차수끼리 모은다」는 원리는 똑같아요.
          공통수학1 의 모든 단원이 이 다항식 위에서 펼쳐져요.
        </p>
      </SectionCard>

      <SectionCard title="핵심 — 차수와 동류항">
        <p>
          다항식 P(x)의 차수는 가장 높은 항의 차수예요. 두 다항식을 더하거나 빼면 같은 차수끼리만 모아요(<strong>동류항 정리</strong>).
          곱은 「분배법칙으로 모든 항을 곱한 뒤, 같은 차수끼리 다시 모은다」가 전부예요.
          n차와 m차의 곱은 (n + m)차가 돼요. 단, 0이 아닌 항만 살아남아요.
        </p>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <p>
          ❌ <strong>(a + b)² = a² + b²</strong> — 가운데 교차항 2ab 가 빠졌어요. 면적 모델로 보면 직사각형 두 개를 빼먹은 셈.<br />
          ❌ 「상수항도 어떤 차수의 항이다」를 잊고 곱셈에서 누락. 상수는 0차예요.<br />
          ❌ 차수가 다른 항을 함부로 더함 — x² + x ≠ x³. 동류항만 더해진다는 점을 항상 의식.
        </p>
      </SectionCard>

      <SectionCard title="실생활·시험 응용">
        <p>
          공학·물리·통계의 모형은 결국 다항식으로 시작해요. 회귀분석의 기본도 1차·2차 다항식이고,
          공학 시뮬레이션은 고차 다항식을 작은 항으로 잘라서 계산해요.
          수능에서는 「항등식 ↔ 나머지정리 ↔ 인수분해」 의 첫 단계로, 다항식 연산이 매끄럽지 않으면 그 뒤가 다 막혀요.
        </p>
      </SectionCard>

      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <PolynomialOperationsExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
