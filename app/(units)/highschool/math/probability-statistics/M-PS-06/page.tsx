import { notFound } from 'next/navigation';
import { NormalDistributionExplorer } from '@/components/interactive/math/highschool/NormalDistributionExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-PS-06';

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
          이항분포는 「성공/실패를 n번 반복할 때」 성공 횟수의 분포, 정규분포는 그 분포가 「n이 커지면 자연스럽게 다가가는 종 모양」이에요.
          μ로 좌우, σ로 폭이 결정돼요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — N(μ, σ²)와 표준화">
        <p>
          이항 B(n,p)의 평균은 np, 분산은 np(1−p). n이 커지면 정규분포 N(np, np(1−p))로 근사돼요(중심극한정리의 한 사례).
          표준화 Z = (X − μ)/σ → N(0, 1)을 사용하면 어떤 정규분포든 표준정규로 환산해 같은 표 하나로 풀 수 있어요.
          68−95−99.7 규칙은 이 종 모양의 「폭별 면적」을 외운 것.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ 「σ가 클수록 종이 높아진다」 — 반대. σ가 크면 폭이 넓고 봉우리는 낮아져요(전체 면적은 항상 1이라).
          ❌ 「P(X = x)가 어떤 값」 — 연속분포에서는 한 점의 확률은 0. 구간 확률만 의미가 있어요.
          ❌ 「이항분포 = 정규분포」 — 근사일 뿐. n이 작거나 p가 0/1 근처면 어긋나요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          IQ 점수, 키, 측정 오차, 시험 점수 분포, 품질 관리(6시그마) — 거의 모든 자연 현상이 정규분포 근방으로 모여요.
          수능 「확률과 통계」에서는 표준화 후 표준정규분포표를 사용해 구간 확률을 계산하는 문제가 핵심.
          시뮬레이터로 μ, σ, z 값을 바꿔 가며 면적의 변화를 눈에 익혀 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <NormalDistributionExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
