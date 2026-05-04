import { notFound } from 'next/navigation';
import { PascalTriangleExplorer } from '@/components/interactive/math/highschool/PascalTriangleExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-PS-02';

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
          이항정리는 <strong>(a+b)ⁿ을 한 줄로 전개하는 공식</strong>이에요.
          그리고 그 계수가 그대로 「파스칼의 삼각형」 한 줄이 돼요. 조합 계산이 그림으로 보이는 셈이죠.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 계수가 곧 nCk">
        <p>
          (a+b)ⁿ = Σ nCk · a^(n−k) · b^k. 즉 n번째 줄의 k번째 수가 nCk예요.
          파스칼 삼각형은 「위 두 수의 합」으로 다음 줄을 만드는데, 이건 nCk = (n−1)C(k−1) + (n−1)Ck 라는 항등식의 시각화예요.
          한 줄을 모두 더하면 2ⁿ이 되는 것도, (1+1)ⁿ 전개에서 즉시 보여요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ 「계수가 항상 1」 — 1은 양 끝에만. 가운데로 갈수록 nCk는 커져요.
          ❌ 「(a−b)ⁿ도 같은 부호」 — k가 홀수일 때 부호가 −가 돼요. (−1)^k 항을 빠뜨리지 마요.
          ❌ 「파스칼은 합 규칙만」 — 행 합 = 2ⁿ, 대각선 합 = 피보나치, 하키스틱 등 정체성이 풍부해요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          이항분포의 확률질량함수 nCk · pᵏ · (1−p)^(n−k) 가 곧 이항정리 그 자체예요.
          확률·통계, 알고리즘(이산 계산), 컴퓨터과학(비트 패턴 수)까지 광범위해요.
          수능에서는 「특정 항의 계수 구하기」가 자주 나와요. 위치(k)와 부호를 동시에 챙기는 연습이 핵심.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <PascalTriangleExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
