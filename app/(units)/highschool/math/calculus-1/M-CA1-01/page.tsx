import { notFound } from 'next/navigation';
import { FunctionLimitExplorer } from '@/components/interactive/math/highschool/FunctionLimitExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-CA1-01';

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
          극한은 <strong>「x가 a에 한없이 가까워질 때 함숫값이 어디로 가나」</strong>를 묻는 도구예요.
          미분과 적분, 그리고 미적분 전체의 토대가 되는 가장 기본 개념.
          극한은 「도착하는 값」이지 「실제로 도달하는 값」이 아니라는 점이 가장 중요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 좌극한·우극한·극한 존재">
        <p>
          x가 a보다 작은 쪽에서 다가갈 때 「<strong>좌극한 lim x→a⁻</strong>」, 큰 쪽에서 다가갈 때
          「<strong>우극한 lim x→a⁺</strong>」. 두 값이 같아야 비로소 「x → a에서 극한이 존재한다」고 말해요.
          존재하지 않는 경우는 점프 (좌≠우), 발산 (∞로 가는 경우), 진동 (값이 두 점 사이를 무한 진동) 셋.
          극한값과 함숫값 f(a)는 다를 수 있어요 (제거 가능한 불연속 등).
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "lim x→a f(x) = f(a)" — 항상 그렇지는 않음. 두 값이 일치할 때만 「연속」이라 부름.
          ❌ "0/0이면 극한이 없다" — 「부정형」일 뿐, 인수분해·유리화로 풀어내면 값이 나오는 경우가 많아요.
          ❌ "x가 무한대일 때만 극한이라 한다" — x가 유한값에 다가가는 극한이 더 기본.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          미분계수의 정의 lim h→0 [f(a+h) − f(a)] / h가 바로 극한의 응용이에요.
          수능 미적분에서는 부정형 (0/0, ∞/∞, ∞ − ∞)의 극한 계산이 매년 나와요.
          4가지 케이스 (연속·점프·발산·진동)를 버튼으로 바꿔 가며 그래프 패턴을 눈에 익혀 두세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <FunctionLimitExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
