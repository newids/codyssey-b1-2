import { useCallback } from 'react';
import { getNote, listNotes, type ListNotesParams } from '@/lib/api/notes';
import type { Note } from '@/lib/types';
import { useAsync } from './useAsync';

/** 목록 조회 — 필터(ownerId/lessonSlug/search)가 바뀌면 재요청 */
export function useNotes(params: ListNotesParams = {}) {
  const { ownerId, lessonSlug, search } = params;
  const fetcher = useCallback(() => listNotes({ ownerId, lessonSlug, search }), [ownerId, lessonSlug, search]);
  return useAsync<Note[]>(fetcher, []);
}

/** 상세 조회 — 라우트 파라미터 id가 바뀌면 재요청 */
export function useNote(id: string | undefined) {
  const fetcher = useCallback(
    () => (id ? getNote(id) : Promise.reject(new Error('노트 id가 없습니다.'))),
    [id],
  );
  return useAsync<Note | null>(fetcher, null);
}
