import { notFound } from 'next/navigation';
import { MetaphorMatchingGame } from '@/components/interactive/korean/MetaphorMatchingGame';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'K-LT-05';

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
          비유는 <strong>한 가지를 다른 것에 빗대어</strong> 말하는 표현법이에요. 직유·은유·의인 세 가지가 가장 많이 쓰여요.
          상징은 한 단계 더 나아가 사물 하나가 추상 개념을 대표해요.
        </p>
      </SectionCard>
      <SectionCard title="네 가지 표현법">
        <p>
          ① <strong>직유</strong>: "~같이/처럼" 으로 직접 비교 — "사과 같은 볼".
          ② <strong>은유</strong>: A는 B 라고 동일시 — "내 마음은 호수".
          ③ <strong>의인</strong>: 사물·동물에 사람의 행동 — "바람이 속삭인다".
          ④ <strong>상징</strong>: 사물이 추상 개념 대표 — 비둘기 = 평화, 십자가 = 희생.
          비유는 직접 비교, 상징은 약속된 의미가 있어요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "비유 = 거짓말" — 사실은 아니지만, 더 깊은 진실을 전달해요. 시는 비유의 예술.
          ❌ "직유와 은유는 같은 거" — "~같다"가 있으면 직유, 없으면 은유. 작은 차이지만 분류는 명확.
          ❌ "상징은 작가가 마음대로" — 문화적으로 합의된 것이 많아요(비둘기, 거울, 별 등). 그 약속 위에서 작가가 변형해요.
        </p>
      </SectionCard>
      <SectionCard title="실생활 속 비유">
        <p>
          노래 가사·광고 카피·일상 표현 어디서나 비유가 쓰여요. "설렘 가득한 봄" = 봄을 의인화.
          "그는 바위 같은 사람" = 직유. 비유를 알아채면 글이 훨씬 풍부하게 보이고, 글쓰기에도 강력한 무기가 돼요.
          본 단원은 작품 본문 인용 없이 일반 예시로만 다룹니다.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <MetaphorMatchingGame />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
