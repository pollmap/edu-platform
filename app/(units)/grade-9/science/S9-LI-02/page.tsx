import { notFound } from 'next/navigation';
import { NeuralReflexExplorer } from '@/components/interactive/science/NeuralReflexExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'S9-LI-02';

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
          자극이 들어오면 뉴런이 신호를 「릴레이」해요. 위험한 상황에서는 뇌를 거치지 않고 척수에서 바로 반사가
          일어나요. 그래서 뜨거운 걸 만지면 「의식보다 먼저」 손을 떼요.
        </p>
      </SectionCard>

      <SectionCard title="반사궁(reflex arc)">
        <p>신호 전달 경로는 다음 5단계예요:</p>
        <ol className="list-decimal pl-6 space-y-1 mt-2">
          <li><strong>자극</strong>: 감각기관(피부·눈·귀)에서 받음</li>
          <li><strong>감각뉴런</strong>: 신호를 중추로 전달</li>
          <li><strong>중추</strong>: 척수(반사) 또는 대뇌(의식적 판단)</li>
          <li><strong>운동뉴런</strong>: 명령을 근육으로 전달</li>
          <li><strong>반응</strong>: 근육이 수축</li>
        </ol>
      </SectionCard>

      <SectionCard title="자극에 따른 반응 시뮬레이션">
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <NeuralReflexExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard title="왜 반사가 빠를까?">
        <p>
          척수반사는 뉴런 2~3개만 거치지만, 의식적 반응은 대뇌까지 갔다가 돌아와요. 거리와 처리 단계가 길어서
          반응 시간이 4~5배 차이 나요. 진화적으로 「위험 회피」를 더 빠르게 만든 안전장치예요.
        </p>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
