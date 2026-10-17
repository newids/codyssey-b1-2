import { createClient } from '@supabase/supabase-js';

/**
 * 백엔드로 Supabase를 고른 이유 (Firebase 대신):
 * - Postgres + SQL: notes → profiles 조인, 컬럼 단위 권한(grant) 같은 관계형 제어가 필요했다.
 *   Firestore는 조인이 없고 보안 규칙이 문서 단위라 "이메일 컬럼만 숨기기"가 어렵다.
 * - RLS(Row Level Security): 권한 검사를 DB가 강제하므로 anon 키가 브라우저에 보여도 안전하다.
 * - 스키마가 supabase/migrations/*.sql 로 git에 남는다. Firebase는 스키마가 코드 밖(콘솔)에 있다.
 * - 서버 코드 없이 REST(PostgREST)·Auth·DB를 한 프로젝트로 — Vercel 정적 배포 모델과 맞는다.
 *
 * 인증: Supabase Auth. Google은 GIS 버튼으로 받은 ID 토큰을 signInWithIdToken 으로 교환(src/lib/google.ts),
 * 이메일 매직 링크도 지원. 세션은 localStorage 에 저장되고(persistSession) 토큰은 자동 갱신(autoRefreshToken)된다.
 * 자세한 비교와 겪은 문제는 README "Supabase를 고른 이유" 절.
 */

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
