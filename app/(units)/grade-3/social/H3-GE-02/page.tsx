import { notFound } from 'next/navigation';
import { KoreaEnvironmentLayers } from '@/components/interactive/social/KoreaEnvironmentLayers';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'H3-GE-02';

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
          고장의 모습은 <strong>땅 모양(지형)·날씨(기후)·자연 자원</strong>이 서로 영향을 주며 만들어져요.
          바닷가 마을과 산골 마을, 도시와 시골이 서로 다른 까닭이 바로 이 세 가지 차이 때문이에요.
        </p>
      </SectionCard>
      <SectionCard title="지리적 특성을 보는 3겹 지도">
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li><strong>지형</strong> — 산·강·바다·평야가 어디에 있는지</li>
          <li><strong>기후</strong> — 사계절 기온과 비·눈·바람이 어떤지</li>
          <li><strong>자원</strong> — 어떤 흙·물·식물이 사람의 생활에 쓰이는지</li>
        </ul>
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
          한 고장의 사람들이 어떤 음식을 먹고, 어떤 집을 짓고, 어떤 일을 하는지는
          이 3겹 지도에서 답이 나와요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <KoreaEnvironmentLayers />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
