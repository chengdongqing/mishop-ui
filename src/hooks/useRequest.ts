import useThrottle from '@/hooks/useThrottle.ts';
import React, { useEffect, useState } from 'react';

interface RequestConfig<T, U> {
  manual?: boolean;
  initialData?: U;
  deps?: unknown[];
  convert?: (res: T) => U;
  onSuccess?: (res: U) => void;
  onError?: () => void;
}

interface RequestResult<T> {
  data: T;
  loading: boolean;
  run: (...args: unknown[]) => Promise<T | null>;
  setData: React.Dispatch<React.SetStateAction<T>>;
}

export default function useRequest<T, U = T>(
  service: (...args: any[]) => Promise<T>,
  {
    manual = false,
    initialData,
    deps = [],
    convert,
    onSuccess,
    onError
  }: RequestConfig<T, U> = {}
): RequestResult<U> {
  const [data, setData] = useState(initialData as U);
  const [loading, setLoading] = useState(false);

  const run = useThrottle<U | null>(async (...args) => {
    setLoading(true);
    try {
      const res = await service(...args);
      const result = convert?.(res) || (res as unknown as U);
      setData(result);
      onSuccess?.(result);
      return result;
    } catch (e) {
      onError?.();
      return null;
    } finally {
      setLoading(false);
    }
  }, 50);

  useEffect(() => {
    if (!manual) {
      run();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [manual, run, ...deps]);

  return {
    run,
    data,
    loading,
    setData
  };
}
