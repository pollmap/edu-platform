import { notFound } from 'next/navigation';
import { SocializationStagesExplorer } from '@/components/interactive/social/SocializationStagesExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'H3-SO-01';

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
          가족의 모습은 <strong>시대마다·집안마다 다 달라요</strong>. 옛날에는 한집에 할아버지·할머니·부모·자녀가
          함께 사는 큰 가족이 많았다면, 요즘은 <strong>핵가족·한부모·조손·다문화·1인 가구</strong> 등 모양이 다양해요.
          어떤 가족이든 <strong>서로 돌보고 의지하는 공동체</strong>라는 본질은 같아요.
        </p>
      </SectionCard>
      <SectionCard title="가족이 변해 온 이유 3가지">
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li><strong>일자리 이동</strong> — 도시로 일을 찾아 가면서 작은 가족 단위로 살게 됨</li>
          <li><strong>결혼·자녀 선택</strong> — 결혼 시기·자녀 수를 본인이 정하는 시대로 바뀜</li>
          <li><strong>수명·역할 변화</strong> — 오래 살게 되고, 남녀 가사 분담도 조금씩 균등해짐</li>
        </ul>
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
          모양이 다르다고 더 좋고 나쁜 가족은 없어요. 서로 다름을 인정하는 게 가족 공부의 시작이에요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <SocializationStagesExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
