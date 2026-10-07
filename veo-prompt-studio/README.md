# Tailframe — VEO Prompt Studio

첨부된 규칙을 바탕으로 Gemini OMNI와 Google Flow Veo 3.1 Lite용 TikTok 9:16 연속 프롬프트를 만드는 Windows 도구입니다.

## 사용 방법

1. `supabase-setup.sql` 전체를 Supabase SQL Editor에서 실행합니다.
2. Supabase Dashboard의 **Authentication > Providers > Email**에서 Email provider를 켜고 **Confirm email**을 끕니다. Anonymous sign-ins는 끕니다.
3. 프로그램을 실행하고, 필요할 때 ID·비밀번호로 로그인합니다. 프롬프트 생성은 로그인 없이도 됩니다.
4. 조건을 적거나 비워 두고 **새 프롬프트 생성**을 누릅니다. Gemini OMNI와 Google Flow 버전을 각각 확인하고, 마음에 드는 결과만 **보관**합니다.

Windows 프로그램으로 빌드할 때는 `npm install` 후 `npm run dist`를 실행합니다. 생성된 `Tailframe-VEO-Prompt-Studio.exe`는 설치 없이 실행되는 포터블 앱입니다.

보관된 결과는 로그인한 ID 계정에만 보이며, OMNI 프롬프트·Flow 프롬프트·스토리보드를 함께 저장합니다. 수파베이스에 연결하지 못해도 이 PC에는 백업을 남기며, 나중에 `PC 보관함 업로드`로 클라우드에 올릴 수 있습니다.

## 파일

- `index.html` — 작업 화면
- `app.js` — 생성 규칙, 중복 검사, Supabase 보관함
- `styles.css` — 반응형 UI
- `supabase-setup.sql` — 테이블·RLS·권한 설정
- `archive.html`, `archive.js` — 별도 보관함 화면
- `main.js`, `preload.js` — Windows Electron 실행 파일 구성
