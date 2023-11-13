import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from '../features/userArticles';
import newsReducer from '../features/newsArticles'; 

export const store = configureStore({
  reducer: {
    userArticles: userReducer,
    newsArticles: newsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
