import { notFound } from 'next/navigation';
import { UnitSLE101Explorer } from '@/components/interactive/science/highschool/UnitSLE101Explorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'S-LE1-01';

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
          { label: '과학탐구실험1' },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          교과서가 한 줄로 「g = 9.8 m/s²」, 「G = 6.674×10⁻¹¹」이라고 알려 주는 숫자들은
          누군가가 <strong>실험으로 직접 측정</strong>한 결과예요. 그 측정 방법을 따라가면 과학이 어떻게 작동하는지 보여요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 4대 고전 실험의 설계 원리">
        <p>
          에라토스테네스(BC 240): 그림자 길이로 지구 둘레 → 39,000 km (실측 40,075 km, 오차 2 %).
          갈릴레이(1604): 경사면 + 물시계로 d ∝ t² 발견. 등가속도 운동 정량화.
          캐번디시(1798): 비틀림 저울로 G 측정 → 지구 질량 산출. 「지구의 무게를 잰 사람」.
          멘델(1865): 8년·28,000개 완두콩 교배 → 우열·분리·독립의 법칙.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "옛날 실험은 정확도 낮으니까 의미 없다" — 에라토스테네스 오차 2 %, 캐번디시 오차 1 % 미만.<br />
          ❌ "한 사람이 갑자기 발견" — 모두 수년~수십 년의 데이터 누적·반복 측정의 결과.<br />
          ❌ "현대 측정으로 옛 결과는 폐기" — 멘델 비율·캐번디시 G는 여전히 표준값.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          GPS 시간 보정에 g·G 정확도가 중요. 의약·농업의 유전 분석 모두 멘델 모형이 출발점.
          학생부 「실험 재현 보고서」나 과학 영재 면접에서 「내가 직접 재현해 본 고전 실험」이 강력한 어필 포인트.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <UnitSLE101Explorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
