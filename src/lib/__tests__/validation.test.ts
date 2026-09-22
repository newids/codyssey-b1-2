import { describe, expect, it } from 'vitest';
import { hasErrors, isValidEmail, validateNote, NOTE_CONTENT_MIN, NOTE_TITLE_MAX } from '../validation';

const valid = { title: 'useEffect 정리', content: '의존성 배열이 바뀔 때마다 다시 실행된다.', lesson_slug: null, is_public: true };

describe('validateNote', () => {
  it('유효한 입력에는 에러가 없다', () => {
    expect(validateNote(valid)).toEqual({});
    expect(hasErrors(validateNote(valid))).toBe(false);
  });

  it('제목이 비어 있으면 제목 에러를 돌려준다', () => {
    const errors = validateNote({ ...valid, title: '   ' });
    expect(errors.title).toMatch(/제목/);
    expect(errors.content).toBeUndefined();
  });

  it('내용이 최소 길이보다 짧으면 내용 에러를 돌려준다', () => {
    const errors = validateNote({ ...valid, content: 'a'.repeat(NOTE_CONTENT_MIN - 1) });
    expect(errors.content).toMatch(new RegExp(`${NOTE_CONTENT_MIN}자`));
  });

  it('제목이 최대 길이를 넘으면 에러다', () => {
    expect(validateNote({ ...valid, title: 'a'.repeat(NOTE_TITLE_MAX + 1) }).title).toMatch(/이하/);
  });

  it('제목과 내용이 모두 비면 두 에러를 모두 돌려준다', () => {
    const errors = validateNote({ ...valid, title: '', content: '' });
    expect(Object.keys(errors).sort()).toEqual(['content', 'title']);
  });
});

describe('isValidEmail', () => {
  it.each(['a@b.co', ' user@example.com '])('%s 는 유효하다', (v) => expect(isValidEmail(v)).toBe(true));
  it.each(['', 'a@b', 'a b@c.com', '@c.com'])('"%s" 는 유효하지 않다', (v) => expect(isValidEmail(v)).toBe(false));
});
