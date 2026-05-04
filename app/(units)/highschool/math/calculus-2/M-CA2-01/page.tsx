import { notFound } from 'next/navigation';
import { SequenceLimitExplorer } from '@/components/interactive/math/highschool/SequenceLimitExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-CA2-01';

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
          수열의 극한은 <strong>「항의 번호 n을 무한히 키울 때 항이 어디로 가나」</strong>를 묻는 도구예요.
          한 값으로 다가가면 「수렴」, 그렇지 않으면 「발산」 (양의 무한대·음의 무한대·진동).
          미적분Ⅱ 모든 단원의 토대.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 수렴/발산 판정">
        <p>
          n → ∞일 때 aₙ이 일정한 값 α로 다가가면 수열은 α에 수렴 (lim aₙ = α).
          1/n → 0, (0.7)ⁿ → 0처럼 「점점 작아지는 항」은 0에 수렴.
          (-1)ⁿ은 +1과 -1을 반복하며 진동발산, log n은 천천히 +∞로 발산.
          극한값 계산 시 사칙연산 법칙 (lim(aₙ + bₙ) = lim aₙ + lim bₙ)이 핵심 도구.
          단, 둘 다 수렴할 때만 적용된다는 점 잊지 말 것.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "수렴 = 0이 된다" — 0이 아닌 다른 값에 수렴할 수도 있어요.
          ❌ "발산 = 무한대로 간다" — 진동발산도 발산. 극한이 「존재하지 않을 뿐」이에요.
          ❌ "각 항 aₙ = 0이면 lim aₙ ≠ 0" — 항상 0이라면 극한도 당연히 0.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          반복 시뮬레이션·근사 계산·수치적분의 정확도 분석은 모두 수열 극한 위에서 굴러가요.
          수능 미적분에서 수열의 극한 계산은 매년 1~2문제 빈출. 부정형 (∞ − ∞, ∞/∞) 처리 기술이 핵심.
          n 슬라이더를 1에서 1000까지 움직여 4가지 수열의 행동을 비교해 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <SequenceLimitExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
