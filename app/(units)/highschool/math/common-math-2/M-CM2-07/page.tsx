import { notFound } from 'next/navigation';
import { FunctionBoxExplorer } from '@/components/interactive/math/FunctionBoxExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-CM2-07';

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
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />

      <SectionCard title="한마디로">
        <p>
          함수는 <strong>「입력 하나 → 출력 하나」 라는 약속</strong>이에요.
          정의역·치역·일대일대응·합성·역함수 — 모두 이 한 줄 약속 위에 쌓여요.
          공통수학2 의 함수 단원은 미적분 모든 단원의 「언어」 라서, 여기서 흔들리면 그 뒤가 다 통째로 흐려져요.
        </p>
      </SectionCard>

      <SectionCard title="핵심 — 정의·치역·일대일·역함수">
        <p>
          ① <strong>정의역</strong>: 입력으로 허용되는 x 의 모음. 분모 ≠ 0, 루트 안 ≥ 0 같은 조건.<br />
          ② <strong>치역</strong>: 실제로 나오는 y 의 모음.<br />
          ③ <strong>일대일대응</strong>: 서로 다른 x → 서로 다른 y, 그리고 모든 y 가 어떤 x 의 상.<br />
          ④ <strong>합성</strong>: (g ∘ f)(x) = g(f(x)). 순서 중요.<br />
          ⑤ <strong>역함수</strong>: 일대일대응일 때만 존재. y = f(x) 의 x ↔ y 교환 후 x 에 대해 정리.
        </p>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <p>
          ❌ 「f(x) = y 이면 f⁻¹(y) = x」 라서 모두 역함수 — 일대일대응이 아니면 정의되지 않아요.<br />
          ❌ 합성 (f ∘ g) ≠ (g ∘ f) — 함수 합성은 일반적으로 교환 X.<br />
          ❌ 정의역·공역·치역 혼동. 공역(목표 집합) ⊇ 치역(실제 나온 값들).
        </p>
      </SectionCard>

      <SectionCard title="실생활·시험 응용">
        <p>
          암호화·복호화는 함수와 역함수의 가장 직관적 예. 비밀번호 해싱(일대일대응이 아니어서 역함수 X) 도 같은 개념.
          수능 공통수학2 에서는 「합성·역함수의 그래프」 문제, 「f(g(x)) 가 일대일대응일 조건」 같은 문제가 단골이고,
          미적분 도입에서 「합성함수의 미분」 으로 그대로 이어져요.
        </p>
      </SectionCard>

      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <FunctionBoxExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
