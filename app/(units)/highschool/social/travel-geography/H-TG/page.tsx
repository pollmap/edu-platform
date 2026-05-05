import { notFound } from 'next/navigation';
import { TravelGeographyMatcher } from '@/components/interactive/social/TravelGeographyMatcher';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'H-TG';

export function generateMetadata() {
  const unit = findUnit(UNIT_ID);
  return unit ? makeUnitMetadata(unit) : {};
}

export default function Page() {
  const unit = findUnit(UNIT_ID);
  if (!unit || unit.schoolLevel !== 'highschool') notFound();

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
          여행지리는 「<strong>지리</strong>(자연 환경·기후)」와 「<strong>문화</strong>(역사·언어·종교·음식)」를 한 번에 엮는
          융합 선택 과목이에요. 여행을 통해 다른 사회를 이해하고, 동시에 자신이 사는 지역을 다른 각도에서 다시 보는 시간이에요.
        </p>
      </SectionCard>

      <SectionCard title="큰 흐름 / 여행지를 보는 5축">
        <p>
          ① <strong>자연 경관</strong> — 빙하·사막·열대 우림·고원·해안선 같은 큰 형태가 여행 경험을 결정짓는 큰 축이에요.
          같은 산이라도 알프스의 빙하 경관과 한반도 동해안 산지의 침엽수림은 매우 다른 인상을 줘요.
        </p>
        <p>
          ② <strong>기후</strong> — 쾨펜 분류로 보는 열대·건조·온대·냉대·한대의 차이가 음식·주거·복식의 차이로 이어져요.
          「왜 그 도시는 그런 음식이 발달했나」는 거의 기후의 함수예요.
        </p>
        <p>
          ③ <strong>역사·문화 자원</strong> — 도시 골격, 종교 시설, 박물관, 무형 유산. 같은 도시 안에서도 「어느 시대의
          유산을 보러 가느냐」에 따라 일정 자체가 달라져요.
        </p>
        <p>
          ④ <strong>접근성·인프라</strong> — 항공·철도·도로·통신·환전 같은 인프라가 여행 가능성과 비용을 결정해요. 같은
          지구 반대편이라도 항공 노선과 비자 정책에 따라 「가깝게 느껴지는 정도」가 달라져요.
        </p>
        <p>
          ⑤ <strong>지속 가능성·윤리</strong> — 「<em>오버 투어리즘</em>」, 환경 부담, 지역 주민의 일상 침해 같은 문제가
          최근에 큰 주제예요. 「가는 것 자체가 목적」을 넘어 「<em>지역에 어떤 흔적을 남길 것인가</em>」를 생각하는 자세가
          필요해요.
        </p>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <ul className="list-disc list-inside space-y-1.5 text-sm">
          <li>
            <strong>오개념 1.</strong> 「유명한 곳 = 좋은 곳」 → 명소가 「자기에게」 좋은지, 「지역에게」 좋은지는 다른 질문이에요.
            오버 투어리즘은 유명세의 그늘이에요.
          </li>
          <li>
            <strong>오개념 2.</strong> 「외국 여행이 국내 여행보다 무조건 더 의미 있다」 → 환경 부담·비용·맥락 이해의 깊이를
            함께 보면 그 비교가 단순하지 않아요. 가까운 곳을 깊게 보는 「<em>슬로우 트래블</em>」도 큰 흐름이에요.
          </li>
          <li>
            <strong>오개념 3.</strong> 「여행은 소비」 → 여행은 학습·연결·기록의 도구일 수도 있어요. 일정·동선·기록 방식의
            선택이 「여행의 결」을 바꿔요.
          </li>
        </ul>
      </SectionCard>

      <SectionCard title="실생활 / 진로">
        <p>
          관광 기획, 항공·호텔, 도시 재생, 미디어 콘텐츠, 지속 가능 관광 정책, 지역 브랜딩 같은 분야가 직접 응용 영역이에요.
          가까운 입구로는 「<em>내가 사는 동네의 5축 분석</em>」을 해 보는 거예요. 그 동네의 자연·기후·역사·접근성·지속 가능성을
          정리해 보면 한국지리·세계지리 단원과도 자연스럽게 연결돼요.
        </p>
      </SectionCard>

      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <TravelGeographyMatcher />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
