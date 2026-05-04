import { notFound } from 'next/navigation';
import { HangulSystemExplorer } from '@/components/interactive/korean/HangulSystemExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'K-GR-01';

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
          한글은 1443년 세종이 창제한 글자예요. <strong>자음(닿소리)</strong>은 발음할 때 입·혀 모양에서, <strong>모음(홀소리)</strong>은 하늘(·)·땅(ㅡ)·사람(ㅣ)에서 따왔어요.
        </p>
      </SectionCard>
      <SectionCard title="왜 과학적이라고 할까?">
        <p>
          전 세계 글자 중 한글처럼 <strong>만든 사람·만든 해·만든 원리</strong>가 모두 기록된 글자는 거의 없어요(《훈민정음 해례본》).
          기본자에 획을 더해 글자를 늘리는(가획) 방식, 자음 + 모음 결합으로 음절을 만드는 모듈식 구조가 매우 합리적이라 평가받아요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <HangulSystemExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
