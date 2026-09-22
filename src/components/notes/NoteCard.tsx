import { memo } from 'react';
import { Link } from 'react-router-dom';
import type { Note } from '@/lib/types';
import { excerpt, formatDate } from '@/lib/format';
import { getLesson } from '@/data/lessons';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import styles from './NoteCard.module.css';

export interface NoteCardProps {
  note: Note;
  isMine?: boolean;
}

/** 보너스 2: React.memo — 목록에서 검색어 state만 바뀔 때 카드가 다시 그려지지 않는다 */
export const NoteCard = memo(function NoteCard({ note, isMine = false }: NoteCardProps) {
  const lesson = getLesson(note.lesson_slug ?? undefined);
  const authorName = note.author?.display_name ?? '익명';
  return (
    <Card as="article" interactive className={styles.card}>
      <div className={styles.meta}>
        {lesson ? <Badge tone="accent">{lesson.title}</Badge> : <Badge>자유 노트</Badge>}
        {isMine && <Badge tone="success">내 노트</Badge>}
        {!note.is_public && <Badge tone="warn">비공개</Badge>}
      </div>
      <h3 className={styles.title}>
        <Link to={`/notes/${note.id}`} className={styles.link}>{note.title}</Link>
      </h3>
      <p className={styles.excerpt}>{excerpt(note.content)}</p>
      <footer className={styles.footer}>
        <span className={styles.author}>
          <Avatar name={authorName} src={note.author?.avatar_url} size={22} />
          {authorName}
        </span>
        <time dateTime={note.created_at}>{formatDate(note.created_at)}</time>
      </footer>
    </Card>
  );
});
