import { notFound } from 'next/navigation';
import { HeatTransferExplorer } from '@/components/interactive/science/HeatTransferExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'S5-ME-01';

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
          열은 <strong>온도가 높은 곳 → 낮은 곳</strong>으로 흘러요. 흐르는 방법이 3가지 — <strong>전도·대류·복사</strong>예요.
          닿아서 전달되는 게 전도, 액체·기체가 직접 움직여 전달되는 게 대류, 매개체 없이 전자기파로 오는 게 복사예요.
        </p>
      </SectionCard>

      <SectionCard title="왜 그럴까 — 입자의 운동">
        <p>
          모든 물질은 작은 입자로 이루어져 있고, 입자는 끊임없이 떨려요. <strong>온도가 높을수록 입자가 더 빠르게 움직여요.</strong>
          뜨거운 입자가 차가운 입자에 부딪히면 운동이 옮겨가요 — 이게 전도예요. 액체·기체에서는 따뜻해진 입자가 부피가 늘어 가벼워져 위로 올라가고, 차가운 부분이 내려와 자리를 채워요. 이 흐름이 대류예요.
          복사는 매개체 없이 빛(전자기파)이 직접 에너지를 옮기는 방식이라 진공도 통과할 수 있어요.
        </p>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <ul className="list-disc list-inside space-y-1">
          <li>&quot;차가움이 흘러간다&quot; → 아니에요. 흐르는 건 <strong>열(에너지)</strong>이고, 차가움은 열이 빠져나간 결과예요.</li>
          <li>&quot;단열재는 열을 막는다&quot; → 정확히는 <strong>전도·대류 속도를 늦추는</strong> 거예요. 시간이 지나면 결국 같은 온도에 가까워져요.</li>
          <li>&quot;태양열도 공기로 전달된다&quot; → 우주는 진공이라 공기로는 못 와요. <strong>복사</strong>로 와요.</li>
        </ul>
      </SectionCard>

      <SectionCard title="실생활 속 열전달">
        <ul className="list-disc list-inside space-y-1">
          <li>국에 담가 둔 금속 숟가락이 손잡이까지 뜨거워짐 → <strong>전도</strong></li>
          <li>난로를 켜면 방 위쪽부터 따뜻해짐 → <strong>대류</strong></li>
          <li>모닥불에서 한 발짝 떨어져 있어도 얼굴이 화끈함 → <strong>복사</strong></li>
          <li>보온병은 진공층(전도·대류 차단) + 은도금(복사 차단)으로 3가지를 모두 막아요.</li>
        </ul>
      </SectionCard>

      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <HeatTransferExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
