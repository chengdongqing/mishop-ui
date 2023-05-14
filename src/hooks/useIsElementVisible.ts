import useDebounce from '@/hooks/useDebounce.ts';
import { RefObject, useEffect, useState } from 'react';

export default function useIsElementVisible(props: {
  elementRef: RefObject<HTMLElement>;
  predicate: (rect: DOMRect) => boolean;
  deps?: unknown[];
}) {
  const [visible, setVisible] = useState(false);

  const onScroll = useDebounce(() => {
    setVisible(
      props.predicate((props.elementRef.current as HTMLDivElement).getBoundingClientRect())
    );
  }, 50);

  useEffect(() => {
    onScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, props.deps || []);

  useEffect(() => {
    document.addEventListener('scroll', onScroll);

    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  });

  return visible;
}
