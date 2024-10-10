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
  const requestUrl = url || `${import.meta.env.VITE_GITHUB_API}/${endpoint}`;

  const response = await fetch(requestUrl, {
    method,
    headers: {
      Authorization: `token ${import.meta.env.VITE_GITHUB_AUTH_TOKEN}`,
    },
  });

  return await response.json();
};
