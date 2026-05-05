import { notFound } from 'next/navigation';
import { IndustrializationDataExplorer } from '@/components/interactive/social/IndustrializationDataExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'H-KH2-02';

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
          광복 직후 1인당 GDP $80에서 출발한 한국이 60년 만에 세계 10위권 경제로 성장했어요.
          이 단원은 그 변화를 <strong>숫자로</strong> 보는 시간이에요. GDP, 도시화율, 출산율, 산업 구조 — 4가지 데이터만 따라가도 격동의 사회사가 보여요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 60년의 4가지 변곡점">
        <p>
          ① <strong>1962~ 경제 5개년 계획</strong>: 농업 → 경공업(섬유·신발) → 중화학공업(철강·조선) 단계 전환.
          ② <strong>1970년대 중화학공업화</strong>: 포항제철·울산공단·경부고속도로. 압축 성장의 인프라.
          ③ <strong>1997 외환위기</strong>: 재벌 구조조정·IMF 구제금융. 「샐러리맨 시대」의 끝, 「청년 실업」의 시작.
          ④ <strong>2000년대 이후</strong>: IT·반도체·문화콘텐츠 중심으로 산업 구조 재편. 동시에 저출산·고령화·양극화의 새 과제.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "한강의 기적 = 정부 주도 만의 결과" — 노동자·기업·해외 동포의 송금·교육 투자 등 다층적 요인의 결합이었어요.
          ❌ "도시화 = 발전" — 도시 집중은 농촌 공동화·주택난·교통난·환경 문제를 동반했어요.
          ❌ "출산율 하락 = 청년 탓" — 주거비·고용·돌봄·사회 구조의 누적 결과예요. 단일 원인 설명은 위험해요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          한국은행·통계청 데이터로 한국 사회를 「숫자로 읽는」 훈련은 사회과학·경영학 모두의 기초예요.
          수능 한국사·경제 융합 문항, 공무원 한국사·경제 모두 「산업화 단계 + 데이터」를 묶어서 묻는 경향이에요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <IndustrializationDataExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
