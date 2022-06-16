import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import dataReducer from "./dataSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      data: dataReducer,
    },
  });
}

const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
