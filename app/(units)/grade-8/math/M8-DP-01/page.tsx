import { notFound } from 'next/navigation';
import { ProbabilitySimulator } from '@/components/interactive/math/ProbabilitySimulator';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'M8-DP-01';

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
          확률은 어떤 사건이 일어날 <strong>가능성의 정도</strong>예요. 0(절대 안 일어남) ~ 1(반드시 일어남) 사이의
          수로 표현해요. 동전 앞면 1/2, 주사위 6 나올 확률 1/6.
        </p>
      </SectionCard>
      <SectionCard title="수학적 확률 vs 통계적 확률">
        <p>
          <strong>수학적(이론적) 확률</strong>: (사건이 일어나는 경우의 수) / (모든 경우의 수). 모든 경우가
          동등하게 가능하다는 가정.
        </p>
        <p>
          <strong>통계적(실험적) 확률</strong>: 시행 횟수가 충분히 많을 때 상대도수. 동전을 1만 번 던졌을 때 앞면이 나온 비율.
        </p>
        <p>
          <strong>큰 수의 법칙</strong>: 시행 횟수가 늘어날수록 통계적 확률 → 수학적 확률에 수렴해요.
        </p>
      </SectionCard>
      <SectionCard title="확률의 기본 성질">
        <p>
          어떤 사건 A에 대해 <strong>0 ≤ P(A) ≤ 1</strong>. 반드시 일어나는 사건은 P=1, 절대 안 일어나는 사건은 P=0.
        </p>
        <p>
          <strong>여사건</strong>: A가 일어나지 않을 확률은 1 − P(A). "적어도 하나"가 들어간 문제에서 핵심.
        </p>
        <p>
          <strong>합사건</strong> (서로 배반일 때): P(A∪B) = P(A) + P(B). 동전 1번에서 앞·뒤가 동시에 나올 수 없는 경우 같은 거.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-zinc-700 dark:text-zinc-300">
          <li><strong>"앞이 5번 나왔으니 다음은 뒤일 확률이 높다"</strong> — 도박사의 오류. 매번 던지는 시행은 독립이라 다음도 1/2.</li>
          <li><strong>"확률이 1/2면 두 번 중 한 번은 무조건 일어난다"</strong> — 1/2은 평균적인 비율일 뿐. 두 번 다 같은 결과가 나올 수도 있어요.</li>
          <li><strong>"불가능한 사건이라도 확률은 작은 양수"</strong> — 절대 안 일어나면 P=0이에요(수학적 정의).</li>
        </ul>
      </SectionCard>
      <SectionCard title="실생활 속 확률">
        <p>
          일기예보 강수확률, 보험료 산정, 의료 검사 결과 해석, 게임 아이템 드롭률, 백신 효능 — 모두 확률 계산이에요.
          A형 독감 백신 효능 70%는 백신 맞은 사람 100명 중 70명이 안 걸린다는 뜻이 아니라 미접종 대비 발병률이 70%
          줄어든다는 통계적 표현이에요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <ProbabilitySimulator />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
