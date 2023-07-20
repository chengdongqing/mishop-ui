import useLocalStorageState from '@/hooks/useLocalStorageState.ts';
import useMount from '@/hooks/useMount.ts';
import useUpdateEffect from '@/hooks/useUpdateEffect.ts';
import { refreshToken } from '@/services/auth.ts';
import { CartItemVO, fetchCartItems, syncCart } from '@/services/cart.ts';
import cartSlice, { useCartProducts } from '@/store/slices/cartSlice.ts';
import userSlice, { useHasLogin, useUserInfo } from '@/store/slices/userSlice.ts';
import moment from 'moment';
import { useDispatch } from 'react-redux';

/**
 * 同步购物车数据到全局状态
 * 1.未登录：保存在浏览器
 * 2.已登录：保存到服务器
 */
function useCartInitial() {
  const hasLogin = useHasLogin();
  const products = useCartProducts();
  const dispatch = useDispatch();
  const [storageItems, setStorageItems] =
    useLocalStorageState<CartItemVO[]>('shopping-cart');

  // 默认先同步本地缓存的购物车数据
  useMount(() => {
    if (storageItems) {
      dispatch(cartSlice.actions.setCart(storageItems));
    }
  });

  // 购物车数据同步，包括本地/远程
  useUpdateEffect(() => {
    if (hasLogin) {
      if (products?.length) {
        syncCart(products).then(() => {
          // 清空本地缓存
          setStorageItems(null);
        });
      } else {
        // 获取服务器数据
        fetchCartItems().then(res => {
          if (res) {
            dispatch(cartSlice.actions.setCart(res));
          }
        });
      }
    }
  }, [hasLogin]);

  // 未登录时持久化购物车到本地缓存
  useUpdateEffect(() => {
    if (!hasLogin) {
      setStorageItems(products);
    }
  }, [products]);
}

/**
 * 同步登录的用户信息到全局状态
 */
function useUserInitial() {
  const userInfo = useUserInfo();
  const dispatch = useDispatch();
  const [storageState, setStorageState] =
    useLocalStorageState<LoginUser>('login-user');

  useMount(() => {
    if (storageState) {
      dispatch(userSlice.actions.setUser(storageState));
    }
  });

  useUpdateEffect(() => {
    setStorageState(userInfo);
  }, [userInfo]);
}

/**
 * token自动续期
 */
function useTokenRefresh() {
  const userInfo = useUserInfo();
  const dispatch = useDispatch();

  useUpdateEffect(() => {
    if (userInfo?.token?.refreshToken) {
      // 即将在两小时内过期时获取新token
      const expiresInTwoHours = moment().isSameOrAfter(
        moment(userInfo.token.expireIn).subtract(2, 'hours')
      );
      if (expiresInTwoHours) {
        refreshToken(userInfo.token.refreshToken).then((token) => {
          if (token?.accessToken) {
            dispatch(
              userSlice.actions.setUser({
                ...userInfo,
                token
              })
            );
          }
        });
      }
    }
  }, [userInfo?.id]);
}

export default function useAppInitial() {
  useCartInitial();
  useUserInitial();

  useTokenRefresh();
}
