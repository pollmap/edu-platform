import { notFound } from 'next/navigation';
import { PhonicsExplorer } from '@/components/interactive/english/PhonicsExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'E-VOC-04';

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
          { label: `학년 공통 / ${SUBJECT_LABEL[unit.subject]}`, href: `/common/${unit.subject}` },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          영어 단어는 <strong>어근(root) + 접두사(prefix) + 접미사(suffix)</strong>로 분해할 수 있어요.
          이 구조를 알면 모르는 단어도 뜻을 어림짐작할 수 있어 어휘가 폭발적으로 늘어요.
        </p>
      </SectionCard>
      <SectionCard title="예시로 분해해 보면">
        <ul className="text-sm space-y-1 text-zinc-700 dark:text-zinc-300 list-disc list-inside">
          <li><strong>un + happy</strong> → 행복하지 않은 (un- = 부정 접두사)</li>
          <li><strong>re + play</strong> → 다시 재생 (re- = 다시 접두사)</li>
          <li><strong>teach + er</strong> → 가르치는 사람 (-er = ~하는 사람 접미사)</li>
          <li><strong>quick + ly</strong> → 빠르게 (-ly = 부사 접미사)</li>
          <li><strong>port + able</strong> → 가지고 다닐 수 있는 (port = 운반 어근, -able = 가능 접미사)</li>
        </ul>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
          어근 한 개를 알면 그 어근이 들어간 단어 5~10개의 뜻을 짐작할 수 있어요. 라틴·그리스 어원 어근 100개만 익혀도 영어 어휘가 크게 확장됩니다.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <PhonicsExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
