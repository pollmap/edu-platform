import { notFound } from 'next/navigation';
import { PopulationPyramidExplorer } from '@/components/interactive/social/PopulationPyramidExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'H8-GE-01';

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
          {
            label: `${GRADE_LABEL[unit.grade]} / ${SUBJECT_LABEL[unit.subject]}`,
            href: `/grade-${unit.grade}/${unit.subject}`,
          },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />

      <SectionCard title="한마디로">
        <p>
          한 사회가 어떤 「나이 그림」을 가지고 있는지를 보여 주는 게 <strong>인구 피라미드</strong>예요.
          모양이 피라미드형 → 종형 → 항아리형으로 변하면, 사회가 안고 있는 문제도 함께 변해요.
        </p>
      </SectionCard>

      <SectionCard title="큰 흐름 / 왜 모양이 변할까">
        <p>
          <strong>출생률</strong>(태어나는 비율)과 <strong>사망률</strong>(돌아가시는 비율), 그리고
          <strong> 의학·생활 수준</strong>이 인구 모양을 결정해요. 옛날에는 출생률·사망률이 모두 높아서
          어린이는 많고 노인은 적은 「피라미드형」이었어요.
        </p>
        <p>
          나라가 발전하면 의학이 좋아져 사망률이 먼저 떨어져요. 그러면 인구가 크게 늘고, 다음으로
          출생률도 천천히 떨어지면서 모양이 「종형(벨형)」으로 바뀌어요. 이 시기는 일할 사람이 가장
          많은, 사회가 가장 활기찬 시기예요.
        </p>
        <p>
          시간이 더 지나면 저출생이 굳어지고 평균수명이 늘면서 「항아리형」이 돼요. 아래(어린이)는
          좁고, 가운데~위(중장년·노인)가 넓어요. 한국은 종형을 지나 빠르게 항아리형으로 가고 있어요.
          이를 <strong>저출생·고령화</strong>라고 불러요.
        </p>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <ul className="list-disc list-inside space-y-1.5 text-sm">
          <li>
            <strong>오개념 1.</strong> 「인구가 줄면 무조건 좋다(집·일자리 여유 생김)」. → 단기적으론
            일부 그렇지만, 일할 세대가 줄면 세금·연금·돌봄 부담이 커지고 학교·기업도 줄어요.
          </li>
          <li>
            <strong>오개념 2.</strong> 「고령화는 노인이 너무 오래 살아서 생기는 문제」. → 더 정확히는
            태어나는 아이가 적어 균형이 무너진 거예요. 평균수명이 늘어나는 건 좋은 일이에요.
          </li>
          <li>
            <strong>오개념 3.</strong> 「피라미드형이 가장 좋은 모양」. → 보기엔 안정적이지만 사망률·
            영아사망률이 높다는 뜻이기도 해요. 모양 자체에 「좋다·나쁘다」가 정해져 있지 않아요.
          </li>
        </ul>
      </SectionCard>

      <SectionCard title="실생활 속 인구 변화">
        <p>
          학교 학급 수가 줄어든다거나, 동네 소아과는 줄고 요양병원이 많이 생기는 모습이 모두 인구 피라미드
          변화의 결과예요. 군대 병력 규모, 기업의 신입사원 채용 규모도 영향을 받아요.
        </p>
        <p>
          정부는 출산·돌봄 지원, 정년 연장, 외국 인력 정책 같은 여러 방법으로 변화에 맞춰요. 어떤 정책이
          좋은지는 사람마다 의견이 달라요. 그래서 「데이터를 보고, 논의하고, 약속을 정하는」 시민의
          역할이 중요합니다.
        </p>
      </SectionCard>

      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <PopulationPyramidExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
