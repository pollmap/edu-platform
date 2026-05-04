import { notFound } from 'next/navigation';
import { PhonemeChangeExplorer } from '@/components/interactive/korean/PhonemeChangeExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'K-GR-02';

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
          한국어는 글자대로 발음하지 않고 자연스럽게 변형이 일어나요. 대표 5가지: <strong>연음 · 경음화 · 격음화 · 비음화 · 구개음화</strong>.
        </p>
      </SectionCard>
      <SectionCard title="규칙은 외우는 게 아니라 발견하는 것">
        <p>
          음운 변동은 우리가 매일 자연스럽게 하는 발음을 학자들이 정리한 규칙이에요. "꽃이"를 [꼬치]로 읽는 건 누가 가르쳐서가 아니라 모음과 자음을 부드럽게 잇는 게 더 편하기 때문이에요.
          외국인이 한국어를 배울 때 가장 어려워하는 부분이지만, 우리는 자연 모국어 직관이 있어요. 규칙을 보면 "아, 그래서 그랬구나"가 됩니다.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <PhonemeChangeExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
