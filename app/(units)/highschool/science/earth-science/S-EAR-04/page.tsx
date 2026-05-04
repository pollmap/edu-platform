import { notFound } from 'next/navigation';
import { GeologicTimescaleExplorer } from '@/components/interactive/science/GeologicTimescaleExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'S-EAR-04';

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
          { label: '지구과학' },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          지구 46억년을 시계 24시간으로 압축하면, 인류 등장은 <strong>밤 11시 59분 56초</strong>예요.
          지구 역사는 단순한 「오래된 이야기」가 아니라 「지층·화석·동위원소」가 남긴 명백한 기록이에요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 지층·화석·연대 측정">
        <p>
          상대 연대(누중 법칙·관입 관계·표준화석)와 절대 연대(방사성 동위원소 반감기)로 나이를 매겨요.
          캄브리아 대폭발(5.4억년 전, 다세포 생물 폭증), P-Tr 대멸종(2.5억년 전, 95% 종 사라짐),
          K-Pg 대멸종(6,600만년 전, 공룡 멸종 + 소행성 충돌설), 신생대 빙하기 4회(제4기) — 각 시대마다 결정적 사건이 있어요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "공룡과 인간이 함께 살았다" — 공룡은 6,600만년 전 멸종. 인류는 30만년 전 등장. 6,600만년 차이.<br />
          ❌ "방사성 연대 측정은 부정확하다" — 반감기는 물리법칙. 시료 오염만 조심하면 매우 정확.<br />
          ❌ "지질연대표는 임의로 나눈 것이다" — 모든 경계는 「전 지구적 화석·암석 변화」가 일어난 시점.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          한반도 고생대 평안누층군의 석탄층(고생대 식물 화석), 백악기 공룡 발자국(전남 해남·고성), 동굴 종유석에서 과거 기후 복원.
          수능 지구과학Ⅰ·Ⅱ 「지구의 역사」는 매년 3~4문항. 표준화석 + 절대 연대 계산이 ★ 핵심.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <GeologicTimescaleExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
