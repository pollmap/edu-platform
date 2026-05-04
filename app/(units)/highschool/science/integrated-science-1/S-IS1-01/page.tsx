import { notFound } from 'next/navigation';
import { UnitConversionExplorer } from '@/components/interactive/science/UnitConversionExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'S-IS1-01';

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
          { label: '통합과학1' },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          모든 과학은 <strong>「어떻게 측정하느냐」</strong>에서 시작해요. 같은 「3 m」도 「3.0 m」와 「3.000 m」는 정밀도가 달라요.
          단위·유효숫자·과학적 표기 — 이 셋을 정확히 다루는 게 과학자의 첫걸음.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — SI 단위·유효숫자·차원분석">
        <p>
          국제단위계(SI) 7개 기본 단위 — 길이(m), 질량(kg), 시간(s), 전류(A), 온도(K), 물질량(mol), 광도(cd).<br />
          유효숫자 — 0이 아닌 숫자 + 사이의 0 + 끝의 0(소수점 있을 때만). 곱·나눗셈에서 가장 적은 자릿수에 맞춤. 덧·뺄셈에서 가장 적은 소수점 자리에 맞춤.<br />
          과학적 표기 = 1 ≤ |a| &lt; 10 × 10ⁿ. 1 광년 = 9.461 × 10¹⁵ m, 수소원자 반지름 = 5.29 × 10⁻¹¹ m.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "1500은 4자리 유효숫자다" — 모호. 1.500 × 10³이 명확한 4자리.<br />
          ❌ "정확도 = 정밀도" — 다름. 정확도(참값과 일치), 정밀도(반복 측정의 일관성).<br />
          ❌ "단위는 그냥 붙이면 된다" — 차원분석으로 식이 맞는지 확인. F[N] = m[kg] × a[m/s²].
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          1999년 NASA 화성 기후 궤도선 추락 — 미터법(SI)과 야드파운드법 단위 혼동이 원인. 손실액 1억 2,500만 달러.
          수능·내신에서 단위 변환과 유효숫자는 ★ 기본기. 모든 정량 문제에서 유효숫자 1자리 틀려도 감점.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <UnitConversionExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
