import { notFound } from 'next/navigation';
import { RegressionScatterExplorer } from '@/components/interactive/math/highschool/RegressionScatterExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-AS-02';

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
          두 변수의 관계를 <strong>「방향」(양·음)</strong>과 <strong>「강도」(상관계수 r)</strong>로 측정해요.
          회귀선은 점들과의 세로 거리 제곱합을 최소로 만드는 「가장 좋은 직선」입니다 (최소제곱법).
          기울기가 0에 가까울수록 X로 Y를 설명할 수 없고, |r|이 1에 가까울수록 직선 관계가 또렷해져요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 상관 vs 회귀">
        <p>
          <strong>상관계수 r</strong>은 −1 ≤ r ≤ 1 범위, 부호=방향, 절댓값=강도.
          <strong>결정계수 R² = r²</strong>는 「Y의 분산 중 X로 설명되는 비율」.
          <strong>회귀선 ŷ = mx + b</strong>의 기울기 m = (Σ(x−x̄)(y−ȳ)) / Σ(x−x̄)².
          예측 시 회귀선의 외삽(데이터 범위 바깥)은 위험해요 — 관계가 깨질 수 있어요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ <strong>「상관 = 인과」 절대 X</strong>. 아이스크림 판매와 익사사고는 양의 상관이지만 둘 다 「여름」이라는 제3변수의 결과예요.
          ❌ 「r = 0이면 관계 없다」 — 비선형 관계(예: y = x²)는 r=0 근처라도 강한 패턴이 있어요.
          ❌ 「잡음이 많으면 회귀선 의미 없다」 — 잡음이 커도 m의 부호와 크기는 추정됩니다 (불확실성만 커짐).
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          기온과 전력수요, 광고비와 매출, 운동량과 체중 — 회귀는 정책·마케팅·헬스케어의 기본 도구.
          잡음 슬라이더를 키워 보세요. r이 떨어져도 회귀선은 여전히 그어지지만 신뢰구간이 넓어진다는 감을 잡을 수 있어요.
          수능·내신에서는 r 부호 판단, 회귀계수 해석, R² 의미를 묻는 문제가 자주 나옵니다.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <RegressionScatterExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
