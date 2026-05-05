import { notFound } from 'next/navigation';
import { WorldCultureExplorer } from '@/components/interactive/english/WorldCultureExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'E-WC';

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
          세계 문화 영어는 <strong>같은 영어라도 지역·문화에 따라 의사소통 규칙이 다르다</strong>는
          사실을 익히는 과목이에요. 미국식이 영어의 전부가 아니에요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 영어권 문화의 다양성">
        <p>
          미국·영국·호주·동아시아·중동·북유럽 — 같은 영어로 소통해도
          <strong> 인사·침묵·격식·금기</strong>가 권역별로 달라요. 단어보다 이 차이를 먼저 알아야
          오해 없이 소통할 수 있어요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ &quot;영어=미국 문화&quot; — 영국·호주·캐나다 + 비영어권 영어까지 다양해요.
          ❌ &quot;직접적이면 솔직&quot; — 영국·동아시아 비즈니스에서는 우회가 예의.
          ❌ &quot;침묵은 어색&quot; — 북유럽·동아시아에서는 침묵이 사고·존중의 표현.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          해외 인턴·국제 미팅·교환학생·외국인 친구 — 모두 같은 매트릭스로 분석돼요.
          수능 영어 듣기는 상황·관계 추론에서 문화 차이가 자주 출제. 아래 6권역을 비교해 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <WorldCultureExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
