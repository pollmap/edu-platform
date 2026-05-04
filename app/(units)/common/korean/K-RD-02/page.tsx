import { notFound } from 'next/navigation';
import { FactOpinionSorter } from '@/components/interactive/korean/FactOpinionSorter';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'K-RD-02';

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
          <strong>사실</strong>은 누구나 확인할 수 있는 객관 정보, <strong>의견</strong>은 사람마다 다를 수 있는 생각이에요.
          글을 비판적으로 읽으려면 둘을 구별할 수 있어야 해요.
        </p>
      </SectionCard>
      <SectionCard title="구별하는 신호어">
        <p>
          의견에는 <strong>"좋다·나쁘다·아름답다·최고·~해야 한다·~인 것 같다"</strong> 같은 평가·추측 표현이 자주 들어가요.
          사실은 <strong>"~이다·~했다·년·월·수치"</strong>처럼 검증 가능한 정보로 표현돼요.
          뉴스·광고·SNS를 읽을 때 이걸 구별 못 하면 누군가의 의견을 사실로 믿게 돼요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <FactOpinionSorter />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
