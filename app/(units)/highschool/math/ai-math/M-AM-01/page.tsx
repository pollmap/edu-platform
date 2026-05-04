import { notFound } from 'next/navigation';
import { DataDistributionExplorer } from '@/components/interactive/math/highschool/DataDistributionExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-AM-01';

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
          { label: '인공지능 수학', href: '/highschool/math/ai-math' },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          AI는 결국 <strong>데이터로 학습</strong>하는 시스템이에요. 학습 전에 데이터의 분포를 보고 「이상치」를 잡지 않으면
          모델이 엉뚱한 방향으로 학습돼요. 빅데이터 시대의 첫 단계는 「데이터를 들여다보는 통계」예요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — Z-score와 IQR">
        <p>
          Z-score는 「평균에서 표준편차의 몇 배 떨어졌나」, 보통 |Z| &gt; 2 또는 3이면 이상치 후보예요.
          IQR(사분위수 범위) 기반은 Q1 − 1.5·IQR 미만 또는 Q3 + 1.5·IQR 초과를 이상치로 봐요.
          평균·표준편차는 이상치에 민감하고, 사분위수 기반은 강건(robust)해요. 데이터 모양에 따라 골라 써야 해요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ 「이상치는 무조건 제거」 — 측정 오류면 제거, 진짜 드문 사건이면 살려야 해요(고가 주택, 슈퍼셀러 등).
          ❌ 「평균만 보면 충분」 — 분포가 치우쳐 있으면 평균이 왜곡돼요. 중앙값(median)을 함께 봐야 해요.
          ❌ 「데이터가 많으면 자동으로 좋은 모델」 — 편향(bias)된 데이터는 더 많아도 잘못된 방향으로 학습돼요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·AI 응용">
        <p>
          신용카드 부정거래 탐지, 공장 센서 이상 감지, 의료 영상 비정상 검출 — 모두 「이상치 탐지」가 첫 단계예요.
          AI 학습 전 EDA(탐색적 데이터 분석) 단계에서 박스플롯·히스토그램·산점도를 보는 습관이 모델 성능을 가장 빠르게 끌어올려요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <DataDistributionExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
