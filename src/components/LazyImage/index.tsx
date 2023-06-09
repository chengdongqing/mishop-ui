import { EmptyImage } from '@/utils/constants.ts';
import { ImgHTMLAttributes, useEffect, useRef, useState } from 'react';

interface LazyImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string | (() => Promise<typeof import('*.png')>);
  alt?: string;
  threshold?: number;
}

export default function LazyImage({
  src,
  alt,
  threshold = 0,
  ...rest
}: LazyImageProps) {
  const [isVisible, setIsVisible] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  const [value, setValue] = useState<string>();
  useEffect(() => {
    if (typeof src === 'function') {
      src().then((res) => {
        setValue(res.default);
      });
    } else {
      setValue(src as string);
    }
  }, [src]);

  useEffect(() => {
    function unobserve() {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    }
    const observer = new IntersectionObserver(
      (entries) => {
        const { isIntersecting } = entries[0];
        if (isIntersecting) {
          setIsVisible(true);
          unobserve();
        }
      },
      { threshold }
    );
    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return unobserve;
  }, [src, threshold]);

  return (
    <img
      ref={imageRef}
      src={isVisible ? value : EmptyImage}
      alt={alt}
      onError={() => {
        setValue(EmptyImage);
      }}
      {...rest}
    />
  );
}
