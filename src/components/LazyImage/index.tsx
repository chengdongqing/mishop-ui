import { ImgHTMLAttributes, useEffect, useRef, useState } from 'react';

interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
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
      src={
        isVisible
          ? src
          : 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
      }
      alt={alt}
      {...rest}
    />
  );
}
