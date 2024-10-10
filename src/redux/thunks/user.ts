/* eslint-disable @typescript-eslint/no-explicit-any */
import { reposRequest } from "@api/reposReqeust";
import { request } from "@api/request";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface RepoData {
  name: string;
  languages_url: string;
  updated_at: string;
  html_url: string;
}

const PAGE = 10;
const SORT_BY = 'desc';

export const getUserData = createAsyncThunk('user/getUserData', async (username: string) => {
  try {
    const userInfoResponse = await request({ endpoint: `users/${username}` });

    if (userInfoResponse && userInfoResponse.message && userInfoResponse.message.includes('Not Found')) {
      throw new Error('User not found');
    }

    const userReposResponse = await request({
      endpoint: `users/${username}/repos?sort=updated&direction=${SORT_BY}&per_page=${PAGE}`,
    });

    if (userReposResponse && userReposResponse.message) {
      throw new Error(userReposResponse.message);
    }

    const { name, login, bio, avatar_url, html_url, repos_url, public_repos, created_at } = userInfoResponse;

    const repos = userReposResponse.map(({ name, languages_url, updated_at, html_url
    }: RepoData) => ({
      name, languages_url, updated_at, html_url
    }));

    return {
      user: {
        name,
        login,
        bio,
        avatar_url,
        html_url,
        repos_url,
        public_repos,
        created_at,
      },
      repos,
    };
  } catch (error: any) {
    throw new Error(error.message || 'User not found');
  }
});

export const getUserLanguagePercentage = createAsyncThunk('user/getUserLanguagePercentage', async (repos: any) => {
  const totalLanguages: { [key: string]: number } = {};

  let totalBytes = 0;

  const LIMIT_LANGUAGES_TO_SHOW = 5;

  for (const repo of repos) {
    try {
      const languages = await reposRequest({ url: repo.languages_url });

      for (const [language, bytes] of Object.entries(languages)) {
        const byteCount = bytes as number;

        if (!totalLanguages[language]) {
          totalLanguages[language] = 0;
        }

        totalLanguages[language] += byteCount;
        totalBytes += byteCount;
      }
    } catch (error) {
      console.error(error);
    }
  }

  const sortedData = Object.entries(totalLanguages)
    .map(([language, bytes], index) => ({
      id: index,
      value: parseFloat(((bytes / totalBytes) * 100).toFixed(2)),
      label: language,
    }))
    .sort((a, b) => b.value - a.value);

  const mainLanguages = sortedData.slice(0, LIMIT_LANGUAGES_TO_SHOW);

  const mainLanguagesSum = mainLanguages.reduce((sum, { value }) => sum + value, 0);

  const othersLanguagesPercentage = (100 - mainLanguagesSum).toFixed(2);

  if (Number(othersLanguagesPercentage) > 0) {
    mainLanguages.push({
      id: 4,
      value: parseFloat(othersLanguagesPercentage),
      label: 'Others',
    });
  }

  return mainLanguages;
});