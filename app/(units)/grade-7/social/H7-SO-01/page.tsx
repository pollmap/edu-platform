import { notFound } from 'next/navigation';
import { SocializationStagesExplorer } from '@/components/interactive/social/SocializationStagesExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'H7-SO-01';

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
          사람은 태어나면서부터 「사람」이지만, <strong>그 사회의 사람</strong>이 되는 과정은 따로
          있어요. 말·예절·역할·규범을 배우는 이 과정을 <strong>사회화</strong>라고 해요. 평생 이어집니다.
        </p>
      </SectionCard>

      <SectionCard title="큰 흐름 / 왜 사회화가 평생 이어져">
        <p>
          <strong>1차 사회화</strong>는 어릴 때 가족 안에서 일어나요. 말 배우기, 인사, 식습관, 기본 예절
          등 가장 깊이 박히는 행동들이 여기서 형성돼요.
        </p>
        <p>
          <strong>2차 사회화</strong>는 학교·또래·미디어를 통해 일어나요. 더 다양한 사람을 만나고, 더
          복잡한 규범(시간 지키기, 협동, 경쟁, 발표 같은 것)을 익혀요. 미디어(TV·인터넷)는 보지 않은 곳의
          가치관까지 빠르게 전달해 주기 때문에 영향력이 매우 커요.
        </p>
        <p>
          <strong>재사회화</strong>는 성인이 된 뒤에도 이어져요. 새 직장에 들어가면 그 회사의 일하는
          방식을, 다른 나라로 이주하면 그 나라의 언어·문화를 다시 배워야 하니까요. 「한 번 다 배우면
          끝」이 아니라, 환경이 바뀌면 새 규범을 다시 배우는 게 사회화예요.
        </p>
        <p>
          사회화의 결과로 사람은 <strong>지위(위치)</strong>를 갖게 되고, 그 지위에 맞는
          <strong> 역할</strong>을 수행해요. 같은 사람이 학생·딸·언니·동아리 부장 등 여러 지위를 동시에
          가지기도 해요.
        </p>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <ul className="list-disc list-inside space-y-1.5 text-sm">
          <li>
            <strong>오개념 1.</strong> 「사회화는 어릴 때만 일어난다」. → 평생이에요. 새 환경에서는 늘
            새 규범을 배워야 해요.
          </li>
          <li>
            <strong>오개념 2.</strong> 「사회화는 무조건 좋은 것만 배우는 일」. → 사회의 편견이나 차별까지
            함께 학습될 수 있어요. 그래서 어떤 사회화 환경에 있는지가 중요해요.
          </li>
          <li>
            <strong>오개념 3.</strong> 「또래집단은 영향이 작다」. → 청소년기에는 또래의 영향이 가족만큼
            크거나 더 클 수 있어요. 친구 선택이 행동·가치관에 큰 차이를 만들어요.
          </li>
        </ul>
      </SectionCard>

      <SectionCard title="실생활 속 사회화">
        <p>
          학급의 「발표할 때는 손 들고」, 「복도에서는 뛰지 않기」 같은 규칙도 학교 사회화의 일부예요.
          체육 시간 팀 경기에서 협동·경쟁을 동시에 익히고요.
        </p>
        <p>
          SNS·유튜브를 통해 다른 나라 또래의 말투·옷 입는 법까지 빠르게 전해져요. 미디어 사회화의 힘이
          커진 셈인데, 모두가 좋은 정보만 주는 건 아니어서 「무엇을, 얼마나」 보는지 스스로 판단하는
          연습이 점점 더 중요해졌어요.
        </p>
      </SectionCard>

      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <SocializationStagesExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
