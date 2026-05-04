import { notFound } from 'next/navigation';
import { PhonemeChangeExplorer } from '@/components/interactive/korean/PhonemeChangeExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'K-CK1-04';

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
          { label: '고등학교', href: '/highschool' },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          문법은 <strong>음운 → 단어 → 문장</strong> 3층 구조로 정리돼요. 가장 작은 단위(소리)부터 가장 큰 단위(문장)까지 차례로
          쌓아 올린다는 감을 잡으면, 어렵게 보이던 규칙들이 한 줄로 정렬돼요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 음운변동 4가지">
        <p>
          음운변동은 자음·모음이 환경에 따라 바뀌는 규칙으로, 크게 <strong>교체·탈락·첨가·축약</strong> 4가지예요.
          예: "꽃이" → [꼬치] (받침 ㅊ가 다음 음절로 넘어가 발음). 이런 규칙은 외우는 게 아니라
          "왜 그렇게 발음할 수밖에 없는지"를 발음 기관의 위치로 이해하면 됩니다.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "표기가 곧 발음이다" — 한글은 표기와 발음이 다른 단어가 많음(예: 깎다 [깍따]).
          ❌ "음운변동은 예외 없는 규칙" — 일부는 환경별로 적용 여부가 달라요.
          ❌ "발음만 맞으면 된다" — 표기는 표기 규정대로, 발음은 표준 발음법대로 따로 봐야 해요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          외국인에게 한국어를 가르쳐 보면 가장 많이 받는 질문이 음운변동이에요.
          수능 문법 문제는 거의 매년 음운변동 1~2문항이 출제. 단어를 넣으면 변동이 어디서 일어나는지 자동 표시되는
          아래 인터랙티브로 패턴을 익혀 보세요.
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
