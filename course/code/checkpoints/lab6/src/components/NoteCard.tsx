import { useState } from 'react';
import type { Note } from '../types';

type Props = {
  note: Note;
  onDelete: (id: number) => void;
  onToggleImportant: (id: number) => void;
};

export default function NoteCard({ note, onDelete, onToggleImportant }: Props) {
  // 펼침 여부는 이 카드만 알면 되므로 카드 안에 둔다.
  // 중요 여부는 Header도 알아야 하므로 App으로 끌어올렸다.
  const [isOpen, setIsOpen] = useState(false);

  function handleToggleOpen() {
    setIsOpen(!isOpen);
  }

  return (
    <li className={note.isImportant ? 'note-card is-important' : 'note-card'}>
      <div className="note-head">
        <h2 className="note-title">{note.title}</h2>
        {note.isImportant && <span className="badge">중요</span>}
        <button
          type="button"
          className="btn star"
          aria-label={note.isImportant ? '중요 표시 끄기' : '중요 표시 켜기'}
          onClick={() => onToggleImportant(note.id)}
        >
          {note.isImportant ? '★' : '☆'}
        </button>
      </div>

      <p className={isOpen ? 'note-body' : 'note-body is-collapsed'}>{note.body}</p>

      <div className="note-actions">
        <button type="button" className="btn" aria-expanded={isOpen} onClick={handleToggleOpen}>
          {isOpen ? '접기' : '펼치기'}
        </button>
        <button type="button" className="btn btn-danger" onClick={() => onDelete(note.id)}>
          삭제
        </button>
      </div>
    </li>
  );
}
