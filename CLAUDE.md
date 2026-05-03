@AGENTS.md

# 프로젝트: 한국 초3~고3 인터랙티브 교육 플랫폼

## 목적
2022 개정 교육과정 기준 5과목(국영수사과) 핵심 개념을 인터랙티브로 시각화. 488 단원 / ~800 인터랙티브 양산. 조카(초3~고3) 학습용 단일 웹앱.

## 핵심 원칙
1. **데이터 정직성**: 단원 정보는 NCIC 원문(`https://ncic.re.kr`) 기준. 추측·할루시네이션 금지.
2. **저작권 안전**: 디즈니/픽사/지브리/마블/만화/노래가사 일체 사용 금지. 문학 작품 본문 인용 금지(구조·주제만). 일러스트는 unDraw·OpenPeeps만.
3. **본질 우선**: 화려한 애니메이션보다 개념의 핵심이 보이는 시각화.
4. **모바일 우선**: 슬라이더·터치 영역 최소 44px. aspect-ratio 1:1 또는 4:3.
5. **즉시 반응**: 입력 → 결과 100ms 이내.
6. **Next.js 16 패턴**: 훈련 데이터의 Next 15 패턴 그대로 쓰지 말 것. AGENTS.md 경고대로 `node_modules/next/dist/docs/`에서 최신 API 확인 후 작성.

## 기술 스택 (스캐폴드 확정)
- Next.js 16.2 (App Router, Turbopack)
- React 19.2
- TypeScript 5
- Tailwind CSS 4 (PostCSS 플러그인 방식)
- 추가 예정: shadcn/ui, recharts, three.js, react-konva, matter.js, KaTeX, framer-motion 등 (03-playbook §0 참조)

## 디렉토리
- `docs/` : 양산 매뉴얼·마스터 인덱스 (불변)
- `content/{subject}/grade{n}|highschool/{course}/` : MDX 단원 설명
- `components/interactive/{subject}/[highschool/]` : 인터랙티브 React 컴포넌트
- `components/ui/` : shadcn/ui
- `components/primitives/` : 공용 빌딩블록
- `lib/curriculum.ts` : 단원 메타데이터 (488 단원)
- `app/[grade]/[subject]/[unitId]/` : 초·중 라우팅
- `app/highschool/[subject]/[course]/[unitId]/` : 고등 라우팅

## 색상 토큰
- 수학 = `blue-600`
- 과학 = `green-600`
- 국어 = `red-600`
- 영어 = `purple-600`
- 사회 = `orange-600`
- 강조 = `yellow-400`

## 작업 단위
1단원 = MDX 1개(설명) + Component 1~2개(인터랙티브) + 라우팅 페이지 1개

## 단원 작업 시작 전 체크
1. NCIC 원문에서 해당 단원 성취기준 확인
2. `docs/02-component-catalog.md` 20가지 패턴 중 적합 패턴 선택
3. 선수학습 단원 (prerequisites) 링크 확인
4. **Next 16 신규 API 사용 시 `node_modules/next/dist/docs/` 먼저 확인**

## 검증 체크리스트 (단원 완료 직전)
- [ ] 모바일 360px에서 깨지지 않음
- [ ] 슬라이더 터치 영역 44px+
- [ ] 입력 변경 → 결과 100ms 이내
- [ ] 수식은 KaTeX (이미지 X)
- [ ] 저작권 침해 자료 없음
- [ ] 선수학습 링크 정확
- [ ] 학년 어휘 적절 (초등은 한자어 풀어쓰기)
- [ ] TypeScript 에러 0

## 양산 페이스 목표
- 패턴 익숙 전: 4~6 단원/일
- 익숙 후: 8~12 단원/일
- 신규 패턴 (15~20)은 첫 단원 1.5~2배

## 보안 (찬희 보안 규정 v1)
- 토큰·키·VPS IP·실명·실거주지 하드코딩 금지 → 환경변수
- VPS 설정 절대 건드리지 마 (찬희 명시 승인 시에만)
- PUBLIC repo 5종 세트 필수: LICENSE / README / .gitignore / SECURITY.md / CONTRIBUTING.md
- Pre-commit grep ban: `62\.171\.141\.206`, `lch6817556`, `C:\\Users\\lch68`, `BEGIN .* PRIVATE KEY` 등

## 막히면 참조
- `docs/03-claude-code-playbook.md` §7 트러블슈팅 표
- 패턴 모호 → 가장 가까운 패턴 1개 변형 (새 패턴 만들지 말 것)
- TS 에러 → `any` 임시 회피 → 일괄 수정 (양산 멈추지 말 것)

## 파일럿
- `M9-CR-03` 이차함수 (중3 변화와 관계)
- `docs/04-sample-interactives/quadratic-function.html` 을 React 포팅
- 파일럿 검증 끝나면 학년 단위 양산 시작
