import { notFound } from 'next/navigation';
import { CultureComparisonMatrix } from '@/components/interactive/social/CultureComparisonMatrix';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'H3-SO-02';

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
          고장 사람들의 <strong>의(옷)·식(음식)·주(집)</strong>는 그 고장의 자연 환경에 맞게 자리를 잡았어요.
          바닷가 사람들의 그물·생선 요리, 산골 사람들의 두꺼운 옷·온돌집 — 모두 이유가 있어요.
        </p>
      </SectionCard>
      <SectionCard title="환경 → 생활 모습 한눈에 보기">
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li><strong>바닷가</strong> — 어업·해산물 요리·통풍 좋은 집</li>
          <li><strong>들판(평야)</strong> — 농사·곡물 음식·넓은 마당</li>
          <li><strong>산골</strong> — 임업·산나물 요리·따뜻한 온돌집</li>
          <li><strong>도시</strong> — 회사·식당·아파트</li>
        </ul>
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
          지금은 교통·통신이 발달해 어느 고장에서나 비슷한 음식·옷을 볼 수 있지만, 옛날의 흔적은
          <strong>지역 축제·전통 음식</strong>에 그대로 남아 있어요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <CultureComparisonMatrix />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
