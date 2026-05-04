import { notFound } from 'next/navigation';
import { ConicSectionExplorer } from '@/components/interactive/math/highschool/ConicSectionExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-GE-01';

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
          이차곡선은 <strong>「원뿔을 어떻게 자르냐에 따라 나오는 4가지 모양」</strong>이에요.
          원, 타원, 포물선, 쌍곡선 — 모두 이차방정식 한 형태로 표현되며, 행성 궤도부터 위성 안테나·자동차 헤드라이트까지
          물리·공학에 어디든 등장.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 4가지 표준형">
        <p>
          <strong>원</strong>: x² + y² = r². 모든 점이 중심에서 같은 거리.
          <strong>타원</strong>: x²/a² + y²/b² = 1. 두 초점에서의 거리 합이 일정.
          <strong>포물선</strong>: y² = 4px. 초점과 준선에서의 거리가 같은 점들의 자취.
          <strong>쌍곡선</strong>: x²/a² − y²/b² = 1. 두 초점에서의 거리 차의 절댓값이 일정.
          모두 「거리에 대한 어떤 조건」으로 정의된다는 공통점이 있어요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "타원의 초점은 중심이다" — 중심은 (0, 0), 초점은 c = √(a² − b²) 떨어진 두 점.
          ❌ "포물선과 쌍곡선은 무관" — 둘 다 이차곡선의 한 형태로 통합 분류돼요.
          ❌ "쌍곡선은 점근선 위로 지난다" — 점근선에 한없이 가까워지지만 절대 닿지 않아요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          행성 궤도 = 타원 (케플러), 위성·자동차 헤드라이트 반사면 = 포물선, 핵분열 비행궤적 = 쌍곡선.
          수능 「기하」에서 이차곡선의 표준형·접선·초점 거리 문항이 매년 출제 영역.
          4가지 버튼을 눌러가며 a, b 변화에 따른 모양이 어떻게 달라지는지 시각적으로 익혀 두세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <ConicSectionExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
