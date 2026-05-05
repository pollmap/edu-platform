import { notFound } from 'next/navigation';
import { GoldenRatioMandelbrotExplorer } from '@/components/interactive/math/highschool/GoldenRatioMandelbrotExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-MC-01';

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
          예술과 수학의 만남에서 가장 자주 등장하는 두 주제: <strong>황금비 φ ≈ 1.618</strong>과 <strong>프랙털</strong>이에요.
          황금비는 「전체:큰 부분 = 큰 부분:작은 부분」이라는 자기 닮음의 가장 단순한 형태.
          프랙털은 그 자기 닮음을 무한히 반복한 결과 — 만델브로 집합이 대표 사례.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 자기 닮음의 두 얼굴">
        <p>
          <strong>황금비 φ = (1 + √5)/2 ≈ 1.618</strong>: x² = x + 1의 양의 근. 정오각형 대각선/한 변, 피보나치 비율의 극한.
          <strong>황금사각형</strong>: 정사각형 잘라내고 남은 사각형이 다시 황금사각형. 무한히 자기 닮은 도형.
          <strong>만델브로 집합</strong>: 복소수 c에 대해 z₀=0, zₙ₊₁ = zₙ² + c가 발산하지 않는 c들의 집합.
          줌인할수록 같은 패턴이 끝없이 나타나는 「수학의 풍경」.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ 「황금비가 모든 명화에 숨어 있다」 — 후대에 「발견」된 사례가 많아요. 다빈치·파르테논 신전의 황금비 사용은 학술적으로 논란.
          ❌ 「프랙털 = 무한히 작아지는 도형」 — 정확히는 「임의의 스케일에서 자기 닮음」. 작아지지 않아도 자기 닮음이면 프랙털.
          ❌ 「만델브로 집합은 단순한 식이라 시각화도 쉽다」 — 모든 픽셀에서 수십~수백 번 반복 계산이 필요한 무거운 연산.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          예술: 다빈치의 「인체비례도」, 몬드리안의 직사각형 분할, 한국 전통 문양의 자기 반복.
          자연: 솔방울 비늘 배열, 해바라기 씨앗 나선 (137.5° = 360°/φ²).
          황금사각형 분할 단계 n을 1부터 9까지 늘려 보세요. 만델브로에서는 줌 배율을 50배까지 키워 자기 닮음 패턴을 직접 확인할 수 있어요.
          수학과 예술 융합 단원의 핵심 시각 자료입니다.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <GoldenRatioMandelbrotExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
