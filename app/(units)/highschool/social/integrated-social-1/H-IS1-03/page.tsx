import { notFound } from 'next/navigation';
import { ClimateLifestyleSimulator } from '@/components/interactive/social/ClimateLifestyleSimulator';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'H-IS1-03';

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
          자연환경은 인간 생활을 결정하지 않지만, <strong>강하게 제약</strong>해요. 같은 인간이라도
          기후가 다르면 집·옷·음식이 달라지고, 적응 방식의 패턴이 비슷한 모양으로 수렴해요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 5대 기후의 적응">
        <p>
          열대(통풍·해충 대응), 건조(일교차·물 보존), 온대(사계절 적응), 냉대(보온·짧은 농사 시즌),
          한대(극저온·식물 부재) — 각 기후마다 인간이 만든 해법이 비슷한 원리(보온·통풍·식량 보존)를
          공유한다는 게 흥미로워요. 환경이 다르면 다른 답이 나오지만, 답을 찾는 과정은 비슷해요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "기후가 모든 걸 결정한다" — 환경은 제약일 뿐, 기술과 사회 제도가 그 안에서 다양한 선택을 만들어요.
          ❌ "추운 곳은 살기 나쁘다" — 한대·냉대 지역에도 정교한 생활 양식과 풍부한 문화가 존재해요.
          ❌ "지구 온난화 = 따뜻해지면 좋다" — 식량·물·재해 패턴이 흔들려서 적응 비용이 매우 큼.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          여행지 선택, 건축 양식, 식문화 — 모두 기후 적응의 결과물이에요. 통합사회·세계지리에서
          기후-생활양식 매칭 문제는 단골 출제. 아래에서 5대 기후를 비교해 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <ClimateLifestyleSimulator />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
