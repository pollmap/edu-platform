import { notFound } from 'next/navigation';
import { SolidPropertyExplorer } from '@/components/interactive/math/SolidPropertyExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'M7-GM-04';

export function generateMetadata() {
  const unit = findUnit(UNIT_ID);
  return unit ? makeUnitMetadata(unit) : {};
}

export default function Page() {
  const unit = findUnit(UNIT_ID);
  if (!unit || unit.schoolLevel === 'highschool' || unit.grade === undefined) notFound();

  return (
    <main className="container mx-auto max-w-5xl px-4 py-8">
      <UnitHeader
        unit={unit}
        breadcrumb={[
          { label: '홈', href: '/' },
          { label: `${GRADE_LABEL[unit.grade]} / ${SUBJECT_LABEL[unit.subject]}`, href: `/grade-${unit.grade}/${unit.subject}` },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          입체도형은 <strong>면(F)·모서리(E)·꼭짓점(V)</strong>으로 분류돼요. 모든 면이 합동인 정다각형이고 모든 꼭짓점에
          모이는 면 수가 같으면 <strong>정다면체</strong>예요. 정다면체는 단 5가지뿐이에요.
        </p>
      </SectionCard>
      <SectionCard title="다섯 정다면체 (플라톤 입체)">
        <p>
          정사면체(F=4), 정육면체(F=6), 정팔면체(F=8), 정십이면체(F=12), 정이십면체(F=20). 더 이상 만들 수 없는 이유는,
          한 꼭짓점에 모이는 다각형의 내각 합이 360°보다 작아야 해서예요.
        </p>
        <p>
          예) 정삼각형 6개를 한 점에 모으면 60°×6=360°가 되어 평면이 됨. 그래서 정삼각형은 한 꼭짓점에 3·4·5개만 가능 → 정사면체·정팔면체·정이십면체.
        </p>
      </SectionCard>
      <SectionCard title="오일러 공식">
        <p>
          모든 다면체에서 <strong>V − E + F = 2</strong>가 성립해요. 정육면체로 검산: 8 − 12 + 6 = 2 ✓.
        </p>
        <p>
          이 식은 위상수학(topology)으로 확장돼서, 도넛 모양에서는 V − E + F = 0이 되는 등 도형의 본질적 성질을 드러내요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-zinc-700 dark:text-zinc-300">
          <li><strong>"정다면체는 무한히 많다"</strong> — 정확히 5가지뿐이에요. 위 내각 합 조건 때문.</li>
          <li><strong>"오일러 공식은 정다면체에만 성립"</strong> — 모든 단순 다면체에 성립해요(구멍 뚫린 도형 제외).</li>
          <li><strong>"각기둥도 정다면체"</strong> — 각기둥은 옆면이 직사각형이고 밑면이 다각형이라 모든 면이 합동이 아니에요. 정다면체 X.</li>
        </ul>
      </SectionCard>
      <SectionCard title="실생활 속 다면체">
        <p>
          주사위(정육면체·정십이면체·정이십면체로 만든 RPG용 주사위), 축구공(정이십면체에서 변형한 깎은 정이십면체),
          탄소 분자 풀러렌(C60, 축구공 모양), 바이러스 캡시드 — 모두 다면체 구조를 응용한 결과예요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <SolidPropertyExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
