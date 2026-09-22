import type { Note } from '@/lib/types';
import { NoteCard } from './NoteCard';
import styles from './NoteGrid.module.css';

export function NoteGrid({ notes, currentUserId }: { notes: Note[]; currentUserId?: string }) {
  return (
    <div className={styles.grid}>
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} isMine={note.user_id === currentUserId} />
      ))}
    </div>
  );
}
