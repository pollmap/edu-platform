import { notFound } from 'next/navigation';
import { BeAndDoVerbExplorer } from '@/components/interactive/english/BeAndDoVerbExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'E-GR-03';

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
          영어의 동사는 두 종류뿐이에요. <strong>be동사</strong>(am/is/are)는{' '}
          <em>‘이다·있다’</em>처럼 <strong>상태와 정체성</strong>을 말하고,{' '}
          <strong>일반동사</strong>(eat, run, study ...)는 <strong>동작</strong>을 말해요. 한 문장에
          기본적으로 둘 중 하나만 옵니다.
        </p>
      </SectionCard>
      <SectionCard title="핵심 규칙">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>be동사</strong>는 주어에 따라 모양이 바뀜: I → am, you/we/they → are, he/she/it
            → is.
          </li>
          <li>
            <strong>일반동사</strong>는 주어가 <em>3인칭 단수(he/she/it)</em>일 때만 -s/-es가 붙어요.
          </li>
          <li>
            과거형: be → was/were, 일반동사 → -ed (불규칙은 따로 외우기, 예: go-went, eat-ate).
          </li>
          <li>
            한 문장에 두 동사가 같이 오는 경우는 보통 <code>be + 분사</code> 구조 (진행: am playing,
            수동: is broken).
          </li>
        </ul>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <code>She is play soccer.</code> ✗ — be와 일반동사를 동시에 쓰면 어색해요. 의미에 맞게
            하나만: <code>She plays soccer.</code> 또는 <code>She is playing soccer.</code>
          </li>
          <li>
            3인칭 단수 -s 빠뜨리기 — <code>He go to school.</code> ✗ → <code>He goes to school.</code>
          </li>
          <li>
            be동사의 부정문은 <em>be + not</em>(is not), 일반동사는 <em>do/does + not</em>(does not
            go)로 구조가 달라요.
          </li>
        </ul>
      </SectionCard>
      <SectionCard title="실생활 속 영어">
        <p>
          자기소개에서 ‘<strong>I am Chanhi</strong>’는 정체성을 말하니까 be동사. ‘
          <strong>I study English</strong>’는 동작이니까 일반동사. 한 사람을 소개할 때 한 문장 안에서
          두 가지를 자연스럽게 섞어 쓰는 거예요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <BeAndDoVerbExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
