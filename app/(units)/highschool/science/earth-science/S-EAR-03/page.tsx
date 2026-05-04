import { notFound } from 'next/navigation';
import { SolarSystemExplorer } from '@/components/interactive/science/SolarSystemExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'S-EAR-03';

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
          { label: '지구과학' },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          지구는 태양계 8행성 중 하나일 뿐이고, 태양은 우리 은하 1,000억 개 별 중 평범한 별이며, 우리 은하는 우주 1조 개 은하 중 하나예요.
          이 「우주의 척도」를 이해하는 게 천문학의 첫 번째 충격이에요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 케플러 법칙·HR도·은하 분류">
        <p>
          ① 케플러 1법칙(타원 궤도) ② 2법칙(면적 속도 일정) ③ 3법칙(T² ∝ a³).<br />
          별의 밝기·온도·반지름은 H-R도(헤르츠스프룽-러셀 도표)에 점으로 찍혀요. 주계열 → 거성 → 백색왜성으로 진화.<br />
          은하는 형태별로 나선·타원·불규칙. 우리 은하는 「막대 나선」.<br />
          빛이 1년에 가는 거리 = 1광년 ≈ 9.46×10¹² km. 가장 가까운 별 프록시마는 4.2광년.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "행성 궤도는 완벽한 원이다" — 모두 약간의 타원. 수성이 가장 큰 이심률.<br />
          ❌ "큰 별이 더 밝다" — 별의 절대등급은 크기뿐 아니라 표면 온도(스테판-볼츠만 법칙)에 따라.<br />
          ❌ "우주는 지구 중심으로 팽창한다" — 모든 곳에서 동일하게 팽창. 「중심」이 따로 없어요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          GPS 위성은 케플러 궤도를 따라 움직이며 일반·특수 상대성 효과까지 보정. 외계행성 탐사(케플러 우주망원경)도 케플러 3법칙으로 행성 질량 추정.
          수능 지구과학Ⅰ 「우주」 단원은 매년 4~5문항. HR도 해석·도플러 효과·허블 법칙이 ★ 필수.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <SolarSystemExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
