import { notFound } from 'next/navigation';
import { FunctionContinuityExplorer } from '@/components/interactive/math/highschool/FunctionContinuityExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-CA1-02';

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
          연속이란 <strong>「펜을 떼지 않고 그릴 수 있는」</strong> 함수의 성질이에요.
          엄밀하게는 점 a에서 (1) 함숫값 f(a) 존재, (2) 극한 lim f(x) 존재, (3) 둘이 일치 — 세 조건 모두 만족할 때.
          하나라도 깨지면 그 점에서 「불연속」이고, 그 종류에 따라 구멍·점프·발산 세 가지로 나뉘어요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 불연속 3종류">
        <p>
          <strong>구멍(제거 가능)</strong>: 좌극한=우극한이지만 함숫값이 다르거나 미정의. 식 한 번 고치면 연속이 돼요.
          <strong>점프</strong>: 좌극한 ≠ 우극한. 계단처럼 끊어진 함수 (예: 정의역을 나눈 조건부 함수, 가우스 함수 [x]).
          <strong>발산(무한)</strong>: 극한이 ±∞. y = 1/x는 x=0에서 발산 — 점근선이 생기는 이유.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ 「f(a)가 정의돼 있으면 연속이다」 — 극한이 함숫값과 다르면 불연속.
          ❌ 「좌극한과 우극한이 같으면 연속이다」 — 함숫값까지 일치해야 해요 (구멍 사례).
          ❌ 「불연속점에서는 무조건 미분 불가능」 — 맞아요. 미분 가능 ⊂ 연속이지만 역은 성립 X (예: |x|는 0에서 연속이지만 미분 불가).
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          전기료 누진제는 「점프 불연속」 함수 — 사용량 한계를 살짝 넘으면 단가가 갑자기 뜀.
          수능 「미적분Ⅰ」 빈출 유형: 조건부 함수의 매개변수 a값을 구해서 연속이 되도록 만들기.
          버튼으로 4가지 유형을 비교하고, 검사점 a를 움직여 좌·우극한과 함숫값이 어떻게 갈라지는지 확인해 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <FunctionContinuityExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
