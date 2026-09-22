# 설정 가이드 — Supabase · Google 로그인 · Vercel

이 문서는 React Playground를 **처음부터 다시 배포**하거나, 이미 배포된 프로젝트에 **Google 로그인을 켜는** 절차를 담는다. 현재 배포 정보는 맨 아래 [현재 배포 상태](#현재-배포-상태)에 있다.

---

## 1. 로컬 실행

```bash
git clone https://github.com/newids/codyssey-b1-2.git
cd codyssey-b1-2
pnpm install                # npm install / yarn 도 가능
cp .env.example .env        # 아래 2번에서 값을 채운다
pnpm dev                    # http://localhost:5173
```

| 명령 | 설명 |
| --- | --- |
| `pnpm dev` | 개발 서버 (HMR) |
| `pnpm build` | `tsc --noEmit` 타입 검사 후 `vite build` → `dist/` |
| `pnpm preview` | 빌드 결과 미리보기 (http://localhost:4173) |
| `pnpm test` | Vitest 단위·컴포넌트 테스트 |
| `pnpm test:coverage` | 커버리지 리포트 (`coverage/index.html`) |
| `pnpm typecheck` | 타입 검사만 |

---

## 2. Supabase 프로젝트

### 2.1 프로젝트 만들기 (CLI)

```bash
supabase login
supabase orgs list                                  # ORG_ID 확인
supabase projects create react-playground \
  --org-id <ORG_ID> --region ap-northeast-2 --db-password '<강한 비밀번호>'
supabase link --project-ref <PROJECT_REF> -p '<비밀번호>'
supabase db push -p '<비밀번호>'                     # supabase/migrations/*.sql 적용
supabase projects api-keys --project-ref <PROJECT_REF>   # anon key 확인
```

대시보드에서 만들어도 된다. **Project Settings → API** 에서 `Project URL`과 `anon public` 키를 복사한다.

### 2.2 스키마

`supabase/migrations/20260921000000_init.sql` 하나로 전부 만들어진다.

| 테이블 | 역할 | RLS |
| --- | --- | --- |
| `profiles` | `auth.users`와 1:1. 노트 작성자 이름·아바타 표시용. 가입 시 트리거 `handle_new_user()`가 자동 생성 | 누구나 읽기, 본인만 수정 |
| `notes` | **핵심 CRUD 데이터** (학습 노트) | 공개 노트는 누구나 읽기, 비공개는 본인만. 쓰기·수정·삭제는 본인만 |
| `lesson_progress` | 레슨 완료 표시 (user, lesson_slug 당 1행) | 본인만 |
| `quiz_attempts` | 퀴즈 시도 기록. 화면에서 최고점 계산 | 본인만 |

대시보드 **SQL Editor**에 파일 내용을 붙여 넣고 실행해도 같다.

### 2.3 환경변수

`.env` (로컬)와 Vercel 대시보드(배포) 양쪽에 같은 두 값을 넣는다.

```
VITE_SUPABASE_URL=https://<PROJECT_REF>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon public key>
```

- `.env`는 `.gitignore`에 포함되어 있다. **절대 커밋하지 않는다.**
- anon 키는 브라우저에 노출되는 공개 키다. 그래서 RLS 정책이 실제 보안 경계다. `service_role` 키는 프론트엔드에 넣지 않는다.
- 값이 없으면 `src/lib/supabase.ts`의 `assertSupabaseEnv()`가 앱 시작 시 바로 에러를 던진다 (조용히 깨지지 않게).

### 2.4 Auth URL 설정

**Authentication → URL Configuration**

| 항목 | 값 |
| --- | --- |
| Site URL | `https://codyssey-b1-2-react.vercel.app` |
| Redirect URLs | `https://codyssey-b1-2-react.vercel.app/**`, `http://localhost:5173/**`, `http://localhost:4173/**` |

CLI로는 `supabase/config.toml`의 `[auth] site_url`, `additional_redirect_urls`를 고친 뒤 `supabase config push --yes`.

---

## 3. Google 로그인 켜기

Google OAuth는 **Google Cloud Console에서 OAuth 클라이언트를 만든 사람만** 할 수 있어 CLI로 자동화되지 않는다. 5분 걸린다.

1. https://console.cloud.google.com/apis/credentials → 프로젝트 선택(또는 새로 만들기)
2. **OAuth 동의 화면** 구성: User Type = External, 앱 이름 "React Playground", 지원 이메일 입력, 범위는 기본(email, profile, openid)
3. **사용자 인증 정보 만들기 → OAuth 클라이언트 ID**
   - 애플리케이션 유형: **웹 애플리케이션**
   - 승인된 JavaScript 원본: `https://codyssey-b1-2-react.vercel.app`, `http://localhost:5173`
   - 승인된 리디렉션 URI: **`https://tpkuinfsgsjwthwnxxqq.supabase.co/auth/v1/callback`** (Supabase 대시보드 Google 공급자 화면에 표시되는 Callback URL과 동일해야 한다)
4. 발급된 **클라이언트 ID**와 **클라이언트 보안 비밀**을 복사
5. Supabase 대시보드 **Authentication → Providers → Google** → Enable → 두 값 붙여넣기 → Save

CLI로 하려면 `supabase/config.toml` 끝에 아래를 추가하고 환경변수를 넣은 뒤 `supabase config push --yes`:

```toml
[auth.external.google]
enabled = true
client_id = "env(SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_ID)"
secret = "env(SUPABASE_AUTH_EXTERNAL_GOOGLE_SECRET)"
```

### 3.1 앱 쪽 동작 — Google Identity Services(GIS) + `signInWithIdToken`

기본 경로는 Supabase 리다이렉트가 아니라 **Google 버튼을 앱에서 직접 띄우는** 방식이다. 리다이렉트 방식은 Google 동의 화면에 `…supabase.co` 도메인이 표시되기 때문이다.

1. `index.html`이 `https://accounts.google.com/gsi/client`를 로드한다.
2. `src/components/auth/GoogleSignInButton.tsx`가 `createNoncePair()`로 nonce를 만들고, `google.accounts.id.initialize({ client_id, nonce: sha256(nonce) })` 후 버튼을 그린다.
3. 사용자가 계정을 고르면 콜백이 ID 토큰(credential)을 받는다.
4. `src/lib/api/auth.ts` `signInWithGoogleIdToken(credential, nonce)` → `supabase.auth.signInWithIdToken({ provider: 'google', token, nonce })`. Supabase가 토큰 서명과 nonce 해시를 검증하고 세션을 만든다.
5. `AuthContext`가 세션 변경을 감지하고 `LoginPage`의 `useEffect`가 원래 가려던 경로로 보낸다.

필요한 설정:

| 위치 | 값 |
| --- | --- |
| `.env` / Vercel env | `VITE_GOOGLE_CLIENT_ID=<웹 클라이언트 ID>` (공개값) |
| Google 클라이언트 "승인된 JavaScript 원본" | `https://codyssey-b1-2-react.vercel.app`, `http://localhost:5173` |
| Supabase Providers → Google | Client ID / Secret (위 5번과 동일). `signInWithIdToken`은 토큰의 `aud`가 이 Client ID와 같은지 검사한다 |
| CSP (`vercel.json`) | `script-src`, `style-src`, `connect-src`, `frame-src`에 `https://accounts.google.com` |

GIS 스크립트를 못 불러오거나(광고 차단기) `VITE_GOOGLE_CLIENT_ID`가 없으면 버튼이 자동으로 **예비 경로**(`signInWithGoogle()` — Supabase 리다이렉트)로 바뀐다. 이 경우에만 동의 화면에 Supabase 도메인이 보인다.

> Google을 아직 켜지 않았어도 **이메일 매직 링크** 로그인은 바로 동작한다 (Supabase 기본 SMTP, 시간당 발송 제한 있음). 평가 시 Google 설정이 안 되어 있으면 이메일 로그인으로 전 기능을 확인할 수 있다.

---

## 4. Vercel 배포

```bash
vercel link --yes --project react-playground --scope <TEAM>
vercel env add VITE_SUPABASE_URL production        # 값 입력 (preview, development 도 반복)
vercel env add VITE_SUPABASE_ANON_KEY production
vercel --prod --yes
```

- `vercel.json`의 `rewrites`가 **모든 경로를 `index.html`로** 돌려준다. 이것이 없으면 `/notes/abc`로 직접 접속하거나 새로고침할 때 404가 난다 (SPA 라우팅의 필수 설정).
- 보안 헤더(`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `HSTS`)도 `vercel.json`에 있다.
- 환경변수를 바꾸면 **다시 배포**해야 반영된다 (Vite는 빌드 시점에 `import.meta.env`를 치환한다).

---

## 현재 배포 상태

| 항목 | 값 |
| --- | --- |
| 배포 URL | https://codyssey-b1-2-react.vercel.app |
| Vercel 프로젝트 | `jss-projects/codyssey-b1-2` |
| Supabase 프로젝트 | `codyssey-b1-2` (ref `tpkuinfsgsjwthwnxxqq`, Seoul) |
| 마이그레이션 | `20260921000000_init.sql` 적용 완료 |
| 환경변수 | Vercel production / preview / development 3곳 등록 완료 |
| Auth Site URL / Redirect URLs | `supabase config push`로 반영 완료 (2026-09-22) |
| 이메일 매직 링크 로그인 | 동작 (Supabase 기본 설정) |
| Google 로그인 | 설정 완료 (2026-09-22). GIS 버튼 + `signInWithIdToken` 방식, `VITE_GOOGLE_CLIENT_ID` Vercel 3환경 등록 |
