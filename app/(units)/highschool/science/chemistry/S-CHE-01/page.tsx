import { notFound } from 'next/navigation';
import { MoleConverterExplorer } from '@/components/interactive/science/highschool/MoleConverterExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'S-CHE-01';

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
          화학의 가장 기본적인 언어는 <strong>화학식</strong>(원소 종류와 수)과 <strong>몰</strong>(개수의 묶음)이에요.
          분자·원자는 너무 작아 직접 셀 수 없어서 6.022×10²³개를 「1몰」로 묶어 다뤄요.
          화학반응식의 계수도 곧 몰비. 이 단원이 안 되면 모든 계산화학이 막혀요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 몰·질량·분자수의 변환">
        <p>
          1몰 = 아보가드로 수 NA = 6.022×10²³개. 1몰의 질량 = 분자량 g/mol.
          예) H₂O 1몰 = 18 g = 6.022×10²³개. 이 셋은 항상 변환 가능 — 몰 = 질량/분자량 = 분자수/NA.
          화학반응식 「2H₂ + O₂ → 2H₂O」는 H₂ 2몰 + O₂ 1몰 → H₂O 2몰을 의미해요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "1몰은 1g이다" — 1몰의 질량은 분자량. H₂는 2g, H₂O는 18g, 포도당은 180g.
          ❌ "분자량은 분자 1개의 무게다" — 분자량은 NA개의 질량(g 단위). 1개는 18/NA ≈ 3×10⁻²³ g.
          ❌ "기체 1몰은 22.4 L" — 단, <strong>0°C·1기압(STP)</strong>에서. 25°C·1기압이면 24.5 L.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          영양정보표의 g 표시도 결국 mol을 환산한 양. 약 처방의 mg 단위도 mol 계산이 기반.
          공기 중 CO₂ 농도 415 ppm은 분자수 비율. 화학Ⅰ 「화학의 첫걸음」 단원, 수능 단골.
          몰 ↔ 질량 ↔ 분자수 변환 한 줄 계산 문제가 매년 출제돼요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <MoleConverterExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
