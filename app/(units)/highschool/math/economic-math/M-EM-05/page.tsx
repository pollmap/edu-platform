import { notFound } from 'next/navigation';
import { KosisDataExplorer } from '@/components/interactive/math/highschool/KosisDataExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-EM-05';

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
          { label: '경제 수학', href: '/highschool/math/economic-math' },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          GDP·물가·실업률 같은 경제지표는 시간에 따라 변하는 시계열 데이터예요.
          <strong>최소제곱법(회귀선)</strong>으로 흩어진 점에서 추세를 뽑아내고, 전년대비·CAGR로 변화 속도를 비교해요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 회귀선과 변화율">
        <p>
          최소제곱법은 「예측값과 실제값의 차이 제곱의 합」을 최소화하는 직선을 찾아요.
          기울기 m = Σ(xᵢ − x̄)(yᵢ − ȳ) / Σ(xᵢ − x̄)². 이 기울기가 「연 평균 변화량」이에요.
          전년대비 변화율(YoY) = (yₜ − yₜ₋₁)/yₜ₋₁. CAGR = (y_n/y_0)^(1/n) − 1 — 「복리로 환산한 평균 성장률」.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ 「산술 평균 = 평균 성장률」 — 매년 +20%, −20%면 산술평균은 0%지만 실제 자산은 줄어요. CAGR을 써야 정확.
          ❌ 「상관 = 인과」 — 두 지표가 같이 움직여도 한쪽이 다른 쪽의 원인이라 단정할 수 없어요(공통 원인 가능성).
          ❌ 「시계열 회귀선이 항상 정확」 — 추세 외에 계절성·이벤트(코로나 등)가 끼어 있어요. 잔차 분석 필요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          한국은행 통화정책 결정, KOSIS 통계청의 경제 지표 모니터링, 기업의 매출 추세 분석, 부동산 시장 추적 —
          모두 시계열 데이터의 추세선과 변화율을 본 결과예요.
          경제 수학에서는 「최소제곱법으로 a, b 구하기」와 「전년대비 변화율 계산」이 단골.
          시뮬레이터의 데이터는 학습용으로 자체 작성한 가상치예요(저작권 안전).
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <KosisDataExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
