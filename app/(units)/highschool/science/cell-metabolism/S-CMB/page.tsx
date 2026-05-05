import { notFound } from 'next/navigation';
import { UnitSCMBExplorer } from '@/components/interactive/science/highschool/UnitSCMBExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'S-CMB';

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
          { label: '세포와 물질대사' },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          세포는 「작은 화학공장」. 들어온 포도당 1분자를 산소로 태워서 <strong>32개의 ATP</strong>를 뽑아내고,
          식물은 거꾸로 빛으로 CO₂를 묶어서 포도당을 만들어요. 이 두 길이 지구의 모든 생명을 떠받치고 있어요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 세포호흡과 광합성의 회계">
        <p>
          세포호흡은 4단계: 해당과정(세포질) → 피루브산 산화 → TCA 회로(미토콘드리아 기질) → 산화적 인산화(내막).
          NADH 10개 × 2.5 + FADH₂ 2개 × 1.5 + 직접 ATP 4개 ≈ <strong>32 ATP</strong>.
          광합성은 명반응(틸라코이드)에서 빛으로 ATP·NADPH를 만들고, 암반응(캘빈회로)에서 그것으로 CO₂를 당으로 환원해요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "세포호흡은 산소로 「태우는」 것이다" — 불꽃이 아니라 효소의 단계적 산화. 38가지 효소가 차례로 작동.<br />
          ❌ "광합성은 낮에만, 호흡은 밤에만" — 식물은 24시간 호흡함. 낮에는 광합성 &gt; 호흡이라 순수 O₂ 방출.<br />
          ❌ "ATP는 한 번 만들면 오래 저장된다" — 평균 수명 1분 안. 매일 체중만큼의 ATP가 만들어졌다 분해돼요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          격렬한 운동 시 산소 부족 → 젖산 발효(2 ATP만 생성) → 근육통. 시안화물(KCN)이 사람을 죽이는 메커니즘은
          전자전달계 차단 → ATP 생산 중단. 수능 생명과학Ⅰ·Ⅱ ATP 회계 문제는 매년 1~2문항 단골.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <UnitSCMBExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
