import { notFound } from 'next/navigation';
import { ReactionEnergyDiagram } from '@/components/interactive/science/highschool/ReactionEnergyDiagram';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'S-CHE-05';

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
          { label: '화학' },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          화학반응은 <strong>"오래된 결합을 깨고 새 결합을 만드는"</strong> 과정이에요.
          결합을 깨는 데는 에너지가 들고, 만드는 데는 에너지가 나와요.
          그 차이가 발열인지 흡열인지를 결정해요. 모든 반응에는 「에너지 언덕(활성화에너지)」이 있어요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — Eₐ와 ΔH의 차이">
        <p>
          활성화에너지 Eₐ는 반응이 시작되기 위해 필요한 에너지(언덕 높이) — 「얼마나 빠른가」를 결정.
          반응엔탈피 ΔH는 시작 - 끝의 에너지 차이 — 「열이 나오는지 흡수하는지」를 결정.
          ΔH &lt; 0 이면 발열(연소·중화), ΔH &gt; 0 이면 흡열(광합성·요소 용해).
          촉매는 ΔH는 안 바꾸고 Eₐ만 낮춰요. 그래서 반응이 빨라지지만 에너지 균형은 동일.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "발열반응은 항상 빠르다" — 다이아몬드 → 흑연도 발열인데 영겁의 시간이 걸림. ΔH와 속도는 별개.
          ❌ "촉매는 반응을 더 많이 만든다" — 평형 상태와 ΔH는 안 바뀜. 도달 속도만 빨라져요.
          ❌ "Eₐ는 화학반응식 계수다" — 계수는 몰비. Eₐ는 별도 측정값(kJ/mol).
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          연료전지·내연기관은 발열반응 활용. 광합성은 햇빛 에너지로 흡열반응 진행.
          핫팩(철 산화)은 발열, 냉각팩(질산암모늄 용해)은 흡열.
          효소는 생체 촉매로 Eₐ를 100배 이상 낮춰요. 수능 「화학반응과 에너지」 단원 핵심.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <ReactionEnergyDiagram />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
