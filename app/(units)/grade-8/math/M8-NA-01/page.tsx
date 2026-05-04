import { notFound } from 'next/navigation';
import { RepeatingDecimalExplorer } from '@/components/interactive/math/RepeatingDecimalExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'M8-NA-01';

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
          유리수(분수로 쓸 수 있는 수)는 소수로 바꾸면 <strong>유한소수</strong>이거나 <strong>순환소수</strong>둘 중
          하나예요. 분모를 기약분수로 정리한 뒤 소인수만 보면 어느 쪽인지 미리 알 수 있어요.
        </p>
      </SectionCard>

      <SectionCard title="왜 유한 또는 순환일까?">
        <p>
          분수를 나눗셈으로 풀면 매 단계마다 <strong>나머지가 0 ~ (분모 − 1)</strong> 사이의 정수예요. 나머지가
          0이면 끝(유한소수). 0이 아니라면 같은 나머지가 한 번이라도 다시 등장하는 순간 그 이후 계산이
          반복돼요. 그래서 길어 봐야 분모만큼 가다가 <strong>반드시 순환</strong>해요.
        </p>
        <p>
          기약분수의 분모가 <strong>2와 5의 곱으로만 이뤄지면 유한</strong>, 그 외 소인수(3·7·11…)가
          하나라도 있으면 순환소수예요.
        </p>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <p>
          0.999… = 1 이라는 사실에 놀라기 쉬워요. 무한히 9가 이어지면 1과 같은 수가 돼요(같은 점을 가리키는
          두 표현). 또 <strong>분모 6 = 2·3</strong>이라고 분모만 6 하나로 보고 “2의 곱이니 유한”이라 잘못
          판단할 수 있어요. 3이라는 다른 소인수가 있으니 6은 순환소수가 돼요.
        </p>
      </SectionCard>

      <SectionCard title="실생활">
        <p>
          은행 이자 계산이나 공학 단위 변환에서 1/3 같은 수를 컴퓨터에 그대로 넣으면 무한히 0.3333…이라 끝이
          나지 않아요. 그래서 부동소수점 계산엔 <strong>오차가 항상 따라붙는다</strong>는 사실을 미리 알아야 해요.
          순환소수의 정체를 이해하면 “왜 0.1 + 0.2 ≠ 0.3 일 때가 있을까?” 같은 의문이 풀려요.
        </p>
      </SectionCard>

      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <RepeatingDecimalExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
