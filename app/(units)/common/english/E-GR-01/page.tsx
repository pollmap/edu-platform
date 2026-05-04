import { notFound } from 'next/navigation';
import { NounArticleExplorer } from '@/components/interactive/english/NounArticleExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'E-GR-01';

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
          영어 명사는 거의 항상 <strong>관사(a/an/the)</strong>나 다른 한정사와 함께 다녀요.
          한국어와 가장 큰 차이라 한국 학생이 가장 자주 틀리는 부분이에요.
        </p>
      </SectionCard>
      <SectionCard title="a / an / the / 무관사 4가지 길">
        <p>
          ① <strong>a / an</strong>: 처음 등장하는 단수 명사. 자음 소리 앞엔 a, 모음 소리 앞엔 an.
          ② <strong>the</strong>: 듣는 사람도 아는 특정한 것 (앞에 나왔거나, 세상에 하나뿐인 것).
          ③ <strong>무관사</strong>: 복수·셀 수 없는 명사가 일반적인 의미일 때.
          ④ 기타 한정사(my/this/some 등)가 있으면 a/the는 안 써요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "철자가 모음이면 an" — 소리 기준이에요. "an hour" (h 묵음, 모음 소리)는 OK, "a university" (j 자음 소리)도 OK.
          ❌ "the 는 강조" — 강조가 아니라 "그 특정한 것"이라는 표시예요.
          ❌ "복수에는 the 안 씀" — 특정 복수는 the 가능 ("the books on my desk").
        </p>
      </SectionCard>
      <SectionCard title="실생활 속 관사">
        <p>
          이메일·자기소개·시험 작문에서 관사를 빼먹으면 어색해 보여요.
          "I bought book yesterday" → "I bought a book yesterday".
          뉴스 헤드라인은 관사를 자주 생략하지만 일상 글에는 꼭 필요해요. 빈칸 채우기로 감을 잡아 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <NounArticleExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
