# 보안 정책

## 신고 방법

이 프로젝트의 잠재적 보안 이슈를 발견하셨다면, **GitHub Issue로 공개하지 마시고** 메인테이너에게 비공개로 알려 주세요.

- GitHub: https://github.com/pollmap (DM 또는 보안 advisory)

## 범위

다음 영역의 보안 이슈를 환영합니다:

- 빌드/배포 파이프라인의 자격 증명 노출
- 이메일/IP/실명 등 PII 하드코딩
- 외부 종속 라이브러리의 알려진 CVE
- XSS·CSRF·콘텐츠 보안 정책 위반
- 잘못된 CORS·헤더 설정

## 범위 외

- 일반적인 학습 콘텐츠 정확성 문제 → 별도 Issue 사용
- 디자인·UX 개선 제안 → 별도 Issue 사용

## 보안 규정 (개발자 측)

- API 키·VPS IP·사용자 경로·실명·이메일·토큰의 소스 코드 하드코딩 금지 (환경변수 또는 placeholder 사용)
- pre-commit grep ban: 특정 패턴 감지 시 커밋 차단
- 분기별 외부 API 키 회전 (1/1, 4/1, 7/1, 10/1)
- 모든 PUBLIC repo는 5종 세트(LICENSE / README / .gitignore / SECURITY / CONTRIBUTING) 필수

## 의존성 모니터링

- `npm audit` 정기 실행
- `dependabot` 자동 PR 검토
