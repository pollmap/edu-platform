import { notFound } from 'next/navigation';
import { UnitSLE102Explorer } from '@/components/interactive/science/highschool/UnitSLE102Explorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'S-LE1-02';

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
          빨래판 흡판이 떨어지지 않는 이유, 기타 줄을 누르면 음이 올라가는 이유, 무지개 색이 분리되는 이유,
          빵이 부풀어 오르는 이유 — <strong>모두 교과서 핵심 개념의 일상 사례</strong>예요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 일상 → 과학 연결 4가지">
        <p>
          (1) 압력: F = P × A. 흡판 50 cm² × 101 kPa ≈ 50 N(5 kg) 끌어당김.
          (2) 진동: 현 진동수 f ∝ 1/L · √(T/μ). 짧을수록·팽팽할수록 음 ↑.
          (3) 굴절: 스넬의 법칙 n₁sinθ₁ = n₂sinθ₂. 색별 n 차이가 무지개·프리즘 분산.
          (4) 발효: C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂ (혐기성 호흡). 효모가 CO₂로 빵 부풀림.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "흡판은 「딱 붙는 접착력」으로 붙는다" — 안쪽 진공 + 바깥 대기압이 누르는 것.<br />
          ❌ "기타 줄 누르면 줄이 짧아져 음이 「커진다」" — 음의 「높이」(진동수)가 ↑. 음량과 음높이는 다름.<br />
          ❌ "무지개는 빛이 비에 「부딪혀」 분산" — 빗방울 안에서 굴절·내부 전반사·다시 굴절 3단계.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          요리·악기·청소·날씨 등 모든 일상이 과학 사례. 학생부 「관찰 보고서」에서 일상 현상을 정량화한 사례가 ★.
          내신 통합과학 「과학과 일상」 단원에서 비슷한 사례 매년 출제. 직접 실험 → 데이터 → 그래프 → 결론 형식.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <UnitSLE102Explorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
