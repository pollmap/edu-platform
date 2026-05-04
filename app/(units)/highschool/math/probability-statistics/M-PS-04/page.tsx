import { notFound } from 'next/navigation';
import { BayesTheoremSimulator } from '@/components/interactive/math/highschool/BayesTheoremSimulator';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-PS-04';

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
          { label: '확률과 통계', href: '/highschool/math/probability-statistics' },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          조건부확률은 <strong>「이 정보를 알게 된 다음, 확률이 어떻게 갱신되나」</strong>를 따지는 도구예요.
          베이즈 정리는 그 갱신 규칙의 이름이고, 의료·법정·AI 모두 이 한 식으로 굴러가요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 사전 → 우도 → 사후">
        <p>
          P(A|B) = P(A∩B)/P(B). 베이즈 정리: P(D|+) = P(+|D)·P(D) / P(+).
          여기서 P(D)는 사전(prior), P(+|D)는 우도(likelihood), P(D|+)는 사후(posterior).
          독립이면 P(A∩B) = P(A)·P(B)가 성립해 P(A|B) = P(A) — 정보를 얻어도 확률이 안 바뀌어요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ 「민감도가 높으면 양성 = 환자」 — 유병률이 낮으면 거짓 양성이 더 많아요. 이게 「베이즈 함정」.
          ❌ 「P(A|B) = P(B|A)」 — 둘은 다른 확률이에요. 「감기일 때 기침할 확률」과 「기침할 때 감기일 확률」은 달라요.
          ❌ 「독립과 배반을 헷갈림」 — 독립은 P(A∩B)=P(A)P(B), 배반은 P(A∩B)=0.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          코로나·HIV 검사, 스팸 필터, 법정에서 DNA 일치율 해석 — 모두 베이즈 정리 한 줄 위에서 굴러가요.
          수능 「확률과 통계」에서는 표를 그려 분자·분모를 채우는 문제가 자주 나와요.
          시뮬레이터에서 유병률이 1%일 때 양성이 나와도 「실제로 환자일 확률」이 얼마나 낮은지 직접 체감해 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <BayesTheoremSimulator />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
