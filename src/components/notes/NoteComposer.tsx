import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { createNote } from '@/lib/api/notes';
import type { NoteInput } from '@/lib/types';
import { EMPTY_NOTE } from '@/hooks/useNoteForm';
import { NoteForm } from './NoteForm';

export interface NoteComposerProps {
  onCancel: () => void;
}

/** 등록 흐름: 폼 → createNote → 성공 시 상세로 이동 + Toast. 페이지와 팝업이 공유한다. */
export function NoteComposer({ onCancel }: NoteComposerProps) {
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const presetLesson = (location.state as { lessonSlug?: string } | null)?.lessonSlug ?? null;

  const handleSubmit = useCallback(
    async (values: NoteInput) => {
      if (!user) throw new Error('로그인이 필요합니다.');
      const created = await createNote(user.id, values);
      showToast('노트를 저장했습니다.', 'success');
      navigate(`/notes/${created.id}`, { replace: true });
    },
    [user, showToast, navigate],
  );

  return (
    <NoteForm
      initialValues={{ ...EMPTY_NOTE, lesson_slug: presetLesson }}
      submitLabel="저장"
      onSubmit={handleSubmit}
      onCancel={onCancel}
    />
  );
}
