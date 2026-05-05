import { notFound } from 'next/navigation';
import { UnitSCRWExplorer } from '@/components/interactive/science/highschool/UnitSCRWExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'S-CRW';

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
          { label: '화학반응의 세계' },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          화학반응은 한 방향으로만 끝까지 가는 게 아니라 <strong>「양방향 평형」</strong>에서 멈춰요.
          평형상수 K가 그 자리를 정해 주고, 외부 자극을 주면 르샤틀리에 원리에 따라 다시 흔들려요.
          그리고 모든 산화환원은 결국 「전자의 이동」, 그 흐름이 바로 전류예요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 평형·자극·산화환원">
        <p>
          반응지수 Q와 평형상수 K를 비교: Q &lt; K 정반응, Q &gt; K 역반응, Q = K 평형. K는 온도에만 의존.
          르샤틀리에 원리: 농도·온도·압력 자극 → 자극을 줄이는 방향으로 이동.
          전기화학: E°_cell = E°(환원극) − E°(산화극) &gt; 0 이면 자발적 갈바니 전지, &lt; 0 이면 전기분해 필요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "평형이면 반응이 멈췄다" — 정·역반응 속도가 같을 뿐 둘 다 진행 중(동적 평형).<br />
          ❌ "K가 크면 반응이 빠르다" — K는 「얼마나 진행되는가」, 속도는 활성화에너지 문제. 별개 개념.<br />
          ❌ "촉매가 평형을 옮긴다" — 정·역반응을 똑같이 빠르게. 평형 위치 X, 도달 속도만 ↑.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          하버-보슈 공정(N₂ + 3H₂ → 2NH₃)은 압력 ↑·온도 균형으로 수율 최적화 → 농업 비료. 휴대폰 리튬이온 전지는
          Li 산화 + Co 환원의 갈바니 전지. 수능 화학Ⅱ 평형 문제·전지 기전력 계산은 매년 출제.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <UnitSCRWExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
