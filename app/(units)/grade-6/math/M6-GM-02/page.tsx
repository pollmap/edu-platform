import { notFound } from 'next/navigation';
import { BoxVolumeSurfaceExplorer } from '@/components/interactive/math/BoxVolumeSurfaceExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'M6-GM-02';

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
          <strong>부피</strong>는 입체가 차지하는 공간의 양, <strong>겉넓이</strong>는 입체의 모든 면을 펼쳤을 때
          넓이의 합이에요. 1cm × 1cm × 1cm 단위 큐브를 몇 개 채울 수 있는지 세는 게 부피의 출발점이에요.
        </p>
      </SectionCard>
      <SectionCard title="공식 유도">
        <p>
          한 층에 (가로 × 세로)개의 단위 큐브가 들어가요. 그게 (높이)층 쌓이니까 부피는 <strong>가로 × 세로 × 높이</strong>예요.
        </p>
        <p>
          겉넓이는 6개의 면을 모두 더한 값이에요. 마주 보는 면 3쌍이 합동이라서 <strong>2(가로·세로 + 세로·높이 + 가로·높이)</strong>로 정리돼요.
        </p>
        <p>
          정육면체일 때는 모든 변이 a로 같아서 부피 = a³, 겉넓이 = 6a²로 더 간단해져요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-zinc-700 dark:text-zinc-300">
          <li><strong>"부피의 단위는 cm²"</strong> — 부피 단위는 cm³(세제곱 센티미터)예요. cm²는 넓이.</li>
          <li><strong>"겉넓이는 면 한 개의 넓이"</strong> — 6개 면 전부의 합이에요. 마주 보는 면이 같으니 3쌍을 두 배로 더해도 같아요.</li>
          <li><strong>"가로를 2배로 키우면 부피도 2배"</strong> — 그건 맞아요. 하지만 모든 변을 2배로 키우면 부피는 8배(2³)가 돼요.</li>
        </ul>
      </SectionCard>
      <SectionCard title="실생활 속 부피·겉넓이">
        <p>
          음료수 팩의 용량(ml = cm³), 택배 박스의 부피(가로·세로·높이 합 측정), 페인트칠할 벽의 면적(겉넓이) — 모두
          이 단원의 응용이에요. 1L = 1000ml = 1000cm³ = 가로 10cm, 세로 10cm, 높이 10cm 정육면체와 같아요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <BoxVolumeSurfaceExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
