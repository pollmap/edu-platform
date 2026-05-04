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

const UNIT_ID = 'E-VOC-02';

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
          영어 어휘 학습은 <strong>자주 쓰이는 핵심 단어</strong>(High-Frequency Words)부터.
          800~1,000개를 알면 일상 영어 글의 약 80%를 이해할 수 있어요.
        </p>
      </SectionCard>
      <SectionCard title="단어를 외울 때">
        <p>
          단어 카드는 <strong>철자만</strong> 외우지 말고 <strong>소리·뜻·예문</strong>을 함께 익히세요.
          소리를 알면 듣기·말하기에 바로 쓸 수 있고, 예문을 보면 어떤 상황에 쓰는지 자연스럽게 익혀져요.
          하루 5~10단어 + 다음 날 복습이 가장 효율적이에요.
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
