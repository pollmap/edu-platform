import { notFound } from 'next/navigation';
import { RelativeClauseConnector } from '@/components/interactive/english/RelativeClauseConnector';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'E-GR-08';

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
          관계사는 <strong>접속사 + 대명사</strong>를 한 단어로 합친 만능 도구예요. 두 문장에서{' '}
          <em>같은 명사</em>가 반복될 때, 두 번째 문장의 그 자리를 비우고 앞에 관계사{' '}
          <code>who / which / that / when / where</code>를 끼워 넣으면 한 문장으로 깔끔하게 합쳐집니다.
        </p>
      </SectionCard>
      <SectionCard title="핵심 규칙">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>who</strong> = 사람 + 주어/목적어, <strong>which</strong> = 사물 + 주어/목적어,{' '}
            <strong>that</strong> = 사람·사물 모두 (가장 두루 쓰임).
          </li>
          <li>
            <strong>when</strong> = 시간 (the day when ...), <strong>where</strong> = 장소 (the city
            where ...).
          </li>
          <li>관계사가 목적격이면 종종 생략 가능: ‘the book (that) I bought’.</li>
          <li>
            관계사절은 <strong>형용사 역할</strong> — 앞에 있는 명사를 꾸며줘요. 한국어로는 ‘~하는,
            ~한’으로 자연스럽게 옮겨집니다.
          </li>
        </ul>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <code>This is the book that I bought it.</code> ✗ — that이 이미 그 자리이므로 it은 빼야
            해요. → <code>This is the book that I bought.</code>
          </li>
          <li>
            장소·시간을 단순히 ‘in/on’ 빼고 옮기면 어색해요. <code>the city where I live</code>는
            맞지만 <code>the city which I live</code>는 어색 (전치사 in이 빠짐).
          </li>
          <li>
            <em>which</em>는 사물에만, 사람에는 <em>who/that</em>. <code>the boy which</code> ✗.
          </li>
        </ul>
      </SectionCard>
      <SectionCard title="실생활 속 영어">
        <p>
          넷플릭스 추천 ‘<em>This is the show that everyone is talking about</em>’ — 사물(쇼) +
          목적어 → that. 카페 후기 ‘<em>It’s a place where you can study</em>’ — 장소 → where.
          관계사를 알면 두 문장을 하나로 줄여 자연스럽게 묘사할 수 있어요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <RelativeClauseConnector />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
