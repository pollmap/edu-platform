import { notFound } from 'next/navigation';
import { BiologyClassificationTree } from '@/components/interactive/science/BiologyClassificationTree';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'S-IS2-03';

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
          { label: '통합과학2' },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          지구 38억년 생명사는 <strong>「변화와 다양성」 한 단어로 요약</strong>돼요. 단세포에서 다세포로, 바다에서 육지로, 그리고 끝없이 분화한 종들이 만든 「생명의 나무」.
          이 모든 변화의 동력은 <strong>자연선택과 환경 변화</strong>예요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 진화 트리·5계 분류·계통수">
        <p>
          종은 「공통조상」에서 분기되어 진화 트리를 그려요. 분류 체계 = 종 → 속 → 과 → 목 → 강 → 문 → 계 → 역(domain).
          5계 — 식물·동물·균·원생생물·세균. 현대는 3역(고세균·진정세균·진핵생물) 체계로 확장.
          상동기관(같은 기원, 다른 기능) vs 상사기관(다른 기원, 같은 기능). DNA 염기서열 비교로 「분자 시계」 측정 가능.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "더 많은 종이 있는 시대가 더 진화한 시대다" — 진화는 다양성 ↑↓ 둘 다 일어남. 대멸종 후 폭발적 진화도 자주.<br />
          ❌ "진화 트리에서 위에 있는 것이 더 우월하다" — 「현재 살아있는 모든 종은 38억년 진화의 정점」. 위계 없음.<br />
          ❌ "고래와 물고기는 같은 동물군이다" — 고래는 포유류(육지 포유류 → 바다로 회귀).
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          코로나 변이 바이러스 계통수, 신종 박테리아 항생제 내성 진화, 한국 토종 식물 분류와 보전.
          DNA 염기서열로 「국과수」 친자 감별·범죄 수사·고생물 분석. 통합과학2·생명과학Ⅱ 「진화와 다양성」은 ★ 핵심 단원.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <BiologyClassificationTree />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
