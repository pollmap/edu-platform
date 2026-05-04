import { notFound } from 'next/navigation';
import { KoreanHistoryTimeline } from '@/components/interactive/social/KoreanHistoryTimeline';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'H-HI-02';

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
          기원 전후 한반도와 만주에서 <strong>고구려·백제·신라</strong> 세 나라가 다투며 자라났고,
          7세기 후반 신라가 당과 손잡고 통일을 이룬 뒤, 옛 고구려 땅엔{' '}
          <strong>발해</strong>가 일어나 <strong>남북국 시대</strong>가 시작돼요.
        </p>
      </SectionCard>
      <SectionCard title="왜 이 시기를 따로 보나">
        <p>
          이 시기에 한반도 사람들의 정치·문화 틀이 거의 잡혔어요.
          중앙집권 국가 운영, 율령(법령) 정비, 불교 도입과 예술,
          그리고 한반도 안에서 끝나지 않고 만주까지 뻗은 <strong>발해</strong>의 존재까지 — 모두 이때 자리잡은 거예요.
        </p>
        <p>
          남북국이라는 표현은 <strong>북쪽 발해 + 남쪽 통일신라</strong>를 같은 시기 우리 역사로 함께 본다는 뜻이에요.
          교과서가 "통일신라만의 시대"가 아니라 "남북국 시대"라고 부르는 이유가 여기에 있어요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오해">
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-zinc-700 dark:text-zinc-300">
          <li>
            <strong>"신라가 삼국을 통일했으니 한반도 전체가 신라"</strong> — 아니에요. 옛 고구려 영토 대부분은 신라가 차지하지 못했고, 그 자리에서 <strong>발해</strong>가 일어났어요.
          </li>
          <li>
            <strong>"백제는 처음부터 약한 나라"</strong> — 아니에요. 4세기 근초고왕 때는 고구려를 압박할 만큼 강했고, 일본 야마토 정권에 영향을 끼쳤어요.
          </li>
          <li>
            <strong>"발해는 한국사가 아니다"</strong> — 발해 지배층은 옛 고구려 출신이고 스스로 고구려 계승을 표방했어요. 그래서 한국사로 다뤄요.
          </li>
        </ul>
      </SectionCard>
      <SectionCard title="실생활 속 흔적">
        <p className="text-sm text-zinc-700 dark:text-zinc-300">
          경주 불국사·석굴암(통일신라), 부여·공주의 무령왕릉(백제), 광개토대왕릉비(고구려), 발해 상경성 유적(중국 헤이룽장 부근).
          전라도·경상도 지명 중 일부는 그 시기 행정 구역 이름이 그대로 굳어진 거예요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <KoreanHistoryTimeline />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
