# 미션 수행 가이드 — B1-2 버튼 누르면 화면이 스르륵 바뀌는 요즘 웹사이트 만들기

React로 SPA 하나를 끝까지 만들면서 "컴포넌트 → 상태 → 이벤트 → 렌더링"이 실제로 어떻게 이어지는지 확인하는 미션의 실행 가이드. 이 저장소(React Playground)의 실제 코드를 기준으로 **무엇을, 어떤 순서로, 왜 그렇게** 만들었는지 정리했다.

---

## 1. 미션 한눈에 보기

### 목적

- 이론으로는 "상태가 어디 있어야 하는지"가 잡히지 않는다. 직접 SPA를 만들어야 보인다.
- 평가 기준은 백엔드가 아니라 **React 관점의 구조와 데이터 흐름 완성도**다.
- 이전 미션(B1-1)에서 손으로 짰던 `setState() → render()` 패턴이 React에서는 `useState` → 리렌더링으로 추상화된다.

### 최종 결과물 5가지 ↔ 이 저장소

| # | 결과물 | 구현 |
| --- | --- | --- |
| 1 | 라우팅이 있는 SPA (5개 이상) | `src/App.tsx` — 라우트 **10개** (`/`, `/login`, `/lessons`, `/lessons/:slug`, `/notes`, `/notes/:id`, `/notes/new`, `/notes/:id/edit`, `/profile`, `*`) |
| 2 | 핵심 데이터 CRUD + 목록/상세 | `notes` 테이블. `src/lib/api/notes.ts` (list/get/create/update/delete), `NoteListPage` / `NoteDetailPage` / `NoteNewPage` / `NoteEditPage` |
| 3 | 폼 기반 입력 경험 | `src/components/notes/NoteForm.tsx` + `src/hooks/useNoteForm.ts` + `src/lib/validation.ts` — 검증, 필드별 에러, 제출 중 상태, 실패 표시 |
| 4 | 상태 관리가 설계된 UI | `src/components/ui/AsyncBoundary.tsx` 하나로 로딩/에러/빈/성공을 통일. `useAsync` 훅이 `status` 전이를 담당 |
| 5 | 배포 | https://codyssey-b1-2-react.vercel.app (Vercel), Supabase Seoul. README에 실행 방법·기술 스택 |

### 서비스 주제 선정

"React를 배우는 사이트"를 주제로 잡았다. 이유는 두 가지다.

1. **핵심 데이터가 자연스럽게 하나로 정해진다** — 학습 노트(`notes`). 제목·내용·관련 레슨·공개 여부. 등록/조회/수정/삭제가 모두 의미 있다.
2. **사이트 자체가 교재가 된다** — 레슨 본문에서 "이 개념이 이 사이트 어디에 쓰였는지"를 파일 경로로 가리킬 수 있다 (`data/lessons.ts`의 `usedIn`). 배우는 내용과 만드는 코드가 같다.

레슨 본문(8개)과 퀴즈는 정적 데이터(`src/data/lessons.ts`)로 두고, 사용자가 만드는 데이터(노트·진도·퀴즈 점수)만 Supabase에 저장한다. "단일 핵심 데이터 CRUD" 제약을 지키면서 로그인 사용자 기능(진도·점수)을 얹을 수 있다.

### 제약 ↔ 확인 방법

| 항목 | 규칙 | 확인 |
| --- | --- | --- |
| React 18 이상 | `package.json` `react: ^18.3.1` | `pnpm ls react` |
| 페이지/컴포넌트/훅 분리 | `src/pages`, `src/components`, `src/hooks` + `src/lib` | `tree src -L 2` |
| Supabase 또는 Firebase | Supabase (`@supabase/supabase-js`) | `src/lib/supabase.ts` |
| `.env`가 `.gitignore`에 | `.env`, `.env.*` 포함, `.env.example`만 예외 | `git check-ignore .env` → `.env` |
| API 키 미커밋 | anon 키는 Vercel 대시보드 + 로컬 `.env`에만 | `git log -p \| grep -c "eyJhbGci"` → 0 |
| 배포 환경에서 전 기능 동작 | Vercel env 3곳(production/preview/development) 등록 | 배포 URL에서 CRUD 수행 |

---

## 2. 수행 순서 (실제로 만든 순서)

이 순서는 "의존성이 적은 것부터"다. 아래 순서로 만들면 각 단계에서 바로 실행해 볼 수 있다.

### Step 0. 프로젝트 골격

```bash
pnpm init && pnpm add react react-dom react-router-dom @supabase/supabase-js
pnpm add -D vite @vitejs/plugin-react typescript @types/react @types/react-dom vitest jsdom @testing-library/react @testing-library/user-event @testing-library/jest-dom
```

- `vite.config.ts`에 `@` → `src` 별칭. import 경로가 `../../..`로 깊어지는 걸 막는다.
- `tsconfig.json`은 `strict: true`. TypeScript는 선택이지만, `Note` 타입 하나가 API·훅·컴포넌트를 관통하니 오타를 컴파일 시점에 잡아준다.
- `.gitignore`에 `.env`를 **먼저** 넣는다. 나중에 넣으면 이미 커밋된 뒤다.

### Step 1. 디자인 토큰과 전역 스타일

`src/styles/tokens.css`에 색(oklch)·타이포(clamp)·간격·모션 토큰을 정의하고, 다크 모드는 `[data-theme='dark']`와 `prefers-color-scheme` 양쪽으로 재정의한다. 컴포넌트 CSS는 전부 `var(--…)`만 쓴다.

왜 먼저? 나중에 컴포넌트 14개를 만들 때 색·여백 값을 매번 고민하지 않기 위해서다.

### Step 2. lib — 데이터 계층 (React를 모르는 코드)

| 파일 | 역할 |
| --- | --- |
| `lib/supabase.ts` | 클라이언트 생성. 환경변수 없으면 `assertSupabaseEnv()`가 **즉시 throw** — 배포 사고를 조용히 넘기지 않는다 |
| `lib/types.ts` | `AsyncStatus = 'idle' \| 'loading' \| 'success' \| 'error'`, `Note`, `NoteInput` 등 |
| `lib/api/notes.ts` | `listNotes / getNote / createNote / updateNote / deleteNote` — Supabase 쿼리만. 에러는 throw |
| `lib/api/progress.ts` | 진도 upsert/delete, 퀴즈 기록 insert/list |
| `lib/api/auth.ts` | `signInWithGoogle / signInWithEmailLink / signOut` |
| `lib/validation.ts` | `validateNote(input) → errors` 순수 함수 |
| `lib/errors.ts` | `toUserMessage(err)` — 네트워크/권한/없음을 한국어 한 줄로 |
| `lib/quiz.ts` | `scoreQuiz`, `isQuizComplete` 순수 함수 |

이 계층은 React import가 하나도 없다. 그래서 `validation.test.ts`, `quiz.test.ts`처럼 DOM 없이 테스트한다.

### Step 3. 스키마와 RLS

`supabase/migrations/20260921000000_init.sql`. 핵심은 세 가지.

1. `profiles`는 `auth.users` insert 트리거로 자동 생성 — Google 메타데이터(`full_name`, `avatar_url`)를 복사해 노트 작성자 표시에 쓴다.
2. `notes.user_id → profiles.id` 외래키. 그래야 `select('*, author:profiles(display_name, avatar_url)')` 한 번에 작성자를 조인한다.
3. RLS: 공개 노트는 누구나 읽고, 쓰기·수정·삭제는 `auth.uid() = user_id`. anon 키가 브라우저에 노출되므로 **RLS가 유일한 보안 경계**다.

### Step 4. 훅 — 상태 전이를 한 곳에

`hooks/useAsync.ts`가 전부의 뼈대다.

```ts
export function useAsync<T>(fetcher: () => Promise<T>, initialData: T, enabled = true)
// → { status, data, error, refetch }
```

- `useEffect(…, [fetcher, enabled, tick])` — fetcher 참조가 바뀌면 재요청. 그래서 호출하는 쪽은 **반드시 `useCallback`으로 fetcher를 고정**한다. (안 그러면 렌더링마다 새 함수 → 무한 요청. `useAsync.test.tsx`의 "fetcher 참조가 바뀌면 재요청" 테스트가 이 계약을 고정한다.)
- cleanup에서 `cancelled = true` — 목록→상세로 빠르게 이동할 때 이전 응답이 새 화면을 덮어쓰는 경쟁 상태를 막는다.
- `refetch()`는 `tick` state를 올려 effect를 다시 돌린다. 에러 화면의 "다시 시도" 버튼이 이걸 부른다.

그 위에 도메인 훅을 얹는다.

| 훅 | 돌려주는 것 | 의존성 |
| --- | --- | --- |
| `useNotes({ ownerId, lessonSlug, search })` | 노트 목록 | 필터 3개 |
| `useNote(id)` | 노트 1개 | 라우트 파라미터 `id` |
| `useLessonProgress(userId)` | `completedSlugs`, `percent`, `toggle()` (낙관적 업데이트 + 롤백) | `userId` |
| `useQuizAttempts(userId)` | `bestByLesson`, `record()` | `userId` |
| `useNoteForm(initial)` | `values`, `visibleErrors`, `submitStatus`, `setField`, `touch`, `submit` | — |
| `useDebounce(value, 300)` | 300ms 뒤의 값 (검색어) | `value` |

### Step 5. 전역 Context 3개

| Context | 상태 | 왜 전역인가 |
| --- | --- | --- |
| `AuthContext` | `user`, `session`, `isReady`, `displayName`, `avatarUrl` | 헤더·보호 라우트·모든 페이지가 쓴다. `onAuthStateChange` 구독 + cleanup |
| `ThemeContext` | `theme`, `toggleTheme` | 문서 전체 색. localStorage에 저장 |
| `ToastContext` | `toasts`, `showToast` | 어느 페이지에서든 "저장됨" 알림 |

`isReady`가 중요하다. 세션 복원이 끝나기 전에 `user === null`이라고 `/login`으로 보내면, 새로고침할 때마다 로그인 페이지로 튕긴다. `ProtectedRoute`는 `isReady`가 false면 로딩만 보여준다.

### Step 6. UI 컴포넌트 (재사용, props로 달라지는 것)

`components/ui/` 14개. 전부 Supabase를 모른다.

- **폼**: `Button(variant, size, loading)`, `Input/Textarea(label, error, hint)`, `Select(options)`
- **상태**: `Loading(variant: spinner|skeleton)`, `ErrorState(message, onRetry)`, `EmptyState(title, action)`, 그리고 셋을 묶는 **`AsyncBoundary(status, error, isEmpty, onRetry)`**
- **표시**: `Card(interactive)`, `Badge(tone)`, `ProgressBar(value, max)`, `Avatar(name, src)`, `CodeBlock(code)`, `ThemeToggle`, `Toast`

`AsyncBoundary`가 이 미션의 요구사항 4("로딩/에러/빈 상태가 모든 핵심 화면에서 일관된 방식")를 직접 만족시킨다. 목록·상세·수정·프로필·레슨 상세 5개 페이지가 같은 컴포넌트를 쓴다.

### Step 7. 도메인 컴포넌트

- `notes/NoteCard` (`React.memo`), `NoteGrid`, `NoteForm` (폼 + 실시간 미리보기)
- `lessons/LessonCard` (`React.memo`), `LessonContent` (블록 렌더러), `Quiz` (선택 → 채점 → 저장)
- `layout/Layout, Header, Footer, PageHeader`, `auth/ProtectedRoute`

### Step 8. 페이지 — 조립만

페이지는 훅으로 데이터를 받고, `AsyncBoundary`로 감싸고, 도메인 컴포넌트를 배치한다. 예: `NoteListPage`는 60줄 남짓이며 Supabase 호출이 한 줄도 없다.

### Step 9. 라우터

`App.tsx`: `<Layout>` 아래에 공개 라우트 6개, `<ProtectedRoute>` 아래에 보호 라우트 3개, 마지막에 `path="*"`.

### Step 10. 배포

1. Supabase: `supabase projects create` → `link` → `db push` → anon 키 확인
2. Vercel: `vercel link` → `vercel env add ×2 ×3환경` → `vercel --prod`
3. `vercel.json`의 rewrite가 없으면 `/notes/abc` 직접 접속이 404가 난다. 이 한 줄이 SPA 배포의 핵심이다.
4. 배포 URL에서 목록·상세·등록·수정·삭제를 **직접** 해 본다. 환경변수 누락은 로컬에서 안 보인다.

자세한 절차는 [SETUP.md](SETUP.md).

---

## 3. 자주 막히는 지점과 해법

| 증상 | 원인 | 이 저장소의 해법 |
| --- | --- | --- |
| 목록이 계속 로딩이고 네트워크 탭에 요청이 수백 개 | effect 의존성에 매 렌더링 새로 만들어지는 함수/객체 | `useNotes`가 `useCallback(…, [ownerId, lessonSlug, search])`로 fetcher 고정 |
| 상세에서 뒤로 갔다가 다른 노트를 눌렀는데 이전 노트가 보임 | 의존성 배열에 `id` 누락 | `useNote(id)`의 `useCallback([id])` |
| 새로고침하면 로그인이 풀린 것처럼 `/login`으로 감 | 세션 복원 전 `user === null` | `AuthContext.isReady` + `ProtectedRoute`의 로딩 분기 |
| 저장 버튼 두 번 눌러 노트가 두 개 생김 | 제출 중 상태 없음 | `useNoteForm.submitStatus === 'loading'` → `Button loading` 비활성화 |
| 첫 글자부터 빨간 에러 | 검증 즉시 노출 | `touched` Set — blur 또는 제출 시도 후에만 `visibleErrors` |
| 배포에서 `/notes/…` 새로고침 404 | 정적 호스팅이 그 경로 파일을 찾음 | `vercel.json` rewrites → `index.html` |
| 배포에서 목록이 에러 | 환경변수 미등록 | `assertSupabaseEnv()`가 명확한 메시지로 즉시 실패, Vercel env 3환경 등록 |
| 다른 사람 노트가 수정됨 | RLS 없음 | update/delete 정책 `auth.uid() = user_id` + UI에서도 `isOwner`일 때만 버튼 |

---

## 4. 제출물 체크리스트

- [x] 배포 URL — https://codyssey-b1-2-react.vercel.app
- [x] GitHub 저장소 — https://github.com/newids/codyssey-b1-2
- [x] README: 실행 방법, 기술 스택, 라우트, 폴더 구조
- [x] 라우트 5개 이상 (10개), 목록/상세, Not Found, 네비게이션
- [x] 재사용 컴포넌트 8개 이상 (ui 14개 + 도메인 6개)
- [x] 커스텀 훅 1개 이상 (6개)
- [x] 원격 CRUD (Supabase `notes`)
- [x] 폼 검증 · 에러 표시 · 제출 중 · 실패 표시
- [x] 상태 → 렌더링 지점 3개 이상 (README에 7개 표)
- [x] 보너스: 전역 상태(Context 3개), 메모이제이션, 인증 + 보호 라우트
- [x] Google 로그인 — GIS 버튼 + `signInWithIdToken` ([SETUP.md §3](SETUP.md#3-google-로그인-켜기))
