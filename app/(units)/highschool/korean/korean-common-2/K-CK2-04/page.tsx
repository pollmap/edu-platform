import { notFound } from 'next/navigation';
import { SentenceComponentTree } from '@/components/interactive/korean/SentenceComponentTree';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'K-CK2-04';

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
          문장 단원에서는 <strong>주성분(주어·서술어·목적어·보어)</strong>과 <strong>부속성분(관형어·부사어)</strong>의 관계를 익혀요.
          긴 문장이 헷갈릴 때 트리로 분해하면 "어디가 핵이고 어디가 꾸미는 부분인지"가 한눈에 보여요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 문장 성분 6종">
        <p>
          한국어 문장은 보통 <strong>주어 + (목적어/보어) + 서술어</strong>가 뼈대고, <strong>관형어·부사어</strong>가 명사·서술어를 꾸며요.
          능동/피동, 사동/주동, 직접/간접 인용 같은 표현 변환도 결국 이 성분 구조를 어떻게 바꾸느냐의 문제.
          트리로 분해하면 변환 전후가 어디서 달라지는지 정확히 보여요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "주어는 항상 맨 앞에 있다" — 주어가 생략되거나 뒤에 가는 경우가 한국어에서는 많음.
          ❌ "관형어·부사어는 빼도 된다" — 의미 전달에는 빠질 수 있지만, 글의 리듬·정확도에는 결정적.
          ❌ "피동은 무조건 어색하다" — 주체가 분명하지 않거나 강조 대상이 다를 때는 피동이 자연스러워요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          긴 신문 기사·논문 문장이 헷갈리면 일단 주어와 서술어부터 찾으세요. 그 다음 목적어·보어, 마지막에 꾸밈말.
          수능 문법은 매년 문장 성분과 표현 변환 문제가 나와요. 아래 트리로 직접 분해해 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <SentenceComponentTree />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
