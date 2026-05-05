import { notFound } from 'next/navigation';
import { SupplyDemandExplorer } from '@/components/interactive/social/SupplyDemandExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'H6-SO-02';

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
          한국 경제는 1960년대부터 50년 만에 <strong>농업 중심에서 제조·반도체·문화 산업 중심</strong>으로
          바뀌었어요. 빠른 성장 뒤에는 환경 오염·지역 격차·청년 일자리 같은 새로운 과제도 함께 자라났어요.
        </p>
      </SectionCard>
      <SectionCard title="한국 경제 성장의 4단계">
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li><strong>1960~70년대</strong> — 가발·신발·옷 같은 가벼운 공업</li>
          <li><strong>1980년대</strong> — 자동차·배·철강 같은 무거운 공업</li>
          <li><strong>1990~2000년대</strong> — 반도체·휴대전화·인터넷</li>
          <li><strong>2010년대~</strong> — K-팝·게임·콘텐츠·바이오</li>
        </ul>
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
          경제 성장은 <strong>가격이 결정되는 원리(수요·공급)</strong>를 이해하면 더 잘 보여요.
          공급이 늘면 가격이 내려가고, 수요가 폭발하면 가격이 오르는 흐름이 모든 시장의 기본이에요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <SupplyDemandExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
