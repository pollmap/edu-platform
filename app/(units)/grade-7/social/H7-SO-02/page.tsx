import { notFound } from 'next/navigation';
import { CultureComparisonMatrix } from '@/components/interactive/social/CultureComparisonMatrix';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'H7-SO-02';

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
          문화는 사람들이 함께 살아가면서 만든 「<strong>생각하는 방식, 행동하는 방식, 표현하는 방식</strong>」의 묶음이에요.
          음식·옷·말·인사·예절·종교·예술까지 다 문화에 들어가요. 중요한 건 문화에는 「우열」이 없다는 점.
        </p>
      </SectionCard>

      <SectionCard title="큰 흐름 / 문화를 보는 3가지 자세">
        <p>
          ① <strong>자문화 중심주의</strong> — 내가 속한 문화를 「기준」으로 삼아 다른 문화를 평가해요. 다른 문화를
          「이상하다」, 「뒤떨어졌다」라고 단정하는 태도가 여기서 나와요.
        </p>
        <p>
          ② <strong>문화 사대주의</strong> — 반대로 다른 문화를 「우리보다 무조건 낫다」고 떠받드는 태도예요. 자신의 문화를
          깎아내리고 외국 문화만 좇는 흐름이 여기에 해당해요.
        </p>
        <p>
          ③ <strong>문화 상대주의</strong> — 「문화는 그 사회의 환경·역사 속에서 의미를 가진다」는 관점이에요. 다른 문화를
          그 사회의 맥락 안에서 이해하려고 노력해요. 단, <strong>문화 상대주의 = 모든 행위를 다 옳다고 본다</strong>는
          뜻은 아니에요. 보편적 인권을 침해하는 행위(예: 사람의 생명·자유·존엄을 해치는 관습)는 문화 상대주의로도 정당화될
          수 없어요. 이 한계를 「<strong>극단적 문화 상대주의의 위험</strong>」이라고 불러요.
        </p>
      </SectionCard>

      <SectionCard title="문화의 5축으로 비교하기">
        <p>
          문화는 「좋다·나쁘다」의 1차원이 아니라 여러 축의 위치 차이로 비교할 수 있어요. 대표적으로 ① 개인 vs 집단,
          ② 권력 거리, ③ 불확실성에 대한 태도, ④ 시간 관점(단기 vs 장기), ⑤ 성역할의 유연성. 같은 사회 안에서도 세대·
          지역에 따라 위치가 다르게 나오기도 해요.
        </p>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <ul className="list-disc list-inside space-y-1.5 text-sm">
          <li>
            <strong>오개념 1.</strong> 「문화 상대주의는 모든 것을 인정하는 태도」 → 그렇지 않아요. 보편적 인권에 어긋나는
            행위까지 인정하는 것은 문화 상대주의가 아니라 「극단적 상대주의」이고, 이는 비판의 대상이에요.
          </li>
          <li>
            <strong>오개념 2.</strong> 「발전한 문화·뒤떨어진 문화가 따로 있다」 → 그런 「우열」 비교는 자문화 중심주의의
            전형이에요. 문화는 그 사회의 환경·역사·필요에 적응한 결과예요.
          </li>
          <li>
            <strong>오개념 3.</strong> 「세계화 = 문화의 동질화」 → 세계화로 비슷해지는 면도 있지만, 동시에 「<em>지역화</em>」가
            함께 일어나서 더 다채로워지는 면도 있어요. 단순화하기 어려운 흐름이에요.
          </li>
        </ul>
      </SectionCard>

      <SectionCard title="실생활 속 문화 비교">
        <p>
          반에서도 「인사를 어떻게 할까」, 「선배에게 의견 말하기 어렵다」 같은 상황이 사실은 문화 축의 차이예요. 학교 급식,
          명절 풍습, 외국 드라마·예능에서 「이건 우리랑 다르네」하고 느꼈던 순간들도 다 문화 비교의 입구예요.
        </p>
      </SectionCard>

      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <CultureComparisonMatrix />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
