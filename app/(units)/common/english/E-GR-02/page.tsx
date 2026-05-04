import { notFound } from 'next/navigation';
import { PronounCaseMatrix } from '@/components/interactive/english/PronounCaseMatrix';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'E-GR-02';

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
          영어 인칭대명사는 자리(주어·목적어·소유)에 따라 모양이 바뀌어요.
          I / me / my / mine — 같은 사람인데 자리에 따라 4가지 모양.
        </p>
      </SectionCard>
      <SectionCard title="격(case) — 같은 사람, 다른 모양">
        <p>
          ① <strong>주격</strong>(주어 자리): I / you / he / she / it / we / they.
          ② <strong>목적격</strong>(동사·전치사 뒤): me / you / him / her / it / us / them.
          ③ <strong>소유격 한정사</strong>(명사 앞): my / your / his / her / its / our / their.
          ④ <strong>소유 대명사</strong>(혼자 씀): mine / yours / his / hers / / ours / theirs.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "Me and my friend went..." — 주어 자리는 주격. "My friend and I went..." 가 표준.
          ❌ "Its / It's 혼동" — its = 소유 ("the cat licks its paw"), it&apos;s = it is.
          ❌ "Their / There / They&apos;re" — 발음은 같지만 의미·역할 다 달라요. 시험 단골 함정.
        </p>
      </SectionCard>
      <SectionCard title="실생활 속 대명사">
        <p>
          영어 글에서 같은 명사를 반복하면 어색해요. 두 번째부터는 대명사로 받아요.
          "Tom called Jane. He said hi." — Tom 을 He 로 받음.
          격을 틀리면 어법 점수가 빠르게 깎이니, 매트릭스로 한눈에 외워 두세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <PronounCaseMatrix />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
