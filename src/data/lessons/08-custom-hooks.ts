import type { Lesson } from './types';

export const customHooks: Lesson = {
  slug: 'custom-hooks',
  order: 8,
  title: '커스텀 훅으로 흐름 묶기',
  subtitle: 'useNotes(), useNote(id)가 하는 일',
  minutes: 20,
  level: '응용',
  summary: '요청·상태·재시도를 훅 하나에 담으면 페이지는 "무엇을 보여줄지"만 남는다.',
  usedIn: ['src/hooks/useAsync.ts', 'src/hooks/useNotes.ts', 'src/hooks/useLessonProgress.ts'],
  blocks: [
    { type: 'p', text: '1번 레슨에서 "반복되는 화면 조각은 컴포넌트로 뺀다"고 배웠다. 그러면 반복되는 "로직"은 어디로 빼야 할까? 데이터를 가져오는 코드를 떠올려 보자. state 세 개(status, data, error), useEffect, cleanup. 목록 페이지에도, 상세 페이지에도, 프로필 페이지에도 똑같이 필요하다. 이것을 담는 그릇이 커스텀 훅이다.' },

    { type: 'h', text: '커스텀 훅은 그냥 함수다' },
    { type: 'p', text: '커스텀 훅은 특별한 문법이 아니다. 이름이 use로 시작하고, 안에서 다른 훅(useState, useEffect 등)을 쓰는 평범한 자바스크립트 함수다. 컴포넌트와 다른 점은 하나, JSX(화면)가 아니라 값과 함수를 돌려준다.' },

    { type: 'h', text: '훅이 없을 때와 있을 때' },
    { type: 'code', lang: 'tsx', caption: '잘못된 예 — 훅 없이 — 페이지마다 이 15줄이 반복된다', code: `function NoteListPage() {\n  const [status, setStatus] = useState('idle');\n  const [notes, setNotes] = useState([]);\n  const [error, setError] = useState(null);\n\n  useEffect(() => {\n    let cancelled = false;\n    setStatus('loading');\n    listNotes({ search })\n      .then((r) => { if (!cancelled) { setNotes(r); setStatus('success'); } })\n      .catch((e) => { if (!cancelled) { setError(e); setStatus('error'); } });\n    return () => { cancelled = true; };\n  }, [search]);\n  // … 그리고 이제야 화면을 그린다\n}` },
    { type: 'code', lang: 'tsx', caption: '올바른 예 — 훅으로 — 한 줄', code: `function NoteListPage() {\n  const notes = useNotes({ search });   // { status, data, error, refetch }\n  // 바로 화면을 그린다\n}` },

    { type: 'h', text: '두 층으로 쌓는다' },
    { type: 'p', text: '이 사이트는 훅을 두 층으로 나눴다. 아래층 useAsync는 "요청 함수만 주면 status·data·error·refetch를 관리해 주는" 범용 훅이고(4번 레슨에서 본 그 effect가 들어 있다), 위층은 "노트를 가져오는" 도메인 훅이다.' },
    { type: 'code', lang: 'ts', caption: 'hooks/useNotes.ts — 위층: 이름만 봐도 무엇을 돌려주는지 안다', code: `export function useNotes(params: ListNotesParams) {\n  const { ownerId, lessonSlug, search } = params;\n  const fetcher = useCallback(\n    () => listNotes({ ownerId, lessonSlug, search }),\n    [ownerId, lessonSlug, search],\n  );\n  return useAsync(fetcher, []);\n}\n\nexport function useNote(id: string | undefined) {\n  const fetcher = useCallback(() => getNote(id), [id]);\n  return useAsync(fetcher, null);\n}` },

    { type: 'h', text: '훅의 규칙 두 가지' },
    { type: 'list', items: [
      '최상위에서만 호출한다 — if문, for문, 중첩 함수 안에서 부르지 않는다. React는 훅이 "불린 순서"로 각 state를 구분한다. 조건에 따라 순서가 달라지면 state가 뒤섞인다.',
      '컴포넌트나 다른 훅 안에서만 호출한다 — 일반 함수에서는 부를 수 없다. 이름을 use로 시작하는 것은 이 규칙을 도구가 검사할 수 있게 하는 약속이다.',
    ] },
    { type: 'p', text: '또 하나 기억할 점: 같은 훅을 두 컴포넌트에서 쓰면 state도 두 벌 생긴다. 훅은 "로직"을 공유할 뿐 "데이터"를 공유하지 않는다. 데이터까지 공유하려면 Context가 필요하다.' },

    { type: 'h', text: '메모이제이션 — 같은 것은 다시 만들지 않는다' },
    { type: 'p', text: '컴포넌트 함수는 렌더링마다 다시 실행되고, 안에서 만든 함수·객체·배열은 매번 "새 것"이 된다. 대부분은 문제가 없지만, 두 경우에는 문제가 된다. 메모이제이션 도구 세 가지가 그때 쓰인다.' },
    { type: 'list', items: [
      'useCallback(fn, deps) — 함수의 주소를 고정한다. 위 코드의 fetcher가 그 예다. 고정하지 않으면 렌더링마다 새 fetcher → useAsync의 effect가 매번 재실행 → 무한 요청.',
      'useMemo(() => 계산, deps) — 계산 결과를 기억한다. 필터된 목록, 폼 검증 결과, 레슨별 최고 점수처럼 "입력이 같으면 결과도 같은" 계산에 쓴다.',
      'React.memo(Component) — props가 이전과 같으면 그 컴포넌트를 다시 그리지 않는다. 이 사이트의 NoteCard와 LessonCard가 감싸져 있다. 목록에서 검색어만 바뀔 때 이미 그려진 카드들을 다시 그리지 않는다.',
    ] },

    { type: 'tip', text: '훅 이름만 보고 "무엇을 돌려주는지" 알 수 있어야 한다. useNotes → 노트 목록, useLessonProgress → 진도. 그리고 훅을 만들기 전에 먼저 페이지에 직접 써 보자. 같은 코드가 두 번째로 필요해질 때가 훅으로 뺄 때다.' },
  ],
  quiz: [
    { id: 'h1', question: '커스텀 훅의 정체는?', choices: ['React 내장 특수 API', 'use로 시작하며 다른 훅을 조합한 일반 함수', '클래스 컴포넌트', 'Context의 별칭'], answerIndex: 1, explanation: '규칙은 두 가지뿐이다. use로 시작하고, 컴포넌트/훅 최상위에서만 호출한다.' },
    { id: 'h2', question: 'fetcher를 useCallback 없이 effect 의존성에 넣으면?', choices: ['문제 없음', '렌더링마다 새 함수 → effect 무한 재실행', '한 번만 실행', '컴파일 에러'], answerIndex: 1, explanation: '함수는 렌더링마다 새로 만들어져 참조가 다르다. 의존성이 "바뀐" 것으로 판단된다.' },
    { id: 'h3', question: 'React.memo(NoteCard)가 막아주는 것은?', choices: ['네트워크 요청', 'props가 같은데도 부모 때문에 다시 그려지는 것', '에러', '리렌더링 전부'], answerIndex: 1, explanation: 'props가 얕은 비교로 같으면 이전 결과를 재사용한다. props가 바뀌면 당연히 다시 그린다.' },
    { id: 'h4', question: '같은 커스텀 훅을 두 컴포넌트에서 호출하면?', choices: ['state를 서로 공유한다', '각자 독립된 state를 가진다', '두 번째 호출은 무시된다', '에러가 난다'], answerIndex: 1, explanation: '훅은 로직을 재사용할 뿐이다. 데이터를 공유하려면 Context 같은 다른 도구가 필요하다.' },
  ],
};
