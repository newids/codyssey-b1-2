import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Quiz } from '@/components/lessons/Quiz';
import type { QuizQuestion } from '@/data/lessons';

const questions: QuizQuestion[] = [
  { id: 'q1', question: '첫 질문', choices: ['정답', '오답'], answerIndex: 0, explanation: '해설1' },
  { id: 'q2', question: '둘째 질문', choices: ['오답', '정답'], answerIndex: 1, explanation: '해설2' },
];

describe('Quiz — 이벤트 → 상태 → 렌더링', () => {
  it('모든 문항에 답하기 전에는 채점 버튼이 비활성화다', async () => {
    render(<Quiz questions={questions} isLoggedIn={false} />);
    const grade = screen.getByRole('button', { name: '채점하기' });
    expect(grade).toBeDisabled();
    await userEvent.click(screen.getByLabelText(/A정답/));
    expect(grade).toBeDisabled();
    await userEvent.click(screen.getAllByLabelText(/B정답/)[0]);
    expect(grade).toBeEnabled();
  });

  it('채점하면 점수와 해설이 보이고 onSubmit 이 점수로 호출된다', async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    render(<Quiz questions={questions} isLoggedIn onSubmit={onSubmit} />);
    await userEvent.click(screen.getByLabelText(/A정답/));
    await userEvent.click(screen.getByLabelText(/A오답/));   // q2 오답 선택
    await userEvent.click(screen.getByRole('button', { name: '채점하기' }));
    expect(screen.getByRole('status')).toHaveTextContent('1 / 2');
    expect(screen.getByText(/해설1/)).toBeInTheDocument();
    await waitFor(() => expect(onSubmit).toHaveBeenCalledWith(1, 2));
    expect(screen.getByText(/점수가 저장되었습니다/)).toBeInTheDocument();
  });

  it('저장 실패 시 에러를 alert 로 보인다', async () => {
    const onSubmit = vi.fn().mockRejectedValue(new Error('저장 실패'));
    render(<Quiz questions={questions} isLoggedIn onSubmit={onSubmit} />);
    await userEvent.click(screen.getByLabelText(/A정답/));
    await userEvent.click(screen.getAllByLabelText(/B정답/)[0]);
    await userEvent.click(screen.getByRole('button', { name: '채점하기' }));
    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('저장 실패'));
  });

  it('다시 풀기를 누르면 답이 초기화된다', async () => {
    render(<Quiz questions={questions} isLoggedIn={false} />);
    await userEvent.click(screen.getByLabelText(/A정답/));
    await userEvent.click(screen.getAllByLabelText(/B정답/)[0]);
    await userEvent.click(screen.getByRole('button', { name: '채점하기' }));
    await userEvent.click(screen.getByRole('button', { name: '다시 풀기' }));
    expect(screen.getByText('0 / 2 답함')).toBeInTheDocument();
  });
});
