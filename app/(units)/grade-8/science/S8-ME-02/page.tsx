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

const UNIT_ID = 'S8-ME-02';

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
          열은 「온도가 높은 곳에서 낮은 곳으로」만 흘러요. 그래서 뜨거운 커피는 식고, 차가운 콜라는 데워져요.
          열은 「전도·대류·복사」 세 가지 방법으로 옮겨가요.
        </p>
      </SectionCard>

      <SectionCard title="비열 — 같은 열을 받아도 차이나는 이유">
        <p>
          비열(c)은 「물질 1g을 1°C 올리는 데 필요한 열량」이에요. 물의 비열은 4.2 J/g·°C로 매우 커요. 그래서 바다는
          여름에도 천천히 데워지고 겨울에도 천천히 식어 「기온 변화를 완화」해요. 해안 도시가 내륙보다 일교차 작은 이유.
        </p>
        <p className="mt-2">
          열량 공식: <code className="px-1 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded">Q = c × m × ΔT</code>
        </p>
      </SectionCard>

      <SectionCard title="열 이동 시뮬레이션">
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <HeatTransferExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard title="3가지 열 이동 방법">
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>전도</strong>: 고체에서 입자가 직접 충돌. 금속이 잘 전달 (쇠숟가락이 뜨거워짐)</li>
          <li><strong>대류</strong>: 액체·기체에서 「뜨거운 건 위로, 차가운 건 아래로」 (보일러)</li>
          <li><strong>복사</strong>: 매질 없이 빛처럼 직접. 태양 → 지구 (진공도 통과)</li>
        </ul>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
