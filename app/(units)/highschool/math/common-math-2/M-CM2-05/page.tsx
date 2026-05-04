import { notFound } from 'next/navigation';
import { VennDiagramExplorer } from '@/components/interactive/math/VennDiagramExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-CM2-05';

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
          집합은 <strong>「조건을 만족하는 원소들의 모임」</strong>이에요.
          벤다이어그램 한 장이면 합집합·교집합·차집합·여집합·드모르간까지 한눈에 들어와요.
          중학교 「자연수의 집합」 정도였다면, 고등에서는 「집합의 원소 개수」와 「드모르간 법칙」 을 자유자재로 다루는 게 목표.
        </p>
      </SectionCard>

      <SectionCard title="핵심 — 연산과 드모르간">
        <p>
          ① 합집합 A ∪ B = A 또는 B 에 속하는 모든 원소.<br />
          ② 교집합 A ∩ B = A 와 B 둘 다에 속하는 원소.<br />
          ③ 차집합 A − B = A 에 있고 B 에 없는 원소.<br />
          ④ 여집합 A^c = U − A.<br />
          ⑤ <strong>드모르간 법칙</strong>: (A ∪ B)^c = A^c ∩ B^c, (A ∩ B)^c = A^c ∪ B^c.<br />
          ⑥ 원소 개수: n(A ∪ B) = n(A) + n(B) − n(A ∩ B).
        </p>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <p>
          ❌ A ⊂ B 와 A ∈ B 혼동 — 부분집합과 원소 관계는 다름.<br />
          ❌ 공집합 ∅ 은 「아무것도 없는 것」이지만, 모든 집합의 부분집합이에요.<br />
          ❌ 「전체집합 U」를 명시 안 하면 여집합이 정의되지 않음. 문제에서 U 가 무엇인지 항상 확인.
        </p>
      </SectionCard>

      <SectionCard title="실생활·시험 응용">
        <p>
          데이터베이스의 SQL JOIN(교집합·합집합), 검색 엔진의 「A AND B / A OR B」 필터, 통계의 사건 — 모두 같은 집합 연산.
          수능에서는 「벤다이어그램 + 원소 개수」 결합 문제가 단골이고, 명제·확률 단원의 출발점이라 여기서 흔들리면 다음이 다 막혀요.
          영역을 직접 클릭해서 켜고 끄며 식과 그림을 동기화시켜 보세요.
        </p>
      </SectionCard>

      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <VennDiagramExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
