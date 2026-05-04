import { notFound } from 'next/navigation';
import { WorldContinentExplorer } from '@/components/interactive/social/WorldContinentExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'H7-GE-02';

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
          기후가 다르면 사람들이 사는 모습도 달라요. 더운 곳·추운 곳·건조한 곳·습한 곳 — 옷·집·먹거리·문화가 모두 그 환경에 맞춰 진화했어요.
        </p>
      </SectionCard>
      <SectionCard title="기후별 생활 모습">
        <p>
          <strong>열대기후</strong>(아프리카·동남아 적도): 1년 내내 더워서 얇은 옷, 통풍 잘 되는 집, 향신료 많은 음식.
          <strong>건조기후</strong>(사막·초원): 비가 적어 농사가 어려워 유목 생활, 진흙·흙벽돌집.
          <strong>온대기후</strong>(한국·유럽 일부): 사계절 뚜렷, 농사 다양, 계절별 의식주.
          <strong>냉대기후</strong>(북유럽·러시아): 긴 겨울, 두꺼운 옷, 통나무집, 보존 식품 발달.
          <strong>한대기후</strong>(북극·남극): 영하 기온, 가죽옷·이글루, 사냥·어업 위주.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "더운 나라는 다 가난" — 기후와 경제 수준은 직접 관계 X. 싱가포르·UAE는 열대지만 부유국.
          ❌ "한국은 사계절이 한국만의 특징" — 온대기후 지역(영국·일본·미국 동부 등)은 다 비슷.
          ❌ "이누이트는 늘 이글루에서 산다" — 현대 이누이트는 일반 주택에서 생활. 이글루는 사냥 임시거처였어요.
        </p>
      </SectionCard>
      <SectionCard title="기후 변화와 우리 생활">
        <p>
          최근 지구 평균 기온이 빠르게 오르며 기후가 바뀌고 있어요. 한국도 봄·가을이 짧아지고 여름이 길어지는 추세.
          작물 재배지가 북상해 사과 산지가 강원도로 이동, 제주에서 망고가 자라요.
          기후 변화는 단순히 더워지는 게 아니라 <strong>예측이 어려워지는 것</strong>이에요. 폭우·가뭄·한파가 같은 해에 번갈아 와요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <WorldContinentExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
