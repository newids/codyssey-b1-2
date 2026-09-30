import type { Lesson } from './types';

export const routing: Lesson = {
  slug: 'routing',
  order: 5,
  title: '라우팅 — URL이 곧 상태',
  subtitle: 'React Router로 SPA 만들기',
  minutes: 18,
  level: '기본',
  summary: '페이지 전환은 서버 왕복 없이 URL만 바꾸고, 그 URL에 맞는 컴포넌트를 그린다.',
  usedIn: ['src/App.tsx', 'src/components/layout/Header.tsx', 'src/components/auth/ProtectedRoute.tsx'],
  blocks: [
    { type: 'p', text: '이 미션의 제목은 "버튼 누르면 화면이 스르륵 바뀌는 요즘 웹사이트"다. 헤더의 "레슨"을 눌러 보자. 화면이 깜빡이지 않고 내용만 바뀐다. 주소창의 URL은 바뀌었는데 브라우저의 새로고침 표시는 돌지 않았다. 이것이 SPA다.' },

    { type: 'h', text: '전통적인 웹사이트와 SPA' },
    { type: 'p', text: '전통적인 사이트는 페이지마다 HTML 파일이 따로 있다. 링크를 누르면 브라우저가 서버에 새 HTML을 요청하고, 화면을 전부 지운 뒤 처음부터 다시 그린다. 그래서 화면이 하얗게 깜빡인다.' },
    { type: 'p', text: 'SPA(Single Page Application)는 HTML 파일이 index.html 하나뿐이다. 링크를 눌러도 서버에 가지 않는다. 자바스크립트가 주소창의 URL만 바꾸고, 그 URL에 맞는 컴포넌트를 골라 그 부분만 다시 그린다. 헤더와 푸터는 그대로 있고 가운데만 바뀌니 "스르륵" 전환된다.' },

    { type: 'h', text: '라우트 = "이 주소에는 이 컴포넌트"' },
    { type: 'p', text: 'React Router는 주소와 컴포넌트의 대응표를 만들어 준다. 표의 한 줄 한 줄을 라우트(route)라고 부른다.' },
    { type: 'code', lang: 'tsx', caption: 'App.tsx — 이 사이트의 라우트 10개', code: `<Routes>\n  <Route element={<Layout />}>                         {/* 공통 레이아웃: 헤더 + 푸터 */}\n    <Route path="/" element={<HomePage />} />\n    <Route path="/login" element={<LoginPage />} />\n    <Route path="/lessons" element={<LessonListPage />} />\n    <Route path="/lessons/:slug" element={<LessonDetailPage />} />\n    <Route path="/notes" element={<NoteListPage />} />\n    <Route path="/notes/:id" element={<NoteDetailPage />} />\n    <Route element={<ProtectedRoute />}>              {/* 로그인 필요 */}\n      <Route path="/notes/new" element={<NoteNewPage />} />\n      <Route path="/notes/:id/edit" element={<NoteEditPage />} />\n      <Route path="/profile" element={<ProfilePage />} />\n    </Route>\n    <Route path="*" element={<NotFoundPage />} />    {/* 어디에도 안 맞으면 */}\n  </Route>\n</Routes>` },

    { type: 'h', text: '링크는 <a> 대신 <Link>' },
    { type: 'p', text: '일반 <a href="/lessons">를 쓰면 브라우저가 서버에 새 페이지를 요청한다. 전통 방식으로 돌아가는 것이다. React Router의 <Link to="/lessons">는 클릭을 가로채 URL만 바꾼다. 헤더처럼 "지금 어느 메뉴에 있는지" 표시해야 할 때는 <NavLink>를 쓰면 현재 주소와 일치할 때 활성 스타일을 줄 수 있다.' },

    { type: 'h', text: '라우트 파라미터와 데이터' },
    { type: 'p', text: '/notes/:id 의 :id 는 "여기에 무엇이든 올 수 있다"는 자리 표시다. /notes/abc 로 들어오면 id는 "abc"가 된다. 컴포넌트에서는 useParams()로 읽는다.' },
    { type: 'code', lang: 'tsx', caption: 'pages/NoteDetailPage.tsx', code: `const { id } = useParams<{ id: string }>();          // URL에서 id 꺼내기\nconst { status, data: note, error } = useNote(id);  // 그 id로 데이터 요청` },

    { type: 'h', text: 'URL도 상태다' },
    { type: 'p', text: '노트 목록에서 검색어를 입력하면 주소가 /notes?q=react 로 바뀐다. 검색어를 useState가 아니라 URL(쿼리 스트링)에 둔 것이다. 이렇게 하면 새로고침해도 검색어가 남아 있고, 주소를 복사해 친구에게 보내면 같은 화면이 열린다. useSearchParams()가 useState와 비슷한 모양으로 읽고 쓰게 해 준다.' },

    { type: 'h', text: '보호 라우트' },
    { type: 'p', text: '노트 작성이나 프로필은 로그인한 사람만 볼 수 있어야 한다. ProtectedRoute는 문지기다. AuthContext에서 로그인 여부를 읽고, 로그인하지 않았으면 <Navigate to="/login" />으로 돌려보낸다. 이때 "원래 가려던 주소"를 함께 넘겨 두어, 로그인에 성공하면 그 주소로 되돌려 보낸다.' },

    { type: 'h', text: '배포할 때 꼭 필요한 한 줄' },
    { type: 'p', text: 'SPA에는 index.html 하나뿐이다. 그런데 사용자가 /notes/abc 주소를 직접 입력하거나 새로고침하면, 서버는 "notes/abc라는 파일"을 찾다가 없어서 404를 낸다. 그래서 서버에 "어떤 주소로 오든 index.html을 돌려줘"라고 알려 줘야 한다. 이 사이트는 vercel.json의 rewrites가 그 역할을 한다. 그 뒤에는 브라우저에서 React Router가 주소를 읽고 맞는 화면을 그린다.' },
    { type: 'tip', text: '"새로고침해도, 링크를 공유해도 같은 화면이 나와야 하는가?"를 물어보자. 그렇다면 그 상태는 URL에 있어야 한다.' },
  ],
  quiz: [
    { id: 'r1', question: 'SPA에서 링크를 클릭하면 일어나는 일은?', choices: ['서버에서 새 HTML을 받는다', 'URL만 바꾸고 맞는 컴포넌트를 렌더링한다', '페이지가 새로고침된다', '아무 일도 없다'], answerIndex: 1, explanation: 'History API로 URL을 바꾸고 React Router가 매칭되는 라우트를 그린다.' },
    { id: 'r2', question: '/notes/:id 에서 id를 읽는 훅은?', choices: ['useState', 'useParams', 'useEffect', 'useContext'], answerIndex: 1, explanation: 'useParams()는 현재 URL의 동적 세그먼트를 객체로 돌려준다.' },
    { id: 'r3', question: 'Vercel 배포 시 /notes/abc 로 직접 접속하면 404가 나는 이유와 해결책은?', choices: ['React 버그 — 업데이트', '서버에 그 파일이 없음 — 모든 경로를 index.html로 rewrite', 'Supabase 문제', '해결 불가'], answerIndex: 1, explanation: 'SPA는 index.html 하나뿐이라 서버가 모든 경로를 index.html로 돌려주도록 vercel.json에 rewrite를 둔다.' },
    { id: 'r4', question: '내부 페이지 이동에 <a href> 대신 <Link>를 쓰는 이유는?', choices: ['스타일이 더 예뻐서', '<a>는 서버에 새 페이지를 요청해 전체를 다시 불러오기 때문', '<a>는 React에서 금지되어 있어서', 'SEO 때문'], answerIndex: 1, explanation: '<Link>는 클릭을 가로채 URL만 바꾼다. 새로고침 없이 컴포넌트만 교체된다.' },
  ],
};
