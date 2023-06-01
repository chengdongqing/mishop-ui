import useDebounce from '@/hooks/useDebounce.ts';
import { RefObject, useEffect, useState } from 'react';

export default function useElementVisible(
  target: HTMLElement | RefObject<HTMLElement>,
  predicate: (rect: DOMRect) => boolean,
  deps: unknown[] = []
) {
  const [visible, setVisible] = useState(false);

  const onScroll = useDebounce(() => {
    const element = target instanceof HTMLElement ? target : target.current;
    if (element) {
      setVisible(predicate(element.getBoundingClientRect()));
    }
  }, 50);

  useEffect(() => {
    onScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  return visible;
}
