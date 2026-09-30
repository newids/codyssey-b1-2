---
marp: true
paginate: true
title: React 첫걸음 2일 차 — 상태와 이벤트로 화면을 움직인다
---

# React 첫걸음

## 2일 차 — 상태와 이벤트로 화면을 움직인다

---

## 복습 퀴즈 (10분)

`handouts/quiz.md`의 1일 차 5문항

1. 컴포넌트 이름은 왜 대문자로 시작하는가?
2. JSX에서 `class` 대신 쓰는 것은?
3. props는 누가 누구에게 주는가?
4. 배열을 목록으로 그릴 때 쓰는 함수와, 꼭 붙여야 하는 속성은?
5. TypeScript의 타입 오류는 언제 알 수 있는가?

---

## 오늘 갈 길

| 일차 | 주제 | 끝나면 되는 것 |
| --- | --- | --- |
| 1일 | 컴포넌트, props | 메모 카드 목록이 보인다 |
| **2일** | **state, 이벤트** | **메모를 추가·삭제한다** |
| 3일 | 폼, useEffect | 입력하고, 저장하고, 불러온다 |

어제의 화면은 **멈춰 있었다.** 오늘은 클릭에 반응하게 만든다.

---

<!-- 이론 4 -->

# 이론 4. useState와 이벤트

---

## state — 컴포넌트가 기억하는 값

- props: 부모가 **주는** 값. 읽기만 한다
- state: 컴포넌트가 **스스로 기억하고 바꾸는** 값

```tsx
const [isOpen, setIsOpen] = useState(false);
//     ↑ 지금 값   ↑ 바꾸는 함수      ↑ 처음 값
```

- 값을 바꿀 때는 반드시 set 함수를 쓴다: `setIsOpen(true)`
- `isOpen = true`처럼 직접 고치지 않는다

---

## 가장 작은 예 — 카운터 (라이브 코딩)

```tsx
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button type="button" onClick={handleClick}>
      {count}번 눌렀습니다
    </button>
  );
}
```

---

## 클릭하면 일어나는 일

![w:900](diagrams/g06-event-state-render.svg)

1. 사용자가 클릭한다
2. 이벤트 핸들러가 실행된다
3. 핸들러가 set 함수를 부른다
4. React가 컴포넌트 함수를 **다시 실행**한다 (리렌더링)
5. 새 값으로 계산된 화면이 나온다

---

## 일반 변수로는 왜 안 되나

```tsx
let count = 0;

function handleClick() {
  count = count + 1; // 값은 바뀌지만…
}
```

- React는 **set 함수가 불렸을 때만** 다시 그린다. 일반 변수가 바뀐 것은 모른다
- 다시 그려지더라도 함수가 처음부터 다시 실행되므로 `count`는 다시 `0`이다
- state는 다시 실행되어도 React가 값을 기억해 준다

---

## 이벤트 핸들러 쓰는 법

```tsx
<button onClick={handleClick}>       {/* 함수를 넘긴다 */}
<button onClick={handleClick()}>     {/* ✗ 그리는 순간 실행돼 버린다 */}
<button onClick={() => onDelete(id)}> {/* 인자가 필요하면 화살표 함수로 감싼다 */}
```

- `onClick`, `onChange`, `onSubmit` — `on` + 대문자로 시작
- 핸들러 이름은 보통 `handle…`로 짓는다

---

## state는 컴포넌트마다 따로 있다

```tsx
<NoteCard note={a} />  {/* isOpen: true  */}
<NoteCard note={b} />  {/* isOpen: false */}
<NoteCard note={c} />  {/* isOpen: false */}
```

- 같은 컴포넌트를 세 번 쓰면 state도 세 개다
- 첫 번째 카드를 펼쳐도 나머지는 그대로다

---

# 실습 3. 카드 펼치기와 중요 표시

20분 · `labs/lab3-state.md`

- "펼치기/접기" 버튼
- 별(☆/★) 버튼
- 일반 변수로 바꿔 보고, 왜 안 되는지 확인

---

<!-- 이론 5 -->

# 이론 5. 배열 state와 끌어올리기

---

## 문제: Header가 중요 메모 개수를 모른다

```
App
├─ Header          "중요 ?개"  ← 알 방법이 없다
└─ NoteList
    ├─ NoteCard    isImportant: true
    ├─ NoteCard    isImportant: false
    └─ NoteCard    isImportant: false
```

- state는 그 컴포넌트와 자식만 볼 수 있다
- 형제나 부모는 볼 수 없다

---

## 해결: state를 공통 부모로 끌어올린다

![w:900](diagrams/g07-lifting-state.svg)

- **데이터는 props로 내려간다**: `notes`, `note`
- **바꿔 달라는 요청은 함수 호출로 올라온다**: `onDelete(id)`, `onToggleImportant(id)`
- state는 한 곳에만 있다

---

## 함수도 props로 넘길 수 있다

```tsx
// 부모: state와, state를 바꾸는 함수를 가진다
function handleDelete(id: number) { … }
<NoteCard note={note} onDelete={handleDelete} />

// 자식: 받은 함수를 부르기만 한다
type Props = {
  note: Note;
  onDelete: (id: number) => void;
};
<button onClick={() => onDelete(note.id)}>삭제</button>
```

- `(id: number) => void` — "숫자를 받고, 돌려주는 값은 없는 함수"
- 자식은 **어떻게** 지우는지 모른다. "이 id를 지워 달라"고 알릴 뿐이다

---

## 배열 state는 새 배열로 바꾼다

```tsx
notes.push(newNote);        // ✗ 기존 배열을 고쳤다. React는 바뀐 줄 모른다
setNotes(notes);            // ✗ 같은 배열이므로 다시 그리지 않는다

setNotes([newNote, ...notes]); // ✓ 새 배열을 만들어 넘긴다
```

- React는 "이전 배열과 **같은 배열인가**"만 본다
- 그래서 내용을 고치지 않고 **새로 만들어서** 넘긴다

---

## 세 가지만 기억한다

| 하고 싶은 것 | 쓰는 것 | 코드 |
| --- | --- | --- |
| 추가 | 스프레드 | `[newNote, ...notes]` |
| 삭제 | `filter` | `notes.filter((note) => note.id !== id)` |
| 수정 | `map` | `notes.map((note) => note.id === id ? { ...note, isImportant: true } : note)` |

- 셋 다 기존 배열은 그대로 두고 **새 배열을 돌려준다**
- `{ ...note, isImportant: true }` — 객체도 같은 방식으로 새로 만든다

---

## 계산할 수 있는 값은 state로 두지 않는다

```tsx
const [notes, setNotes] = useState<Note[]>(sampleNotes);

// ✗ 개수를 state로 따로 두면, 메모를 바꿀 때마다 같이 맞춰야 한다
const [importantCount, setImportantCount] = useState(1);

// ✓ notes에서 그때그때 계산한다
const importantCount = notes.filter((note) => note.isImportant).length;
```

- state는 **최소한으로** 둔다
- 둘을 따로 두면 언젠가 어긋난다

---

# 휴식 10분

---

# 실습 4. 메모 추가와 삭제

30분 · `labs/lab4-lifting-state.md`

- `notes`를 `App`의 state로 만든다
- 추가(스프레드), 삭제(`filter`), 중요 표시(`map`)
- 중요 여부를 카드에서 `App`으로 끌어올린다

---

<!-- 이론 6 -->

# 이론 6. 조건부 렌더링

---

## 상황에 따라 다른 화면 그리기

```tsx
{/* 둘 중 하나를 고를 때: 삼항 연산자 */}
{notes.length === 0 ? <p>메모가 없습니다.</p> : <NoteList notes={notes} />}

{/* 있거나 없거나: && */}
{note.isImportant && <span className="badge">중요</span>}
```

- `조건 ? A : B` — 참이면 A, 거짓이면 B
- `조건 && A` — 참일 때만 A

---

## 빈 상태도 화면이다

메모가 0개일 때 아무것도 안 보이면

- 고장 난 건지, 원래 없는 건지 알 수 없다
- 무엇을 해야 하는지 알 수 없다

```tsx
<p className="empty">아직 메모가 없습니다. 첫 메모를 추가해 보세요.</p>
```

**"없다"는 사실과 "다음에 할 일"을 알려 준다**

---

## 조심할 것: 숫자 0

```tsx
{notes.length && <NoteList notes={notes} />}     // ✗ 0개면 화면에 0이 찍힌다
{notes.length > 0 && <NoteList notes={notes} />} // ✓
```

- `&&` 왼쪽에는 `true`/`false`가 되는 조건을 쓴다

---

# 실습 5. 빈 상태 화면

10분 · `labs/lab5-conditional.md`

- 메모가 없으면 안내 문구
- 중요한 메모에 배지
- (도전) "중요만 보기"

---

## 오늘 정리

| 개념 | 한 문장 |
| --- | --- |
| state | 컴포넌트가 기억하는 값. set 함수로만 바꾼다 |
| 리렌더링 | set 함수가 불리면 React가 컴포넌트를 다시 실행한다 |
| 불변 업데이트 | 배열·객체는 고치지 않고 새로 만들어 넘긴다 |
| state 끌어올리기 | 여러 컴포넌트가 쓰는 state는 공통 부모에 둔다 |
| 조건부 렌더링 | `? :`와 `&&`로 상황에 맞는 화면을 그린다 |

**이벤트 → state 변경 → 다시 렌더링** — 3일 차에도 이 흐름은 그대로다

---

## 복습 과제

React Playground — https://codyssey-b1-2-react.vercel.app

- 레슨 3. 이벤트 → 상태 → 렌더링 (퀴즈 포함)

**내일**: 직접 입력하고, 저장하고, 불러온다 — 폼과 useEffect
