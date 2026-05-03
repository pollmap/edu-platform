# 프로젝트 아키텍처: Vercel 통합 웹앱

## 1. 기술 스택 결정

| 영역 | 선택 | 이유 |
|------|------|------|
| 프레임워크 | **Next.js 15 (App Router)** | Vercel 1차 시민, MDX 콘텐츠, ISR/SSG, 한국어 SEO 우수 |
| 언어 | TypeScript | 단원 메타데이터 타입 안전성 |
| 스타일 | Tailwind CSS + shadcn/ui | 빠른 양산, 통일된 디자인 토큰 |
| 콘텐츠 | MDX (단원 설명) + React 컴포넌트 (인터랙티브) | 텍스트와 인터랙티브 자연스럽게 결합 |
| 수학 시각화 | **react-konva** (2D 도형) + **plotly.js** 또는 **recharts** (그래프) + **MathJax/KaTeX** (수식) | 2D 인터랙티브의 표준 |
| 3D 시각화 | **three.js + react-three-fiber** | 3D 도형·천체·지구과학 단원 |
| 물리 시뮬레이션 | **matter.js** | 운동·중력·충돌 |
| 음성 (영어) | **Web Speech API** (TTS, 무료, 브라우저 내장) | 별도 비용 0 |
| 데이터 시각화 | **d3.js** | 사회·과학 데이터 (지도·타임라인) |
| 지도 | **leaflet + 한국 행정구역 GeoJSON** | 사회·지리 |
| 상태 관리 | **Zustand** + URL 쿼리 파라미터 | 단원 진도 저장 (localStorage 활용 - Vercel SSR 환경) |
| DB (선택) | **Supabase** 또는 **Vercel KV** | 진도 동기화 (다기기 사용 시) |
| 배포 | **Vercel** | 사용자 지정 |

---

## 2. 디렉토리 구조

```
edu-platform/
├── app/
│   ├── layout.tsx                    # 루트 레이아웃 (네비게이션·테마)
│   ├── page.tsx                      # 홈 (학년 선택)
│   ├── [grade]/
│   │   ├── page.tsx                  # 학년 메인 (과목 선택)
│   │   └── [subject]/
│   │       ├── page.tsx              # 과목 단원 목록
│   │       └── [unitId]/
│   │           └── page.tsx          # 단원 상세 (MDX + 인터랙티브)
│   ├── api/                          # API 라우트 (진도 저장 등)
│   └── search/page.tsx               # 단원 검색
├── content/                          # MDX 콘텐츠 (단원 설명)
│   ├── math/
│   │   ├── grade3/
│   │   │   ├── M3-NA-01.mdx
│   │   │   └── ...
│   │   └── grade4/
│   ├── science/
│   ├── korean/
│   ├── english/
│   └── social/
├── components/
│   ├── ui/                           # shadcn/ui 기본 컴포넌트
│   ├── layout/                       # 헤더·사이드바·푸터
│   ├── interactive/                  # 인터랙티브 컴포넌트 (재사용 가능)
│   │   ├── math/
│   │   │   ├── QuadraticFunctionExplorer.tsx   # ★ 사용자 요청
│   │   │   ├── LinearFunctionExplorer.tsx
│   │   │   ├── FractionBar.tsx
│   │   │   ├── PlaceValueBlocks.tsx
│   │   │   ├── PythagoreanProof.tsx
│   │   │   ├── UnitCircle.tsx
│   │   │   └── ...
│   │   ├── science/
│   │   │   ├── ParticleSimulator.tsx
│   │   │   ├── CircuitBuilder.tsx
│   │   │   ├── PhaseChangeGraph.tsx
│   │   │   ├── SolarSystem3D.tsx
│   │   │   └── ...
│   │   ├── korean/
│   │   │   ├── HangulComposer.tsx
│   │   │   ├── SentenceTreeBuilder.tsx
│   │   │   └── ...
│   │   ├── english/
│   │   │   ├── TenseTimeline.tsx
│   │   │   ├── ActivePassiveConverter.tsx
│   │   │   └── ...
│   │   └── social/
│   │       ├── KoreanHistoryTimeline.tsx
│   │       ├── KoreaMap.tsx
│   │       ├── SupplyDemandCurve.tsx
│   │       └── ...
│   └── primitives/                   # 공용 빌딩블록
│       ├── Slider.tsx
│       ├── PlayButton.tsx
│       ├── ResetButton.tsx
│       ├── MathFormula.tsx           # KaTeX 래퍼
│       └── InteractiveCanvas.tsx
├── lib/
│   ├── curriculum.ts                 # 단원 메타데이터 (마스터 인덱스의 코드 표현)
│   ├── progress.ts                   # 진도 저장 로직
│   └── utils.ts
├── public/
│   ├── data/                         # 정적 데이터 (GeoJSON·역사 데이터셋)
│   └── assets/
├── styles/
│   └── globals.css
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── vercel.json
```

---

## 3. 데이터 모델 (lib/curriculum.ts)

```typescript
export type Subject = 'math' | 'science' | 'korean' | 'english' | 'social';
export type Grade = 3 | 4 | 5 | 6 | 7 | 8 | 9; // 7=중1, 8=중2, 9=중3
export type Priority = 'P0' | 'P1' | 'P2';

export interface Unit {
  id: string;                        // 'M9-CR-03' (이차함수)
  subject: Subject;
  grade: Grade;
  domain: string;                    // '변화와 관계'
  domainCode: string;                // 'CR'
  title: string;                     // '이차함수'
  interactiveTitle: string;          // 'a·b·c 슬라이더'
  priority: Priority;
  prerequisites: string[];           // ['M8-CR-04', 'M9-CR-01']
  achievementStandards: string[];    // 2022 개정 성취기준 코드
  componentName: string;             // 'QuadraticFunctionExplorer'
  status: 'planned' | 'draft' | 'reviewed' | 'published';
}

export const CURRICULUM: Unit[] = [
  // 마스터 인덱스 → 자동 생성 (스크립트로 변환)
];
```

> 마스터 인덱스 마크다운을 자동 파싱해 이 배열을 생성하는 스크립트도 Claude Code에서 작성

---

## 4. 라우팅 설계

| URL 패턴 | 의미 | 예시 |
|---------|------|------|
| `/` | 홈 (학년·과목 그리드) | `/` |
| `/[grade]` | 학년 메인 | `/grade-9` |
| `/[grade]/[subject]` | 과목 단원 목록 | `/grade-9/math` |
| `/[grade]/[subject]/[unitId]` | 단원 상세 | `/grade-9/math/M9-CR-03` |
| `/search?q=이차함수` | 검색 | `/search?q=quadratic` |
| `/dashboard` | 진도 대시보드 | `/dashboard` |

> 학년 segment는 `grade-3` ~ `grade-9` (하이픈 형식, URL 가독성)

---

## 5. 단원 페이지 표준 구조

각 단원 페이지(`app/[grade]/[subject]/[unitId]/page.tsx`)는 다음 5개 슬롯:

1. **단원 헤더**: 학년·과목·단원명·우선순위 배지
2. **선수 학습**: 의존하는 이전 단원 링크 카드 (예: 이차함수 → 일차함수)
3. **개념 설명** (MDX): 처음 보는 사람도 이해 가능한 본질적 설명
4. **인터랙티브** (React 컴포넌트): 핵심 시각화·조작
5. **연습 문제** (Phase 3): 자가 점검

---

## 6. 디자인 시스템

### 색상 (Tailwind 커스텀 토큰)

| 역할 | 색상 | Tailwind |
|------|------|---------|
| 수학 | 파랑 | `blue-600` |
| 과학 | 초록 | `green-600` |
| 국어 | 빨강 | `red-600` |
| 영어 | 보라 | `purple-600` |
| 사회 | 주황 | `orange-600` |
| 강조 (포인트) | 노랑 | `yellow-400` |

### 타이포그래피
- 본문: Pretendard (한국어 가독성 최상)
- 코드/수식: JetBrains Mono
- 헤딩: Pretendard Bold

### 반응형 브레이크포인트
- mobile: ~640px (한 컬럼, 인터랙티브 단순화)
- tablet: 640~1024px (조카 사용 디바이스 가정)
- desktop: 1024px+

> **주의**: 조카가 태블릿/모바일로 사용할 가능성 높음 → 인터랙티브는 **터치 인터랙션 우선** 설계

---

## 7. Vercel 배포 설정 (vercel.json)

```json
{
  "buildCommand": "next build",
  "framework": "nextjs",
  "regions": ["icn1"],
  "functions": {
    "app/api/**/route.ts": { "maxDuration": 10 }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" }
      ]
    }
  ]
}
```

> `icn1` = 서울 리전. 한국 사용자 응답 속도 최적

---

## 8. 성능 전략

- **단원 페이지는 정적 생성(SSG)**: `generateStaticParams`로 빌드 타임에 약 200개 페이지 prerender
- **인터랙티브 컴포넌트는 동적 import**: `next/dynamic` + `ssr: false` (3D·물리 라이브러리는 서버 렌더 의미 없음)
- **이미지는 next/image**: AVIF/WebP 자동 변환
- **MDX는 빌드 타임 컴파일**: `@next/mdx`

---

## 9. 단계별 구축 순서 (Claude Code 작업 단위)

| 단계 | 결과물 | 추정 작업량 |
|------|--------|------------|
| Step 0 | `npx create-next-app` + Tailwind + shadcn 초기화 + Vercel 연결 | 30분 |
| Step 1 | `lib/curriculum.ts` 자동 생성 (마스터 인덱스 → TS 변환 스크립트) | 1시간 |
| Step 2 | 라우팅 골격 (홈·학년·과목·단원 페이지 빈 템플릿) | 2시간 |
| Step 3 | 디자인 시스템 (헤더·사이드바·테마) | 2시간 |
| Step 4 | 인터랙티브 primitives (Slider·MathFormula·Canvas 베이스) | 3시간 |
| Step 5 | **인터랙티브 양산 단계** (단원당 1~2개 컴포넌트) | 메인 작업 |
| Step 6 | 진도 트래커 (localStorage) | 4시간 |
| Step 7 | 검색·태그 필터 | 4시간 |
| Step 8 | 평가 모듈 (Phase 3) | 별도 |

---

## 10. 보안·개인정보

- **로그인 없음 (초기)**: 진도는 localStorage. 조카가 다기기 사용한다면 Phase 2에서 Supabase 도입.
- **Analytics**: Vercel Analytics 또는 Plausible (개인정보 친화)
- **저작권**: 디즈니/픽사/지브리 등 IP 일러스트 절대 사용 금지. unDraw·OpenPeeps 사용
- **외부 임베드 금지**: 광고·트래커 일체 없음

---

# 부록: 고등학교 (학점제) 라우팅·구조 갱신

## 11. 고등 라우팅 추가

| URL 패턴 | 의미 | 예시 |
|---------|------|------|
| `/highschool` | 고등 메인 (4단계 + 5과목 그리드) | `/highschool` |
| `/highschool/[subject]` | 과목군 메인 | `/highschool/math` |
| `/highschool/[subject]/[course]` | 과목 내 단원 목록 | `/highschool/math/calculus-1` |
| `/highschool/[subject]/[course]/[unitId]` | 단원 상세 | `/highschool/math/calculus-1/M-CA1-06` |

> course slug 매핑은 lib/curriculum.ts에 정의

## 12. 데이터 모델 확장

```typescript
// 고등 단원 추가 필드
export interface HighSchoolUnit extends Unit {
  schoolLevel: 'highschool';
  category: 'common' | 'general' | 'career' | 'fusion';   // 공통/일반선택/진로선택/융합선택
  course: string;                                          // 'calculus-1' (slug)
  courseName: string;                                      // '미적분Ⅰ'
  credits: number;                                         // 4 (학점)
  evaluation: 'absolute' | 'relative';                     // 절대평가/상대평가
}
```

## 13. 컴포넌트 디렉토리 추가

```
components/interactive/
├── math/
│   ├── ... (기존 초~중)
│   └── highschool/
│       ├── DerivativeExplorer.tsx       # M-CA1-03 미분계수
│       ├── RiemannSum.tsx              # M-CA1-06 정적분
│       ├── RotatingSolid.tsx           # M-CA1-07 회전체
│       ├── MatrixTransform.tsx         # M-AM-04 행렬
│       ├── GradientDescent.tsx         # M-AM-05 경사하강법
│       └── ...
├── science/
│   └── highschool/
│       ├── MoleculeViewer3D.tsx        # S-CHE-04 VSEPR
│       ├── ProjectileMotion.tsx        # S-PHY-01 운동
│       ├── DNAReplication.tsx          # S-GEN
│       ├── KeplersLaws.tsx            # S-EAR-03
│       └── ...
└── ...
```

## 14. 새 라이브러리 추가

```bash
# 분자 시각화
npm i 3dmol            # 또는 ngl

# 추가 수학 시각화
npm i mathjs           # 행렬·미적분 계산
npm i mathjax-full     # 복잡한 수식 (KaTeX 보완)

# 천체 시뮬레이션 도우미
npm i astronomy-engine  # 행성 위치 계산 (선택)
```

## 15. 메뉴 구조 (헤더 네비게이션)

```
[홈] [초·중] [고등] [검색] [진도] [관리]
       ↓        ↓
    [학년 그리드] [4단계 + 과목 그리드]
                   - 공통 과목
                   - 일반 선택
                   - 진로 선택
                   - 융합 선택
                   각각 5과목군
```

## 16. 모바일에서 무거운 인터랙티브 처리

다음 컴포넌트는 모바일에서 자동 비활성화 또는 단순화:
- 3D 분자/회전체 (three.js)
- 다체 천체역학 시뮬레이션
- 대량 입자 시뮬레이션

```typescript
const isMobile = useMediaQuery('(max-width: 640px)');
return isMobile ? <SimplifiedFallback /> : <Heavy3DComponent />;
```
