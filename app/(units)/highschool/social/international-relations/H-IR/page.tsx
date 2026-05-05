import { notFound } from 'next/navigation';
import { InternationalOrgsExplorer } from '@/components/interactive/social/InternationalOrgsExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'H-IR';

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
          국제 관계는 <strong>200여 주권 국가가 「공동의 게임 규칙」을 만들고 깨고 다시 만드는 과정</strong>이에요.
          그 게임의 무대가 UN·WTO·IMF 같은 국제기구이고, 규칙이 국제법·조약이에요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 4갈래의 국제기구">
        <p>
          ① <strong>종합 — UN·ASEAN</strong>: 정치·안보·인권·개발을 폭넓게 다루는 종합 기구.
          ② <strong>경제 — WTO·IMF·세계은행·OECD·G20</strong>: 무역·통화·개발 협력. 한국이 가장 깊이 연계된 영역.
          ③ <strong>안보 — NATO 등 동맹</strong>: 집단 방위. 한국은 NATO 회원국 아니지만 글로벌 파트너.
          ④ <strong>전문 — WHO·ICC</strong>: 보건·국제 형사 정의 같은 특정 분야 전담.
          모든 국제기구는 「기능」과 「한계」가 같이 있어요. 거부권·집행력 부족·예산 의존성 등.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "UN이 결정하면 끝" — UN 결의안은 강제 집행이 어려워요. 안보리 5상임의 거부권 영향이 크고.
          ❌ "국제법 = 위반하면 처벌" — 국내법과 달리 명확한 강제력이 부족해요. 「관습·신뢰·평판」이 큰 부분 작동.
          ❌ "한국 = 작은 나라" — 한국은 G20·OECD·UN 비상임이사국 등 중견국으로 다층적 외교를 해요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          뉴스의 국제 이슈는 거의 항상 「어느 국제기구 안에서 어떤 절차로 다뤄지는가」를 묻는 문제예요.
          수능 정치와법·통합사회·국제관계: 「UN의 구조」, 「WTO의 분쟁 해결 절차」, 「ICC의 관할권」 등이 자주 출제돼요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <InternationalOrgsExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
