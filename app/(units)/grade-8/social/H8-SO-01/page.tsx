import { notFound } from 'next/navigation';
import { KoreanModernHistoryTimeline } from '@/components/interactive/social/KoreanModernHistoryTimeline';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'H8-SO-01';

export function generateMetadata() {
  const unit = findUnit(UNIT_ID);
  return unit ? makeUnitMetadata(unit) : {};
}

export default function Page() {
  const unit = findUnit(UNIT_ID);
  if (!unit || unit.schoolLevel === 'highschool' || unit.grade === undefined) notFound();

  return (
    <main className="container mx-auto max-w-5xl px-4 py-8">
      <UnitHeader
        unit={unit}
        breadcrumb={[
          { label: '홈', href: '/' },
          { label: `${GRADE_LABEL[unit.grade]} / ${SUBJECT_LABEL[unit.subject]}`, href: `/grade-${unit.grade}/${unit.subject}` },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          <strong>인권</strong>은 사람이라면 누구나 태어날 때부터 가지는 권리예요. 이 권리를 나라가 지켜 주도록 약속한 최고의 법이 <strong>헌법</strong>이에요.
        </p>
      </SectionCard>
      <SectionCard title="기본권 5가지">
        <p>
          한국 헌법은 다섯 가지 기본권을 보장해요. ① <strong>자유권</strong>: 신체·표현·종교·재산의 자유.
          ② <strong>평등권</strong>: 성별·종교·신분 차별 없이 같은 대우.
          ③ <strong>참정권</strong>: 선거·공무 담임권.
          ④ <strong>청구권</strong>: 권리 침해 시 국가에 도움 청할 수 있는 권리.
          ⑤ <strong>사회권</strong>: 인간답게 살 권리 — 교육·노동·복지.
          평소 당연하게 느끼는 학교 가기·발언하기·이사 가기 모두 헌법이 보장한 권리예요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "헌법은 어른만의 일" — 학생도 헌법의 보호를 받아요. 학교 규칙도 헌법에 어긋나면 무효.
          ❌ "권리는 절대적" — 내 권리도 다른 사람의 권리를 침해할 땐 제한될 수 있어요(헌법 제37조 제2항).
          ❌ "헌법은 안 바뀐다" — 한국 헌법은 9차례 개정됐어요. 1987년 6월 항쟁으로 만든 현 헌법이 가장 오래된 형태.
        </p>
      </SectionCard>
      <SectionCard title="인권의 역사">
        <p>
          인권은 처음부터 있던 게 아니라 사람들이 싸워서 얻어낸 것이에요. 미국 독립선언(1776)·프랑스 인권선언(1789)·UN 세계인권선언(1948)이 큰 이정표.
          한국에서는 4·19 혁명(1960), 5·18 광주 민주화 운동(1980), 6월 항쟁(1987)을 거치며 민주주의와 인권이 자리 잡았어요.
          여전히 차별·소수자 인권·디지털 시대 새로운 인권 문제가 진행 중이에요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <KoreanModernHistoryTimeline />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
