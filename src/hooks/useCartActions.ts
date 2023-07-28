import popup from '@/components/Popup';
import services, { CartItemDTO } from '@/services/cart.ts';
import cartSlice, { useCartItems } from '@/store/slices/cartSlice.ts';
import { useHasLogin } from '@/store/slices/userSlice.ts';
import { useDispatch } from 'react-redux';

export default function useCartActions() {
  const hasLogin = useHasLogin();
  const products = useCartItems();
  const dispatch = useDispatch();

  async function addToCart(item: Omit<CartItemDTO, 'quantity' | 'isChecked'>) {
    const cartItem = {
      ...item,
      quantity: 1,
      isChecked: true
    };

    const id = await (hasLogin
      ? services.addToCart(cartItem)
      : new Promise<void>((resolve, reject) => {
        const existingItem = products.find((item_2) => {
          return item_2.skuId === cartItem.skuId;
        });
        if (
          existingItem?.limits &&
          existingItem.quantity + cartItem.quantity > existingItem.limits
        ) {
          popup.alert('商品加入购物车数量超过限购数');
          reject();
        } else {
          resolve();
        }
      }));
    if (id) {
      cartItem.id = id;
    }

    dispatch(cartSlice.actions.addToCart(cartItem));
  }

  async function modifyCartItems(items: CartItemDTO[]) {
    if (!items.length) return;

    await (hasLogin
      ? services.modifyCartItems(items)
      : new Promise<void>((resolve, reject) => {
        items.forEach(item => {
          if (item?.limits && item.quantity > item.limits) {
            popup.alert('商品加入购物车数量超过限购数');
            reject();
            return;
          }
        });
        resolve();
      }));

    dispatch(cartSlice.actions.modifyCartItems(items));
  }

  function removeCartItems(items: CartItemDTO[], withConfirm = true) {
    if (!items.length) return;

    async function remove() {
      if (hasLogin) {
        const ids = items.map((item) => item.id) as number[];
        await services.removeCartItems(ids);
      }
      const skuIds = items.map((item) => item.skuId);
      dispatch(cartSlice.actions.removeCartItems(skuIds));
    }

    if (withConfirm) {
      popup.confirm('确定删除已选的商品吗？', {
        onOk: remove
      });
    } else {
      remove();
    }
  }

  function refreshCart() {
    // 获取服务器数据
    services.fetchCartItems().then((res) => {
      if (res) {
        dispatch(cartSlice.actions.setCart(res));
      }
    });
  }

  return { addToCart, modifyCartItems, removeCartItems, refreshCart };
}
