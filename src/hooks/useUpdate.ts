import { useCallback, useState } from 'react';

export default function useUpdate() {
  const [, setFlag] = useState({});

  return useCallback(() => {
    setFlag({});
  }, []);
}
