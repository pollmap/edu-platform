import { notFound } from 'next/navigation';
import { SmartCityExplorer } from '@/components/interactive/social/SmartCityExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'H-UF';

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
          21세기 인류의 절반 이상이 도시에 살아요(2050년에는 70%). 도시의 미래는 곧 인류의 미래예요.
          스마트시티는 <strong>「데이터·AI·센서」로 도시 문제를 푸는 새로운 모델</strong>이에요. 다만 「효율」 뒤에 「감시·격차」 문제도 따라와요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 6개 레이어">
        <p>
          ① <strong>교통</strong>: 자율주행·MaaS·실시간 신호.
          ② <strong>에너지</strong>: 스마트 그리드·신재생.
          ③ <strong>안전</strong>: 지능형 CCTV·재난 센서.
          ④ <strong>시민·행정</strong>: 디지털 민원·열린 데이터.
          ⑤ <strong>데이터·플랫폼</strong>: 디지털 트윈·오픈 API.
          ⑥ <strong>보건·복지</strong>: 원격 의료·돌봄 IoT.
          어느 「우선」을 두느냐가 도시의 성격을 정해요. 효율 우선·지속가능 우선·시민 우선 — 각자 트레이드오프가 있어요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "스마트시티 = 첨단 기술 도시" — 핵심은 기술이 아니라 「데이터로 어떤 가치를 키울 것인가」예요.
          ❌ "감시는 안전을 위해 필요" — 안전과 자유의 균형은 시민이 합의해야 할 정치적 문제이지, 자동으로 정해지는 게 아니에요.
          ❌ "디지털화 = 모두 편리" — 노년·취약 계층은 디지털 격차로 오히려 소외될 수 있어요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          한국의 송도·세종·부산 에코델타시티 같은 실제 사례를 「6개 레이어」로 분석해 보세요.
          공모전·논술·생기부 진로활동에서 도시·지속가능·디지털 융합 주제는 매우 자주 등장하는 영역이에요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <SmartCityExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
