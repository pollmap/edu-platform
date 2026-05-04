import { notFound } from 'next/navigation';
import { OutlinePlannerExplorer } from '@/components/interactive/korean/OutlinePlannerExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'K-WR-02';

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
          { label: `학년 공통 / ${SUBJECT_LABEL[unit.subject]}`, href: `/common/${unit.subject}` },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          개요는 <strong>글의 설계도</strong>예요. 무턱대고 글쓰기에 들어가지 말고, 주제 → 핵심 메시지 → 가지(소주제) → 근거 순으로 짜고 시작하면 글이 흔들리지 않아요.
        </p>
      </SectionCard>
      <SectionCard title="개요 짜는 4단계">
        <p>
          ① <strong>주제 정하기</strong>: "무엇에 대해 쓸까?" 한 단어·한 구절로 좁히기.
          ② <strong>핵심 메시지</strong>: "이 글에서 가장 하고 싶은 말 한 줄"로 압축.
          ③ <strong>가지(소주제) 3-4개</strong>: 핵심을 받쳐 줄 큰 묶음.
          ④ <strong>근거·예시</strong>: 각 가지 아래 구체 사례·자료. 여기까지 짜면 글의 70%는 끝.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "개요는 시간 낭비, 바로 쓰자" — 개요 없이 쓰면 중간에 길을 잃어 다시 쓰는 시간이 더 들어요.
          ❌ "개요 = 목차" — 목차는 결과, 개요는 과정. 개요는 자유로이 가지치고 옮기는 작업.
          ❌ "한 번 짠 개요는 못 바꿔" — 글을 쓰다 더 좋은 흐름이 보이면 개요부터 수정.
        </p>
      </SectionCard>
      <SectionCard title="실생활 속 개요">
        <p>
          학교 보고서·발표 슬라이드·동아리 제안서·자기소개서 — 모두 개요 짜기로 시작해요.
          마인드맵 앱이나 종이에 직접 가지치기를 해 보면 더 명확해져요.
          기자들도 기사 쓰기 전에 리드(첫 문단) → 핵심 정보 → 부가 정보 순으로 개요를 잡고 들어가요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <OutlinePlannerExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
