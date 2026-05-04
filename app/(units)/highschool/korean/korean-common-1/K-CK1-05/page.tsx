import { notFound } from 'next/navigation';
import { LiteraryGenreExplorer } from '@/components/interactive/korean/LiteraryGenreExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'K-CK1-05';

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
          문학은 <strong>형식</strong>에 따라 시·소설·극·수필 4갈래로 나눠요. 같은 사건도 어느 갈래로 쓰느냐에 따라
          전달 방식이 완전히 달라져요. 갈래 차이를 알면 작품을 더 빠르고 정확하게 분석할 수 있어요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 4갈래의 작동 방식">
        <p>
          시는 <strong>압축과 운율</strong>로, 소설은 <strong>인물·사건·배경</strong>의 서사로, 극은 <strong>대사와 행동</strong>으로,
          수필은 <strong>글쓴이의 직접 체험과 성찰</strong>로 작동해요. 각 갈래마다 "기본 단위", "말하는 사람",
          "독자가 받게 되는 정보 종류"가 다르다는 점을 비교하면 분석이 훨씬 쉬워져요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "수필은 일기와 같다" — 일기는 사적 기록이지만, 수필은 독자를 전제로 다듬은 글이에요.
          ❌ "극은 영화 시나리오와 같다" — 무대를 전제로 하므로 카메라 연출 대신 지시문에 의존해요.
          ❌ "시는 짧으면 다 시다" — 압축된 정서·심상·운율이 핵심이지, 길이 자체는 본질이 아니에요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          수능 문학은 4갈래 중 어떤 갈래의 어떤 특성을 묻는지 빠르게 식별하는 게 시간 단축의 열쇠예요.
          영화·드라마 시청 시에도 갈래 의식을 가지면 "이 장면이 왜 이렇게 연출됐을까"가 보여요.
          아래에서 4갈래의 핵심 차이를 비교해 보세요. (특정 작품 본문은 인용하지 않고 갈래 특성만 다룹니다.)
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <LiteraryGenreExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
