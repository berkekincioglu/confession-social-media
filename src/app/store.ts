import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { firebaseReducer } from 'react-redux-firebase';
import authReducer from '../features/auth/authSlice';
export const store = configureStore({
  reducer: {
    firebase: firebaseReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
