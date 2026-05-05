import { notFound } from 'next/navigation';
import { MediaComparisonMatrix } from '@/components/interactive/korean/MediaComparisonMatrix';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'E-ME';

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
          매체 영어는 <strong>영어 뉴스·SNS·광고·영상</strong>을 비판적으로 읽고 활용하는 과목이에요.
          단어를 더 외우는 것보다, 매체별로 어떻게 메시지가 만들어지는지 아는 게 더 큰 자산.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 매체별 영어 분석">
        <p>
          뉴스는 <strong>역삼각형 구조</strong>(가장 중요한 사실 먼저), SNS는 <strong>해시태그·줄임말</strong>,
          광고는 <strong>슬로건·CTA</strong>, 영상 자막은 <strong>구어체·줄임말</strong>이 표준.
          각 매체의 문법을 알면 같은 정보를 매체별로 다르게 표현할 수 있어요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ &quot;영어 뉴스는 학술 영어&quot; — 헤드라인은 동사 생략·축약 등 신문 고유 문법.
          ❌ &quot;SNS 영어는 다 비격식&quot; — 기업 계정·전문 인플루언서는 격식 톤.
          ❌ &quot;자막만 보면 영어 회화 마스터&quot; — 자막은 줄어든 표현, 실제 발화와 다를 수 있어요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          영자 신문·해외 유튜브·글로벌 SNS — 모두 매체별 분석 도구로 풀려요.
          수능 영어는 신문 기사·광고·이메일 등 매체 식별이 자주 출제. 아래에서 매체별 비교를 해보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <MediaComparisonMatrix />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
