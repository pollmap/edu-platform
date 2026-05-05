import { notFound } from 'next/navigation';
import { DerivativeApplicationExplorer } from '@/components/interactive/math/highschool/DerivativeApplicationExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-CA1-04';

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
          도함수 f&apos;(x)는 <strong>곡선의 「기울기 함수」</strong>예요.
          한 점에서의 접선 기울기, 함수가 증가/감소하는 구간, 최댓값·최솟값(극값)을 모두 도함수로 판별합니다.
          미분의 진짜 가치는 「변화율을 분석하는 도구」라는 점이에요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 접선·증감·극값 3종 세트">
        <p>
          <strong>접선</strong>: 점 (a, f(a))에서 기울기 = f&apos;(a). 접선식 y = f&apos;(a)(x − a) + f(a).
          <strong>증감</strong>: f&apos;(x) {`>`} 0 → 증가, f&apos;(x) {`<`} 0 → 감소.
          <strong>극값 후보</strong>: f&apos;(x) = 0이 되는 점. 부호가 +→− 바뀌면 극대, −→+ 바뀌면 극소.
          중요: f&apos;(x) = 0이라고 해서 항상 극값은 아님 (변곡점일 수 있음).
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ 「극값 = 최댓값/최솟값」 — 극값은 「국소」, 최댓값은 「전역」이에요. 닫힌 구간 [a, b]에서는 양 끝점도 후보로 봐야 해요.
          ❌ 「f&apos;(x) = 0이면 무조건 극값」 — y = x³은 x=0에서 f&apos;(0)=0이지만 극값 아님.
          ❌ 「접선은 곡선과 한 점에서만 만난다」 — 일반적으로 그렇지 않아요. 다른 점에서 또 만날 수 있어요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          최적화: 「가장 적은 재료로 가장 큰 부피의 상자」, 「최저 비용 경로」 등은 모두 f&apos;(x) = 0을 푸는 문제.
          삼차함수의 계수 a, b, c를 슬라이더로 움직여 보세요. 극값 후보(주황 점)가 사라지거나 두 개가 합쳐지는 순간을 확인할 수 있어요.
          수능 「미적분Ⅰ」에서 매년 1~2문제는 도함수의 부호 분석으로 풀이가 갈립니다.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <DerivativeApplicationExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
