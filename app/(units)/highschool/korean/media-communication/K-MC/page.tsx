import { notFound } from 'next/navigation';
import { MediaLiteracyExplorer } from '@/components/interactive/korean/MediaLiteracyExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'K-MC';

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
          매체 의사소통은 <strong>뉴스·SNS·광고·영상이 어떻게 메시지를 만들고 전달하는가</strong>를
          비판적으로 보는 과목이에요. 같은 사실도 매체에 따라 다르게 편집·강조될 수 있어요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 매체 분석의 4축">
        <p>
          ① <strong>발신자</strong>(누가 만들었나) ② <strong>메시지</strong>(무엇을 전달하나)
          ③ <strong>매체 형식</strong>(어떤 도구로) ④ <strong>수신자</strong>(누구를 위해).
          이 네 축을 동시에 보면 광고·뉴스·SNS의 의도가 더 잘 보여요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ &quot;사진은 진실이다&quot; — 프레이밍·편집·자막에 따라 같은 사진도 의미가 바뀌어요.
          ❌ &quot;뉴스는 객관적이다&quot; — 어떤 사실을 선택·배치하느냐 자체가 편집이에요.
          ❌ &quot;광고는 분석할 필요 없다&quot; — 가장 잘 만들어진 설득 텍스트라 분석 가치가 커요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          가짜뉴스·딥페이크·알고리즘 추천 — 모두 같은 분석 도구로 풀려요.
          수능 화법·작문에서는 매체별 메시지 분석 문제가 자주 출제. 아래에서 미디어 리터러시 4단계를 익혀보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <MediaLiteracyExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
