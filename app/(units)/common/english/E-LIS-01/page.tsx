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

const UNIT_ID = 'E-LIS-01';

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
          영어 듣기는 <strong>소리와 글자가 어떻게 연결되는지</strong> 아는 데서 시작해요. 알파벳마다 대표 소리를 익히면 처음 듣는 단어도 어림짐작할 수 있어요.
        </p>
      </SectionCard>
      <SectionCard title="발음을 들으며 따라 해 봐요">
        <p>
          알파벳 카드를 클릭하면 브라우저가 그 소리를 읽어 줘요(Web Speech API). 소리를 듣고 입 모양을 똑같이 따라 해 보세요.
          여러 번 듣고 따라 하면 귀가 영어 소리에 익숙해져요. 듣기는 결국 <strong>아는 소리를 더 빨리 알아듣는</strong> 연습이에요.
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
