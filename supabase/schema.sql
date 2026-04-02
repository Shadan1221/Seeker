-- Users profile table (extends Supabase auth.users)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  username text unique not null,
  age integer check (age >= 10 and age <= 60),
  role text check (role in ('student', 'teacher', 'career_counsellor')) not null,
  institution_type text check (institution_type in ('school', 'university')) not null,
  institution_name text,
  school_class text,      -- only for school students: "Class 5" through "Class 12"
  degree text,            -- only for university students: full degree name
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Quiz attempts table
create table public.quiz_attempts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  answers jsonb not null,
  custom_answers jsonb,
  scores jsonb not null,
  taken_at timestamptz default now()
);

ALTER TABLE public.quiz_attempts 
ADD COLUMN IF NOT EXISTS skipped_questions jsonb DEFAULT '[]'::jsonb;

-- Bookmarks table
create table public.bookmarks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  career_id text not null,
  created_at timestamptz default now(),
  unique(user_id, career_id)
);

-- Row level security
alter table public.profiles enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.bookmarks enable row level security;

-- Profiles Policies
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Quiz Attempts Policies
create policy "Users can view own quiz attempts"
  on public.quiz_attempts for select
  using (auth.uid() = user_id);

create policy "Users can insert own quiz attempts"
  on public.quiz_attempts for insert
  with check (auth.uid() = user_id);

-- Bookmarks Policies
create policy "Users can view own bookmarks"
  on public.bookmarks for select
  using (auth.uid() = user_id);

create policy "Users can insert own bookmarks"
  on public.bookmarks for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own bookmarks"
  on public.bookmarks for delete
  using (auth.uid() = user_id);

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function update_updated_at();

-- Feedback table
create table if not exists public.feedback_entries (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  username_snapshot text,
  email_snapshot text,
  rating integer not null check (rating >= 1 and rating <= 5),
  category text not null,
  message text not null,
  improvement text,
  recommend boolean default true,
  created_at timestamptz default now()
);

alter table public.feedback_entries enable row level security;

drop policy if exists "Users can view own feedback" on public.feedback_entries;
create policy "Users can view own feedback"
  on public.feedback_entries for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own feedback" on public.feedback_entries;
create policy "Users can insert own feedback"
  on public.feedback_entries for insert
  with check (auth.uid() = user_id);
