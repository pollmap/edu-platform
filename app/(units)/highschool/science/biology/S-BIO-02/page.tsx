import { notFound } from 'next/navigation';
import { HumanMetabolismFlow } from '@/components/interactive/science/HumanMetabolismFlow';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'S-BIO-02';

export function generateMetadata() {
  const unit = findUnit(UNIT_ID);
  return unit ? makeUnitMetadata(unit) : {};
}

export default function Page() {
  const unit = findUnit(UNIT_ID);
  if (!unit) notFound();

  return (
    <main className="container mx-auto max-w-5xl px-4 py-8">
      <UnitHeader
        unit={unit}
        breadcrumb={[
          { label: '홈', href: '/' },
          { label: '고등학교', href: '/highschool' },
          { label: '생명과학' },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          내가 먹은 밥 한 그릇이 어떻게 「뛰는 심장과 생각하는 뇌」가 되는가 — 이게 <strong>물질대사</strong>예요.
          탄수화물·지방·단백질이 소화 → 흡수 → 세포호흡 → ATP까지 가는 한 줄짜리 흐름이 모든 생명 활동의 동력이에요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 동화·이화·ATP">
        <p>
          작은 분자를 큰 분자로 합치는 「동화작용」(광합성·단백질 합성)과, 큰 분자를 쪼개 에너지를 얻는 「이화작용」(세포호흡·소화)이 한 쌍.
          모든 에너지의 화폐 단위는 <strong>ATP</strong>이고, 1 mol 포도당은 미토콘드리아에서 약 30~38 ATP를 만들어요.
          호흡지수 RQ = CO₂ 배출 / O₂ 소비 — 탄수화물 1.0, 지방 0.7, 단백질 0.8.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "탄수화물은 살찌니까 나쁘다" — 칼로리 균형이 핵심. 지방은 g당 9 kcal, 탄수화물·단백질은 4 kcal.<br />
          ❌ "근육량이 많으면 기초대사량이 무한정 늘어난다" — 1 kg 근육 ≈ 13 kcal/일 수준.<br />
          ❌ "에너지를 얻는 곳은 위장이다" — 위는 분해, ATP는 미토콘드리아에서 만들어요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          다이어트 식단 설계, 마라톤 페이스 조절, 당뇨 환자 식이요법 — 모두 이 모델로 분석돼요.
          수능 생명과학Ⅰ 「물질대사와 건강」 단원에서 RQ·기초대사량·에너지 균형 그래프 해석이 매년 1~2문항.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <HumanMetabolismFlow />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
