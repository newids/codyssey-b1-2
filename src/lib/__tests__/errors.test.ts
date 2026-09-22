import { describe, expect, it } from 'vitest';
import { toUserMessage } from '../errors';

describe('toUserMessage', () => {
  it('네트워크 에러를 한국어 안내로 바꾼다', () => {
    expect(toUserMessage(new TypeError('Failed to fetch'))).toMatch(/네트워크/);
  });
  it('RLS/권한 에러를 권한 안내로 바꾼다', () => {
    expect(toUserMessage({ message: 'new row violates row-level security policy' })).toMatch(/권한/);
  });
  it('0 rows 에러를 "찾을 수 없음"으로', () => {
    expect(toUserMessage({ code: 'PGRST116', message: 'JSON object requested, multiple (or no) rows returned' })).toMatch(/찾을 수 없습니다|요청에 실패/);
  });
  it('알 수 없는 에러는 원문을 포함한 실패 메시지', () => {
    expect(toUserMessage('boom')).toBe('요청에 실패했습니다. (boom)');
    expect(toUserMessage(null)).toMatch(/알 수 없는/);
  });
});
