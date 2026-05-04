import { notFound } from 'next/navigation';
import { KoreaEnvironmentLayers } from '@/components/interactive/social/KoreaEnvironmentLayers';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'H5-GE-02';

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
          {
            label: `${GRADE_LABEL[unit.grade]} / ${SUBJECT_LABEL[unit.subject]}`,
            href: `/grade-${unit.grade}/${unit.subject}`,
          },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />

      <SectionCard title="한마디로">
        <p>
          한 지역에서 사람이 살아가는 모습은 두 가지가 만나서 만들어져요.
          <strong> 자연환경(지형·기후·식생 등)</strong>은 사람이 만들지 않은 것이고,
          <strong> 인문환경(도시·인구·산업·교통 등)</strong>은 사람이 만든 것이에요.
        </p>
      </SectionCard>

      <SectionCard title="큰 흐름 / 왜 같이 봐야 해">
        <p>
          한반도의 지형은 <strong>동쪽이 높고 서쪽이 낮은 동고서저</strong> 형태예요. 동쪽 태백산맥이
          높고 서쪽으로 갈수록 평야가 넓어집니다. 그래서 큰 강은 대체로 동→서, 동→남으로 흘러요(한강·금강·영산강).
        </p>
        <p>
          기후는 사계절이 뚜렷한 <strong>온대 기후</strong>예요. 여름은 덥고 비가 많고, 겨울은 춥고
          건조해요. 위도가 높을수록(북쪽), 그리고 해발 고도가 높을수록(산지) 기온이 낮아져요.
        </p>
        <p>
          사람들은 <strong>평야·해안</strong>에 모여 살아요. 농사 짓기 좋고 항구를 만들기 쉽기 때문이에요.
          자연환경이 인문환경(인구 분포·도시 위치)에 큰 영향을 준 셈이에요. 반대로, 사람도 댐·간척·도시
          개발로 자연을 바꿔요.
        </p>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <ul className="list-disc list-inside space-y-1.5 text-sm">
          <li>
            <strong>오개념 1.</strong> 「자연환경이 인문환경을 일방적으로 결정한다」. → 영향은 크지만
            결정하지는 않아요. 사람의 기술과 선택도 중요해요.
          </li>
          <li>
            <strong>오개념 2.</strong> 「인구가 많은 곳 = 무조건 잘 사는 곳」. → 인구 밀집은 일자리·교통
            장점이 있지만 주거비·환경 문제도 같이 생겨요.
          </li>
          <li>
            <strong>오개념 3.</strong> 「농촌 = 자연환경, 도시 = 인문환경」. → 두 환경은 어디에나 있어요.
            도시에도 강·바람·기후가 있고, 농촌에도 도로·전기 같은 인문환경이 있어요.
          </li>
        </ul>
      </SectionCard>

      <SectionCard title="실생활 속 환경 이야기">
        <p>
          여름철 해안 도시는 바닷바람으로 내륙보다 시원해요. 반대로 분지(산으로 둘러싸인 지형)는
          더 더워요. 같은 한반도 안에서도 자연환경에 따라 같은 계절을 다르게 보냅니다.
        </p>
        <p>
          산이 많은 지역은 도로를 굽이굽이 내야 해서 교통비·시간이 더 들어요. 평야 지역은 직선 도로·고속철이
          깔리기 좋고요. 사람의 삶의 비용 자체가 자연환경의 영향을 받아요.
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
