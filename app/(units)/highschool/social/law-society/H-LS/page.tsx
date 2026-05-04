import { notFound } from 'next/navigation';
import { HumanRightsCaseExplorer } from '@/components/interactive/social/HumanRightsCaseExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'H-LS';

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
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          법은 <strong>사회의 약속을 글로 적어 둔 것</strong>이고, 그 약속의 가장 깊은 뿌리에 <strong>기본권(인권)</strong>이 있어요.
          헌법은 평등권·자유권·참정권·청구권·사회권을 보장하고, 민법·형법은 이를 일상의 분쟁 해결로 풀어요.
          사례를 권리 카테고리에 직접 매칭해 보면 법이 추상적인 글이 아니라는 게 보여요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 5가지 기본권">
        <p>
          ① <strong>평등권</strong>: 차별받지 않을 권리.
          ② <strong>자유권</strong>: 신체·표현·종교·직업의 자유.
          ③ <strong>참정권</strong>: 선거·공무담임 같이 정치에 참여할 권리.
          ④ <strong>청구권</strong>: 권리가 침해됐을 때 국가에 도움을 요청할 권리(재판·청원·국가배상).
          ⑤ <strong>사회권</strong>: 인간다운 생활을 위한 적극적 권리(교육·노동·복지).
          이 다섯이 헌법 전체의 골격이에요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "기본권은 무제한" — 헌법 제37조 ②항에 따라 국가안전보장·질서유지·공공복리를 위해 법률로 제한될 수 있어요.
          ❌ "법 = 처벌" — 법의 70%는 분쟁을 정리하는 민사 규칙이에요. 형법은 일부일 뿐이에요.
          ❌ "헌법은 정부만 지키면 된다" — 사적 영역(직장·학교)에도 평등 같은 헌법 가치는 「제3자 효력」으로 미쳐요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          학교 두발 규제, 직장 내 차별, 인터넷 표현의 자유, 백신 의무화 — 모두 어떤 기본권이 어디까지 인정되느냐의 문제예요.
          수능 「정치와 법」, 행정고시·로스쿨 LEET, 공무원 헌법 시험에서 사례 분류 문항이 단골이에요.
          아래 인터랙티브에서 실제 사례를 권리에 직접 연결해, 같은 사실관계라도 다른 권리가 동시에 충돌할 수 있다는 걸 체감해 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <HumanRightsCaseExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
