import { notFound } from 'next/navigation';
import { BarChartBuilder } from '@/components/interactive/math/BarChartBuilder';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'M7-DP-01';

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
          많은 자료를 그대로 보면 한눈에 안 들어오니까 <strong>구간(계급)</strong>으로 묶고
          <strong> 도수(개수)</strong>를 세서 표·그래프로 표현해요. 이걸{' '}
          <strong>도수분포표 / 히스토그램</strong>이라고 해요.
        </p>
      </SectionCard>
      <SectionCard title="왜 구간으로 묶을까">
        <p>
          1반 학생 30명의 키를 그냥 30개 숫자로 나열하면 패턴이 안 보여요.
          하지만 "150~155cm: 4명, 155~160cm: 9명, ..." 식으로 묶으면 어디에 모여 있는지 한눈에 보여요.
          이렇게 자료의 <strong>분포</strong>(어디에 얼마나 모였는지)를 잡는 것이 통계의 첫 걸음이에요.
        </p>
        <p>
          용어 정리: <strong>계급</strong>(구간), <strong>계급의 크기</strong>(구간 폭),
          <strong> 도수</strong>(그 구간에 들어간 자료 개수), <strong>상대도수</strong>(전체 대비 비율).
          히스토그램은 막대그래프와 비슷해 보이지만, <strong>막대 사이가 붙어 있고 가로축이 연속적인 수</strong>예요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-zinc-700 dark:text-zinc-300">
          <li>
            <strong>"히스토그램 = 막대그래프"</strong> — 다른 그래프예요.
            막대그래프는 <strong>범주(과일·요일 등)</strong>를 비교, 히스토그램은 <strong>연속된 수의 분포</strong>를 보는 거예요. 그래서 막대 사이가 붙어 있어요.
          </li>
          <li>
            <strong>"계급의 크기는 자유"</strong> — 너무 좁으면 들쭉날쭉하고, 너무 넓으면 분포가 뭉개져요. 보통 자료 개수의 √n 정도를 기준으로 잡아요.
          </li>
          <li>
            <strong>"도수가 같으면 분포도 같다"</strong> — 아니에요. 같은 막대 높이라도 어느 계급에 모였는지에 따라 분포의 모양이 완전히 달라져요.
          </li>
        </ul>
      </SectionCard>
      <SectionCard title="실생활 속 도수분포">
        <p className="text-sm text-zinc-700 dark:text-zinc-300">
          모의고사 점수 분포(상·중·하), 일기예보의 강수확률 구간(0~30·30~70·70~100%),
          유튜브 시청 시간(분 단위), 마라톤 완주 시간 분포 — 모두 도수분포로 정리해야 의미가 보여요.
          뉴스에서 "이번 달 평균 기온이 평년보다 높다"라고 할 때도 분포의 평균값과 모양을 함께 봐야 해요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <BarChartBuilder />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
