import { notFound } from 'next/navigation';
import { ParticleStateSimulator } from '@/components/interactive/science/ParticleStateSimulator';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'S4-MA-01';

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
          물은 같은 물질이지만 세 가지 모습으로 변해요. <strong>얼음(고체) → 물(액체) → 수증기(기체)</strong>.
          모습이 바뀌어도 <strong>알갱이는 그대로</strong>, 알갱이들이 움직이는 빠르기와 거리만 달라져요.
        </p>
      </SectionCard>
      <SectionCard title="물의 변신 6가지 이름">
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li><strong>녹다(융해)</strong> — 얼음 → 물</li>
          <li><strong>얼다(응고)</strong> — 물 → 얼음</li>
          <li><strong>증발</strong> — 물 → 수증기 (천천히, 표면에서)</li>
          <li><strong>끓음</strong> — 물 → 수증기 (빠르게, 100도)</li>
          <li><strong>응결</strong> — 수증기 → 물 (구름·이슬)</li>
          <li><strong>승화</strong> — 얼음 → 수증기 / 수증기 → 얼음 (드라이아이스·서리)</li>
        </ul>
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
          입자(알갱이) 모형으로 보면 — 고체는 빽빽이 줄지어 떨고, 액체는 미끄러지듯 굴러다니고,
          기체는 멀리 떨어져 빠르게 날아다녀요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <ParticleStateSimulator />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
