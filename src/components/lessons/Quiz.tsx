import { useMemo, useState } from 'react';
import type { QuizQuestion } from '@/data/lessons';
import { isQuizComplete, scoreQuiz, type QuizAnswers } from '@/lib/quiz';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import styles from './Quiz.module.css';

export interface QuizProps {
  questions: QuizQuestion[];
  /** 채점 결과를 저장할 콜백. 비로그인이면 undefined → 저장 안 함 */
  onSubmit?: (score: number, total: number) => Promise<void>;
  isLoggedIn: boolean;
}

/**
 * 렌더링 지점 3개가 한 컴포넌트에 있다:
 * 보기 선택 → 채점 버튼 활성화 / 채점 → 정답·오답 색상 + 해설 / 저장 → 저장 중 스피너
 */
export function Quiz({ questions, onSubmit, isLoggedIn }: QuizProps) {
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [isGraded, setIsGraded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const isComplete = useMemo(() => isQuizComplete(questions, answers), [questions, answers]);
  const result = useMemo(() => scoreQuiz(questions, answers), [questions, answers]);

  const select = (questionId: string, choiceIndex: number) => {
    if (isGraded) return;
    setAnswers((prev) => ({ ...prev, [questionId]: choiceIndex }));
  };

  const grade = async () => {
    setIsGraded(true);
    if (!onSubmit) return;
    setIsSaving(true);
    setSaveError(null);
    try {
      await onSubmit(result.score, result.total);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : '점수 저장에 실패했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  const reset = () => {
    setAnswers({});
    setIsGraded(false);
    setSaveError(null);
  };

  return (
    <Card as="section" padding="lg" className={styles.quiz} aria-labelledby="quiz-title">
      <div className={styles.head}>
        <h2 id="quiz-title" className={styles.title}>연습 문제</h2>
        <span className={styles.progress} aria-live="polite">
          {Object.keys(answers).length} / {questions.length} 답함
        </span>
      </div>

      <ol className={styles.list}>
        {questions.map((q, qi) => {
          const chosen = answers[q.id];
          return (
            <li key={q.id} className={styles.question}>
              <fieldset className={styles.fieldset} disabled={isGraded}>
                <legend className={styles.legend}>
                  <span className={styles.qNum}>Q{qi + 1}.</span> {q.question}
                </legend>
                <div className={styles.choices}>
                  {q.choices.map((choice, ci) => {
                    const isChosen = chosen === ci;
                    const isCorrect = q.answerIndex === ci;
                    const stateClass = isGraded
                      ? isCorrect ? styles.correct : isChosen ? styles.wrong : ''
                      : isChosen ? styles.chosen : '';
                    return (
                      <label key={ci} className={[styles.choice, stateClass].join(' ')}>
                        <input
                          type="radio"
                          name={q.id}
                          value={ci}
                          checked={isChosen}
                          onChange={() => select(q.id, ci)}
                          className="visually-hidden"
                        />
                        <span className={styles.choiceMark} aria-hidden="true">
                          {isGraded && isCorrect ? <Icon name="check" size={13} /> : isGraded && isChosen ? <Icon name="close" size={13} /> : String.fromCharCode(65 + ci)}
                        </span>
                        <span>{choice}</span>
                      </label>
                    );
                  })}
                </div>
                {isGraded && (
                  <p className={[styles.explanation, chosen === q.answerIndex ? styles.explainOk : styles.explainNo].join(' ')}>
                    {chosen === q.answerIndex ? '정답! ' : '오답. '}
                    {q.explanation}
                  </p>
                )}
              </fieldset>
            </li>
          );
        })}
      </ol>

      <div className={styles.footer}>
        {isGraded ? (
          <>
            <p className={styles.result} role="status">
              <strong>{result.score} / {result.total}</strong> 문제를 맞혔습니다.
              {isSaving && ' 점수 저장 중…'}
              {!isSaving && onSubmit && !saveError && ' 점수가 저장되었습니다.'}
              {!onSubmit && !isLoggedIn && ' 로그인하면 점수가 기록됩니다.'}
            </p>
            {saveError && <p className={styles.saveError} role="alert">{saveError}</p>}
            <Button variant="secondary" onClick={reset} disabled={isSaving}>다시 풀기</Button>
          </>
        ) : (
          <>
            <p className={styles.hint}>{isComplete ? '모두 답했습니다. 채점해 보세요.' : '모든 문항에 답하면 채점 버튼이 활성화됩니다.'}</p>
            <Button onClick={grade} disabled={!isComplete}>채점하기</Button>
          </>
        )}
      </div>
    </Card>
  );
}
