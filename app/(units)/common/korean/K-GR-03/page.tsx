import { notFound } from 'next/navigation';
import { PartOfSpeechSorter } from '@/components/interactive/korean/PartOfSpeechSorter';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'K-GR-03';

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
          한국어 단어는 <strong>9가지 품사</strong>로 분류돼요. 이름·움직임·꾸밈·관계·느낌 — 단어가 문장 안에서 어떤 일을 하는지에 따라 묶었어요.
        </p>
      </SectionCard>
      <SectionCard title="9품사 한 줄 정리">
        <p>
          체언(이름): <strong>명사·대명사·수사</strong>.
          용언(움직·상태): <strong>동사·형용사</strong>.
          수식언(꾸밈): <strong>관형사·부사</strong>.
          관계언(이음): <strong>조사</strong>.
          독립언(외침): <strong>감탄사</strong>.
          체언+조사 → 주어·목적어 자리, 용언은 활용해 어미가 변해요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "&apos;빠르다&apos;는 동사" — 상태를 나타내면 형용사. 한국어 형용사는 영어와 달리 동사처럼 활용해요(빠르다·빠른·빨라).
          ❌ "조사는 단어 X" — 한국어에서 조사는 단어로 인정해요(영어와 다른 점). "이/가, 을/를, 에서, 까지" 모두 단어.
          ❌ "관형사 = 형용사" — 관형사는 활용 X (새, 헌, 이, 그). 형용사는 활용 O (예쁜, 예뻤다).
        </p>
      </SectionCard>
      <SectionCard title="왜 품사를 알아야 할까?">
        <p>
          맞춤법·띄어쓰기·문장 구조가 모두 품사에서 출발해요. 조사는 앞말에 붙이고, 의존명사는 띄우는 등 규칙이 품사 단위로 정해져 있어요.
          외국어 배울 때도 한국어 9품사 감각이 있으면 영어 8품사·일본어 품사를 빠르게 흡수할 수 있어요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <PartOfSpeechSorter />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
