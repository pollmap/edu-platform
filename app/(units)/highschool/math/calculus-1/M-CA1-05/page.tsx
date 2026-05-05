import { notFound } from 'next/navigation';
import { IndefiniteIntegralExplorer } from '@/components/interactive/math/highschool/IndefiniteIntegralExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-CA1-05';

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
          부정적분은 미분의 <strong>「되돌리기」</strong>입니다.
          F&apos;(x) = f(x)를 만족하는 모든 F가 답이고, 그들끼리는 「상수만 다르다」는 것이 핵심.
          그래서 답을 적을 때 항상 <strong>+ C</strong>를 잊으면 안 돼요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 기본 공식 4가지">
        <p>
          ① <strong>∫xⁿ dx = xⁿ⁺¹/(n+1) + C</strong> (n ≠ −1). 미분의 거꾸로 — 지수에 1을 더하고 그 수로 나눠요.
          ② <strong>∫1/x dx = ln|x| + C</strong>. n = −1 예외.
          ③ <strong>∫sin x dx = −cos x + C</strong>, ∫cos x dx = sin x + C.
          ④ <strong>∫eˣ dx = eˣ + C</strong>. eˣ는 자기 자신이 미분도 적분도 결과예요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ 「+C를 안 써도 된다」 — 부정적분의 답은 「함수족」이에요. 상수 차이가 무한히 많은 답을 모두 포함.
          ❌ 「∫1/x dx = x⁰/0」 — 0으로 나눌 수 없음. ln|x| + C가 정답.
          ❌ 「적분 가능 = 미분 가능」 — 거꾸로예요. 적분 가능이 더 약한 조건.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          위치를 미분하면 속도, 적분하면 다시 위치. 운동학에서 가속도 → 속도 → 위치로 거꾸로 거슬러 갈 때 부정적분을 써요.
          C 슬라이더를 움직여 빨간 곡선 F(x)가 위·아래로만 평행이동하고 파란 f(x)는 변하지 않는 모습을 확인해 보세요.
          수능 「미적분Ⅰ」에서 부정적분 → 정적분으로 자연스럽게 이어집니다.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <IndefiniteIntegralExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
