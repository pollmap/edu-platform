import { notFound } from 'next/navigation';
import { KoreanModernHistoryTimeline } from '@/components/interactive/social/KoreanModernHistoryTimeline';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'H6-HI-02';

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
          1945년 광복 이후 한국은 <strong>분단·전쟁·산업화·민주화</strong>라는 큰 격변을 겪으며 오늘에 이르렀어요.
          짧은 시간에 가난한 농업 국가에서 산업·민주 국가로 변한 보기 드문 사례예요.
        </p>
      </SectionCard>
      <SectionCard title="네 가지 큰 흐름">
        <p>
          ① 광복(1945) → 분단(1948) → 6·25전쟁(1950~1953). ② 1960~80년대 산업화(경제 개발 5개년 계획). ③ 1987년 민주화(직선제 개헌). ④ 1990년대 이후 정보화·세계화·문화 한류.
          각 시기마다 주인공·갈등·결과가 다르니 타임라인을 따라가며 살펴봐요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <KoreanModernHistoryTimeline />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
