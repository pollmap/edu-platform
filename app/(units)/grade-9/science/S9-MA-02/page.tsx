import { notFound } from 'next/navigation';
import { GasLawSimulator } from '@/components/interactive/science/GasLawSimulator';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'S9-MA-02';

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
          기체 상태에서 압력(P), 부피(V), 온도(T)는 묶여 움직여요. 「P×V/T = 일정」이라는 한 줄로 보일·샤를을
          모두 표현할 수 있어요.
        </p>
      </SectionCard>

      <SectionCard title="보일의 법칙 (1662)">
        <p>
          온도가 일정할 때 <code className="px-1 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded">P × V = 일정</code>.
          압력이 2배가 되면 부피는 1/2이 돼요. 풍선을 누르면 작아지는 이유, 깊은 바다에서 공기방울이 작아지는 이유.
        </p>
      </SectionCard>

      <SectionCard title="샤를의 법칙 (1787)">
        <p>
          압력이 일정할 때 <code className="px-1 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded">V / T = 일정</code>(T는 절대온도 K).
          뜨거우면 부피가 늘어요. 열기구가 떠오르는 이유, 추운 겨울 자동차 바퀴가 살짝 쪼그라드는 이유.
        </p>
      </SectionCard>

      <SectionCard title="기체 입자 시뮬레이션">
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <GasLawSimulator />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
