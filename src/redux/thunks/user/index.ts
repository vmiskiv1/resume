/* eslint-disable @typescript-eslint/no-explicit-any */
import { request } from "@api/request";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { calculateLanguagePercentages } from "@utils/calcLanguagePercentages";
import { LIMIT_LANGUAGES_TO_SHOW, PAGE, SORT_BY } from "./constants";
import { RepoData } from "./types";

export const getUserData = createAsyncThunk(
  "user/getUserData",
  async (username: string) => {
    try {
      const userInfoResponse = await request({ endpoint: `users/${username}` });

      if (
        userInfoResponse &&
        userInfoResponse.message &&
        userInfoResponse.message.includes("Not Found")
      ) {
        throw new Error("User not found");
      }

      const userReposResponse = await request({
        endpoint: `users/${username}/repos?sort=updated&direction=${SORT_BY}&per_page=${PAGE}`,
      });

      if (userReposResponse && userReposResponse.message) {
        throw new Error(userReposResponse.message);
      }

      const {
        name,
        login,
        bio,
        html_url,
        repos_url,
        public_repos,
        created_at,
      } = userInfoResponse;

      const repos = userReposResponse.map(
        ({ id, name, languages_url, updated_at, html_url }: RepoData) => ({
          id,
          name,
          languages_url,
          updated_at,
          html_url,
        })
      );

      return {
        user: {
          name,
          login,
          bio,
          html_url,
          repos_url,
          public_repos,
          created_at,
        },
        repos,
      };
    } catch (error: any) {
      console.log(error);
      throw new Error(error.message || "User not found");
    }
  }
);

export const getUserLanguagePercentage = createAsyncThunk(
  "user/getUserLanguagePercentage",
  async (repos: RepoData[]) => {
    let totalBytes = 0;

    const totalLanguages: { [key: string]: number } = {};

    for (const repo of repos) {
      try {
        const languages = await request({ url: repo.languages_url });

        for (const [language, bytes] of Object.entries(languages)) {
          const byteCount = bytes as number;

          totalLanguages[language] =
            (totalLanguages[language] || 0) + byteCount;
          totalBytes += byteCount;
        }
      } catch (error) {
        console.error(error);
      }
    }

    return calculateLanguagePercentages(
      totalLanguages,
      totalBytes,
      LIMIT_LANGUAGES_TO_SHOW
    );
  }
);
