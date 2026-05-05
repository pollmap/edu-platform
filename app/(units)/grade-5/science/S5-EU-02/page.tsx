import { notFound } from 'next/navigation';
import { GlobalCirculationExplorer } from '@/components/interactive/science/GlobalCirculationExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'S5-EU-02';

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
          날씨는 <strong>기온·습도·바람·구름·강수</strong> 다섯 요소가 만드는 하루 단위 공기 상태예요.
          이 다섯 요소는 따로 있지 않고, <strong>태양 에너지가 지구를 데우면서 함께 움직여요</strong>.
        </p>
      </SectionCard>
      <SectionCard title="날씨가 만들어지는 흐름">
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li><strong>① 태양</strong> — 지구 표면을 데움</li>
          <li><strong>② 데워진 공기</strong> — 위로 떠오름 → 빈 자리로 다른 공기가 흘러옴 → 바람</li>
          <li><strong>③ 수증기</strong> — 떠오른 공기가 식으면 물방울로 응결 → 구름·비·눈</li>
          <li><strong>④ 큰 흐름</strong> — 적도와 극의 온도 차로 지구 전체에 큰 바람의 길이 생김</li>
        </ul>
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
          기상청 일기예보의 등압선·구름 사진도 이 흐름을 시각화한 거예요. 일주일 예보가 정확한 이유는
          이 모형이 잘 들어맞기 때문이에요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <GlobalCirculationExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
