import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { useNote } from '@/hooks/useNotes';
import { updateNote } from '@/lib/api/notes';
import type { NoteInput } from '@/lib/types';
import { PageHeader } from '@/components/layout/PageHeader';
import { AsyncBoundary } from '@/components/ui/AsyncBoundary';
import { ErrorState } from '@/components/ui/ErrorState';
import { NoteForm } from '@/components/notes/NoteForm';

/** 수정: 기존 값을 불러와 폼 초기값으로 → 제출 → 상세로 복귀 */
export function NoteEditPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { status, data: note, error, refetch } = useNote(id);

  const handleSubmit = async (values: NoteInput) => {
    if (!id) return;
    await updateNote(id, values);
    showToast('노트를 수정했습니다.', 'success');
    navigate(`/notes/${id}`, { replace: true });
  };

  return (
    <>
      <PageHeader eyebrow="Edit note" title="학습 노트 수정" />
      <AsyncBoundary status={status} error={error} isEmpty={!note} onRetry={refetch} empty={{ title: '노트를 찾을 수 없습니다' }}>
        {note && user && note.user_id !== user.id ? (
          <ErrorState title="권한이 없습니다" message="본인이 작성한 노트만 수정할 수 있습니다." />
        ) : (
          note && (
            <NoteForm
              key={note.id}
              initialValues={{ title: note.title, content: note.content, lesson_slug: note.lesson_slug, is_public: note.is_public }}
              submitLabel="수정 저장"
              onSubmit={handleSubmit}
              onCancel={() => navigate(`/notes/${note.id}`)}
            />
          )
        )}
      </AsyncBoundary>
    </>
  );
}
