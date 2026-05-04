import { notFound } from 'next/navigation';
import { TenseTimelineExplorer } from '@/components/interactive/english/TenseTimelineExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'E-GR-04';

export function generateMetadata() {
  const unit = findUnit(UNIT_ID);
  return unit ? makeUnitMetadata(unit) : {};
}

export default function Page() {
  const unit = findUnit(UNIT_ID);
  if (!unit) notFound();

  return (
    <main className="container mx-auto max-w-5xl px-4 py-8">
      <UnitHeader
        unit={unit}
        breadcrumb={[
          { label: '홈', href: '/' },
          { label: `학년 공통 / ${SUBJECT_LABEL[unit.subject]}`, href: `/common/${unit.subject}` },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          영어의 시제는 <strong>시간(when)</strong> × <strong>상(how it relates)</strong> 두 축이
          만나서 만들어져요. 12 시제 = 3 × 4 매트릭스로 한 번에 보면 외울 게 줄어들어요.
        </p>
      </SectionCard>
      <SectionCard title="왜 12개나 있을까?">
        <p>
          한국어는 시간을 주로 동사 어미(–았/었, –겠)로 표현하지만, 영어는{' '}
          <strong>‘언제 일어났느냐’</strong>와 <strong>‘얼마나 이어지거나 끝났느냐’</strong>를 동시에
          담아요. 그래서 같은 ‘공부했다’도 영어에서는 6~7가지 다른 표현이 나옵니다.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <TenseTimelineExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
