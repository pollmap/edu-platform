import { notFound } from 'next/navigation';
import { MarginalAnalysisExplorer } from '@/components/interactive/math/highschool/MarginalAnalysisExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-EM-04';

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
          한계비용은 「하나 더 만들 때 드는 비용」, 한계수입은 「하나 더 팔 때 받는 돈」.
          이윤은 <strong>MR = MC인 지점에서 최대</strong>가 돼요. 미분이 「언제 멈출지」를 알려주는 셈이에요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — π'(Q) = MR − MC = 0">
        <p>
          이윤 π(Q) = R(Q) − C(Q). 미분해 0으로 놓으면 R'(Q) = C'(Q), 즉 MR = MC가 「이윤 극대화 조건」.
          완전경쟁시장에서는 MR = 시장가 P (가격수용자). C(Q) = aQ² + bQ + c 같은 비용함수면
          MC = 2aQ + b → Q* = (P − b)/(2a). 「하나 더 만들 때 더 많이 팔리는 한」 계속 만들고, 같아지면 멈춰요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ 「MR &gt; MC면 이윤」 — 그건 「한계 이윤」. 총이윤은 매출 합 − 비용 합. MR &gt; MC면 「더 만들면 이윤이 늘어나는 구간」.
          ❌ 「고정비를 줄이면 Q*가 변한다」 — 고정비 c는 MC에 안 들어가요. Q*에 영향 없음(다만 총이윤은 변함).
          ❌ 「P &lt; ATC면 무조건 폐업」 — 단기에는 P &gt; AVC면 유지가 나아요. 폐업 vs 운영 결정은 평균가변비용과 비교.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          공장 생산량 결정, 카페 메뉴 가격 책정, 항공권 가격 변동, 광고 예산 결정 — 모두 한계 분석으로 풀어요.
          경제 수학에서는 「비용 함수가 주어졌을 때 이윤 극대화 Q*」, 「가격이 변할 때 Q*가 어떻게 이동하나」가 단골.
          시뮬레이터로 비용 곡률과 시장가를 바꿔 가며 MR=MC 점이 어디로 움직이는지 직관을 잡아 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <MarginalAnalysisExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
