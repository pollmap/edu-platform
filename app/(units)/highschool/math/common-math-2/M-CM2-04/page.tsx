import { notFound } from 'next/navigation';
import { TransformationExplorer } from '@/components/interactive/math/TransformationExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-CM2-04';

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
          도형의 이동은 <strong>모든 좌표를 같은 규칙으로 옮기는 일</strong>이에요.
          평행이동·x축 대칭·y축 대칭·원점 대칭·y = x 대칭 — 다섯 가지 변환만 알면 거의 모든 도형 문제가 다뤄져요.
          이동 후의 식은 「원래 식의 x, y 자리에 변환된 좌표를 대입한 것」 이라는 한 줄 원칙으로 통일돼요.
        </p>
      </SectionCard>

      <SectionCard title="핵심 — 다섯 가지 변환 규칙">
        <p>
          ① 평행이동 a, b 만큼: (x, y) → (x + a, y + b). 식: f(x − a, y − b) = 0.<br />
          ② x축 대칭: (x, y) → (x, −y). 식 y → −y 대입.<br />
          ③ y축 대칭: (x, y) → (−x, y). 식 x → −x 대입.<br />
          ④ 원점 대칭: (x, y) → (−x, −y). 식 x → −x, y → −y.<br />
          ⑤ y = x 대칭: (x, y) → (y, x). 식 x ↔ y 교환.
        </p>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <p>
          ❌ 평행이동 후 식에서 부호 헷갈림 — y = f(x − a) 는 「오른쪽」 으로 a 만큼.<br />
          ❌ 점은 (x + a, y + b) 로 가지만, 식은 「반대 부호」(x − a, y − b) 가 들어가요. 이걸 동시에 안 잊는 게 핵심.<br />
          ❌ y = x 대칭은 「역함수」 와 같은 변환 — y = f(x) 의 역함수가 y = x 대칭이에요.
        </p>
      </SectionCard>

      <SectionCard title="실생활·시험 응용">
        <p>
          그래픽 프로그래밍의 이미지 변환(반사·회전), 게임 캐릭터의 좌표 이동, 컴퓨터 비전 — 모두 같은 좌표 변환 규칙.
          수능 공통수학2 에서는 「원·직선·이차함수의 이동 후 식」을 묻는 문제가 한 단원에 1~2문제씩 들어가요.
          간단해 보이지만 부호 실수 잦으니, 아래 시각화로 좌표 변화를 직접 확인해 두세요.
        </p>
      </SectionCard>

      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <TransformationExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
