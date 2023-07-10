import useThrottle from '@/hooks/useThrottle.ts';
import React, { useEffect, useState } from 'react';

interface RequestConfig<T, U> {
  manual?: boolean;
  initialData?: T;
  convert?: (res: T) => U;
  onSuccess?: (res: U) => void;
}

interface RequestResult<T> {
  data: T;
  loading: boolean;
  run: (...args: unknown[]) => Promise<T>;
  setData: React.Dispatch<React.SetStateAction<T>>;
}

export default function useRequest<T, U = T>(
  service: (...args: any[]) => Promise<T>,
  {
    manual = false,
    initialData,
    convert,
    onSuccess
  }: RequestConfig<T, U> = {}
): RequestResult<U> {
  const [data, setData] = useState(initialData as U);
  const [loading, setLoading] = useState(false);

  const run = useThrottle<U>(async (...args) => {
    setLoading(true);
    try {
      const res = await service(...args);
      const result = convert?.(res) || (res as unknown as U);
      setData(result);
      onSuccess?.(result);
      return result;
    } finally {
      setLoading(false);
    }
  }, 50);

  useEffect(() => {
    if (!manual) {
      run().then();
    }
  }, [manual, run]);

  return {
    run,
    data,
    loading,
    setData
  };
}
