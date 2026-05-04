import { notFound } from 'next/navigation';
import { PhonicsExplorer } from '@/components/interactive/english/PhonicsExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'E-SPK-01';

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
          영어 말하기는 <strong>틀려도 일단 입 밖으로 내보내는 것</strong>이 가장 중요해요. 정확한 발음은 듣고 따라 하기를 반복하면서 자연스럽게 길러져요.
        </p>
      </SectionCard>
      <SectionCard title="아래 카드의 소리를 들으며 직접 따라 해 보세요">
        <p>
          한국어에 없는 소리(예: f, v, th, r/l 구분)는 처음에 어색해도 괜찮아요.
          중요한 건 <strong>입 모양과 혀 위치를 비슷하게 따라 하려는 것</strong>이에요. 발음이 살짝 어색해도 통하면 OK — 완벽보다 시도가 먼저예요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <PhonicsExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
