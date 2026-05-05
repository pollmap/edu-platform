import { notFound } from 'next/navigation';
import { SpaceCoordinateExplorer } from '@/components/interactive/math/highschool/SpaceCoordinateExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-GE-05';

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
          공간좌표는 평면 (x, y)에 <strong>z축 한 줄을 더한」</strong> 3차원 좌표계예요.
          평면의 거리 공식 √((x₁−x₂)² + (y₁−y₂)²)에 (z₁−z₂)² 한 항만 추가하면 그대로 공간 거리 공식.
          공간도형(직선·평면·구)의 모든 계산이 결국 거리·중점·내적으로 환원됩니다.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 3가지 기본 공식">
        <p>
          <strong>거리</strong>: |PQ| = √((x₁−x₂)² + (y₁−y₂)² + (z₁−z₂)²).
          <strong>중점</strong>: M = ((x₁+x₂)/2, (y₁+y₂)/2, (z₁+z₂)/2).
          <strong>구의 방정식</strong>: 중심 (a, b, c)·반지름 r → (x−a)² + (y−b)² + (z−c)² = r².
          이 셋이 공간 기하 문제의 90%를 처리해요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ 「3차원도 (x, y) 평면처럼 그릴 수 있다」 — 종이는 2D라 투영이 필요해요. 등각투영·원근투영 모두 정보 손실 있음.
          ❌ 「z축은 항상 위」 — 좌표축 방향은 약속일 뿐. 오른손 좌표계가 표준이지만 절대적이지 않아요.
          ❌ 「두 점이 z = 0 평면 위에 있으면 z 항을 무시해도 된다」 — 둘 다 z = 0이면 항이 0이 되니 결과는 같지만, 일반적으로는 항 빠지면 오답.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          GPS 위성은 공간좌표로 단말기 위치를 삼각측량. 3D 게임 엔진, CAD, MRI 영상 — 모두 공간좌표가 출발점.
          P, Q를 슬라이더로 움직여 보세요. 거리와 중점이 실시간으로 계산됩니다. yaw/pitch로 시점을 회전하며 3차원 감을 잡아 보세요.
          수능 「기하」에서 두 점·선·평면의 거리 계산은 매년 출제되는 기본기.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <SpaceCoordinateExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
