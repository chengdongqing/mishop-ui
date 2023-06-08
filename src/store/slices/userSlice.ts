import { useAppSelector } from '@/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: { userInfo: UserInfo | null } = {
  userInfo: null
};

export default createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser(state, { payload }: PayloadAction<UserInfo | null>) {
      state.userInfo = payload;
    },
    modifyUser(state, { payload }: PayloadAction<Partial<UserInfo>>) {
      if (!state.userInfo) return;

      state.userInfo = {
        ...state.userInfo,
        ...payload
      };
    }
  }
});

export function useUserInfo() {
  return useAppSelector((state) => state.user.userInfo);
}

export function useHasLogin() {
  return !!useUserInfo();
}
