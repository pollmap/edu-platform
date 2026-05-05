import { notFound } from 'next/navigation';
import { EarthquakeWaveSimulator } from '@/components/interactive/science/EarthquakeWaveSimulator';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'S4-EU-01';

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
          땅 속 깊은 곳은 굉장히 뜨거워서 <strong>녹은 돌(마그마)</strong>이 흐르고 있어요.
          이 마그마가 약한 곳을 뚫고 솟아오르면 <strong>화산</strong>, 땅이 어긋나며 떨리면 <strong>지진</strong>이 생겨요.
        </p>
      </SectionCard>
      <SectionCard title="화산과 지진은 형제 같은 자연 현상">
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li><strong>같은 뿌리</strong> — 두 현상 모두 땅 속 큰 판이 움직이며 생겨요</li>
          <li><strong>화산</strong> — 마그마가 분출 → 용암·화산재·화산 가스</li>
          <li><strong>지진</strong> — 땅이 어긋남 → 흔들림(파동)이 사방으로 퍼져 나감</li>
          <li><strong>준비</strong> — 지진 가방·대피 경로·튼튼한 책상 아래 숨기 같은 안전 행동을 미리 알아두기</li>
        </ul>
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
          한국도 안전지대가 아니에요. 경주·포항에서 5도 이상 지진이 있었어요. 무서워하기보다 미리 아는 게 중요해요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <EarthquakeWaveSimulator />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
