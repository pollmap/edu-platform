import { notFound } from 'next/navigation';
import { CompoundInterestExplorer } from '@/components/interactive/math/highschool/CompoundInterestExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-EM-01';

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
          단리는 「원금에만 이자」, 복리는 <strong>「이자에 또 이자」</strong>가 붙어요.
          이 작은 차이가 시간이 길어지면 폭발적으로 벌어져요. 시간 = 자산이라는 말의 출처예요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — A = P(1+r)ⁿ">
        <p>
          단리: A = P(1 + rt). 복리: A = P(1 + r/n)^(nt). 같은 5%여도 30년 단리는 P×2.5,
          연 복리는 P×4.32, 월 복리는 P×4.47. 이자 빈도(n)가 무한히 커지면 e^(rt)에 수렴(연속복리).
          72의 법칙: 자산이 두 배가 되는 데 걸리는 햇수 ≈ 72/r%. 빠르게 머릿속 계산할 때 유용해요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ 「복리 = 단리 + 약간」 — 30년 시점에서 복리는 단리의 거의 2배가 돼요. 시간이 만든 격차예요.
          ❌ 「세금·인플레이션은 무시해도 됨」 — 실제 수익률 = 명목 − 세금 − 물가. 같이 계산해야 진짜 수익.
          ❌ 「복리는 무조건 좋다」 — 부채(대출, 카드 이자)도 복리예요. 빚의 복리는 빠르게 늘어 위험해요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          예금·적금, 주식 ETF 장기투자, 청년도약계좌, 카드 리볼빙(빚의 복리), 학자금 대출 — 모두 복리 공식이 깔려 있어요.
          경제 수학에서는 「언제부터 복리 효과가 폭발하는지」, 「몇 년 후 얼마가 되는지」 계산이 단골.
          시뮬레이터로 빈도(연/월/일)를 바꿔 보면 「자주 이자가 붙을수록 결과가 커지는」 효과를 직접 볼 수 있어요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <CompoundInterestExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
