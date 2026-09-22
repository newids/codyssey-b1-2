import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/** 환경변수 누락은 배포 사고의 1순위라 앱 시작 시점에 바로 실패시킨다. */
export function assertSupabaseEnv(): { url: string; anonKey: string } {
  if (!url || !anonKey) {
    throw new Error(
      'VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY 환경변수가 없습니다. .env.example을 참고해 .env를 만들어 주세요.',
    );
  }
  return { url, anonKey };
}

const env = assertSupabaseEnv();

export const supabase = createClient(env.url, env.anonKey, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
});
