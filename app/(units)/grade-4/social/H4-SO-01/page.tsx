import { notFound } from 'next/navigation';
import { MultiPerspectiveAnalyzer } from '@/components/interactive/social/MultiPerspectiveAnalyzer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'H4-SO-01';

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
          내가 사는 지역에는 <strong>여러 사람·여러 입장</strong>이 함께 살아요. 쓰레기 처리장 자리,
          버스 노선 변경, 공원 만들기 같은 문제는 누구 한 사람의 결정으로 풀리지 않아요.
          <strong>주민이 함께 모여 의견을 나누고 결정하는 과정</strong>이 곧 지역 자치예요.
        </p>
      </SectionCard>
      <SectionCard title="지역 문제 해결 4단계">
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li><strong>① 문제 발견</strong> — 무엇이 불편한지 관찰</li>
          <li><strong>② 의견 모으기</strong> — 주민회의·서명·민원·시민 단체</li>
          <li><strong>③ 함께 결정</strong> — 다수 의견 + 소수 의견 조정 (다수결만이 답은 아님)</li>
          <li><strong>④ 실행과 점검</strong> — 결과를 보며 부족하면 다시 수정</li>
        </ul>
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
          어린이도 어른과 똑같이 의견을 낼 수 있어요. 학교 회의·반장 선거·민원도 이 4단계를 따라가요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <MultiPerspectiveAnalyzer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
