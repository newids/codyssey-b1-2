import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { createNote } from '@/lib/api/notes';
import type { NoteInput } from '@/lib/types';
import { EMPTY_NOTE } from '@/hooks/useNoteForm';
import { PageHeader } from '@/components/layout/PageHeader';
import { NoteForm } from '@/components/notes/NoteForm';

/** 등록: 폼 → 제출 → 성공 시 상세로 이동 + Toast */
export function NoteNewPage() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const presetLesson = (location.state as { lessonSlug?: string } | null)?.lessonSlug ?? null;

  const handleSubmit = async (values: NoteInput) => {
    if (!user) throw new Error('로그인이 필요합니다.');
    const created = await createNote(user.id, values);
    showToast('노트를 저장했습니다.', 'success');
    navigate(`/notes/${created.id}`, { replace: true });
  };

  return (
    <>
      <PageHeader eyebrow="New note" title="새 학습 노트" description="필수 항목(제목·내용)이 비어 있으면 저장할 수 없습니다." />
      <NoteForm
        initialValues={{ ...EMPTY_NOTE, lesson_slug: presetLesson }}
        submitLabel="저장"
        onSubmit={handleSubmit}
        onCancel={() => navigate(-1)}
      />
    </>
  );
}
