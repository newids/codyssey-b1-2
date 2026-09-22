import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useNoteForm, EMPTY_NOTE } from '../useNoteForm';

describe('useNoteForm', () => {
  it('초기에는 에러가 있어도 touched 전이라 보이지 않는다', () => {
    const { result } = renderHook(() => useNoteForm());
    expect(result.current.isValid).toBe(false);
    expect(result.current.visibleErrors).toEqual({});
  });

  it('touch 하면 해당 필드 에러만 보인다', () => {
    const { result } = renderHook(() => useNoteForm());
    act(() => result.current.touch('title'));
    expect(result.current.visibleErrors.title).toBeDefined();
    expect(result.current.visibleErrors.content).toBeUndefined();
  });

  it('setField 로 값을 바꾸면 검증 결과가 갱신된다 (불변 업데이트)', () => {
    const { result } = renderHook(() => useNoteForm());
    const before = result.current.values;
    act(() => {
      result.current.setField('title', '좋은 제목');
      result.current.setField('content', '충분히 긴 내용입니다. 열 글자 이상.');
    });
    expect(result.current.values).not.toBe(before);
    expect(result.current.isValid).toBe(true);
  });

  it('유효하지 않으면 submit 시 onSubmit을 호출하지 않고 모든 필드를 touched 처리한다', async () => {
    const onSubmit = vi.fn();
    const { result } = renderHook(() => useNoteForm());
    await act(() => result.current.submit(onSubmit));
    expect(onSubmit).not.toHaveBeenCalled();
    expect(result.current.visibleErrors.title).toBeDefined();
    expect(result.current.visibleErrors.content).toBeDefined();
  });

  it('유효하면 trim 된 값으로 onSubmit 하고 success 상태가 된다', async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    const { result } = renderHook(() => useNoteForm({ ...EMPTY_NOTE, title: '  제목  ', content: '  내용은 열 글자 이상입니다  ' }));
    await act(() => result.current.submit(onSubmit));
    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ title: '제목', content: '내용은 열 글자 이상입니다' }));
    expect(result.current.submitStatus).toBe('success');
  });

  it('onSubmit 이 실패하면 error 상태와 메시지를 노출한다', async () => {
    const onSubmit = vi.fn().mockRejectedValue(new Error('서버 오류'));
    const { result } = renderHook(() => useNoteForm({ ...EMPTY_NOTE, title: '제목', content: '내용은 열 글자 이상입니다' }));
    await act(() => result.current.submit(onSubmit));
    expect(result.current.submitStatus).toBe('error');
    expect(result.current.submitError).toMatch(/서버 오류/);
  });
});
