import { notFound } from 'next/navigation';
import { TruthTableExplorer } from '@/components/interactive/math/TruthTableExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-CM2-06';

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
          명제는 <strong>참·거짓이 분명한 문장</strong>이에요.
          「p 이면 q」(p → q) 같은 조건문에 대해 <strong>역·이·대우</strong> 가 정의되고,
          그중 「<strong>대우는 항상 원명제와 동치</strong>」가 가장 강력한 도구예요. 직접 증명이 막히면 대우로 돌아가요.
        </p>
      </SectionCard>

      <SectionCard title="핵심 — 역·이·대우와 동치">
        <p>
          원명제 p → q 에 대해<br />
          ① 역: q → p<br />
          ② 이: ¬p → ¬q<br />
          ③ 대우: ¬q → ¬p<br />
          항상 성립하는 동치: <strong>원명제 ≡ 대우</strong>, <strong>역 ≡ 이</strong>.<br />
          반례 하나만 찾아도 명제는 거짓. 「모든」 명제는 「∃ 반례」 로, 「어떤」 명제는 「∀ 반례 X」로 부정.
        </p>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <p>
          ❌ 「원명제가 참이면 역도 참」 — 항상 그렇진 않음. 대우만 참이 보장돼요.<br />
          ❌ ¬(p ∧ q) ≠ ¬p ∧ ¬q — 드모르간으로 ¬(p ∧ q) = ¬p ∨ ¬q.<br />
          ❌ 「p 이면 q」 와 「p 일 때 q」를 같은 의미라고 본 채 일상어와 혼동.
        </p>
      </SectionCard>

      <SectionCard title="실생활·시험 응용">
        <p>
          법조항 해석(「∼ 한 자는 ∼ 한다」 의 대우 검토), 알고리즘의 조건 분기, 디버깅의 「반례 찾기」 — 모두 명제 논리 위에서.
          수능에서는 「충분조건·필요조건」 식별 문제가 단골이며, 이는 결국 p → q 가 참인지 q → p 가 참인지의 짝 문제예요.
          진리표로 직접 4가지 조합을 채워 보면 역·이·대우의 동치 관계가 한눈에 들어와요.
        </p>
      </SectionCard>

      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <TruthTableExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
