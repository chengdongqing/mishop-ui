import useLatest from '@/hooks/useLatest.ts';
import { useCallback, useRef } from 'react';

export default function useThrottle(
  fn: (...args: unknown[]) => void,
  interval = 200
) {
  const fnRef = useLatest(fn);
  const timer = useRef<NodeJS.Timer>();

  return useCallback(
    (...args: unknown[]) => {
      if (!timer.current) {
        timer.current = setTimeout(() => {
          timer.current = undefined;
          fnRef.current(...args);
        }, interval);
      }
    },
    [fnRef, interval]
  );
}
