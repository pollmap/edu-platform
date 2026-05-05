import { notFound } from 'next/navigation';
import { SentenceComponentTree } from '@/components/interactive/korean/SentenceComponentTree';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'K-CL';

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
          화법과 언어는 <strong>표준 발음·문법·어휘·표기 규범</strong>을 한 번에 정리하는 과목이에요.
          말과 글의 기본기를 다지면 발표·면접·논술 모두에서 흔들리지 않아요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 문장 성분 7요소">
        <p>
          한국어 문장은 <strong>주어·서술어·목적어·보어·관형어·부사어·독립어</strong> 7요소로 짜여요.
          어떤 성분이 빠지거나 어순이 흐트러지면 문장이 어색해지고, 이게 어법 문제 출제의 핵심이에요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ &quot;말은 자연스럽게 하면 된다&quot; — 표준 발음·외래어 표기 규범이 따로 있어요.
          ❌ &quot;문법은 외우기만 하면 끝&quot; — 문장 성분 분석은 작문·독해 모두에 쓰는 도구.
          ❌ &quot;긴 문장이 격조 있다&quot; — 짧고 정확한 문장이 의사소통에 더 강해요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          발표·면접·아나운싱·뉴스 자막 — 모두 표준 발음·문법 규범을 따라요.
          수능 화법·언어에서는 문장 성분 분석과 표준어 규범이 단골 출제. 아래에서 문장 성분을 트리로 풀어 보세요.
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
