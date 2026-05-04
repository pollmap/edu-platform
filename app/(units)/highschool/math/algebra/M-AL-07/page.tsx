import { notFound } from 'next/navigation';
import { GeometricSequenceExplorer } from '@/components/interactive/math/highschool/GeometricSequenceExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-AL-07';

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
          등비수열은 <strong>「일정한 비율만큼 곱하면서 이어지는 수의 줄」</strong>이에요.
          공비 r의 절댓값에 따라 폭발적으로 커지거나 빠르게 0에 수렴하거나 진동해요.
          이 단원의 진짜 백미는 「무한등비급수 — 무한히 더해도 유한값에 멈추는 신기한 합」.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 일반항·합·무한합">
        <p>
          일반항 <strong>aₙ = a · rⁿ⁻¹</strong>.
          유한합 <strong>Sₙ = a(1 − rⁿ)/(1 − r)</strong> (r ≠ 1일 때).
          무한등비급수의 핵심: <strong>|r| &lt; 1이면 a/(1 − r)에 수렴, |r| ≥ 1이면 발산</strong>.
          0.999... = 1 같은 직관에 어긋나는 결과도 무한등비급수로 깔끔히 증명돼요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "공비가 음수면 등비수열이 아니다" — 가능합니다 (부호가 번갈아 바뀜).
          ❌ "무한히 더하면 무조건 무한대다" — |r| &lt; 1이면 유한값으로 수렴해요.
          ❌ "S∞ = a/(1 − r)을 r ≥ 1에서도 쓸 수 있다" — 수렴 조건 |r| &lt; 1 위반 시 의미 없음.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          복리 이자 (원금 × (1+r)ⁿ), 약 반감기, 인구 성장 — 모두 등비수열 모델.
          무한등비급수는 수능 빈출 영역으로, 도형 분할의 무한 합을 묻는 문항이 단골이에요.
          공비 r을 0.5에서 1.5까지 바꿔 가며 수렴/발산이 어떻게 갈리는지 직접 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <GeometricSequenceExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
