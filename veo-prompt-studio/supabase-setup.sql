-- Supabase SQL Editor에서 한 번 실행하세요.
-- 이 앱은 ID + 비밀번호 로그인으로 보관함 소유자를 구분합니다.
create table if not exists public.veo_prompt_archive (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  food text not null,
  signature text not null,
  prompt text not null,
  omni_prompt text,
  flow_prompt text,
  summary text,
  storyboard text,
  created_at timestamptz not null default now()
);
alter table public.veo_prompt_archive add column if not exists storyboard text;
alter table public.veo_prompt_archive add column if not exists omni_prompt text;
alter table public.veo_prompt_archive add column if not exists flow_prompt text;
alter table public.veo_prompt_archive enable row level security;
drop policy if exists "Users manage own VEO archive" on public.veo_prompt_archive;
create policy "Users manage own VEO archive" on public.veo_prompt_archive
  for all to authenticated using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
grant select, insert, update, delete on public.veo_prompt_archive to authenticated;
create index if not exists veo_prompt_archive_owner_created_idx on public.veo_prompt_archive (user_id, created_at desc);

-- 아기 백호 음식 영상 전용 보관함. 일반 영상 보관함과 물리적으로 분리됩니다.
create table if not exists public.tiger_food_archive (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  food text not null,
  signature text not null,
  prompt text not null,
  flow_prompt text,
  summary text,
  storyboard text,
  created_at timestamptz not null default now(),
  unique (user_id, signature)
);
alter table public.tiger_food_archive enable row level security;
revoke all on table public.tiger_food_archive from anon, authenticated;
grant select, insert, update, delete on table public.tiger_food_archive to authenticated;
drop policy if exists "Users manage own tiger food archive" on public.tiger_food_archive;
create policy "Users manage own tiger food archive" on public.tiger_food_archive
  for all to authenticated using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
create index if not exists tiger_food_archive_owner_created_idx on public.tiger_food_archive (user_id, created_at desc);

-- 노베 여우 요리 영상 전용 보관함. 기존 여우 변신·아기 백호 보관함과 분리됩니다.
create table if not exists public.fox_chef_archive (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  food text not null,
  signature text not null,
  prompt text not null,
  flow_prompt text,
  summary text,
  storyboard text,
  clips jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  unique (user_id, signature)
);
alter table public.fox_chef_archive enable row level security;
revoke all on table public.fox_chef_archive from anon, authenticated;
grant select, insert, update, delete on table public.fox_chef_archive to authenticated;
drop policy if exists "Users manage own fox chef archive" on public.fox_chef_archive;
create policy "Users manage own fox chef archive" on public.fox_chef_archive
  for all to authenticated using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
create index if not exists fox_chef_archive_owner_created_idx on public.fox_chef_archive (user_id, created_at desc);

-- Dashboard > Authentication > Providers > Email에서 Email provider를 켜고
-- Confirm email은 끄세요. 앱은 사용자가 입력한 ID를 내부 전용 식별자로 변환하므로 이메일 입력·발송은 하지 않습니다.
-- 기존 Anonymous sign-ins는 꺼 두세요.
-- Dashboard > Data API settings에서 이 테이블을 노출하거나, 위 grant를 적용하세요.
