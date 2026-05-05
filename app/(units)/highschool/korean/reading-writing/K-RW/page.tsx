import { notFound } from 'next/navigation';
import { OutlinePlannerExplorer } from '@/components/interactive/korean/OutlinePlannerExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'K-RW';

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
          독서와 작문은 <strong>읽기와 쓰기를 한 흐름으로</strong> 익히는 과목이에요.
          잘 읽는 사람이 잘 쓰고, 자주 쓰는 사람이 더 깊이 읽어요. 두 활동은 분리되지 않아요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 작문 4단계">
        <p>
          ① <strong>주제 정하기</strong> → ② <strong>개요 짜기</strong> →
          ③ <strong>초고 쓰기</strong> → ④ <strong>고치기</strong>.
          개요 단계에서 시간을 충분히 쓰면 초고 시간이 절반으로 줄어요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ &quot;개요는 시간 낭비&quot; — 개요 없이 쓰면 중간에 길을 잃어요.
          ❌ &quot;한 번에 완성하는 글이 좋다&quot; — 모든 글은 고치는 단계에서 완성돼요.
          ❌ &quot;책을 많이 읽으면 글이 좋아진다&quot; — 읽고 따라 써보는 행동까지 해야 효과.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          논술·자기소개서·보고서·블로그 — 모두 4단계로 풀려요.
          수능 작문은 개요 짜기·고치기 단계의 판단 능력이 핵심. 아래에서 개요 짜기 도구를 직접 사용해 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <OutlinePlannerExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
