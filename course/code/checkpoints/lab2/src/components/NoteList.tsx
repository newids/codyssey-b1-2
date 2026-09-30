import type { Note } from '../types';
import NoteCard from './NoteCard';

type Props = {
  notes: Note[];
};

export default function NoteList({ notes }: Props) {
  return (
    <ul className="note-list">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </ul>
  );
}
