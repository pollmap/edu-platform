import { notFound } from 'next/navigation';
import { EnglishWritingBuilder } from '@/components/interactive/english/EnglishWritingBuilder';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'E-CE2-02';

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
          공통영어2 쓰기는 <strong>5단락 에세이 구조</strong>를 정복하는 단계.
          서론·본론·결론 5단락이 영어 글쓰기의 표준이고, 한 번 익히면 대학·직장·해외시험 모두에 통해요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 5단락 에세이">
        <p>
          ① <strong>Introduction</strong>(주제 + thesis) →
          ② <strong>Body 1</strong>(근거 1 + 예) →
          ③ <strong>Body 2</strong>(근거 2 + 예) →
          ④ <strong>Body 3</strong>(근거 3 + 예) →
          ⑤ <strong>Conclusion</strong>(요약 + 시사점). 단락마다 topic sentence가 첫 문장에.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ &quot;멋진 어휘로 가득 채워야&quot; — 어려운 단어 남발은 의미 흐림. clarity가 우선.
          ❌ &quot;첫 줄에 인용·격언으로 시작&quot; — 직접적 thesis가 강한 첫인상.
          ❌ &quot;접속사 종류 모두 사용&quot; — 같은 의미라면 한두 개만 골라 깔끔하게.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          토익 라이팅·아이엘츠·SAT·자기소개 에세이 — 모두 5단락 구조로 풀려요.
          수능 영어 어휘·문법 문제도 5단락 에세이 흐름에서 출제되는 경우가 많아요. 아래에서 직접 빌드해 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <EnglishWritingBuilder />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
