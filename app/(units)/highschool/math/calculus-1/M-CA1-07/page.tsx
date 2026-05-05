import { notFound } from 'next/navigation';
import { DefiniteIntegralAreaExplorer } from '@/components/interactive/math/highschool/DefiniteIntegralAreaExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-CA1-07';

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
          정적분의 가장 친숙한 응용은 <strong>「곡선과 직선이 만든 닫힌 영역의 넓이」</strong>예요.
          핵심 한 줄: 「위 함수 빼기 아래 함수」를 두 교점 사이에서 적분.
          포물선과 직선이 만든 영역은 (4/3)(a−b)^(3/2)라는 깔끔한 공식으로 정리돼요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 면적 공식 3단계">
        <p>
          ① <strong>교점 찾기</strong>: f(x) = g(x)를 풀어 α, β.
          ② <strong>위/아래 판정</strong>: α {`<`} x {`<`} β 구간에서 누가 위인지 점 하나 대입해 확인.
          ③ <strong>적분 계산</strong>: ∫_α^β (f − g) dx. 부호가 음수로 나오면 위/아래를 바꿔 다시.
          포물선 −x² + a 와 수평선 b의 경우: 교점은 ±√(a−b), 넓이 = (4/3)(a−b)^(3/2).
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ 「정적분 값 = 넓이」 — 함수가 음수 구간에서는 적분 값도 음수예요. 넓이는 |f(x) − g(x)|의 적분.
          ❌ 「두 함수가 만나야 영역이 닫힌다」 — 맞아요. 만나지 않으면 무한대.
          ❌ 「적분상수 C는 정적분에서도 필요하다」 — F(b) − F(a)를 계산할 때 C는 사라져요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          물리: 속도 그래프 아래 면적 = 이동 거리. 경제: 한계비용·한계수입 곡선 사이 면적 = 총비용·총수입의 차이.
          a (포물선 정점)과 b (수평선)을 움직이며 두 곡선이 만나는 순간(a = b)에 영역이 사라지는 것을 확인해 보세요.
          수능 「미적분Ⅰ」 빈출 유형: 두 곡선 교점 + 정적분 계산이 한 문제로 묶여 나옵니다.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <DefiniteIntegralAreaExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
