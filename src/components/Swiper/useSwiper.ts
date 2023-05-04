import {
  Children,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import useUpdateEffect from '@/hooks/useUpdateEffect.ts';
import { SwiperProps } from './index.tsx';

export default function useSwiper({
  direction: direction1,
  children,
  autoplay,
  interval,
  afterChange,
  beforeChange
}: SwiperProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(-1);
  const [nextIndex, setNextIndex] = useState(-1);
  const [direction, setDirection] = useState<typeof direction1>(direction1);

  const timer = useRef<NodeJS.Timer>();
  const length = useMemo(() => Children.count(children), [children]);

  const switchIndex = useCallback(
    (next = true, index = -1) => {
      setActiveIndex((value) => {
        setPrevIndex(value);
        let newValue = index;
        if (index === -1) {
          if (next) {
            setDirection('forward');
            newValue = value < length - 1 ? value + 1 : 0;
          } else {
            setDirection('reverse');
            newValue = value > 0 ? value - 1 : length - 1;
          }
        }
        setNextIndex(newValue);
        beforeChange?.(value, newValue);
        return newValue;
      });
    },
    [beforeChange, length]
  );

  const startPlay = useCallback(() => {
    if (autoplay) {
      clearInterval(timer.current);
      timer.current = setInterval(switchIndex, interval);
    }
  }, [autoplay, interval, switchIndex]);

  useEffect(() => {
    startPlay();
    return () => {
      clearInterval(timer.current);
    };
  }, [startPlay]);
  useUpdateEffect(() => {
    afterChange?.(activeIndex);
  }, [activeIndex, afterChange]);

  return [
    { activeIndex, prevIndex, nextIndex, direction, timer, length },
    { switchIndex, startPlay }
  ] as const;
}
