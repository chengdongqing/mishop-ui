import { useCallback, useState } from 'react';

export default function useLocalStorageState<T>(cacheKey: string, initialState?: T) {
  const [state, setState] = useState(() => {
    const data = window.localStorage.getItem(cacheKey);
    return data ? JSON.parse(data) : initialState;
  });

  const saveState = useCallback(
    (value: T) => {
      window.localStorage.setItem(cacheKey, JSON.stringify(value));
      setState(value);
    },
    [cacheKey]
  );

  return [state, saveState] as const;
}
