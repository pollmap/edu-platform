import { notFound } from 'next/navigation';
import { KoreaEnvironmentLayers } from '@/components/interactive/social/KoreaEnvironmentLayers';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'H-KG';

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
          한국지리 탐구는 「<strong>지형·기후·인구·산업</strong>」이라는 4개의 레이어를 겹쳐 가며 한반도를 입체적으로 보는
          진로 선택 과목이에요. 한 가지 지도가 아니라 「레이어를 켜고 끄며 비교하는」 자세가 핵심이에요.
        </p>
      </SectionCard>

      <SectionCard title="큰 흐름 / 4개의 레이어">
        <p>
          ① <strong>지형</strong> — 한반도는 동쪽이 높고 서쪽이 낮은 「<em>동고서저</em>」의 큰 틀이에요. 동쪽 태백·소백
          산맥, 서쪽으로 흐르는 한강·금강·낙동강, 남해의 다도해, 화산 지형(제주·울릉) 등이 대표예요. 산지·하천이 도시 위치와
          교통망의 출발점이에요.
        </p>
        <p>
          ② <strong>기후</strong> — 사계절이 뚜렷한 온대 기후가 큰 골격이지만, 위도·고도·해륙 분포에 따라 지역차가 큽니다.
          여름의 장마, 가을의 청명한 건조 기후, 겨울의 한반도 한파, 제주의 아열대 영향 등 미세한 차이를 보는 것이 진로
          단계 학습의 한 축이에요.
        </p>
        <p>
          ③ <strong>인구</strong> — 수도권 집중, 영·호남 인구 흐름의 차이, 농촌·도시 인구 변화, 저출생·고령화의 지역 차이가
          핵심 주제예요. 지도는 같은데, 어느 시기·어느 통계를 겹치느냐에 따라 다른 모습이 나와요.
        </p>
        <p>
          ④ <strong>산업</strong> — 광역권별 산업 구조의 차이(수도권의 IT·서비스, 동남권의 중공업·조선, 충청권의 반도체·
          디스플레이, 호남·영남의 농수산 등)가 입체적이에요. 산업은 다시 인구 분포에 영향을 주고, 인구는 다시 도시·교통의
          모습을 바꿔요. 4개의 레이어가 서로 영향을 주고 받는 「<em>되먹임</em>」 구조예요.
        </p>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <ul className="list-disc list-inside space-y-1.5 text-sm">
          <li>
            <strong>오개념 1.</strong> 「지도는 변하지 않는 사실의 묶음」 → 어떤 데이터를 어떤 색·어떤 단위로 나타내느냐에
            따라 같은 지역도 매우 달라 보일 수 있어요. 지도는 「선택의 결과」예요.
          </li>
          <li>
            <strong>오개념 2.</strong> 「수도권 집중은 어쩔 수 없는 자연 법칙」 → 자연 조건뿐 아니라 정책·산업·교육·문화의
            축적이 만든 결과예요. 다른 정책 조합이라면 다른 분포도 가능했어요.
          </li>
          <li>
            <strong>오개념 3.</strong> 「농촌은 사라지는 곳」 → 인구가 줄어드는 것은 사실이지만, 농촌은 식량 안보·생태계·
            전통 문화의 기반이에요. 「대체할 수 없는 역할」이 분명히 있어요.
          </li>
        </ul>
      </SectionCard>

      <SectionCard title="실생활 / 진로">
        <p>
          GIS(지리 정보 시스템)·도시 계획·재해 관리·관광·물류·기후 정책 등이 직접적인 진로 분야예요. 일상 입구로는 일기
          예보의 「특보」 기준, 부동산 가격의 지역 격차, 교통 카드 데이터의 지역별 흐름 같은 사례를 「<em>지도 위에서</em>」
          읽어 보는 연습이 좋아요.
        </p>
      </SectionCard>

      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <KoreaEnvironmentLayers />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
