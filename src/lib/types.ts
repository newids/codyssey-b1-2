/** 비동기 요청의 4가지 상태 — 모든 화면이 같은 이름을 쓴다. */
export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';

export interface Profile {
  id: string;
  email: string | null;
  display_name: string | null;
  avatar_url: string | null;
}

/** 핵심 데이터: 학습 노트 */
export interface Note {
  id: string;
  user_id: string;
  lesson_slug: string | null;
  title: string;
  content: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
  author?: Pick<Profile, 'display_name' | 'avatar_url'> | null;
}

export type NoteInput = Pick<Note, 'title' | 'content' | 'lesson_slug' | 'is_public'>;

export interface LessonProgress {
  user_id: string;
  lesson_slug: string;
  completed_at: string;
}

export interface QuizAttempt {
  id: string;
  user_id: string;
  lesson_slug: string;
  score: number;
  total: number;
  created_at: string;
}

export type NoteFilter = 'all' | 'mine';
