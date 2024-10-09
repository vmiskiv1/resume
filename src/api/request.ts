interface requestProps {
  method?: "GET",
  endpoint: string;
}

export const request = async ({ method = "GET", endpoint = "" }: requestProps) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_GITHUB_API}/${endpoint}`, {
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