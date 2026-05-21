# 완료 감사 기준

`npm run audit:completion`은 저장소에서 자동으로 확인 가능한 “완성도 차단 이슈”를 검사한다.

## 현재 결과

2026-05-21 기준:

| 항목 | 결과 |
|------|------|
| 마스터 인덱스 ID | 392 |
| 앱 등록 단원 | 392 |
| 활성 단원 | 392 |
| planned 단원 | 0 |
| generated stub page | 0 |
| 인터랙티브 export | 270 |
| 공통 학습자료 | 392/392 |
| 차단 이슈 | 0 |

## 검사 항목

- `docs/00-MASTER-INDEX.md`에 열거된 모든 ID가 앱 메타데이터에 등록되어 있는지 확인
- 앱 메타데이터의 모든 ID가 마스터 인덱스에도 존재하는지 확인
- 모든 등록 단원이 `planned`가 아닌 상태인지 확인
- 모든 등록 단원의 route page가 존재하는지 확인
- 생성용 placeholder/stub 문구가 남아 있지 않은지 확인
- 모든 활성 단원 페이지가 `InteractiveErrorBoundary`를 사용하는지 확인
- 모든 활성 단원의 `componentName`이 `components/interactive`에서 export되는지 확인
- 공개 저장소 기본 문서가 존재하는지 확인

`npm run audit:content`는 교육자료 필수 구성을 별도로 검사한다.

- 모든 등록 단원에 핵심질문이 있는지 확인
- 모든 등록 단원에 3개 학습목표가 있는지 확인
- 모든 등록 단원에 `See -> Touch -> Predict -> Explain -> Challenge` 5단계 루프가 있는지 확인
- 모든 등록 단원에 미니 도전, 오개념 교정, 적용 장면, 산출물, 3개 복습 질문이 있는지 확인
- 모든 단원 페이지가 공통 학습자료 표면을 렌더링하는지 확인

## 실행

```bash
npm run audit:completion
npm run audit:content
```

JSON 결과가 필요하면:

```bash
npm run audit:completion -- --json
```

## CI 연동

완료 감사는 GitHub Actions의 `CI` workflow에 포함되어 있다. 단원 ID, 라우트, 상태, 컴포넌트 export, 공개 문서 중 하나라도 어긋나면 PR이 실패한다.

## 범위

이 감사는 저장소 구조와 코드 연결성을 검증한다. 교육학적 최종 감수, Figma 최종 시안 승인, 접근성 전문 감사처럼 사람의 판단이 필요한 항목은 별도 리뷰 기준으로 다룬다.
