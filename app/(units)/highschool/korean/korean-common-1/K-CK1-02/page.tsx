import { notFound } from 'next/navigation';
import { TextStructureTree } from '@/components/interactive/korean/TextStructureTree';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'K-CK1-02';

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
          독서는 <strong>글의 구조를 파악하고 핵심 정보를 골라내는 과정</strong>이에요.
          긴 글을 처음부터 끝까지 똑같이 읽지 말고, 트리처럼 상위 → 하위로 가지를 친다고 생각하세요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 글 구조 5유형">
        <p>
          설명문은 보통 <strong>비교·대조 / 원인·결과 / 분류 / 시간 순서 / 정의·예시</strong> 5가지 구조 중 하나로 짜여요.
          이 구조를 잡으면 글의 80%가 정리돼요. 핵심 문장(주제문)은 보통 첫 문단·마지막 문단·소제목 직후에 자리잡고,
          그 아래 뒷받침 문장들이 매달려요. 트리로 그려 보면 위치가 명확히 보여요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "긴 글은 처음부터 외워야 한다" — 구조부터 잡으면 외울 양이 1/3로 줄어요.
          ❌ "어려운 단어를 모두 사전에 찾아야 한다" — 모르는 단어는 일단 표시만, 문맥으로 추론 먼저.
          ❌ "주제는 마지막에 있다" — 영어 글은 보통 첫 문단, 한국어 신문 칼럼은 마지막에 있는 경우가 많아요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          신문·논설·교과서·연구 보고서 — 모두 트리 구조로 정리하면 빠르게 파악돼요.
          수능 비문학은 사실상 "이 글의 구조를 잡았는가"를 묻는 시험이에요.
          아래 인터랙티브로 글 구조를 시각화해 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <TextStructureTree />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
