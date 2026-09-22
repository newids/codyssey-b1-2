import type { QuizQuestion } from '@/data/lessons';

export type QuizAnswers = Record<string, number | undefined>;

/** 답안 배열을 받아 맞힌 개수를 센다. 순수 함수라 테스트하기 쉽다. */
export function scoreQuiz(questions: QuizQuestion[], answers: QuizAnswers): { score: number; total: number } {
  const score = questions.reduce((acc, q) => (answers[q.id] === q.answerIndex ? acc + 1 : acc), 0);
  return { score, total: questions.length };
}

export function isQuizComplete(questions: QuizQuestion[], answers: QuizAnswers): boolean {
  return questions.every((q) => typeof answers[q.id] === 'number');
}
