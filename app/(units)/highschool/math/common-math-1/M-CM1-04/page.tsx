import { notFound } from 'next/navigation';
import { ComplexPlaneExplorer } from '@/components/interactive/math/ComplexPlaneExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-CM1-04';

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
          복소수는 <strong>실수를 한 차원 더 넓힌 수</strong>예요. i² = −1 이라는 약속 하나만 추가하면,
          x² + 1 = 0 처럼 실수 안에서 풀 수 없던 방정식이 풀려요.
          복소평면 위에서 점으로 표현되며, 더하기는 화살표 합, 곱하기는 「길이 곱·각도 합」으로 깔끔하게 시각화돼요.
        </p>
      </SectionCard>

      <SectionCard title="핵심 — 정의와 사칙연산">
        <p>
          z = a + b i. a 는 실수부, b 는 허수부. <strong>켤레</strong>는 z̄ = a − b i.<br />
          덧셈·뺄셈은 실수부·허수부끼리 분리해서 계산. 곱셈은 분배법칙 + i² = −1 대입:
          (a + bi)(c + di) = (ac − bd) + (ad + bc) i. 절댓값 |z| = √(a² + b²) 는 원점부터의 거리.
        </p>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <p>
          ❌ 「i = √(−1) 라서 √(−4) = 2i」는 맞지만, √a · √b = √(ab) 는 음수에서는 일반적으로 성립 X.<br />
          ❌ 「복소수에 크기 비교가 있다」 — 복소수는 순서가 없어요. 「z₁ &gt; z₂」 같은 비교는 정의되지 않아요(절댓값 비교는 가능).<br />
          ❌ 켤레의 성질 헷갈림: z + z̄ = 2a (실수), z · z̄ = a² + b² (실수, |z|² 이기도 함).
        </p>
      </SectionCard>

      <SectionCard title="실생활·시험 응용">
        <p>
          전기·전자(임피던스), 신호처리(푸리에 변환), 양자역학은 모두 복소수 위에서 굴러가요.
          수능 공통수학1 의 「방정식·함수」 단원에서는 이차방정식의 판별식이 음수일 때 「두 허근」을 다룰 때 등장하고,
          공통수학2 의 도형 변환에서는 「i 곱하기 = 90° 회전」이 핵심 직관이에요.
        </p>
      </SectionCard>

      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <ComplexPlaneExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
