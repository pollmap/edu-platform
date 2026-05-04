import { notFound } from 'next/navigation';
import { ComparativeSlider } from '@/components/interactive/english/ComparativeSlider';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'E-GR-10';

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
          영어의 비교는 3단계 — <strong>원급</strong>(그냥) → <strong>비교급</strong>(더) →{' '}
          <strong>최상급</strong>(가장)으로 단계별로 강해져요. 한국어는 ‘크다 / 더 크다 / 가장 크다’
          처럼 단어가 따로 붙지만, 영어는 형용사 자체에 <code>-er / -est</code>를 붙이거나{' '}
          <code>more / most</code>를 앞에 두는 식으로 변신합니다.
        </p>
      </SectionCard>
      <SectionCard title="핵심 규칙">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>1~2음절 단어</strong>: -er / -est (tall → taller → tallest).
          </li>
          <li>
            <strong>3음절 이상 단어</strong>: more / most (beautiful → more beautiful → most
            beautiful).
          </li>
          <li>
            <strong>철자 변화</strong>: 자음+y → y를 i로 (happy → happier), 단모음+단자음 → 자음
            한 번 더 (big → bigger).
          </li>
          <li>
            <strong>불규칙</strong>: good–better–best, bad–worse–worst, many–more–most.
          </li>
          <li>
            기본 패턴: <code>as A as B</code> (B만큼), <code>A-er than B</code> (B보다 더),{' '}
            <code>the A-est of all</code> (모두 중 가장).
          </li>
        </ul>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <code>more bigger</code>, <code>most biggest</code> ✗ — 이중 비교는 안 돼요. 둘 중 하나만.
          </li>
          <li>
            최상급 앞에는 보통 <strong>the</strong>가 붙어요. <code>She is tallest.</code> ✗ →{' '}
            <code>She is the tallest.</code>
          </li>
          <li>
            <em>than</em> 다음에는 비교 대상이 와야 함. <code>Tom is taller than me</code>는 회화에선
            허용되지만 시험에서는 <code>than I am</code>이 더 정확.
          </li>
        </ul>
      </SectionCard>
      <SectionCard title="실생활 속 영어">
        <p>
          광고에서 ‘<em>The biggest sale of the year</em>’ — 최상급으로 강조. 후기에서 ‘
          <em>cheaper than other shops</em>’ — 비교급으로 한 칸씩 비교. 같은 형용사가 단계만 바꿔도
          말의 무게가 완전히 달라져요. 비교는 영어 표현의 ‘조명 밝기 조절’ 같은 거예요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <ComparativeSlider />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
