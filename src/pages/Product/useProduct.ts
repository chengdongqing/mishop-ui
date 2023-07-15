import useRequest from '@/hooks/useRequest.ts';
import useSetState from '@/hooks/useSetState.ts';
import { getSimpleProductName } from '@/pages/Product/utils.ts';
import { fetchProductDetails } from '@/services/product.ts';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useProduct(id: Id, pathname: string) {
  // 查询商品详情
  const navigate = useNavigate();
  const {
    data: product,
    loading,
    run
  } = useRequest(() => fetchProductDetails(id), {
    onError() {
      navigate('/', { replace: true });
    }
  });
  useEffect(() => {
    run();
  }, [id, run]);

  // 是否有动态的概述和参数详情页
  const [hasPages, setHasPages] = useSetState({
    sketch: false,
    specs: false
  });
  // 查询接口后，如果没有返回staticDetails，则尝试异步加载动态的概述和参数页面
  useEffect(() => {
    if (product?.name) {
      if (!product.staticDetails) {
        const name = getSimpleProductName(product.name);
        // 判断是否有动态概述和参数页面
        Promise.all([
          import(`./Sketch/${name}/index.tsx`).then(() => {
            setHasPages({ sketch: true });
          }),
          import(`./Specs/${name}/index.tsx`).then(() => {
            setHasPages({ specs: true });
          })
        ]).catch(() => {
          // 加载失败
        });
      } else {
        setHasPages({ sketch: false, specs: false });
        // 跳转到购买页面，同时在该页面展示静态详情
        if (!pathname.endsWith('buy')) {
          navigate('buy', { replace: true });
        }
      }
    }
  }, [product]);

  return [product, loading, hasPages] as const;
}
