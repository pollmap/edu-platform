import { notFound } from 'next/navigation';
import { KeySentenceHighlighter } from '@/components/interactive/english/KeySentenceHighlighter';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'E-CE1-02';

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
          영문 읽기는 <strong>모든 문장을 평등하게 읽는 게 아니라</strong>, 주제문 → 뒷받침문 → 예시의 위계를 잡고
          중요한 곳에 시간을 더 쓰는 작업이에요. 위계가 잡히면 읽는 속도와 정확도가 동시에 올라가요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 문장 위계 3단">
        <p>
          영어 단락의 <strong>주제문(topic sentence)</strong>은 보통 첫 문장. 그 뒤로 <strong>뒷받침문(supporting)</strong>이
          이유·사례를 펼치고, 마지막에 <strong>예시·세부(detail)</strong>가 붙어요. 시험에서 "필자가 말하고자 하는 바"를
          묻는 문제는 사실상 주제문을 식별하는 문제. 지문 첫 문장을 우선 읽고 가설을 세운 뒤, 뒤 문장으로 검증하는 순서가 효율적.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "처음부터 끝까지 다 해석해야 한다" — 모든 문장을 똑같이 읽으면 시간이 부족해요.
          ❌ "주제문은 항상 첫 문장이다" — 뒤에 오는 경우(특히 논평·내러티브)도 흔함.
          ❌ "모르는 단어는 다 사전을 봐야 한다" — 주제문 뒤를 받쳐 주는 단어가 아니면 일단 추론하고 넘어가도 OK.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          학술 영문 자료·해외 뉴스·해외 사이트 — 위계 식별 능력이 곧 읽기 속도. 수능 영어는 주제·요지·요약 문제가
          매년 출제. 아래에서 두 영문 단락의 주제문을 직접 식별하고, 위계를 시각으로 비교해 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <KeySentenceHighlighter />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
