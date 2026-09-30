import type { Lesson } from './types';

export const propsVsState: Lesson = {
  slug: 'props-vs-state',
  order: 2,
  title: 'props와 state, 상태는 어디에 두나',
  subtitle: '위에서 아래로 흐르는 데이터',
  minutes: 18,
  level: '입문',
  summary: 'props는 부모가 주는 읽기 전용 입력, state는 컴포넌트가 스스로 바꾸는 기억이다.',
  usedIn: ['src/components/notes/NoteForm.tsx', 'src/pages/NoteListPage.tsx', 'src/context/ThemeContext.tsx'],
  blocks: [
    { type: 'p', text: '컴포넌트가 화면을 그릴 때 쓰는 값은 딱 두 종류다. 밖에서 받은 값(props)과 안에서 기억하는 값(state). 이 둘을 구분하는 것이 React의 절반이다.' },
    { type: 'p', text: '자판기에 비유해 보자. 자판기에 붙은 가격표는 주인이 정해 준 값이다. 자판기가 스스로 바꿀 수 없다 — 이것이 props다. 반면 "지금 투입된 금액"은 자판기가 스스로 기억하고, 동전이 들어올 때마다 바뀐다 — 이것이 state다.' },
    { type: 'code', lang: 'tsx', code: `function Counter({ step }: { step: number }) {   // step = props (부모가 줌, 읽기 전용)\n  const [count, setCount] = useState(0);         // count = state (내가 기억하고 내가 바꿈)\n  return <button onClick={() => setCount(count + step)}>{count}</button>;\n}\n\n<Counter step={1} />   // 1씩 올라가는 카운터\n<Counter step={10} />  // 10씩 올라가는 카운터` },

    { type: 'h', text: 'useState 읽는 법' },
    { type: 'p', text: 'const [count, setCount] = useState(0) 은 "count라는 기억을 0으로 시작하고, 바꿀 때는 setCount를 쓰겠다"는 뜻이다. 돌려받는 것은 두 개짜리 배열이다: 현재 값, 그리고 값을 바꾸는 함수.' },
    { type: 'list', items: [
      'count — 지금 이 순간의 값. 읽기만 한다.',
      'setCount(새 값) — 값을 바꾸고 React에게 "다시 그려 달라"고 알린다.',
      'useState(0)의 0 — 처음 한 번만 쓰이는 초기값.',
    ] },
    { type: 'p', text: '중요한 점: count = count + 1 처럼 직접 대입하면 안 된다. 값은 바뀌지만 React는 그 사실을 모르기 때문에 화면이 그대로다. 반드시 setCount를 거쳐야 한다.' },


    { type: 'h', text: '상태는 "그 상태를 쓰는 컴포넌트들의 가장 가까운 공통 부모"에 둔다' },
    { type: 'p', text: '노트 목록 페이지를 보자. 검색어를 입력하는 입력창과, 검색 결과를 보여 주는 목록이 있다. 검색어는 어디에 있어야 할까?' },
    { type: 'list', items: [
      '입력창 안에 두면 — 목록이 검색어를 알 방법이 없다. 형제끼리는 직접 값을 주고받을 수 없다.',
      '목록 안에 두면 — 입력창이 검색어를 바꿀 방법이 없다.',
      '둘의 부모(NoteListPage)에 두면 — 입력창에는 "바꾸는 함수"를, 목록에는 "현재 값"을 내려 줄 수 있다.',
    ] },
    { type: 'code', lang: 'tsx', caption: 'pages/NoteListPage.tsx', code: `const [search, setSearch] = useState('');\n\n<Input value={search} onChange={(e) => setSearch(e.target.value)} />  // 상향: 자식 → 부모\n<NoteGrid notes={filtered} />                                          // 하향: 부모 → 자식` },
    { type: 'p', text: '이렇게 상태를 공통 부모로 올리는 것을 "상태 끌어올리기(lifting state up)"라고 부른다. 처음에는 가장 가까운 곳에 두고, 다른 컴포넌트도 그 값이 필요해지면 그때 한 단계 올린다.' },

    { type: 'h', text: '전역이 필요한 상태' },
    { type: 'p', text: '로그인한 사용자 정보는 헤더도, 프로필 페이지도, 노트 작성 폼도 필요로 한다. 끌어올리다 보면 최상단까지 올라가고, 중간의 모든 컴포넌트가 자기는 쓰지도 않는 값을 props로 넘겨 받아 또 넘겨 줘야 한다. 이것을 "props drilling(props 뚫기)"이라고 한다.' },
    { type: 'p', text: 'Context는 이 문제를 푸는 도구다. 방송국처럼 값을 "방송"하고, 필요한 컴포넌트만 "수신"한다. 이 사이트는 AuthContext(로그인 사용자), ThemeContext(테마), ToastContext(알림) 세 개만 전역이고 나머지는 전부 지역 state다.' },

    { type: 'tip', text: '"이 값을 바꾸는 사람이 누구인가?"를 물어보면 state의 위치가 정해진다. 바꾸는 쪽이 소유한다. 그리고 "이 값을 다른 값에서 계산할 수 있는가?"를 물어보면 state의 개수가 줄어든다.' },
  ],
  quiz: [
    { id: 'p1', question: 'props에 대한 설명으로 옳은 것은?', choices: ['자식이 자유롭게 수정한다', '부모가 넘기고 자식은 읽기만 한다', 'useState로 만든다', '전역에서 공유된다'], answerIndex: 1, explanation: 'props는 읽기 전용이다. 바꾸고 싶으면 부모가 준 콜백을 호출해 부모의 state를 바꾼다.' },
    { id: 'p2', question: '검색어를 입력창과 목록이 함께 쓴다. 검색어 state는 어디에?', choices: ['입력창 컴포넌트', '목록 컴포넌트', '둘의 가장 가까운 공통 부모', 'localStorage'], answerIndex: 2, explanation: '공유되는 상태는 공통 부모로 끌어올린다. 그래야 한 곳에서 바뀌고 양쪽에 내려간다.' },
    { id: 'p3', question: 'Context를 쓰기에 가장 적절한 상태는?', choices: ['폼의 입력값', '카드 하나의 펼침 여부', '로그인한 사용자 정보', '리스트 정렬 방향'], answerIndex: 2, explanation: '트리 전체에서 필요한 값만 전역으로 올린다. 나머지는 지역 state가 훨씬 단순하다.' },
    { id: 'p4', question: 'count = count + 1 처럼 state를 직접 바꾸면?', choices: ['화면이 바로 갱신된다', '값은 바뀌지만 React가 몰라서 화면이 그대로다', '에러가 나며 앱이 멈춘다', '자동으로 setCount가 호출된다'], answerIndex: 1, explanation: 'React는 set 함수 호출을 신호로 다시 그린다. 직접 대입은 그 신호를 보내지 않는다.' },
  ],
};
