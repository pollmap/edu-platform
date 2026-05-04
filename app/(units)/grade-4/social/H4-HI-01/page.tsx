import { notFound } from 'next/navigation';
import { KoreanHistoryTimeline } from '@/components/interactive/social/KoreanHistoryTimeline';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'H4-HI-01';

export function generateMetadata() {
  const unit = findUnit(UNIT_ID);
  return unit ? makeUnitMetadata(unit) : {};
}

export default function Page() {
  const unit = findUnit(UNIT_ID);
  if (!unit || unit.schoolLevel === 'highschool' || unit.grade === undefined) notFound();

  return (
    <main className="container mx-auto max-w-5xl px-4 py-8">
      <UnitHeader
        unit={unit}
        breadcrumb={[
          { label: '홈', href: '/' },
          { label: `${GRADE_LABEL[unit.grade]} / ${SUBJECT_LABEL[unit.subject]}`, href: `/grade-${unit.grade}/${unit.subject}` },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          <strong>문화유산</strong>은 옛 사람들이 만들어 오늘까지 전해진 소중한 자취예요. 건축물·도자기·그림·음악·이야기·풍습 — 형태도 다양해요.
        </p>
      </SectionCard>
      <SectionCard title="유형 vs 무형 문화유산">
        <p>
          <strong>유형 문화유산</strong>은 만질 수 있는 형태 — 경복궁·석굴암·청자·금속활자·불상.
          <strong>무형 문화유산</strong>은 형태가 없는 — 판소리·종묘제례악·김장 문화·태권도. 사람이 직접 이어가야 보존돼요.
          유네스코 세계유산·인류무형문화유산으로 등재된 한국 유산도 많아요(석굴암·종묘·창덕궁·판소리·아리랑 등).
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "오래된 것만 문화유산" — 1900년대 근대 건축물·민주화 운동의 자료도 후세에 가치 있는 문화유산이에요.
          ❌ "박물관에 있는 것만" — 우리 동네 옛 우물·돌담·이야기도 지역 문화유산. 일상에 가까이 있어요.
          ❌ "외국 문화유산이 더 멋지다" — 한국에는 9000여 점의 국가 지정 문화유산이 있어요. 가까이서 발견해 보세요.
        </p>
      </SectionCard>
      <SectionCard title="우리 지역 살펴보기">
        <p>
          내가 사는 동·시·군에는 어떤 문화유산이 있을까? 지자체 누리집·문화재청에서 검색해 볼 수 있어요.
          여행 갈 때 그 지역의 가까운 박물관·옛 건물을 잠깐 들러 보면 그 땅의 이야기가 한층 깊어져요.
          타임라인에서 한국사 큰 줄기를 따라가며 어느 시대 유산이 우리 동네에 있는지 짐작해 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <KoreanHistoryTimeline />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
