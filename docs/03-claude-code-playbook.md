# Claude Code 작업 매뉴얼: 인터랙티브 양산 플레이북

> 이 문서는 Claude Code 앞에 앉은 당신이 488 단원의 인터랙티브를 일관되게 양산하기 위한 SOP다.
> **CLAUDE.md**(프로젝트 루트)에 이 문서 핵심을 박아두면 매번 컨텍스트 주지 않아도 일관된 결과가 나온다.

---

## 0. 프로젝트 부트스트랩 (1회만)

Claude Code에 다음을 차례로 시킨다:

```
1. Next.js 15 + TypeScript + Tailwind + App Router로 프로젝트 초기화
2. shadcn/ui 설치 (slider, button, card, badge, tabs)
3. 라이브러리 설치:
   npm i recharts plotly.js react-plotly.js three @react-three/fiber @react-three/drei
   npm i konva react-konva matter-js leaflet react-leaflet
   npm i d3 framer-motion @dnd-kit/core @dnd-kit/sortable react-flow
   npm i katex react-katex zustand
   npm i @next/mdx @mdx-js/loader @mdx-js/react
4. lib/curriculum.ts 생성 — 00-MASTER-INDEX.md를 파싱해 Unit[] 자동 생성
5. Vercel 연결: vercel link → vercel
```

---

## 1. CLAUDE.md (프로젝트 루트에 두는 영구 컨텍스트)

```markdown
# 프로젝트: 한국 초3~고3 인터랙티브 교육 플랫폼

## 목적
2022 개정 교육과정 기준 5과목(국영수사과) 핵심 개념을 인터랙티브로 시각화한다.
조카(초3~고3) 학습용 단일 웹앱.

## 핵심 원칙
1. **데이터 정직성**: 단원 정보는 NCIC 원문 기준. 추측·할루시네이션 금지.
2. **저작권 안전**: 디즈니/픽사/지브리/마블/만화/노래가사 일체 사용 금지.
   문학 작품 본문 인용 금지(구조·주제만 다룸). 일러스트는 unDraw·OpenPeeps만.
3. **본질 우선**: 화려한 애니메이션보다 개념의 핵심이 보이는 시각화.
4. **모바일 우선**: 슬라이더·터치 영역 최소 44px. aspect-ratio 1:1 또는 4:3.
5. **즉시 반응**: 입력 → 결과 100ms 이내.

## 기술 스택
Next.js 15 App Router, TypeScript, Tailwind, shadcn/ui, recharts, three.js, konva, matter.js, KaTeX

## 디렉토리
- content/ : MDX 단원 설명
- components/interactive/{과목}/ : 인터랙티브 React 컴포넌트
- lib/curriculum.ts : 단원 메타데이터

## 색상 토큰
math=blue-600, science=green-600, korean=red-600, english=purple-600, social=orange-600

## 작업 단위
1단원 = MDX 1개(설명) + Component 1~2개(인터랙티브) + 라우팅 페이지 1개

## 검증 단계
단원 작업 시작 전:
1. NCIC에서 해당 단원 성취기준 재확인 (curl 또는 fetch)
2. 20가지 패턴 중 어떤 패턴이 적절한지 02-component-catalog.md 참조
3. 선수학습 단원 (prerequisites) 링크 체크
```

---

## 2. 단원 1개 작업 표준 절차 (8단계)

### Step 1. 단원 메타 확인
```
1. 00-MASTER-INDEX.md에서 단원 ID 찾기 (예: M9-CR-03 이차함수)
2. lib/curriculum.ts의 해당 Unit 객체 확인
3. NCIC 원문에서 성취기준 코드 (예: [9수03-08]) 확인
   → curl 또는 https://ncic.re.kr 검색
```

### Step 2. 패턴 선택
02-component-catalog.md의 20가지 패턴 중 1개 선택.
- 함수·매개변수 → 패턴 01 (슬라이더→그래프)
- 알고리즘 → 패턴 02 (단계별 애니메이션)
- 분류 → 패턴 03 (드래그 앤 드롭)
- 미적분 → 패턴 15
- 분자 → 패턴 16
- 천체 → 패턴 17
- 행렬·벡터 → 패턴 18
- 생물 메커니즘 → 패턴 19
- 경제·금융 → 패턴 20

### Step 3. MDX 작성 (개념 설명)
파일: `content/{subject}/grade{n}/{unitId}.mdx`

```mdx
---
unitId: M9-CR-03
title: 이차함수
grade: 9
subject: math
domain: 변화와 관계
prerequisites: [M8-CR-04, M9-CR-01]
achievementStandards: ["[9수03-08]"]
---

import { QuadraticFunctionExplorer } from '@/components/interactive/math/QuadraticFunctionExplorer';

# 이차함수

## 한마디로
일차함수가 직선이라면, 이차함수는 **포물선**이에요.
공을 던졌을 때 그리는 궤적, 그게 바로 이차함수의 모양이죠.

## 본질
이차함수는 $y = ax^2 + bx + c$ 형태입니다.
세 개의 매개변수 $a, b, c$가 곡선의 모양을 결정해요.

- $a$: 곡선의 폭과 방향 (위·아래)
- $b$: 꼭짓점의 좌우 이동
- $c$: y축과 만나는 점

<QuadraticFunctionExplorer />

## 더 알아보기
- 꼭짓점 좌표는 $\left(-\frac{b}{2a},\ -\frac{b^2-4ac}{4a}\right)$
- 판별식 $D = b^2 - 4ac$로 x축과의 교점 개수를 알 수 있어요
```

### Step 4. 인터랙티브 컴포넌트 작성
패턴별 표준 셸을 변형. (02-component-catalog 마지막 섹션 참조)

```typescript
// components/interactive/math/QuadraticFunctionExplorer.tsx
'use client';
import { useState } from 'react';
// ... 04-sample-interactives/quadratic-function.html을 React로 포팅
```

### Step 5. 라우팅 페이지 (자동 생성 가능)
`app/[grade]/[subject]/[unitId]/page.tsx` — 마스터 인덱스 기반으로 일괄 생성하는 스크립트 작성.

### Step 6. 검증 체크리스트
- [ ] 모바일(360px)에서 깨지지 않는가
- [ ] 슬라이더 터치 영역 44px 이상인가
- [ ] 입력 변경 시 100ms 이내 반응하는가
- [ ] 수식이 KaTeX로 렌더링되는가 (이미지 X)
- [ ] 저작권 침해 자료가 없는가
- [ ] 선수학습 링크가 정확한가
- [ ] 학년에 맞는 어휘인가 (초등은 한자어 줄이기)

### Step 7. 커밋
```bash
git add content/math/grade9/M9-CR-03.mdx
git add components/interactive/math/QuadraticFunctionExplorer.tsx
git commit -m "feat(math): M9-CR-03 이차함수 인터랙티브"
```

### Step 8. Vercel 배포 확인
프리뷰 URL에서 실제 동작 확인.

---

## 3. 양산 프롬프트 템플릿

### 템플릿 A: 단일 단원 작성

```
다음 단원의 인터랙티브를 작성해 줘:
- 단원 ID: M9-CR-03
- 단원명: 이차함수
- 학년: 중3
- 패턴: 01 (슬라이더 → 그래프 연동)
- 참고 샘플: /docs/04-sample-interactives/quadratic-function.html

작업:
1. content/math/grade9/M9-CR-03.mdx 작성
2. components/interactive/math/QuadraticFunctionExplorer.tsx 작성
3. lib/curriculum.ts의 status를 'draft'로 업데이트

제약:
- 모바일 우선 (360px 기준 깨지지 않게)
- KaTeX로 수식 렌더링
- 슬라이더 a, b, c (a: -3~3, b: -5~5, c: -5~5)
- 표시 정보: 꼭짓점, 대칭축, 판별식
- 프리셋 버튼 4개 이상

검증: TypeScript 에러 0, npm run dev 렌더링 확인
```

### 템플릿 B: 학년-과목 일괄 작성 (병렬)

```
중3 수학 7개 단원을 일괄 작성해 줘. 마스터 인덱스 참조:
- M9-NA-01 제곱근과 실수
- M9-CR-01 다항식의 곱셈과 인수분해
- M9-CR-02 이차방정식
- M9-CR-03 이차함수
- M9-GM-01 삼각비
- M9-GM-02 원의 성질
- M9-DP-01 통계

각 단원당:
1. NCIC 원문에서 성취기준 확인
2. content/math/grade9/{ID}.mdx 작성
3. components/interactive/math/{ComponentName}.tsx 작성
4. 패턴은 02-component-catalog.md 참조

병렬 작업, 각 단원 완료 시 git commit 분리. TypeScript 에러 0, 모바일 검증.
```

### 템플릿 C: 전체 P0 일괄 (대량 양산)

```
마스터 인덱스의 모든 P0 단원을 양산해 줘.
순서: 학년 단위 → 과목 순서 (수학→과학→사회→국어→영어).
5단원 완료마다 진행 리포트.
품질: TS 에러 0, 모바일 360px 동작, 저작권 자료 없음, KaTeX 수식.
```

### 템플릿 D: 고등 일괄 (학점제)

```
고등 미적분Ⅰ 7개 단원 일괄.
권장 패턴:
- 패턴 15 (미적분 시각화): M-CA1-03, M-CA1-06, M-CA1-07
- 패턴 01 (슬라이더→그래프): M-CA1-01, M-CA1-02, M-CA1-04, M-CA1-05

특이사항:
- 미적분Ⅰ는 학생이 처음 미적분을 접하므로 직관적 시각화가 핵심
- 공식 유도보다 "왜 이렇게 되는가"의 시각적 이해
- 3blue1brown 스타일 참고
- 리만합은 분할 수 슬라이더로 면적 수렴 실시간 표현
- 회전체는 three.js로 3D
```

---

## 4. 과목별 특이 가이드

### 수학
- 모든 그래프는 좌표축·격자 표시
- 학년별 수의 범위 엄수: 초3~4 자연수, 초5~6 분수·소수+정수, 중1~ 정수·유리수, 중3 실수, 고1~ 복소수
- 수식은 무조건 KaTeX. 이미지 금지.

### 과학
- 단위 명확 (m/s, °C, N)
- 입자 시뮬: 색상 + 모양으로 종류 구분 (색맹 고려)
- 위험 실험은 시뮬레이션
- 천체는 비율 정확히 안 맞아도 됨 → "축척 무시" 주석

### 국어
- **저작권 절대 주의**: 작품 본문 인용 금지
- 작품 정보(작가·연대·갈래)와 구조, 주제만
- 인터랙티브는 문법·구조 위주
- 학년별 어휘 수준 조절

### 영어
- TTS는 Web Speech API (Chrome·Safari·Edge)
- 영국식/미국식 선택 가능
- 발음 표기는 IPA보다 한글 음차
- 영미권 IP 캐릭터·노래·영화 인용 금지

### 사회
- 지도는 한국 행정구역 GeoJSON (공공데이터포털)
- 역사는 출처 명시 (한국사데이터베이스)
- 정치적 민감 현대사는 사실 위주
- 통계는 KOSIS·통계청

---

## 5. 자동화 스크립트 권장

- `scripts/parse-curriculum.ts`: MASTER-INDEX.md → curriculum.ts
- `scripts/generate-pages.ts`: curriculum.ts → app 라우팅 페이지 일괄
- `scripts/validate.ts`: MDX frontmatter 유효성, import 경로, 선수학습 링크
- `scripts/sync-ncic.ts`: 단원 ID → NCIC 성취기준 매핑

---

## 6. 진도 관리

| 단원ID | 패턴 | 상태 | 검증 | 배포 |
|--------|------|------|------|------|
| M9-CR-03 | 01 | 완료 | ✅ | ✅ |

상태: planned → draft → reviewed → published

### 일일 페이스
- 패턴 익숙해지기 전: 4~6 단원/일
- 익숙해진 후: 8~12 단원/일
- 신규 패턴(15~20)은 첫 단원 1.5~2배

---

## 7. 막히면 이렇게

| 상황 | 해결 |
|------|------|
| NCIC 접근 차단 | 교육부 공시 / 시·도 교육청 자료 |
| 패턴 모호 | 가장 가까운 패턴 1개 선택 후 변형. 새 패턴 만들지 말 것 |
| 학년 어휘 모름 | 출판사(미래엔·천재·비상) 목차 확인 |
| 컴포넌트 복잡 | 둘로 쪼개기 |
| TS 에러 | `any`로 임시 회피 → 나중 일괄 수정. 양산 멈추지 말 것 |
| 모바일 깨짐 | grid → flex-column, aspect-ratio 강제 |

---

# Appendix A. 고등학교 (학점제) 작업 가이드

## A-1. ID 체계 변경

고등학교는 학점제 → **학년 prefix 대신 과목 약어**:

| 형식 | 예시 | 의미 |
|------|------|------|
| `M-CM1-01` | 수학 공통수학1 1단원 | 다항식 |
| `M-AL-03` | 수학 대수 3단원 | 삼각함수 |
| `M-CA1-06` | 수학 미적분Ⅰ 6단원 | 정적분 |
| `S-PHY-02` | 과학 물리학 2단원 | 뉴턴 운동법칙 |
| `S-CHE-04` | 과학 화학 4단원 | VSEPR 분자구조 |
| `H-IS1-03` | 사회 통합사회1 3단원 | 자연환경과 인간 |
| `H-EC-01` | 사회 경제 1단원 | 미시경제 입문 |

> 초~중은 기존 `M3-NA-01` 형식 유지. 고등만 새 체계.

## A-2. 라우팅

```
# 초~중 (기존)
/grade-9/math/M9-CR-03

# 고등 (신규)
/highschool/math/cm1/M-CM1-01     # 공통수학1
/highschool/math/al/M-AL-03       # 대수
/highschool/science/phy/S-PHY-02  # 물리학
/highschool/social/ec/H-EC-01     # 경제
```

## A-3. 디렉토리 구조

```
content/
├── math/
│   ├── grade3/ ~ grade9/        # 초~중
│   └── highschool/
│       ├── common-math-1/
│       ├── algebra/
│       ├── calculus-1/
│       ├── calculus-2/
│       ├── geometry/
│       ├── probability-statistics/
│       ├── economic-math/
│       ├── ai-math/
│       └── elective-fusion/
├── science/
│   ├── grade3/ ~ grade9/
│   └── highschool/
│       ├── integrated-science-1/
│       ├── integrated-science-2/
│       ├── physics/
│       ├── chemistry/
│       ├── biology/
│       ├── earth-science/
│       └── career-electives/
└── ...
```

## A-4. 학습 경로 그래프 (Phase 2)

```typescript
// 예: M-CA1-03 미분계수와 도함수
prerequisites: [
  'M-AL-01',   // 지수와 로그
  'M-AL-03',   // 삼각함수
  'M-CA1-01',  // 함수의 극한
],
followups: [
  'M-CA1-04',  // 도함수의 활용
  'M-CA2-03',  // 여러 가지 함수의 미분
  'M-AM-05',   // 경사하강법
]
```

## A-5. 과목별 특이 가이드 (고등)

### 수학 (고등)
- **공통수학1·2**는 모든 학생 필수 → P0 최우선
- **미적분Ⅰ는 의대·이공계 필수** → 시각화 품질 최상
- **인공지능 수학**은 행렬·경사하강법 핵심 → 패턴 18·15 결합
- 진로선택 미적분Ⅱ·기하는 이공계 진학생 위주 → P1
- 융합선택은 흥미 위주 → P1~P2

### 과학 (고등)
- **물리학·화학·생명과학·지구과학** 일반선택 4과목 P0 (수능)
- 진로선택 8과목은 학교별 개설 차이 큼 → P1
- 화학·생명: **분자·세포 시각화 (3Dmol.js·자체 SVG)** 필수
- 물리: **시뮬레이션** 비중 높음 (matter.js·three.js)
- 위험 실험은 시뮬레이션으로

### 사회 (고등)
- **통합사회·한국사** 모든 학생 필수 → P0
- **경제·정치·법** 일반선택 시민 교양 → P0
- 진로선택: 한국지리·세계사 인기 → P0
- **금융과 경제생활** (융합선택) → 실용성 P0 강추

### 국어 (고등)
- **공통국어1·2** P0
- **문학** 일반선택은 한국 문학사 타임라인 필수
- 작품 본문 인용 절대 금지
- 매체 단원: 가짜뉴스 판별기·미디어 리터러시

### 영어 (고등)
- **공통영어1·2** P0
- **시제 통합 타임라인** (12시제)이 정점
- 영미 문학: 작품 정보·시대·작가만, 본문 X
- TTS 활용도 극대화

---

# Appendix B. 일일 양산 페이스 갱신

| 단계 | 추정 페이스 |
|------|------------|
| 패턴 익숙해지기 전 | 일 4~6 단원 |
| 패턴 익숙해진 후 | 일 8~12 단원 |
| 신규 패턴 (15~20) 첫 단원 | 1.5~2배 |

전체 488단원 P0+P1 완료 추정:
- 보수적: 60~80일 (4h/일)
- 가속: 40~50일 (병렬 작업·서브에이전트)

---

# Appendix C. 컨텐츠 우선순위 권장 (조카 학년 미정 대응)

## 1단계: "공용 기본기" (어느 학년이든 도움)
1. 수학 분수 시각화 (초3~6 통합)
2. 영어 시제 타임라인 (초~고 통합)
3. 한국사 통합 타임라인 (초5~고)
4. 과학 입자 모형 (초~고 공통)
5. 수요·공급 곡선 (중2~고)

## 2단계: "초3~중3 P0 전 단원" (~150개)

## 3단계: "고등 공통 과목" (~62개)

## 4단계: "고등 일반선택" (~50~80개)

## 5단계: "고등 진로·융합선택" (관심사별 선별)
