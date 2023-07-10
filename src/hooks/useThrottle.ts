import useLatest from '@/hooks/useLatest.ts';
import { useCallback, useRef } from 'react';

export default function useThrottle<T>(
  fn: (...args: unknown[]) => Promise<T>,
  interval = 200
) {
  const fnRef = useLatest(fn);
  const timer = useRef<NodeJS.Timer>();

  return useCallback(
    (...args: unknown[]) => {
      return new Promise<T>((resolve) => {
        if (!timer.current) {
          timer.current = setTimeout(() => {
            timer.current = undefined;
            resolve(fnRef.current(...args));
          }, interval);
        }
      });
    },
    [fnRef, interval]
  );
}
