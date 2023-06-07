import { useEffect, useRef } from 'react';

export default function useMount(fn: () => void) {
  const fnRef = useRef(fn);

  useEffect(() => {
    fnRef.current();
  }, []);
}
