import { notFound } from 'next/navigation';
import { PunnettSquareExplorer } from '@/components/interactive/science/PunnettSquareExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'S-BIO-05';

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
          부모 → 자식으로 형질이 어떻게 전달되는가 — 이걸 정확히 예측하는 도구가 <strong>펀넷정사각형</strong>.
          멘델이 완두콩으로 발견한 「우열·분리·독립」 3법칙이 그대로 사람의 ABO 혈액형·유전병 분석에 쓰여요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 멘델 3법칙·검정교배">
        <p>
          ① 우열 — Aa면 우성 A의 표현형이 나타남.<br />
          ② 분리 — 감수분열 때 한 쌍이 갈라져 각 생식세포에 하나씩 들어감.<br />
          ③ 독립 — 다른 염색체에 있는 유전자는 서로 무관하게 전달.<br />
          단성 잡종 Aa × Aa = 3:1, 이성 잡종 AaBb × AaBb = 9:3:3:1, 검정교배 Aa × aa = 1:1.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "Aa는 50% 확률로 A 또는 a를 물려준다 = 100명 자녀면 정확히 50명씩" — 확률은 큰 표본일 때만 성립.<br />
          ❌ "혈액형 A형 부모는 절대 O형 자녀를 낳을 수 없다" — Ai × Ai → ii(O형) 가능.<br />
          ❌ "유전자형이 같으면 표현형도 같다" — 환경·발현 시기에 따라 달라질 수 있음(불완전 침투도).
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          가족 구성원 ABO 혈액형으로 친자관계 추정, 유전병(헌팅턴·낭포성 섬유증) 가족력 분석, 식물 육종(F1 잡종 강세).
          수능 생명과학Ⅰ 「유전」 단원은 매년 4~5문항 출제. 가계도 + 펀넷 + 확률 계산이 ★ 핵심 패턴.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <PunnettSquareExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
