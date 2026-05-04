import { notFound } from 'next/navigation';
import { HigherDegreeEquationExplorer } from '@/components/interactive/math/HigherDegreeEquationExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-CM1-07';

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
          삼·사차 방정식과 부등식, 그리고 절댓값이 들어간 식 — 모두 <strong>「인수분해 → 그래프로 부호 판단」</strong>으로 통일돼요.
          식이 복잡해 보여도, 실근에서 부호가 바뀐다는 직관이 있으면 부등식 풀이가 단순해져요.
        </p>
      </SectionCard>

      <SectionCard title="핵심 — 인수분해와 부호표">
        <p>
          ① <strong>고차 방정식</strong>: 인수정리(P(a) = 0)로 한 인수 (x − a) 를 찾고, 조립제법으로 차수를 낮춤.<br />
          ② <strong>고차 부등식</strong>: 인수분해한 뒤 각 인수의 부호 변화를 표로 정리. 그래프로 보면 x축 위/아래 영역.<br />
          ③ <strong>절댓값 부등식</strong>: |x − a| &lt; b ⇔ −b &lt; x − a &lt; b. 정의로 풀거나, 구간을 나눠서 풂.
        </p>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <p>
          ❌ 「양변에 절댓값을 씌우거나 제곱」을 부주의하게 — 음수 부등호의 방향이 바뀌어요.<br />
          ❌ 부등식의 양변에 음수를 곱하고 부호 변경을 잊음.<br />
          ❌ 인수분해 후 「겹친 근」에서 부호가 안 바뀌는 점을 놓침. (x − 1)²(x + 2) 에서 x = 1 은 부호 안 바뀜.
        </p>
      </SectionCard>

      <SectionCard title="실생활·시험 응용">
        <p>
          최적화 문제(어떤 구간에서 비용이 일정 값 이하?), 신호의 임계값 분석, 통계의 신뢰구간 — 모두 부등식 풀이 위에서 작동해요.
          수능에서는 「부등식의 해 + 정수해 개수」 결합 문제가 자주 나와요.
          아래 그래프로 삼차 그래프의 0점·부호를 직접 확인해 보세요.
        </p>
      </SectionCard>

      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <HigherDegreeEquationExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
