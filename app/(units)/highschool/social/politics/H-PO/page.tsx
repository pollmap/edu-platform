import { notFound } from 'next/navigation';
import { SeparationOfPowersExplorer } from '@/components/interactive/social/SeparationOfPowersExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'H-PO';

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
          정치는 <strong>여러 사람이 공동의 결정을 내리는 방식</strong>이에요.
          한 사람이 모든 권력을 쥐면 위험하니, 근대 민주주의는 권력을 셋(입법·행정·사법)으로 나누고 서로 견제하게 만들었어요.
          이게 <strong>삼권분립</strong>이고, 모든 정치 제도 분석의 출발점이에요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 셋으로 쪼개고, 서로 견제">
        <p>
          ① <strong>입법부(국회)</strong>: 법을 만들고 예산을 심사. 국정감사로 행정부를 통제.
          ② <strong>행정부(정부·대통령)</strong>: 법을 집행. 대통령은 법률안 거부권으로 입법부를 견제.
          ③ <strong>사법부(법원)</strong>: 법에 따라 분쟁을 판결. 위헌법률심사로 입법부의 잘못된 법을 무효화.
          이 삼각 견제 구조 위에 헌법재판소·감사원·선거관리위원회 같은 독립 기구가 더해져 권력 집중을 막아요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "삼권분립 = 셋이 평등" — 이론은 평등이지만 실제 한국은 행정부 중심. 헌법은 서로 견제하라는 「분립과 균형」.
          ❌ "대통령 = 행정부 전체" — 대통령은 행정부의 수반이고, 그 아래 국무총리·각 부처·공무원 조직이 거대 행정부를 이뤄요.
          ❌ "법원이 법을 만든다" — 법은 국회가 만들고, 법원은 그 법을 해석·적용해요. 다만 판례가 사실상 규범 역할을 할 때도 있어요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          뉴스에서 「국회 표결」, 「대통령 거부권 행사」, 「헌법재판소 결정」을 보면 그게 다 삼권분립의 작동 장면이에요.
          수능 「정치와 법」의 단골 출제 주제이고, 공무원·로스쿨·언론사 시험에도 빠짐없이 나와요.
          정치적 입장과 무관하게 — 어느 정당이 권력을 잡든 — 이 구조 자체를 정확히 이해하는 게 비판적 시민의 출발점이에요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <SeparationOfPowersExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
