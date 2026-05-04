import { notFound } from 'next/navigation';
import { ReactionRateExplorer } from '@/components/interactive/science/highschool/ReactionRateExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'S-CHE-07';

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
          { label: '화학' },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          반응이 일어나도 <strong>"얼마나 빠른가"</strong>는 또 다른 이야기예요.
          농도 · 온도 · 표면적 · 촉매가 속도를 결정해요.
          속도상수 k는 「충돌 빈도 × 활성화에너지 통과 확률」로 풀어쓸 수 있고, 이게 아레니우스 식이에요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 충돌이론과 아레니우스">
        <p>
          반응이 일어나려면 ① 분자가 만나고 ② 충분한 운동에너지(Eₐ 이상)를 갖고 ③ 적절한 방향에서 부딪쳐야 해요.
          속도상수 k = A·exp(-Eₐ/RT). 온도 10K 오르면 k가 약 2~3배 → 속도도 그만큼 증가.
          농도가 높으면 충돌 빈도가 늘어 속도가 빠름(반응차수에 따라 비례 정도 다름).
          촉매는 Eₐ를 낮춰 같은 온도에서 더 많은 분자가 언덕을 넘게 해요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "촉매는 반응이 끝나도 사라진다" — 촉매는 회수되어 재사용 가능. 정의 자체가 「변하지 않는 도우미」.
          ❌ "반응속도는 항상 농도에 비례한다" — 1차 반응만 비례. 0차는 무관, 2차는 제곱 비례.
          ❌ "온도가 높으면 반응이 무조건 더 잘 일어난다" — 가역반응에선 발열반응의 평형이 역방향으로 밀려요(르샤틀리에).
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          냉장고는 부패 반응 속도를 낮추는 장치. 압력솥은 온도를 올려 조리 속도를 높임.
          자동차 배기 촉매(백금·로듐)는 NOx·CO를 깨끗한 가스로 빠르게 전환.
          효소가 36.5°C 인체에서 작동하는 이유 — 그 온도에서 단백질 구조가 최적.
          수능 「반응속도와 화학평형」 단원 매년 출제. 그래프 해석형 문항 단골.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <ReactionRateExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
