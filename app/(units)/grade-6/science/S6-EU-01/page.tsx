import { notFound } from 'next/navigation';
import { EarthMoonOrbit } from '@/components/interactive/science/EarthMoonOrbit';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'S6-EU-01';

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
          지구는 <strong>스스로 돌고(자전)</strong>, 동시에 <strong>태양 둘레를 돌아요(공전)</strong>. 자전은 하루(약 24시간) 주기, 공전은 한 해(약 365일) 주기예요.
          달은 지구를 약 한 달(29.5일)에 한 바퀴 돌고, 그 위치에 따라 모양이 달라 보여요.
        </p>
      </SectionCard>

      <SectionCard title="핵심 원리 — 자전·공전·달의 위상">
        <p>
          지구는 서쪽에서 동쪽으로 자전해요. 그래서 해가 동쪽에서 떠서 서쪽으로 지는 것처럼 보여요. 사실 움직이는 건 지구이지 태양이 아니에요.
          공전 궤도면에 대해 지축이 23.5° 기울어져 있어서 계절도 생겨요. 달의 위상은 <strong>달이 태양 빛을 받는 부분을 우리가 어느 각도에서 보느냐</strong>의 차이예요.
          달 자체가 모양이 바뀌는 게 아니라, 태양·지구·달의 상대 위치가 변해서 보이는 빛 부분이 달라지는 거예요.
        </p>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <ul className="list-disc list-inside space-y-1">
          <li>&quot;달이 모양을 바꾼다&quot; → 달은 항상 둥글어요. 태양 빛이 닿는 절반만 우리가 보는 각도에 따라 모양이 다르게 보일 뿐이에요.</li>
          <li>&quot;달의 위상은 지구 그림자 때문이다&quot; → 그건 <strong>월식</strong>이에요. 위상은 그림자가 아니라 위치 관계의 결과예요.</li>
          <li>&quot;태양이 동쪽에서 떠서 서쪽으로 진다&quot; → 우리 시점에서 그렇게 보일 뿐, 실제로 도는 건 지구예요.</li>
        </ul>
      </SectionCard>

      <SectionCard title="실생활 속 천체 운동">
        <ul className="list-disc list-inside space-y-1">
          <li>밤하늘의 별이 천천히 도는 것처럼 보이는 이유 → 지구가 자전하기 때문.</li>
          <li>음력은 달의 위상 주기(29.5일)를 기준으로 해요 — 추석은 음력 8월 15일, 보름달이 뜨는 날.</li>
          <li>일식: 태양·달·지구 순서로 일직선일 때 달이 태양을 가림. 월식: 태양·지구·달 순서일 때 지구 그림자가 달에 비침.</li>
          <li>썰물·밀물(조석)은 달의 인력 때문에 일어나요. 달 가까운 쪽 바다가 부풀어 올라요.</li>
        </ul>
      </SectionCard>

      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <EarthMoonOrbit />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
