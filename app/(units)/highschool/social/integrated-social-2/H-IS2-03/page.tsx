import { notFound } from 'next/navigation';
import { GlobalizationIndicatorsExplorer } from '@/components/interactive/social/GlobalizationIndicatorsExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'H-IS2-03';

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
          세계화는 <strong>좋고 나쁨이 정해진 단일 흐름이 아니에요</strong>. 경제·문화·사람·환경·안보 5영역에서
          각각 다른 혜택과 비용을 만들어요. 평화도 같은 방식으로 다층적으로 다뤄야 해요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 5영역의 양면">
        <p>
          무역·자본은 가격 인하와 일자리 이전을 동시에. 문화·미디어는 다양성과 동질화를 동시에.
          사람·이주는 인재 교류와 사회 통합 과제를. 환경·기후는 공동 대응 가능성과 초국경 문제를.
          안보·평화는 상호 의존의 비용 효과와 새로운 위협을. <strong>영역별·집단별로 균형이 갈리는 점</strong>이 핵심.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "세계화 = 미국화" — 한 방향만 있는 게 아니라 다중 방향의 흐름이에요.
          ❌ "세계화 vs 반세계화 양자택일" — 영역별로 더 통합할 부분과 더 보호할 부분이 다를 수 있어요.
          ❌ "세계화로 모두가 이익" — 같은 사회 안에서도 이익 보는 집단과 손해 보는 집단이 갈려요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          공급망 충격·콘텐츠 글로벌 확산·기후 협약 — 모두 5영역 어딘가에서 일어나는 현상.
          내신·수행평가는 사례 → 영역 분류, 양면 비교가 자주 출제. 아래에서 5영역을 직접 비교해 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <GlobalizationIndicatorsExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
