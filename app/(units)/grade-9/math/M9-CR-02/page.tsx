import { notFound } from 'next/navigation';
import { QuadraticFunctionExplorer } from '@/components/interactive/math/QuadraticFunctionExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'M9-CR-02';

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
          <strong>이차방정식</strong> ax² + bx + c = 0 의 해는 일차방정식과 달리 보통 <strong>두 개</strong>예요.
          「근의 공식」 한 줄이면 어떤 이차방정식도 풀 수 있어요.
        </p>
      </SectionCard>

      <SectionCard title="핵심·왜 — 풀이 4가지 길">
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li><strong>인수분해</strong>: x² − 5x + 6 = 0 → (x − 2)(x − 3) = 0 → x = 2 또는 3. 가장 빠른 길이지만 깔끔히 인수분해될 때만.</li>
          <li><strong>제곱근</strong>: ax² = c → x = ±√(c/a). x²만 있고 x항 없을 때.</li>
          <li><strong>완전제곱</strong>: ax² + bx + c → a(x − h)² = k 형태로 변형 후 제곱근. 근의 공식의 유도 방법.</li>
          <li><strong>근의 공식</strong>: <span className="font-mono">x = (−b ± √(b² − 4ac)) / 2a</span>. 만능, 항상 작동.</li>
        </ul>
      </SectionCard>

      <SectionCard title="핵심·왜 — 판별식 D">
        <p>
          근의 공식 안의 <span className="font-mono">b² − 4ac</span>를 <strong>판별식 D</strong>라고 해요. 풀어보지 않고도 해의 모양을 알려줘요.
        </p>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li><strong>D &gt; 0</strong>: 서로 다른 두 실근. 그래프가 x축과 두 점에서 만남.</li>
          <li><strong>D = 0</strong>: 중근(같은 두 근). 그래프가 x축에 접함.</li>
          <li><strong>D &lt; 0</strong>: 실근 없음. 그래프가 x축과 안 만남(중3에선 「해 없음」, 고등에선 허근).</li>
        </ul>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <ul className="list-disc list-inside space-y-1.5 text-sm">
          <li><strong>오개념 1.</strong> 「= 0이 아니어도 인수분해로 풀 수 있다」 → 반드시 우변을 0으로 만든 뒤 인수분해. x² + x = 6은 먼저 x² + x − 6 = 0으로.</li>
          <li><strong>오개념 2.</strong> 「근이 두 개면 D &gt; 0」 → 같은 두 근(중근)도 「근 두 개」지만 D = 0이에요. 「서로 다른」이 빠지면 곤란.</li>
          <li><strong>오개념 3.</strong> 「a로 나누면 끝」 → 양변을 a로 나누는 건 좋지만, b/a, c/a로 분수가 나오면 계산이 더러워져요. 정수 계수 그대로 푸는 게 보통 안전.</li>
        </ul>
      </SectionCard>

      <SectionCard title="실생활 속 이차방정식">
        <p>
          공을 위로 던졌을 때 「언제 땅에 떨어질까?」, 사각형 정원 면적이 주어졌을 때 「변의 길이는?」, 자동차 제동거리 추정 등 — 변수가 한 번 곱해진 자리에 들어가면 자연스럽게 나타나요.
        </p>
      </SectionCard>

      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <QuadraticFunctionExplorer />
        </InteractiveErrorBoundary>
        <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
          ※ 그래프가 x축과 만나는 점이 ax² + bx + c = 0의 실근. D 값을 함께 보면 해의 개수도 바로 보여요.
        </p>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
