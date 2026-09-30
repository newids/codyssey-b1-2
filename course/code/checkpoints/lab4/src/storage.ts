// 메모를 브라우저의 localStorage에 저장하고 읽어 오는 함수들 (3일 차 실습 7에서 쓴다)
import { sampleNotes } from './data/sampleNotes';
import type { Note } from './types';

const STORAGE_KEY = 'memo-app:notes';

function isNote(value: unknown): value is Note {
  if (typeof value !== 'object' || value === null) return false;
  const note = value as Record<string, unknown>;
  return (
    typeof note.id === 'number' &&
    typeof note.title === 'string' &&
    typeof note.body === 'string' &&
    typeof note.isImportant === 'boolean'
  );
}

/** 저장된 메모를 읽는다. 저장된 것이 없거나 모양이 다르면 예시 메모를 돌려준다. */
export function loadNotes(): Note[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === null) return sampleNotes;

    const parsed: unknown = JSON.parse(saved);
    if (Array.isArray(parsed) && parsed.every(isNote)) return parsed;

    console.warn('저장된 메모의 모양이 예상과 달라 예시 메모로 시작합니다.');
    return sampleNotes;
  } catch (error) {
    console.warn('저장된 메모를 읽지 못해 예시 메모로 시작합니다.', error);
    return sampleNotes;
  }
}

/** 메모 전체를 저장한다. */
export function saveNotes(notes: Note[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch (error) {
    console.warn('메모를 저장하지 못했습니다.', error);
  }
}
