import { notFound } from 'next/navigation';
import { PartOfSpeechSorter } from '@/components/interactive/korean/PartOfSpeechSorter';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'K-LE';

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
          언어생활탐구는 <strong>일상의 한국어를 자료처럼 관찰</strong>하는 과목이에요.
          SNS 댓글·뉴스 헤드라인·광고 카피·일상 대화를 분석해
          어휘 변화·신조어·맞춤법·발음 규범의 실제 모습을 파악해요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 관찰의 4단계">
        <p>
          ① <strong>수집</strong>(어디에서 어떤 표현이 쓰이나) →
          ② <strong>분류</strong>(품사·어종·기능별) →
          ③ <strong>분석</strong>(왜 이렇게 변했나) →
          ④ <strong>판단</strong>(규범 vs 실제 사용). 이 흐름이 언어 자료 분석의 표준 절차예요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ &quot;신조어는 모두 잘못된 말이다&quot; — 시대마다 새 단어가 들어오고 자리잡는 건 자연스러운 변화예요.
          ❌ &quot;맞춤법만 맞으면 된다&quot; — 상황에 맞는 격식·어종 선택이 더 중요할 때가 많아요.
          ❌ &quot;사전에 없으면 틀린 말&quot; — 사전 등재는 변화의 마지막 단계라 시차가 큽니다.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          광고 카피의 어휘 분석, SNS 게시물의 어종 분류, 뉴스 제목의 압축 표현 — 모두 같은 도구로 풀려요.
          수능 화법·언어에서는 품사 식별·어종 구분이 자주 출제. 아래에서 9품사를 직접 분류해 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <PartOfSpeechSorter />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
