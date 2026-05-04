import { notFound } from 'next/navigation';
import { AreaModelMultiplication } from '@/components/interactive/math/AreaModelMultiplication';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-CM1-03';

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
          인수분해는 <strong>다항식을 두 식의 곱으로 쪼개는 일</strong>이에요.
          곱셈의 정반대 방향. 면적을 만들 때는 분배가, 면적에서 변을 찾을 때는 인수분해가 들어가요.
          공통수학1 단원 절반은 「인수분해 한 줄로 풀린다」고 해도 과언이 아니에요.
        </p>
      </SectionCard>

      <SectionCard title="핵심 — 5가지 패턴">
        <p>
          ① <strong>공통인수</strong>: ax + ay = a(x + y).<br />
          ② <strong>완전제곱식</strong>: a² ± 2ab + b² = (a ± b)².<br />
          ③ <strong>합·차의 곱</strong>: a² − b² = (a + b)(a − b).<br />
          ④ <strong>이차삼항식</strong>: x² + (a + b)x + ab = (x + a)(x + b). 합·곱 두 수 찾기.<br />
          ⑤ <strong>세제곱 합·차</strong>: a³ ± b³ = (a ± b)(a² ∓ ab + b²).
        </p>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <p>
          ❌ 「공통인수만 묶고 끝」 — 묶은 뒤에도 공식이 더 적용되는지 확인. x⁴ − 16 = (x² + 4)(x² − 4) = (x² + 4)(x + 2)(x − 2).<br />
          ❌ 「부호 안 챙겨도 돼」 — (a − b)² 의 가운데는 −2ab. 부호 하나로 결과 갈림.<br />
          ❌ 「치환의 가능성」을 놓침. x⁴ + x² + 1 같은 식은 x² = t 로 치환하면 이차로 보임.
        </p>
      </SectionCard>

      <SectionCard title="실생활·시험 응용">
        <p>
          이차방정식의 영점 곱(zero product) 풀이는 인수분해의 직접 응용이에요.
          암호학·신호처리도 큰 다항식을 인수분해해 작은 부품으로 분해. 수능에서는 모든 함수·방정식 단원의 「밑단」 도구라
          이게 빠르지 않으면 시험 시간 자체가 부족해요.
        </p>
      </SectionCard>

      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <AreaModelMultiplication />
        </InteractiveErrorBoundary>
        <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
          ※ 면적 모델로 곱셈을 익히면, 그대로 인수분해 ④ 패턴(합·곱 두 수 찾기)으로 거꾸로 적용돼요.
        </p>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
