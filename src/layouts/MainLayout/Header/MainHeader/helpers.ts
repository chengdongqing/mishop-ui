import { useEffect, useState } from 'react';

export function usePlaceholder(keywords: string[], interval = 5000) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((value) => {
        return value < keywords.length - 1 ? value + 1 : 0;
      });
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [interval, keywords.length]);

  return keywords[index];
}
