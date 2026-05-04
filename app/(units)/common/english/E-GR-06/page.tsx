import { notFound } from 'next/navigation';
import { VerbalFormSimulator } from '@/components/interactive/english/VerbalFormSimulator';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'E-GR-06';

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
          한 동사가 옷을 갈아입어 다른 역할을 해요. <strong>to부정사</strong>(to + 동사),{' '}
          <strong>동명사</strong>(동사 + ing), <strong>분사</strong>(현재분사 -ing / 과거분사 -ed)는
          모두 동사에서 출발했지만 문장에서는 <em>명사·형용사·부사</em> 자리를 채웁니다. 이름을 따서{' '}
          <strong>준동사</strong>라고 불러요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 규칙">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>to부정사</strong>: ‘아직 일어나지 않은 일·목적·계획’ 느낌. <code>I want to go</code>.
          </li>
          <li>
            <strong>동명사</strong>: ‘이미 하는 일·일반적 사실’ 느낌. <code>I enjoy reading</code>.
          </li>
          <li>
            <strong>현재분사 -ing</strong>: be + ing = 진행 / 명사 앞에서 ‘하고 있는’으로 수식.
          </li>
          <li>
            <strong>과거분사 p.p.</strong>: have + p.p. = 완료 / be + p.p. = 수동 / 명사 앞에서
            ‘된·당한’으로 수식.
          </li>
          <li>같은 -ing라도 자리(주어/be뒤/명사 앞)에 따라 정체가 달라져요.</li>
        </ul>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            동사를 좋아한다는 표현 — <code>I like swim.</code> ✗ → <code>I like to swim.</code> 또는{' '}
            <code>I like swimming.</code>
          </li>
          <li>
            <em>enjoy / finish / mind</em> 같은 동사는 뒤에 동명사만 옴. <code>enjoy to read</code> ✗
            → <code>enjoy reading</code>.
          </li>
          <li>
            ‘끓고 있는 물 / 끓인 물’ 구분: <code>boiling water</code>(현재분사, 끓는 중) vs{' '}
            <code>boiled water</code>(과거분사, 이미 끓인 것).
          </li>
        </ul>
      </SectionCard>
      <SectionCard title="실생활 속 영어">
        <p>
          영화 제목 ‘<em>The Walking Dead</em>’의 walking은 ‘걷고 있는’ 현재분사. 표지판{' '}
          <em>‘No Smoking’</em>은 ‘담배 피우는 행위’를 가리키는 동명사. 같은 -ing가 자리에 따라
          전혀 다른 의미를 만들어내는 거예요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <VerbalFormSimulator />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
