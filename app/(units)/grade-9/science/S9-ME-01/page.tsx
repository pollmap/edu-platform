import { notFound } from 'next/navigation';
import { TimeDistanceGraph } from '@/components/interactive/science/TimeDistanceGraph';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'S9-ME-01';

export function generateMetadata() {
  const unit = findUnit(UNIT_ID);
  if (!unit) return {};
  return makeUnitMetadata(unit);
}

export default function Page() {
  const unit = findUnit(UNIT_ID);
  if (!unit || unit.schoolLevel === 'highschool' || unit.grade === undefined) {
    notFound();
  }

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
          물체의 운동은 「시간-위치 그래프」로 모두 표현할 수 있어요. 그래프의 「기울기」가 속도이고, 속도가
          변하면 「가속도」가 생겨요.
        </p>
      </SectionCard>

      <SectionCard title="등속 운동 vs 가속 운동">
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>등속 운동</strong>: 시간-위치 그래프 = 직선. 속도 일정. 예: 자동 보행기 컨베이어</li>
          <li><strong>등가속 운동</strong>: 시간-위치 그래프 = 곡선(2차 함수). 속도 일정하게 변화. 예: 자유낙하</li>
          <li><strong>속도</strong> = 위치 변화 / 시간. <strong>가속도</strong> = 속도 변화 / 시간</li>
        </ul>
      </SectionCard>

      <SectionCard title="시간-위치 그래프 그리기">
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <TimeDistanceGraph />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard title="자유낙하의 비밀">
        <p>
          공기 저항이 없으면 모든 물체는 같은 가속도(g ≈ 9.8 m/s²)로 떨어져요. 깃털과 망치를 진공에서 떨어뜨리면
          동시에 도착해요. 갈릴레오가 피사의 사탑에서 (전설로) 보여줬다는 이야기, 1971년 아폴로 15호 우주비행사가
          달에서 실제로 시연했어요.
        </p>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
