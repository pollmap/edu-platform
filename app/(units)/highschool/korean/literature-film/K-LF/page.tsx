import { notFound } from 'next/navigation';
import { AdaptationFormatExplorer } from '@/components/interactive/korean/AdaptationFormatExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'K-LF';

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
          문학과 영상은 <strong>같은 이야기가 매체에 따라 어떻게 달라지는가</strong>를 다루는 과목이에요.
          소설이 영화가 되고, 영화가 웹툰이 되는 과정에서 어떤 정보가 사라지고 어떤 표현이 새로 생기는지 봐요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 매체의 표현 단위">
        <p>
          소설은 <strong>문장</strong>, 영화는 <strong>쇼트·컷</strong>, 드라마는 <strong>회차</strong>,
          웹툰은 <strong>컷·스크롤</strong>이 표현 단위예요. 같은 장면이라도 매체에 따라
          시간 압축·내면 표현·정보량이 완전히 달라져요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ &quot;원작이 항상 좋다&quot; — 매체 특성을 살려 각색하면 영상이 원작을 능가하기도 해요.
          ❌ &quot;줄거리만 같으면 같은 작품&quot; — 매체가 다르면 같은 줄거리도 다른 경험을 줘요.
          ❌ &quot;웹툰은 만화의 디지털 복사&quot; — 세로 스크롤·컷 사이 여백 등 고유 문법이 있어요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          OTT·유튜브·웹툰 모두 같은 분석 도구로 비교돼요. 수능·논술에서는
          매체 변환에 따른 의미 변화·서술자 변화 식별이 자주 출제. 아래 4매체를 직접 비교해 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <AdaptationFormatExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
