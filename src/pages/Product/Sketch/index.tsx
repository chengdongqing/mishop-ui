import DataContainer from '@/components/DataContainer';
import toast from '@/components/Toast';
import { ProductContext } from '@/pages/Product';
import { ReactNode, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ProductSketchPage() {
  const { name } = useParams<{
    name: string;
  }>();
  const ctx = useContext(ProductContext);
  const [component, setComponent] = useState<ReactNode>(null);

  useEffect(() => {
    if (ctx && !ctx.staticDetails) {
      import(`./${name?.replace(/\s/g, '')}/index.tsx`)
        .then((res) => {
          setComponent(res.default);
        })
        .catch(() => {
          toast.warning('加载失败');
        });
    }
  }, [ctx]);

  return <DataContainer loading={!component}>{component}</DataContainer>;
}
