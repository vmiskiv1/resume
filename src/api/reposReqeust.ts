interface requestProps {
  method?: "GET",
  url: string;
}

export const reposRequest = async ({ method = "GET", url }: requestProps) => {
  try {
    const response = await fetch(`${url}`, {
      method,
      headers: {
        'Authorization': `token ${import.meta.env.VITE_GITHUB_AUTH_TOKEN}`,
      }
    });

    return await response.json();
  } catch (error) {
    throw new Error(`An unexpected error occurred: ${error}`);
  }
};