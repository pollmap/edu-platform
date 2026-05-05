import { notFound } from 'next/navigation';
import { DataDistributionExplorer } from '@/components/interactive/math/highschool/DataDistributionExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-AS-01';

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
          자료 수집의 첫 단계는 <strong>「무엇을, 어떻게, 누구에게」</strong>예요.
          모집단 vs 표본의 차이, 무작위 표본추출, 측정 오차 — 이 셋이 자료 신뢰도의 뼈대입니다.
          정리는 도수분포표·히스토그램·줄기잎·상자그림으로, 분포의 모양·중심·퍼짐을 한눈에 보이게 만들어요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 분포의 4가지 정보">
        <p>
          ① <strong>중심</strong>: 평균 / 중앙값 / 최빈값. ② <strong>퍼짐</strong>: 범위 / 분산 / 표준편차 / IQR.
          ③ <strong>모양</strong>: 좌우 대칭, 한쪽으로 치우친 비대칭, 두 봉우리(이중 모드).
          ④ <strong>이상값</strong>: IQR의 1.5배 바깥 — 데이터 입력 실수인지 진짜 극단값인지 구분 필요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ 「평균이 분포의 중심이다」 — 비대칭 분포에서 평균은 꼬리에 끌려가요. 중앙값이 더 안정적이에요.
          ❌ 「표본 크기만 크면 된다」 — 편향된 표본은 크기가 커도 모집단을 대표하지 못해요.
          ❌ 「히스토그램과 막대그래프는 같다」 — 히스토그램은 연속 자료 구간, 막대그래프는 범주형이에요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          통계청 KOSIS, 한국은행 ECOS, 공공데이터포털의 실제 자료를 가져와 도수분포표로 정리해 보세요.
          소득 분포처럼 비대칭이 심한 자료에서는 중앙값이 평균보다 더 「전형적인 시민」을 보여줘요.
          수능 「확률과 통계」에서 평균·표준편차 계산은 매년 출제되는 기본 공식입니다.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <DataDistributionExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
