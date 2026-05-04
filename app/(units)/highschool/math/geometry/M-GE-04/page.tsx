import { notFound } from 'next/navigation';
import { VectorDotProductExplorer } from '@/components/interactive/math/highschool/VectorDotProductExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-GE-04';

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
          내적은 <strong>「두 벡터가 얼마나 같은 방향을 향하는가」</strong>를 하나의 수 (스칼라)로 만들어 주는 도구예요.
          a · b = |a||b|cos θ. 두 벡터가 수직이면 정확히 0, 같은 방향이면 최대, 반대 방향이면 음수의 최소.
          이 한 식으로 두 벡터의 각도를 구할 수 있어요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 두 가지 정의가 같음">
        <p>
          좌표 정의: <strong>a · b = a₁b₁ + a₂b₂</strong> (성분끼리 곱한 합).
          기하 정의: <strong>a · b = |a||b|cos θ</strong>.
          두 정의를 결합하면 cos θ = (a · b) / (|a||b|)로 두 벡터 사이 각도가 즉시 나와요.
          핵심 응용: <strong>a · b = 0 ⇔ a와 b가 수직</strong>. 이게 시험에 가장 많이 쓰이는 사실.
          한 벡터를 다른 벡터 방향으로 「투영 (사영)」한 길이가 |a|cos θ.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "내적의 결과는 벡터이다" — 결과는 수 (스칼라).
          ❌ "내적이 양수면 같은 방향이다" — 양수면 「예각」 (꼭 같은 방향은 아님).
          ❌ "(a·b)·c는 의미 있다" — (a·b)는 스칼라이므로 c와의 「내적」이 정의되지 않음.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          힘이 한 일 W = F · d (힘과 변위의 내적). 컴퓨터 그래픽스의 조명 계산 (빛 방향 · 표면 법선).
          코사인 유사도 (검색·추천 시스템 핵심 기술)가 정확히 이 내적이에요.
          수능 「기하」 매년 빈출, 수직 조건·각도 계산·사영 길이 모두 내적 한 도구로 풀려요.
          슬라이더로 벡터 b를 움직여 cos θ가 0이 되는 순간 (수직)을 찾아보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <VectorDotProductExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
