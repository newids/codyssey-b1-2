import { useState } from 'react';
import type { Note } from '../types';

type Props = {
  note: Note;
};

export default function NoteCard({ note }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isImportant, setIsImportant] = useState(note.isImportant);

  function handleToggleOpen() {
    setIsOpen(!isOpen);
  }

  function handleToggleImportant() {
    setIsImportant(!isImportant);
  }

  return (
    <li className={isImportant ? 'note-card is-important' : 'note-card'}>
      <div className="note-head">
        <h2 className="note-title">{note.title}</h2>
        <button
          type="button"
          className="btn star"
          aria-label={isImportant ? '중요 표시 끄기' : '중요 표시 켜기'}
          onClick={handleToggleImportant}
        >
          {isImportant ? '★' : '☆'}
        </button>
      </div>

      <p className={isOpen ? 'note-body' : 'note-body is-collapsed'}>{note.body}</p>

      <div className="note-actions">
        <button type="button" className="btn" aria-expanded={isOpen} onClick={handleToggleOpen}>
          {isOpen ? '접기' : '펼치기'}
        </button>
      </div>
    </li>
  );
}
