import { notFound } from 'next/navigation';
import { LiteratureEthicsExplorer } from '@/components/interactive/social/LiteratureEthicsExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'H-HE';

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
          문학과 예술은 <strong>「추상적 윤리 원칙이 사람의 삶에서 어떻게 작동하는가」를 보여주는 실험실</strong>이에요.
          『안티고네』의 안티고네, 『죄와 벌』의 라스콜니코프, 『목민심서』의 관료 — 작품 속 인물의 선택을 따라가면 윤리의 무게가 손에 잡혀요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 문학이 다루는 윤리적 주제">
        <p>
          ① <strong>법 vs 양심</strong>: 안티고네 — 실정법과 자연법(인륜)이 충돌할 때.
          ② <strong>다수를 위한 소수의 희생</strong>: 죄와 벌 — 공리주의의 위험을 드러내는 고전.
          ③ <strong>구조 vs 개인</strong>: 운수 좋은 날·삼대 — 가난·계급이 만드는 비극, 개인의 책임은 어디까지인가.
          ④ <strong>회복적 정의</strong>: 레미제라블 — 처벌 대신 자비가 정의의 일부일 수 있는가.
          작품 본문은 인용하지 않고 줄거리·주제·쟁점만 정리했어요. 원작은 직접 읽어 보면 다른 결이 살아나요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "문학 = 감상만 하면 됨" — 윤리적 쟁점을 분석하는 것도 문학 읽기의 한 방식이에요.
          ❌ "옛날 작품이라 안 맞다" — 안티고네(BC 5세기)가 던진 「법 vs 양심」 문제는 지금도 그대로 작동해요.
          ❌ "문학은 정답을 준다" — 좋은 문학은 답보다 「더 정교한 질문」을 던져요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          수능 인문학과 윤리·문학 융합 문항에서 「작품 속 윤리적 쟁점 분석」이 자주 나와요.
          뉴스의 사건이나 정책을 볼 때, 「이 상황은 어느 작품의 어떤 인물의 처지와 닮았나」를 떠올리는 습관은 비판적 사고의 기본기예요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <LiteratureEthicsExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
