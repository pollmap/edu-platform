import { notFound } from 'next/navigation';
import { SynonymAntonymMatcher } from '@/components/interactive/english/SynonymAntonymMatcher';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'E-VOC-03';

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
          단어를 외울 때 <strong>동의어(synonym, 비슷한 뜻)</strong>와 <strong>반의어(antonym, 반대 뜻)</strong>를 함께 익히면 어휘가 3배로 늘어요.
        </p>
      </SectionCard>
      <SectionCard title="big만 알면 끝일까?">
        <p>
          big을 알면 huge, large, enormous(동의어)와 small, tiny, little(반의어)도 같이 외워 봐요.
          영어 시험에서 "비슷한 뜻 단어 고르기"가 자주 나오고, 글을 쓸 때도 같은 단어 반복하지 않으려면 동의어를 알아야 자연스러워요.
          뉘앙스가 미묘하게 다른 경우(예: big = 일반적, huge = 매우 큰)도 함께 익히세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <SynonymAntonymMatcher />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
