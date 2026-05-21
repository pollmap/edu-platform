# 한국 초3~고3 인터랙티브 교육 플랫폼

> 2022 개정 교육과정 기반 5과목(국어·영어·수학·사회·과학) 인터랙티브 학습 웹앱.
> 현재 저장소의 마스터 인덱스에 열거된 **392개 단원 ID가 모두 앱에 등록되어 있고, 392개 라우트가 모두 활성 인터랙티브 단원으로 연결**됩니다. 488개 확장은 공식 출처로 확인된 항목만 앱 데이터에 추가합니다.

## UX 방향

이 앱은 전 과목 위키가 아니라 **초3~고3 개념을 손으로 만지는 인터랙티브 학습 맵**이다.

- 홈은 말해보카처럼 개인화된 오늘의 학습 허브로 간다.
- 단원은 스픽식 Learn-Practice-Apply를 개념 조작 루프로 바꾼다.
- 전체 교육과정은 듀오링고처럼 선수·후속 개념 경로로 보여준다.
- 기본 디자인은 다크 위키가 아니라 밝고 산뜻한 Light-first 교육용 UI다.
- 핵심 루프는 `See -> Touch -> Predict -> Explain -> Challenge`다.

## 현재 상태

| 항목 | 값 |
|------|-----|
| 마스터 인덱스 ID | **392 / 392** 앱 등록 |
| 단원 라우트 | **392 / 392** 생성 |
| 활성 단원 | **392 / 392** (`draft`) |
| 공통 학습자료 | **392 / 392** 핵심질문·목표·조작루프·미니도전·오개념·적용·산출물·복습질문 생성 |
| 세부 UnitContent | **392 / 392** 출처 refs·쉬운/표준/심화 설명·예시·3문항 미니 문제·정답/해설·흔한 실수·실생활 적용·다음 단원 |
| 488 확장 후보 | **96개 보류** · 공식 출처 행 검증 전 앱 데이터 추가 금지 |
| planned/stub 단원 | **0** |
| 인터랙티브 export | **270개** (`components/interactive/`) |
| 검색 | fuse.js 392 docs · Ctrl+K 검색 모달 |
| 진도 트래커 | zustand + localStorage 단원 완료/즐겨찾기 |
| SEO | sitemap.xml + robots.txt + 단원별 metadata |
| 보안 감사 | `npm audit --audit-level=moderate` 0 vulnerabilities |
| 자동 검증 | CI에서 typecheck, markdown lint, secret grep, curriculum validation, completion audit, tests, build, e2e 실행 |

### 과목별 커버리지

| 과목 | 활성 단원 | 전체 단원 | planned |
|------|----------|----------|---------|
| 수학 (Math) | 138 | 138 | 0 |
| 과학 (Science) | 104 | 104 | 0 |
| 사회 (Social) | 75 | 75 | 0 |
| 국어 (Korean) | 41 | 41 | 0 |
| 영어 (English) | 34 | 34 | 0 |
| **합계** | **392** | **392** | **0** |

### 학교급별 커버리지

| 범위 | 활성 단원 | 전체 단원 |
|------|----------|----------|
| 초등 | 96 | 96 |
| 중등 | 71 | 71 |
| 초·중 공통 | 38 | 38 |
| 고등 공통 | 62 | 62 |
| 고등 일반선택 | 58 | 58 |
| 고등 진로선택 | 47 | 47 |
| 고등 융합선택 | 20 | 20 |

## 완료 기준

이 저장소에서 “완료”는 자동으로 검증 가능한 다음 기준을 의미합니다.

- `docs/00-MASTER-INDEX.md`의 모든 단원 ID가 앱 메타데이터에 등록됨
- 모든 등록 단원에 `app/(units)/.../page.tsx` 라우트가 존재함
- 생성용 placeholder/stub 문구가 남아 있지 않음
- 활성 단원 페이지가 `InteractiveErrorBoundary`로 인터랙티브 영역을 감쌈
- 활성 단원의 `componentName`이 `components/interactive`에서 export됨
- 모든 단원이 공통 학습자료 패널에서 핵심질문, 3개 목표, 5단계 조작 루프, 미니 도전, 오개념, 적용 장면, 산출물, 3개 복습 질문을 제공함
- 모든 단원이 `lib/unit-content/`의 `UnitContent`를 가지며 sourceRefs, 쉬운/표준/심화 설명, 2개 이상 예시, 정확히 3문항 미니 문제, 정답과 해설, 흔한 실수, 실생활 적용, 유효한 `nextUnitIds`를 제공함
- 추가 96개 단원은 NCIC, 고교학점제 지원센터 등 공식 출처에서 단원명·과목·학교급·영역·출처를 검증하기 전까지 앱 데이터에 넣지 않음
- README, LICENSE, LICENSE-CONTENT, SECURITY, CONTRIBUTING이 존재함

검증:

```bash
npm run audit:completion
npm run audit:content
```

## 기술 스택

- Next.js 16.2 (App Router, Turbopack, Route Groups)
- React 19.2 + TypeScript 5
- Tailwind CSS 4 (CSS-first, OKLCH token, `@custom-variant dark`)
- next-themes
- zustand v5 + persist
- fuse.js v7
- KaTeX + react-katex
- recharts
- vitest + Playwright
- Pretendard variable font (SIL OFL)

## 시작하기

```bash
npm install
npm run dev
# http://localhost:3000
```

빌드:

```bash
npm run build
npm start
```

전체 검증:

```bash
npm run lint:md
npm run validate
npm run audit:completion
npm run audit:content
npm run audit:security
npm run tsc
npm test
npm run test:e2e
```

## 디렉토리

```text
edu-platform/
├── app/                   # Next.js App Router
│   ├── (units)/           # 392개 단원 라우트
│   ├── robots.ts
│   ├── sitemap.ts
│   ├── layout.tsx
│   └── page.tsx           # 홈
├── components/
│   ├── primitives/        # 공용 UI 빌딩 블록
│   └── interactive/       # 과목별 인터랙티브 컴포넌트
├── lib/
│   ├── curriculum/        # 분할 단원 메타데이터 + overrides
│   ├── data/              # 출처 기반 정적 데이터 로더
│   ├── unit-content/      # 출처 기반 단원별 세부 학습자료
│   ├── metadata.ts
│   ├── progress.ts
│   └── search-index.ts
├── docs/                  # 마스터 인덱스, 아키텍처, 제작 플레이북, 디자인 핸드오프
├── scripts/               # 생성, 검증, 감사 스크립트
└── tests/                 # e2e 테스트
```

## 핵심 원칙

1. **데이터 정직성**: 단원 정보는 NCIC와 저장소의 출처 문서 기준으로만 다룹니다.
2. **공식 출처 기반 콘텐츠**: 핵심 단원 ID와 개념 범위는 sourceRefs가 있는 데이터만 사용하며, 미검증 확장 단원은 후보 문서에만 둡니다.
3. **저작권 안전**: 디즈니/픽사/지브리/마블/노래가사/문학 본문 인용 금지.
4. **본질 우선**: 장식보다 개념의 핵심이 보이는 시각화.
5. **모바일 우선**: 360px 폭과 44px 이상 터치 타겟을 기본 기준으로 둡니다.
6. **즉시 반응**: 입력 변경 후 결과가 100ms 안에 갱신되는 인터랙션을 지향합니다.
7. **Light-first 디자인**: 기본 경험은 밝은 배경, 선명한 카드, 부드러운 과목 색상, 명확한 CTA 중심입니다.
8. **Figma 중심 핸드오프**: Google Stitch는 시안 탐색용이고, 최종 구현 기준은 Figma frame, capture, token export입니다.

## 주요 문서

- 진행 현황: `docs/PROGRESS.md`
- 완료 감사 기준: `docs/COMPLETION-AUDIT.md`
- 디자인/UX 제품 기준: `docs/design/product-ux-foundation.md`
- 디자인/UX 경쟁앱 역기획 레퍼런스: `docs/design/competitive-ux-reverse-engineering.md`
- 26초식 오늘 큐/복습 큐 레퍼런스: `docs/design/26seconds-ux-reference.md`
- 하루배움 브랜드 자산 기준: `docs/design/brand-assets.md`
- 마스터 인덱스: `docs/00-MASTER-INDEX.md`
- 488 확장 후보 정책: `docs/UNIT-CONTENT-EXPANSION-CANDIDATES.md`
- 제작 플레이북: `docs/03-claude-code-playbook.md`
- Figma/Stitch 핸드오프: `docs/design/figma-stitch-handoff.md`
- 모바일 검증: `docs/MOBILE-CHECKLIST.md`

## 라이선스

- **코드**: MIT (`LICENSE`)
- **콘텐츠**: CC BY-NC 4.0 (`LICENSE-CONTENT.md`)
- **교육과정 메타데이터 출처**: NCIC 2022 개정 교육과정 및 저장소 출처 문서

## 보안

`SECURITY.md` 참조.

## 기여

`CONTRIBUTING.md` 참조.
