/* eslint-disable @typescript-eslint/no-explicit-any */
const baseUrl = import.meta.env.VITE_GITHUB_API;

interface apiProps {
  endpoint: string;
  options?: any;
}

export const fetchData = async ({ endpoint = "", options = {} }: apiProps) => {
  const url = `${baseUrl}/${endpoint}`;

  try {
    const response = await fetch(url, options);

    if (!response.ok) {

      if (response.status === 404) {
        return { error: `error` };
      }


      return { error: `Error: ${response.status}` };
    }

    return await response.json();
  } catch (error) {
    return { error: `An unexpected error occurred ${error}` };
  }
};