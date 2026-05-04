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

const UNIT_ID = 'H7-SO-03';

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
          <strong>정치</strong>는 사회 전체에 적용되는 결정을 만드는 일이에요. 그 결정 권한이
          국민에게서 나오고, 한 사람이나 한 기관에 몰리지 않도록 <strong>법·집행·재판</strong>으로 나누는 것이
          <strong> 민주주의의 기본 설계</strong>예요.
        </p>
      </SectionCard>
      <SectionCard title="권력은 왜 나누어야 할까">
        <p>
          권력이 한 곳에 몰리면 잘못된 결정을 막을 사람이 없어요. 그래서 근대 민주국가는
          <strong> 입법(법 제정) · 행정(법 집행) · 사법(법 적용·판결)</strong>으로 권한을 분리해
          서로 견제하고 균형을 맞추도록 설계해요. 이걸 <strong>삼권분립</strong>이라고 해요.
        </p>
        <p>
          민주주의는 단순한 다수결이 아니에요. 다수결로도 침해할 수 없는 <strong>기본권(자유·평등·인간 존엄)</strong>이 있고,
          그것을 헌법과 사법부가 지켜요. 그래서 "다수가 옳다고 해도 헌법에 어긋나면 무효"라는 판단이 가능해요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오해">
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-zinc-700 dark:text-zinc-300">
          <li>
            <strong>"민주주의 = 선거"</strong> — 선거는 핵심이지만 전부는 아니에요.
            언론·집회·표현의 자유, 법치, 사법부 독립이 함께 있어야 민주주의가 굴러가요.
          </li>
          <li>
            <strong>"대통령제와 의원내각제는 좋고 나쁨의 차이"</strong> — 아니에요. 둘 다 민주주의 정부 형태이고,
            나라 역사·문화에 따라 어떤 형태가 더 잘 맞는지가 다를 뿐이에요.
          </li>
          <li>
            <strong>"법원이 정치를 한다"</strong> — 법원은 정책을 만드는 곳이 아니라 <strong>법 적용·해석</strong>을 하는 곳이에요.
            정치적 판단을 직접 내리지 않고, 분쟁이 들어왔을 때 헌법·법률 기준으로 판단해요.
          </li>
        </ul>
      </SectionCard>
      <SectionCard title="실생활 연결">
        <p className="text-sm text-zinc-700 dark:text-zinc-300">
          학생회 임원 선거는 작은 의회 민주주의 실습이에요. 회칙(법) 만들기 → 회장단(집행) → 갈등 조정(사법 비슷)으로
          역할이 나뉘어 있을 때, 학생회가 더 안정적으로 굴러가요. 가족 회의에서 서로의 의견을 듣고 규칙을 정하는 것도
          민주주의의 가장 작은 단위라 할 수 있어요.
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
