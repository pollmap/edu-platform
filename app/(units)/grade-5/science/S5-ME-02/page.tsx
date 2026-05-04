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

const UNIT_ID = 'S5-ME-02';

export function generateMetadata() {
  const unit = findUnit(UNIT_ID);
  return unit ? makeUnitMetadata(unit) : {};
}

export default function Page() {
  const unit = findUnit(UNIT_ID);
  if (!unit || unit.schoolLevel === 'highschool' || unit.grade === undefined) notFound();

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
          물체가 얼마나 빨리 움직이는지를 <strong>속력</strong>이라고 해요. 속력 = <strong>이동거리 ÷ 걸린 시간</strong>이에요.
          시간-거리 그래프를 그리면, 빠를수록 직선이 더 가팔라져요.
        </p>
      </SectionCard>

      <SectionCard title="핵심 원리 — 그래프로 운동을 읽기">
        <p>
          물체의 운동을 가장 깔끔하게 표현하는 방법이 그래프예요. 가로축은 <strong>시간(s)</strong>, 세로축은 <strong>이동거리(m)</strong>를 놓아요.
          일정한 속력으로 움직이는 물체는 시간이 1초 흐를 때마다 같은 거리를 더 가요. 그래서 점들을 이으면 <strong>직선</strong>이 돼요.
          기울기(세로 ÷ 가로) = 1초에 가는 거리 = <strong>속력</strong>이에요. 멈춰 있을 땐 그래프가 가로로 평평해져요.
        </p>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <ul className="list-disc list-inside space-y-1">
          <li>&quot;속도와 속력은 같다&quot; → 속력은 크기만, 속도는 <strong>크기 + 방향</strong>까지 포함해요. 동그란 트랙을 한 바퀴 돈 사람은 속력은 있어도 평균 속도는 0이에요.</li>
          <li>&quot;그래프가 올라가면 위로 움직인다&quot; → 그래프의 세로축은 위치가 아니라 <strong>이동한 거리</strong>예요.</li>
          <li>&quot;빨라지면 그래프가 위로 올라간다&quot; → 빨라지면 그래프의 <strong>기울기</strong>가 가팔라져요. 그래프 자체의 위치가 아니라 기울기를 봐야 해요.</li>
        </ul>
      </SectionCard>

      <SectionCard title="실생활 속 속력">
        <ul className="list-disc list-inside space-y-1">
          <li>걷는 속력 약 1.4 m/s, 달리기 약 5 m/s, KTX 약 80 m/s (≈ 시속 300 km).</li>
          <li>네비게이션의 도착시간 = 남은 거리 ÷ 평균 속력으로 계산해요.</li>
          <li>고속도로 제한속도는 100 km/h ≈ 27.8 m/s — 1초에 28미터 가는 셈이에요.</li>
        </ul>
      </SectionCard>

      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <TimeDistanceGraph />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
