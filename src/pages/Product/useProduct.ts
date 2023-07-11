import useRequest from '@/hooks/useRequest.ts';
import useSetState from '@/hooks/useSetState.ts';
import { fetchProductDetails } from '@/services/product.ts';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useProduct(name: string, pathname: string) {
  // 查询商品详情
  const navigate = useNavigate();
  const {
    data: product,
    loading,
    run
  } = useRequest(() => fetchProductDetails(name as string), {
    onError() {
      navigate('/', { replace: true });
    }
  });
  useEffect(() => {
    run();
  }, [name, run]);

  // 是否有动态的概述和参数详情页
  const [hasPages, setHasPages] = useSetState({
    sketch: false,
    specs: false
  });
  // 查询接口后，如果没有返回staticDetails，则尝试异步加载动态的概述和参数页面
  useEffect(() => {
    if (product) {
      if (!product.staticDetails) {
        // 判断是否有动态概述和参数页面
        Promise.all([
          import(`./Sketch/${name?.replace(/\s/g, '')}/index.tsx`).then(() => {
            setHasPages({ sketch: true });
          }),
          import(`./Specs/${name?.replace(/\s/g, '')}/index.tsx`).then(() => {
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
