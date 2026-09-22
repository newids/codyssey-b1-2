import { useCallback, useMemo, useState } from 'react';
import { listProgress, markLessonComplete, unmarkLesson } from '@/lib/api/progress';
import type { LessonProgress } from '@/lib/types';
import { LESSONS } from '@/data/lessons';
import { percent } from '@/lib/format';
import { useAsync } from './useAsync';

/** 진도 조회 + 완료 토글. 낙관적 업데이트 → 실패 시 롤백. */
export function useLessonProgress(userId: string | undefined) {
  const fetcher = useCallback(
    () => (userId ? listProgress(userId) : Promise.resolve([] as LessonProgress[])),
    [userId],
  );
  const state = useAsync<LessonProgress[]>(fetcher, [], Boolean(userId));
  const { refetch } = state;
  const [optimistic, setOptimistic] = useState<Record<string, boolean>>({});
  const [pendingSlug, setPendingSlug] = useState<string | null>(null);

  const completedSlugs = useMemo(() => {
    const set = new Set(state.data.map((p) => p.lesson_slug));
    Object.entries(optimistic).forEach(([slug, done]) => (done ? set.add(slug) : set.delete(slug)));
    return set;
  }, [state.data, optimistic]);

  const toggle = useCallback(
    async (slug: string) => {
      if (!userId) throw new Error('로그인이 필요합니다.');
      const wasDone = completedSlugs.has(slug);
      setOptimistic((prev) => ({ ...prev, [slug]: !wasDone }));
      setPendingSlug(slug);
      try {
        if (wasDone) await unmarkLesson(userId, slug);
        else await markLessonComplete(userId, slug);
        refetch();
      } catch (err) {
        setOptimistic((prev) => ({ ...prev, [slug]: wasDone }));
        throw err;
      } finally {
        setPendingSlug(null);
      }
    },
    [userId, completedSlugs, refetch],
  );

  return {
    ...state,
    completedSlugs,
    completedCount: completedSlugs.size,
    totalCount: LESSONS.length,
    percent: percent(completedSlugs.size, LESSONS.length),
    pendingSlug,
    toggle,
  };
}
