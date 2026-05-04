import Link from 'next/link';
import { HomeProgress } from '@/components/primitives/HomeProgress';
import { CURRICULUM, HIGHSCHOOL_UNITS } from '@/lib/curriculum';

export default function Home() {
  const totalUnits = CURRICULUM.length + HIGHSCHOOL_UNITS.length;
  const draftUnits = CURRICULUM.filter((u) => u.status !== 'planned').length +
    HIGHSCHOOL_UNITS.filter((u) => u.status !== 'planned').length;

  return (
    <main className="container mx-auto max-w-6xl px-4 py-8">
      <section className="va-hero">
        <h1 className="va-hero__title">Edu Wiki</h1>
        <p className="va-hero__subtitle">초3부터 고3까지, 인터랙티브 학습의 모든 것</p>
        <div className="va-hero__stats">
          <div className="va-hero__stat">
            <div className="va-hero__stat-value">{totalUnits}</div>
            <div className="va-hero__stat-label">단원</div>
          </div>
          <div className="va-hero__stat">
            <div className="va-hero__stat-value">{draftUnits}+</div>
            <div className="va-hero__stat-label">인터랙티브</div>
          </div>
          <div className="va-hero__stat">
            <div className="va-hero__stat-value">5</div>
            <div className="va-hero__stat-label">과목</div>
          </div>
          <div className="va-hero__stat">
            <div className="va-hero__stat-value">10</div>
            <div className="va-hero__stat-label">학년</div>
          </div>
        </div>
      </section>

      <section className="va-feature-grid">
        <Link href="/grade-3" className="va-feature-card">
          <div className="va-feature-card__num">01</div>
          <div className="va-feature-card__title">수학</div>
          <div className="va-feature-card__desc">
            수와 연산 · 변화와 관계 · 도형 · 측정 · 자료
          </div>
          <div className="va-feature-card__arrow">→</div>
        </Link>

        <Link href="/grade-3/science" className="va-feature-card">
          <div className="va-feature-card__num">02</div>
          <div className="va-feature-card__title">과학</div>
          <div className="va-feature-card__desc">
            물질 · 운동·에너지 · 생명 · 지구·우주
          </div>
          <div className="va-feature-card__arrow">→</div>
        </Link>

        <Link href="/common/korean" className="va-feature-card">
          <div className="va-feature-card__num">03</div>
          <div className="va-feature-card__title">국어</div>
          <div className="va-feature-card__desc">
            듣기·말하기 · 읽기 · 쓰기 · 문법 · 문학
          </div>
          <div className="va-feature-card__arrow">→</div>
        </Link>

        <Link href="/common/english" className="va-feature-card">
          <div className="va-feature-card__num">04</div>
          <div className="va-feature-card__title">영어</div>
          <div className="va-feature-card__desc">
            발음 · 어휘 · 문법 · 듣기·말하기·읽기·쓰기
          </div>
          <div className="va-feature-card__arrow">→</div>
        </Link>

        <Link href="/grade-3/social" className="va-feature-card">
          <div className="va-feature-card__num">05</div>
          <div className="va-feature-card__title">사회</div>
          <div className="va-feature-card__desc">
            지리 · 역사 · 일반사회 · 경제 · 정치
          </div>
          <div className="va-feature-card__arrow">→</div>
        </Link>

        <Link href="/highschool" className="va-feature-card">
          <div className="va-feature-card__num">06</div>
          <div className="va-feature-card__title">고등학교</div>
          <div className="va-feature-card__desc">
            학점제 · 공통 · 일반선택 · 진로선택 · 융합선택
          </div>
          <div className="va-feature-card__arrow">→</div>
        </Link>
      </section>

      <div className="va-cta">
        <Link href="/grade-3" className="va-cta__link va-cta__link--primary">
          학습 시작하기 →
        </Link>
        <Link href="/grade-9/math/M9-CR-03" className="va-cta__link va-cta__link--ghost">
          파일럿 — 이차함수
        </Link>
        <Link href="/common/korean/K-GR-01" className="va-cta__link va-cta__link--ghost">
          한글 자모 체계
        </Link>
      </div>

      <section className="mt-12">
        <HomeProgress totalUnits={totalUnits} />
      </section>

      <div className="va-disclaimer">
        <div className="va-disclaimer__title">데이터 출처 및 라이선스</div>
        <p className="va-disclaimer__body">
          단원 메타데이터는 NCIC 2022 개정 교육과정 마스터 인덱스를 기반으로, 인터랙티브 콘텐츠는 자체 제작입니다.
          위키백과 요약(생물·지리·역사·인물·행성)은 CC BY-SA 3.0 라이선스로 출처를 표기합니다.
        </p>
        <p className="va-disclaimer__note">
          본 사이트는 개인 학습 보조용으로 제작되었으며, 디즈니·픽사·지브리 등 저작권 캐릭터, 노래 가사, 문학 작품 본문은 일체 사용하지 않습니다.
        </p>
      </div>
    </main>
  );
}
