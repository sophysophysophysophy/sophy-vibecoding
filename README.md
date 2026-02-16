# 정현주 - Backend Developer Portfolio

정현주 백엔드 개발자를 소개하는 개인 포트폴리오 웹사이트입니다.

## 🚀 기술 스택

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Deployment**: Vercel (권장)

## ✨ 주요 기능

- 🎨 **현대적인 디자인**: 깔끔하고 모던한 UI/UX
- 📱 **반응형 웹**: 모바일, 태블릿, 데스크톱 모두 지원
- 🌓 **다크 모드**: 자동 다크 모드 지원
- 🎯 **섹션별 구성**:
  - Hero Section: 첫인상을 강조하는 메인 섹션
  - About Me: 개발자 소개
  - Skills: 기술 스택 및 전문 분야
  - Experience: 경력 타임라인
  - Projects: 주요 프로젝트 포트폴리오
  - Contact: 연락처 정보

## 🛠️ 개발 환경 설정

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

### 3. 프로덕션 빌드

```bash
npm run build
npm start
```

## 📝 커스터마이징 가이드

### 개인 정보 수정

`src/app/page.tsx` 파일에서 다음 정보를 수정하세요:

1. **Hero Section**: 이름, 소개 문구
2. **About Section**: 학력, 경력 연수, 위치
3. **Skills Section**: 프로그래밍 언어, 프레임워크, 데이터베이스
4. **Experience Section**: 회사명, 직책, 기간, 주요 업무
5. **Projects Section**: 프로젝트 제목, 설명, 기술 스택
6. **Contact Section**: 이메일, LinkedIn, GitHub 링크

### 색상 테마 변경

`src/app/globals.css` 파일에서 색상 변수를 수정하세요:

```css
:root {
  --background: #ffffff;
  --foreground: #171717;
}
```

### 폰트 변경

`src/app/layout.tsx` 파일에서 폰트를 변경할 수 있습니다.

## 🎨 디자인 특징

- **그라데이션 배경**: 세련된 그라데이션으로 깊이감 표현
- **애니메이션 효과**: 호버 효과와 부드러운 트랜지션
- **카드 레이아웃**: 정보를 명확하게 구분하는 카드 디자인
- **타임라인**: 경력을 시각적으로 표현하는 타임라인
- **그림자 효과**: 입체감을 주는 섀도우 디자인

## 📱 반응형 브레이크포인트

- **모바일**: < 768px
- **태블릿**: 768px - 1024px
- **데스크톱**: > 1024px

## 🚀 배포

### Vercel (권장)

1. GitHub에 프로젝트를 푸시
2. [Vercel](https://vercel.com)에 연결
3. 자동 배포 완료

### 기타 플랫폼

- Netlify
- AWS Amplify
- Railway

## 📄 라이선스

MIT License

## 👤 Contact

- **Email**: dev.jungjh@example.com
- **LinkedIn**: linkedin.com/in/jungjh
- **GitHub**: github.com/jungjh

---

Made with ❤️ using Next.js and Tailwind CSS
