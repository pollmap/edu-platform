import { notFound } from 'next/navigation';
import { LinearFunctionExplorer } from '@/components/interactive/math/LinearFunctionExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'M8-CR-05';

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
          <strong>일차함수와 일차방정식은 똑같은 정보의 두 얼굴</strong>이에요.
          y = mx + b 라는 함수의 그래프 위 점은 ax + by = c 라는 방정식의 해와 같아요.
        </p>
      </SectionCard>

      <SectionCard title="핵심·왜 — 식 ↔ 그래프">
        <p>이항하면 같은 직선의 다른 표기일 뿐이에요.</p>
        <ul className="list-disc pl-6 space-y-1 text-sm font-mono">
          <li>2x + y = 4 ↔ y = -2x + 4 &nbsp;<span className="font-sans text-zinc-500">(기울기 -2, y절편 4)</span></li>
          <li>3x - y = 1 ↔ y = 3x - 1 &nbsp;<span className="font-sans text-zinc-500">(기울기 3, y절편 -1)</span></li>
          <li>y = 5 ↔ 0 · x + y = 5 &nbsp;<span className="font-sans text-zinc-500">(수평선)</span></li>
          <li>x = -2 ↔ x + 0 · y = -2 &nbsp;<span className="font-sans text-zinc-500">(수직선, 함수 X)</span></li>
        </ul>
      </SectionCard>

      <SectionCard title="핵심·왜 — 연립방정식의 그래프 풀이">
        <p>
          연립일차방정식 두 식을 각각 일차함수로 바꾸면 그래프 위 두 직선이에요.
          두 식을 동시에 만족하는 (x, y) = 두 직선이 만나는 <strong>교점</strong>.
        </p>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li>두 직선이 한 점에서 만나면 → 해가 1개.</li>
          <li>두 직선이 평행이면 → 해 없음(만나지 않음).</li>
          <li>두 직선이 같으면 → 해가 무수히 많음(전부 같은 직선 위).</li>
        </ul>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <ul className="list-disc list-inside space-y-1.5 text-sm">
          <li><strong>오개념 1.</strong> 「식과 그래프는 다른 단원」 → 같은 정보를 표·식·그래프 셋으로 표현할 뿐. 그래프에서 해를 「읽는」 능력이 핵심.</li>
          <li><strong>오개념 2.</strong> 「수직선 x = 3도 일차함수」 → 한 x값에 y가 무한이라 함수가 아니에요. 일차방정식이긴 해도 함수 X.</li>
          <li><strong>오개념 3.</strong> 「그래프로 풀면 정답이 부정확해도 OK」 → 보조 도구로만 쓰고, 정확한 해는 식으로 계산해 검증해야 해요.</li>
        </ul>
      </SectionCard>

      <SectionCard title="실생활">
        <p>
          두 회사 요금제가 어디서 갈리는지, 두 자동차의 연비 비교에서 어디서 역전되는지, 거리·시간 그래프에서 만남 지점 찾기 등 — 「식으로 보는 안목」과 「그래프로 보는 안목」을 자유롭게 오갈 수 있으면 문제 해결이 훨씬 쉬워져요.
        </p>
      </SectionCard>

      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <LinearFunctionExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
