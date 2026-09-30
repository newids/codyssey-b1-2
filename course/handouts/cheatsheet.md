# React 첫걸음 치트시트

> 화면은 데이터(state)로부터 계산된다. 이벤트가 state를 바꾸면 React가 화면을 다시 계산한다.

![이벤트 → 상태 → 렌더링](../slides/diagrams/g06-event-state-render.svg)

## JSX

```tsx
return (
  <div className="app">        {/* 가장 바깥 태그는 하나, class 대신 className */}
    <p>메모 {count}개</p>       {/* { } 안에는 JavaScript 값 */}
    <img src="logo.png" />      {/* 태그는 반드시 닫는다 */}
  </div>
);
```

## 컴포넌트와 props

```tsx
type Props = { note: Note; count: number };

export default function NoteCard({ note, count }: Props) {
  return <h2>{note.title}</h2>;
}

<NoteCard note={note} count={3} />   // 글자는 title="…", 그 밖의 값은 { }
```

- 컴포넌트 이름은 대문자로 시작한다.
- props는 부모 → 자식으로만 흐르고, 자식은 읽기만 한다.

## 목록

```tsx
{notes.map((note) => (
  <NoteCard key={note.id} note={note} />
))}
```

- `key`는 목록 안에서 겹치지 않는 값(`id`).

## state와 이벤트

```tsx
const [isOpen, setIsOpen] = useState(false);

function handleToggle() {
  setIsOpen(!isOpen);           // 반드시 set 함수로 바꾼다
}

<button onClick={handleToggle}>…</button>              // 괄호 없이 함수를 넘긴다
<button onClick={() => onDelete(note.id)}>…</button>   // 인자가 있으면 화살표 함수로
```

## 배열 state 바꾸기

| 하고 싶은 것 | 코드 |
| --- | --- |
| 추가 | `setNotes([newNote, ...notes])` |
| 삭제 | `setNotes(notes.filter((note) => note.id !== id))` |
| 수정 | `setNotes(notes.map((note) => note.id === id ? { ...note, isImportant: true } : note))` |

- `push`, `splice`, `note.title = …`처럼 기존 값을 고치지 않는다.
- 다른 state에서 계산할 수 있는 값은 state로 만들지 않는다.

  ```tsx
  const importantCount = notes.filter((note) => note.isImportant).length;
  ```

## state를 어디에 둘까

- 한 컴포넌트만 쓴다 → 그 컴포넌트에 (`isOpen`)
- 여러 컴포넌트가 쓴다 → 공통 부모에 두고 props로 내려보낸다 (`notes`)
- 자식이 바꿔야 한다 → 부모가 함수를 props로 준다 (`onDelete`)

## 조건부 렌더링

```tsx
{notes.length === 0 ? <p>메모가 없습니다.</p> : <NoteList notes={notes} />}
{note.isImportant && <span>중요</span>}
{notes.length > 0 && <NoteList notes={notes} />}   // 숫자를 그대로 조건으로 쓰지 않는다
```

## 폼

```tsx
const [title, setTitle] = useState('');

function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();               // 새로 고침 막기
  if (title.trim() === '') return;      // 검증
  onAdd(title.trim());
  setTitle('');                         // 입력칸 비우기
}

<form onSubmit={handleSubmit}>
  <input value={title} onChange={(event) => setTitle(event.target.value)} />
  <button type="submit">추가</button>
</form>
```

## useEffect

```tsx
useEffect(() => {
  saveNotes(notes);
}, [notes]);
```

| 의존성 배열 | 실행 시점 |
| --- | --- |
| `[notes]` | 처음 + `notes`가 바뀔 때 |
| `[]` | 처음 한 번 |
| 없음 | 다시 그릴 때마다 |

데이터 요청은 상태를 나눠 그린다.

```tsx
{status === 'loading' && <p>불러오는 중…</p>}
{status === 'error' && <p>불러오지 못했습니다.</p>}
{status === 'success' && items.length === 0 && <p>아직 없습니다.</p>}
{status === 'success' && items.length > 0 && <ul>…</ul>}
```

## 타입 표기 읽는 법

| 표기 | 읽는 법 |
| --- | --- |
| `title: string` | `title`은 글자 |
| `count: number` | `count`는 숫자 |
| `isImportant: boolean` | 참 또는 거짓 |
| `Note[]` | `Note`가 여러 개 들어 있는 배열 |
| `type Note = { id: number; title: string }` | `Note`는 이런 모양의 객체 |
| `type Props = { note: Note }` | 이 컴포넌트는 `note`를 받는다 |
| `{ note }: Props` | 받은 props에서 `note`를 꺼낸다 |
| `useState<Note[]>([])` | 이 state에는 `Note` 배열이 들어간다 |
| `(id: number) => void` | 숫자를 받고, 돌려주는 값이 없는 함수 |
| `title?: string` | 있을 수도, 없을 수도 있다 |
| `string \| undefined` | 글자이거나 없음 |
| `'loading' \| 'success' \| 'error'` | 이 셋 중 하나 |
| `import type { Note } from './types'` | 타입만 가져온다 |

빨간 밑줄이 생기면 마우스를 올려 메시지를 읽는다. 대부분 "줘야 할 props를 안 줬다" 또는 "값의 종류가 다르다"이다.

## 자주 나는 실수 다섯 가지

1. 컴포넌트 이름을 소문자로 썼다 → 화면에 안 나온다.
2. `onClick={handleClick()}` → 그리는 순간 실행된다. 괄호를 뺀다.
3. `notes.push(…)` → 화면이 안 바뀐다. 새 배열을 만든다.
4. `map`에 `key`가 없다 → 콘솔 경고.
5. `value`만 있고 `onChange`가 없다 → 입력이 안 된다.
