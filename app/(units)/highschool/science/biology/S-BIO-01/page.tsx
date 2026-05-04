import { notFound } from 'next/navigation';
import { CharacteristicsOfLifeMatrix } from '@/components/interactive/science/CharacteristicsOfLifeMatrix';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'S-BIO-01';

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
          생명과학의 출발점은 <strong>"생물이란 무엇인가"</strong>를 정의하는 일이에요.
          돌·불꽃·바이러스 같은 「생물 같지만 생물 아닌」 것들과 진짜 생물을 구분하는 7가지 기준이 모든 단원의 토대예요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 생명의 7가지 특성">
        <p>
          ① 세포 구조 ② 물질대사(동화·이화) ③ 자극에 대한 반응 ④ 항상성 ⑤ 발생과 생장 ⑥ 생식과 유전 ⑦ 적응과 진화.
          이 7가지를 모두 갖춘 것이 「생물」이에요. 바이러스는 ⑥·⑦은 있지만 ①·②가 없어 「생물·무생물의 경계」로 분류돼요.
          이 기준은 단순한 암기가 아니라 「물질대사」 「항상성」 「유전」 단원으로 직결되는 뼈대예요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "결정(수정)이 자라니까 생물이다" — 결정 성장은 단순한 물리적 침전. 대사·반응 없음.<br />
          ❌ "불꽃은 산소에 반응하니까 생물이다" — 화학반응일 뿐, 세포·DNA·진화 없음.<br />
          ❌ "바이러스는 완전한 생물이다" — 숙주 안에서만 증식. 스스로 대사 못해요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          코로나19 같은 신종 바이러스 분류 논쟁, AI 로봇이 「살아 있는 것」인가 같은 철학적 질문은 모두 이 7가지 기준에서 출발해요.
          수능 생명과학Ⅰ 1단원 「생명과학의 이해」에서 ★ 단골 출제. 「생물이 아닌 것을 골라라」 유형이 매년 1문항씩 나와요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <CharacteristicsOfLifeMatrix />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
