import { notFound } from 'next/navigation';
import { ScienceTechTimeline } from '@/components/interactive/science/ScienceTechTimeline';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'S9-EU-02';

export function generateMetadata() {
  const unit = findUnit(UNIT_ID);
  if (!unit) return {};
  return makeUnitMetadata(unit);
}

export default function Page() {
  const unit = findUnit(UNIT_ID);
  if (!unit || unit.schoolLevel === 'highschool' || unit.grade === undefined) {
    notFound();
  }

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
          과학기술의 진보는 「가속」해요. 불 발견부터 농업까지 49만 년, 농업부터 인쇄술까지 1만 년, 인쇄술부터
          인터넷까지 540년, 인터넷부터 ChatGPT까지 53년.
        </p>
      </SectionCard>

      <SectionCard title="문명을 바꾼 5대 혁명">
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>농업혁명</strong> (BC 10000): 정착 → 도시·국가</li>
          <li><strong>산업혁명</strong> (1769~): 증기·전기 → 대량생산</li>
          <li><strong>녹색혁명</strong> (1940~): 비료·품종 개량 → 인구 폭증 가능</li>
          <li><strong>정보혁명</strong> (1947~): 트랜지스터·인터넷 → 지식 즉시 공유</li>
          <li><strong>AI 혁명</strong> (2017~): 딥러닝·LLM → 인지노동 자동화</li>
        </ul>
      </SectionCard>

      <SectionCard title="과학기술 타임라인">
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <ScienceTechTimeline />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard title="과학의 양면성">
        <p>
          페니실린은 수억 명을 살렸지만, 핵에너지는 도시를 지웠어요. 인터넷은 지식을 평등하게 했지만 가짜뉴스도
          퍼뜨렸어요. 과학기술 자체엔 선악이 없고, 「어떻게 쓰느냐」가 인류의 선택이에요. 그래서 과학자에게
          「윤리」가 필요해요.
        </p>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
