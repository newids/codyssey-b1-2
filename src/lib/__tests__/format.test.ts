import { describe, expect, it } from 'vitest';
import { excerpt, formatDate, percent } from '../format';

describe('excerpt', () => {
  it('짧은 텍스트는 그대로, 공백은 정리한다', () => {
    expect(excerpt('  안녕\n\n세상 ')).toBe('안녕 세상');
  });
  it('길면 잘라서 말줄임표를 붙인다', () => {
    const out = excerpt('a'.repeat(200), 50);
    expect(out).toHaveLength(51);
    expect(out.endsWith('…')).toBe(true);
  });
});

describe('percent', () => {
  it('비율을 반올림한 정수 퍼센트로 돌려준다', () => {
    expect(percent(3, 8)).toBe(38);
    expect(percent(8, 8)).toBe(100);
  });
  it('total이 0 이하면 0', () => {
    expect(percent(1, 0)).toBe(0);
  });
});

describe('formatDate', () => {
  it('잘못된 날짜는 빈 문자열', () => {
    expect(formatDate('not-a-date')).toBe('');
  });
  it('유효한 ISO 날짜는 한국어 형식 문자열', () => {
    expect(formatDate('2026-09-21T10:00:00Z')).toMatch(/2026/);
  });
});
