import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { useNote } from '@/hooks/useNotes';
import { deleteNote } from '@/lib/api/notes';
import { formatDate } from '@/lib/format';
import { toUserMessage } from '@/lib/errors';
import { getLesson } from '@/data/lessons';
import { AsyncBoundary } from '@/components/ui/AsyncBoundary';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import styles from './NoteDetailPage.module.css';

/** 라우트 파라미터 id → useNote(id) → 요청 → 상태 → 화면 */
export function NoteDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { status, data: note, error, refetch } = useNote(id);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const isOwner = Boolean(user && note && note.user_id === user.id);

  const handleDelete = async () => {
    if (!note) return;
    setIsDeleting(true);
    try {
      await deleteNote(note.id);
      showToast('노트를 삭제했습니다.', 'success');
      navigate('/notes', { replace: true });
    } catch (err) {
      showToast(toUserMessage(err), 'error');
      setIsDeleting(false);
      setIsConfirming(false);
    }
  };

  return (
    <AsyncBoundary status={status} error={error} isEmpty={!note} onRetry={refetch} empty={{ title: '노트를 찾을 수 없습니다' }}>
      {note && (
        <article className={styles.article}>
          <nav className={styles.breadcrumb} aria-label="경로">
            <Link to="/notes">학습 노트</Link> <span aria-hidden="true">/</span> <span>{note.title}</span>
          </nav>
          <header className={styles.header}>
            <div className={styles.meta}>
              {note.lesson_slug && getLesson(note.lesson_slug) ? (
                <Link to={`/lessons/${note.lesson_slug}`} className={styles.lessonLink}>
                  <Badge tone="accent">{getLesson(note.lesson_slug)!.title}</Badge>
                </Link>
              ) : (
                <Badge>자유 노트</Badge>
              )}
              {!note.is_public && <Badge tone="warn">비공개</Badge>}
            </div>
            <h1 className={styles.title}>{note.title}</h1>
            <div className={styles.byline}>
              <Avatar name={note.author?.display_name ?? '익명'} src={note.author?.avatar_url} size={28} />
              <span>{note.author?.display_name ?? '익명'}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={note.created_at}>{formatDate(note.created_at, true)}</time>
              {note.updated_at !== note.created_at && <span className={styles.edited}>(수정됨 {formatDate(note.updated_at)})</span>}
            </div>
          </header>

          <div className={styles.body}>{note.content}</div>

          {isOwner && (
            <footer className={styles.actions}>
              <Link to={`/notes/${note.id}/edit`}><Button variant="secondary">수정</Button></Link>
              {isConfirming ? (
                <div className={styles.confirm} role="alertdialog" aria-label="삭제 확인">
                  <span>정말 삭제할까요? 되돌릴 수 없습니다.</span>
                  <Button variant="ghost" size="sm" onClick={() => setIsConfirming(false)} disabled={isDeleting}>취소</Button>
                  <Button variant="danger" size="sm" onClick={handleDelete} loading={isDeleting}>삭제 확인</Button>
                </div>
              ) : (
                <Button variant="danger" onClick={() => setIsConfirming(true)}>삭제</Button>
              )}
            </footer>
          )}
        </article>
      )}
    </AsyncBoundary>
  );
}
