# 한국 초3~고3 인터랙티브 교육 플랫폼

> 2022 개정 교육과정 기준 5과목(국·영·수·사·과) 488 단원 / 약 800 인터랙티브 학습 자원.
> 단일 Next.js 16 웹앱. 비영리·개인 학습용.

## 개요

- **목적**: 초3 ~ 고3 학습자가 교과 핵심 개념을 인터랙티브 시각화로 학습
- **범위**: 488 단원 (초·중 206 + 고등 282)
- **상태**: Sprint 0 인프라 시드 완료, 파일럿 1 단원 (`M9-CR-03` 이차함수) 가동

## 기술 스택

- Next.js 16.2 (App Router, Turbopack)
- React 19.2
- TypeScript 5
- Tailwind CSS 4 (CSS-first config)
- KaTeX (수식 렌더링)

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

타입 검사:

```bash
npx tsc --noEmit
```

## 디렉토리

```
edu-platform/
├── app/                   # Next.js App Router
│   ├── (units)/           # 단원 라우트 그룹
│   ├── error.tsx
│   ├── not-found.tsx
│   ├── loading.tsx
│   ├── layout.tsx         # 루트 레이아웃 (lang="ko")
│   └── page.tsx           # 홈
├── components/
│   ├── primitives/        # 공용 빌딩 블록
│   └── interactive/       # 단원별 인터랙티브 컴포넌트
├── lib/
│   ├── types.ts           # 타입 + 라벨
│   ├── curriculum/        # 단원 메타데이터 (분할)
│   └── metadata.ts        # makeUnitMetadata helper
├── docs/                  # 양산 매뉴얼 (488 단원 인덱스 / 20 패턴 / playbook)
└── public/
```

## 핵심 원칙

1. **데이터 정직성**: 단원 정보는 NCIC(`https://ncic.re.kr`) 원문 기준
2. **저작권 안전**: 디즈니/지브리/마블/문학 본문 인용 금지
3. **본질 우선**: 화려함보다 개념의 핵심이 보이는 시각화
4. **모바일 우선**: 슬라이더 터치 영역 최소 44px
5. **즉시 반응**: 입력 → 결과 100ms 이내

## 양산 가이드

`docs/03-claude-code-playbook.md` 참조.

## 라이선스

- **코드**: MIT (`LICENSE`)
- **콘텐츠**: CC BY-NC 4.0 (`docs/LICENSE-CONTENT.md`, 작성 예정)
- **교육과정 메타데이터 출처**: NCIC 2022 개정 교육과정

## 보안

`SECURITY.md` 참조.

## 기여

`CONTRIBUTING.md` 참조.
