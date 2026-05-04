import { notFound } from 'next/navigation';
import { FactOpinionSorter } from '@/components/interactive/korean/FactOpinionSorter';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'K-CK2-02';

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
          비판적·심미적 독서는 <strong>글을 그대로 흡수하지 않고 따져 가며 읽는 능력</strong>이에요.
          가장 먼저 해야 할 일은 글 안의 <strong>사실(fact)과 의견(opinion)을 분리</strong>하는 것.
          이게 안 되면 비판도 동의도 정확히 할 수 없어요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 비판적 읽기 3단계">
        <p>
          ① 사실·의견 분리 → 글의 토대(사실)와 글쓴이의 입장(의견)을 따로 보는 단계.
          ② 근거·주장 검증 → 사실은 출처와 일관성을, 의견은 논리와 가치 기준을 점검.
          ③ 다른 관점과 비교 → 같은 주제를 다룬 다른 글과 비교해서 입장 차이를 봐요.
          이 3단계가 흐트러지면 "글쓴이가 그렇대" 하는 수준에 머물러요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "비판적 읽기는 무조건 반대하는 것" — 비판은 약점을 찾는 것이지, 반대 그 자체가 아니에요.
          ❌ "유명한 사람이 쓴 글은 사실이다" — 권위에 의한 호소(authority appeal)는 가장 흔한 함정.
          ❌ "감정 호소는 무조건 나쁘다" — 정당한 감정 환기와 부당한 선동은 다르며, 분리 기준이 필요해요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          뉴스 기사·논평·SNS 게시물·광고 — 모두 사실과 의견이 섞여 있어요. 분리 연습이 미디어 리터러시의 출발점.
          수능에서는 글 속 의견과 사실을 분리하는 문제가 비문학에 출제. 아래로 직접 분류해 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <FactOpinionSorter />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
