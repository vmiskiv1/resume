export interface User {
  name: string;
  login: string;
  bio: string;
  html_url: string;
  repos_url: string;
  public_repos: number;
  created_at: string;
}

export interface Repo {
  id: number;
  name: string;
  languages_url: string;
  updated_at: string;
  html_url: string;
}

export interface repoPercentage {
  id: number;
  value: number;
  label: string;
}

export interface InitialState {
  user: User | null;
  repos: Repo[] | null;
  reposByPercentage: repoPercentage[];
  loading: boolean;
  error: string | null;
}
