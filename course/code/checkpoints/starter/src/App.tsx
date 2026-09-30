// 실습 1에서 이 통짜 화면을 컴포넌트로 나눈다.
export default function App() {
  return (
    <div className="app">
      <header className="header">
        <h1 className="header-title">학습 메모</h1>
        <p className="header-meta">React를 배우며 남기는 메모</p>
      </header>

      <main>
        <ul className="note-list">
          <li className="note-card">
            <h2 className="note-title">컴포넌트는 함수다</h2>
            <p className="note-body">
              화면의 한 조각을 돌려주는 함수를 컴포넌트라고 한다. 이름은 대문자로 시작한다.
            </p>
          </li>
          <li className="note-card">
            <h2 className="note-title">props는 부모가 준다</h2>
            <p className="note-body">
              부모 컴포넌트가 자식에게 넘기는 값이다. 자식은 읽기만 하고 고치지 않는다.
            </p>
          </li>
          <li className="note-card">
            <h2 className="note-title">state가 바뀌면 다시 그린다</h2>
            <p className="note-body">
              set 함수로 state를 바꾸면 React가 컴포넌트를 다시 실행해서 화면을 새로 계산한다.
            </p>
          </li>
        </ul>
      </main>
    </div>
  );
}
