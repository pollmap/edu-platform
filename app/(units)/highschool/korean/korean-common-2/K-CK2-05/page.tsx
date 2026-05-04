import { notFound } from 'next/navigation';
import { KoreanLiteraryHistoryTimeline } from '@/components/interactive/korean/KoreanLiteraryHistoryTimeline';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'K-CK2-05';

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
          한국 문학사는 <strong>구비 → 한자 차용 → 한글 → 근대 → 현대</strong>로 큰 흐름이 정리돼요.
          작품을 만났을 때 시대를 먼저 위치시키면, 그 시대의 매체·향유층·이념이 자동으로 떠올라 해석이 한결 쉬워져요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 6시대 구분">
        <p>
          ① 상고 시대: 구비 문학 + 한자 표기 시작. ② 고려: 귀족 한문학과 서민 노래의 이원 구조.
          ③ 조선 전기: 훈민정음 창제로 한글 문학 가능해짐. ④ 조선 후기: 평민 의식 성장, 사설시조·판소리·한글소설.
          ⑤ 근대: 신문·잡지 등장, 자유시·근대소설 정착. ⑥ 현대: 분단·산업화·디지털 등 시대 이슈 반영.
          시대마다 매체·문자·계층의 변화가 어떻게 갈래를 바꾸었는지가 핵심.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "옛 작품일수록 가치가 높다" — 시대마다 의미가 다른 것이지, 단순 우열이 아니에요.
          ❌ "한국 문학 = 한글 문학" — 한문학도 한국 문학의 큰 줄기예요.
          ❌ "현대 문학은 모두 산문이다" — 현대시·희곡·수필도 활발히 창작되고 있어요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          작품을 만나면 먼저 시대를 위치시키세요. 시대 → 매체 → 향유층 → 이념 순서로 추리하면 분석이 빨라져요.
          수능 문학은 갈래·시대 식별 문제가 단골 출제. 아래 타임라인에서 각 시대의 매체·갈래·전환점을 직접 확인해 보세요.
          (특정 작품 본문은 인용하지 않습니다.)
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <KoreanLiteraryHistoryTimeline />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
