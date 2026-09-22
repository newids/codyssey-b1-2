import { describe, expect, it } from 'vitest';
import { summarizeAttempts } from '../useQuizAttempts';
import type { QuizAttempt } from '@/lib/types';

const attempt = (lesson: string, score: number, created: string): QuizAttempt => ({
  id: `${lesson}-${created}`, user_id: 'u', lesson_slug: lesson, score, total: 3, created_at: created,
});

describe('summarizeAttempts', () => {
  it('레슨별 최고 점수·시도 횟수·최근 시각을 계산한다', () => {
    const out = summarizeAttempts([
      attempt('a', 1, '2026-09-01T00:00:00Z'),
      attempt('a', 3, '2026-09-02T00:00:00Z'),
      attempt('a', 2, '2026-09-03T00:00:00Z'),
      attempt('b', 2, '2026-09-01T00:00:00Z'),
    ]);
    expect(out.a).toMatchObject({ score: 3, total: 3, attempts: 3, lastAt: '2026-09-03T00:00:00Z' });
    expect(out.b).toMatchObject({ score: 2, attempts: 1 });
  });
  it('빈 배열이면 빈 객체', () => {
    expect(summarizeAttempts([])).toEqual({});
  });
});
