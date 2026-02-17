# 환경 변수 설정 가이드

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://knnviwdaijqyhlxygfck.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtubnZpd2RhaWpxeWhseHlnZmNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyMDQ4MjIsImV4cCI6MjA4Njc4MDgyMn0.FiimJ-lt1aC0-Vc4IG4zTPyWTVGlfa0_SHhEyPpfzoo

# Toss Payments (테스트 키 - 실제 배포시 교체 필요)
NEXT_PUBLIC_TOSS_CLIENT_KEY=test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm
TOSS_SECRET_KEY=test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6
```

## 주의사항

- `.env.local` 파일은 절대 Git에 커밋하지 마세요
- 실제 배포 시에는 토스페이먼츠 실제 키로 교체해야 합니다
- Supabase 키는 이미 설정되어 있습니다

## 토스페이먼츠 실제 키 발급

1. [토스페이먼츠 개발자센터](https://developers.tosspayments.com/) 접속
2. 회원가입 및 로그인
3. API 키 메뉴에서 클라이언트 키와 시크릿 키 발급
4. `.env.local` 파일의 `NEXT_PUBLIC_TOSS_CLIENT_KEY`와 `TOSS_SECRET_KEY` 교체
