import type { Lesson } from './types';

export const useEffectLesson: Lesson = {
  slug: 'use-effect',
  order: 4,
  title: 'useEffect와 데이터 요청',
  subtitle: '언제 실행되고, 왜 의존성 배열이 있는가',
  minutes: 22,
  level: '기본',
  summary: '렌더링이 끝난 뒤 실행되는 "부수 효과". 의존성이 바뀔 때마다 다시 실행된다.',
  usedIn: ['src/hooks/useAsync.ts', 'src/hooks/useNotes.ts', 'src/context/AuthContext.tsx'],
  blocks: [
    { type: 'p', text: '지금까지 컴포넌트는 "state를 받아 화면을 계산하는 함수"였다. 그런데 실제 앱은 화면 계산 말고도 할 일이 있다. 서버에서 데이터를 가져오고, 로그인 상태 변화를 구독하고, 타이머를 건다. 이런 "화면 바깥 세계와 주고받는 일"을 부수 효과(side effect)라고 하고, useEffect가 그 자리다.' },

    { type: 'h', text: '왜 컴포넌트 본문에서 바로 요청하면 안 되나' },
    { type: 'p', text: '컴포넌트 함수는 렌더링할 때마다 다시 실행된다. 본문에서 바로 서버 요청을 보내면 어떻게 될까?' },
    { type: 'code', lang: 'tsx', caption: '잘못된 예 — 무한 요청', code: `function NoteList() {\n  const [notes, setNotes] = useState([]);\n  listNotes().then(setNotes);   // 렌더링마다 요청 → setNotes → 다시 렌더링 → 또 요청 → …\n  return <NoteGrid notes={notes} />;\n}` },
    { type: 'p', text: '요청이 끝나면 setNotes가 호출되고, state가 바뀌었으니 다시 렌더링되고, 본문이 다시 실행되니 또 요청한다. 끝나지 않는다. useEffect는 "언제 실행할지"를 우리가 정할 수 있게 해 준다.' },

    { type: 'h', text: 'useEffect의 세 부분' },
    { type: 'code', lang: 'tsx', code: `useEffect(() => {\n  // ① 할 일 — 화면이 그려진 "직후"에 실행된다\n  const timer = setInterval(tick, 1000);\n\n  // ② 정리(cleanup) — 다음 실행 직전, 그리고 화면에서 사라질 때 실행된다\n  return () => clearInterval(timer);\n}, [/* ③ 의존성 배열 — 이 값들이 바뀔 때만 다시 실행 */]);` },

    { type: 'h', text: '의존성 배열 3가지 형태' },
    { type: 'list', items: [
      '없음 useEffect(fn) — 렌더링마다 실행. 거의 쓰지 않는다. 위의 무한 요청과 같은 위험이 있다.',
      '빈 배열 useEffect(fn, []) — 화면에 처음 나타날 때(마운트) 한 번. "의존하는 값이 없다"는 뜻이다. 로그인 상태 구독처럼 앱이 켜져 있는 동안 계속 유지할 일에 쓴다.',
      '값 있음 useEffect(fn, [id]) — 처음 한 번 + id가 바뀔 때마다. 상세 페이지의 라우트 파라미터가 대표적이다.',
    ] },
    { type: 'p', text: '상세 페이지(/notes/:id)를 생각해 보자. 1번 노트를 보다가 2번 노트 링크를 누르면 주소의 id가 바뀐다. 컴포넌트는 그대로 화면에 있고 id만 달라졌다. 의존성에 id가 있으면 effect가 다시 실행되어 2번 노트를 가져온다. 의존성을 []로 두면? 처음 한 번만 실행되므로 주소는 2번인데 화면에는 1번 노트가 계속 보이는 버그가 생긴다.' },

    { type: 'h', text: '이 사이트의 모든 데이터 요청이 지나가는 훅' },
    { type: 'code', lang: 'tsx', caption: 'hooks/useAsync.ts', code: `useEffect(() => {\n  let cancelled = false;                     // 늦게 도착한 응답 무시용\n  setStatus('loading');\n  fetcher()\n    .then((result) => { if (!cancelled) { setData(result); setStatus('success'); } })\n    .catch((err) => { if (!cancelled) { setError(err); setStatus('error'); } });\n  return () => { cancelled = true; };        // cleanup: 언마운트/재실행 직전\n}, [fetcher]);                               // 의존성: fetcher가 바뀌면 다시 요청` },

    { type: 'h', text: 'cleanup이 필요한 이유 — 늦게 온 응답' },
    { type: 'p', text: '네트워크 응답은 보낸 순서대로 도착하지 않는다. 1번 노트를 요청하고 곧바로 2번 노트로 이동했다고 하자. 2번 응답이 먼저 오고, 느렸던 1번 응답이 나중에 도착하면? 화면은 2번 페이지인데 1번 노트의 내용이 덮어씌워진다. 이것을 경쟁 상태(race condition)라고 한다.' },
    { type: 'p', text: '위 코드의 cancelled 플래그가 이것을 막는다. id가 바뀌어 effect가 다시 실행되기 직전에 이전 effect의 cleanup이 불리면서 cancelled = true가 된다. 이후 1번 응답이 도착해도 if (!cancelled) 에 걸려 무시된다.' },

    { type: 'h', text: '함수를 의존성에 넣을 때의 함정' },
    { type: 'p', text: '자바스크립트에서 함수는 만들 때마다 "새 것"이다. 컴포넌트 본문에서 만든 함수는 렌더링마다 새로 만들어지므로, 의존성에 넣으면 React는 매번 "바뀌었다"고 판단한다. 결과는 또 무한 요청이다.' },
    { type: 'code', lang: 'tsx', caption: 'hooks/useNotes.ts — useCallback으로 함수의 "주소"를 고정한다', code: `// id가 바뀔 때만 새 함수를 만든다. 그 외 렌더링에서는 같은 함수를 재사용한다.\nconst fetcher = useCallback(() => getNote(id), [id]);\nreturn useAsync(fetcher, null);` },

    { type: 'tip', text: 'useEffect 안에서 쓰는 모든 외부 값(props, state, 함수)은 의존성에 넣는다. 빼고 싶은 마음이 든다면 코드 구조가 잘못됐다는 신호다. 함수를 넣어야 한다면 useCallback으로 주소를 고정한다.' },
  ],
  quiz: [
    { id: 'u1', question: 'useEffect는 언제 실행되는가?', choices: ['렌더링 전', '렌더링이 끝난 직후', '클릭 이벤트 때', '컴파일 시점'], answerIndex: 1, explanation: '화면을 먼저 그리고 나서 부수 효과를 실행한다. 그래서 첫 화면에는 loading 상태가 잠깐 보인다.' },
    { id: 'u2', question: 'useEffect(fn, [id]) 에서 배열의 의미는?', choices: ['fn을 id번 실행', 'id가 바뀔 때마다 fn 재실행', 'id를 fn에 인자로 전달', '아무 의미 없음'], answerIndex: 1, explanation: '의존성 배열의 값이 이전 렌더링과 다르면 effect를 다시 실행한다.' },
    { id: 'u3', question: 'effect에서 cancelled 플래그를 쓰는 이유는?', choices: ['요청을 빠르게 하려고', '떠난 화면에 늦은 응답이 반영되는 걸 막으려고', '에러를 숨기려고', '메모리를 줄이려고'], answerIndex: 1, explanation: '경쟁 상태(race condition) 방지. 이전 요청의 응답이 새 화면을 덮어쓰지 않게 한다.' },
    { id: 'u4', question: '상세 페이지에서 의존성 배열을 []로 두면?', choices: ['정상 동작', '다른 id로 이동해도 첫 데이터가 그대로 보인다', '무한 루프', '에러 발생'], answerIndex: 1, explanation: '마운트 때 한 번만 실행되므로 id가 바뀌어도 재요청하지 않는다.' },
    { id: 'u5', question: '컴포넌트 본문에서 바로 서버 요청 후 setState를 하면?', choices: ['한 번만 요청된다', '렌더링 → 요청 → setState → 렌더링이 끝없이 반복된다', '요청이 무시된다', '컴파일 에러'], answerIndex: 1, explanation: '본문은 렌더링마다 실행된다. 요청 시점을 통제하려면 useEffect와 의존성 배열이 필요하다.' },
  ],
};
