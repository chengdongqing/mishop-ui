import useThrottle from '@/hooks/useThrottle.ts';
import { ResponseData, Ret } from '@/utils/request.ts';
import React, { useEffect, useState } from 'react';

interface RequestConfig<T> {
  manual?: boolean;
  defaultParams?: unknown;
  initialData?: T | null;
  formatResult?: (res: Ret<T>) => T;
  onSuccess?: (data: T) => void;
  onError?: (error: Error | unknown) => void;
  onFinally?: () => void;
}

interface RequestResult<T> {
  data: T | null;
  loading: boolean;
  run: (...args: unknown[]) => void;
  setData: React.Dispatch<React.SetStateAction<T | null>>;
}

export default function useRequest<T>(
  service: (...args: any[]) => Promise<ResponseData<T>>,
  {
    manual = false,
    defaultParams,
    initialData = null,
    formatResult,
    onSuccess,
    onError,
    onFinally
  }: RequestConfig<T> = {}
): RequestResult<T> {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  const run = useThrottle(
    async (...args) => {
      setLoading(true);

      try {
        const response = await service(args.length ? args : defaultParams);
        const res = formatResult?.(response.data) || response.data?.data;
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
  }, [manual, run]);

  return {
    data,
    loading,
    setData,
    run
  };
}
