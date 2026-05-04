import { notFound } from 'next/navigation';
import { PassiveVoiceConverter } from '@/components/interactive/english/PassiveVoiceConverter';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'E-GR-07';

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
          수동태는 <strong>‘받는 쪽’이 주어가 되는 문장</strong>이에요. 능동태에서{' '}
          <em>주어가 한 일</em>을 강조했다면, 수동태에서는{' '}
          <em>그 일을 당한 쪽 / 결과물</em>을 강조해요. 형태는 <code>be + 과거분사</code>로 통일되어
          있고, 행위자는 <code>by</code>로 따로 붙입니다.
        </p>
      </SectionCard>
      <SectionCard title="핵심 규칙">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            변환 3단계: <strong>① 능동의 목적어 → 수동의 주어</strong>,{' '}
            <strong>② 동사 → be + 과거분사</strong>, <strong>③ 능동의 주어 → by + 행위자</strong>.
          </li>
          <li>
            be의 시제가 그대로 시제를 나타내요. 현재 → is/are, 과거 → was/were, 미래 → will be,
            완료 → has been, 진행 → is being.
          </li>
          <li>
            행위자가 누구인지 모르거나 중요하지 않을 때는 <code>by ...</code>를 생략해요.
          </li>
          <li>
            <strong>자동사</strong>(go, sleep, arrive)는 목적어가 없으니 수동태로 못 만들어요.
          </li>
        </ul>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <code>The window broke by him.</code> ✗ — be + 과거분사가 빠졌어요. →{' '}
            <code>The window was broken by him.</code>
          </li>
          <li>
            be동사 시제 일치 실수: <code>This book is wrote by me.</code> ✗ →{' '}
            <code>This book was written by me.</code>
          </li>
          <li>
            <em>‘He is married to her’</em>처럼 보이는 수동태가 사실 형용사처럼 굳은 표현인 경우도
            있어요.
          </li>
        </ul>
      </SectionCard>
      <SectionCard title="실생활 속 영어">
        <p>
          뉴스에서 ‘<em>The decision was made yesterday</em>’ — 누가 결정했는지보다{' '}
          <em>결정 자체</em>가 중요할 때 수동을 써요. 제품 라벨 ‘<em>Made in Korea</em>’도 ‘누가’가
          아닌 ‘어디서 만들어졌는가’가 핵심이라 수동입니다. 책 표지의 ‘<em>Written by ...</em>’도
          마찬가지예요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <PassiveVoiceConverter />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
