import { notFound } from 'next/navigation';
import { PartOfSpeechSorter } from '@/components/interactive/korean/PartOfSpeechSorter';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'K-GR-06';

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
          단어는 <strong>더 작은 의미 조각(형태소)</strong>으로 분해할 수 있어요. 단일어는 통째로,
          파생어는 <strong>접사 + 어근</strong>, 합성어는 <strong>어근 + 어근</strong>으로 만들어져요.
          단어 형성 원리를 알면 모르는 단어도 추측해서 읽을 수 있어요.
        </p>
      </SectionCard>
      <SectionCard title="단어의 3가지 종류">
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li><strong>단일어</strong> — 더 쪼갤 수 없음 (산·하늘·먹다)</li>
          <li><strong>파생어</strong> — 어근 + 접사 (햇과일·맨손·조용히)</li>
          <li><strong>합성어</strong> — 어근 + 어근 (밤하늘·돌다리·뛰어가다)</li>
        </ul>
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
          접두사(앞에 붙음)·접미사(뒤에 붙음)는 단어의 뜻을 미세하게 바꿔요.
          예: <strong>풋과일</strong>(덜 익은) · 학생<strong>들</strong>(여럿) · 사랑<strong>스럽다</strong>(상태).
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <PartOfSpeechSorter />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
