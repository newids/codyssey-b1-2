import { act, renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useAsync } from '../useAsync';

describe('useAsync', () => {
  it('loading → success 로 전이하고 data를 채운다', async () => {
    const fetcher = vi.fn().mockResolvedValue(['a', 'b']);
    const { result } = renderHook(() => useAsync(fetcher, [] as string[]));
    expect(result.current.status).toBe('loading');
    await waitFor(() => expect(result.current.status).toBe('success'));
    expect(result.current.data).toEqual(['a', 'b']);
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it('실패하면 error 상태와 에러 객체를 돌려준다', async () => {
    const boom = new Error('boom');
    const fetcher = () => Promise.reject(boom);   // 참조를 고정 — 렌더마다 새 함수면 effect가 매번 재실행된다
    const { result } = renderHook(() => useAsync(fetcher, null));
    await waitFor(() => expect(result.current.status).toBe('error'));
    expect(result.current.error).toBe(boom);
  });

  it('refetch() 하면 다시 요청한다', async () => {
    const fetcher = vi.fn().mockResolvedValue(1);
    const { result } = renderHook(() => useAsync(fetcher, 0));
    await waitFor(() => expect(result.current.status).toBe('success'));
    act(() => result.current.refetch());
    await waitFor(() => expect(fetcher).toHaveBeenCalledTimes(2));
  });

  it('enabled=false 면 요청하지 않고 idle 이다', () => {
    const fetcher = vi.fn().mockResolvedValue(1);
    const { result } = renderHook(() => useAsync(fetcher, 0, false));
    expect(result.current.status).toBe('idle');
    expect(fetcher).not.toHaveBeenCalled();
  });

  it('fetcher 참조가 바뀌면 재요청한다 (의존성 배열)', async () => {
    const a = vi.fn().mockResolvedValue('A');
    const b = vi.fn().mockResolvedValue('B');
    const { result, rerender } = renderHook(({ f }: { f: () => Promise<string> }) => useAsync(f, ''), { initialProps: { f: a } });
    await waitFor(() => expect(result.current.data).toBe('A'));
    rerender({ f: b });
    await waitFor(() => expect(result.current.data).toBe('B'));
  });

  it('언마운트 뒤 도착한 응답은 무시한다 (cleanup)', async () => {
    let resolve: (v: string) => void = () => {};
    const fetcher = () => new Promise<string>((r) => { resolve = r; });
    const { result, unmount } = renderHook(() => useAsync(fetcher, 'init'));
    unmount();
    resolve('late');
    await Promise.resolve();
    expect(result.current.data).toBe('init');
  });
});
