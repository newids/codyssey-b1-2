import { describe, expect, it } from 'vitest';
import { isQuizComplete, scoreQuiz } from '../quiz';
import type { QuizQuestion } from '@/data/lessons';

const questions: QuizQuestion[] = [
  { id: 'q1', question: '?', choices: ['a', 'b'], answerIndex: 0, explanation: '' },
  { id: 'q2', question: '?', choices: ['a', 'b'], answerIndex: 1, explanation: '' },
  { id: 'q3', question: '?', choices: ['a', 'b'], answerIndex: 1, explanation: '' },
];

describe('scoreQuiz', () => {
  it('맞힌 개수와 전체 개수를 돌려준다', () => {
    expect(scoreQuiz(questions, { q1: 0, q2: 1, q3: 0 })).toEqual({ score: 2, total: 3 });
  });
  it('답하지 않은 문항은 오답으로 친다', () => {
    expect(scoreQuiz(questions, {})).toEqual({ score: 0, total: 3 });
  });
});

describe('isQuizComplete', () => {
  it('모든 문항에 답했을 때만 true', () => {
    expect(isQuizComplete(questions, { q1: 0, q2: 1 })).toBe(false);
    expect(isQuizComplete(questions, { q1: 0, q2: 1, q3: 0 })).toBe(true);
  });
});
