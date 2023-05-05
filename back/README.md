## 1. Express 실행

> cd back 이동 후 
```bash
npm install --global yarn
yarn
yarn start
```


## 폴더 구조 설명

1. src폴더는 크게는 routers, services, db의 3개 폴더로 구분됩니다.
   **현재는 User MVP 코드만 있습니다.**

- routers:
  - request와 response가 처리

- services:
  - 백엔드 로직 코드
  - 다양한 상황의 validation error handling 코으

- db:
  - Mongoose와 mongodb 서버를 연결하는 코드가 있는 index.js
  - Mongoose 스키마가 있는 schemas 폴더 
    - 총 8개의 js 파일
    
  - Mongoose 모델 ORM 코드가 있는 models 폴더
    - 총 8개의 js 파일

2. 이외 폴더는 아래와 같습니다.

- src/middlewares:
  - jwt토큰을 다루는 미들웨어인 login_required.js
  - 학습 편의를 위해 일괄 http 400 코드로 에러를 변환하는 에러핸들러인 errorMiddleware.js


