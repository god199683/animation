# Tailframe — VEO Prompt Studio

첨부된 규칙을 바탕으로 Google Flow VEO 3.1-LIGHT용 TikTok 9:16, 4장면 연속 프롬프트를 만드는 브라우저 도구입니다.

## 사용 방법

1. `supabase-setup.sql` 전체를 Supabase SQL Editor에서 실행합니다.
2. Supabase Dashboard의 **Auth > Providers**에서 **Anonymous sign-ins**를 켭니다.
3. 브라우저로 `index.html`을 엽니다. 로컬 웹 서버를 쓰면 Supabase 인증 동작을 더 안정적으로 확인할 수 있습니다.
4. 조건을 적거나 비워 두고 **새 프롬프트 생성**을 누릅니다. 마음에 드는 결과만 **보관**합니다.

보관된 결과는 로그인된 익명 사용자에게만 보이며, 새 결과는 보관함의 음식·장소·변신 시작 방식·엔딩 조합과 비교해 같은 서명을 피합니다. Supabase 연결 또는 테이블 설정이 아직 안 된 경우에는 이 브라우저의 임시 보관함으로 동작합니다.

## 파일

- `index.html` — 작업 화면
- `app.js` — 생성 규칙, 중복 검사, Supabase 보관함
- `styles.css` — 반응형 UI
- `supabase-setup.sql` — 테이블·RLS·권한 설정
