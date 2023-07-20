import toast from '@/components/Toast';
import store from '@/store';
import userSlice from '@/store/slices/userSlice.ts';
import { ApiHost } from './constants.ts';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface RequestConfig {
  baseUrl?: string;
  method?: RequestMethod;
  headers?: HeadersInit;
  body?: object | string | null;
  params?: RecordsType;
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
    timeout = 15 * 1000
  }: RequestConfig = {}
): Promise<T | null> {
  const fullUrl = new URL(url, baseUrl);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (key && value !== undefined) {
        fullUrl.searchParams.append(key, value as string);
      }
    });
  }

  const fullHeaders = new Headers(headers);
  const token = store.getState().user.userInfo?.token;
  if (token?.accessToken) {
    fullHeaders.append('Authorization', `Bearer ${token.accessToken}`);
  }
  if (method !== 'GET' && body) {
    if (typeof body === 'object') {
      fullHeaders.append('content-type', 'application/json');
    } else {
      fullHeaders.append('content-type', 'text/plain');
    }
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
    body: typeof body === 'object' ? JSON.stringify(body) : body,
    signal
  });
  const data: T = res.headers.get('content-type')?.includes('application/json') ? await res.json() : null;

  if (res.ok) {
    // 成功处理请求
    return Promise.resolve(data);
  } else {
    toast.warning(`${(data as RecordsType)?.message || ''}（${res.status}）`);
    // 未登录授权
    if (res.status === 401) {
      // 清除登录信息
      store.dispatch(userSlice.actions.setUser(null));
      window.localStorage.removeItem('login-user');
      // 跳转登录页面
      window.location.pathname = `${import.meta.env.BASE_URL}auth/login`;
    }
    // 其他错误
    return Promise.reject();
  }
}
