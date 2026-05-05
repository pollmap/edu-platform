import { notFound } from 'next/navigation';
import { KeySentenceHighlighter } from '@/components/interactive/english/KeySentenceHighlighter';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'E-CE2-01';

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
          공통영어2 읽기는 <strong>장문에서 핵심 문장을 빠르게 찾는</strong> 능력이 목표예요.
          모든 문장을 똑같이 읽지 말고, 글의 무게 중심을 먼저 잡아내는 훈련.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 핵심 문장 위치">
        <p>
          영어 글은 보통 <strong>두괄식</strong> — 첫 단락 또는 단락 첫 문장에 핵심이 와요.
          예외는 narrative(서사)와 contrast(대조). 단락 끝에 결론이 오는 경우도 있으니
          첫 문장과 마지막 문장을 먼저 읽고 본론으로 들어가세요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ &quot;처음부터 끝까지 한 단어씩 읽기&quot; — 시간 부족·집중력 저하의 주범.
          ❌ &quot;모르는 단어 다 찾아야&quot; — 핵심 문장에 안 나오는 단어는 건너뛰는 게 효율적.
          ❌ &quot;예시도 다 외워야&quot; — 예시는 핵심을 뒷받침할 뿐, 시험 답은 핵심 문장에 있어요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          영자 신문·뉴스레터·논문 초록 — 핵심 문장 찾기로 10초에 글의 윤곽을 잡아요.
          수능 영어 독해는 핵심 문장 식별이 80% 점수의 열쇠. 아래에서 핵심 문장 표시 연습을 해보세요.
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
