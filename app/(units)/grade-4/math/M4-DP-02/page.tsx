import { notFound } from 'next/navigation';
import { LineGraphBuilder } from '@/components/interactive/math/LineGraphBuilder';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'M4-DP-02';

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
          꺾은선그래프는 <strong>시간이 흐르며 어떻게 변하는지</strong>를 점으로 찍고 선으로 이은 그래프예요.
          기온 변화, 키 변화, 가게 손님 수처럼 <strong>이어지는 변화</strong>를 한눈에 보여줘요.
        </p>
      </SectionCard>
      <SectionCard title="왜 막대그래프 대신 선으로 이을까">
        <p>
          막대그래프는 항목별 양을 비교할 때 좋아요. 하지만 시간 순서대로 변하는 값(예: 월·화·수 기온)은
          <strong>점을 이은 선</strong>으로 그려야 오르고 내리는 흐름이 잘 보여요. 선이 가파르면 빠르게 변한 것, 평평하면 거의 그대로인 것이에요.
        </p>
      </SectionCard>
      <SectionCard title="자주 헷갈리는 점">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>가로축 = 시간</strong>(또는 순서), <strong>세로축 = 측정값</strong>이라는 약속을 자주 까먹어요.</li>
          <li>점을 이을 때 자를 대고 똑바로 이어야 해요. 곡선처럼 휘면 안 돼요.</li>
          <li>0부터 시작 안 하고 중간 값(예: 20)부터 그리면 변화가 <strong>실제보다 커 보이게</strong> 속일 수 있어요. 뉴스 그래프를 볼 때 조심!</li>
        </ul>
      </SectionCard>
      <SectionCard title="실생활 속 꺾은선그래프">
        <p>
          일기예보의 일주일 기온, 코로나 확진자 수, 주식 가격, 내 키 성장 기록, 한 달 용돈 사용량까지 모두 꺾은선그래프로 보여줘요.
          시간에 따라 어떻게 바뀌는지 <strong>흐름</strong>을 보고 싶을 때 가장 잘 맞는 그래프예요.
        </p>
      </SectionCard>
      <SectionCard title="값을 바꾸며 그려 보기">
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <LineGraphBuilder />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
