import { notFound } from 'next/navigation';
import { UnitSMECExplorer } from '@/components/interactive/science/highschool/UnitSMECExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'S-MEC';

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
          { label: '역학과 에너지' },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          뉴턴은 「떨어지는 사과」와 「달의 공전」을 같은 식으로 풀었어요.
          F = ma와 만유인력 한 줄이 행성·로켓·자유낙하·인공위성을 모두 설명해요.
          <strong>케플러 제3법칙 T² ∝ a³</strong>도 그 직접적 결과.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 운동방정식·구심·케플러">
        <p>
          포물선 운동: 수평·수직 운동을 분리. 사거리 R = v₀² sin(2θ)/g, 45°에서 최대.
          등속원운동: 구심 가속도 a_c = v²/r, 주기 T = 2πr/v. 「인공위성도 떨어지지만 빠르게 옆으로 빠지는 자유낙하」.
          케플러 제3법칙: T² = a³ (AU·년 단위). 만유인력 F = GMm/r²로 유도.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "원운동에는 「원심력」이 있다" — 관성좌표계에서는 구심력만 실제. 원심력은 회전계 가상력.<br />
          ❌ "무거운 게 더 빨리 떨어진다" — 갈릴레이의 사고실험·아폴로 15호 망치-깃털 실험. 진공에선 똑같이.<br />
          ❌ "위성은 지구 중력을 벗어나서 떠 있다" — 중력 안에서 「지구 곡률만큼」 떨어지며 도는 자유낙하.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          롤러코스터 안전 설계, 인공위성 궤도 계산(LEO 90분, GEO 24시간), 행성 궤도 예측 모두 같은 식.
          수능 물리Ⅰ·Ⅱ 「역학과 에너지」 단골 출제. 운동량 보존·에너지 보존을 함께 사용하는 복합 문항이 ★.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <UnitSMECExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
