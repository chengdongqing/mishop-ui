import useLatest from '@/hooks/useLatest.ts';
import { useEffect } from 'react';

export default function useUnmount(fn: () => void) {
  const fnRef = useLatest(fn);

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      fnRef.current();
    };
  }, [fnRef]);
}
