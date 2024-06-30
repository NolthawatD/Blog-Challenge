import { useQuery } from "react-query";

const fetchData = async (url: string, body: unknown) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};

export function useFetchData(url: string, options = {}, body: unknown, enabled = true) {
	return useQuery(
		[url], 
		() => fetchData(url, body),
		{
			enabled: enabled,
			refetchOnWindowFocus: false,
			retry: 2,
			...options,
			
		}
	);
}
