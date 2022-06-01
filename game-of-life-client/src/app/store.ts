import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { gameOfLifeApi } from '../features/gameOfLife/api/gameOfLifeApi';
import gameOfLifeReducer from '../features/gameOfLife/store/gameOfLifeSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [gameOfLifeApi.reducerPath]: gameOfLifeApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(gameOfLifeApi.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
