# 아키텍처

## 1. 현재 구조

이 앱은 Next.js 16 App Router 기반 단일 웹앱이다. 단원 콘텐츠는 별도 MDX 파일이 아니라 `app/(units)/.../page.tsx` 라우트와 `components/interactive/...` 컴포넌트 조합으로 제공한다.

```text
edu-platform/
├── app/
│   ├── (units)/                 # 392개 단원 라우트
│   ├── globals.css              # Tailwind 4, theme token, light/dark token
│   ├── layout.tsx
│   ├── page.tsx                 # 홈
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── primitives/              # 단원 페이지 공용 UI
│   └── interactive/             # 과목별 인터랙티브
├── lib/
│   ├── curriculum/              # 단원 메타데이터 분할 파일
│   ├── data/                    # 출처 기반 정적 데이터 로더
│   ├── metadata.ts
│   ├── progress.ts
│   └── search-index.ts
├── docs/
├── scripts/
└── tests/
```

## 2. 단원 데이터

단원 메타데이터의 진입점은 `lib/curriculum/index.ts`다.

- `CURRICULUM`: 초등, 중등, 초·중 공통 단원
- `HIGHSCHOOL_UNITS`: 고등 공통, 일반선택, 진로선택, 융합선택 단원
- `UNIT_OVERRIDES`: 상태, 선수학습, 성취기준, 컴포넌트 이름, 패턴 ID 보정
- `unitPath(unit)`: 단원 URL 생성
- `findUnit(id)`: 단원 ID 조회

현재 감사 기준:

| 항목 | 값 |
|------|-----|
| 마스터 인덱스 ID | 392 |
| 앱 등록 단원 | 392 |
| 활성 단원 | 392 |
| planned 단원 | 0 |
| generated stub page | 0 |

## 3. 라우팅

단원 라우트는 route group 아래에 둔다.

| 범위 | URL 예시 | 파일 예시 |
|------|----------|-----------|
| 홈 | `/` | `app/page.tsx` |
| 초·중 단원 | `/grade-9/math/M9-CR-03` | `app/(units)/grade-9/math/M9-CR-03/page.tsx` |
| 초·중 공통 | `/common/korean/K-GR-01` | `app/(units)/common/korean/K-GR-01/page.tsx` |
| 고등 단원 | `/highschool/math/calculus-1/M-CA1-03` | `app/(units)/highschool/math/calculus-1/M-CA1-03/page.tsx` |

## 4. 단원 페이지 표준 구조

단원 페이지는 다음 공용 primitive를 중심으로 구성한다.

- `UnitHeader`
- `Breadcrumb`
- `PrerequisiteList`
- `SectionCard`
- `InteractiveErrorBoundary`
- `UnitProgressBadge`
- `UnitProgressControls`
- `WikipediaInfobox`
- `MathFormula`

인터랙티브 컴포넌트는 named export를 제공해야 하며, 단원 메타데이터의 `componentName`과 일치해야 한다.

## 5. 검색과 진도

- 검색 인덱스: `lib/search-index.ts`
- 검색 UI: `components/primitives/SearchDialog.tsx`
- 진도 저장: `lib/progress.ts`
- 홈 진도 요약: `components/primitives/HomeProgress.tsx`
- 단원 완료/즐겨찾기: `components/primitives/UnitProgressControls.tsx`

진도는 zustand persist와 localStorage 기반이다.

## 6. 디자인 시스템

주요 token source는 `app/globals.css`다.

- Tailwind CSS 4 CSS-first 구조
- `@theme` token
- `:root` Light-first token
- `.dark` optional dark token
- `va-*` utility/class family
- subject color mapping은 `lib/types.ts`와 함께 확인

기본 경험은 밝은 교육용 UI다. Figma 연동은 `docs/design/product-ux-foundation.md`와 `docs/design/figma-stitch-handoff.md` 기준으로 진행한다.

## 7. 검증 파이프라인

로컬과 CI에서 같은 명령을 사용한다.

```bash
npm run lint:md
npm run validate
npm run audit:completion
npm run audit:security
npm run tsc
npm test
npm run build
npm run test:e2e
npm run secret-grep
```

`scripts/completion-audit.ts`는 마스터 인덱스 ID, 앱 등록, 라우트, stub, error boundary, component export, 공개 문서를 검사한다.
