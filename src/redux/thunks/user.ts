import { fetchData } from "@api/fetchData";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUserData = createAsyncThunk('user/getUser', async (username: string) => {
  const userInfo = await fetchData({ endpoint: `users/${username}` });

  const userRepos = await fetchData({ endpoint: `users/${username}/repos` });

  return { userInfo, userRepos };
});