# 평가 항목 답변 — 빠른 버전

[EVALUATION.md](EVALUATION.md)의 내용을 **문항당 30초~2분**으로 줄인 구술 답변 연습용. 근거 파일은 괄호 안.

---

## A. 과제 목표 5문항

### 1. 컴포넌트는 왜 필요하고, 어떤 기준으로 쪼갰나요?

컴포넌트는 props를 받아 화면을 돌려주는 함수입니다. 화면을 함수로 나누면 반복을 없애고, 상태를 조각 안에 가두고, 조각 단위로 테스트할 수 있습니다.

제 기준은 셋입니다. **반복되면** 컴포넌트(Button·Card·Badge), **혼자서 이해되면** 컴포넌트(NoteCard·Quiz), **자기 상태가 있으면** 컴포넌트(NoteForm·Quiz). 그리고 `pages/`는 데이터를 받아 조립만 하고 `components/`는 Supabase를 모릅니다. 그래서 `AsyncBoundary` 하나를 5개 페이지가 쓰고, `NoteForm` 하나를 등록·수정 두 페이지가 씁니다. (`src/components/ui/AsyncBoundary.tsx`)

### 2. props와 state의 차이는, 상태는 어디에 뒀나요?

props는 부모가 주는 읽기 전용 인자, state는 컴포넌트가 스스로 바꾸는 값이고 바뀌면 다시 그려집니다.

위치는 "누가 바꾸고 누가 읽는가"로 정했습니다. 읽는 컴포넌트들의 가장 가까운 공통 부모에 둡니다. 검색어는 입력창과 목록이 같이 쓰니 `NoteListPage`가 갖고, 입력창은 `onChange`로 올리고 목록은 props로 받습니다. 퀴즈 답안은 `Quiz` 안에서만 쓰니 지역 state. 로그인 사용자·테마·알림은 트리 전체가 쓰니 Context입니다. 데이터는 아래로, 이벤트는 위로 — 한 방향입니다. (`src/pages/NoteListPage.tsx`, `src/context/`)

### 3. useEffect는 언제 실행되고, 의존성은 어떻게, 데이터 요청과 어떤 관계인가요?

화면이 그려진 직후에 실행됩니다. 의존성 배열의 값이 이전과 다르면 cleanup을 먼저 부르고 다시 실행합니다.

제 데이터 요청은 전부 `useAsync` 훅의 `useEffect(…, [fetcher, enabled, tick])`를 지납니다. 상세 페이지는 `useNote(id)`가 `useCallback(…, [id])`로 fetcher를 만들어서 URL의 id가 바뀔 때만 재요청합니다. `useCallback`을 빼면 렌더링마다 새 함수라 무한 요청이 됩니다. cleanup에서는 `cancelled = true`로 떠난 화면에 늦은 응답이 반영되는 걸 막습니다. (`src/hooks/useAsync.ts:21-43`)

### 4. 로딩·성공·실패·빈 상태를 어떻게 표현했나요?

`status` 문자열 하나로 `idle | loading | success | error`를 갖습니다. boolean 두 개를 쓰면 둘 다 true인 불가능한 조합이 생겨서요. 빈 상태는 성공인데 0건인 경우라 페이지가 `isEmpty`를 따로 넘깁니다.

분기는 `AsyncBoundary` 한 곳입니다. 로딩이면 스켈레톤이나 스피너, 에러면 "다시 시도" 버튼이 있는 빨간 카드, 비었으면 "노트 작성하기" 버튼이 있는 안내, 아니면 children. 폼 제출도 같은 4상태로 버튼 스피너와 상단 에러를 보입니다. (`src/components/ui/AsyncBoundary.tsx`, `src/hooks/useNoteForm.ts`)

### 5. 하나의 기능에서 라우팅 → 컴포넌트 → 상태 → 이벤트 → 렌더링이 어떻게 이어지나요?

노트 삭제로 설명하겠습니다. `/notes/abc`에 오면 라우터가 `NoteDetailPage`를 그리고 `useParams`로 id를 읽습니다. `useNote(id)`의 effect가 `loading` → 요청 → `success`로 상태를 바꾸고 `AsyncBoundary`가 스피너를 본문으로 바꿉니다. "삭제"를 누르면 `isConfirming` state가 true가 되어 확인 UI가 나타나고, "삭제 확인"을 누르면 `isDeleting`으로 버튼에 스피너, `deleteNote(id)` 성공 후 Toast를 띄우고 `navigate('/notes')`. URL이 바뀌니 목록 페이지가 마운트되고 `useNotes` effect가 새 목록을 받습니다. 실패하면 상태를 되돌리고 에러 Toast만 띄웁니다. (`src/pages/NoteDetailPage.tsx:28-34`)

---

## B. 기능 요구사항 문항

| 문항 | 30초 답변 |
| --- | --- |
| 라우트가 5개 이상인가요? | 10개입니다. 홈·로그인·레슨 목록/상세·노트 목록/상세/등록/수정·프로필·404. `App.tsx`에 전부 있고 `path="*"`가 404입니다. |
| 재사용 컴포넌트 8개 이상? | `components/ui`에 14개, 도메인 8개. 전부 prop으로 동작이 달라집니다. Button은 variant·size·loading, Input은 error가 있으면 aria-invalid와 alert 메시지. |
| 페이지와 UI가 분리됐나요? | `src/components` 안에 `lib/api` import가 없습니다(레이아웃 로그아웃 버튼 1건 제외). 데이터는 pages와 hooks만 다룹니다. |
| 로딩/에러/빈 상태가 통일됐나요? | `AsyncBoundary` 하나를 목록·상세·수정·프로필·레슨 상세가 씁니다. 문구를 바꾸려면 파일 하나만 고칩니다. |
| 커스텀 훅은? | `useNotes`, `useNote`, `useLessonProgress`, `useQuizAttempts`, `useNoteForm`, `useDebounce`. 기반은 `useAsync`. |
| CRUD가 원격인가요? | Supabase `notes` 테이블. `lib/api/notes.ts`의 5개 함수가 insert/select/update/delete. RLS로 본인만 쓰기·수정·삭제. |
| 폼 검증은? | `validateNote()` 순수 함수. 제목 2~80자, 내용 10~5000자. blur나 제출 시도 후 필드 아래에 에러. 제출 중엔 버튼 스피너+비활성, 실패하면 상단에 이유. |
| 상태→렌더링 지점 3개 이상? | 7개. 검색어→목록, 필터→레슨 카드, 입력→미리보기, 퀴즈 선택→채점 버튼→정답 색, 저장→Toast, 테마→전체 색, 완료→진도 바. |
| 배포에서 다 되나요? | https://codyssey-b1-2-react.vercel.app. 환경변수는 Vercel 3환경에 등록, `vercel.json` rewrite로 새로고침·딥링크 OK. 없으면 시작 시 바로 에러를 던지게 했습니다. |
| `.env`는 커밋 안 했나요? | `.gitignore`에 `.env`, `.env.*`. `.env.example`만 플레이스홀더로 커밋. |

---

## C. 보너스 문항

| 문항 | 30초 답변 |
| --- | --- |
| 전역 상태 | Context 3개 — `AuthContext`(사용자·세션·복원 완료 여부), `ThemeContext`(테마, localStorage), `ToastContext`(알림). 나머지는 전부 지역 state. |
| 성능 최적화 | `React.memo(NoteCard)`, `React.memo(LessonCard)` — 검색어 state만 바뀔 때 카드가 다시 안 그려집니다. `useMemo`로 필터·검증·최고점 계산, `useCallback`으로 fetcher 고정(안 하면 무한 요청). |
| 인증·보호 라우트 | Supabase Auth Google OAuth + 이메일 링크. `ProtectedRoute`가 세션 복원 전엔 로딩, 비로그인은 `/login`으로 보내고 원래 경로를 state로 넘겨 로그인 후 복귀. 등록·수정·프로필 3개가 보호 라우트. |

---

## D. 예상 꼬리 질문

| 질문 | 답 |
| --- | --- |
| `setAnswers({ ...prev, [id]: 1 })` 왜 새 객체? | React가 `Object.is`로 비교합니다. 같은 객체를 고치면 "안 바뀜"으로 보고 리렌더링을 건너뜁니다. |
| effect 의존성에 함수를 넣으면 왜 무한 루프? | 함수는 렌더링마다 새로 만들어져 참조가 다릅니다. `useCallback`으로 고정해야 합니다. |
| 새로고침하면 왜 로그인 페이지로 튕기지 않나요? | `AuthContext.isReady`. 세션 복원이 끝나기 전엔 `ProtectedRoute`가 로딩만 보여줍니다. |
| Vercel에서 `/notes/abc` 새로고침이 404가 아닌 이유? | `vercel.json` rewrite가 모든 경로를 `index.html`로 돌려주고, 브라우저에서 React Router가 경로를 해석합니다. |
| anon 키가 브라우저에 보이는데 괜찮나요? | 공개 키입니다. 보안 경계는 RLS. 쓰기·수정·삭제는 `auth.uid() = user_id`, 프로필 이메일 컬럼은 anon/authenticated에 select 권한을 뺐습니다. |
| 검색어를 왜 URL에 두나요? | 새로고침·링크 공유에도 같은 화면. `useSearchParams`. 입력은 300ms 디바운스 후 요청. |
