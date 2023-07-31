import { AuthVO } from '@/services/auth.ts';
import { useAppSelector } from '@/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: {
  userInfo: AuthVO | null
} = {
  userInfo: null
};

export default createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser(state, { payload }: PayloadAction<AuthVO | null>) {
      if (payload && !payload.name) {
        payload.name = `用户${payload.phoneNumber}`;
      }
      state.userInfo = payload;
    },
    modifyUser(state, { payload }: PayloadAction<Partial<AuthVO>>) {
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
