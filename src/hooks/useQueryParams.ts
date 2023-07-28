import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export default function useQueryParams<T extends Record<string, string>>() {
  const { search } = useLocation();

  return useMemo(() => {
    const searchParams = new URLSearchParams(search);
    return Object.fromEntries(searchParams.entries()) as Partial<T>;
  }, [search]);
}
