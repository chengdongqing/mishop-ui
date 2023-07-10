import toast from '@/components/Toast';
import { Navigate } from 'react-router-dom';
import { ApiHost } from './constants.ts';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface RequestConfig {
  baseUrl?: string;
  method?: RequestMethod;
  headers?: HeadersInit;
  body?: unknown | null;
  params?: Record<string, unknown>;
  timeout?: number;
}

export default async function request<T>(
  url: string,
  {
    baseUrl = ApiHost,
    method = 'GET',
    headers,
    body,
    params,
    timeout
  }: RequestConfig = {}
): Promise<T> {
  const fullUrl = new URL(url, baseUrl);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (key && value !== undefined) {
        fullUrl.searchParams.append(key, value as string);
      }
    });
  }
  const fullHeaders = new Headers(headers);
  if (body && method !== 'GET' && !fullHeaders.has('content-type')) {
    fullHeaders.append('content-type', 'application/json');
  }

  const controller = new AbortController();
  const signal = controller.signal;
  if (timeout) {
    setTimeout(() => {
      controller.abort();
    }, timeout);
  }

  const res = await fetch(fullUrl.toString(), {
    method,
    headers: fullHeaders,
    body: body ? JSON.stringify(body) : null,
    signal
  });
  const data: T = await res.json();

  if (res.status === 200) {
    // 成功处理请求
    return data;
  } else if (res.status === 401) {
    // 未登录授权
    toast.warning('请登录后操作');
    Navigate({ to: '/auth/login' });
  } else {
    // 其他错误
    toast.warning(`操作失败（${res.status}）`);
  }
  throw new Error('操作失败');
}
