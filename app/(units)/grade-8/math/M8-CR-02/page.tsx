import { notFound } from 'next/navigation';
import { LinearEquationBalance } from '@/components/interactive/math/LinearEquationBalance';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'M8-CR-02';

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
          <strong>일차부등식</strong>은 = 대신 &gt;, &lt;, ≥, ≤ 가 들어간 일차식이에요. 답은 한 점이 아니라 <strong>수직선 위 한 구간</strong>이에요.
        </p>
      </SectionCard>

      <SectionCard title="핵심·왜">
        <p>
          방정식은 「양쪽이 같다」는 약속이지만, 부등식은 「한쪽이 더 크다(작다)」는 약속이에요. 그래서 해도 한 값이 아니라 「이 범위 안의 모든 수」.
        </p>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li>풀이 절차는 일차방정식과 거의 같아요: 같은 수 더하기·빼기, 같은 수 곱하기·나누기.</li>
          <li><strong>딱 한 가지 다른 점</strong>: <span className="font-mono">음수를 곱하거나 나눌 때 부등호 방향이 뒤집혀요</span>. 예) -2x &gt; 6 → x &lt; -3.</li>
          <li>해를 수직선 위에 표시: ≥, ≤ 면 점을 채우고(●), &gt;, &lt; 면 점을 비워요(○).</li>
        </ul>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <ul className="list-disc list-inside space-y-1.5 text-sm">
          <li><strong>오개념 1.</strong> 「부등호 방향은 절대 안 변해」 — 음수 곱·나눗셈에선 반드시 뒤집어요. 가장 자주 틀리는 부분.</li>
          <li><strong>오개념 2.</strong> 「x &gt; 3이면 정수만 답」 — 부등식의 해는 보통 실수예요. 3.5, 3.1, 100 모두 해.</li>
          <li><strong>오개념 3.</strong> 「= 만 풀면 끝」 — 방정식 풀이로 끝점만 찾고, 어느 쪽 구간이 답인지 검산해야 해요.</li>
        </ul>
      </SectionCard>

      <SectionCard title="실생활 속 부등식">
        <p>
          용돈 계산, 시속·시간 제한, 합격 점수 기준이 모두 부등식이에요. 「최소 80점 이상」, 「택시 기본요금 + 거리 요금이 만 원 이하가 되려면」 같은
          조건은 일차부등식으로 풀어요.
        </p>
      </SectionCard>

      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <LinearEquationBalance />
        </InteractiveErrorBoundary>
        <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
          ※ 위 시뮬은 등식(=) 양팔 저울이에요. 부등식은 같은 절차로 풀되 「음수 곱·나눗셈에서 부등호 방향 반전」만 추가로 기억하세요.
        </p>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
