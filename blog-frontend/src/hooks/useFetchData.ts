import { useQuery } from 'react-query';
import { fetchData } from './fetch';

export function useFetchData(query: string, options = {}) {
  return useQuery(
    [query],
    () => fetchData(query),
    {
      refetchOnWindowFocus: false,
      retry: 2,
      ...options,
    }
  );
}