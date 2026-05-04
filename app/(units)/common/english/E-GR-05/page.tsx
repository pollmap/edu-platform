import { notFound } from 'next/navigation';
import { ModalVerbMatrix } from '@/components/interactive/english/ModalVerbMatrix';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'E-GR-05';

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
          조동사(<em>can, will, must, should ...</em>)는 동사 앞에 붙어서{' '}
          <strong>화자의 태도</strong>를 더해주는 단어예요. 같은 ‘간다’도 조동사에 따라{' '}
          <em>갈 수 있다(can) / 갈 것이다(will) / 가야만 한다(must) / 가는 게 좋다(should)</em>로
          바뀝니다.
        </p>
      </SectionCard>
      <SectionCard title="핵심 규칙">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            조동사 뒤에는 <strong>항상 동사 원형</strong>. 3인칭 단수여도 -s 안 붙어요.
          </li>
          <li>
            한 문장에 조동사는 보통 <strong>하나만</strong>. <code>will can</code> ✗ →{' '}
            <code>will be able to</code> ○.
          </li>
          <li>
            의미는 <em>능력 / 허락 / 가능성 / 의무 / 충고 / 미래</em> 6가지 축에서 골고루 분포해요.
          </li>
          <li>부정형은 조동사 뒤에 not (cannot, will not / won&apos;t).</li>
        </ul>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <code>She cans swim.</code> ✗ → <code>She can swim.</code> 조동사는 변하지 않아요.
          </li>
          <li>
            must와 should의 강도 차이: must는 ‘반드시 / 법’, should는 ‘하는 게 좋다 / 충고’.
          </li>
          <li>
            <code>may</code>는 격식 있는 허락, <code>can</code>은 일상적인 허락. 글의 분위기에 맞춰
            골라야 해요.
          </li>
        </ul>
      </SectionCard>
      <SectionCard title="실생활 속 영어">
        <p>
          비행기 탑승 안내 ‘<em>You must fasten your seatbelt</em>’는 의무. 의사 처방의 ‘
          <em>You should rest</em>’는 충고. 일기예보의 ‘<em>It might rain</em>’은 약한 가능성. 같은
          상황을 어느 조동사로 묘사하느냐가 곧 화자의 태도입니다.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <ModalVerbMatrix />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
