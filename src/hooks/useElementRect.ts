import useDebounce from '@/hooks/useDebounce.ts';
import { RefObject, useEffect, useState } from 'react';

export default function useElementRect(
  target: HTMLElement | RefObject<HTMLElement>
) {
  const [rect, setRect] = useState<DOMRect>();

  const getRect = useDebounce(() => {
    const element = target instanceof HTMLElement ? target : target.current;
    if (element) {
      setRect(element.getBoundingClientRect());
    }
  }, 50);

  useEffect(() => {
    getRect();
    window.addEventListener('resize', getRect);

    return () => {
      window.removeEventListener('resize', getRect);
    };
  }, [getRect, target]);

  return rect;
}
