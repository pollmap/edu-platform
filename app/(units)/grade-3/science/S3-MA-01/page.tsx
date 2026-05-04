import { notFound } from 'next/navigation';
import { ParticleStateSimulator } from '@/components/interactive/science/ParticleStateSimulator';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'S3-MA-01';

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
          물질은 우리 주변의 모든 것을 이루는 재료예요. 나무·돌·물·금속 — 종류마다 단단함·색·무게·열을 잘 전하는 정도가 다 달라요. 이런 차이를 <strong>물질의 성질</strong>이라고 해요.
        </p>
      </SectionCard>
      <SectionCard title="물질을 분류하는 기준">
        <p>
          관찰하면 보이는 성질: <strong>색·모양·냄새·맛(직접 맛X)·표면 질감</strong>.
          만지거나 도구로 알 수 있는 성질: <strong>단단함·무게·열·전기를 통하는 정도·물에 뜨는지</strong>.
          나무는 가볍고 따뜻하고 전기를 거의 안 통해요. 금속은 무겁고 차갑고 전기를 잘 통해요. 물질마다 쓰임이 다른 이유가 여기에 있어요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "투명하면 다 같은 물질" — 유리·플라스틱·물 모두 투명하지만 단단함과 무게는 다 달라요.
          ❌ "무거우면 큰 것" — 작은 쇠구슬이 큰 스티로폼보다 무거워요. 무게는 크기와 별개의 성질.
          ❌ "온도는 물질의 성질" — 온도는 변할 수 있는 상태이지 고유 성질이 아니에요. 같은 물도 차갑게/뜨겁게 할 수 있어요.
        </p>
      </SectionCard>
      <SectionCard title="실생활 속 물질 선택">
        <p>
          냄비는 왜 금속? — 열을 빨리 전해 음식이 빨리 익어요. 손잡이는 왜 플라스틱? — 열이 잘 안 통해 손이 안 데요.
          전선은 왜 구리(금속)에 고무를 씌울까? — 구리는 전기를 잘 통하고, 고무는 안 통해요. 안전을 위한 조합.
          이렇게 사람들은 물질의 성질을 골라서 사용해요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <ParticleStateSimulator />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
