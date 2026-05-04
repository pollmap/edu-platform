import { notFound } from 'next/navigation';
import { NaturalSelectionSimulator } from '@/components/interactive/science/NaturalSelectionSimulator';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'S-BIO-06';

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
          { label: '생명과학' },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          진화는 「한 개체가 변하는 것」이 아니라 <strong>개체군의 유전자 빈도가 세대에 걸쳐 변하는 것</strong>이에요.
          다윈의 자연선택은 「변이 → 생존경쟁 → 적자생존 → 빈도 변화」라는 4단계 알고리즘.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 자연선택·유전자 빈도·하디-바인베르크">
        <p>
          개체군 안 변이는 돌연변이·유성생식의 재조합으로 끊임없이 생겨요. 환경에 더 잘 맞는 형질을 가진 개체가 자손을 더 많이 남기면,
          다음 세대에 그 형질을 만드는 「유전자」가 더 많아져요.<br />
          하디-바인베르크 평형 — 5가지 가정(돌연변이X, 자연선택X, 유전자흐름X, 유전적부동X, 무작위교배)을 모두 만족하면 빈도는 그대로 유지.
          하나라도 깨지면 진화가 일어나요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "기린은 목을 늘리려고 노력해서 길어졌다" — 라마르크설(획득형질 유전). 틀렸어요. 다윈은 「긴 목 변이」가 살아남은 것.<br />
          ❌ "진화는 더 우월한 방향으로만 간다" — 환경에 「적합한」 방향. 환경이 바뀌면 우열도 바뀜.<br />
          ❌ "사람은 침팬지에서 진화했다" — 둘은 공통조상에서 갈라진 사촌. 위계가 아닌 가지 분기.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          항생제 내성균 출현(병원 슈퍼버그), 매년 변하는 인플루엔자 백신, 산업혁명기 영국 회색가지나방의 검은 형질 폭증,
          DDT 내성 모기 — 모두 자연선택이 「수년~수십년」 안에 일어나는 실증 사례.
          수능 생명과학Ⅱ 「진화」 단원에서 빈도 계산·계통수 해석이 ★ 핵심 출제.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <NaturalSelectionSimulator />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
