import useLocalStorageState from '@/hooks/useLocalStorageState.ts';
import useMount from '@/hooks/useMount.ts';
import useUpdateEffect from '@/hooks/useUpdateEffect.ts';
import cartSlice, { useCartProducts } from '@/store/slices/cartSlice.ts';
import userSlice, { useUserInfo } from '@/store/slices/userSlice.ts';
import { useDispatch } from 'react-redux';

function useCartInitial() {
  const products = useCartProducts();
  const dispatch = useDispatch();
  const [storageState, setStorageState] =
    useLocalStorageState<CartProduct[]>('shopping-cart');

  useMount(() => {
    if (storageState) {
      dispatch(cartSlice.actions.setCart(storageState));
    }
  });

  useUpdateEffect(() => {
    setStorageState(products);
  }, [products]);
}

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

export default function useAppInitial() {
  useCartInitial();
  useUserInitial();
}
