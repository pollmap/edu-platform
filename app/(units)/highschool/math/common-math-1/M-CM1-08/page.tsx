import { notFound } from 'next/navigation';
import { PermutationCombinationTree } from '@/components/interactive/math/PermutationCombinationTree';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-CM1-08';

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
          경우의 수는 <strong>「몇 가지 방식으로 일이 일어날 수 있는가」</strong>를 세는 일이에요.
          핵심은 「<strong>순서를 따지나? (순열)</strong> vs <strong>따지지 않나? (조합)</strong>」 단 한 줄.
          이 구분만 잡으면 합·곱의 법칙으로 거의 모든 문제가 풀려요.
        </p>
      </SectionCard>

      <SectionCard title="핵심 — 순열·조합 식">
        <p>
          ① 합의 법칙: 동시에 일어날 수 없는 두 사건은 「가지 수의 합」.<br />
          ② 곱의 법칙: 연속된 두 단계의 가지 수는 「곱」.<br />
          ③ <strong>P(n, r) = n! / (n − r)!</strong> — 순서 O. n 명 중 r 명을 한 줄에 세우는 가짓수.<br />
          ④ <strong>C(n, r) = n! / (r! · (n − r)!)</strong> — 순서 X. n 명 중 r 명을 뽑는 가짓수. 항상 P(n, r) = r! · C(n, r).
        </p>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <p>
          ❌ 「대표 3명 뽑기」와 「회장·부회장·총무 뽑기」 가 같다 — 전자는 조합, 후자는 순열이에요.<br />
          ❌ 「동전 던지기」에서 (앞,뒤) 와 (뒤,앞)을 같은 경우로 — 순서 있으면 다른 경우.<br />
          ❌ 같은 것이 있는 순열에서 중복 나누기 빠짐 — n! / (a! · b! · …) 처럼 분모로 나누어야 함.
        </p>
      </SectionCard>

      <SectionCard title="실생활·시험 응용">
        <p>
          비밀번호 가짓수, 좌석 배치, 카드 게임 손패, 유전자 조합 — 모두 같은 식 한 줄.
          수능에서는 「조건부」 문제(특정 자리는 고정, 같은 색 옆자리 X 등)가 단골인데, 결국 합·곱 법칙의 응용이에요.
          아래에서 작은 n, r 일 때 「실제로 몇 개의 경우가 있는지」 직접 나열해 두 개념의 차이를 체감해 보세요.
        </p>
      </SectionCard>

      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <PermutationCombinationTree />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
