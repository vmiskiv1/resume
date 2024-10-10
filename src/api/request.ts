interface RequestProps {
  method?: "GET";
  endpoint?: string;
  url?: string;
}

export const request = async ({
  method = "GET",
  endpoint = "",
  url = "",
}: RequestProps) => {
  try {
    const requestUrl = url || `${import.meta.env.VITE_GITHUB_API}/${endpoint}`;

    const response = await fetch(requestUrl, {
      method,
      headers: {
        Authorization: `token ${import.meta.env.VITE_GITHUB_AUTH_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    throw new Error(`An unexpected error occurred: ${error}`);
  }
};
