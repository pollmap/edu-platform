import { notFound } from 'next/navigation';
import { EnglishWritingBuilder } from '@/components/interactive/english/EnglishWritingBuilder';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'E-CE1-03';

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
          영작은 <strong>구조 먼저, 표현은 나중</strong>. 단어를 모아 문장을 만드는 게 아니라,
          단락의 5블록(주제문 → 근거 2개 → 예시 → 마무리)부터 짜고 채우는 순서가 자연스러운 영어 단락을 만들어요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 단락 5블록">
        <p>
          ① <strong>Topic Sentence</strong>: 단락의 핵심 주장 한 문장. ② <strong>Reason 1</strong>: First/One reason…
          ③ <strong>Reason 2</strong>: In addition/Also… (첫 번째와 다른 각도). ④ <strong>Specific Example</strong>:
          For instance/A study showed… ⑤ <strong>Closing Sentence</strong>: Therefore/In conclusion…
          연결어(transition)를 정확히 쓰면 글의 흐름이 자동으로 매끄러워져요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "단어를 많이 알아야 잘 쓸 수 있다" — 어휘력보다 구조가 더 큰 차이를 만들어요.
          ❌ "긴 문장이 좋은 영작이다" — 영문 단락은 짧고 명확한 문장 + 분명한 연결어가 더 좋은 평가를 받아요.
          ❌ "예시는 빼도 된다" — 추상적 주장만 있으면 설득력이 약해요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          유학 자기소개서·해외 대학 에세이·국제 공모전 — 모두 5블록 구조가 기본. 수능에서는 단락 요약·문장 배열 문제가
          이 구조의 이해를 평가해요. 아래 빌더로 직접 5블록을 채워 단락을 완성해 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <EnglishWritingBuilder />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
