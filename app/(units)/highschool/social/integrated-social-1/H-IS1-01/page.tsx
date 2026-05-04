import { notFound } from 'next/navigation';
import { MultiPerspectiveAnalyzer } from '@/components/interactive/social/MultiPerspectiveAnalyzer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'H-IS1-01';

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
          통합사회는 <strong>한 현상을 시간·공간·사회·윤리 4가지 관점으로 동시에 보는</strong> 과목이에요.
          하나의 시각으로만 보면 놓치는 부분이, 4축을 거치면 윤곽이 잡혀요. 통합사회 전체의 출발점이자 분석 도구.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 4관점의 작동">
        <p>
          ① <strong>시간 관점</strong>: 과거 → 현재 → 미래 흐름 속 위치. ② <strong>공간 관점</strong>: 지역·자원·환경의 차이.
          ③ <strong>사회 관점</strong>: 집단·계층·이해관계의 맞물림. ④ <strong>윤리 관점</strong>: 가치 판단·책임·정의.
          한 문제에 4관점을 차례로 적용해 보면 단편적 결론이 점차 두꺼워져요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "통합 = 모든 의견을 평균 내기" — 통합은 다관점 분석이지 산술적 절충이 아니에요.
          ❌ "윤리 관점은 주관일 뿐" — 윤리 판단도 근거와 일관성이 있을 때 객관적으로 다룰 수 있어요.
          ❌ "어떤 관점이 더 중요하다" — 사안에 따라 비중은 달라지지만, 처음부터 한 관점을 빼고 시작하지 않아요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          뉴스 한 건을 4관점으로 분석해 보면, 댓글창에서 보이지 않던 깊이가 보여요.
          내신·수행평가·논술에서 통합적 관점은 거의 모든 단원의 기본 분석 도구로 쓰여요.
          아래에서 3가지 사회 현상을 4관점으로 비교해 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <MultiPerspectiveAnalyzer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
