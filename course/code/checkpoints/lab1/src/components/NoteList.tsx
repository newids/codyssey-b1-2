import NoteCard from './NoteCard';

// 같은 컴포넌트를 세 번 쓰면 똑같은 카드가 세 장 나온다.
// 카드마다 다른 내용을 보여 주는 방법(props)은 실습 2에서 배운다.
export default function NoteList() {
  return (
    <ul className="note-list">
      <NoteCard />
      <NoteCard />
      <NoteCard />
    </ul>
  );
}
