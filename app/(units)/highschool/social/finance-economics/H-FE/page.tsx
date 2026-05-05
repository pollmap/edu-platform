import { notFound } from 'next/navigation';
import { PersonalFinancePlanner } from '@/components/interactive/social/PersonalFinancePlanner';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'H-FE';

export function generateMetadata() {
  const unit = findUnit(UNIT_ID);
  return unit ? makeUnitMetadata(unit) : {};
}

export default function Page() {
  const unit = findUnit(UNIT_ID);
  if (!unit || unit.schoolLevel !== 'highschool') notFound();

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
          금융과 경제 생활은 「<strong>월급·소비·저축·투자·은퇴·세금·신용</strong>」 같은 일상 돈 흐름을 이해하는 과목이에요.
          이 단원은 특정 상품을 권하는 시간이 아니에요. 「복리·인플레이션·위험·분산」 같은 <em>기본 원리</em>를 익혀
          스스로 판단할 힘을 기르는 것이 목적이에요.
        </p>
      </SectionCard>

      <SectionCard title="큰 흐름 / 5개 핵심 개념">
        <p>
          ① <strong>복리(複利)</strong> — 이자에 다시 이자가 붙는 구조. 같은 금액을 같은 기간 모아도, 단리와 복리의 결과는
          시간이 길어질수록 크게 벌어져요. 「시간의 가치」가 자산 형성의 가장 큰 변수예요.
        </p>
        <p>
          ② <strong>인플레이션</strong> — 물가가 오르면 같은 금액으로 살 수 있는 양이 줄어들어요. 명목 수익률(통장에 찍히는
          숫자)에서 인플레이션을 뺀 것이 「<em>실질 수익률</em>」. 이것이 실제 구매력의 변화를 보여줘요.
        </p>
        <p>
          ③ <strong>위험과 수익의 관계</strong> — 일반적으로 기대 수익이 높은 자산은 손실의 폭도 더 커요. 「공짜 점심은 없다」가
          금융 교과서의 한 줄 요약이에요. 변동성, 최대 낙폭(MDD) 같은 지표로 위험을 보는 습관이 필요해요.
        </p>
        <p>
          ④ <strong>분산 투자</strong> — 모든 자산을 한 곳에 넣지 않고 종목·자산군·지역·통화·시간을 나누어 두는 원칙이에요.
          상관관계가 다른 자산을 섞으면 같은 기대 수익에서 변동성이 줄어드는 경우가 있다는 것이 자산 배분의 출발점이에요.
        </p>
        <p>
          ⑤ <strong>신용과 부채</strong> — 모든 부채가 「나쁜」 것은 아니지만, 변동 금리·만기·연체 시 비용을 정확히 알지
          못하고 빌리면 큰 위험이 돼요. 본인 신용 점수를 정기적으로 확인하고, 카드·할부·소액 대출의 실효 금리를 계산해 보는
          습관이 중요해요.
        </p>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <ul className="list-disc list-inside space-y-1.5 text-sm">
          <li>
            <strong>오개념 1.</strong> 「예금·적금에만 두면 안전하다」 → 명목상 원금은 보장되지만, 인플레이션 아래에서는
            실질 구매력이 줄어드는 경우가 많아요. 「안전 = 변동성 0」이 아니라 「위험의 종류가 다르다」가 정확해요.
          </li>
          <li>
            <strong>오개념 2.</strong> 「수익률만 보면 된다」 → 같은 수익률에도 그 변동 폭(위험)·세금·수수료가 다르면 실제
            손에 들어오는 결과가 크게 달라져요. 사전 정보(약관·운용 보수)를 확인하는 습관이 필요해요.
          </li>
          <li>
            <strong>오개념 3.</strong> 「전문가가 추천한 종목은 반드시 오른다」 → 어떤 전문가도 단기 주가를 지속적으로 정확히
            맞추지 못해요. 추천을 들었어도 「내 자산 배분에서 어디에 들어갈지, 손실 한도는 얼마인지」는 본인이 정해야 해요.
          </li>
        </ul>
      </SectionCard>

      <SectionCard title="실생활 / 진로 — 단, 투자 권유 아님">
        <p>
          이 단원은 자격증·취업·창업·생애 설계 어디에서나 기본기로 작동해요. 가계부 앱, 연말 정산, 청약 통장, 학자금 대출,
          국민 연금 등 일상 제도가 모두 이 단원의 응용이에요. 다만 어떤 상품도 「반드시 사라」고 하지는 않아요. 본 페이지의
          시뮬레이터는 학습용 단순 계산이며, 실제 투자 결정은 충분한 사전 학습과 본인 판단으로 이뤄져야 해요.
        </p>
      </SectionCard>

      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <PersonalFinancePlanner />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
