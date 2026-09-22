import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { NoteForm } from '@/components/notes/NoteForm';

describe('NoteForm — 폼 UX', () => {
  it('빈 폼을 제출하면 onSubmit 을 호출하지 않고 필드 에러를 보인다', async () => {
    const onSubmit = vi.fn();
    render(<NoteForm submitLabel="저장" onSubmit={onSubmit} onCancel={() => {}} />);
    await userEvent.click(screen.getByRole('button', { name: '저장' }));
    expect(onSubmit).not.toHaveBeenCalled();
    const alerts = screen.getAllByRole('alert');
    expect(alerts.map((a) => a.textContent)).toEqual(expect.arrayContaining([expect.stringMatching(/제목/), expect.stringMatching(/내용/)]));
  });

  it('입력값이 미리보기에 실시간으로 반영된다 (입력 → 상태 → 렌더링)', async () => {
    render(<NoteForm submitLabel="저장" onSubmit={vi.fn()} onCancel={() => {}} />);
    await userEvent.type(screen.getByLabelText(/^제목/), '미리보기 테스트');
    const preview = screen.getByRole('complementary', { name: '미리보기' });
    expect(preview).toHaveTextContent('미리보기 테스트');
  });

  it('제출 중에는 버튼이 비활성화되고 "저장 중" 을 보인다', async () => {
    let resolve: () => void = () => {};
    const onSubmit = vi.fn(() => new Promise<void>((r) => { resolve = r; }));
    render(<NoteForm submitLabel="저장" onSubmit={onSubmit} onCancel={() => {}} />);
    await userEvent.type(screen.getByLabelText(/^제목/), '유효한 제목');
    await userEvent.type(screen.getByLabelText(/^내용/), '충분히 긴 내용입니다. 열 글자 이상.');
    await userEvent.click(screen.getByRole('button', { name: '저장' }));
    const busy = await screen.findByRole('button', { name: /저장 중/ });
    expect(busy).toBeDisabled();
    resolve();
    await waitFor(() => expect(onSubmit).toHaveBeenCalledOnce());
  });

  it('요청이 실패하면 상단에 실패 메시지를 보인다', async () => {
    const onSubmit = vi.fn().mockRejectedValue(new Error('Failed to fetch'));
    render(<NoteForm submitLabel="저장" onSubmit={onSubmit} onCancel={() => {}} />);
    await userEvent.type(screen.getByLabelText(/^제목/), '유효한 제목');
    await userEvent.type(screen.getByLabelText(/^내용/), '충분히 긴 내용입니다. 열 글자 이상.');
    await userEvent.click(screen.getByRole('button', { name: '저장' }));
    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent(/네트워크/));
  });
});
