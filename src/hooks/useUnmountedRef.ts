import { useEffect, useRef } from 'react';

export default function useUnmountedRef() {
  const unmountedRef = useRef(false);

  useEffect(() => {
    return () => {
      unmountedRef.current = true;
    };
  }, []);

  return unmountedRef;
}
