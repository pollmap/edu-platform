import { notFound } from 'next/navigation';
import { ConditionalConverter } from '@/components/interactive/english/ConditionalConverter';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'E-GR-09';

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
          가정법은 ‘<strong>현실에서 거리를 두는</strong>’ 표현이에요. 영어는{' '}
          <em>거리가 멀수록 시제를 한 칸 더 과거로 옮기는</em> 방식으로 가정의 강도를 나타냅니다.
          그래서 ‘만약 ~이면’ 한 문장이 <strong>4가지 형태</strong>로 갈라져요 — 사실 / 가능성 /
          상상 / 후회.
        </p>
      </SectionCard>
      <SectionCard title="핵심 규칙">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>0형</strong>: <code>If + 현재, 현재</code> → 일반 사실, 항상 일어나는 일.
          </li>
          <li>
            <strong>1형</strong>: <code>If + 현재, will + 동사 원형</code> → 미래에 가능한 일.
          </li>
          <li>
            <strong>2형</strong>: <code>If + 과거, would + 동사 원형</code> → 현재 사실의 반대.
          </li>
          <li>
            <strong>3형</strong>: <code>If + had + p.p., would have + p.p.</code> → 과거에 일어나지
            않은 일에 대한 후회.
          </li>
          <li>
            가정법 2형에서는 주어가 I/he/she여도 <code>were</code>를 쓰는 게 표준 (격식체):{' '}
            <em>If I were rich ...</em>
          </li>
        </ul>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <code>If I will have time, I will help.</code> ✗ — if 절에는 will을 안 써요. →{' '}
            <code>If I have time, I will help.</code>
          </li>
          <li>
            현재의 반대를 과거형으로 쓴다고 진짜 과거가 되는 건 아님. <em>If I had a car</em>는 ‘지금
            차가 없다’는 뜻이지 ‘과거에 차가 있었다’가 아니에요.
          </li>
          <li>
            3형에서 <code>would have p.p.</code>를 <code>would p.p.</code>로 줄이면 의미가 무너져요.
          </li>
        </ul>
      </SectionCard>
      <SectionCard title="실생활 속 영어">
        <p>
          노래나 영화 대사에서 자주 등장하는 ‘<em>If I were a bird ...</em>’는 가정법 2형 — 현실에서는
          새가 아니라는 뜻을 전제로 해요. 면접에서 ‘<em>If I had studied harder, I would have
          passed</em>’처럼 후회를 말할 때는 가정법 3형. 시제가 곧 화자의 마음과의 거리예요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <ConditionalConverter />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
