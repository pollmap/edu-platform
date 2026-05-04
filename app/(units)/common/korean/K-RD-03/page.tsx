import { notFound } from 'next/navigation';
import { InferenceStepsExplorer } from '@/components/interactive/korean/InferenceStepsExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'K-RD-03';

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
          글에 직접 쓰여 있지 않은 정보를 <strong>단서 + 배경지식</strong>으로 알아내는 게 추론이에요. 더 나아가 글의 주장과 근거를 <strong>비판적</strong>으로 점검하는 능력이 비판적 읽기.
        </p>
      </SectionCard>
      <SectionCard title="추론 3단계">
        <p>
          ① <strong>단서 찾기</strong>: 글의 표현·맥락에서 힌트가 되는 부분을 모음.
          ② <strong>배경지식 결합</strong>: 내가 이미 아는 것과 단서를 합쳐 가설을 세움.
          ③ <strong>검증</strong>: 다른 단서와 모순되지 않는지 확인. 근거가 부족하면 추론을 수정.
          이 과정을 머릿속에서 자동으로 돌리려면 연습이 필요해요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "추론 = 자기 마음대로" — 단서가 받쳐 줘야 추론. 근거 없으면 그냥 짐작.
          ❌ "비판 = 무조건 반대" — 비판적 읽기는 "맹목적 동의도, 반대도 X"입니다. 사실/주장 구분 + 근거 평가.
          ❌ "글에 적힌 게 무조건 옳다" — 책·뉴스도 잘못된 정보가 있어요. 출처와 일관성을 점검.
        </p>
      </SectionCard>
      <SectionCard title="실생활 속 추론·비판적 읽기">
        <p>
          뉴스, SNS, 광고를 마주칠 때마다 추론·비판이 작동해야 해요. "이 광고가 보여주지 않은 부분은?", "이 뉴스의 출처는 믿을 만한가?".
          가짜 뉴스·과장 광고에 휩쓸리지 않으려면 비판적 읽기가 평생 무기가 돼요. 시험 지문에서 "글쓴이의 숨은 의도"를 묻는 문제도 결국 추론·비판 능력 측정이에요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <InferenceStepsExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
