import useLatest from '@/hooks/useLatest.ts';
import { useEffect } from 'react';

export default function useMount(fn: () => void) {
  const fnRef = useLatest(fn);

  useEffect(() => {
    fnRef.current();
  }, [fnRef]);
}
