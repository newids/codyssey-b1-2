import type { Lesson } from './types';

export const eventsRendering: Lesson = {
  slug: 'events-rendering',
  order: 3,
  title: '이벤트 → 상태 → 렌더링',
  subtitle: 'React가 화면을 바꾸는 유일한 경로',
  minutes: 18,
  level: '기본',
  summary: 'DOM을 직접 만지지 않는다. 이벤트는 state만 바꾸고, 화면은 state로부터 계산된다.',
  usedIn: ['src/components/lessons/Quiz.tsx', 'src/components/ui/ThemeToggle.tsx', 'src/pages/NoteListPage.tsx'],
  blocks: [
    { type: 'p', text: '이 사이트 첫 화면의 "버튼 누르기"를 눌러 보았는가? 누르면 세 단계가 순서대로 켜진다. 이벤트, 상태 변경, 리렌더링. 이 세 단계가 React가 화면을 바꾸는 유일한 경로이고, 이 레슨의 전부다.' },

    { type: 'h', text: '바닐라 JS와 무엇이 다른가' },
    { type: 'p', text: '이전 미션에서는 클릭 핸들러 안에서 화면을 직접 고쳤다. "버튼을 누르면 → 이 요소를 찾아서 → 글자를 이렇게 바꿔라"처럼 절차를 하나하나 지시했다. 이것을 명령형이라고 한다.' },
    { type: 'code', lang: 'ts', caption: '명령형 — 어떻게 바꿀지를 지시한다', code: `button.addEventListener('click', () => {\n  count = count + 1;\n  document.querySelector('#count').textContent = String(count);   // 화면을 직접 고침\n  if (count >= 10) document.querySelector('#badge').classList.add('gold');\n});` },
    { type: 'code', lang: 'tsx', caption: '선언형 — 상태가 이러면 화면은 이렇다', code: `const [count, setCount] = useState(0);\n\nreturn (\n  <>\n    <button onClick={() => setCount(count + 1)}>누르기</button>\n    <span>{count}</span>\n    {count >= 10 && <Badge tone="gold">10회 달성</Badge>}\n  </>\n);` },
    { type: 'p', text: 'React에서는 핸들러가 setCount만 호출한다. 화면의 어느 부분을 고쳐야 하는지는 말하지 않는다. 대신 "count가 이 값일 때 화면은 이렇게 생겼다"를 적어 두면, React가 이전 화면과 비교해 달라진 부분만 실제 DOM에 반영한다. 이것을 선언형이라고 한다.' },

    { type: 'code', lang: 'tsx', caption: 'components/lessons/Quiz.tsx — 선택하면 즉시 상태가 바뀌고 채점 버튼이 활성화된다', code: `const [answers, setAnswers] = useState<QuizAnswers>({});\n\nconst select = (questionId: string, choiceIndex: number) =>\n  setAnswers((prev) => ({ ...prev, [questionId]: choiceIndex }));   // 새 객체 (불변)\n\n<Button disabled={!isQuizComplete(questions, answers)}>채점하기</Button>` },

    { type: 'h', text: '리렌더링은 언제 일어나나' },
    { type: 'list', items: [
      '자기 state가 바뀌었을 때 — set 함수 호출, 값이 실제로 달라졌을 때만.',
      '부모가 리렌더링되어 새 props를 받았을 때 — 부모 함수가 다시 실행되면 자식도 다시 호출된다.',
      '구독 중인 Context 값이 바뀌었을 때 — 테마를 바꾸면 useTheme()을 쓰는 컴포넌트가 다시 그려진다.',
    ] },

    { type: 'h', text: '왜 "새 객체"를 만들어야 하나 — 불변성' },
    { type: 'p', text: 'React는 state가 바뀌었는지를 Object.is로 비교한다. 객체나 배열은 "내용"이 아니라 "주소(참조)"를 비교한다. 같은 상자의 내용물만 바꾸면 주소가 같으니 React는 "안 바뀌었네"라고 판단하고 화면을 그대로 둔다.' },
    { type: 'code', lang: 'tsx', caption: '같은 상자를 고치면 안 된다', code: `// 잘못된 예: 화면이 안 바뀐다 — 같은 객체를 고쳤다\nanswers[questionId] = choiceIndex;\nsetAnswers(answers);\n\n// 올바른 예: 새 객체를 만든다 — 기존 내용을 펼치고(...) 바뀐 것만 덮어쓴다\nsetAnswers((prev) => ({ ...prev, [questionId]: choiceIndex }));\n\n// 배열도 마찬가지\nsetItems((prev) => [...prev, newItem]);              // 추가\nsetItems((prev) => prev.filter((x) => x.id !== id)); // 삭제` },


    { type: 'h', text: '이 사이트에서 확인할 수 있는 지점' },
    { type: 'list', items: [
      '노트 목록: 검색어 입력 → search state → 필터된 목록 즉시 변경',
      '노트 작성 폼: 제목 입력 → 오른쪽 미리보기 카드 실시간 갱신',
      '퀴즈: 보기 선택 → 채점 버튼 활성화 → 채점 후 정답/오답 표시',
      '테마 토글: 클릭 → ThemeContext → 전체 페이지 색상 전환',
      '저장 성공 → Toast 알림 표시 후 자동 소멸',
    ] },
    { type: 'tip', text: '화면이 안 바뀔 때는 두 가지만 확인하자. ① set 함수를 호출했는가? ② 객체·배열이라면 새로 만들어서 넘겼는가? 대부분 이 둘 중 하나다.' },
  ],
  quiz: [
    { id: 'e1', question: 'React에서 화면을 바꾸는 올바른 방법은?', choices: ['document.querySelector로 DOM을 수정', 'state를 바꾸면 React가 다시 그린다', 'innerHTML 교체', 'CSS 클래스를 직접 토글'], answerIndex: 1, explanation: 'React는 state → 화면을 선언적으로 계산한다. DOM을 직접 만지면 React가 모르는 변경이 생겨 어긋난다.' },
    { id: 'e2', question: 'setAnswers({ ...prev, [id]: 1 }) 처럼 새 객체를 만드는 이유는?', choices: ['문법이 짧아서', '메모리를 아끼려고', 'React가 참조 비교로 변경을 감지하기 때문', 'TypeScript가 요구해서'], answerIndex: 2, explanation: '같은 객체를 고치면 Object.is 비교에서 "같다"고 나와 리렌더링이 생략된다.' },
    { id: 'e3', question: '다음 중 리렌더링을 일으키지 않는 것은?', choices: ['setState로 다른 값 설정', '부모가 리렌더링됨', '구독한 Context 값 변경', '일반 변수(let x)에 값 대입'], answerIndex: 3, explanation: '일반 변수는 React가 추적하지 않는다. 화면에 반영되려면 state여야 한다.' },
  ],
};
