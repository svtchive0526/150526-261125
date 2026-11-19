-- SHINDO v58: 피드백 1단계 답글 기능. 기존 shindo_beta_feedback 테이블은 변경하지 않습니다.
-- Supabase > SQL Editor에서 한 번 실행하세요.
create table if not exists public.shindo_beta_feedback_replies (
  id uuid primary key default gen_random_uuid(),
  parent_created_at timestamptz not null,
  parent_author text not null,
  author text not null check (author in ('셉카','안처','비행')),
  content text not null check (char_length(btrim(content)) between 1 and 1500),
  created_at timestamptz not null default now()
);
create index if not exists shindo_feedback_replies_parent_idx
 on public.shindo_beta_feedback_replies (parent_created_at, parent_author, created_at);
alter table public.shindo_beta_feedback_replies enable row level security;
drop policy if exists "public read feedback replies" on public.shindo_beta_feedback_replies;
create policy "public read feedback replies" on public.shindo_beta_feedback_replies
 for select to anon, authenticated using (true);
drop policy if exists "public add feedback replies" on public.shindo_beta_feedback_replies;
create policy "public add feedback replies" on public.shindo_beta_feedback_replies
 for insert to anon, authenticated with check (
   exists (select 1 from public.shindo_beta_feedback p
           where p.created_at = parent_created_at and p.author = parent_author)
 );
grant select, insert on public.shindo_beta_feedback_replies to anon, authenticated;
