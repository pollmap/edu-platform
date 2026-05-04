import { notFound } from 'next/navigation';
import { OutlinePlannerExplorer } from '@/components/interactive/korean/OutlinePlannerExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'K-CK1-03';

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
          작문은 <strong>생각을 다듬어 글로 옮기는 단계적 과정</strong>이에요.
          한 번에 완성된 글이 나오는 게 아니라, <strong>구상 → 개요 → 초고 → 고쳐 쓰기 → 검토</strong> 5단계로 다져요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 글쓰기 5단계">
        <p>
          ① 구상에서는 목적·예상 독자·전달할 핵심을 정해요. ② 개요에서는 큰 가지 → 작은 가지로 정보를 묶어요.
          ③ 초고는 일단 끝까지 빠르게 써요(완벽주의는 적). ④ 고쳐 쓰기는 문장·구조 단위로 따로 점검.
          ⑤ 마지막 검토는 맞춤법·인용·출처. 어느 단계를 건너뛰면 어떤 약점이 생기는지 시각으로 보면 분명해져요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "잘 쓰는 사람은 한 번에 쓴다" — 좋은 글일수록 고쳐 쓰기 횟수가 많아요.
          ❌ "개요는 시간 낭비" — 개요 없이 쓴 글은 흐름이 자주 끊겨요.
          ❌ "맞춤법만 맞으면 된다" — 구조·논리가 약하면 맞춤법이 완벽해도 글이 흐려요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          수행평가 보고서·자기소개서·논술·이메일 — 5단계 똑같이 적용돼요. 학교생활기록부 작성도 이 흐름.
          수능 화법·작문은 글의 단계별 고쳐 쓰기 양상을 묻는 문제가 자주 출제돼요.
          아래 인터랙티브로 단계별 점검 포인트를 확인해 보세요.
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
