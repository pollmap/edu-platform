# 한국 초3~고3 인터랙티브 교육 플랫폼

> 2022 개정 교육과정 기준 5과목(국·영·수·사·과) 488 단원 / 약 800 인터랙티브 학습 자원.
> 단일 Next.js 16 웹앱. 비영리·개인 학습용.

## 진행 현황

| 항목 | 값 |
|------|-----|
| 단원 메타 등록 | **392 / 488** (NCIC 마스터 인덱스 기반) |
| 인터랙티브 콘텐츠 작성 | **17 단원** |
| Stub 페이지 | **375 단원** (자동 생성, 콘텐츠 작성 대기) |
| 풀텍스트 검색 | fuse.js 392 docs · Ctrl+K 단축키 |
| 진도 트래커 | zustand + localStorage (단원별 완료/즐겨찾기) |
| SEO | sitemap.xml (428 URL) + robots.txt + 동적 metadata |

### 콘텐츠 작성 완료 17 단원

| ID | 단원 | 학년 | 패턴 |
|----|------|------|------|
| M3-NA-01 | 세 자리 수 덧셈/뺄셈 | 초3 수학 | 12 자릿값 블록 |
| M3-NA-04 | 분수의 의미 | 초3 수학 | 12 변환기 |
| M5-NA-04 | 분수의 덧셈/뺄셈 | 초5 수학 | 01·12 |
| H5-HI-01 | 한국사 타임라인 | 초5 사회 | 07 타임라인 |
| S5-LI-01 | 다양한 생물 | 초5 과학 | 13 분류 트리 |
| S5-MA-02 | 산과 염기 (pH) | 초5 과학 | 01 슬라이더 + 색 |
| M6-NA-01 | 분수의 나눗셈 | 초6 수학 | 12 역수·면적 |
| M6-CR-01 | 비와 비율 | 초6 수학 | 14 데이터 |
| M6-CR-02 | 비례식 (양팔 저울) | 초6 수학 | 06 SVG + 14 |
| S7-MA-01 | 입자 모형 | 중1 과학 | 04 입자 |
| M7-NA-01 | 소인수분해 | 중1 수학 | 13 트리 |
| M7-NA-02 | 정수와 유리수 | 중1 수학 | 01 슬라이더 |
| H8-SO-02 | 수요·공급 | 중2 사회 | 01·14 |
| M9-CR-03 | 이차함수 (파일럿) | 중3 수학 | 01 |
| K-RD-01 | 글의 구조 | 학년 공통 국어 | 13 트리 |
| E-GR-04 | 영어 시제 타임라인 | 학년 공통 영어 | 07·12 |
| E-VOC-01 | 알파벳·파닉스 | 학년 공통 영어 | 11 매칭 + TTS |

## 기술 스택

- Next.js 16.2 (App Router, Turbopack, Route Groups)
- React 19.2 + TypeScript 5
- Tailwind CSS 4 (CSS-first, OKLCH 토큰, `@custom-variant dark`)
- next-themes (다크 모드)
- zustand v5 + persist (진도 트래커)
- fuse.js v7 (가중치 풀텍스트 검색)
- KaTeX + react-katex (수식)
- recharts (그래프)
- vitest + Playwright (테스트)
- Pretendard 가변 폰트 (SIL OFL)

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
