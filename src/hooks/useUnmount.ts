import { useEffect, useRef } from 'react';

export default function useUnmount(fn: () => void) {
  const fnRef = useRef(fn);

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      fnRef.current();
    };
  }, []);
}
