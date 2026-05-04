import { notFound } from 'next/navigation';
import { KoreaRegionExplorer } from '@/components/interactive/social/KoreaRegionExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'H8-GE-02';

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
          사람들이 모여 살면서 만든 가장 큰 「삶터」가 <strong>도시</strong>예요. 농촌과 달리 인구 밀도가 높고,
          제조·서비스·금융 같은 2·3차 산업이 중심이에요.
        </p>
      </SectionCard>

      <SectionCard title="큰 흐름 — 도시화 단계">
        <p>
          한 나라의 인구 중 <strong>도시에 사는 사람의 비율</strong>이 <strong>도시화율</strong>이에요. 도시화는 보통 세 단계.
        </p>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li><strong>초기 단계</strong>: 농촌이 다수(도시화율 30% 이하). 농업 중심.</li>
          <li><strong>가속화 단계</strong>: 산업화·일자리를 따라 도시로 이주가 폭발적으로 늘어요. 한국은 1960~1980년대.</li>
          <li><strong>종착 단계</strong>: 도시화율 80% 이상에서 안정. 이후엔 도시 안에서 변화(재개발·교외화·역도시화)가 일어나요.</li>
        </ul>
        <p className="text-sm">
          한국은 1960년 도시화율 약 28% → 2020년 약 91%. 세계에서 손꼽히는 빠른 도시화를 겪었어요.
        </p>
      </SectionCard>

      <SectionCard title="도시 문제와 대응">
        <p>도시는 효율적이지만 모이면서 생기는 문제가 있어요.</p>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li><strong>주거 문제</strong>: 집값·임대료 상승, 좁은 주거 공간, 노후 주택.</li>
          <li><strong>교통 혼잡</strong>: 출퇴근 시간대 정체, 대기오염.</li>
          <li><strong>환경·소음</strong>: 열섬 현상, 폐기물, 녹지 부족.</li>
          <li><strong>지역 격차</strong>: 도심·외곽·농촌 간 인프라·일자리 차이.</li>
        </ul>
        <p className="text-sm">
          대응책: 신도시 개발, 대중교통 확대(도시철도·BRT), 도시 재생, 공원·녹지 확보, 지역균형발전 정책 등.
        </p>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <ul className="list-disc list-inside space-y-1.5 text-sm">
          <li><strong>오개념 1.</strong> 「도시화 = 단순히 인구 증가」 → 도시화는 도시 인구의 「비율」. 농촌 인구가 줄어도 도시화율은 올라가요.</li>
          <li><strong>오개념 2.</strong> 「도시화율 100%가 목표」 → 100%는 농촌 소멸을 뜻해 식량·생태에 위험. 균형이 핵심.</li>
          <li><strong>오개념 3.</strong> 「큰 도시는 항상 좋다」 → 너무 커지면 혼잡 비용이 효율 이득을 넘어요(과대도시화).</li>
        </ul>
      </SectionCard>

      <SectionCard title="실생활 속 도시">
        <p>
          학생이 다니는 학교의 분포, 동네에 들어선 카페·편의점 밀도, 출퇴근·통학 거리 — 모두 도시 구조의 결과예요.
          「어디에 무엇을 둘까?」를 정하는 게 도시 계획이고, 시민의 의견이 반영될수록 좋은 도시가 만들어져요.
        </p>
      </SectionCard>

      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <KoreaRegionExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
