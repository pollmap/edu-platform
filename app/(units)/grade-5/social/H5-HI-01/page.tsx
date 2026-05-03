import { notFound } from 'next/navigation';
import { KoreanHistoryTimeline } from '@/components/interactive/social/KoreanHistoryTimeline';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'H5-HI-01';

export function generateMetadata() {
  const unit = findUnit(UNIT_ID);
  return unit ? makeUnitMetadata(unit) : {};
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
          {
            label: `${GRADE_LABEL[unit.grade]} / ${SUBJECT_LABEL[unit.subject]}`,
            href: `/grade-${unit.grade}/${unit.subject}`,
          },
          { label: unit.title },
        ]}
      />

      <SectionCard title="한마디로">
        <p>
          한국의 역사는 약 <strong>70만 년 전 구석기 시대</strong>부터 시작해요. 이 단원은
          가장 오래된 시기부터 <strong>고려가 멸망(1392)</strong>하기 전까지를 큰 흐름으로 살펴봐요.
        </p>
      </SectionCard>

      <SectionCard title="왜 시대를 나눌까?">
        <p>
          역사학자들은 <strong>사람들이 사용한 도구</strong>, <strong>경제 방식</strong>,
          <strong>국가의 모습</strong>을 기준으로 시대를 나눠요. 도구가 바뀌면 살아가는 방식이
          바뀌고, 그게 사회 전체를 바꾸기 때문이에요.
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>구석기·신석기·청동기·철기</strong> — 도구 기준
          </li>
          <li>
            <strong>고조선·삼국·남북국·고려</strong> — 국가 기준
          </li>
        </ul>
      </SectionCard>

      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <KoreanHistoryTimeline />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard title="흐름으로 기억하기">
        <p>
          <strong>도구 변화 → 농경 정착 → 계급 발생 → 국가 출현 → 국가 간 경쟁 → 통합</strong>{' '}
          이 큰 흐름이에요. 70만 년의 긴 시간을 모두 외울 필요는 없어요. 흐름이 왜 그렇게
          이어지는지 이해하는 게 중요해요.
        </p>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
