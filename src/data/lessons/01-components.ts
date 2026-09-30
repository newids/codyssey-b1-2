import type { Lesson } from './types';

export const components: Lesson = {
  slug: 'components',
  order: 1,
  title: '컴포넌트는 왜 필요한가',
  subtitle: 'UI를 함수로 쪼개는 기준',
  minutes: 16,
  level: '입문',
  summary: '화면을 "다시 쓸 수 있는 함수"로 나누면 상태가 어디 있어야 하는지가 보인다.',
  usedIn: ['src/components/ui/Button.tsx', 'src/components/notes/NoteCard.tsx', 'src/pages/NoteListPage.tsx'],
  blocks: [
    { type: 'p', text: '레고 블록을 떠올려 보자. 성을 통째로 한 덩어리로 찍어내면 탑 하나를 고치려 해도 전부 다시 만들어야 한다. 블록으로 나눠 두면 탑 블록만 바꾸면 된다. React 컴포넌트는 화면을 만드는 레고 블록이다.' },
    { type: 'p', text: '조금 더 정확히 말하면, 컴포넌트는 "입력(props)을 받아 화면(JSX)을 돌려주는 함수"다. 함수이기 때문에 이름이 있고, 여러 번 호출할 수 있고, 같은 입력을 주면 같은 화면이 나온다.' },
    { type: 'code', lang: 'tsx', caption: '가장 작은 컴포넌트', code: `function Badge({ children }: { children: React.ReactNode }) {\n  return <span className="badge">{children}</span>;\n}\n\n// 사용 — HTML 태그처럼 쓴다\n<Badge>입문</Badge>\n<Badge>기본</Badge>` },
    { type: 'p', text: '위 코드에서 Badge는 그냥 자바스크립트 함수다. React는 <Badge>입문</Badge> 을 만나면 이 함수를 호출하고, 돌려받은 <span>을 화면에 그린다. 대문자로 시작하는 이름은 "내가 만든 컴포넌트", 소문자(div, span)는 "브라우저가 아는 HTML 태그"라는 약속이다.' },


    { type: 'h', text: '왜 쪼개야 하는가 — 쪼개지 않으면 생기는 일' },
    { type: 'p', text: '이전 미션(B1-1)에서는 index.html 하나에 모든 마크업을 넣었다. 페이지가 하나일 때는 괜찮다. 하지만 "노트 카드"가 목록 페이지, 레슨 페이지, 프로필 페이지 세 곳에 나온다면? 복사해서 붙여 넣으면 나중에 디자인을 바꿀 때 세 곳을 모두 고쳐야 하고, 한 곳을 빼먹으면 화면마다 모양이 달라진다.' },
    { type: 'p', text: '컴포넌트로 만들어 두면 NoteCard 파일 하나만 고치면 세 페이지가 함께 바뀐다. 이것이 컴포넌트의 첫 번째 가치, 재사용이다.' },

    { type: 'h', text: '쪼개는 기준 3가지' },
    { type: 'list', items: [
      '반복된다 — 같은 모양이 두 곳 이상에서 쓰이면 컴포넌트다. (Button, Card, Badge)',
      '독립적으로 이해된다 — 그 조각만 보고 "무엇인지" 말할 수 있으면 컴포넌트다. (NoteCard는 "노트 한 장", Quiz는 "연습 문제")',
      '상태를 가진다 — 자기만의 상태(열림/닫힘, 입력값)를 갖는 조각은 컴포넌트로 격리한다. (NoteForm, ThemeToggle)',
    ] },
    { type: 'p', text: '반대로, 한 번만 쓰이고 상태도 없는 세 줄짜리 문단을 굳이 컴포넌트로 뺄 필요는 없다. 파일만 늘고 읽기가 어려워진다. 쪼개는 것은 목적이 아니라 수단이다.' },

    { type: 'h', text: '페이지 컴포넌트와 UI 컴포넌트' },
    { type: 'p', text: '이 사이트는 컴포넌트를 두 종류로 나눠 폴더를 달리 둔다. 식당에 비유하면 pages/ 는 "주문을 받고 음식을 조합해 내가는 홀 매니저", components/ 는 "시키는 대로 접시를 만드는 주방"이다.' },
    { type: 'list', items: [
      'pages/ — 주소(라우트) 하나에 대응한다. 서버에서 데이터를 가져오고, 어떤 컴포넌트를 어떤 순서로 놓을지 조립만 한다.',
      'components/ — props만 받아 그리는 데 집중한다. 데이터가 Supabase에서 왔는지, 테스트용 가짜인지 모른다.',
    ] },
    { type: 'code', lang: 'tsx', caption: 'pages/NoteListPage.tsx — 페이지는 조립만 한다', code: `const { status, data: notes, error, refetch } = useNotes({ search });\n\nreturn (\n  <AsyncBoundary status={status} error={error} isEmpty={notes.length === 0} onRetry={refetch}>\n    <NoteGrid notes={notes} />\n  </AsyncBoundary>\n);` },

    { type: 'tip', text: '컴포넌트 이름은 "무엇을 그리는가"로 짓는다. 동사(handleClick)는 함수, 명사(NoteCard)는 컴포넌트. 이름만 보고 화면 조각이 떠오르면 잘 지은 이름이다.' },
  ],
  quiz: [
    { id: 'c1', question: 'React 컴포넌트를 가장 정확히 설명한 것은?', choices: ['HTML 템플릿 파일', 'props를 받아 JSX를 돌려주는 함수', 'CSS 클래스 묶음', '서버에 요청을 보내는 객체'], answerIndex: 1, explanation: '컴포넌트는 입력(props) → 출력(JSX) 함수다. 그래서 같은 props면 같은 화면이 나온다.' },
    { id: 'c2', question: '"페이지 컴포넌트"와 "UI 컴포넌트"를 나누는 가장 큰 이유는?', choices: ['파일 수를 늘리기 위해', 'UI 컴포넌트를 데이터 출처와 무관하게 재사용하기 위해', 'CSS를 분리하기 위해', 'React가 강제하기 때문'], answerIndex: 1, explanation: 'UI 컴포넌트가 Supabase를 모르면 어떤 페이지에서도 쓸 수 있고 테스트도 쉽다.' },
    { id: 'c3', question: '다음 중 컴포넌트로 쪼갤 근거가 가장 약한 것은?', choices: ['세 페이지에서 반복되는 카드', '자기만의 열림/닫힘 상태를 가진 드롭다운', '한 번만 쓰이는 3줄짜리 문단', '로딩/에러/빈 상태를 통일하는 래퍼'], answerIndex: 2, explanation: '반복·독립성·상태 어느 것도 없다면 굳이 쪼갤 필요가 없다. 과한 분리는 오히려 읽기 어렵게 만든다.' },
    { id: 'c4', question: '<noteCard /> 처럼 소문자로 시작하면 어떻게 되는가?', choices: ['정상 동작한다', 'React가 HTML 태그로 취급해 컴포넌트가 호출되지 않는다', '컴파일 에러가 난다', '자동으로 대문자로 바뀐다'], answerIndex: 1, explanation: '대문자 시작은 "내가 만든 컴포넌트"라는 약속이다. 소문자는 브라우저 태그로 본다.' },
  ],
};
