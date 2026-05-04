import { notFound } from 'next/navigation';
import { MediaLiteracyExplorer } from '@/components/interactive/korean/MediaLiteracyExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'K-CK2-06';

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
          매체 리터러시는 <strong>정보의 출처·근거·의도를 따져 가며 매체를 사용하는 능력</strong>이에요.
          가짜뉴스가 늘어난 시대에 5단계 점검만 거쳐도 속을 확률이 크게 줄어요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 5단계 판별">
        <p>
          ① <strong>출처</strong>: 누가 어디에 쓴 글인지. ② <strong>날짜</strong>: 언제 작성·게재됐는지.
          ③ <strong>근거</strong>: 주장 뒤에 자료가 있는지. ④ <strong>교차 확인</strong>: 다른 매체도 같은 사실을 보도하는지.
          ⑤ <strong>의도</strong>: 글이 독자에게 무엇을 시키려 하는지. 5단계를 차례로 거치면 가짜와 진짜의 경계가 뚜렷이 보여요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "팩트체크 사이트만 보면 된다" — 그 사이트도 누가 운영하는지부터 점검해야 해요.
          ❌ "사진·영상은 진짜다" — 합성·맥락 조작이 흔해서 역검색이 필수.
          ❌ "내 친구가 공유했으니 신뢰할 만하다" — 신뢰는 사람이 아니라 출처와 근거에 묶여야 해요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          뉴스·SNS·메신저로 받은 정보 — 공유 버튼 누르기 전 5단계 점검을 습관화하세요.
          수능 화법·작문에서는 매체별 특성과 가짜뉴스 판별 절차를 묻는 문제가 자주 출제.
          아래에서 5단계의 점검 포인트를 직접 확인해 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <MediaLiteracyExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
