import { ApiHost } from './constants.ts';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface RequestConfig {
  baseUrl?: string;
  method?: RequestMethod;
  headers?: HeadersInit;
  body?: BodyInit | null;
  params?: Record<string, unknown>;
  timeout?: number;
}

export declare interface Ret<T> {
  data?: T;
  success: boolean;
  message?: string;
}

export declare interface ResponseData<T> {
  data: Ret<T>;
  status: number;
  statusText: string;
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
): Promise<ResponseData<T>> {
  // Construct the full URL with query parameters if any
  const fullUrl = new URL(url, baseUrl);
  if (params) {
    Object.keys(params).forEach((key) => {
      if (key && params[key] !== undefined) {
        fullUrl.searchParams.append(key, params[key] as string);
      }
    });
  }

  try {
    const controller = new AbortController();
    const signal = controller.signal;
    if (timeout) {
      setTimeout(() => {
        controller.abort();
      }, timeout);
    }

    const response = await fetch(fullUrl.toString(), {
      method,
      headers,
      body,
      signal
    });
    const data: Ret<T> = await response.json();

    return {
      data,
      status: response.status,
      statusText: response.statusText
    };
  } catch (error) {
    // Handle errors or custom error statuses here
    console.log(error);
    throw new Error('Network Error');
  }
}
