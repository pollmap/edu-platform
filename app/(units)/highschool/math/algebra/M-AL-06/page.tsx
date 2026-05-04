import { notFound } from 'next/navigation';
import { ArithmeticSequenceExplorer } from '@/components/interactive/math/highschool/ArithmeticSequenceExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-AL-06';

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
          등차수열은 <strong>「일정한 양만큼 더하면서 이어지는 수의 줄」</strong>이에요.
          첫째항 a와 공차 d 두 개만 알면 어느 위치의 항이든 즉시 계산할 수 있고, 부분합도 깔끔한 공식으로 떨어져요.
          가우스가 어릴 적 1+2+...+100을 한 번에 풀어 낸 그 발상이 합 공식의 출발점이에요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 일반항과 합">
        <p>
          일반항 <strong>aₙ = a + (n−1)d</strong>. 첫째항부터 공차를 (n−1)번 더한 셈이에요.
          부분합 <strong>Sₙ = n(a + aₙ)/2 = n(2a + (n−1)d)/2</strong>.
          이걸 「(처음 + 끝) × 항수 ÷ 2」 사다리꼴 면적 공식과 같다고 기억하면 안 잊혀요.
          어떤 두 항이 주어지면 a와 d는 연립방정식으로 바로 구해져요 — 시험에서 자주 나오는 패턴.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "공차는 양수다" — 음수도 가능 (감소하는 등차수열).
          ❌ "첫째항을 a₀로 놓아도 된다" — 보통 a₁이 첫째항. 인덱스 차이는 결과까지 차이 1을 만들어요.
          ❌ "Sₙ = n × aₙ" — 처음과 끝의 평균에 항수를 곱해야 해요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          쌓아 놓은 통조림 개수 (1, 3, 5, ...), 매달 일정 금액 적금 — 모두 등차수열 모델.
          수능 「대수」 수열 단원은 매년 2~3문제, 일반항·부분합·연속합 (Σ) 변형이 단골이에요.
          슬라이더로 a, d, n을 바꿔 가며 막대그래프가 어떻게 변하는지 직접 확인해 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <ArithmeticSequenceExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
