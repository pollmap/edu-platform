import { notFound } from 'next/navigation';
import { CircuitBuilder } from '@/components/interactive/science/CircuitBuilder';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'S8-ME-01';

export function generateMetadata() {
  const unit = findUnit(UNIT_ID);
  if (!unit) return {};
  return makeUnitMetadata(unit);
}

export default function Page() {
  const unit = findUnit(UNIT_ID);
  if (!unit || unit.schoolLevel === 'highschool' || unit.grade === undefined) {
    notFound();
  }

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
          전류는 「전자의 흐름」이에요. 전압은 전자를 밀어주는 「압력」, 저항은 흐름을 방해하는 「장애물」.
          이 셋의 관계가 옴의 법칙: V = I × R.
        </p>
      </SectionCard>

      <SectionCard title="옴의 법칙 (Ohm, 1827)">
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>전압 V</strong> (단위: 볼트 V): 전기 에너지의 「밀어내는 힘」</li>
          <li><strong>전류 I</strong> (단위: 암페어 A): 「얼마나 많은 전자가 지나가는가」</li>
          <li><strong>저항 R</strong> (단위: 옴 Ω): 흐름을 방해. 굵은 전선·짧은 전선·차가운 전선이 저항 작음</li>
        </ul>
      </SectionCard>

      <SectionCard title="회로 만들기 (직렬·병렬)">
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <CircuitBuilder />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard title="전기와 자기는 한 몸">
        <p>
          1820년 외르스테드가 발견 — 「전류가 흐르면 자기장이 생긴다」. 반대로 패러데이는 「자석을 움직이면 전류가
          유도된다」(전자기 유도)고 발견했어요. 이 둘의 결합이 「발전기」와 「전동기」의 원리예요. 우리집 콘센트의
          전기, 자전거 라이트, 모터 모두 이 원리.
        </p>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
