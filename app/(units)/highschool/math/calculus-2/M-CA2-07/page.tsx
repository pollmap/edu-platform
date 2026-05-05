import { notFound } from 'next/navigation';
import { SolidOfRevolutionExplorer } from '@/components/interactive/math/highschool/SolidOfRevolutionExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-CA2-07';

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
          곡선을 축에 대해 한 바퀴 돌리면 <strong>「회전체」</strong>가 만들어져요.
          그 부피를 구하는 가장 단순한 모델이 「얇은 디스크 무한히 쌓기」입니다.
          x = c에서의 디스크 = 반지름 f(c), 두께 dx → 부피 πf(c)²dx. 이를 모두 더한 게 정적분.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 디스크법 vs 셸법">
        <p>
          <strong>디스크법(원판)</strong>: V = π∫(f(x))² dx (x축 회전). 두께 방향 = 회전축 방향.
          <strong>와셔법(고리)</strong>: 두 곡선 사이를 회전 → V = π∫((외)² − (내)²) dx.
          <strong>셸법(원통)</strong>: 두께 방향 ⊥ 회전축. 함수에 따라 더 깔끔해지는 경우가 있음.
          어떤 방법이든 정답은 같아요 — 계산 편의에 따라 선택.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ 「∫f(x) dx로 부피가 나온다」 — 부피는 단면적의 적분. 회전체에서는 단면이 원이라 πf(x)²이에요.
          ❌ 「적분 구간을 곡선이 음수인 곳까지 늘려도 OK」 — 회전체는 항상 양수 부피. f(x)가 음수여도 (f(x))²은 양수.
          ❌ 「회전축이 바뀌면 부피도 같다」 — 절대 X. 같은 곡선이라도 x축 회전과 y축 회전은 부피가 달라요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          엔진 실린더, 와인잔, 화병, 전등갓 — 모든 회전 대칭 부피는 이 적분으로 계산 가능.
          y = a√x의 회전체는 측면이 포물선 모양인 「잔」 형태. a, x₁, x₂를 움직이며 디스크 가이드(빨강 세로선)가 어떻게 잘려 가는지 관찰해 보세요.
          수능 「미적분Ⅱ」 마지막 단원으로, 부피 계산은 매년 출제 가능 영역입니다.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <SolidOfRevolutionExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
