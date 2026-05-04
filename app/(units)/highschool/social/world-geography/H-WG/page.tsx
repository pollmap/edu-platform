import { notFound } from 'next/navigation';
import { WorldContinentExplorer } from '@/components/interactive/social/WorldContinentExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'H-WG';

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
          세계시민과 지리는 <strong>지구라는 공동체에서 우리 위치를 찾아가는</strong> 과목이에요.
          기후변화·이주·식량·전쟁 같은 문제가 전부 「공간」 위에서 일어나기 때문에, 6대륙의 자연·인구·경제 골격을 잡아두는 게 출발점이에요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 6대륙의 좌표">
        <p>
          아시아·유럽·아프리카·북아메리카·남아메리카·오세아니아(+ 남극).
          각 대륙은 ① 면적과 인구 ② 주요 기후대 ③ 대표 국가 ④ 자원·산업 구조가 모두 달라요.
          예) 아시아는 인구 60% 이상이 모여 있는 거대 시장, 아프리카는 자원·청년 인구로 21세기의 성장축으로 떠올라요.
          공간을 이렇게 「기능 단위」로 보는 시각이 지리적 사고의 핵심이에요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "유럽이 가장 부유한 대륙" — 평균은 그렇지만, 동·남유럽과 서유럽 격차가 커요. 「대륙 단위 평균」은 자주 오해를 만들어요.
          ❌ "아프리카는 가난한 대륙" — 54개국으로 나뉘고, 나이지리아·이집트·남아공처럼 빠르게 성장하는 경제도 많아요.
          ❌ "오세아니아 = 호주" — 14국 이상이 있고, 태평양 도서국은 해수면 상승의 최전선이에요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          뉴스의 「우크라이나 전쟁이 식량 가격에 미치는 영향」, 「중동 분쟁과 유가」, 「ASEAN 공급망 재편」 — 다 대륙·지역 단위 분석이 깔려 있어요.
          수능 「세계지리」는 매년 6대륙 국가 식별이 출제되고, 외무영사직·국제기구 시험에서도 자주 등장해요.
          아래 지도에서 대륙을 직접 클릭해 면적·인구·대표국가 같은 골격을 머릿속에 박아 두면, 어떤 국제 뉴스도 빠르게 위치를 잡을 수 있어요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <WorldContinentExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
