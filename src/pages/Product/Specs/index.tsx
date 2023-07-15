import DataContainer from '@/components/DataContainer';
import toast from '@/components/Toast';
import { ProductContext } from '@/pages/Product';
import { getSimpleProductName } from '@/pages/Product/utils.ts';
import { ReactNode, useContext, useEffect, useState } from 'react';

export default function ProductSpecsPage() {
  const ctx = useContext(ProductContext);
  const [component, setComponent] = useState<ReactNode>(null);

  useEffect(() => {
    if (ctx?.name && !ctx.staticDetails) {
      import(`./${getSimpleProductName(ctx.name)}/index.tsx`)
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
