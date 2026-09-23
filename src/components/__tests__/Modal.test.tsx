import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Modal } from '@/components/ui/Modal';

describe('Modal', () => {
  it('제목·설명·내용을 dialog 안에 그리고 닫기 버튼이 onClose 를 부른다', async () => {
    const onClose = vi.fn();
    render(
      <Modal title="새 학습 노트" description="설명" onClose={onClose}>
        <p>본문</p>
      </Modal>,
    );
    const dialog = screen.getByRole('dialog', { hidden: true });
    expect(dialog).toHaveAttribute('open');
    expect(dialog).toHaveAttribute('aria-labelledby', 'modal-title');
    expect(screen.getByText('본문')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: '닫기', hidden: true }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('열려 있는 동안 body 스크롤을 잠그고 언마운트 시 되돌린다', () => {
    const { unmount } = render(<Modal title="t" onClose={() => {}}><p>x</p></Modal>);
    expect(document.body.style.overflow).toBe('hidden');
    unmount();
    expect(document.body.style.overflow).toBe('');
  });
});
