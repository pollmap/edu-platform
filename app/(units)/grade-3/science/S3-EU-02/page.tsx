import { notFound } from 'next/navigation';
import { ErosionDepositionExplorer } from '@/components/interactive/science/ErosionDepositionExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'S3-EU-02';

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
          땅의 모습은 한 번 정해진 것이 아니에요. <strong>흐르는 물·바람·얼음</strong>이 오랜 시간 동안 땅을 깎고 옮기면서
          모양을 바꿔요. 그래서 산은 점점 낮아지고, 강가 들판은 점점 넓어져요.
        </p>
      </SectionCard>
      <SectionCard title="땅을 바꾸는 세 가지 일">
        <p>
          가장 큰 힘은 <strong>흐르는 물</strong>이에요. 물이 빠르게 흐르면 바닥의 흙·돌을 깎아내고(침식), 흐름을 따라
          멀리 날라요(운반). 그러다 물이 천천히 흐르는 곳에 도착하면 무거운 알갱이부터 차곡차곡 쌓여요(퇴적).
          바람과 빙하도 같은 일을 해요. 사막의 모래언덕, 강가의 모래사장, 바닷가 갯벌 모두 이 세 가지 일이 만든 모습이에요.
        </p>
      </SectionCard>
      <SectionCard title="자주 헷갈리는 점">
        <ul className="list-disc pl-5 space-y-1">
          <li>침식과 퇴적은 <strong>반대 일이 아니에요</strong>. 한 강에서 윗부분은 침식, 아랫부분은 퇴적이 동시에 일어나요.</li>
          <li>큰 알갱이일수록 먼저 쌓여요. 그래서 강 상류 바닥에는 큰 돌, 하류에는 고운 모래·진흙이 많아요.</li>
          <li>바위가 깎이는 일은 매우 천천히 일어나요. 절벽이 만들어지려면 수천~수만 년이 걸려요.</li>
        </ul>
      </SectionCard>
      <SectionCard title="실생활 속 지표 변화">
        <p>
          비가 많이 오면 강물이 흙탕물이 되는 이유, 한강 하류에 모래섬(여의도)이 생긴 이유, 바닷가 갯벌이 만들어지는 이유 모두
          침식·운반·퇴적 때문이에요. 산사태나 홍수가 난 자리도 단기간에 지표가 크게 바뀐 사례예요.
        </p>
      </SectionCard>
      <SectionCard title="강에서 일어나는 일 살펴보기">
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <ErosionDepositionExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
