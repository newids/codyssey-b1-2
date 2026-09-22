-- React Playground (Codyssey B1-2) 초기 스키마
-- 핵심 데이터: notes (학습 노트) — CRUD 대상
-- 보조 데이터: profiles, lesson_progress, quiz_attempts

-- 1) profiles: auth.users 와 1:1. 노트 작성자 이름/아바타 표시용
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  display_name text,
  avatar_url text,
  created_at timestamptz not null default now()
);

-- 가입(auth.users insert) 시 프로필 자동 생성 — Google 메타데이터에서 이름/사진을 가져온다
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data ->> 'avatar_url', new.raw_user_meta_data ->> 'picture')
  )
  on conflict (id) do update
    set email = excluded.email,
        display_name = coalesce(excluded.display_name, public.profiles.display_name),
        avatar_url = coalesce(excluded.avatar_url, public.profiles.avatar_url);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2) notes: 핵심 CRUD 데이터
create table if not exists public.notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  lesson_slug text,
  title text not null check (char_length(title) between 2 and 80),
  content text not null check (char_length(content) between 10 and 5000),
  is_public boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists notes_user_id_idx on public.notes (user_id);
create index if not exists notes_lesson_slug_idx on public.notes (lesson_slug);
create index if not exists notes_created_at_idx on public.notes (created_at desc);

-- 3) lesson_progress: 레슨 완료 표시 (사용자·레슨 당 1행)
create table if not exists public.lesson_progress (
  user_id uuid not null references public.profiles (id) on delete cascade,
  lesson_slug text not null,
  completed_at timestamptz not null default now(),
  primary key (user_id, lesson_slug)
);

-- 4) quiz_attempts: 퀴즈 시도 기록 (여러 번 가능, 화면에서 최고점 계산)
create table if not exists public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  lesson_slug text not null,
  score int not null check (score >= 0),
  total int not null check (total > 0 and score <= total),
  created_at timestamptz not null default now()
);
create index if not exists quiz_attempts_user_idx on public.quiz_attempts (user_id, lesson_slug);

-- 5) RLS — 미션 필수는 아니지만 anon key가 브라우저에 노출되므로 최소 정책은 둔다
alter table public.profiles enable row level security;
alter table public.notes enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.quiz_attempts enable row level security;

-- profiles: 누구나 읽기(작성자 표시), 본인만 수정
drop policy if exists "profiles are viewable by everyone" on public.profiles;
create policy "profiles are viewable by everyone" on public.profiles for select using (true);
drop policy if exists "users update own profile" on public.profiles;
create policy "users update own profile" on public.profiles for update using (auth.uid() = id);

-- notes: 공개 노트는 누구나, 비공개는 본인만 읽기 / 쓰기·수정·삭제는 본인만
drop policy if exists "public notes or own notes are viewable" on public.notes;
create policy "public notes or own notes are viewable" on public.notes
  for select using (is_public or auth.uid() = user_id);
drop policy if exists "users insert own notes" on public.notes;
create policy "users insert own notes" on public.notes
  for insert with check (auth.uid() = user_id);
drop policy if exists "users update own notes" on public.notes;
create policy "users update own notes" on public.notes
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "users delete own notes" on public.notes;
create policy "users delete own notes" on public.notes
  for delete using (auth.uid() = user_id);

-- lesson_progress / quiz_attempts: 본인 데이터만
drop policy if exists "users manage own progress" on public.lesson_progress;
create policy "users manage own progress" on public.lesson_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "users manage own quiz attempts" on public.quiz_attempts;
create policy "users manage own quiz attempts" on public.quiz_attempts
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
