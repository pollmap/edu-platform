import { notFound } from 'next/navigation';
import { ChemicalEquilibriumSimulator } from '@/components/interactive/science/ChemicalEquilibriumSimulator';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'S-IS2-01';

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
          { label: '통합과학2' },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          모든 화학반응이 「완전히 끝나는」 게 아니에요. 정반응과 역반응이 동시에 일어나 <strong>겉보기 정지 상태</strong>에 도달하는 것이 「화학평형」이에요.
          이 평형을 흔드는 르샤틀리에 원리가 산업·생체화학의 핵심.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 가역반응·평형상수·르샤틀리에">
        <p>
          A + B ⇌ C + D 반응에서 평형 도달 시 정반응 속도 = 역반응 속도.<br />
          평형상수 K = [C][D] / [A][B]. K 큼 = 생성물 쪽 치우침. 반응지수 Q와 K를 비교해 진행 방향을 알 수 있어요(Q&lt;K → 정반응).<br />
          르샤틀리에 원리 — 농도·온도·압력 변화 시 평형은 「변화를 줄이는 방향」으로 이동.
          예: 압력 증가 → 분자 수 적은 쪽으로 이동.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "평형 = 반응이 멈춘 상태" — 동적 평형. 정·역반응이 같은 속도로 계속 일어남.<br />
          ❌ "촉매가 평형을 이동시킨다" — 촉매는 평형 도달 속도만 빠르게. K, 평형 위치는 그대로.<br />
          ❌ "온도가 오르면 늘 정반응 유리" — 발열반응은 온도 ↑ 시 역반응 쪽으로 이동.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          하버-보슈 공정(N₂ + 3H₂ ⇌ 2NH₃) — 인류의 인구 폭증을 가능케 한 비료 합성. 르샤틀리에 원리로 고압·중간 온도·촉매 조건 최적화.
          헤모글로빈의 산소 운반(O₂ 농도 평형), 위산-위장 점막 보호(완충용액). 통합과학2·화학Ⅱ에서 평형은 ★ 핵심 단원.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <ChemicalEquilibriumSimulator />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
