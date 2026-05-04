import { notFound } from 'next/navigation';
import { PHIndicator } from '@/components/interactive/science/PHIndicator';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'S-CHE-06';

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
          산은 <strong>H⁺를 내놓는 물질</strong>, 염기는 <strong>H⁺를 받는 물질</strong>(브뢴스테드-로우리 정의).
          물에 녹은 H⁺ 농도를 로그 척도로 표현한 게 pH. pH 7이 중성, 낮을수록 산성, 높을수록 염기성.
          1 단위 차이는 H⁺ 농도가 10배 차이. 위산(pH 1)과 비누(pH 9)는 H⁺ 농도가 1억 배 차이예요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — pH와 평형상수">
        <p>
          pH = -log[H⁺]. 25°C 물에서 [H⁺][OH⁻] = 10⁻¹⁴. 그래서 pH + pOH = 14.
          강산(HCl)은 100% 이온화 → [H⁺]가 농도와 같음. 약산(CH₃COOH)은 일부만 이온화 → 평형상수 Kₐ로 표현.
          중화: H⁺ + OH⁻ → H₂O. 산·염기 + 같은 mol → 중성 염 + 물.
          완충용액은 약산 + 그 짝염기 혼합. pH 변동을 흡수해요(혈액 pH 7.4 유지).
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "pH 7이 무조건 깨끗한 물이다" — 순수한 물이 25°C일 때만 pH 7. 온도가 달라지면 변해요.
          ❌ "강산이 약산보다 항상 위험하다" — HF는 약산이지만 뼈까지 침투해 매우 위험. 강도 ≠ 위험성.
          ❌ "pH 8과 pH 9는 별 차이 없다" — H⁺ 농도가 10배 차이. 작은 숫자 차이가 큰 농도 차이.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          위장약(제산제)은 위산을 중화. 비 오는 날 산성비(pH 5 이하)는 대리석을 녹임.
          김치·요구르트는 젖산균이 만드는 약산. 베이킹소다(NaHCO₃)는 산을 중화하는 일상 속 약염기.
          혈액 완충(탄산-중탄산)은 생명 유지의 핵심. 수능 「화학반응의 세계」 단원 매년 출제.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <PHIndicator />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
