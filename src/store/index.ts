import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import cartSlice from './slices/cartSlice.ts';
import userSlice from './slices/userSlice.ts';

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    user: userSlice.reducer
  }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
