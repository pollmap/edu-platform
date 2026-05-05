import { notFound } from 'next/navigation';
import { ColdWarTimeline } from '@/components/interactive/social/ColdWarTimeline';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'H-MW';

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
          1945년 이후의 세계사는 <strong>「양극 대결 → 단극 세계화 → 다극 경쟁」</strong>의 세 시기로 정리돼요.
          냉전·세계화·9·11 이후 — 80년 동안 세계는 세 번 큰 국면 전환을 겪었고, 한국은 그 한복판에 있었어요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 세 국면">
        <p>
          ① <strong>냉전(1947~1991)</strong>: 미·소 양극 대결. 한국전쟁·베트남전·쿠바 미사일 위기. 핵무기·우주 경쟁.
          ② <strong>세계화(1991~2008)</strong>: 미국 단극, WTO·EU 등 제도 통합 가속. 중국의 부상.
          ③ <strong>21세기 다극(2001~)</strong>: 9·11, 이라크전, 글로벌 금융위기, 코로나19, 우크라이나 전쟁. 강대국 경쟁의 재등장.
          이 세 국면 사이의 「전환점」(베를린 장벽·9·11·금융위기)이 시험·뉴스 모두의 핵심이에요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "냉전은 진짜 전쟁이 아니었다" — 한국전·베트남전 같은 「열전」이 끊임없이 있었어요. 그저 강대국이 직접 충돌하지 않았을 뿐.
          ❌ "세계화 = 모두에게 좋다" — 평균은 좋아졌어도 분배는 매우 불균등했어요. 이게 21세기 반세계화·포퓰리즘의 토양이에요.
          ❌ "테러리즘 = 9·11에서 시작" — 19세기 무정부주의 테러부터 다양한 형태가 있었어요. 9·11은 「국제 안보」 의제화의 분기점일 뿐.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          수능 세계사·통합사회: 「데탕트의 의미」, 「9·11 이후 국제질서 변화」, 「세계화의 명암」.
          현재 진행 중인 미·중 경쟁, 우크라이나 전쟁, AI·기술 패권 같은 문제도 결국 이 세 국면의 연장에서 이해할 수 있어요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <ColdWarTimeline />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
