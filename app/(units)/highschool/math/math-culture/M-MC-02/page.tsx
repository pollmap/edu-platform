import { notFound } from 'next/navigation';
import { FibonacciNatureExplorer } from '@/components/interactive/math/highschool/FibonacciNatureExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-MC-02';

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
          자연은 효율을 추구해요. 잎이 햇빛을 가장 많이 받으려면, 씨앗이 좁은 공간에 가장 많이 들어가려면 —
          답은 <strong>「황금각 137.5°」</strong>로 회전하며 배치하는 것이에요.
          이 각도는 황금비 φ에서 자연스럽게 나오고, 그 결과 피보나치 수가 등장합니다.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 피보나치와 황금각">
        <p>
          <strong>피보나치 수열</strong>: 1, 1, 2, 3, 5, 8, 13, 21, 34… (Fₙ₊₁ = Fₙ + Fₙ₋₁).
          연속한 두 항의 비 Fₙ₊₁/Fₙ → φ ≈ 1.618로 수렴.
          <strong>황금각 = 360°/φ² ≈ 137.5°</strong>: 한 바퀴를 황금비로 가장 「어긋나게」 자른 각.
          이 각도로 씨앗을 배치하면 어느 두 씨앗도 같은 방향선에 놓이지 않아 빈 공간 없이 채워져요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ 「피보나치 수열은 식물에서만 나온다」 — 토끼 번식 (피보나치 원래 문제), 동적 프로그래밍, 음악 작곡 등 광범위.
          ❌ 「황금각은 임의로 정한 미적 약속」 — 황금비의 무리수성에서 「가장 비합리적인 각」이라는 수학적 최적성이 나옴.
          ❌ 「모든 식물 잎차례가 황금각」 — 1/2, 1/3, 2/5, 3/8 등 다른 비율도 흔해요. 다만 종합적으로 가장 흔한 패턴.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          해바라기·국화·솔방울 씨앗 배열, 잎차례, 앵무조개 껍질의 로그 나선.
          항 수 슬라이더를 18까지 늘려 피보나치 사각형이 점점 황금사각형에 수렴하는 모습을 보세요.
          해바라기 모드에서 씨앗 개수를 800까지 늘리면 두 방향의 나선이 동시에 보이는데 — 그 개수가 바로 피보나치 수예요.
          수학과 자연 융합 탐구의 시각적 핵심 단원입니다.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <FibonacciNatureExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
