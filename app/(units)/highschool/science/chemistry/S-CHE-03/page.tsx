import { notFound } from 'next/navigation';
import { ChemicalBondExplorer } from '@/components/interactive/science/highschool/ChemicalBondExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'S-CHE-03';

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
          { label: '화학' },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          원자들이 모여 분자·결정을 이루는 방식이 <strong>화학결합</strong>이에요.
          전자를 주고받느냐(이온결합), 같이 쓰느냐(공유결합), 모두 함께 흐르게 하느냐(금속결합) — 세 가지가 자연을 거의 다 설명해요.
          결합 방식이 달라지면 같은 원소도 전혀 다른 성질을 갖게 돼요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 옥텟 규칙과 전기음성도">
        <p>
          원자는 최외각 8개(또는 He 2개)를 채워 안정한 비활성기체 배치를 갖고 싶어해요(옥텟 규칙).
          이를 위해 전자를 주고받거나(이온), 공유하거나(공유), 자유전자로 풀어놓아요(금속).
          전기음성도 차이가 1.7 이상이면 이온성, 미만이면 공유성. 0이면 무극성 공유.
          이온성 결정은 단단·부서짐·물에 녹으면 전기 통함. 공유성 분자는 녹는점 낮음·대부분 부도체.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "이온결합은 분자다" — NaCl은 분자가 아니라 거대한 이온결정. 「화학식 단위」(NaCl)일 뿐.
          ❌ "전자를 주는 게 음이온이다" — 전자를 잃으면(주면) 양이온, 받으면 음이온.
          ❌ "공유결합은 항상 약하다" — 다이아몬드도 공유결합인데 자연에서 가장 단단.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          소금(NaCl)이 물에 녹는 이유는 극성 물 분자가 이온결합을 끊기 때문.
          금속이 휘어지는 이유는 자유전자 바다 위에서 양이온 층이 미끄러지기 때문(연성·전성).
          DNA 이중나선은 수소결합으로 묶임. 수능 「화학결합과 분자」 단원 핵심.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <ChemicalBondExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
