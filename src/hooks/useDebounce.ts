import useLatest from '@/hooks/useLatest.ts';
import { useCallback, useRef } from 'react';

export default function useDebounce(
  fn: (...args: unknown[]) => void,
  interval = 200
) {
  const fnRef = useLatest(fn);
  const timer = useRef<NodeJS.Timer>();

  return useCallback(
    (...args: unknown[]) => {
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        fnRef.current(...args);
      }, interval);
    },
    [fnRef, interval]
  );
}
