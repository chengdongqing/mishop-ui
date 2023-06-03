import useLatest from '@/hooks/useLatest.ts';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function useCountdown(
  seconds = 60,
  manual = false,
  onEnd?: () => void
) {
  const [remaining, setRemaining] = useState(seconds);
  const timer = useRef<NodeJS.Timer>();

  const cancel = useCallback(() => {
    clearInterval(timer.current);
  }, []);

  const onEndRef = useLatest(onEnd);
  const start = useCallback(() => {
    setRemaining(seconds);
    timer.current = setInterval(() => {
      setRemaining((v) => {
        if (v > 0) return v - 1;
        cancel();
        onEndRef.current?.();
        return v;
      });
    }, 1000);
  }, [cancel, onEndRef, seconds]);

  useEffect(() => {
    if (seconds && !manual) {
      start();
    }
    return cancel;
  }, [cancel, manual, seconds, start]);

  return [remaining, { start, cancel }] as const;
}
