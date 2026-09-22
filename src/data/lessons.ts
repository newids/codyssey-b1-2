/**
 * 학습 콘텐츠는 정적 데이터로 둔다. (사용자가 만드는 핵심 데이터는 Supabase의 notes)
 * 미션의 "과제 목표" 5개를 8개 레슨으로 쪼갰다.
 */

export type LessonBlock =
  | { type: 'p'; text: string }
  | { type: 'h'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'code'; lang: 'tsx' | 'ts' | 'bash'; code: string; caption?: string }
  | { type: 'tip'; text: string };

export interface QuizQuestion {
  id: string;
  question: string;
  choices: string[];
  answerIndex: number;
  explanation: string;
}

export interface Lesson {
  slug: string;
  order: number;
  title: string;
  subtitle: string;
  minutes: number;
  level: '입문' | '기본' | '응용';
  summary: string;
  blocks: LessonBlock[];
  quiz: QuizQuestion[];
  /** 이 사이트 안에서 해당 개념이 실제로 쓰인 파일 */
  usedIn: string[];
}

export const LESSONS: Lesson[] = [
  {
    slug: 'components',
    order: 1,
    title: '컴포넌트는 왜 필요한가',
    subtitle: 'UI를 함수로 쪼개는 기준',
    minutes: 12,
    level: '입문',
    summary: '화면을 "다시 쓸 수 있는 함수"로 나누면 상태가 어디 있어야 하는지가 보인다.',
    usedIn: ['src/components/ui/Button.tsx', 'src/components/notes/NoteCard.tsx', 'src/pages/NoteListPage.tsx'],
    blocks: [
      { type: 'p', text: 'React 컴포넌트는 "입력(props)을 받아 화면(JSX)을 돌려주는 함수"다. HTML 파일 하나에 모든 걸 넣던 방식과 달리, 화면의 조각마다 이름을 붙이고 함수로 만든다.' },
      { type: 'code', lang: 'tsx', caption: '가장 작은 컴포넌트', code: `function Badge({ children }: { children: React.ReactNode }) {\n  return <span className="badge">{children}</span>;\n}\n\n// 사용\n<Badge>입문</Badge>` },
      { type: 'h', text: '쪼개는 기준 3가지' },
      { type: 'list', items: [
        '반복된다 — 같은 모양이 두 곳 이상에서 쓰이면 컴포넌트다. (Button, Card, Badge)',
        '독립적으로 이해된다 — 그 조각만 보고 "무엇인지" 말할 수 있으면 컴포넌트다. (NoteCard, Quiz)',
        '상태를 가진다 — 자기만의 상태(열림/닫힘, 입력값)를 갖는 조각은 컴포넌트로 격리한다. (NoteForm, ThemeToggle)',
      ] },
      { type: 'h', text: '페이지 컴포넌트와 UI 컴포넌트' },
      { type: 'p', text: '이 사이트는 두 종류를 폴더로 나눈다. pages/ 는 라우트 하나에 대응하며 데이터를 가져오고 조립만 한다. components/ 는 props만 받아 그리는 데 집중하고 Supabase를 모른다. 이 경계를 지키면 UI 컴포넌트를 어디서든 재사용할 수 있다.' },
      { type: 'code', lang: 'tsx', caption: 'pages/NoteListPage.tsx — 페이지는 조립만 한다', code: `const { status, data: notes, error, refetch } = useNotes({ search });\n\nreturn (\n  <AsyncBoundary status={status} error={error} isEmpty={notes.length === 0} onRetry={refetch}>\n    <NoteGrid notes={notes} />\n  </AsyncBoundary>\n);` },
      { type: 'tip', text: '컴포넌트 이름은 "무엇을 그리는가"로 짓는다. 동사(handleClick)는 함수, 명사(NoteCard)는 컴포넌트.' },
    ],
    quiz: [
      { id: 'c1', question: 'React 컴포넌트를 가장 정확히 설명한 것은?', choices: ['HTML 템플릿 파일', 'props를 받아 JSX를 돌려주는 함수', 'CSS 클래스 묶음', '서버에 요청을 보내는 객체'], answerIndex: 1, explanation: '컴포넌트는 입력(props) → 출력(JSX) 함수다. 그래서 같은 props면 같은 화면이 나온다.' },
      { id: 'c2', question: '"페이지 컴포넌트"와 "UI 컴포넌트"를 나누는 가장 큰 이유는?', choices: ['파일 수를 늘리기 위해', 'UI 컴포넌트를 데이터 출처와 무관하게 재사용하기 위해', 'CSS를 분리하기 위해', 'React가 강제하기 때문'], answerIndex: 1, explanation: 'UI 컴포넌트가 Supabase를 모르면 어떤 페이지에서도 쓸 수 있고 테스트도 쉽다.' },
      { id: 'c3', question: '다음 중 컴포넌트로 쪼갤 근거가 가장 약한 것은?', choices: ['세 페이지에서 반복되는 카드', '자기만의 열림/닫힘 상태를 가진 드롭다운', '한 번만 쓰이는 3줄짜리 문단', '로딩/에러/빈 상태를 통일하는 래퍼'], answerIndex: 2, explanation: '반복·독립성·상태 어느 것도 없다면 굳이 쪼갤 필요가 없다. 과한 분리는 오히려 읽기 어렵게 만든다.' },
    ],
  },
  {
    slug: 'props-vs-state',
    order: 2,
    title: 'props와 state, 상태는 어디에 두나',
    subtitle: '위에서 아래로 흐르는 데이터',
    minutes: 15,
    level: '입문',
    summary: 'props는 부모가 주는 읽기 전용 입력, state는 컴포넌트가 스스로 바꾸는 기억이다.',
    usedIn: ['src/components/notes/NoteForm.tsx', 'src/pages/NoteListPage.tsx', 'src/context/ThemeContext.tsx'],
    blocks: [
      { type: 'p', text: 'props는 함수의 인자다. 부모가 넘기고 자식은 읽기만 한다. state는 컴포넌트가 useState로 만드는 "기억"이며, 바꾸면 React가 그 컴포넌트를 다시 그린다.' },
      { type: 'code', lang: 'tsx', code: `function Counter({ step }: { step: number }) {   // step = props (읽기 전용)\n  const [count, setCount] = useState(0);         // count = state (내가 바꿈)\n  return <button onClick={() => setCount(count + step)}>{count}</button>;\n}` },
      { type: 'h', text: '상태는 "그 상태를 쓰는 컴포넌트들의 가장 가까운 공통 부모"에 둔다' },
      { type: 'p', text: '검색어를 입력창(SearchInput)과 목록(NoteGrid)이 둘 다 써야 한다면, 검색어 state는 둘의 부모인 NoteListPage에 둔다. 입력창은 onChange로 위로 올리고(상향), 목록은 props로 받는다(하향). 이것이 "상태 끌어올리기(lifting state up)"다.' },
      { type: 'code', lang: 'tsx', caption: 'pages/NoteListPage.tsx', code: `const [search, setSearch] = useState('');\n\n<Input value={search} onChange={(e) => setSearch(e.target.value)} />  // 상향: 자식 → 부모\n<NoteGrid notes={filtered} />                                          // 하향: 부모 → 자식` },
      { type: 'h', text: '전역이 필요한 상태' },
      { type: 'p', text: '로그인 사용자, 테마처럼 트리 어디서나 필요한 값은 끌어올리다 보면 최상단까지 간다. 그때 Context를 쓴다. 이 사이트는 AuthContext, ThemeContext, ToastContext 세 개만 전역이고 나머지는 전부 지역 state다.' },
      { type: 'tip', text: '"이 값을 바꾸는 사람이 누구인가?"를 물어보면 state의 위치가 정해진다. 바꾸는 쪽이 소유한다.' },
    ],
    quiz: [
      { id: 'p1', question: 'props에 대한 설명으로 옳은 것은?', choices: ['자식이 자유롭게 수정한다', '부모가 넘기고 자식은 읽기만 한다', 'useState로 만든다', '전역에서 공유된다'], answerIndex: 1, explanation: 'props는 읽기 전용이다. 바꾸고 싶으면 부모가 준 콜백을 호출해 부모의 state를 바꾼다.' },
      { id: 'p2', question: '검색어를 입력창과 목록이 함께 쓴다. 검색어 state는 어디에?', choices: ['입력창 컴포넌트', '목록 컴포넌트', '둘의 가장 가까운 공통 부모', 'localStorage'], answerIndex: 2, explanation: '공유되는 상태는 공통 부모로 끌어올린다. 그래야 한 곳에서 바뀌고 양쪽에 내려간다.' },
      { id: 'p3', question: 'Context를 쓰기에 가장 적절한 상태는?', choices: ['폼의 입력값', '카드 하나의 펼침 여부', '로그인한 사용자 정보', '리스트 정렬 방향'], answerIndex: 2, explanation: '트리 전체에서 필요한 값만 전역으로 올린다. 나머지는 지역 state가 훨씬 단순하다.' },
    ],
  },
  {
    slug: 'events-rendering',
    order: 3,
    title: '이벤트 → 상태 → 렌더링',
    subtitle: 'React가 화면을 바꾸는 유일한 경로',
    minutes: 12,
    level: '기본',
    summary: 'DOM을 직접 만지지 않는다. 이벤트는 state만 바꾸고, 화면은 state로부터 계산된다.',
    usedIn: ['src/components/lessons/Quiz.tsx', 'src/components/ui/ThemeToggle.tsx', 'src/pages/NoteListPage.tsx'],
    blocks: [
      { type: 'p', text: '바닐라 JS에서는 클릭 핸들러 안에서 element.textContent를 바꿨다. React에서는 핸들러가 setState만 호출하고, 화면은 "state가 이러면 화면은 이렇다"라는 선언으로 그려진다. 흐름은 항상 이벤트 → 상태 변경 → 리렌더링, 한 방향이다.' },
      { type: 'code', lang: 'tsx', caption: 'components/lessons/Quiz.tsx — 선택하면 즉시 상태가 바뀌고 채점 버튼이 활성화된다', code: `const [answers, setAnswers] = useState<QuizAnswers>({});\n\nconst select = (questionId: string, choiceIndex: number) =>\n  setAnswers((prev) => ({ ...prev, [questionId]: choiceIndex }));   // 새 객체 (불변)\n\n<Button disabled={!isQuizComplete(questions, answers)}>채점하기</Button>` },
      { type: 'h', text: '리렌더링은 언제 일어나나' },
      { type: 'list', items: [
        '자기 state가 바뀌었을 때 (setState 호출, 값이 실제로 달라졌을 때만)',
        '부모가 리렌더링되어 새 props를 받았을 때',
        '구독 중인 Context 값이 바뀌었을 때',
      ] },
      { type: 'p', text: 'setAnswers({ ...prev }) 처럼 새 객체를 만드는 이유가 여기 있다. React는 Object.is로 이전 값과 비교한다. 기존 객체를 직접 고치면(prev[id] = 1) 참조가 같아서 "안 바뀌었다"고 판단하고 화면을 갱신하지 않는다.' },
      { type: 'h', text: '이 사이트에서 확인할 수 있는 지점' },
      { type: 'list', items: [
        '노트 목록: 검색어 입력 → search state → 필터된 목록 즉시 변경',
        '노트 작성 폼: 제목 입력 → 오른쪽 미리보기 카드 실시간 갱신',
        '퀴즈: 보기 선택 → 채점 버튼 활성화 → 채점 후 정답/오답 색상',
        '테마 토글: 클릭 → ThemeContext → 전체 페이지 색상 전환',
        '저장 성공 → Toast 알림 표시 후 자동 소멸',
      ] },
    ],
    quiz: [
      { id: 'e1', question: 'React에서 화면을 바꾸는 올바른 방법은?', choices: ['document.querySelector로 DOM을 수정', 'state를 바꾸면 React가 다시 그린다', 'innerHTML 교체', 'CSS 클래스를 직접 토글'], answerIndex: 1, explanation: 'React는 state → 화면을 선언적으로 계산한다. DOM을 직접 만지면 React가 모르는 변경이 생겨 어긋난다.' },
      { id: 'e2', question: 'setAnswers({ ...prev, [id]: 1 }) 처럼 새 객체를 만드는 이유는?', choices: ['문법이 짧아서', '메모리를 아끼려고', 'React가 참조 비교로 변경을 감지하기 때문', 'TypeScript가 요구해서'], answerIndex: 2, explanation: '같은 객체를 고치면 Object.is 비교에서 "같다"고 나와 리렌더링이 생략된다.' },
      { id: 'e3', question: '다음 중 리렌더링을 일으키지 않는 것은?', choices: ['setState로 다른 값 설정', '부모가 리렌더링됨', '구독한 Context 값 변경', '일반 변수(let x)에 값 대입'], answerIndex: 3, explanation: '일반 변수는 React가 추적하지 않는다. 화면에 반영되려면 state여야 한다.' },
    ],
  },
  {
    slug: 'use-effect',
    order: 4,
    title: 'useEffect와 데이터 요청',
    subtitle: '언제 실행되고, 왜 의존성 배열이 있는가',
    minutes: 18,
    level: '기본',
    summary: '렌더링이 끝난 뒤 실행되는 "부수 효과". 의존성이 바뀔 때마다 다시 실행된다.',
    usedIn: ['src/hooks/useAsync.ts', 'src/hooks/useNotes.ts', 'src/context/AuthContext.tsx'],
    blocks: [
      { type: 'p', text: '컴포넌트 함수 본문은 "화면 계산"만 해야 한다. 서버 요청, 구독, 타이머처럼 바깥 세계를 건드리는 일은 useEffect 안에 둔다. useEffect는 화면이 그려진 직후에 실행된다.' },
      { type: 'code', lang: 'tsx', caption: 'hooks/useAsync.ts — 이 사이트의 모든 데이터 요청이 지나가는 훅', code: `useEffect(() => {\n  let cancelled = false;                     // 늦게 도착한 응답 무시용\n  setStatus('loading');\n  fetcher()\n    .then((result) => { if (!cancelled) { setData(result); setStatus('success'); } })\n    .catch((err) => { if (!cancelled) { setError(err); setStatus('error'); } });\n  return () => { cancelled = true; };        // cleanup: 언마운트/재실행 직전\n}, [fetcher]);                               // 의존성: fetcher가 바뀌면 다시 요청` },
      { type: 'h', text: '의존성 배열 3가지 형태' },
      { type: 'list', items: [
        '없음 useEffect(fn) — 렌더링마다 실행. 거의 쓰지 않는다.',
        '빈 배열 useEffect(fn, []) — 마운트 때 한 번. 초기 구독에 적합.',
        '값 있음 useEffect(fn, [id]) — id가 바뀔 때마다. 상세 페이지의 라우트 파라미터가 대표적.',
      ] },
      { type: 'p', text: '상세 페이지(/notes/:id)에서 id가 바뀌면 다른 노트를 불러와야 한다. 그래서 useNote(id)는 id를 의존성에 넣는다. 의존성을 빠뜨리면 첫 노트만 계속 보이는 버그가 생긴다.' },
      { type: 'h', text: 'cleanup이 필요한 이유' },
      { type: 'p', text: '목록에서 상세로 빠르게 이동하면 이전 요청의 응답이 나중에 도착할 수 있다. cancelled 플래그로 "이미 떠난 화면"의 setState를 막는다. 구독(onAuthStateChange)이라면 cleanup에서 구독을 해제한다.' },
      { type: 'tip', text: 'useEffect 안에서 쓰는 모든 외부 값(props, state, 함수)은 의존성에 넣는다. 함수를 넣어야 한다면 useCallback으로 참조를 고정한다.' },
    ],
    quiz: [
      { id: 'u1', question: 'useEffect는 언제 실행되는가?', choices: ['렌더링 전', '렌더링이 끝난 직후', '클릭 이벤트 때', '컴파일 시점'], answerIndex: 1, explanation: '화면을 먼저 그리고 나서 부수 효과를 실행한다. 그래서 첫 화면에는 loading 상태가 잠깐 보인다.' },
      { id: 'u2', question: 'useEffect(fn, [id]) 에서 배열의 의미는?', choices: ['fn을 id번 실행', 'id가 바뀔 때마다 fn 재실행', 'id를 fn에 인자로 전달', '아무 의미 없음'], answerIndex: 1, explanation: '의존성 배열의 값이 이전 렌더링과 다르면 effect를 다시 실행한다.' },
      { id: 'u3', question: 'effect에서 cancelled 플래그를 쓰는 이유는?', choices: ['요청을 빠르게 하려고', '떠난 화면에 늦은 응답이 반영되는 걸 막으려고', '에러를 숨기려고', '메모리를 줄이려고'], answerIndex: 1, explanation: '경쟁 상태(race condition) 방지. 이전 요청의 응답이 새 화면을 덮어쓰지 않게 한다.' },
      { id: 'u4', question: '상세 페이지에서 의존성 배열을 []로 두면?', choices: ['정상 동작', '다른 id로 이동해도 첫 데이터가 그대로 보인다', '무한 루프', '에러 발생'], answerIndex: 1, explanation: '마운트 때 한 번만 실행되므로 id가 바뀌어도 재요청하지 않는다.' },
    ],
  },
  {
    slug: 'routing',
    order: 5,
    title: '라우팅 — URL이 곧 상태',
    subtitle: 'React Router로 SPA 만들기',
    minutes: 14,
    level: '기본',
    summary: '페이지 전환은 서버 왕복 없이 URL만 바꾸고, 그 URL에 맞는 컴포넌트를 그린다.',
    usedIn: ['src/App.tsx', 'src/components/layout/Header.tsx', 'src/components/auth/ProtectedRoute.tsx'],
    blocks: [
      { type: 'p', text: 'SPA(Single Page Application)는 HTML 파일이 하나뿐이다. 링크를 누르면 브라우저가 새 페이지를 요청하는 대신, React Router가 URL을 바꾸고 그에 맞는 컴포넌트를 렌더링한다. 그래서 화면이 "스르륵" 바뀐다.' },
      { type: 'code', lang: 'tsx', caption: 'App.tsx — 이 사이트의 라우트 10개', code: `<Routes>\n  <Route element={<Layout />}>\n    <Route path="/" element={<HomePage />} />\n    <Route path="/login" element={<LoginPage />} />\n    <Route path="/lessons" element={<LessonListPage />} />\n    <Route path="/lessons/:slug" element={<LessonDetailPage />} />\n    <Route path="/notes" element={<NoteListPage />} />\n    <Route path="/notes/:id" element={<NoteDetailPage />} />\n    <Route element={<ProtectedRoute />}>\n      <Route path="/notes/new" element={<NoteNewPage />} />\n      <Route path="/notes/:id/edit" element={<NoteEditPage />} />\n      <Route path="/profile" element={<ProfilePage />} />\n    </Route>\n    <Route path="*" element={<NotFoundPage />} />\n  </Route>\n</Routes>` },
      { type: 'h', text: '라우트 파라미터와 데이터' },
      { type: 'p', text: '/notes/:id 의 id는 useParams()로 읽는다. 이 id를 useNote(id) 훅에 넘기면 effect가 그 id로 요청한다. URL → 파라미터 → 훅 → 요청 → 상태 → 화면. 이것이 "하나의 기능"을 관통하는 데이터 흐름이다.' },
      { type: 'h', text: '보호 라우트' },
      { type: 'p', text: 'ProtectedRoute는 로그인 여부를 AuthContext에서 읽어, 없으면 /login으로 <Navigate>한다. 돌아올 주소는 state로 넘겨 로그인 후 원래 페이지로 복귀시킨다.' },
      { type: 'tip', text: '검색어·필터·탭처럼 공유하고 싶은 상태는 URL 쿼리(useSearchParams)에 둔다. 새로고침해도, 링크를 복사해도 같은 화면이 나온다.' },
    ],
    quiz: [
      { id: 'r1', question: 'SPA에서 링크를 클릭하면 일어나는 일은?', choices: ['서버에서 새 HTML을 받는다', 'URL만 바꾸고 맞는 컴포넌트를 렌더링한다', '페이지가 새로고침된다', '아무 일도 없다'], answerIndex: 1, explanation: 'History API로 URL을 바꾸고 React Router가 매칭되는 라우트를 그린다.' },
      { id: 'r2', question: '/notes/:id 에서 id를 읽는 훅은?', choices: ['useState', 'useParams', 'useEffect', 'useContext'], answerIndex: 1, explanation: 'useParams()는 현재 URL의 동적 세그먼트를 객체로 돌려준다.' },
      { id: 'r3', question: 'Vercel 배포 시 /notes/abc 로 직접 접속하면 404가 나는 이유와 해결책은?', choices: ['React 버그 — 업데이트', '서버에 그 파일이 없음 — 모든 경로를 index.html로 rewrite', 'Supabase 문제', '해결 불가'], answerIndex: 1, explanation: 'SPA는 index.html 하나뿐이라 서버가 모든 경로를 index.html로 돌려주도록 vercel.json에 rewrite를 둔다.' },
    ],
  },
  {
    slug: 'forms',
    order: 6,
    title: '폼 — controlled input과 검증',
    subtitle: '입력값을 state가 소유한다',
    minutes: 16,
    level: '응용',
    summary: 'input의 value를 state에 묶으면 검증·미리보기·제출 상태를 모두 React가 다룰 수 있다.',
    usedIn: ['src/components/notes/NoteForm.tsx', 'src/lib/validation.ts', 'src/hooks/useNoteForm.ts'],
    blocks: [
      { type: 'p', text: 'controlled input은 value={state} onChange={setState} 로 묶인 입력창이다. DOM이 아니라 React state가 "진짜 값"을 갖는다. 그래서 타이핑하는 즉시 검증하고, 미리보기를 그리고, 제출 시 그대로 보낼 수 있다.' },
      { type: 'code', lang: 'tsx', caption: 'hooks/useNoteForm.ts — 폼 상태를 훅으로 분리', code: `const [values, setValues] = useState<NoteInput>(initial);\nconst [touched, setTouched] = useState<Set<keyof NoteInput>>(new Set());\nconst [submitStatus, setSubmitStatus] = useState<AsyncStatus>('idle');\n\nconst errors = useMemo(() => validateNote(values), [values]);   // 값이 바뀔 때만 재검증\n\nconst setField = (name, value) => setValues((prev) => ({ ...prev, [name]: value }));` },
      { type: 'h', text: '검증 UX의 세 단계' },
      { type: 'list', items: [
        '타이핑 중: 검증은 하되 에러는 아직 보이지 않는다 (touched 전).',
        'blur 또는 제출 시도: 에러를 필드 바로 아래에 보인다. aria-invalid, aria-describedby로 연결.',
        '제출 중: 버튼 비활성화 + 스피너. 실패하면 상단에 실패 사유, 성공하면 이동 + Toast.',
      ] },
      { type: 'code', lang: 'tsx', caption: 'components/notes/NoteForm.tsx', code: `<Input\n  label="제목"\n  value={values.title}\n  onChange={(e) => setField('title', e.target.value)}\n  onBlur={() => touch('title')}\n  error={touched.has('title') ? errors.title : undefined}\n  required\n/>\n<Button type="submit" loading={submitStatus === 'loading'}>저장</Button>` },
      { type: 'tip', text: '검증 로직은 validateNote() 같은 순수 함수로 빼면 UI 없이 테스트할 수 있다. 이 사이트의 validation.test.ts가 그 예다.' },
    ],
    quiz: [
      { id: 'f1', question: 'controlled input이란?', choices: ['readonly 입력창', 'value와 onChange가 state에 묶인 입력창', 'ref로 읽는 입력창', '서버가 제어하는 입력창'], answerIndex: 1, explanation: 'state가 값의 단일 출처(single source of truth)가 된다.' },
      { id: 'f2', question: '에러 메시지를 타이핑 즉시 보이지 않고 blur 후에 보이는 이유는?', choices: ['성능 때문', '첫 글자부터 빨간 에러가 뜨면 사용자 경험이 나쁘기 때문', 'React 제약', '검증이 느려서'], answerIndex: 1, explanation: 'touched 상태로 "사용자가 그 필드를 다뤘는가"를 추적해 적절한 시점에 보여준다.' },
      { id: 'f3', question: '제출 중 버튼을 비활성화하는 가장 중요한 이유는?', choices: ['예뻐서', '중복 제출 방지와 진행 중임을 알리기 위해', '메모리 절약', '접근성 규정'], answerIndex: 1, explanation: '두 번 클릭하면 노트가 두 개 생긴다. loading 상태를 UI로 드러내야 한다.' },
    ],
  },
  {
    slug: 'async-states',
    order: 7,
    title: '로딩 · 에러 · 빈 상태를 통일하기',
    subtitle: '모든 화면이 같은 패턴을 쓴다',
    minutes: 13,
    level: '응용',
    summary: 'status 하나로 4가지 화면을 결정하고, 그 분기를 컴포넌트 하나에 모은다.',
    usedIn: ['src/components/ui/AsyncBoundary.tsx', 'src/components/ui/Loading.tsx', 'src/components/ui/ErrorState.tsx', 'src/components/ui/EmptyState.tsx'],
    blocks: [
      { type: 'p', text: '비동기 데이터는 항상 네 가지 상태 중 하나다: idle, loading, success, error. 그리고 success 안에 "결과가 비었다"는 다섯 번째 화면이 숨어 있다. 페이지마다 if문을 따로 짜면 어떤 페이지는 빈 상태를 빼먹는다.' },
      { type: 'code', lang: 'tsx', caption: 'components/ui/AsyncBoundary.tsx — 분기를 한 곳에', code: `export function AsyncBoundary({ status, error, isEmpty, onRetry, emptyTitle, children }) {\n  if (status === 'idle' || status === 'loading') return <Loading />;\n  if (status === 'error') return <ErrorState message={toUserMessage(error)} onRetry={onRetry} />;\n  if (isEmpty) return <EmptyState title={emptyTitle} />;\n  return <>{children}</>;\n}` },
      { type: 'p', text: '목록·상세·프로필 세 페이지가 이 컴포넌트 하나를 쓴다. 로딩 스피너 모양이나 에러 문구를 바꾸고 싶으면 한 파일만 고치면 된다.' },
      { type: 'h', text: '상태의 이름을 통일하는 이유' },
      { type: 'p', text: 'isLoading, isError 같은 boolean 두 개를 쓰면 "둘 다 true"인 불가능한 조합이 생긴다. status 문자열 하나면 상태는 항상 정확히 하나다. 이 사이트의 AsyncStatus 타입이 그 약속이다.' },
      { type: 'tip', text: '에러 화면에는 반드시 "다시 시도" 버튼을 둔다. 사용자가 새로고침 말고 할 수 있는 일을 준다.' },
    ],
    quiz: [
      { id: 'a1', question: '비동기 UI에서 흔히 빠뜨리는 상태는?', choices: ['loading', 'error', '빈 결과(empty)', 'success'], answerIndex: 2, explanation: '요청은 성공했지만 데이터가 0건인 경우. 빈 화면 대신 안내와 행동(작성하기)을 보여줘야 한다.' },
      { id: 'a2', question: 'isLoading/isError 두 boolean 대신 status 하나를 쓰는 이유는?', choices: ['짧아서', '불가능한 상태 조합을 없애기 위해', 'TypeScript 때문', '성능'], answerIndex: 1, explanation: '상태는 항상 정확히 하나여야 한다. 문자열 유니온 타입이 그걸 보장한다.' },
      { id: 'a3', question: '로딩/에러/빈 상태를 컴포넌트 하나로 모으면 얻는 것은?', choices: ['빠른 요청', '페이지마다 다른 디자인', '일관성과 수정 지점 단일화', '자동 재시도'], answerIndex: 2, explanation: '세 페이지가 같은 컴포넌트를 쓰니 문구·모양·접근성을 한 곳에서 관리한다.' },
    ],
  },
  {
    slug: 'custom-hooks',
    order: 8,
    title: '커스텀 훅으로 흐름 묶기',
    subtitle: 'useNotes(), useNote(id)가 하는 일',
    minutes: 15,
    level: '응용',
    summary: '요청·상태·재시도를 훅 하나에 담으면 페이지는 "무엇을 보여줄지"만 남는다.',
    usedIn: ['src/hooks/useAsync.ts', 'src/hooks/useNotes.ts', 'src/hooks/useLessonProgress.ts'],
    blocks: [
      { type: 'p', text: '커스텀 훅은 "use로 시작하는 함수"일 뿐이다. 특별한 API가 아니라 useState/useEffect를 조합해 재사용 가능한 로직으로 묶은 것이다. 훅은 UI를 돌려주지 않고 값과 함수를 돌려준다.' },
      { type: 'code', lang: 'ts', caption: 'hooks/useNotes.ts — 목록 조회 흐름', code: `export function useNotes(params: ListNotesParams) {\n  const fetcher = useCallback(() => listNotes(params), [params.ownerId, params.lessonSlug, params.search]);\n  return useAsync(fetcher, []);   // { status, data, error, refetch }\n}\n\nexport function useNote(id: string | undefined) {\n  const fetcher = useCallback(() => (id ? getNote(id) : Promise.reject(new Error('id 없음'))), [id]);\n  return useAsync<Note | null>(fetcher, null);\n}` },
      { type: 'h', text: '훅이 흡수하는 것' },
      { type: 'list', items: [
        'status/data/error 세 state와 그 전이',
        'useEffect + cleanup(경쟁 상태 방지)',
        '의존성이 바뀌면 재요청, refetch()로 수동 재시도',
      ] },
      { type: 'p', text: '결과적으로 페이지 컴포넌트는 훅 한 줄 + AsyncBoundary + 성공 화면, 세 줄로 줄어든다. 진도(useLessonProgress)와 퀴즈 기록(useQuizAttempts)도 같은 useAsync 위에서 만들어졌다.' },
      { type: 'h', text: '메모이제이션은 어디에' },
      { type: 'p', text: 'fetcher를 useCallback으로 고정하지 않으면 렌더링마다 새 함수가 만들어져 effect가 매번 재실행된다(무한 요청). NoteCard는 React.memo로 감싸 목록에서 검색어만 바뀔 때 카드 전체가 다시 그려지지 않게 한다. 필터된 목록은 useMemo로 계산한다.' },
      { type: 'tip', text: '훅 이름만 보고 "무엇을 돌려주는지" 알 수 있어야 한다. useNotes → 노트 목록, useLessonProgress → 진도. 동사 없이 명사로.' },
    ],
    quiz: [
      { id: 'h1', question: '커스텀 훅의 정체는?', choices: ['React 내장 특수 API', 'use로 시작하며 다른 훅을 조합한 일반 함수', '클래스 컴포넌트', 'Context의 별칭'], answerIndex: 1, explanation: '규칙은 두 가지뿐이다. use로 시작하고, 컴포넌트/훅 최상위에서만 호출한다.' },
      { id: 'h2', question: 'fetcher를 useCallback 없이 effect 의존성에 넣으면?', choices: ['문제 없음', '렌더링마다 새 함수 → effect 무한 재실행', '한 번만 실행', '컴파일 에러'], answerIndex: 1, explanation: '함수는 렌더링마다 새로 만들어져 참조가 다르다. 의존성이 "바뀐" 것으로 판단된다.' },
      { id: 'h3', question: 'React.memo(NoteCard)가 막아주는 것은?', choices: ['네트워크 요청', 'props가 같은데도 부모 때문에 다시 그려지는 것', '에러', '리렌더링 전부'], answerIndex: 1, explanation: 'props가 얕은 비교로 같으면 이전 결과를 재사용한다. props가 바뀌면 당연히 다시 그린다.' },
    ],
  },
];

export const LESSON_BY_SLUG: Record<string, Lesson> = Object.fromEntries(LESSONS.map((l) => [l.slug, l]));

export function getLesson(slug: string | undefined): Lesson | undefined {
  return slug ? LESSON_BY_SLUG[slug] : undefined;
}
