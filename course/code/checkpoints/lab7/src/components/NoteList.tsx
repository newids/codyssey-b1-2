import type { Note } from '../types';
import NoteCard from './NoteCard';

type Props = {
  notes: Note[];
  onDelete: (id: number) => void;
  onToggleImportant: (id: number) => void;
};

export default function NoteList({ notes, onDelete, onToggleImportant }: Props) {
  return (
    <ul className="note-list">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onDelete={onDelete}
          onToggleImportant={onToggleImportant}
        />
      ))}
    </ul>
  );
}
