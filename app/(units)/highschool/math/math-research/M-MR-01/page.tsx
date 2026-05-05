import { notFound } from 'next/navigation';
import { MathResearchNotebook } from '@/components/interactive/math/highschool/MathResearchNotebook';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-MR-01';

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
          수학 과제 탐구는 <strong>「작은 문제 하나를 깊이 파고드는 연습」</strong>이에요.
          가설 → 시각화 → 관찰 → 일반화의 4단계 사이클을 작은 함수 하나로 직접 돌려 보는 것이 첫 걸음.
          정답이 정해진 문제 풀이보다 훨씬 더 「수학자가 일하는 방식」에 가까워요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 4단계 사이클">
        <p>
          ① <strong>가설</strong>: 「이 함수는 ...일 때 ...한 성질을 가질 것이다」를 한 문장으로.
          ② <strong>시각화</strong>: 매개변수를 슬라이더로 움직이며 그래프를 관찰.
          ③ <strong>관찰</strong>: 변화의 임계점·대칭성·점근선 등 패턴을 노트에 기록.
          ④ <strong>일반화</strong>: 「k {`>`} 0일 때는 ..., k {`<`} 0일 때는 ...」로 결론을 폰의·증명 시도.
          이 사이클을 돌리는 것 자체가 수학 능력의 핵심입니다.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ 「과제 탐구는 정답이 있어야 한다」 — 탐구는 「과정」이 본질. 정답에 도달하지 못해도 발견·실패·재시도의 기록 자체가 결과물.
          ❌ 「내가 새로운 정리를 증명해야 한다」 — 그럴 필요 없어요. 이미 알려진 사실을 「내 손으로 직접 발견」하는 것이 목표.
          ❌ 「복잡할수록 좋은 탐구」 — 작은 함수 하나에 대한 깊은 관찰이 거대한 모델보다 훨씬 가치 있어요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          학생부 종합 전형의 「세부능력 및 특기사항」, 과학고·영재학교의 R&E(Research & Education) 과제.
          상단의 가설 텍스트 박스에 자기 가설을 적고, 5가지 함수 중 하나를 선택해 k 슬라이더를 움직여 보세요.
          관찰 노트에 발견한 패턴을 기록하면 그것이 바로 「작은 수학 논문의 초고」가 됩니다.
          예) sin(kx)에서 k가 음수가 되면 그래프가 좌우 반사된다 → 일반적으로 sin(−kx) = −sin(kx).
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <MathResearchNotebook />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
