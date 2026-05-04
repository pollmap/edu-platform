import { notFound } from 'next/navigation';
import { VectorPlaneExplorer } from '@/components/interactive/math/highschool/VectorPlaneExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-GE-03';

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
          벡터는 <strong>「방향 + 크기를 가진 양」</strong>이에요. 화살표로 표현하고, 좌표 (x, y) 한 쌍으로 나타내요.
          단순한 수 (스칼라)와 달리 「얼마나 + 어디로」를 동시에 다루는 강력한 도구.
          물리·컴퓨터그래픽스·기계학습 모두 벡터 위에서 작동해요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 합·차·스칼라배">
        <p>
          벡터의 합 a + b는 <strong>a 끝점에 b의 시작을 잇기 (평행사변형 또는 삼각형 법칙)</strong>.
          좌표로는 (a₁ + b₁, a₂ + b₂)로 성분끼리 더해요.
          차 a − b는 b의 끝점에서 a의 끝점으로 가는 화살표.
          스칼라배 k·a는 같은 방향으로 k배 늘이거나 (k &lt; 0이면 반대 방향).
          크기 |a| = √(a₁² + a₂²)는 화살표 길이 그 자체 (피타고라스).
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "벡터의 시작점이 중요하다" — 보통 벡터는 「위치 무관」 (자유벡터). 어디 그려도 같은 벡터.
          ❌ "|a + b| = |a| + |b|" — 일반적으로 「≤」 (삼각부등식). 같은 방향일 때만 등호.
          ❌ "벡터를 곱한다" — 벡터끼리 곱은 「내적」 또는 「외적」이라는 별도 개념.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          물체에 작용하는 힘의 합력 (평행사변형 법칙), 비행기 항로 (속도와 바람의 합), 게임 캐릭터 이동 — 모두 벡터 합.
          수능 「기하」에서 벡터의 성분·합·스칼라배 결합 문제가 매년 출제 영역.
          a + b 모드에서 회색 점선이 「b를 평행이동」한 모습이라는 점에 주목해서 평행사변형 법칙을 직접 확인하세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <VectorPlaneExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
