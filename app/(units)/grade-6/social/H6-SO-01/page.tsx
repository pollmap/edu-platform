import { notFound } from 'next/navigation';
import { SeparationOfPowersExplorer } from '@/components/interactive/social/SeparationOfPowersExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'H6-SO-01';

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
          우리나라는 <strong>민주공화국</strong>이에요. 나라의 주인은 국민이고, 나라 일은 국민이 정한
          <strong> 헌법</strong>을 따라 움직여요. 그리고 큰 권한을 한 곳에 몰아두지 않으려고
          <strong> 입법·행정·사법</strong> 셋으로 나눠요(삼권분립).
        </p>
      </SectionCard>

      <SectionCard title="큰 흐름 / 왜 셋으로 나눴어">
        <p>
          한 사람이나 한 기관이 「법도 만들고, 집행도 하고, 재판까지」 한다면 잘못이 생겨도 막을 사람이
          없어요. 옛날 경험에서 사람들은 그게 위험하다는 걸 배웠어요. 그래서 권한을 나누고 서로
          감시(견제)하게 했습니다.
        </p>
        <p>
          <strong>입법부 = 국회</strong>는 국민이 뽑은 국회의원이 모여 법을 만들고 예산을 결정해요.
          <strong> 행정부 = 정부(대통령·국무총리·각 부)</strong>는 만들어진 법을 집행해요. 교육·외교·국방·복지
          같은 일을 분야별로 나눠 처리합니다. <strong>사법부 = 법원</strong>은 법에 따라 옳고 그름을
          가려요. 법원은 외부 압력 없이 양심에 따라 재판한다는 원칙이 있어요.
        </p>
        <p>
          이 셋은 서로 영향을 주고받아요. 예를 들어 행정부의 예산 계획은 국회의 동의를 받아야 하고,
          법원은 만들어진 법이 헌법에 맞는지 검토할 수 있어요(헌법재판소). 이 균형이 무너지면 민주주의가
          흔들립니다.
        </p>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <ul className="list-disc list-inside space-y-1.5 text-sm">
          <li>
            <strong>오개념 1.</strong> 「대통령이 가장 힘이 세니 모든 일을 할 수 있다」. → 대통령은
            행정부 우두머리예요. 법을 새로 만들거나 재판을 직접 할 수는 없어요.
          </li>
          <li>
            <strong>오개념 2.</strong> 「국회의원은 법만 만든다」. → 법 제정뿐 아니라 예산 심사·국정감사도
            국회의 큰 일이에요.
          </li>
          <li>
            <strong>오개념 3.</strong> 「판결은 다수결로 정한다」. → 법원의 재판은 법과 증거를 보고
            판단해요. 사람들의 기분이나 다수결로 정하는 게 아니에요.
          </li>
        </ul>
      </SectionCard>

      <SectionCard title="실생활 속 정치">
        <p>
          학교 운영위원회·학급회의도 작은 민주주의예요. 의견을 모으고, 결정하고, 결정을 따르는 과정이
          국회·정부의 일과 닮았어요.
        </p>
        <p>
          내가 받는 건강보험·교육 지원·재난 지원금은 모두 국회의 법과 정부의 집행이 만나서 만들어져요.
          그래서 「선거에 누가 뽑히는가」가 곧 「내일 내 학교·내 동네가 어떤 모습이 될까」와
          연결됩니다.
        </p>
      </SectionCard>

      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <SeparationOfPowersExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
