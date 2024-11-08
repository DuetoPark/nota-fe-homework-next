# 채팅 및 채팅 리스트 구현

안녕하세요!  
2년차 프론트엔드 개발자 박인혜입니다.👋

## 프로젝트 소개

<img width="1680" alt="스크린샷 2024-11-08 오후 2 23 09" src="https://github.com/user-attachments/assets/e748ab32-8d57-4eca-95e5-c9c002e2741e">

### 개요

노타 프론트엔드 원격 과제로 제작한 **채팅 애플리케이션**입니다.

### 기능

- 새로운 채팅 추가
- 채팅 목록 조회
- 채팅 상세 조회
- 채팅 추가

### 추가 구현 기능

- 페이지 이동
  - 채팅 추가 & 채팅 상세 조회 일 때, 페이지 히스토리를 저장합니다.
  - 뒤로가기를 누르면 이전 대화 내역을 확인할 수 있습니다.

### 기술스택

- 상태 관리
  - Zustand
  - TanStack Query (React Query)
- 라우팅
  - React Router DOM
- 스타일링
  - module css
  - classnames (CSS 모듈과 함께 사용)
- HTTP 클라이언트
  - Axios
- 빌드 도구
  - Vite
- 코드 품질 관리
  - ESLint
  - TypeScript ESLint

## 실행방법

1. 레포지토리를 클론합니다.

```bash
git clone https://github.com/DuetoPark/nota-fe-homework-react.git .
```

2. 패키지를 설치합니다.

```bash
> yarn
```

3. 개발 서버를 실행합니다

```bash
> yarn dev
```
