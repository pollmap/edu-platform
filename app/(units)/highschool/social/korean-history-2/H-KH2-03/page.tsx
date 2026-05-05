import { notFound } from 'next/navigation';
import { InterKoreanTimeline } from '@/components/interactive/social/InterKoreanTimeline';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'H-KH2-03';

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
          한반도의 분단은 1945년 광복과 동시에 시작됐고, 80년이 지난 지금까지 진행 중이에요.
          이 단원은 「분단이 왜 일어났고, 어떻게 지속되고 있으며, 평화·통일을 위해 어떤 시도들이 있었는가」를 시간 순으로 따라가요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 분단·대화·위기의 반복">
        <p>
          남북관계는 <strong>긴장 → 대화 → 위기 → 다시 대화</strong>의 사이클을 80년 간 반복해 왔어요.
          1972 7·4 공동성명, 1991 기본합의서·UN 동시 가입, 2000·2007·2018 정상회담 같은 「대화의 봉우리」가 있었고,
          한국전쟁·북한 핵실험(2006~)·천안함·연평도(2010) 같은 「위기의 골짜기」도 있었어요.
          그 어떤 시기에도 「관계」 자체는 끊이지 않았다는 점이 특징이에요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "통일 = 한 가지 방법" — 흡수통일·점진적 통합·연방제 등 다양한 시나리오가 학계·정책 영역에서 검토돼 왔어요.
          ❌ "남북관계 = 정부 간 협상만" — 이산가족·경제 협력·문화 교류 등 비공식 채널이 큰 역할을 해왔어요.
          ❌ "북한 = 단일 행위자" — 북한 내부에도 군부·당·내각 등 다양한 의사결정 구조가 있고, 외교 전략은 시기별로 달라요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          수능 한국사·통합사회·정치와법에서 「7·4 공동성명 vs 6·15 공동선언」, 「기본합의서의 내용」 등이 자주 출제돼요.
          뉴스의 남북 관련 보도를 볼 때, 어느 시기 사이클의 어디에 와 있는지 가늠해 보면 단순 반응이 아니라 맥락 있는 이해가 가능해져요.
          어떤 정치적 입장이든, 「사실의 흐름」을 정확히 아는 것이 출발점이에요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <InterKoreanTimeline />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
