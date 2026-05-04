import { notFound } from 'next/navigation';
import { PermutationCombinationExplorer } from '@/components/interactive/math/highschool/PermutationCombinationExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-PS-01';

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
          { label: '확률과 통계', href: '/highschool/math/probability-statistics' },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          순열·조합은 <strong>「몇 가지 경우가 가능한지」</strong>를 빠르게 세는 도구예요.
          순서가 의미 있으면 순열(P), 묶음만 보면 조합(C). 같은 「뽑기」도 조건에 따라 공식이 갈려요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 순서·중복·원형의 세 갈래">
        <p>
          기본은 nPr = n!/(n−r)! 와 nCr = n!/(r!(n−r)!). 여기서 가지가 갈려요.
          중복을 허용하면 n^r (중복순열), 원탁에 앉히면 (n−1)! (원순열),
          같은 것이 섞이면 다중집합 순열 n!/(p!q!…) — 모두 「곱의 법칙」 위에서 변형돼요.
          공식 외우기보다 「어떤 가지가 몇 번 갈리나」를 트리로 그려 보면 직관이 잡혀요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ 「순서를 바꿨는데 같은 경우면 P」 — 순서가 의미 있어 다른 경우로 셀 때만 P, 같은 묶음으로 봐야 하면 C.
          ❌ 「nC0 = 0」 — 0개 뽑는 방법은 「아무것도 안 뽑기」 1가지라 nC0 = 1.
          ❌ 「원순열도 n!」 — 원탁은 회전이 같은 배열이니 n으로 나눠 (n−1)!.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          비밀번호(중복순열), 좌석 배정(순열), 조 편성(조합), 회의실 원탁(원순열) — 일상 곳곳에서 쓰여요.
          수능에서는 「조건이 추가된 변형 문제」가 단골이에요. 예: 「양 끝에 특정 사람」, 「이웃해야 한다 / 떨어져야 한다」.
          이때 「전체 − 보색(여집합)」 사고법을 같이 익히면 빨리 풀려요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <PermutationCombinationExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
