import { ReactNode, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ProductSketchPage() {
  const { name } = useParams<{
    name: string;
  }>();
  const [component, setComponent] = useState<ReactNode>(null);

  useEffect(() => {
    import(`./${name?.replace(/\s/g, '')}`).then((res) => {
      setComponent(res.default);
    });
  }, [name]);

  return <>{component}</>;
}
