# 복습 퀴즈

수업을 시작할 때 전날 내용을 5문항으로 확인한다. 채점하지 않는다. 옆 사람과 답을 말해 보고 해설을 읽는다.

## 1일 차 복습 (2일 차 시작 때)

**1. 컴포넌트 이름은 왜 대문자로 시작하는가?**

<details><summary>답</summary>

소문자로 시작하면 React가 `<div>`, `<header>` 같은 HTML 태그로 본다. 대문자로 시작해야 우리가 만든 컴포넌트로 인식한다.

</details>

**2. JSX에서 HTML의 `class` 대신 쓰는 것은?**

<details><summary>답</summary>

`className`. JSX는 JavaScript 코드이고, `class`는 JavaScript에서 이미 다른 뜻으로 쓰는 단어다.

</details>

**3. props는 누가 누구에게 주는가? 받은 쪽은 그 값을 바꿀 수 있는가?**

<details><summary>답</summary>

부모 컴포넌트가 자식 컴포넌트에게 준다. 자식은 읽기만 하고 바꾸지 않는다.

</details>

**4. 메모 배열을 카드 목록으로 그릴 때 쓰는 함수는? 그때 각 카드에 꼭 붙여야 하는 속성은?**

<details><summary>답</summary>

`map`과 `key`. `key`에는 목록 안에서 겹치지 않는 값(`note.id`)을 준다.

```tsx
{notes.map((note) => (
  <NoteCard key={note.id} note={note} />
))}
```

</details>

**5. TypeScript의 타입 오류는 언제 알 수 있는가? 브라우저는 TypeScript를 실행할 수 있는가?**

<details><summary>답</summary>

코드를 실행하기 전에, 편집기의 빨간 밑줄과 빌드 단계에서 알 수 있다. 브라우저는 TypeScript를 모른다. 타입 표기를 지우고 JavaScript로 바꾼 것을 실행한다.

</details>

더 풀어 보기: React Playground 레슨 1, 2의 퀴즈 — https://codyssey-b1-2-react.vercel.app/lessons

## 2일 차 복습 (3일 차 시작 때)

**1. state를 바꿀 때 반드시 써야 하는 것은? 일반 변수를 바꾸면 왜 화면이 안 바뀌는가?**

<details><summary>답</summary>

`useState`가 돌려준 set 함수. React는 set 함수가 불렸을 때만 컴포넌트를 다시 실행한다. 일반 변수가 바뀐 것은 알지 못한다.

</details>

**2. 버튼을 눌렀을 때 화면이 바뀌기까지의 순서를 말해 보라.**

<details><summary>답</summary>

클릭 → 이벤트 핸들러 실행 → set 함수 호출 → React가 컴포넌트 함수를 다시 실행(리렌더링) → 새 화면.

</details>

**3. `notes` 배열 state의 맨 앞에 `newNote`를 추가하는 코드는? `notes.push(newNote)`는 왜 안 되는가?**

<details><summary>답</summary>

`setNotes([newNote, ...notes])`. `push`는 기존 배열을 고친다. React는 이전과 같은 배열이면 바뀌지 않았다고 보고 다시 그리지 않는다.

</details>

**4. `Header`는 중요 메모 개수를 보여 주고, `NoteCard`는 중요 표시를 바꾼다. 중요 여부를 담은 state는 어디에 두어야 하는가?**

<details><summary>답</summary>

둘의 공통 부모인 `App`. 데이터는 props로 내려보내고, `NoteCard`는 부모가 준 함수(`onToggleImportant`)를 불러 바꿔 달라고 요청한다. 이것을 state 끌어올리기라고 한다.

</details>

**5. `{count && <p>메모가 있습니다</p>}`에서 `count`가 `0`이면 화면에 무엇이 나오는가?**

<details><summary>답</summary>

숫자 `0`이 찍힌다. `{count > 0 && <p>…</p>}`처럼 참/거짓이 되는 조건을 써야 한다.

</details>

더 풀어 보기: React Playground 레슨 3의 퀴즈

## 3일 차 복습 (과정을 마친 뒤 스스로)

**1. controlled input에서 입력칸에 보이는 값은 어디에서 오는가?**

<details><summary>답</summary>

state. `value={title}`로 state를 보여 주고, `onChange`에서 set 함수로 state를 바꾼다.

</details>

**2. 폼의 제출 핸들러에서 `event.preventDefault()`를 부르는 이유는?**

<details><summary>답</summary>

폼을 제출하면 브라우저가 페이지를 새로 고친다. 그러면 state가 모두 사라지므로 그 기본 동작을 막는다.

</details>

**3. `useEffect(fn, [notes])`와 `useEffect(fn, [])`는 각각 언제 `fn`을 실행하는가?**

<details><summary>답</summary>

`[notes]`: 처음 그린 뒤, 그리고 `notes`가 바뀔 때마다. `[]`: 처음 화면에 나타났을 때 한 번.

</details>

**4. 데이터를 요청하는 화면이 그려야 하는 상태 네 가지는?**

<details><summary>답</summary>

불러오는 중(로딩), 실패(에러), 성공했지만 0개(빈 상태), 성공(데이터 표시).

</details>

**5. 메모 앱의 다음 부분은 실제 서비스에서 무엇으로 바뀌는가? (a) localStorage (b) `App`에서 props로 여러 단계 내려보내던 공용 데이터 (c) `TipList` 안의 status와 effect**

<details><summary>답</summary>

(a) 백엔드의 데이터베이스 (b) 전역 상태(Context) (c) 커스텀 훅(`useAsync` 같은 것).

</details>

더 풀어 보기: React Playground 레슨 4, 6, 7의 퀴즈
