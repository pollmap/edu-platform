import { notFound } from 'next/navigation';
import { SupplyDemandExplorer } from '@/components/interactive/social/SupplyDemandExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'H-EC';

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
          경제는 <strong>희소한 자원을 어떻게 나눌지</strong>를 다루는 과목이에요.
          그 모든 결정의 출발점이 <strong>수요와 공급</strong>이라는 두 곡선이에요.
          가격은 어떻게 정해지고, 왜 변동하며, 정부 개입은 어떤 효과를 내는지 — 모두 이 한 그래프에서 출발해요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 균형의 발생과 이동">
        <p>
          수요곡선은 <strong>가격이 오르면 사려는 양이 줄어드는</strong> 음의 기울기, 공급곡선은
          <strong>가격이 오르면 팔려는 양이 늘어나는</strong> 양의 기울기예요. 두 곡선이 만나는 점이 시장 균형(P*, Q*).
          소득·기호·날씨·기술 같은 외부 요인은 곡선 자체를 좌우로 이동시켜 균형점을 옮겨요.
          이걸 알면 "왜 여름철 에어컨 가격이 오르나"부터 "왜 반도체 호황·불황이 반복되나"까지 같은 모델로 설명돼요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "수요가 늘면 가격이 무조건 오른다" — 공급이 동시에 늘면 가격은 그대로일 수도 있어요.
          ❌ "가격이 오르면 수요가 줄어드는 게 수요 이동이다" — 같은 곡선 위에서 점이 움직이는 건 「수요량 변화」. 곡선 자체가 움직여야 「수요 변화」.
          ❌ "정부가 가격을 누르면 무조건 좋다" — 가격 상한이 균형 가격보다 낮으면 만성적인 초과 수요(품귀)가 생겨요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          뉴스의 농산물 가격 급등, 유가 하락, 부동산 정책, 기준금리 인상 — 모두 수요·공급 그래프 한 장으로 분석돼요.
          수능 사회탐구 「경제」는 곡선 이동 방향을 묻는 문제가 단원당 1~2문제씩 꼭 나와요.
          공무원·은행·증권사 시험에도 자주 등장하니, 슬라이더로 직접 곡선을 움직여 균형점이 어디로 가는지 감을 잡아 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <SupplyDemandExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
