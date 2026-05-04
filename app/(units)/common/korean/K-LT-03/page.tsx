import { notFound } from 'next/navigation';
import { CharacterRelationExplorer } from '@/components/interactive/korean/CharacterRelationExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'K-LT-03';

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
          소설의 인물을 분석할 때는 <strong>성격·욕망·갈등·관계</strong> 4축으로 살펴봐요. 인물을 잘 이해하면 작품의 주제가 자연스럽게 보여요.
        </p>
      </SectionCard>
      <SectionCard title="평면적 인물 vs 입체적 인물">
        <p>
          <strong>평면적 인물</strong>은 한 가지 성격이 변하지 않는 인물 (예: 늘 착한 조연).
          <strong>입체적 인물</strong>은 사건을 겪으며 성격이 변하는 인물 — 주인공인 경우가 많아요.
          또 <strong>주동 인물</strong>(이야기를 끌고 가는)과 <strong>반동 인물</strong>(주동을 막는)으로도 나눌 수 있어요. 둘의 갈등이 이야기의 엔진이에요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "주인공 = 좋은 사람" — 주인공도 결점·약점을 가져요. 입체적 인물일수록 더 흥미로워요.
          ❌ "인물 분석 = 외모 묘사" — 외모는 출발점일 뿐. 행동·말투·선택이 진짜 성격을 보여줘요.
          ❌ "인물의 마음을 직접 알려준다" — 작가가 "그는 슬펐다"라고 직접 말하기도 하지만, 행동·표정으로 간접 전달하는 경우가 더 많아요.
        </p>
      </SectionCard>
      <SectionCard title="실생활 속 인물 분석">
        <p>
          드라마·영화·웹툰을 볼 때 "이 인물은 무엇을 원할까?", "왜 그렇게 행동했을까?" 묻는 습관을 들이면 작품이 훨씬 깊게 보여요.
          글쓰기에도 도움 — 내 글의 인물에게 분명한 욕망과 갈등을 주면 이야기가 자연스럽게 굴러가요.
          저작권 보호를 위해 본 단원에서는 특정 작품 본문을 인용하지 않고 일반 분석 도구만 다룹니다.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <CharacterRelationExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
