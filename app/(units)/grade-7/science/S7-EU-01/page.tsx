import { notFound } from 'next/navigation';
import { RockCyclePlateExplorer } from '@/components/interactive/science/RockCyclePlateExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'S7-EU-01';

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
          지구의 단단한 겉껍질(<strong>지권</strong>)은 가만히 있는 것 같지만 천천히 변해요. 돌은 <strong>화성암·퇴적암·변성암</strong> 사이를 순환하고, 지구 표면은 여러 개의 <strong>판</strong>으로 나뉘어 움직여요.
        </p>
      </SectionCard>

      <SectionCard title="핵심 원리 — 암석 순환과 판 구조">
        <p>
          마그마가 식어 굳으면 <strong>화성암</strong>(화강암·현무암)이 돼요. 풍화·침식으로 잘게 부서진 알갱이가 강·바다에 쌓여 굳으면 <strong>퇴적암</strong>이 되고, 높은 열과 압력을 받으면 결정 구조가 바뀌어 <strong>변성암</strong>이 돼요. 어떤 암석이든 다시 녹으면 마그마로 돌아가요. 이 큰 순환이 <strong>암석 순환</strong>이에요.
          한편 지구 겉은 십여 개의 판으로 나뉘어 있어요. 판이 만나는 곳에서는 <strong>벌어지거나(발산)</strong>, <strong>부딪히거나(수렴)</strong>, <strong>옆으로 미끄러져요(보존)</strong>. 이 운동이 화산·지진·산맥을 만들어요.
        </p>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <ul className="list-disc list-inside space-y-1">
          <li>&quot;돌은 변하지 않는다&quot; → 너무 느려서 안 보일 뿐, 수백만 년에 걸쳐 끊임없이 변해요.</li>
          <li>&quot;대륙은 가만히 있다&quot; → 판은 1년에 수 cm씩 움직여요. 대서양은 매년 약 2 cm씩 넓어지고 있어요.</li>
          <li>&quot;지진은 갑자기 생긴다&quot; → 판이 어긋난 자리에 오랫동안 쌓인 응력이 한순간에 풀리는 거예요. 천천히 누적된 결과예요.</li>
          <li>&quot;화산은 산이 폭발하는 것&quot; → 마그마가 약한 지각을 뚫고 올라온 거예요. 보통 판 경계 근처에서 일어나요.</li>
        </ul>
      </SectionCard>

      <SectionCard title="실생활 속 지권 변화">
        <ul className="list-disc list-inside space-y-1">
          <li>히말라야 산맥은 인도판이 유라시아판에 부딪혀(수렴) 솟아오른 결과예요. 지금도 매년 조금씩 높아지고 있어요.</li>
          <li>일본은 4개 판이 만나는 자리라 지진·화산이 잦아요. 한반도도 동일본 지진의 영향을 받아요.</li>
          <li>제주도·울릉도는 마그마가 분출해 굳은 화산섬 — 현무암 지형이 많아요.</li>
          <li>석회암이 변성되면 대리암이 돼요. 석조 건축물·조각상에 많이 쓰여요.</li>
        </ul>
      </SectionCard>

      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <RockCyclePlateExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
