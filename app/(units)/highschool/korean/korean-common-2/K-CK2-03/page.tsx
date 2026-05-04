import { notFound } from 'next/navigation';
import { ArgumentStructureBuilder } from '@/components/interactive/korean/ArgumentStructureBuilder';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'K-CK2-03';

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
          논증적 작문은 <strong>읽는 사람을 설득하는 글</strong>이에요. 핵심은 "내 입장이 더 합리적인 이유를
          상대가 받아들일 수 있도록" 짜는 것. 그러기 위해 주장-근거-반론 수용의 5블록 구조를 갖춰야 해요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 논증의 5블록">
        <p>
          ① <strong>주장</strong>은 한 문장으로 명확히. ② <strong>근거</strong>는 출처가 있는 사실·통계·사례로.
          ③ <strong>근거-주장 연결</strong>은 "이 근거가 왜 주장을 받쳐 주는지" 다리를 놓는 단계로,
          가장 자주 빠지는 부분이에요. ④ <strong>반론 수용</strong>은 예상되는 반대 의견을 짚고 그 한계를 지적.
          ⑤ <strong>결론</strong>은 주장을 다시 강조하며 의의·행동 제안으로 마무리.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "근거만 많이 모으면 설득된다" — 근거-주장 연결이 빠지면 "그래서 뭐?"가 돼요.
          ❌ "반론은 약점을 드러내니 빼야 한다" — 오히려 반론을 짚어 주는 글이 더 단단해요.
          ❌ "객관성 = 의견 없음" — 입장이 분명하되 근거로 뒷받침해야 객관적인 글입니다.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          대학 자기소개서·논술·진로 발표·SNS 게시글 — 모두 5블록으로 정리하면 짜임새가 살아나요.
          수능 화법·작문에서는 5블록 중 어느 부분이 부족한지 진단하는 문제가 자주 출제.
          아래에서 각 블록의 역할과 흔한 실수를 비교해 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <ArgumentStructureBuilder />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
