import { notFound } from 'next/navigation';
import { KoreaRegionExplorer } from '@/components/interactive/social/KoreaRegionExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'H3-GE-01';

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
          내가 사는 <strong>고장</strong>은 <strong>위치·산과 강·길·건물</strong>로 그릴 수 있어요.
          머릿속에 떠올리는 모습(<strong>심상 지도</strong>)과 실제 지도(<strong>위성·종이 지도</strong>)를 비교하면
          내 고장의 진짜 모습이 보여요.
        </p>
      </SectionCard>
      <SectionCard title="고장의 모습을 보는 4가지 방법">
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li><strong>심상 지도</strong> — 내가 자주 가는 곳을 그림으로 그려 보기</li>
          <li><strong>종이 지도</strong> — 도로·산·강을 약속된 기호로 표시한 지도</li>
          <li><strong>위성 사진</strong> — 하늘에서 찍은 진짜 모습</li>
          <li><strong>현장 답사</strong> — 직접 걸으며 눈으로 보기</li>
        </ul>
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
          한 가지 방법으로만 보면 놓치는 게 많아요. 4가지를 겹쳐 보면 고장의 모습이 입체가 되어요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <KoreaRegionExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
