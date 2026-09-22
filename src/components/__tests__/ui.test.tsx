import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { AsyncBoundary } from '@/components/ui/AsyncBoundary';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { EmptyState } from '@/components/ui/EmptyState';

describe('Button', () => {
  it('loading 이면 비활성화되고 aria-busy 가 켜진다', () => {
    render(<Button loading>저장</Button>);
    const btn = screen.getByRole('button', { name: /저장/ });
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute('aria-busy', 'true');
  });
  it('클릭하면 onClick 이 호출된다', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>클릭</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });
});

describe('Input', () => {
  it('error 가 있으면 aria-invalid 와 role=alert 메시지를 연결한다', () => {
    render(<Input label="제목" error="제목을 입력해 주세요." value="" onChange={() => {}} />);
    const input = screen.getByLabelText(/제목/);
    expect(input).toHaveAttribute('aria-invalid', 'true');
    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent('제목을 입력해 주세요.');
    expect(input.getAttribute('aria-describedby')).toBe(alert.id);
  });
  it('error 가 없으면 hint 를 보인다', () => {
    render(<Input label="이메일" hint="회사 이메일" value="" onChange={() => {}} />);
    expect(screen.getByText('회사 이메일')).toBeInTheDocument();
    expect(screen.queryByRole('alert')).toBeNull();
  });
});

describe('AsyncBoundary — 로딩/에러/빈/성공 4분기', () => {
  it('loading 이면 status 역할의 로딩 UI', () => {
    render(<AsyncBoundary status="loading"><p>content</p></AsyncBoundary>);
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.queryByText('content')).toBeNull();
  });
  it('error 이면 alert 과 다시 시도 버튼', async () => {
    const onRetry = vi.fn();
    render(<AsyncBoundary status="error" error={new Error('Failed to fetch')} onRetry={onRetry}><p>content</p></AsyncBoundary>);
    expect(screen.getByRole('alert')).toHaveTextContent(/네트워크/);
    await userEvent.click(screen.getByRole('button', { name: '다시 시도' }));
    expect(onRetry).toHaveBeenCalledOnce();
  });
  it('success + isEmpty 이면 빈 상태', () => {
    render(<AsyncBoundary status="success" isEmpty empty={{ title: '없음' }}><p>content</p></AsyncBoundary>);
    expect(screen.getByText('없음')).toBeInTheDocument();
  });
  it('success 이면 children', () => {
    render(<AsyncBoundary status="success"><p>content</p></AsyncBoundary>);
    expect(screen.getByText('content')).toBeInTheDocument();
  });
});

describe('ProgressBar', () => {
  it('value/max 를 퍼센트로 표시하고 progressbar 역할을 가진다', () => {
    render(<ProgressBar label="진도" value={3} max={8} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '3');
    expect(screen.getByText('38%')).toBeInTheDocument();
  });
});

describe('EmptyState', () => {
  it('action 을 렌더링한다', () => {
    render(<EmptyState title="비어 있음" action={<button>작성</button>} />);
    expect(screen.getByRole('button', { name: '작성' })).toBeInTheDocument();
  });
});
