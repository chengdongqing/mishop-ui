import popup from '@/components/Popup';
import toast from '@/components/Toast';
import cartSlice from '@/store/slices/cartSlice.ts';
import userSlice from '@/store/slices/userSlice.ts';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function useLogout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function logout() {
    window.localStorage.clear();
    dispatch(userSlice.actions.setUser(null));
    dispatch(cartSlice.actions.setCart([]));
    navigate('/', { replace: true });
  }

  function logoutWithConfirm() {
    popup.confirm('确定退出登录吗？', {
      onOk() {
        logout();
        toast.warning('已退出登录');
      }
    });
  }

  return { logout, logoutWithConfirm };
}
