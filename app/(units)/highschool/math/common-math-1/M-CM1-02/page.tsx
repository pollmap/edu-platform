import { notFound } from 'next/navigation';
import { RemainderTheoremExplorer } from '@/components/interactive/math/RemainderTheoremExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-CM1-02';

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
          항등식은 <strong>모든 x 값에서 양변이 같은 식</strong>이고, 나머지정리는
          <strong>P(x)를 (x − a)로 나눈 나머지가 P(a)와 같다</strong>는 짧고 강한 정리예요.
          이걸로 「긴 다항식 나눗셈」을 단숨에 한 번의 대입으로 끝낼 수 있어요.
        </p>
      </SectionCard>

      <SectionCard title="핵심 — 정리 두 줄">
        <p>
          ① <strong>나머지정리</strong>: P(x) ÷ (x − a) 의 나머지 = P(a). 한 번의 함숫값 계산으로 끝.<br />
          ② <strong>인수정리</strong>: P(a) = 0 ⇔ (x − a) 가 P(x) 의 인수.<br />
          이 두 정리를 「조립제법」 표로 나란히 보면, 같은 결과가 두 가지 길로 나오는 게 한눈에 들어와요.
        </p>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <p>
          ❌ 「(x + a) 로 나눌 때도 P(a)」 — 부호 주의. (x + a) = (x − (−a)) 라서 P(−a) 가 맞아요.<br />
          ❌ 「항등식 ≠ 방정식」 — 항등식은 모든 x 에서 성립, 방정식은 일부 x 에서만. 계수비교법은 항등식 전용이에요.<br />
          ❌ 조립제법에서 「누락된 차수」를 빠뜨림. x⁴ − 1 처럼 x³, x² 항이 없으면 0 으로 채워야 해요.
        </p>
      </SectionCard>

      <SectionCard title="실생활·시험 응용">
        <p>
          수능 단골 — 「P(x)를 (x − 2)로 나눈 나머지가 5일 때 …」 같은 문제는 결국 P(2) = 5 한 줄로 정리돼요.
          공학에서는 큰 다항식의 근을 찾을 때 인수정리를 써서 후보 a 를 빠르게 검증하고,
          코드의 다항식 연산 라이브러리도 내부적으로 조립제법(Horner method)으로 계산 횟수를 줄여요.
        </p>
      </SectionCard>

      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <RemainderTheoremExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
