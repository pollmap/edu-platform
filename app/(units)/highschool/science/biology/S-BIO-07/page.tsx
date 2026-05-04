import { notFound } from 'next/navigation';
import { FoodWebExplorer } from '@/components/interactive/science/FoodWebExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'S-BIO-07';

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
          한 종이 사라지면 생태계 전체가 흔들려요. 「먹이 그물(food web)」 한 가닥이 끊어지면 위·아래 모든 종이 영향을 받기 때문이에요.
          <strong>생물 다양성</strong>은 단순한 「예쁜 자연」이 아닌 「생태계의 안전장치」예요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 다양성·안정성·복원력">
        <p>
          생물 다양성 = 유전자 다양성 + 종 다양성 + 생태계 다양성. 종이 많을수록 먹이 그물의 가지가 많아 한 종이 사라져도 대체 경로가 있어 안정성↑.
          핵심종(키스톤 종) — 개체수가 적어도 생태계 구조를 결정하는 종. 늑대(옐로스톤), 해달(해초밭), 산호.
          개체군 변화는 로지스틱 곡선(K-선택)이나 폭발-붕괴(r-선택) 패턴을 따라요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "한 종이 멸종해도 다른 종이 그 자리를 채운다" — 적응에 수십~수만 년 걸려요.<br />
          ❌ "외래종은 무조건 나쁘다" — 정착 가능한 외래종은 일부. 단, 침입성 외래종(가시박·붉은귀거북)은 고유종을 위협.<br />
          ❌ "보호구역만 지정하면 종이 보존된다" — 서식지 면적·연결성·이동 회랑까지 고려해야 해요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          꿀벌 군집 붕괴(CCD)로 농작물 수분 위기, 한반도 호랑이·표범 멸종으로 사슴·멧돼지 폭증, 옐로스톤 늑대 재도입 후 강줄기까지 회복.
          수능 생명과학Ⅰ·Ⅱ 「생태와 환경」 단원에서 먹이 그물·에너지 흐름·물질 순환이 ★ 출제 패턴.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <FoodWebExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
