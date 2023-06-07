import useDebounce from '@/hooks/useDebounce.ts';
import { RefObject, useEffect, useState } from 'react';

export default function useElementVisible(
  target: HTMLElement | RefObject<HTMLElement>,
  predicate: (rect: DOMRect) => boolean,
  deps: unknown[] = []
) {
  const [visible, setVisible] = useState(false);

  const handleScroll = useDebounce(() => {
    const element = target instanceof HTMLElement ? target : target.current;
    if (element) {
      setVisible(predicate(element.getBoundingClientRect()));
    }
  }, 50);

  useEffect(() => {
    handleScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return visible;
}
