import { notFound } from 'next/navigation';
import { ExponentLogFunctionExplorer } from '@/components/interactive/math/highschool/ExponentLogFunctionExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-AL-02';

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
          지수함수 y = aˣ와 로그함수 y = logₐx는 <strong>y = x에 대해 거울처럼 대칭</strong>인 한 쌍이에요.
          한쪽 그래프를 알면 반대쪽은 좌표를 뒤집기만 하면 돼요.
          a 값 하나가 그래프의 모양·증감·점근선까지 전부 결정한다는 점이 시험 핵심이에요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — a 값에 따른 모양 변화">
        <p>
          지수함수는 <strong>항상 점 (0, 1)</strong>을 지나고 x축이 점근선이에요. a &gt; 1이면 우상향 (증가),
          0 &lt; a &lt; 1이면 우하향 (감소). 로그함수는 <strong>항상 점 (1, 0)</strong>을 지나고 y축이 점근선,
          정의역은 양수만. 두 그래프는 y = x에 대칭이라는 사실이 「역함수의 그래프적 정의」 그 자체예요.
          정의역과 치역이 서로 뒤바뀐다는 점도 같이 기억하세요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "지수함수와 로그함수는 같은 모양이다" — 변수와 결과가 뒤바뀐 역함수예요.
          ❌ "로그함수는 음수 x에서도 정의된다" — 진수가 양수일 때만 정의돼요.
          ❌ "a를 음수로 두면 어떨까?" — 지수·로그 모두 밑이 양수이고 1이 아닐 때만 정의돼요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          복리 이자 (지수 증가)·방사성 동위원소 붕괴 (지수 감소) 모두 같은 함수로 모델링돼요.
          수능 「대수」에서 그래프 변환·평행이동·역함수 그래프를 묻는 문항이 매년 출제돼요.
          체크박스로 로그 그래프와 y = x 대칭선을 켜고 끄면서, 두 그래프가 어떻게 같이 움직이는지 직접 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <ExponentLogFunctionExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
