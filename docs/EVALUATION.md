# 평가 설명서 — B1-2 버튼 누르면 화면이 스르륵 바뀌는 요즘 웹사이트 만들기

> 제출물이 Mission-B1-2.md의 요구사항을 어디서·어떻게 만족하는지 근거(파일·함수·행)와 함께 정리하고, 평가자가 직접 재현할 수 있는 확인 절차와 학습자의 구술 답변 초안을 담는다. 행 번호는 작성 시점(2026-09-22) 기준이며 ±5행 오차가 있을 수 있다. 문항당 짧은 답변은 [EVALUATION-QUICK.md](EVALUATION-QUICK.md).

---

## 1. 제출물 개요

### 1.1 링크

| 항목 | 값 |
| --- | --- |
| 배포 URL | https://codyssey-b1-2-react.vercel.app |
| GitHub 저장소 | https://github.com/newids/codyssey-b1-2 |
| 백엔드 | Supabase (Postgres + Auth + RLS), 서울 리전 |
| 스크린샷 | `images/screenshots/` — home-desktop · lesson-detail · notes-empty · lessons-mobile (배포 URL에서 캡쳐) |

### 1.2 폴더 구조와 역할

```
src/App.tsx                       라우트 10개 정의 (BrowserRouter, 중첩 Layout, ProtectedRoute)
src/pages/*.tsx                   페이지 컴포넌트 10개 — 훅으로 데이터 받고 조립만
src/components/ui/                재사용 UI 14개 (Supabase를 모름)
src/components/{notes,lessons,layout,auth}/  도메인 컴포넌트 12개
src/hooks/                        useAsync · useNotes/useNote · useNoteForm · useLessonProgress · useQuizAttempts · useDebounce
src/context/                      AuthContext · ThemeContext · ToastContext (전역 상태)
src/lib/                          supabase 클라이언트, api/(notes·progress·auth), validation, errors, format, quiz, types
src/data/lessons.ts               레슨 8개 본문 + 퀴즈 (정적)
supabase/migrations/              스키마 · RLS · 컬럼 권한
vercel.json                       SPA rewrite + 보안 헤더(CSP 포함)
```

### 1.3 기술 스택

React 18.3 · TypeScript 5.5 · React Router 6.26 · @supabase/supabase-js 2.x · Vite 5 · Vitest 2 + Testing Library · CSS Modules + 커스텀 프로퍼티 · Vercel

---

## 2. 기능 요구사항 ↔ 구현 매핑

### 2.1 프로젝트 기본 구성

| 요구 | 구현 근거 |
| --- | --- |
| React 프로젝트 | `package.json` `react ^18.3.1`, `src/main.tsx` `createRoot` |
| pages / components / hooks(lib) 분리 | 위 1.2. 페이지는 `src/pages`, UI는 `src/components`, 훅은 `src/hooks`, 유틸은 `src/lib` |
| 공통 레이아웃(헤더/네비) | `src/components/layout/Layout.tsx` — `<Header/>` + `<Outlet/>` + `<Footer/>`. `App.tsx:22` `<Route element={<Layout />}>` 아래에 모든 라우트 |
| 서비스 주제 · 단일 핵심 데이터 | 학습 노트 `notes` (제목·내용·관련 레슨·공개 여부). 진도·퀴즈 점수는 부가 데이터 |

### 2.2 라우팅

| 요구 | 구현 근거 |
| --- | --- |
| 최소 5개 라우트 | `App.tsx:23-34` — 10개 |
| 목록/상세 | `/notes` (`NoteListPage`), `/notes/:id` (`NoteDetailPage`), 레슨도 `/lessons`, `/lessons/:slug` |
| Not Found | `App.tsx:34` `path="*"` → `NotFoundPage` (현재 경로를 보여주고 홈/레슨 링크) |
| 네비게이션 링크 | `Header.tsx` `NAV_ITEMS` — 레슨 / 학습 노트 / 내 진도, `NavLink`로 활성 표시. 모바일 햄버거 메뉴 |

확인: 배포 URL에서 `/asdf` 접속 → 404 페이지. `/notes/00000000-0000-0000-0000-000000000000` → "노트를 찾을 수 없습니다" (라우트는 매칭되지만 데이터 없음 → 빈 상태).

### 2.3 컴포넌트 설계 (재사용 8개 이상)

`src/components/ui/` — 모두 최소 1개 이상의 prop으로 동작·표시가 달라진다.

| 컴포넌트 | 동작을 바꾸는 prop | 쓰인 곳 |
| --- | --- | --- |
| `Button` | `variant`(primary/secondary/ghost/danger), `size`, `loading`(스피너+비활성) | 전 페이지 |
| `Input`, `Textarea` | `label`, `error`(aria-invalid + role=alert), `hint`, `maxLength`(카운터) | NoteForm, LoginPage |
| `Select` | `options`, `placeholder` | NoteForm, NoteListPage |
| `Card` | `as`, `interactive`, `padding` | 카드 전부 |
| `Badge` | `tone` 5종 | 레슨/노트 메타 |
| `Loading` | `variant`(spinner/skeleton), `count` | AsyncBoundary |
| `ErrorState` | `message`, `onRetry` | AsyncBoundary, NoteEditPage |
| `EmptyState` | `title`, `description`, `action` | AsyncBoundary |
| `AsyncBoundary` | `status`, `error`, `isEmpty`, `onRetry` | 목록·상세·수정·프로필·레슨 상세 |
| `ProgressBar` | `value`, `max`, `label` | 레슨 목록, 프로필 |
| `Toast` | `toasts`, `onDismiss` | ToastProvider |
| `ThemeToggle` | (Context) | Header |
| `CodeBlock` | `code`, `lang`, `caption` | LessonContent |
| `Avatar` | `name`, `src`, `size` | Header, NoteCard, 상세, 프로필 |

도메인: `NoteCard`, `NoteGrid`, `NoteForm`, `LessonCard`, `LessonContent`, `Quiz`, `PageHeader`, `ProtectedRoute`.

**페이지/UI 분리**: `src/pages/*`만 훅(`useNotes` 등)을 호출한다. `src/components/**`에는 `@/lib/api` import가 없다 (`grep -rn "lib/api" src/components` → `Header.tsx`의 `signOut` 1건뿐이며 이는 레이아웃의 로그아웃 버튼).

**로딩/에러/빈 상태 통일**: `AsyncBoundary.tsx:20-25` 한 곳에서 4분기. 페이지는 `status`와 `isEmpty`만 넘긴다.

### 2.4 상태 관리

| 요구 | 구현 근거 |
| --- | --- |
| 폼 입력 상태 (controlled) | `useNoteForm.ts` `values` state ↔ `NoteForm.tsx` `<Input value={values.title} onChange={…setField('title', …)}>` |
| 목록/상세 데이터 상태 | `useAsync.ts:15` `{ status, data, error }` — `useNotes`, `useNote`가 감싼다 |
| 로딩/에러 상태 | 같은 `status` 필드 (`'idle' \| 'loading' \| 'success' \| 'error'`, `lib/types.ts`) |
| 커스텀 훅 1개 이상 | `useNotes()`, `useNote(id)`, `useLessonProgress(userId)`, `useQuizAttempts(userId)`, `useNoteForm()`, `useDebounce()` |

### 2.5 CRUD (Supabase 원격 데이터)

| 동작 | API (`src/lib/api/notes.ts`) | 페이지 흐름 |
| --- | --- | --- |
| 목록 조회 | `listNotes({ ownerId, lessonSlug, search })` — `.select('*, author:profiles(…)')` | `NoteListPage` → `useNotes` → `NoteGrid` |
| 상세 조회 | `getNote(id)` `.eq('id', id).single()` | `NoteDetailPage` → `useParams` → `useNote(id)` |
| 등록 | `createNote(userId, input)` `.insert().select().single()` | `NoteNewPage` 제출 → 성공 시 `navigate('/notes/${created.id}')` + Toast |
| 수정 | `updateNote(id, input)` `.update().eq('id', id)` | `NoteEditPage` 기존 값 로드 → 제출 → `navigate('/notes/${id}')` + Toast |
| 삭제 | `deleteNote(id)` | `NoteDetailPage.tsx:28-34` 인라인 확인 → 삭제 → `navigate('/notes')` + Toast |

스키마: `supabase/migrations/20260921000000_init.sql` — `notes(id, user_id → profiles, lesson_slug, title, content, is_public, created_at, updated_at)`. RLS `:89-99` 읽기는 공개 노트 또는 본인, 쓰기·수정·삭제는 `auth.uid() = user_id`.

### 2.6 폼 UX

| 요구 | 구현 근거 |
| --- | --- |
| 필수값 검증 | `lib/validation.ts` `validateNote()` — 제목 2~80자, 내용 10~5000자. `useNoteForm.ts:29` `useMemo`로 값이 바뀔 때마다 재검증 |
| 에러 메시지 위치 | `Input.tsx:30` `aria-invalid` + `aria-describedby` → 필드 바로 아래 `<p role="alert">`. blur 또는 제출 시도 후 노출(`touched`) |
| 제출 중 표시 | `NoteForm.tsx:85` `<Button type="submit" loading={isSubmitting}>` → 스피너 + `disabled` + 문구 "저장 중…". 폼 전체 `aria-busy` |
| 실패 표시 | `NoteForm.tsx:36` `submitStatus === 'error'` → 상단 `role="alert"` 박스. 메시지는 `lib/errors.ts` `toUserMessage()`가 네트워크/권한/없음으로 번역 |

테스트: `src/components/__tests__/NoteForm.test.tsx` 4개, `src/hooks/__tests__/useNoteForm.test.tsx` 6개.

### 2.7 이벤트 → 상태 → 렌더링 (3군데 이상)

| # | 이벤트 | 상태 변경 | 렌더링 변화 | 근거 |
| --- | --- | --- | --- | --- |
| 1 | 검색어 입력 | `search` state + URL `?q=` → `useDebounce` → `useNotes` fetcher 변경 | 목록 재조회, "N개의 노트" 갱신 | `NoteListPage.tsx`, `useNotes.ts:9` |
| 2 | 난이도 필터 클릭 | `level` state | 레슨 카드 목록 필터 | `LessonListPage.tsx:19-22` (`useMemo`) |
| 3 | 제목·내용 타이핑 | `useNoteForm.values` | 오른쪽 미리보기 카드 즉시 갱신 + 글자 수 카운터 | `NoteForm.tsx` `<aside aria-label="미리보기">` |
| 4 | 퀴즈 보기 선택 | `answers` (새 객체 스프레드) | 채점 버튼 활성화 → 채점 후 정답/오답 색·해설 | `Quiz.tsx:30`, `:107`, `:121` |
| 5 | 저장/삭제 성공 | `ToastContext.toasts` | 하단 알림 표시 후 3.2초 뒤 소멸 | `ToastContext.tsx:29-32` |
| 6 | 테마 토글 | `ThemeContext.theme` → `document.documentElement.dataset.theme` | 전체 색상 전환 | `ThemeToggle.tsx`, `ThemeContext.tsx` |
| 7 | 레슨 완료 클릭 | `useLessonProgress.optimistic` → 서버 반영 → `refetch` | 진도 바·배지 즉시 반영, 실패 시 롤백 + 에러 Toast | `useLessonProgress.ts` `toggle()` |

### 2.8 배포

- Vercel 프로젝트 `jss-projects/codyssey-b1-2`, 환경변수 `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`를 production/preview/development 3곳에 등록.
- `vercel.json` `rewrites: /(.*) → /index.html` — 딥링크·새로고침 시 SPA 라우팅 유지.
- 환경변수 누락 시 `lib/supabase.ts` `assertSupabaseEnv()`가 시작 즉시 throw → "일부만 동작"하는 상태가 생기지 않는다.
- 배포 URL에서 §6 QA 시나리오로 목록/상세/등록/수정/삭제 확인.

### 2.9 보너스

| 항목 | 구현 |
| --- | --- |
| 전역 상태 | `AuthContext`(로그인 사용자·세션·isReady), `ThemeContext`(테마 + localStorage), `ToastContext`(알림) |
| 메모이제이션 | `React.memo`: `NoteCard.tsx:17`, `LessonCard.tsx:16` · `useMemo`: 필터(`LessonListPage:22`), 검증(`useNoteForm:29`), 최고점(`useQuizAttempts` `bestByLesson`), 퀴즈 채점 · `useCallback`: 모든 fetcher, `toggle`, `record`, `showToast` |
| 인증 + 보호 라우트 | Supabase Auth Google OAuth + 이메일 매직 링크 (`lib/api/auth.ts`). `ProtectedRoute.tsx:9-10` — 세션 복원 전 로딩, 비로그인 `/login`으로 `state.from` 보존 → 로그인 후 복귀 (`LoginPage` `useEffect`) |

### 2.10 제약 사항

| 제약 | 확인 |
| --- | --- |
| `.env`가 `.gitignore`에 | `.gitignore` 4~6행 `.env`, `.env.*`, `!.env.example`. `git check-ignore .env` → 무시됨 |
| API 키 미푸시 | 저장소에 `eyJhbGci`로 시작하는 문자열 없음. `.env.example`은 플레이스홀더 |
| 배포 환경변수 별도 등록 | Vercel 대시보드 (`vercel env ls`) |
| React 18 이상 | 18.3.1 |

---

## 3. 과제 목표 5개 — 구술 답변 초안

### Q1. 컴포넌트가 왜 필요한가, 어떤 기준으로 쪼갰나

**원리.** 컴포넌트는 props → JSX 함수다. 화면을 함수로 나누면 (1) 같은 모양을 두 번 짜지 않고, (2) 각 조각이 "자기 상태"를 격리하며, (3) 조각 단위로 테스트할 수 있다.

**내 기준 3가지.** 반복된다(Button, Card, Badge — 3곳 이상) / 독립적으로 이해된다(NoteCard, Quiz — 그 조각만 보고 무엇인지 말할 수 있다) / 자기 상태를 가진다(NoteForm의 입력값, Header의 메뉴 열림, Quiz의 답안).

**페이지 vs UI.** `pages/`는 라우트 하나에 대응하며 데이터를 가져와 조립만 한다. `components/`는 props만 받아 그린다. 이 경계 덕에 `AsyncBoundary` 하나를 5개 페이지가 공유하고, `NoteForm`은 등록·수정 두 페이지가 공유한다.

**쪼개지 않은 것.** `HomePage`의 소개 섹션은 한 번만 쓰이고 상태가 없어 컴포넌트로 빼지 않았다. 과한 분리는 파일만 늘린다.

**소스.** `AsyncBoundary.tsx:20-25`, `NoteForm.tsx`가 `NoteNewPage`/`NoteEditPage`에서 `initialValues`·`submitLabel`만 달리 받는 부분.

### Q2. props와 state의 차이, 상태를 어디에 두었나

**차이.** props는 부모가 주는 읽기 전용 인자, state는 컴포넌트가 `useState`로 만들고 스스로 바꾸는 값. state가 바뀌면 그 컴포넌트가 다시 그려진다.

**위치 규칙.** "그 값을 바꾸는 사람이 누구인가"와 "누가 읽는가"로 정한다. 읽는 컴포넌트들의 가장 가까운 공통 부모에 둔다(끌어올리기).

**이 사이트의 예.**
- 검색어: `NoteListPage`가 소유. 입력창은 `onChange`로 올리고(상향), `NoteGrid`는 `notes` props로 받는다(하향). `NoteListPage.tsx` `useState(params.get('q'))`.
- 폼 값: `useNoteForm`이 소유하고 `NoteForm`이 `Input`에 `value`/`onChange`로 내린다. `Input`은 자기 상태가 없다.
- 퀴즈 답안: `Quiz` 내부 state. 다른 곳이 안 읽으니 지역에 둔다.
- 로그인 사용자·테마·알림: 트리 전체가 읽으니 Context. 끌어올리다 보면 최상단까지 가는 값만 전역으로.

**흐름 방향.** 항상 데이터는 아래로(props), 이벤트는 위로(콜백). 자식이 부모 state를 직접 바꾸는 경로는 없다.

### Q3. useEffect는 언제 실행되고, 의존성은 어떻게 동작하며, 데이터 요청과 어떤 관계인가

**언제.** 렌더링이 화면에 반영된 직후. 그래서 첫 화면엔 `status='loading'`이 잠깐 보인다.

**의존성.** 배열 안 값이 이전 렌더링과 `Object.is`로 다르면 effect를 다시 실행하고, 그 전에 이전 effect의 cleanup을 먼저 부른다. `[]`면 마운트 때 한 번, 없으면 매번.

**데이터 요청과의 관계.** `useAsync.ts:21` `useEffect(() => {…}, [fetcher, enabled, tick])`. fetcher가 바뀌면(= 조회 조건이 바뀌면) 재요청. `useNote(id)`는 `useCallback(…, [id])`로 fetcher를 만들어 라우트 파라미터가 바뀔 때만 재요청한다. fetcher를 `useCallback` 없이 넘기면 렌더링마다 새 함수 → 무한 요청. `useAsync.test.tsx`의 "fetcher 참조가 바뀌면 재요청" 테스트가 이 계약을 고정한다.

**cleanup.** `useAsync.ts:41` `cancelled = true`. 목록→상세로 빠르게 이동하면 이전 요청 응답이 늦게 도착할 수 있다. 떠난 화면의 `setState`를 막아 경쟁 상태를 없앤다. `AuthContext`의 `onAuthStateChange` 구독도 cleanup에서 해제한다.

### Q4. 로딩/성공/실패/빈 상태를 React UI로 어떻게 표현했나

**상태 하나.** `AsyncStatus = 'idle' | 'loading' | 'success' | 'error'`. `isLoading`/`isError` boolean 두 개를 쓰면 "둘 다 true"인 불가능한 조합이 생기므로 문자열 유니온으로 정확히 하나만 갖게 했다.

**빈 상태.** `success`인데 결과가 0건인 경우. 요청은 성공했으니 status로는 구분되지 않는다. 페이지가 `isEmpty={data.length === 0}`을 계산해 넘긴다.

**한 곳에서 분기.** `AsyncBoundary`가 `Loading` / `ErrorState(onRetry)` / `EmptyState(action)` / children 넷 중 하나를 그린다. 목록은 skeleton, 상세는 spinner처럼 `loading` prop으로 모양만 바꾼다.

**에러 화면의 행동.** "다시 시도" 버튼이 `refetch()`를 부른다. 메시지는 `toUserMessage()`가 네트워크/권한/없음으로 번역한다. 빈 화면에는 "노트 작성하기" 버튼을 둔다.

**제출 쪽.** 폼은 `submitStatus`로 같은 4상태를 갖고, `loading`이면 버튼 스피너, `error`면 상단 alert.

### Q5. 하나의 기능에서 라우팅 → 컴포넌트 → 상태 → 이벤트 → 렌더링이 어떻게 연결되나

**기능: 노트 삭제.**

1. **라우팅** — `/notes/abc` 진입. `App.tsx:28` 매칭 → `NoteDetailPage`. `useParams()`로 `id = 'abc'`.
2. **컴포넌트** — `NoteDetailPage`가 `useNote(id)` 호출.
3. **상태** — `useAsync` effect가 `status: 'loading'` → `getNote('abc')` → `'success'` + `data`. `AsyncBoundary`가 로딩 → 본문으로 전환.
4. **이벤트** — "삭제" 클릭 → `setIsConfirming(true)` → 인라인 확인 UI 렌더링. "삭제 확인" 클릭 → `handleDelete`: `setIsDeleting(true)`(버튼 스피너) → `deleteNote(id)` → 성공 시 `showToast()` + `navigate('/notes', { replace: true })`.
5. **렌더링** — URL이 `/notes`로 바뀌어 `NoteListPage`가 마운트, `useNotes` effect가 목록을 새로 받는다. 하단에 Toast. 실패하면 `setIsDeleting(false)` + 에러 Toast, 상세 화면은 그대로.

같은 사슬이 등록(`NoteNewPage` → `createNote` → `navigate('/notes/${created.id}')`)과 퀴즈(선택 → `answers` → 채점 → `record()` → 프로필 최고점)에도 반복된다.

---

## 4. 평가 문항 대응표 (예상 문항)

| 문항 | 어디서 확인 | 답변 요지 |
| --- | --- | --- |
| 라우트가 5개 이상이고 목록/상세/404가 있는가 | `App.tsx:22-34`, 배포 URL `/asdf` | 10개. `path="*"` 404 |
| 재사용 컴포넌트 8개 이상, prop으로 달라지는가 | §2.3 표 | 14 + 8 |
| 페이지와 UI가 섞이지 않았는가 | `grep -rn "lib/api" src/components` | 데이터 접근은 pages와 hooks에만 |
| 로딩/에러/빈 상태가 통일되었는가 | `AsyncBoundary.tsx` | 5개 페이지가 같은 컴포넌트 |
| 커스텀 훅으로 조회 흐름이 분리되었는가 | `hooks/useNotes.ts` | `useNotes`, `useNote` + 기반 `useAsync` |
| CRUD가 원격 데이터로 동작하는가 | `lib/api/notes.ts`, 배포 URL | Supabase `notes` 테이블, RLS |
| 폼 검증·에러·제출 중·실패 표시 | `NoteForm.tsx`, `useNoteForm.ts` | §2.6 |
| 상태 → 렌더링 지점 3개 이상 | §2.7 | 7개 |
| 배포 URL에서 전 기능 동작 | §6 QA | 환경변수 3환경 등록, rewrite |
| `.env` 미커밋 | `.gitignore`, git 로그 | 예외는 `.env.example`뿐 |
| 전역 상태 (보너스) | `src/context/` | 3개 |
| 메모이제이션 (보너스) | `NoteCard:17`, `LessonCard:16`, `useMemo`/`useCallback` | §2.9 |
| 인증·보호 라우트 (보너스) | `ProtectedRoute.tsx`, `LoginPage.tsx` | Google + 이메일 링크, 복귀 경로 보존 |

---

## 5. 자동 검증

```bash
pnpm typecheck        # 타입 에러 0
pnpm test             # 11 files, 57 tests
pnpm build            # dist/ 생성, gzip JS ≈ 140 kB (supabase-js 포함), CSS ≈ 8 kB
git check-ignore .env # → .env
grep -rn "dangerouslySetInnerHTML\|innerHTML" src   # 0건
```

테스트 범위: 순수 로직(validation·format·errors·quiz), 훅(useAsync 6개 — 전이·에러·refetch·enabled·의존성·cleanup, useNoteForm 6개, useDebounce, summarizeAttempts), 컴포넌트(Button, Input a11y, AsyncBoundary 4분기, ProgressBar, EmptyState, Quiz 4개, NoteForm 4개). Supabase 네트워크에 의존하는 페이지·API 계층은 §6 수동 QA로 확인한다.

---

## 6. 수동 QA 시나리오 (배포 URL)

로그인이 필요한 시나리오는 **이메일 링크 로그인**(즉시 가능) 또는 Google 로그인(OAuth 클라이언트 등록 후)으로 진행한다.

| # | 시나리오 | 기대 결과 |
| --- | --- | --- |
| 1 | `/` 접속 | 히어로, 레슨 8개 목록, 헤더 네비 |
| 2 | 헤더 "레슨" 클릭 | `/lessons`, 페이지 새로고침 없이 전환, 활성 링크 강조 |
| 3 | 난이도 "응용" 클릭 | 카드 3개만 남음 |
| 4 | 레슨 카드 클릭 → `/lessons/use-effect` | 본문·코드 블록·"이 사이트에서 쓰인 곳"·퀴즈 |
| 5 | 퀴즈 2문항만 답함 | "채점하기" 비활성 |
| 6 | 전부 답하고 채점 | 점수, 정답 초록/오답 빨강, 해설. 비로그인이면 "로그인하면 점수가 기록됩니다" |
| 7 | "다시 풀기" | 답안 초기화 |
| 8 | `/notes` 접속 (데이터 없음) | 스켈레톤 → "표시할 노트가 없습니다" + 안내 |
| 9 | `/notes/new` 비로그인 접속 | `/login`으로 이동 |
| 10 | 로그인 (이메일 링크 또는 Google) | 헤더에 이름·아바타, `/notes/new`로 복귀 |
| 11 | 빈 폼 저장 클릭 | 제목·내용 아래 빨간 에러, 저장 안 됨 |
| 12 | 제목 1자 입력 후 blur | "제목은 2자 이상" |
| 13 | 제목·내용 입력 | 오른쪽 미리보기 실시간 갱신, 글자 수 카운터 |
| 14 | 저장 | 버튼 "저장 중…" 스피너 → 상세 페이지로 이동 + "노트를 저장했습니다" Toast |
| 15 | 상세에서 새로고침 | 같은 노트 (rewrite 확인) |
| 16 | "수정" → 내용 변경 → 저장 | 상세로 복귀, "(수정됨)" 표시, Toast |
| 17 | "삭제" → "삭제 확인" | `/notes`로 이동, 목록에서 사라짐, Toast |
| 18 | 검색어 입력 | 300ms 뒤 목록 갱신, URL `?q=` 반영. 새로고침해도 유지 |
| 19 | "내 노트" 토글 | 내 노트만, URL `?filter=mine` |
| 20 | 레슨 상세 "이 레슨 완료로 표시" | 즉시 배지 + Toast, `/lessons` 진도 바 증가, `/profile` 목록 체크 |
| 21 | `/profile` | 완료 레슨 수, 퀴즈 최고 점수 표, 내 노트 |
| 22 | 로그인 후 퀴즈 채점 | "점수가 저장되었습니다", `/profile` 표에 반영 |
| 23 | 테마 토글 | 전체 다크/라이트 전환, 새로고침 후 유지 |
| 24 | 네트워크 오프라인(DevTools) 후 `/notes` 새로고침 | 빨간 에러 카드 "네트워크 연결을 확인해 주세요" + "다시 시도" |
| 25 | 다른 계정의 노트 `/notes/:id/edit` 접속 | "권한이 없습니다" (UI) — 직접 API로 시도해도 RLS가 거부 |
| 26 | `/asdf` | 404 페이지 |
| 27 | 로그아웃 | 헤더 "로그인" 버튼, `/profile` 접속 시 `/login` |
| 28 | 브라우저 폭 390px | 햄버거 메뉴, 카드 1열, 폼 1열 (미리보기 아래) |

---

## 7. 알려진 제한 · 후속 작업

- **Google OAuth 클라이언트**는 Google Cloud Console 소유자만 발급할 수 있어 코드·CLI로 자동화되지 않았다. [SETUP.md §3](SETUP.md#3-google-로그인-켜기) 절차(5분)로 켠다. 그때까지는 이메일 링크 로그인으로 전 기능이 동작한다.
- Supabase Auth의 **Site URL / Redirect URLs**는 `supabase/config.toml`에 선언되어 있으나, 이 세션에서는 CLI의 키체인 접근 확인 대기로 `supabase config push`가 완료되지 않았다. 대시보드 Authentication → URL Configuration에서 표의 값을 넣거나, 터미널에서 `supabase config push --yes`를 직접 실행하면 된다.
- 테스트는 React 로직에 집중했고 페이지 통합 테스트(Supabase 모킹)는 없다. E2E는 §6 수동 시나리오로 대신한다.
