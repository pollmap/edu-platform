import { notFound } from 'next/navigation';
import { CarbonCycleExplorer } from '@/components/interactive/science/CarbonCycleExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'S-IS2-04';

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
          18세기 산업혁명 이후 인류가 100년간 태운 화석연료의 탄소가 지금 대기 CO₂를 <strong>280 → 425 ppm</strong>(2024년)까지 끌어올렸어요.
          이건 단순한 기후 이슈가 아니라 「지구 시스템의 거시적 불균형」이에요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 탄소순환·온실효과·기후 민감도">
        <p>
          탄소는 대기 ↔ 해양 ↔ 생물권 ↔ 화석연료 ↔ 토양 사이를 순환해요.<br />
          광합성: 식물이 CO₂ 흡수 → 글루코스. 호흡·연소·분해로 다시 CO₂ 방출.<br />
          온실효과 — CO₂·CH₄·H₂O가 지구 적외선을 흡수해 표면 온도를 +33℃ 올림(없으면 −18℃).<br />
          기후 민감도 — CO₂ 2배 시 평균 기온 약 +3℃(IPCC). 파리협정은 「+1.5℃ 이내」를 목표로.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "온실효과는 나쁘다" — 자연 온실효과는 생명에 필수. 「강화된 온실효과」가 문제.<br />
          ❌ "CO₂는 인간 활동만의 산물이다" — 자연 배출(화산·생물 호흡)도 있지만, 자연은 균형 잡혀 있고 인간 배출이 균형을 깨트림.<br />
          ❌ "한 사람의 생활은 영향이 없다" — 한국 1인 평균 탄소 발자국 약 13 t CO₂/년 (세계 평균 4.7 t).
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          탄소중립 2050(한국 NDC 40% 감축), 재생에너지 전환, EV·수소경제, 탄소국경조정(CBAM).
          통합과학2·지구과학Ⅰ에서 「환경과 에너지」는 ★ 사회 융합 단원. 그래프 해석·정책 비교 출제.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <CarbonCycleExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
