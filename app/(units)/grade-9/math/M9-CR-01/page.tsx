import { notFound } from 'next/navigation';
import { AreaModelMultiplication } from '@/components/interactive/math/AreaModelMultiplication';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'M9-CR-01';

export function generateMetadata() {
  const unit = findUnit(UNIT_ID);
  return unit ? makeUnitMetadata(unit) : {};
}

export default function Page() {
  const unit = findUnit(UNIT_ID);
  if (!unit || unit.schoolLevel === 'highschool' || unit.grade === undefined) notFound();

  return (
    <main className="container mx-auto max-w-5xl px-4 py-8">
      <UnitHeader
        unit={unit}
        breadcrumb={[
          { label: '홈', href: '/' },
          { label: `${GRADE_LABEL[unit.grade]} / ${SUBJECT_LABEL[unit.subject]}`, href: `/grade-${unit.grade}/${unit.subject}` },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />

      <SectionCard title="한마디로">
        <p>
          <strong>다항식 곱셈</strong>은 「면적 만들기」, <strong>인수분해</strong>는 그 반대로 「면적을 변끼리로 쪼개기」예요.
          두 작업은 서로 반대 방향의 한 짝이에요.
        </p>
      </SectionCard>

      <SectionCard title="핵심·왜 — 곱셈 공식">
        <p>외울 공식 같지만, 면적 모델로 보면 그냥 사각형 쪼개기예요.</p>
        <ul className="list-disc pl-6 space-y-1 text-sm font-mono">
          <li>(a + b)² = a² + 2ab + b² &nbsp;<span className="font-sans text-zinc-500">— 합의 제곱</span></li>
          <li>(a − b)² = a² − 2ab + b² &nbsp;<span className="font-sans text-zinc-500">— 차의 제곱</span></li>
          <li>(a + b)(a − b) = a² − b² &nbsp;<span className="font-sans text-zinc-500">— 합·차의 곱</span></li>
          <li>(x + a)(x + b) = x² + (a+b)x + ab</li>
          <li>(ax + b)(cx + d) = acx² + (ad+bc)x + bd</li>
        </ul>
      </SectionCard>

      <SectionCard title="핵심·왜 — 인수분해">
        <p>역방향: 다항식을 두 식의 곱으로 쪼개요. 절차는 보통 다음 순서.</p>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li>① <strong>공통인수</strong>로 묶기. 예) 6x² + 9x = 3x(2x + 3).</li>
          <li>② <strong>완전제곱식</strong> 알아보기. 예) x² + 6x + 9 = (x + 3)².</li>
          <li>③ <strong>합·차의 제곱</strong>. 예) x² − 25 = (x + 5)(x − 5).</li>
          <li>④ <strong>x² + (a+b)x + ab</strong>: 곱이 ab, 합이 a + b인 두 수 찾기.</li>
        </ul>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <ul className="list-disc list-inside space-y-1.5 text-sm">
          <li><strong>오개념 1.</strong> 「(a + b)² = a² + b²」 → 가운데 항 2ab가 빠졌어요. 면적 모델로 보면 직사각형 두 개가 누락된 거.</li>
          <li><strong>오개념 2.</strong> 「인수분해는 답이 하나」 → 공통인수 묶기 + 곱셈 공식을 끝까지 적용해야 해요. x⁴ − 16 = (x² + 4)(x² − 4) = (x² + 4)(x + 2)(x − 2).</li>
          <li><strong>오개념 3.</strong> 「부호 안 챙겨도 돼」 → (a − b)² 의 가운데는 −2ab. 부호가 결과를 좌우해요.</li>
        </ul>
      </SectionCard>

      <SectionCard title="실생활 속 인수분해">
        <p>
          이차방정식 풀이의 핵심 도구예요. 「곱이 0이려면 둘 중 하나가 0」을 쓰는 영점 곱(zero product) 트릭은 인수분해 후에야 가능해요.
          수의 소인수분해도 같은 아이디어 — 「쪼갤 수 있는 만큼 쪼개서 단순화」가 인수분해의 본질.
        </p>
      </SectionCard>

      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <AreaModelMultiplication />
        </InteractiveErrorBoundary>
        <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
          ※ 위 격자 모델로 (10·a + b) × c 의 분배 방식을 익히면, 그대로 (x + a)(x + b) 같은 다항식 곱셈에도 적용돼요.
        </p>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
