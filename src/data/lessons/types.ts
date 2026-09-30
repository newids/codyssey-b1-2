/**
 * 학습 콘텐츠는 정적 데이터로 둔다. (사용자가 만드는 핵심 데이터는 Supabase의 notes)
 * 레슨마다 파일 하나 — 본문이 길어져도 한 파일이 800줄을 넘지 않게.
 */
export type LessonBlock =
  | { type: 'p'; text: string }
  | { type: 'h'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'code'; lang: 'tsx' | 'ts' | 'bash'; code: string; caption?: string }
  | { type: 'tip'; text: string };

export interface QuizQuestion {
  id: string;
  question: string;
  choices: string[];
  answerIndex: number;
  explanation: string;
}

export interface Lesson {
  slug: string;
  order: number;
  title: string;
  subtitle: string;
  minutes: number;
  level: '입문' | '기본' | '응용';
  summary: string;
  blocks: LessonBlock[];
  quiz: QuizQuestion[];
  /** 이 사이트 안에서 해당 개념이 실제로 쓰인 파일 */
  usedIn: string[];
}
