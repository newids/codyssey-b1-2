import { supabase } from '../supabase';
import type { Note, NoteInput } from '../types';

const NOTE_SELECT = '*, author:profiles(display_name, avatar_url)';

export interface ListNotesParams {
  ownerId?: string;
  lessonSlug?: string;
  search?: string;
}

export async function listNotes(params: ListNotesParams = {}): Promise<Note[]> {
  let query = supabase.from('notes').select(NOTE_SELECT).order('created_at', { ascending: false });
  if (params.ownerId) query = query.eq('user_id', params.ownerId);
  if (params.lessonSlug) query = query.eq('lesson_slug', params.lessonSlug);
  if (params.search?.trim()) query = query.ilike('title', `%${params.search.trim()}%`);
  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as Note[];
}

export async function getNote(id: string): Promise<Note> {
  const { data, error } = await supabase.from('notes').select(NOTE_SELECT).eq('id', id).single();
  if (error) throw error;
  return data as Note;
}

export async function createNote(userId: string, input: NoteInput): Promise<Note> {
  const { data, error } = await supabase
    .from('notes')
    .insert({ ...input, user_id: userId })
    .select(NOTE_SELECT)
    .single();
  if (error) throw error;
  return data as Note;
}

export async function updateNote(id: string, input: NoteInput): Promise<Note> {
  const { data, error } = await supabase
    .from('notes')
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select(NOTE_SELECT)
    .single();
  if (error) throw error;
  return data as Note;
}

export async function deleteNote(id: string): Promise<void> {
  const { error } = await supabase.from('notes').delete().eq('id', id);
  if (error) throw error;
}
