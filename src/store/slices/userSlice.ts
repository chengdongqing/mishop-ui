import { useAppSelector } from '@/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserInfo {
  id: string;
  name: string;
  phoneNumber: string;
  email?: string;
  avatarUrl?: string;
}

const initialState: { userInfo: UserInfo | null } = {
  userInfo: null
};

export default createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser(state, { payload }: PayloadAction<UserInfo | null>) {
      state.userInfo = payload;
    }
  }
});

export function useUserInfo() {
  return useAppSelector((state) => state.user.userInfo);
}

export function useHasLogin() {
  return !!useUserInfo();
}
