import { notFound } from 'next/navigation';
import { DominoInductionExplorer } from '@/components/interactive/math/highschool/DominoInductionExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-AL-08';

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
          수학적 귀납법은 <strong>「자연수 전체에서 성립함」을 두 단계만으로 증명</strong>하는 방법이에요.
          모든 도미노를 일일이 쓰러뜨리는 대신, 「첫 번째」와 「k번째가 쓰러지면 (k+1)번째도 쓰러진다」 두 가지만
          확인하면 무한히 많은 자연수에 대한 결론을 얻을 수 있어요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 두 단계 증명">
        <p>
          ① <strong>기초 단계 (Base case)</strong>: n = 1 (또는 시작점)에서 명제가 참임을 직접 보임.
          ② <strong>귀납 단계 (Inductive step)</strong>: n = k에서 참이라고 가정하고, 그로부터 n = k+1에서도
          참임을 유도. 두 단계 모두 통과하면 모든 n ≥ 1에서 참. 이게 수학에서 자연수 영역을 한 번에 정복하는
          가장 강력한 도구예요. 1 + 2 + ... + n = n(n+1)/2 같은 합 공식 증명이 단골 예시.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "기초 단계 n=1만 보이면 충분하다" — 귀납 단계 없이는 단 하나의 점만 증명한 셈.
          ❌ "k에서 k+1로 가정만 하면 된다" — 「가정 → 결론」 유도 과정이 핵심.
          ❌ "이산수학에서만 쓴다" — 부등식 증명·정수 정수론 등 광범위하게 사용돼요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          수능 「대수」에서 합 공식·부등식 증명에 단골로 쓰여요. 컴퓨터 과학의 알고리즘 정확성 증명, 재귀
          함수 종료 증명도 모두 귀납법 기반. 도미노 시뮬에서 한 번 쓰러진 도미노가 다음 도미노를 어떻게
          쓰러뜨리는지를 「k → k+1 가정」과 매핑해서 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <DominoInductionExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
