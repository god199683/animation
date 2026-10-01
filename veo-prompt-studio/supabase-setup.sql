-- Supabase SQL Editor에서 한 번 실행하세요.
-- 이 앱은 익명 로그인으로 보관함 소유자를 구분합니다.
create table if not exists public.veo_prompt_archive (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  food text not null,
  signature text not null,
  prompt text not null,
  summary text,
  created_at timestamptz not null default now()
);
alter table public.veo_prompt_archive enable row level security;
drop policy if exists "Users manage own VEO archive" on public.veo_prompt_archive;
create policy "Users manage own VEO archive" on public.veo_prompt_archive
  for all to authenticated using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
grant select, insert, delete on public.veo_prompt_archive to authenticated;
create index if not exists veo_prompt_archive_owner_created_idx on public.veo_prompt_archive (user_id, created_at desc);

-- Dashboard > Project Settings > Auth > Anonymous sign-ins 를 켜세요.
-- Dashboard > Data API settings에서 이 테이블을 노출하거나, 위 grant를 적용하세요.
