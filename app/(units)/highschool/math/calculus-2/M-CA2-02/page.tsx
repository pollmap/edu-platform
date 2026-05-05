import { notFound } from 'next/navigation';
import { SeriesConvergenceExplorer } from '@/components/interactive/math/highschool/SeriesConvergenceExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-CA2-02';

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
          급수는 <strong>「수열을 무한히 더한 값」</strong>입니다.
          더하면 더할수록 한 값에 가까워지면 「수렴」, 그렇지 않으면 「발산」.
          제논의 역설(아킬레우스와 거북이) 이래로 수학자들이 2,500년간 다듬어 온 개념이에요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 4가지 대표 급수">
        <p>
          ① <strong>등비급수 Σ rⁿ</strong>: |r| {`<`} 1이면 1/(1−r)로 수렴. |r| ≥ 1이면 발산.
          ② <strong>조화급수 Σ 1/n</strong>: 항이 0으로 가지만 합은 발산 (역설적!).
          ③ <strong>p-급수 Σ 1/nᵖ</strong>: p {`>`} 1이면 수렴, p ≤ 1이면 발산. 조화급수는 p=1.
          ④ <strong>교대급수 Σ (−1)ⁿ⁺¹/n = ln 2</strong>: 부호가 번갈아 가며 수렴 (라이프니츠 급수).
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ 「항이 0으로 수렴하면 급수도 수렴」 — 1/n이 반례. 항이 0으로 가는 것은 수렴의 「필요조건」이지 충분조건 아님.
          ❌ 「부분합이 점점 커지면 발산」 — 발산할 수도 있고, 천천히 수렴할 수도 있어요 (예: ln(N)처럼).
          ❌ 「교대급수면 무조건 수렴」 — (−1)ⁿ만으로는 안 됨. 항의 절댓값이 0으로 단조감소해야 해요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          공학에서 신호 분석(푸리에 급수), 컴퓨터 과학에서 알고리즘 복잡도(Σ 1/n ≈ ln n), 금융에서 영구연금 가치(등비급수).
          공비 r 슬라이더를 1에 가까이 가져가 보세요. 부분합이 발산으로 바뀌는 임계 순간이 보입니다.
          수능 「미적분Ⅱ」 핵심 단원으로, 수렴 판정·합 계산·부분합 한계 문제가 빈출입니다.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <SeriesConvergenceExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
