@AGENTS.md

# 프로젝트: 한국 초3~고3 인터랙티브 교육 플랫폼

## 목적

2022 개정 교육과정 기반 5과목(국어·영어·수학·사회·과학) 핵심 개념을 인터랙티브로 시각화한다. 이 앱은 전 과목 위키가 아니라 초3~고3 학생이 개념을 검색하고, 만지고, 실험하고, 저장하고, 다음 개념으로 이동하는 인터랙티브 학습 맵이다. 현재 저장소 범위는 `docs/00-MASTER-INDEX.md`에 열거된 392개 단원 ID이며, 392개 모두 앱에 등록되어 라우트와 인터랙티브 컴포넌트로 연결된다.

## 현재 완료 상태

- 마스터 인덱스 ID: 392
- 앱 등록 단원: 392
- 활성 단원: 392
- planned 단원: 0
- generated stub page: 0
- 인터랙티브 export: 270
- 완료 감사: `npm run audit:completion`

## 핵심 원칙

1. **데이터 정직성**: 단원 정보는 NCIC 원문과 저장소 출처 문서 기준으로만 다룬다. 추측·할루시네이션 금지.
2. **저작권 안전**: 디즈니/픽사/지브리/마블/만화/노래가사 일체 사용 금지. 문학 작품 본문 인용 금지.
3. **본질 우선**: 화려한 애니메이션보다 개념의 핵심이 보이는 시각화.
4. **모바일 우선**: 360px 폭에서 깨지지 않고, 터치 영역은 최소 44px.
5. **즉시 반응**: 입력 변경 후 결과가 100ms 안에 갱신되는 인터랙션을 지향.
6. **Next.js 16 패턴**: Next 관련 변경은 현재 설치 버전 기준으로 확인하고 작성.
7. **Light-first 디자인**: 기본 경험은 밝은 교육용 UI다. 다크 모드는 보조 옵션으로만 유지한다.
8. **Figma 중심 핸드오프**: Stitch는 시안 탐색 보조 도구이고, 최종 구현 기준은 Figma frame, capture, token export다.

## 제품 UX 기준

- 홈: 말해보카식 개인화 허브. 오늘의 추천, 최근 학습, 즐겨찾기, 과목별 진도를 우선한다.
- 단원: 스픽식 Learn-Practice-Apply를 `See -> Touch -> Predict -> Explain -> Challenge`로 바꾼다.
- 로드맵: 듀오링고식 경로형 학습을 교육과정 선수·후속 개념 맵으로 적용한다.
- 진도: XP/스트릭/배지는 가볍게 쓰고, 강한 경쟁이나 리더보드는 추후 학급 모드로 분리한다.
- 디자인: 밝은 배경, 선명한 카드, 부드러운 과목 색상, 밝은 실험실형 인터랙티브 캔버스, 명확한 CTA가 기본이다.

## 기술 스택

- Next.js 16.2
- React 19.2
- TypeScript 5
- Tailwind CSS 4
- next-themes
- zustand v5
- fuse.js v7
- KaTeX + react-katex
- recharts
- vitest + Playwright

## 디렉토리

- `app/(units)/` : 392개 단원 라우트
- `components/interactive/{subject}/` : 과목별 인터랙티브 React 컴포넌트
- `components/interactive/{subject}/highschool/` : 고등 단원 인터랙티브
- `components/primitives/` : 공용 UI 빌딩 블록
- `lib/curriculum/` : 분할 단원 메타데이터와 overrides
- `lib/data/` : 출처 기반 정적 데이터 로더
- `docs/` : 마스터 인덱스, 아키텍처, 제작 플레이북, 핸드오프 문서
- `scripts/` : 생성, 검증, 감사 스크립트
- `tests/` : Playwright e2e 테스트

## 색상 토큰

- 수학 = subject math token / blue 계열
- 과학 = subject science token / green 계열
- 국어 = subject korean token / red 계열
- 영어 = subject english token / purple 계열
- 사회 = subject social token / orange 계열

실제 구현 토큰은 `app/globals.css`와 `lib/types.ts`를 기준으로 확인한다.

## 단원 작업 표준

1. `docs/00-MASTER-INDEX.md`에서 단원 ID와 의도를 확인한다.
2. NCIC 원문 또는 저장소의 출처 문서로 성취기준과 단원명을 재확인한다.
3. `docs/02-component-catalog.md`의 20개 패턴 중 가장 가까운 패턴을 사용한다.
4. 단원 페이지는 `app/(units)/.../page.tsx`에 작성한다.
5. 인터랙티브는 `components/interactive/...`에 두고 named export를 제공한다.
6. 단원 페이지는 `InteractiveErrorBoundary`로 인터랙티브 영역을 감싼다.
7. 메타데이터와 상태 변경은 `lib/curriculum/overrides.ts` 또는 해당 분할 메타데이터 파일에서 처리한다.

## 완료 전 검증

```bash
npm run lint:md
npm run validate
npm run audit:completion
npm run audit:security
npm run tsc
npm test
npm run test:e2e
```

## 보안 규정

- 토큰·키·VPS IP·사용자 경로·실명·이메일·세션 정보를 소스 코드에 하드코딩하지 않는다.
- PUBLIC repo 5종 세트는 유지한다: LICENSE, README, .gitignore, SECURITY, CONTRIBUTING.
- Secret grep과 `npm audit --audit-level=moderate`를 CI에서 통과해야 한다.
- Dependabot PR은 보안 영향과 lockfile 변경을 확인하고 머지한다.

## 주요 참조

- 진행 현황: `docs/PROGRESS.md`
- 완료 감사 기준: `docs/COMPLETION-AUDIT.md`
- 제품 UX 기준: `docs/design/product-ux-foundation.md`
- 제작 플레이북: `docs/03-claude-code-playbook.md`
- Figma/Stitch 핸드오프: `docs/design/figma-stitch-handoff.md`
- 모바일 검증: `docs/MOBILE-CHECKLIST.md`
