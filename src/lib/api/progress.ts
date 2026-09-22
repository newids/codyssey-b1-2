import { supabase } from '../supabase';
import type { LessonProgress, QuizAttempt } from '../types';

export async function listProgress(userId: string): Promise<LessonProgress[]> {
  const { data, error } = await supabase.from('lesson_progress').select('*').eq('user_id', userId);
  if (error) throw error;
  return (data ?? []) as LessonProgress[];
}

export async function markLessonComplete(userId: string, lessonSlug: string): Promise<LessonProgress> {
  const { data, error } = await supabase
    .from('lesson_progress')
    .upsert({ user_id: userId, lesson_slug: lessonSlug }, { onConflict: 'user_id,lesson_slug' })
    .select()
    .single();
  if (error) throw error;
  return data as LessonProgress;
}

export async function unmarkLesson(userId: string, lessonSlug: string): Promise<void> {
  const { error } = await supabase
    .from('lesson_progress')
    .delete()
    .eq('user_id', userId)
    .eq('lesson_slug', lessonSlug);
  if (error) throw error;
}

export async function listQuizAttempts(userId: string): Promise<QuizAttempt[]> {
  const { data, error } = await supabase
    .from('quiz_attempts')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as QuizAttempt[];
}

export async function saveQuizAttempt(
  userId: string,
  lessonSlug: string,
  score: number,
  total: number,
): Promise<QuizAttempt> {
  const { data, error } = await supabase
    .from('quiz_attempts')
    .insert({ user_id: userId, lesson_slug: lessonSlug, score, total })
    .select()
    .single();
  if (error) throw error;
  return data as QuizAttempt;
}
