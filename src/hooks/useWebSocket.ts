import useUnmountedRef from '@/hooks/useUnmountedRef';
import { useEffect, useRef, useState } from 'react';

interface WebSocketConfig<T = unknown> {
  protocols?: string | string[];
  manual?: boolean;
  reconnectLimit?: number;
  reconnectInterval?: number;
  onOpen?(event: Event, socket: WebSocket): void;
  onClose?(event: CloseEvent): void;
  onError?(event: Event): void;
  onMessage?(data: T): void;
}

export default function useWebSocket<T = unknown>(
  url: string,
  {
    protocols,
    manual = false,
    reconnectLimit = 3,
    reconnectInterval = 3 * 1000,
    onOpen,
    onClose,
    onError,
    onMessage
  }: WebSocketConfig<T>
) {
  const socketRef = useRef<WebSocket | null>(null);
  const [state, setState] = useState<WebSocket['readyState']>(3);
  const unmountedRef = useUnmountedRef();
  const reconnectTimerRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectTimesRef = useRef(0);

  const reconnect = useRef(() => {
    if (!unmountedRef.current && reconnectTimesRef.current < reconnectLimit) {
      if (reconnectTimerRef.current) {
        clearTimeout(reconnectTimerRef.current);
        reconnectTimerRef.current = null;
      }
      reconnectTimerRef.current = setTimeout(() => {
        connect(false);
        reconnectTimesRef.current += 1;
      }, reconnectInterval);
    }
  }).current;

  const connect = useRef((resetTimes = true) => {
    if (resetTimes) {
      reconnectTimesRef.current = 0;
    }
    socketRef.current?.close();

    const socket = new WebSocket(url, protocols);
    socketRef.current = socket;
    setState(socket.readyState);

    socket.onopen = (e) => {
      onOpen?.(e, socket);
      setState(socket.readyState);
    };

    socket.onclose = (e) => {
      reconnect();
      onClose?.(e);
      setState(socket.readyState);
    };

    socket.onerror = (e) => {
      reconnect();
      onError?.(e);
      setState(socket.readyState);
    };

    socket.onmessage = (e) => {
      onMessage?.(JSON.parse(e.data) as T);
    };
  }).current;

  const send = (message: T) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
    }
  };

  const disconnect = () => {
    if (reconnectTimerRef.current) {
      clearTimeout(reconnectTimerRef.current);
      reconnectTimerRef.current = null;
    }
    socketRef.current?.close();
  };

  useEffect(() => {
    if (url && !manual) {
      connect();
    }
    return disconnect;
  }, [connect, manual, url]);

  return {
    send,
    state,
    connect,
    disconnect,
    socket: socketRef.current
  };
}
