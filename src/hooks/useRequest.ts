import useThrottle from '@/hooks/useThrottle.ts';
import { ResponseData, Ret } from '@/utils/request.ts';
import React, { useEffect, useState } from 'react';

interface RequestConfig<T, U> {
  manual?: boolean;
  defaultParams?: any[];
  initialData?: T | null;
  convert?: (res: Ret<T>) => U;
  onSuccess?: (data: U) => void;
  onError?: (error: Error | unknown) => void;
  onFinally?: () => void;
}

interface RequestResult<T> {
  data: T;
  loading: boolean;
  run: (...args: any[]) => void;
  setData: React.Dispatch<React.SetStateAction<T>>;
}

export default function useRequest<T, U = T>(
  service: (...args: any[]) => Promise<ResponseData<T>>,
  {
    manual = false,
    defaultParams,
    initialData = null,
    convert,
    onSuccess,
    onError,
    onFinally
  }: RequestConfig<T, U> = {}
): RequestResult<U> {
  const [data, setData] = useState(initialData as U);
  const [loading, setLoading] = useState(false);

  const run = useThrottle(
    async (...args) => {
      setLoading(true);

      try {
        const response = await service(...(args.length ? args : defaultParams || []));
        const res = (convert?.(response.data) || response.data?.data) as U;
        if (res) {
          setData(res);
          onSuccess?.(res);
        }
      } catch (error) {
        onError?.(error);
      } finally {
        setLoading(false);
        onFinally?.();
      }
    }, 50);

  useEffect(() => {
    if (!manual) {
      run();
    }
  }, [run]);

  return {
    data,
    loading,
    setData,
    run
  };
}
