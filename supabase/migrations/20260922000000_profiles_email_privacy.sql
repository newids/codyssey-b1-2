-- 코드 리뷰 반영: profiles.email 이 익명 클라이언트에 노출되지 않도록 컬럼 단위 권한 제한.
-- RLS 정책(누구나 select)은 유지하되, anon/authenticated 역할은 email 컬럼을 읽을 수 없다.
-- 앱은 notes → profiles 조인에서 display_name, avatar_url 만 요청한다 (src/lib/api/notes.ts NOTE_SELECT).
revoke select on table public.profiles from anon, authenticated;
grant select (id, display_name, avatar_url, created_at) on table public.profiles to anon, authenticated;
