import type { NoteInput } from './types';

export const NOTE_TITLE_MIN = 2;
export const NOTE_TITLE_MAX = 80;
export const NOTE_CONTENT_MIN = 10;
export const NOTE_CONTENT_MAX = 5000;

export type NoteErrors = Partial<Record<keyof NoteInput, string>>;

/** 순수 함수 — 입력값을 받아 필드별 에러 메시지를 돌려준다. UI를 모른다. */
export function validateNote(input: NoteInput): NoteErrors {
  const errors: NoteErrors = {};
  const title = input.title.trim();
  const content = input.content.trim();

  if (!title) errors.title = '제목을 입력해 주세요.';
  else if (title.length < NOTE_TITLE_MIN) errors.title = `제목은 ${NOTE_TITLE_MIN}자 이상이어야 합니다.`;
  else if (title.length > NOTE_TITLE_MAX) errors.title = `제목은 ${NOTE_TITLE_MAX}자 이하여야 합니다.`;

  if (!content) errors.content = '내용을 입력해 주세요.';
  else if (content.length < NOTE_CONTENT_MIN) errors.content = `내용은 ${NOTE_CONTENT_MIN}자 이상 적어 주세요.`;
  else if (content.length > NOTE_CONTENT_MAX) errors.content = `내용은 ${NOTE_CONTENT_MAX}자를 넘을 수 없습니다.`;

  return errors;
}

export function hasErrors(errors: NoteErrors): boolean {
  return Object.keys(errors).length > 0;
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}
