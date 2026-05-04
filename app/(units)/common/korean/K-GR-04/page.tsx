import { notFound } from 'next/navigation';
import { SentenceComponentTree } from '@/components/interactive/korean/SentenceComponentTree';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'K-GR-04';

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
          문장 안에서 단어들이 맡은 역할을 <strong>문장 성분</strong>이라고 해요.
          주어·서술어가 뼈대, 목적어·보어가 살, 관형어·부사어·독립어가 색채를 더해요.
        </p>
      </SectionCard>
      <SectionCard title="7가지 문장 성분">
        <p>
          주성분(필수): <strong>주어</strong>(누가/무엇이) · <strong>서술어</strong>(어찌하다/어떠하다) · <strong>목적어</strong>(을/를) · <strong>보어</strong>(되다/아니다 앞).
          부속 성분: <strong>관형어</strong>(체언 꾸밈) · <strong>부사어</strong>(용언/문장 꾸밈).
          독립 성분: <strong>독립어</strong>(아/네/호명).
          품사가 단어의 종류라면, 성분은 단어가 문장 안에서 맡은 역할이에요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "주어 = 첫 단어" — 위치와 무관해요. "오늘은 비가 온다" 에서 주어는 &apos;비가&apos;.
          ❌ "조사 떼면 주어" — 보조사가 붙은 &apos;나도, 학교는&apos;도 주어가 될 수 있어요. 격조사 &apos;이/가&apos;가 늘 붙는 건 아닙니다.
          ❌ "한 단어 = 한 성분" — 여러 단어가 묶여 한 성분이 되기도 (구·절). "키 큰 친구가 왔다"에서 &apos;키 큰 친구가&apos;가 주어 묶음.
        </p>
      </SectionCard>
      <SectionCard title="왜 성분을 알아야 할까?">
        <p>
          글 다듬기·문법 시험·외국어 배우기에 모두 쓰여요. 어색한 문장은 보통 성분이 비거나(주어·서술어 빠짐) 짝이 안 맞을 때(주어·서술어 호응) 생겨요.
          영어의 SVO·일본어의 SOV 어순 차이를 이해하는 것도 결국 문장 성분 감각에서 출발합니다.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <SentenceComponentTree />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
