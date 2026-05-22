# 한국 초3~고3 인터랙티브 교육 플랫폼

> 2022 개정 교육과정 기반 5과목(국어·영어·수학·사회·과학) 인터랙티브 학습 웹앱.
> 현재 저장소의 마스터 인덱스에 열거된 **392개 단원 ID가 모두 앱에 등록되어 있고, 392개 라우트가 모두 `UnitBlueprint + UnitLearningMaterial + UnitInteractiveRenderer` 학습 화면으로 연결**됩니다. 488개 확장은 공식 출처로 확인된 항목만 앱 데이터에 추가합니다.

**Last verified:** 2026-05-22  
**Current data stance:** 392개 공식 검증 활성 단원, 96개 확장 후보 보류

## 이게 왜 가치가 있나

이 프로젝트의 가치는 “페이지 수”가 아니라 **공식 출처 기반 단원 데이터를, 반복 가능한 학습 화면과 20개 인터랙션 엔진으로 운영할 수 있는 구조**를 만든 데 있다.

```text
NCIC/공식 출처
  -> source ledger
  -> UnitContent
  -> UnitBlueprint
  -> Pattern engine registry
  -> 392개 통합 단원 화면
  -> audits + tests + e2e
```

자세한 제품 가치, 전체 범위, 전략, 한계는 `docs/PRODUCT-STRATEGY.md`에 정리되어 있다.

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
| 공통 학습 화면 | **392 / 392** `UnitHeader` + `UnitLearningMaterial` + `UnitInteractiveRenderer` |
| 세부 UnitContent | **392 / 392** 출처 refs·쉬운/표준/심화 설명·예시 3개·3문항 미니 문제·정답/해설·흔한 실수·실생활 적용·다음 단원 |
| UnitBlueprint | **392 / 392** 출처 provenance·authored content·interaction metadata 연결 |
| 패턴엔진 | **20 / 20** 실제 React renderer + registry 매핑 + 대표 E2E |
| legacy renderer | **0** 정상 경로 fallback 없음 |
| 출처 원장 | `docs/unit-source-ledger.md`에 392 verified rows + 96 blocked rows |
| 488 확장 후보 | **96개 보류** · 공식 출처 행 검증 전 앱 데이터 추가 금지 |
| planned/stub 단원 | **0** |
| 검색 | fuse.js 392 docs · Ctrl+K 검색 모달 |
| 진도 트래커 | zustand + localStorage 단원 완료/즐겨찾기 |
| SEO | sitemap.xml + robots.txt + 단원별 metadata |
| 보안 감사 | `npm audit --audit-level=moderate` 0 vulnerabilities |
| 자동 검증 | CI에서 typecheck, markdown lint, secret grep, curriculum validation, completion/content/blueprint/interaction audits, tests, build, e2e 실행 |

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
- 활성 단원 페이지가 `UnitHeader`, `UnitLearningMaterial`, `InteractiveErrorBoundary`, `UnitInteractiveRenderer`를 같은 순서로 렌더링함
- 활성 단원의 `UnitInteractiveRenderer`가 `components/interactive/pattern-engines/registry.tsx`의 실제 renderer로 연결됨
- 정상 경로에서 `legacy-component` renderer fallback이 0개임
- 모든 단원이 공통 학습자료 패널에서 핵심질문, 3개 목표, 5단계 조작 루프, 미니 도전, 오개념, 적용 장면, 산출물, 3개 복습 질문을 제공함
- 모든 단원이 `lib/unit-content/`의 authored `UnitContent`를 가지며 sourceRefs, 쉬운/표준/심화 설명, 예시 3개, 정확히 3문항 미니 문제, 정답과 해설, 흔한 실수, 실생활 적용, 유효한 `nextUnitIds`를 제공함
- 모든 출처 ref가 `sourceType`, `officialUrl`, `documentTitle`, `documentDate`, `locator`, `evidenceText`, `retrievedAt`, `verificationStatus`를 제공함
- 20개 패턴엔진 파일과 registry 매핑, 대표 단원 E2E가 모두 존재함
- 추가 96개 단원은 NCIC, `www.hscredit.net`, 교육부/교육청 등 공식 출처에서 단원명·과목·학교급·영역·출처를 검증하기 전까지 앱 데이터에 넣지 않음
- README, LICENSE, LICENSE-CONTENT, SECURITY, CONTRIBUTING이 존재함

검증:

```bash
npm run audit:completion
npm run audit:content
npm run audit:blueprint
npm run audit:interaction
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
- SVG/canvas 기반 pattern engines
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
npm run audit:blueprint
npm run audit:interaction
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
│   └── interactive/       # 공용 renderer + 20개 pattern engine
├── lib/
│   ├── curriculum/        # 분할 단원 메타데이터 + overrides
│   ├── data/              # 출처 기반 정적 데이터 로더
│   ├── unit-content/      # 출처 기반 단원별 세부 학습자료
│   ├── unit-blueprints/   # 단원 source/content/interaction contract
│   ├── metadata.ts
│   ├── progress.ts
│   └── search-index.ts
├── docs/                  # 마스터 인덱스, source ledger, 아키텍처, 제작 플레이북, 디자인 핸드오프
├── scripts/               # 생성, 검증, 감사 스크립트
└── tests/                 # unit + e2e 테스트
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
- 제품/전략 설명: `docs/PRODUCT-STRATEGY.md`
- 출처 원장: `docs/unit-source-ledger.md`
- Figma 개발 적합성 검토: `docs/design/figma-development-readiness.md`
- 디자인/UX 제품 기준: `docs/design/product-ux-foundation.md`
- 디자인/UX 경쟁앱 역기획 레퍼런스: `docs/design/competitive-ux-reverse-engineering.md`
- 26초식 오늘 큐/복습 큐 레퍼런스: `docs/design/26seconds-ux-reference.md`
- 하루배움 브랜드 자산 기준: `docs/design/brand-assets.md`
- 마스터 인덱스: `docs/00-MASTER-INDEX.md`
- 패턴엔진 카탈로그: `docs/02-component-catalog.md`
- 488 확장 후보 정책: `docs/UNIT-CONTENT-EXPANSION-CANDIDATES.md`
- 제작 플레이북: `docs/03-claude-code-playbook.md`
- Figma/Stitch 핸드오프: `docs/design/figma-stitch-handoff.md`
- 모바일 검증: `docs/MOBILE-CHECKLIST.md`

## 라이선스

- **코드**: MIT (`LICENSE`)
- **콘텐츠**: CC BY-NC 4.0 (`LICENSE-CONTENT.md`)
- **교육과정 메타데이터 출처**: [NCIC](https://www.ncic.re.kr/) 2022 개정 교육과정 및 저장소 출처 문서

## 보안

`SECURITY.md` 참조.

## 기여

`CONTRIBUTING.md` 참조.
