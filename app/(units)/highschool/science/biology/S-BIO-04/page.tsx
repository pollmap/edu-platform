import { notFound } from 'next/navigation';
import { ImmuneResponseSimulator } from '@/components/interactive/science/ImmuneResponseSimulator';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'S-BIO-04';

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
          왜 코로나 백신을 한 번 맞으면 6개월씩 효과가 가는가 — 답은 <strong>기억세포</strong>.
          몸은 적(항원)을 처음 만나면 1차 반응(느림·약함), 같은 적을 다시 만나면 2차 반응(빠름·강함)으로 대응해요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 1·2·3차 방어와 항체 생산">
        <p>
          1차 방어 = 피부·점막·위산 (비특이적). 2차 방어 = 대식세포·NK세포·염증반응. 3차 방어 = 림프구(B·T세포)의 「특이적 면역」.
          항원 침입 → 대식세포가 부분 분해 → 보조 T세포가 B세포 활성화 → B세포가 형질세포로 분화하며 <strong>항체</strong> 대량 생산.
          기억 B·T세포는 「다음을 위해」 남아 2차 노출 시 1~2일 안에 폭발적 반응.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "백신이 병을 일으킨다" — 약독화·불활화된 항원이라 발병 위험 ↘. 면역 기억만 생성.<br />
          ❌ "항체는 영원히 남는다" — 항체 단백질 자체는 며칠~몇 달. 「기억세포」가 영구.<br />
          ❌ "알레르기는 면역이 약해서 생긴다" — 반대. 무해한 항원에 면역이 「과도하게」 반응한 것.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          코로나19·인플루엔자 백신이 매년 바뀌는 이유(바이러스 변이), HIV가 면역계를 무너뜨리는 메커니즘, 자가면역질환(루푸스·류마티스).
          수능 생명과학Ⅰ 「방어 작용」은 1차/2차 반응 그래프 비교가 ★ 단골. 매년 1~2문항.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <ImmuneResponseSimulator />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
