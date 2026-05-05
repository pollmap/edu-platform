import { notFound } from 'next/navigation';
import { MediaLiteracyExplorer } from '@/components/interactive/korean/MediaLiteracyExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'K-MD-02';

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
          미디어 리터러시는 <strong>매체 메시지를 비판적으로 읽고, 책임감 있게 만들어 내는 힘</strong>이에요.
          가짜 뉴스·낚시 제목·딥페이크가 넘치는 시대에서 가장 강력한 자기 보호 도구이기도 해요.
        </p>
      </SectionCard>
      <SectionCard title="가짜 뉴스 판별 5단계 체크리스트">
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li><strong>① 출처</strong> — 누가 만들었나? 알려진 언론사인가, 익명 채널인가</li>
          <li><strong>② 날짜</strong> — 최근 정보인가, 옛 사건을 다시 퍼뜨린 건가</li>
          <li><strong>③ 근거</strong> — 통계·인용·원문 링크가 있는가</li>
          <li><strong>④ 감정</strong> — 분노·두려움을 자극하는 표현이 과하지 않나</li>
          <li><strong>⑤ 교차</strong> — 다른 매체에서도 같은 내용을 보도하는가</li>
        </ul>
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
          한 가지 단계에서 의심이 들면 <strong>퍼 나르기 전에 멈추기</strong>가 가장 좋은 습관이에요.
          내가 한 번 클릭하면 알고리즘이 같은 내용을 더 많이 보여줘요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <MediaLiteracyExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
