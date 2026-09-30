import type { Note } from '../types';

type Props = {
  note: Note;
};

export default function NoteCard({ note }: Props) {
  return (
    <li className="note-card">
      <h2 className="note-title">{note.title}</h2>
      <p className="note-body">{note.body}</p>
    </li>
  );
}
