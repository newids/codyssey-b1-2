import { useCallback, useMemo } from 'react';
import { listQuizAttempts, saveQuizAttempt } from '@/lib/api/progress';
import type { QuizAttempt } from '@/lib/types';
import { useAsync } from './useAsync';

export interface BestScore {
  lesson_slug: string;
  score: number;
  total: number;
  attempts: number;
  lastAt: string;
}

export function useQuizAttempts(userId: string | undefined) {
  const fetcher = useCallback(
    () => (userId ? listQuizAttempts(userId) : Promise.resolve([] as QuizAttempt[])),
    [userId],
  );
  const state = useAsync<QuizAttempt[]>(fetcher, [], Boolean(userId));
  const { refetch } = state;

  /** 레슨별 최고 점수 — useMemo: attempts가 바뀔 때만 재계산 */
  const bestByLesson = useMemo(() => summarizeAttempts(state.data), [state.data]);

  const record = useCallback(
    async (lessonSlug: string, score: number, total: number) => {
      if (!userId) throw new Error('로그인이 필요합니다.');
      await saveQuizAttempt(userId, lessonSlug, score, total);
      refetch();
    },
    [userId, refetch],
  );

  return { ...state, bestByLesson, record };
}

export function summarizeAttempts(attempts: QuizAttempt[]): Record<string, BestScore> {
  return attempts.reduce<Record<string, BestScore>>((acc, a) => {
    const prev = acc[a.lesson_slug];
    const isBetter = !prev || a.score / a.total > prev.score / prev.total;
    return {
      ...acc,
      [a.lesson_slug]: {
        lesson_slug: a.lesson_slug,
        score: isBetter ? a.score : prev.score,
        total: isBetter ? a.total : prev.total,
        attempts: (prev?.attempts ?? 0) + 1,
        lastAt: prev && prev.lastAt > a.created_at ? prev.lastAt : a.created_at,
      },
    };
  }, {});
}
