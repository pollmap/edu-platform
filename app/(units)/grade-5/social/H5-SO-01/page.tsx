import { notFound } from 'next/navigation';
import { HumanRightsCaseExplorer } from '@/components/interactive/social/HumanRightsCaseExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'H5-SO-01';

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
          <strong>인권</strong>은 사람이라면 누구나 가지는 권리예요. 어른이든 아이든, 어느 나라 사람이든,
          몸이 불편하든 그렇지 않든 똑같이 존중받아야 한다는 약속입니다.
        </p>
      </SectionCard>

      <SectionCard title="큰 흐름 / 왜 약속해 둔 거야">
        <p>
          옛날에는 신분이나 성별 때문에 어떤 사람은 학교에 갈 수 없거나, 의견을 말할 수 없었어요.
          그게 잘못이라는 걸 깨달은 사람들이 모여서 「누구나 가지는 권리」를 글로 남겨 두었어요.
          1948년 유엔에서 만든 <strong>세계 인권 선언</strong>이 대표적이에요. 우리나라도 헌법 제10조에
          「모든 국민은 인간으로서의 존엄과 가치를 가진다」고 적어 놓았어요.
        </p>
        <p>
          인권은 보통 4가지 묶음으로 나누어 살펴봐요. <strong>평등권</strong>(차별받지 않을 권리),
          <strong> 자유권</strong>(생각·표현·이동의 자유), <strong>사회권</strong>(교육·의료 같은 기본
          조건을 누릴 권리), <strong>참정권</strong>(나라 일에 참여할 권리)이에요.
        </p>
        <p>
          인권은 <strong>혼자만</strong>의 것이 아니에요. 내 권리만큼 다른 사람의 권리도 똑같이
          소중해요. 그래서 「내 자유는 다른 사람을 해치지 않는 선까지」라는 한계가 있어요.
        </p>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <ul className="list-disc list-inside space-y-1.5 text-sm">
          <li>
            <strong>오개념 1.</strong> 「인권은 어른만 갖는다」. → 어린이도 인권의 주체예요. 따로 「아동의
            권리에 관한 협약」도 있어요.
          </li>
          <li>
            <strong>오개념 2.</strong> 「자유권 = 무엇이든 마음대로」. → 자유는 무제한이 아니에요. 다른
            사람을 해치거나 다른 사람의 권리를 빼앗는 행동은 자유에 포함되지 않아요.
          </li>
          <li>
            <strong>오개념 3.</strong> 「장애인을 위한 시설은 특별 대우」. → 특별 대우가 아니라 평등권을
            지키기 위한 당연한 조건이에요(누구나 똑같이 다닐 수 있게 해야 하니까).
          </li>
        </ul>
      </SectionCard>

      <SectionCard title="실생활 속 인권 보호">
        <p>
          학교 무료 급식·예방접종은 모두가 잘 자랄 수 있게 하는 <strong>사회권</strong>의 예시예요.
          학교 안에서 친구를 별명으로 놀리지 않는 것은 <strong>평등권</strong>·존엄을 지키는 행동이고요.
        </p>
        <p>
          버스·지하철의 노약자석, 점자 블록, 휠체어 경사로는 「약자도 같이 다닐 수 있게」 만든
          장치예요. 이건 양보가 아니라 <strong>모두의 권리</strong>를 지키기 위한 사회의 약속입니다.
        </p>
      </SectionCard>

      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <HumanRightsCaseExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
