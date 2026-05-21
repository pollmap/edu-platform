# 26초 UX Reference

**Last Updated:** 2026-05-21

이 문서는 26초 앱의 공개 App Store, Google Play, 공식 홈페이지 정보를 K-12 인터랙티브 교육 플랫폼 디자인에 적용하기 위한 레퍼런스다. 앱 버전, 다운로드 수, 평점, 리뷰 수처럼 변동되는 수치는 고정하지 않고, **마찰 제거, 오늘 큐, 카드 집중, 복습 큐** 패턴만 제품 기준으로 사용한다.

## 1. UX Essence

26초에서 가져올 것은 단어장이 아니라 학습 마찰 제거 구조다.

```text
26초 UX 본질
├─ 앱이 오늘 분량을 정한다
├─ 사용자는 눈앞의 카드만 처리한다
├─ 카드 단위로 빠르게 넘긴다
├─ 이미지/예문/발음으로 기억 단서를 붙인다
├─ 모르는 항목은 복습 큐로 돌아온다
├─ 밀린 복습은 눈에 보인다
└─ 연속 학습으로 루틴을 만든다
```

이 앱에서는 다음처럼 변환한다.

| 26초 | Edu Platform |
|------|--------------|
| 오늘 외울 단어 | 오늘 볼 개념 |
| 단어 카드 | 개념 카드 |
| 이미지 연상 | 인터랙티브 시각화 |
| 예문/발음 | 예시 상황/설명 |
| 앎/모름 | 이해했어요/헷갈려요/다시 볼래요 |
| 복습 큐 | 개념 복습 큐 |
| 연속 학습 | 연속 탐구 |

## 2. Design Rules

- 홈 첫 화면에는 전체 단원보다 오늘 할 카드 수를 먼저 보여준다.
- 복습 큐는 완료율과 분리한다. 완료는 상태이고, 복습은 반복 일정이다.
- 단원 페이지에는 3단계 자기평가를 둔다: `이해했어요`, `헷갈려요`, `다시 볼래요`.
- `헷갈려요`는 다음 날 복습 큐, `다시 볼래요`는 오늘 복습 큐로 보낸다.
- 하루 큐가 끝나도 추가 학습은 항상 열어둔다.
- 카드 UI는 밝은 배경, 큰 CTA, 48px 이상 터치 타깃을 유지한다.
- 압박감은 숫자로만 주고, 에너지/하트 페널티는 넣지 않는다.

## 3. Implemented Surface

| Surface | Code |
|---------|------|
| 오늘의 3분 개념 | `components/learning/TodayConceptQueue.tsx` |
| 단원 3분 훑어보기 | `components/learning/UnitLearningMaterial.tsx` |
| 이해도 체크 | `components/learning/SelfCheckBar.tsx` |
| 복습 큐 상태 | `lib/progress.ts` `reviewQueue` |
| 연속 탐구 | `lib/progress.ts` `streak` |
| 큐 추천 로직 | `lib/learning.ts` |
| 세부 학습자료 데이터 | `lib/unit-content/` |

현재 구현은 26초의 플래시카드 구조를 그대로 복제하지 않고, **개념 카드 + 인터랙티브 조작 + 3문항 미니 문제 + 자기평가 + 복습 큐**로 변환한다.

## 4. P0 Component Pattern

```text
DailyConceptQueue
├─ TodayConceptCard
│  ├─ 추천 단원
│  ├─ 예상 학습량
│  ├─ 과목/학년/영역
│  └─ 시작 CTA
├─ ReviewQueueCard
│  ├─ 오늘 다시 볼 개념 수
│  └─ 복습 단원 링크
├─ StreakChip
│  └─ 연속 탐구일
└─ StudyAmountSelector
   ├─ 3분
   ├─ 5분
   ├─ 10분
   └─ 자유 학습
```

```text
SelfCheckBar
├─ 이해했어요
│  └─ 완료 처리 + 복습 큐 제거
├─ 헷갈려요
│  └─ 다음 날 복습 큐 등록
└─ 다시 볼래요
   └─ 오늘 복습 큐 등록
```

## 5. Source Links

- [26초 App Store](https://apps.apple.com/kr/app/26%EC%B4%88-%EC%B4%88%EA%B3%A0%EC%86%8D-%EB%8B%A8%EC%96%B4-%EC%95%94%EA%B8%B0/id6738269475)
- [26초 Google Play](https://play.google.com/store/apps/details?hl=ko&id=com.skimmify.toeic)
- [26초 공식 홈페이지](https://skimmify.com/)
