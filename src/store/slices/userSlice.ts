import { useAppSelector } from '@/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserInfo {
  name: string;
  phoneNumber: string;
}

const initialState: { userInfo: UserInfo | null } = {
  userInfo: null
};

export default createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    login(state, { payload }: PayloadAction<UserInfo>) {
      state.userInfo = payload;
    }
  }
});

export function useHasLogin() {
  return useAppSelector((state) => !!state.user.userInfo);
}
