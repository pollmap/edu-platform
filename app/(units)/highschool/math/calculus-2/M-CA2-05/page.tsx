import { notFound } from 'next/navigation';
import { MotionDerivativeExplorer } from '@/components/interactive/math/highschool/MotionDerivativeExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-CA2-05';

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
          위치를 시간으로 미분하면 <strong>속도</strong>, 한 번 더 미분하면 <strong>가속도</strong>.
          뉴턴이 미분을 발명한 본래 동기가 바로 이 운동 분석이에요.
          극값·변곡점이 운동에서 무엇을 의미하는지 파악하면 그래프 해석이 한 번에 풀려요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — s, v, a의 관계">
        <p>
          위치함수 s(t)에서 <strong>v(t) = s′(t)</strong>가 속도, <strong>a(t) = v′(t) = s″(t)</strong>가 가속도.
          v = 0인 순간이 운동 방향이 바뀌는 「극값」이고 (이때 위치는 최대 또는 최소).
          a = 0인 순간이 속도가 최대/최소가 되는 「변곡점」.
          오르막에서 정점 (v = 0) → 내리막으로 바뀌는 그 순간이 직관적으로 와닿는 예시예요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "속도 = 빠르기" — 속도는 부호 있는 양 (방향 포함). 빠르기는 |속도|.
          ❌ "가속도가 0이면 정지" — 정지는 v = 0. a = 0은 속도가 일정 (등속).
          ❌ "v &gt; 0이면 항상 오른쪽으로 이동" — 좌표축 정의에 따라 다르지만, 보통 + 방향이 오른쪽.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          자동차 RPM·연비·브레이크 거리, 발사체 궤적, 진자 운동 — 모두 v·a 분석이 필수.
          수능 미적분Ⅱ에서 운동·증감·극값을 함께 묻는 종합 문제가 단골 출제.
          재생 버튼을 누르면 위치·속도·가속도 그래프가 동시에 진행돼요. 어느 시점에 v = 0이 되고 운동 방향이 바뀌는지 직접 관찰해 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <MotionDerivativeExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
